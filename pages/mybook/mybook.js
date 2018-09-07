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
           bookpast:res.data
        })
      }).catch(err=>{
        console.log(err)
      })
    })
  }
 



})