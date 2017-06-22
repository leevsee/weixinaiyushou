let api = require('../../common/script/fetch')
let common = require('../../common/script/common')
let config = require('../../common/script/config')

Page({
   data: {
      ordersNum: '',
      mySaleOrders: [],
      userName: '',
      userImg: '',
      income: '0.00',
      expenditure: '0.00',
      percent: '0',
      percentage: 'inherit',
      page: 0,
      hasMore: {
         type: 2
      },
      showLoading: true
   },
   onLoad: function () {
      let that = this;
      wx.showLoading({
         title: config.showLoadingText,
      });
      //微信版本判断
      common.checkVersion(function (res) {
         if (res.data.SDKVersion > config.wxSDK && res.data.version >= config.wxVersion) {
            api.getMyOrder.call(that);

            wx.getStorage({
               key: 'userInfo',
               success: function (res) {
                  // success
                  console.log(res.data);
                  that.setData({
                     userName: res.data.nickName,
                     userImg: res.data.avatarUrl
                  })
               },
               //授权失败重新获取授权
               fail: (res) => {
                  console.log('getUserInfo fail=========');
                  wx.openSetting({
                     success: (res) => {
                        console.log('openSetting success')
                        if (!res.authSetting['scope.userInfo']) {
                           wx.showToast({
                              title: config.authFail,
                              image: '/res/err2.png',
                           })
                        } else {
                           wx.getUserInfo({
                              success: function (res) {
                                 console.log(res.userInfo.nickName);
                                 wx.setStorage({
                                    key: 'userInfo',
                                    data: res.userInfo
                                 })
                                 that.onLoad();
                              }
                           })
                        }
                     }
                  })
               }
            })
         } else {
            common.updataErr(that);
         }
      });
   },
   onReachBottom: function () {
      console.log('onReachBottom');
      api.getMySaleOrder.call(this);
   },
   onPullDownRefresh: function () {
      let that = this
      this.setData({
         mySaleOrders: [],
         page: 0,
         showLoading: true
      })
      this.onLoad();
      wx.stopPullDownRefresh();
   },
   goToOrders: function (e) {
      wx.navigateTo({
         url: '../orders/orders?bs=' + e.currentTarget.dataset.bs + '&state=' + e.currentTarget.dataset.state + '&title=订单 - ' + e.currentTarget.dataset.title
      })
   },
   delMySaleComm: function (e) {
      console.log(e.currentTarget.dataset.commcode);
      api.getDelSaleOrder.call(this, e.currentTarget.dataset.commcode);
   }
})