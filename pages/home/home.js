let api = require('../../common/script/fetch')
let common = require('../../common/script/common')
let config = require('../../common/script/config')
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
      animation:'',
      showLoading: true,
      hiddenLoading: true
   },
   onLoad: function () {
      let that = this;
      wx.showNavigationBarLoading();

      common.checkVersion(function (res) {
         if (res.data.SDKVersion > config.wxSDK && res.data.version >= config.wxVersion) {
            api.getCategory.call(that);
         } else {
            common.updataErr(that);
         }
      });


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
   mytest: function () {
      console.log('mytest btn');
      wx.navigateTo({
         url: '../orderInfo/orderInfo'
      })
      // common.myToast('success','成功' , '')

      // wx.showToast({
      //    title: '测试跳转',
      //    icon: 'icon',
      //    image: '/res/err2.png',
      //    mask: true,
      //    duration: 2000,
      //    success: function () {
      //       setTimeout(function () {
      //          wx.redirectTo({
      //             url: '../orders/orders?bs=1&state=0&title=订单 - 待付款'
      //          })
      //       }, 2000)
      //    }
      // })
   }
})