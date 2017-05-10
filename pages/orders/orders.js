var api = require('../../common/script/fetchOrder')

Page({
   data: {
      ordersList: [],
      title: '',
      options: '',
      page: 0,
      hasMore: {
         type: 2
      },
      showLoading: true
   },
   onLoad: function (options) {
      wx.showLoading({
         title: '玩命加载中',
      });
      this.setData({
         options: options
      })
      wx.setNavigationBarTitle({
         title: options.title
      })
      api.getOrders.call(this, options.bs, options.state);
   },
   onReachBottom: function () {
      // Do something when page reach bottom.
      console.log('onReachBottom');

      api.getOrders.call(this, this.data.options.bs, this.data.options.state);
   },
   onPullDownRefresh: function () {
      this.setData({
         page: 0,
         ordersList: [],
         showLoading: true
      })
      this.onLoad(this.data.options);
      wx.stopPullDownRefresh();
   },
   goToPay: function (e) {
      var that = this;
      var selcOrder = this.data.ordersList[e.currentTarget.dataset.index];
      console.log('====================')
      console.log(this.data.ordersList[e.currentTarget.dataset.index]);
      wx.getStorage({
         key: 'token',
         success: function (res) {
            // success
            var payData = {
               body: '爱预售-购买' + selcOrder.CommName,
               out_trade_no: selcOrder.OrderCode,
               token: res.data,
            };
            api.requestPay.call(that, payData);
         },
         fail: function (res) {
            // fail
         },
         complete: function (res) {
            // complete
         }
      })
   }
})