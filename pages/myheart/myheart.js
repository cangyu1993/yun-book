// pages/myheart/myheart.js
import { fetch } from "../../utils/util.js"
Page({


  data: {
    userInfo: {},
    booknums: "",
    src: '',
    width: 150,//宽度
    height: 150,//高度
    showCut: false,//裁剪框显示
    cropper: {},//裁剪框实例
  },


  onLoad: function (options) {
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
  //裁剪框初始化完成调用
  cropperload(e) {
    console.log("cropper初始化完成");
  },
  //图片加载完成
  loadimage(e) {
    console.log("图片加载完成", e.detail);
    console.log(this.cropper)
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  //点击裁剪框阅览图片
  clickcut(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },
  //点击头像实现上传本地图片
  chooseImages() {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          src: res.tempFilePaths,
          showCut: true
        })
        that.cropper = that.selectComponent("#image-cropper")
      }
    })
  },
  //获取裁剪的图片
  submit() {
    this.cropper.getImg((obj) => {
      this.setData({
        userInfo: { ...this.userInfo, avatarUrl: obj.url },
        showCut: false
      })
    });
  },
  //取消裁剪
  submitCancel() {
    this.setData({
      showCut: false,
      src: ''
    })
  },
  //获取收藏总数
  getData() {
    return new Promise((resolve, reject) => {
      fetch.get("/collection/total").then(res => {
        resolve()
        // console.log(res)
        this.setData({
          booknums: res.data
        })
      })
    })
  },
  //跳转到收藏页面
  goldHouse() {
    wx.navigateTo({
      url: '/pages/goldhouse/goldhouse',
    })
  },
  onPullDownRefresh() {
    this.getData().then(() => {
      wx.stopPullDownRefresh();
    }).catch(() => {
      console.log("页面走丢了...")
    })
  }





})