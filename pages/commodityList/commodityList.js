var api = require('../../common/script/fetch')

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    commodityList: ''
  },
  onLoad: function () {
    let that = this;
    api.getCommodity.call(this, "001001", "10", "0");
  }, onReachBottom: function () {
    // Do something when page reach bottom.
    console.log("onReachBottom");
  },
  scrollTest: function (e) {
    console.log(e)
  },
  goToPurchase: function (e) {
    console.log(e.currentTarget.dataset.commcode)
    wx.navigateTo({
      url: '../purchase/purchase?commcode='+e.currentTarget.dataset.commcode
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