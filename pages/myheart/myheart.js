// pages/myheart/myheart.js
Page({


  data: {
    userInfo: {}
  },


  onLoad: function(options) {
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        this.setData({
          userInfo: data.userInfo
        })
      }
    })
  },

  

})