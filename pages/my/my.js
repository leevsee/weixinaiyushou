var api = require('../../common/script/fetch')

Page({
  data: {
    ordersNum: '',
    mySaleOrders: [],
    userName: '',
    userImg:'',
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
      title: '玩命加载中',
    });
    api.getMyOrder.call(this);

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        // success
        console.log(res.data);
        that.setData({
          userName: res.data.nickName,
          userImg: res.data.avatarUrl
        })
      }
    })
  },
  onReachBottom: function () {
     console.log('onReachBottom');
     api.getMySaleOrder.call(this);
  },
  onPullDownRefresh: function () {
    var that = this
    this.setData({
      mySaleOrders:[],
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
    api.getDelSaleOrder.call(this,e.currentTarget.dataset.commcode);
  }
})