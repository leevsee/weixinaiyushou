//app.js
var api = require('./common/script/fetch')

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.login({
      success: function (res) {
        console.log(res)
        api.getToken.call(this,res.code);
      }
    })
  }
})