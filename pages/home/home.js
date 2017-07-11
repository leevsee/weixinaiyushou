const api = require('../../common/script/fetch')
const common = require('../../common/script/common')
const config = require('../../common/script/config')
// const token = require('../../common/script/common')

Page({
   data: {
      classification: [],  //大分类信息
      category: [],        //x细小分类
      topLine: [],         //头条信息
      animation: '',       //动画效果
      showLoading: true,
      hiddenLoading: true
   },
   onLoad: function () {
      let that = this;
      wx.showNavigationBarLoading();
      //版本检测
      common.checkVersion(function (res) {
         console.log(res.data.SDKVersion > config.wxSDK);
         console.log(res.data.version >= config.wxVersion);

         if (res.data.SDKVersion > config.wxSDK) {
            api.getCategory.call(that);
         } else {
            //错误显示
            common.updataErr(that);
         }
      });
      // api.getTopLine.call(this);
      // token.getToken.call(this);
   },
   onPullDownRefresh: function () {
      let that = this;
      wx.showLoading({
         title: config.showLoadingText,
         mask: true
      });
      that.setData({
         classification: '',
         category: '',
         showLoading: true,
         hiddenLoading: true
      })
      that.onLoad();
      wx.stopPullDownRefresh();
   }, 
   //轮播图片跳转
   swiperPicOnClick: function (e) {
      console.log(e.target.dataset.url);
      wx.navigateTo({
         url: '../commodityList/commodityList?tcode=' + e.target.dataset.url.CommCode + '&single=true'
      })
   },
   //商品列表跳转
   goToCommodityList: function (e) {
      console.log(e.currentTarget.dataset);
      wx.navigateTo({
         url: '../commodityList/commodityList?tcode=' + e.currentTarget.dataset.tcode + '&tname=' + e.currentTarget.dataset.tname + '&remark=' + e.currentTarget.dataset.remark
      })
   },
   //头条信息处理
   goTotopLine: function (e) {
      console.log(e.currentTarget.dataset);
      //TODO

   },
   //test function
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