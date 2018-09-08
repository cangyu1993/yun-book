// pages/goldhouse/goldhouse.js
import { fetch } from "../../utils/util.js"
Page({

  data: {
    bookData:[],
    bookId:""
  },
  onLoad: function (options) {
    this.getData()
  },
  //获取接口数据
  getData(){
    return new Promise((resolve, reject)=>{
      fetch.get("/collection").then(res=>{
        resolve()
        console.log(res)
        this.setData({
          bookData:res.data
        })
      })
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
  //跳转到detail页面
  jumpdetail(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  //删除收藏
  del(e){
    const id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({
      bookId:id
    })
    fetch.del(`/collection/${this.data.bookId}`).then(res=>{
      console.log(res)
    })
  }


























})