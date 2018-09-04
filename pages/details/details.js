// pages/details/details.js
import { fetch } from "../../utils/util.js"
Page({
  data: {
    bookId:"",
    bookData:{}
  },
  onLoad: function (options) {
    //  console.log(options)
     this.setData({
       bookId:options.id
     })
     this.getData()
  },
  //获取数据
  getData(){
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      // console.log(res)
      this.setData({
        bookData:res
      })
    })
  },
  jumpCatalog(){
    wx.navigateTo({
      url:`/pages/catalog/catalog?id=${this.data.bookId}`
    })
  },
  onShareAppMessage: function () {}
})