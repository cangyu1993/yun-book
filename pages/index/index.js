//index.js
//获取应用实例
import { fetch,login } from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent: [],
    isLoading: false,
    swiperData: [],
    pn: 1,
    hasMore: true
  },


  onLoad() {
    this.getData()
    this.getContent()
    login()
  },


  //获取轮播图封装为Promise
  getData() {
    return new Promise((resolve, reject) => {
      this.setData({
        isLoading: true
      })
      fetch.get('/swiper').then(res => {
        // console.log(res)
        resolve()
        this.setData({
          swiperData: res.data,
          isLoading: false
        })
      }).catch(err => {
        reject()
        this.setData({
          isLoading: false
        })
      })
    })
  },

  // 获取图书内容封装为Promise
  getContent() {
    return new Promise((resolve, reject) => {
      fetch.get('/category/books').then(res => {
        // console.log(res)
        resolve()
        this.setData({
          mainContent: res.data
        })
      })
    })
  },


  //跳转获取id
  jumpBook(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },

  //获取更多数据(下啦刷新获得的书籍)
  getMoreContent() {
    return new Promise(resolve => {
      fetch.get('/category/books', {
        pn: this.data.pn
      }).then(res => {
        let newArr = [...this.data.mainContent, ...res.data]
        this.setData({
          mainContent: newArr
        })
        resolve(res)
      })
    })
  },

  //下啦刷新同时加载两个Promise
  onPullDownRefresh() {
    Promise.all([this.getData(), this.getContent()]).then(() => {
      wx.stopPullDownRefresh();
    })
  },
  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({
        pn: this.data.pn + 1
      })
      this.getMoreContent().then(res => {
        // console.log(res.data)
        if (res.data.length < 2) {
          this.setData({
            hasMore: false
          })
        }
      })
    }
  }
})