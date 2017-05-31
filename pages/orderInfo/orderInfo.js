let api = require('../../common/script/fetchOrder')

Page({
   data: {
      orderInfo:'',
      showPostage: false,
      showLoading: true
   },
   onLoad: function (options) {
      wx.showLoading({
         title: '正在加载中',
      });
      console.log(options)
      api.getOrderInfo.call(this, options.ordercode);
   },
   goToPay: function (e) {
      let that = this;
      let selcOrder = this.data.ordersList[e.currentTarget.dataset.index];
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
         }
      })
   }
})