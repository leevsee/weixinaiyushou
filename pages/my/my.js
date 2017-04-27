var api = require('../../common/script/fetch')

Page({
  data: {
    ordersNum:'',
    condition: false
  },
  onLoad: function () {
    api.getMyOrder.call(this);
  },
  goToOrders: function (e) {
    wx.navigateTo({
      url: '../orders/orders?bs='+e.currentTarget.dataset.bs+'&state='+e.currentTarget.dataset.state+'&title='+e.currentTarget.dataset.title
    })
  }
})