var api = require('../../common/script/fetch.js')
// var token = require('../../common/script/common')

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
    wx.showNavigationBarLoading();
    api.getCategory.call(this);
    // api.getTopLine.call(this);
    // token.getToken.call(this);
  },
  goTotopLine: function (e) {
    console.log(e.currentTarget.dataset);
  },
  onPullDownRefresh: function () {
    // var that = this
    wx.showLoading({
      title: '玩命加载中',
      mask: true
    });
    this.setData({
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
  },
  mytest:function(){
    console.log('mytest btn');
    wx.setStorage({
      key: 'token',
      data: null,
      success: function(res){
        // success
        console.log('token is null');
      }
    })
  }
})