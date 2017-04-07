//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'IP查询',
    userInfo: {},
    ipNum: null,
    city: null,
    province: null,
    country: null,
    isp: null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  testIP: function () {
    // var that = this;
    // app.getIPInfo(this.data.ipNum, function (res) {
    //   console.log(res.data.Base_info);
    //   that.setData({
    //     city: res.data.Base_info.city,
    //     province: res.data.Base_info.province,
    //     country: res.data.Base_info.country,
    //     isp: res.data.Base_info.isp
    //   });
    // });
    wx.chooseLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(res);
        // wx.openLocation({
        //   latitude: latitude,
        //   longitude: longitude,
        //   scale: 28
        // })
      }
    });
  },
  getInput: function (e) {

    this.setData({
      ipNum: e.detail.value
    });
    console.log(this.data.ipNum);
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  goToTestParm: function () {
    var name = "BBB";
    var age = 15;
    wx.navigateTo({
      url: '../testParm/testParm?name=' + name + '&age=' + age,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})
