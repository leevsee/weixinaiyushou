//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // wx.login({
    //   success: function(res) {
    //     console.log(res)
    //   }
    // })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getIPInfo: function (ipNum, callback) {
    wx.request({
      url: 'http://apis.baidu.com/bdyunfenxi/intelligence/ip',
      data: {
        ip: ipNum
      },
      header: {
        'apikey': '38dc05aa7caf3e7d040b619c81841ce8'
      },
      success: callback
    })
  },
  getGankAbstr: function (num, page, callback) {
    wx.request({
      url: 'https://gank.io/api/history/content/' + num + '/' + page,
      data: {

      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: callback,
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  getGankDateAbstr: function (year, month, day, callback) {
    wx.request({
      url: 'http://gank.io/api/day/' + year + '/' + month + '/'+ day,
      data: {

      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: callback,
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  globalData: {
    userInfo: null
  }
})