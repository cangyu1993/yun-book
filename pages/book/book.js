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
    isShow: false
  },

//启动加载
  onLoad: function(options) {
    // console.log(options)
    this.setData({
      titleId: options.id,
      bookId: options.bookId
    })
    this.getData()
    this.getCatalog()
  },

//获取文章接口数据
  getData() {
    fetch.get(`/article/${this.data.titleId}`).then(res => {
      let data = app.towxml.toJson(res.data.article.content, 'markdown');

      this.setData({
        article: data,
        title: res.data.title
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
      titleId:id
    })
    this.getData()
  }

})