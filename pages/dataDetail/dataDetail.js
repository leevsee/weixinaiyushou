var app = getApp();

Page({
  data: {
    date: '',
    category: '',
    android: '',
    ios: '',
    restVideo: '',
    expand: '',
    frontEnd: '',
    seeWhat: '',
    app: '',
    meizhi: '',
    condition: true
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    // console.log(options.time.substring(0,4));
    // console.log(options.time.substring(5,7));
    // console.log(options.time.substring(8,10));
    if (options.time == undefined) {
      this.setData({
        condition: false,
        meizhi: options.meizhi
      });
      wx.setNavigationBarTitle({
        title: '妹纸福利'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '傻'
      })
    }
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        // var userInfo = res.userInfo
        // var nickName = userInfo.nickName
        // var avatarUrl = userInfo.avatarUrl
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女 
        // var province = userInfo.province
        // var city = userInfo.city
        // var country = userInfo.country
      }
    })


    // this.setData({
    //   date: options.time
    // });
    // var that = this;
    // app.getGankDateAbstr(options.time.substring(0,4), options.time.substring(5,7), options.time.substring(8,10), function (res) {
    //   console.log(res);
    // res.data.results.map(function (item, i) {
    //   item.content = item.content.match(/http.*jpg+/i)[0];
    //   item.publishedAt = item.publishedAt.substring(0, 10);
    // });
    // that.setData({
    //   results: res.data.results
    // });
    // });
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})