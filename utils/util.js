const baseUrl = "https://m.yaojunrong.com"

const fetch = {
  http(url, method, data) {
    return new Promise((resolve, reject) => {
      let token= wx.getStorageSync('Token')
      let header = {
        "content-type": "application/json"
      }
      if(token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header,
        success(res) {
          if(res.header.Token){
            wx.setStorageSync('Token', res.header.Token)
          }
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  get(url, data) {
    return this.http(url, 'GET', data)
  },
  post(url, data) {
    return this.http(url, 'POST', data)
  },
  del(url,data){
    return this.http(url, 'DELETE', data)
  }
}

const login = () => {
  wx.login({
    success(res) {
      // console.log(res)
      fetch.post("/login", {
        code: res.code,
        appid: 'wx3f39fb70fcbf9294',
        secret: '722c29c87586451174f912189118a00a'
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  })
}


exports.login = login
exports.fetch = fetch