var api = require('../../common/script/fetch.js')

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    classification: '',
    category: '',
    topLine: '',
    showLoading: true,
    hiddenLoading: true
  },
  onLoad: function () {
    var that = this;
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '玩命加载中',
    });
    // wx.login({
    //   success: function (res) {
    //     console.log(res);
    //     wx.getUserInfo({
    //       success: function (res) {
    //         console.log(res);
    //       }
    //     })
    //   }
    // })
    api.getCategory.call(that);
    api.getTopLine.call(that);
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
  },
  goTotopLine: function (e) {
    console.log(e.currentTarget.dataset);
  },
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      classification: '',
      category: '',
      showLoading: true,
      hiddenLoading: true
    })
    this.onLoad();
    wx.stopPullDownRefresh();
  },
  swiperPicOnClick: function (e) {
    console.log(e);
    console.log(e.target);
    console.log(e.target.dataset);
  },
  goToCommodityList: function (e) {
    // console.log(e.currentTarget.dataset.tcode)
    wx.navigateTo({
      url: '../commodityList/commodityList?tcode=' + e.currentTarget.dataset.tcode
    })
  }
})