const config = require('./config');
const message = require('../../component/message/message')
const err = require('../../component/err/err')

//订单页面信息
function addOrder(commCode, cb, fail_cb) {
  var that = this
  wx.getStorage({
    key: 'token',
    success: function (res) {
      console.log(res.data)
      wx.request({
        url: config.apiList.orderInfo,
        data: {
          CommCode: commCode,
          token: res.data
        },
        method: 'GET',
        success: function (res) {
          // success
          console.log(res)
          that.setData({
            commCode: res.data.CommCode,
            commName: res.data.CommName,
            price: res.data.SalePrice,
            totlePrice: res.data.SalePrice + 10,
            stock: res.data.Stock,
            deliveryPrice: res.data.ResalePrice,
            totleDeliveryPrice: res.data.ResalePrice,
            dispalyResale: res.data.IsResale,
            item: res.data
          });
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
}

//提交订单
function confirmOrder(data, cb, fail_cb) {
  console.log(data);
  wx.request({
    url: config.apiList.ordering,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      // success
      console.log(res);
      wx.redirectTo({
        url: '../orders/orders?bs=1&state=0&title=待付款'
      })
    },
    fail: function (res) {
      // fail
    },
    complete: function (res) {
      // complete
    }
  })
}

/**
 * 
 */
function fetchOrders(buyOrSell, state, cb, fail_cb) {
  var that = this;
  wx.getStorage({
    key: 'token',
    success: function (res) {
      console.log(res)
      // success
      wx.request({
        url: config.apiList.orders,
        data: {
          BS: buyOrSell,
          FK_CodeID_Status: state,
          pageIndex: 0,
          pageSize: 5,
          token: res.data
        },
        method: 'GET',
        success: function (res) {
          // success
          console.log(res)
          that.setData({
            ordersList: res.data
          });
        },
        fail: function (res) {
          // fail
        }
      })
    },
    fail: function (res) {
      // fail
    }
  })

}

module.exports = {
  getOrder: addOrder,
  confirmOrder: confirmOrder,
  getOrders: fetchOrders
}