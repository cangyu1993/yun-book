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
    this.getAllData()
    login()
  },


  //获取轮播图封装为Promise
  getData() {
    return new Promise((resolve, reject) => {
      fetch.get('/swiper').then(res => {
        // console.log(res)
        resolve()
        this.setData({
          swiperData: res.data,
        })
      }).catch(err => {
        reject()
      })
    })
  },
//封装两个promise
  getAllData() {
    return new Promise(resolve => {
      this.setData({
        isLoading: true
      })
      Promise.all([this.getData(), this.getContent()]).then(() => {
        resolve()
        this.setData({
          isLoading: false
        })
      }).catch(err => {
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

  //获取更多数据(上啦刷新获得的书籍)
  getMoreContent() {
      return fetch.get('/category/books', {
        pn: this.data.pn
      })
  },

  //下啦刷新同时加载两个Promise
  onPullDownRefresh() {
    this.getAllData().then(()=>{
      wx.stopPullDownRefresh();
    }) 
  },
 
//上拉加载页数
  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({
        pn: this.data.pn + 1
      })
      console.log(this.data.pn)
      this.getMoreContent().then(res => {
        let newArr = [...this.data.mainContent, ...res.data]
        this.setData({
          mainContent: newArr
        })
        if (res.data.length < 2) {
          this.setData({
            hasMore: false
          })
        }
      })
    }
  },











})