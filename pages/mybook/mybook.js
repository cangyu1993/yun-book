// pages/mybook/mybook.js
import {fetch} from "../../utils/util.js"
Page({
  data: {
   bookpast:[],
  },
  onLoad: function (options) {
    this.getData()
  },
  //获取数据封装为promise
  getData(){
    return new Promise((resolve,reject)=>{
      fetch.get("/readList").then(res=>{
        console.log(res)
        this.setData({
           bookpast:res.data,
        })
      }).catch(err=>{
        console.log(err)
      })
    })
  },


  // 点击继续阅读跳转到book
  jumpbook(e){
    const id = e.currentTarget.dataset.id
    const bookId = e.currentTarget.dataset.bookid
    wx.navigateTo({
      // url: '/pages/book/book?id=' + id + '&bookId' + bookId,
      url:`/pages/book/book?id=${id}&bookId=${bookId}`
    })
  },

 //点击跳转到detail页面
 jumpdetails(e){
   const id = e.currentTarget.dataset.id
   wx.navigateTo({
     url: `/pages/details/details?id=${id}`,
   })
 },
//下啦刷新
  onPullDownRefresh() {
    this.getData().then(() => {
      wx.stopPullDownRefresh();
    }).catch(() => {
      console.log("页面走丢了...")
    })
  },

//百分比计算

    // const index = e.currentTarget.dataset.index
    // const total = e.currentTarget.dataset.total
    // let a = Math.floor(index)
    // let b = Math.floor(total)









})