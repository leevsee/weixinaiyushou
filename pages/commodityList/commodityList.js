var api = require('../../common/script/fetch')

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    commodityList: '',
    options: '',
    showLoading: true,
    setHeight: '',
    hasMore:false
  },
  onLoad: function (options) {
    var that = this
    console.log(options.tcode);
    wx.getSystemInfo({
      success: function (res) {
        let nowH = 'height:' + (res.windowHeight - (res.screenWidth / 750) * 132) + 'px';
        console.log(nowH);
        that.setData({
          options: options,
          setHeight: nowH
        })
      }
    })

    api.getCommodity.call(this, options.tcode, "10", "0");
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log("onReachBottom");
  },
  scrollTest: function (e) {
    console.log(e)
  },
  onPullDownRefresh: function () {
    this.setData({
      commodityList: '',
      showLoading: true
    })
    this.onLoad(this.data.options);
    wx.stopPullDownRefresh();
  },
  goToPurchase: function (e) {
    console.log(e.currentTarget.dataset.commcode)
    wx.navigateTo({
      url: '../purchase/purchase?commcode=' + e.currentTarget.dataset.commcode
    })
  },
  goToPic: function (e) {
    console.log(e.currentTarget.dataset.commcode);
    wx.navigateTo({
      url: '../showPic/showPic?commcode=' + e.currentTarget.dataset.commcode
    })
  },
  goToVideo: function (e) {
    console.log(e.currentTarget.dataset.commcode);
    wx.navigateTo({
      url: '../showPic/showPic?commcode=' + e.currentTarget.dataset.commcode
    })
  }
})