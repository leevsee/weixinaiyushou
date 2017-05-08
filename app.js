//app.js
var api = require('./common/script/common')

App({
  onLaunch: function () {
    wx.showLoading({
      title: '玩命加载中',
      mask: true
    });
    console.log(wx.canIUse('chooseAddress'));
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