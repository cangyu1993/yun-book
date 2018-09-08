// pages/book/book.js
import { fetch } from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    titleId: "",
    article: {},
    title: "",
    bookId: "",
    catalog: [],
    font:40,
    isShow: false,
    isLoading:false,
    index:""
  },

//启动加载
  onLoad: function(options) {
    console.log(options)
    this.setData({
      titleId: options.id,
      bookId: options.bookId,
    })
    this.getData()
    this.getCatalog()
    this.turnArr(options)
  },

//获取文章接口数据
  getData() {
    this.setData({
      isLoading: true,
      isShow:false
    })
    fetch.get(`/article/${this.data.titleId}`).then(res => {
      let data = app.towxml.toJson(res.data.article.content, 'markdown');

      this.setData({
        article: data,
        title: res.data.title,
        isLoading: false,
        index: res.data.article.index
      })
    }).catch(err=>{
      this.setData({
        isLoading: false
      })
    })
  },

//获取标题接口数据
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      // console.log(res),
      this.setData({
        catalog:res.data
      })
    })
  },
  toggleCatalog(){
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
  },
  
  handleGet(event){
    const id = event.currentTarget.dataset.id
    this.setData({
      titleId:id,
      // 点击后隐藏
      isShow:false
    })
    this.getData()
  },
  handleAdd(){
    this.setData({
      font:this.data.font+2
    })
  },
  hangdleRuduce() {
    if(this.data.font<=24){
      wx.showModal({
        title:"警告",
        content:"字体太小看不清楚哦",
        showCancel:false
      })
    }else{
      this.setData({
        font: this.data.font - 2
      })
    }
  },
  hangleNext(){
    let catalog = this.data.catalog
    if(catalog[this.data.index + 1]){
      this.setData({
        titleId : catalog[this.data.index + 1]._id
      })
      this.getData()
    }else{
      wx.showToast({
        title: '已经是最后一章了',
      })
    }
  },
   handlePrev(){
     let catalog = this.data.catalog
     if(this.data.index - 1 < 0){
       wx.showToast({
         title: '已经是第一章',
       })
     }else{
       this.setData({
         titleId:catalog[this.data.index -1]._id
       })
       this.getData()
     }
   },
   //options转数组
  turnArr(options){
    var oldObj = options
    var newArr = []
    for( var i in oldObj){
      newArr.push(oldObj[i])
    }
    console.log(newArr)
    console.log(newArr.length)
  }


})