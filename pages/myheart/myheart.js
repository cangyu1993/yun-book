// pages/myheart/myheart.js
import { fetch } from "../../utils/util.js"
Page({


  data: {
    userInfo: {},
    booknums:""
  },


  onLoad: function(options) {
    wx.getUserInfo({
      success: (data) => {
        // console.log(data)
        this.setData({
          userInfo: data.userInfo
        })
      }
    }),
    this.getData()
  },
  //获取收藏总数
  getData(){
    return new Promise((resolve,reject)=>{
      fetch.get("/collection/total").then(res=>{
        resolve()
        // console.log(res)
        this.setData({
          booknums:res.data
        })
      })
    })
  },
  //跳转到收藏页面
  goldHouse(){
    wx.navigateTo({
      url: '/pages/goldhouse/goldhouse',
    })
  }



  

})