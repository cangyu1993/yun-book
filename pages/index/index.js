//index.js
//获取应用实例
import {fetch} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    imgUrls: [],
    getContent:[],
  },
  onLoad() {
    this.getData()
    this.getContent()
  },
  getData() {
    fetch.get('/swiper').then(res => {
     this.setData({
       swiperData:res.data
     })
    })
  },
  // 获取图书内容
  getContent(){
    fetch.get('/category/books').then(res=>{
      // console.log(res)
      this.setData({
        mainContent: res.data
      })
    })
  },
  //跳转获取id
  jumpBook(event){
    const id= event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
})