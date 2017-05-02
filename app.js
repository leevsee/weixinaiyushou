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
        api.getToken.call(this, res.code);
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session',
        //   data: {
        //     appid: 'wx584d55692bf63f7a',
        //     secret: '43bd6d3d7b9bd2bb71527f6ebce1c47b',
        //     js_code: res.code,
        //     grant_type: 'authorization_code',
        //   },
        //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //   // header: {}, // 设置请求的 header
        //   success: function (res) {
        //     // success
        //     console.log('success');
        //     console.log(res);
        //   },
        //   fail: function (res) {
        //     // fail
        //     console.log('success');
        //     console.log(res);
        //   },
        //   complete: function (res) {
        //     // complete
        //   }
        // })
      }
    })
  }
})