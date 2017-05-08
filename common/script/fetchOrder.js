const config = require('./config');
const common = require('./common')
const message = require('../../component/message/message')
const err = require('../../component/err/err')

/**
 * 订单页面信息
 */
function addOrder(commCode, cb, fail_cb) {
  console.log('addOrder');
  var that = this
  wx.getStorage({
    key: 'token',
    success: function (res) {
      console.log(res.data)
      //若token为kong，则重新获取
      if (res.data == null) {
        common.getToken(function (token) {
          if (token == null) {
            common.netErr(that);
          } else {
            addOrder.call(that, commCode);
          }
        }, '');
      } else {
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
            if (res.data.error_code == -1) {
              common.getToken(function (token) {
                if (token == null) {
                  common.netErr(that);
                } else {
                  addOrder.call(that, commCode);
                }
              }, '');
            } else {
              that.setData({
                commCode: res.data.CommCode,
                commName: res.data.CommName,
                price: res.data.SalePrice,
                totlePrice: res.data.SalePrice + 10,
                stock: res.data.Stock,
                deliveryPrice: res.data.ResalePrice,
                totleDeliveryPrice: res.data.ResalePrice,
                dispalyResale: res.data.IsResale,
                item: res.data,
                showLoading: false
              });
              wx.hideLoading();
            }
          },
          fail: function (res) {
            // fail
          },
          complete: function (res) {
            // complete
          }
        })
      }
    }
  })
}

/**
 * 提交订单
 */
function confirmOrder(data, cb, fail_cb) {
  console.log('confirmOrder');
  console.log(data);
  //确认下单提示
  wx.showModal({
    title: '提示',
    content: '是否确认下单',
    confirmColor:'#1392e3',
    success: function (res) {
      if (res.confirm) {
        wx.showLoading({
          title: '正在下单中。。。',
        });
        //下单提交
        wx.request({
          url: config.apiList.ordering,
          data: data,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            console.log(res);
            //如果返回信息成功，跳转待付款界面
            if (res.data.Msg == 'ok') {
              wx.redirectTo({
                url: '../orders/orders?bs=1&state=0&title=待付款'
              })
            } else {
              //否则提示下单失败，返回商品列表界面
              common.errShow('下单失败，请重新提交', '../home/home');
            }
          },
          fail: function (res) {
            // 请求失败
            common.errShow('网络通信有误，请重新提交', '../home/home');
          },
          complete: function (res) {
            // complete
            wx.hideLoading();
          }
        })
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

/**
 * 获得我的订单
 */
function fetchOrders(buyOrSell, state, cb, fail_cb) {
  console.log('fetchOrders');
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
          wx.hideLoading();
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

/**
 * 请求订单支付
 */
function fetchPay(payData, cb, fail_cb) {
  console.log('fetchPay');
  console.log(payData);
  wx.request({
    url: config.apiList.orderPay,
    data: payData,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function (res) {
      // success
      console.log(res.data)
      wx.requestPayment({
        timeStamp: String(res.data.timeStamp),
        nonceStr: res.data.nonce_str,
        package: 'prepay_id=' + res.data.prepay_id,
        signType: 'MD5',
        paySign: res.data.sign,
        success: function (res) {
          // success
          console.log(res);
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
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

module.exports = {
  getOrder: addOrder,
  confirmOrder: confirmOrder,
  getOrders: fetchOrders,
  requestPay: fetchPay
}