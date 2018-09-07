// pages/mybook/mybook.js
import {fetch} from "../../utils/util.js"
Page({
  data: {
   bookpast:[],
  },
  onLoad: function (options) {
    this.getData()
  },
  getData(){
    return new Promise((resolve,reject)=>{
      fetch.get("/readList").then(res=>{
        console.log(res)
        this.setData({
           bookpast:res.data,
          //  bookId: res.data.title.bookId
        })
      }).catch(err=>{
        console.log(err)
      })
    })
  },


  // 点击继续阅读跳转到book
  jumpbook(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/book/book?id=${id}`,
    })
  },

 //点击跳转到detail页面
 jumpdetails(e){
   const id = e.currentTarget.dataset.id
   wx.navigateTo({
     url: `/pages/details/details?id=${id}`,
   })
 }

})