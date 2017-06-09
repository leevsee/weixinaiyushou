let api = require('../../common/script/fetchOrder')

Page({
   data: {
      orderInfo:'',
      orderTrace:[],
      options:{},
      showPostage: false,
      showLoading: true
   },
   onLoad: function (options) {
      wx.showLoading({
         title: '正在加载中',
      });
      console.log(options)
      this.setData({
         options: options
      })
      api.getOrderInfo.call(this, options.ordercode);
   },
   goToPay: function (e) {
      let that = this;
      console.log('====================')
      wx.getStorage({
         key: 'token',
         success: function (res) {
            // success
            let payData = {
               body: '爱预售-购买' + that.data.orderInfo.CommName,
               out_trade_no: that.data.orderInfo.OrderCode,
               token: res.data,
            };
            api.requestPay.call(that, payData);
         }
      })
   }
})