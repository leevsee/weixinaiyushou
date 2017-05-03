var api = require('../../common/script/fetch')

Page({
  data: {
    ordersNum: '',
    condition: true,
    showLoading: true
  },
  onLoad: function () {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '玩命加载中',
    });
    api.getMyOrder.call(this);
  },
  onPullDownRefresh: function () {
    var that = this
    // that.setData({
    //   ordersNum: ''
    // })
    this.onLoad();
    wx.stopPullDownRefresh();
  },
  goToOrders: function (e) {
    wx.navigateTo({
      url: '../orders/orders?bs=' + e.currentTarget.dataset.bs + '&state=' + e.currentTarget.dataset.state + '&title=' + e.currentTarget.dataset.title
    })
  }
})