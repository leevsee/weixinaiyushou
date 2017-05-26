let api = require('../../common/script/fetchOrder')

Page({
   data: {
      imgUrls: '',
      commName: '',
      price: '',
      num: 1,
      postage: 0,
      totlePrice: '',
      deliveryNum: 1,
      deliveryPrice: '',
      totleDeliveryPrice: '',
      stock: '',
      address: '',
      message: '',
      dispalyResale: true,
      isDelivery: false,
      isResale: false,
      stationId: 0,
      stationName: '',
      item: '',
      express_height:'100',
      showPostage: false,
      showLoading: true
   },
   onLoad: function (options) {
      // wx.showLoading({
      //    title: '加载中',
      // });
      console.log(options)
      // api.getOrder.call(this, options.commcode);
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