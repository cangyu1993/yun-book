// pages/details/details.js
import {
  fetch
} from "../../utils/util.js"
Page({
  data: {
    bookId: "",
    bookData: {},
  },
  onLoad: function(options) {
    console.log(options)
    this.setData({
      bookId: options.id
    })
    this.getData()
  },
  //获取数据
  getData() {
    return new Promise((resolve, reject) => {
      fetch.get(`/book/${this.data.bookId}`).then(res => {
        console.log(res)
        resolve()
        this.setData({
          bookData: res,
        })
      })
    })
  },

  jumpCatalog() {
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`
    })
  },

  onShareAppMessage: function() {
    return {
      title: this.data.bookData.data.title,
      path: `/pages/details/details?id=${this.data.bookId}`,
      imageUrl: this.data.bookData.data.img
    }
  },
  // 收藏
  handleCollect() {
    this.setData({})
    wx.showToast({
      title: '收藏成功',
      durationd: 1000,
      mask: true,
      success: () => {
        fetch.post("/collection", {
          bookId: this.data.bookId
        }).then(res => {})
      }
    })
  },
  //下啦刷新
  onPullDownRefresh() {
    this.getData().then(() => {
      wx.stopPullDownRefresh();
    }).catch(() => {
      console.log("页面走丢了...")
    })
  }


})