var api = require('../../common/script/fetchStation')

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    stationName: '',
    commodityList: '',
    isSelect: false,
    hasMore: false,
    showLoading: true,
    hiddenLoading: true
  },
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '玩命加载中',
    });
    console.log(options);
    if (options.id == undefined) {
      api.getStation.call(this);
    } else {
      api.getStationByID.call(this,options.id);
      this.setData({
        stationName:options.stationname
      });
    }
  },
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      stationName: '',
      commodityList: '',
      showLoading: true,
      hiddenLoading: true
    })
    this.onLoad();
    wx.stopPullDownRefresh();
  },
  goToStation: function () {
    wx.navigateTo({
      url: '../selectStation/selectStation'
    })
  },
  goToPurchase: function () {
    wx.navigateTo({
      url: '../purchase/purchase'
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