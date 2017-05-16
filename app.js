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

   // 登陆获取OPID测试
   //  wx.login({
   //     success: function (res) {
   //        if (res.code) {
   //           //发起网络请求
   //           console.log('login');
   //           wx.request({
   //              url: 'https://api.weixin.qq.com/sns/jscode2session',
   //              data: {
   //                 appid: 'wx584d55692bf63f7a',
   //                 secret: '43bd6d3d7b9bd2bb71527f6ebce1c47b',
   //                 js_code: res.code,
   //                 grant_type: 'authorization_code'
   //              },
   //              success:function(res){
   //                 console.log(res);
   //              }
   //           })
   //        } else {
   //           console.log('获取用户登录态失败！' + res.errMsg)
   //        }
   //     }
   //  });
   
  }

})