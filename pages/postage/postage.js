Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    condition: false,
    hasMore:false
  },
  onLoad: function () {
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
          }
        });
        console.log("session 未过期");
        console.log(Math.random().toString(36).substr(2) + "====" + Math.random().toString(36).substr(2))

      },
      fail: function () {
        console.log("登录态过期");
        //登录态过期
        wx.login({
          success: function (res) {
            // console.log(res);
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                data: {
                  appid: "wx188076801577a0b0",
                  secret: "62603a9abe0a8d856adccde9a2b1e226",
                  js_code: res.code,
                  grant_type: "authorization_code"
                }, success: function (res) {
                  console.log(res)
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });

      }
    });

  },
  goToStation: function () {
    wx.navigateTo({
      url: '../selectStation/selectStation'
    })
  }
})