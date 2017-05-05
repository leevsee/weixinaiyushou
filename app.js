//app.js
var api = require('./common/script/common')

App({
  onLaunch: function () {
    api.getToken.call(this);
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo.nickName);
        wx.setStorage({
          key: 'userInfo',
          data: res.userInfo
        })
      }
    })
  }
})