var app = getApp();

Page({
  data: {
    name: 'ABC',
    age: '123',
    date: '',
    title: '',
    picUrl: null,
    results: null
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    // console.log(options);
    // this.setData({
    //   name: options.name,
    //   age: options.age
    // });
    wx.setNavigationBarTitle({
      title: 'Leeves小程序'
    })
    var that = this;
    app.getGankAbstr(10, 1, function (res) {
      res.data.results.map(function (item, i) {
        item.content = item.content.match(/http.*jpg+/i)[0];
        item.publishedAt = item.publishedAt.substring(0, 10);
      });
      that.setData({
        results: res.data.results
      });
    });
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
      title: '分享标题', // 分享标题
      desc: '分享描述', // 分享描述
      path: '分享路径' // 分享路径
    }
  },
  itemOnClick: function (event) {
    console.log(event.currentTarget.dataset.time);
    console.log(event.currentTarget.dataset.title);
    wx.navigateTo({
      url: '../dataDetail/dataDetail?time=' + event.currentTarget.dataset.time + '&title=' + event.currentTarget.dataset.title,
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
  },
  itemMeizhiOnClick: function (event) {
    console.log(event.currentTarget.dataset);
    wx.navigateTo({
      url: '../dataDetail/dataDetail?meizhi=' + event.currentTarget.dataset.meizhi,
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