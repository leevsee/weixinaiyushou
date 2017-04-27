var api = require('../../common/script/fetchOrder')

Page({
  data: {
    ordersList: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    api.getOrders.call(this, options.bs, options.state);
  }
})