var api = require('../../common/script/fetchOrder')

Page({
  data: {
    ordersList: '',
    title:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    api.getOrders.call(this, options.bs, options.state);
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
          body: '爱预售-购买'+selcOrder.CommName,
          out_trade_no: selcOrder.OrderCode,
          token: res.data,
        };
        api.requestPay.call(that,payData);
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