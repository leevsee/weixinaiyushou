var api = require('../../common/script/fetch')

Page({
  data: {
    ordersNum: '',
    mySaleOrders: '',
    userName: '',
    income: '0.00',
    expenditure: '0.00',
    percent: '0',
    percentage: 'inherit',
    condition: true,
    showLoading: true
  },
  onLoad: function () {
    let that = this;
    wx.showLoading({
      title: '玩命加载中',
    });
    api.getMyOrder.call(this);

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        // success
        console.log(res.data);
        that.setData({
          userName: res.data.nickName
        })
      }
    })
  },
  onPullDownRefresh: function () {
    var that = this
    // that.setData({
    //   ordersNum: ''
    // })
    this.setData({
      mySaleOrders:'',
      showLoading: true
    })
    this.onLoad();
    wx.stopPullDownRefresh();
  },
  goToOrders: function (e) {
    wx.navigateTo({
      url: '../orders/orders?bs=' + e.currentTarget.dataset.bs + '&state=' + e.currentTarget.dataset.state + '&title=' + e.currentTarget.dataset.title
    })
  },
  delComm: function (e) {
    console.log(e.currentTarget.dataset.commcode);
    api.getDelSaleOrder.call(this,e.currentTarget.dataset.commcode);
  }
})