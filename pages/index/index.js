//index.js
//获取应用实例
import {
  fetch
} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    imgUrls: [],
    getContent: [],
    isLoading: false
  },
  onLoad() {
    this.getData()
    this.getContent()
  },
  getData() {
    this.setData({
      isLoading: true
    })
    fetch.get('/swiper').then(res => {
      // console.log(res)
      this.setData({
        swiperData: res.data,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  // 获取图书内容
  getContent() {
    fetch.get('/category/books').then(res => {
      // console.log(res)
      this.setData({
        mainContent: res.data
      })
    })
  },
  //跳转获取id
  jumpBook(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
})