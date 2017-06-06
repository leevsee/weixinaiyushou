const config = require('./config');
const common = require('./common')
const message = require('../../component/message/message')
const err = require('../../component/err/err')
const hasMore = require('../../component/hasMore/hasMore')

/**
 * 订单页面信息
 */
function addOrder(commCode, cb, fail_cb) {
   console.log('addOrder');
   let that = this;
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
               url: config.apiList.commodityInfo,
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
                        totlePrice: res.data.SalePrice + that.data.postage,
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
 * 删除订单
 */
function delOrder(orderCode, cb, fail_cb) {
   console.log('delOrder');
   let that = this;
   //删除提示
   wx.showModal({
      title: '提示',
      content: '是否删除该未付款的订单',
      confirmColor: '#1392e3',
      success: function (res) {
         if (res.confirm) {
            console.log('用户点击确定')
            wx.showLoading({
               title: '正在删除中',
               mask: true
            });
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
                           delOrder.call(that, orderCode);
                        }
                     }, '');
                  } else {
                     wx.request({
                        url: config.apiList.delOrder,
                        data: {
                           OrderCode: orderCode,
                           token: res.data
                        },
                        method: 'POST',
                        header: {
                           'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                           console.log(res);
                           if (res.data.Msg == 'ok') {
                              wx.hideLoading();
                              wx.showToast({
                                 title: '删除成功',
                                 icon: 'success',
                                 mask: true,
                                 duration: 1000
                              })
                              let tmp = that.data.ordersList;
                              //显示列表删除
                              tmp.map(function (item, i) {
                                 if (item.OrderCode == orderCode) {
                                    tmp.splice(i, 1);
                                 }
                              });
                              console.log(tmp);
                              //更新删除后数据
                              that.setData({
                                 ordersList: tmp
                              });
                           } else {
                              wx.hideLoading();
                              wx.showModal({
                                 title: '删除错误',
                                 content: '删除失败,请刷新页面后再尝试',
                                 showCancel: false,
                                 confirmColor: '#1392e3',
                                 success: function (res) {
                                    if (res.confirm) {
                                       console.log('用户点击确定')
                                    } else if (res.cancel) {
                                       console.log('用户点击取消')
                                    }
                                 }
                              })
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
      }
   })
}

/**
 * 订单详细情况信息
 */
function fecthOrderInfo(orderCode, cb, fail_cb) {
   console.log('fecthOrderInfo');
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
                  fecthOrderInfo.call(that, orderCode);
               }
            }, '');
         } else {
            wx.request({
               url: config.apiList.orderInfo,
               data: {
                  CommCode: orderCode,
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
                           fecthOrderInfo.call(that, orderCode);
                        }
                     }, '');
                  } else {
                     that.setData({
                        orderInfo: res.data,
                        orderTrace: res.data.ReturnTrace,
                        showLoading: false
                     });
                     wx.hideLoading();
                  }
               },
               fail: function (res) {
                  // fail
                  common.netErr(that);
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
   let that = this;
   //确认下单提示
   wx.showModal({
      title: '提示',
      content: '是否确认下单',
      confirmColor: '#1392e3',
      success: function (res) {
         if (res.confirm) {
            wx.showLoading({
               title: '正在下单中。。。',
               mask: true
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
                  if (res.data.return_code == 'SUCCESS') {
                     wx.requestPayment({
                        timeStamp: String(res.data.timeStamp),
                        nonceStr: res.data.nonce_str,
                        package: 'prepay_id=' + res.data.prepay_id,
                        signType: 'MD5',
                        paySign: res.data.sign,
                        success: function (res) {
                           // success
                           console.log(res);
                           // wx.redirectTo({
                           //    url: '../orders/orders?bs=1&state=1&title=订单 - 待发货'
                           // })
                           common.myToast('success', '付款成功，正在跳转中', function () {
                              setTimeout(function () {
                                 wx.redirectTo({
                                    url: '../orders/orders?bs=1&state=1&title=订单 - 待发货'
                                 })
                              }, 1500);
                           })
                        },
                        fail: function (res) {
                           // fail
                           // wx.redirectTo({
                           //    url: '../orders/orders?bs=1&state=0&title=订单 - 待付款'
                           // })
                           common.myToast('err', '付款失败，请重新再试', function () {
                              setTimeout(function () {
                                 wx.redirectTo({
                                    url: '../orders/orders?bs=1&state=0&title=订单 - 待付款'
                                 })
                              }, 1000);
                           })
                        },
                        complete: function (res) {
                           // complete
                        }
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
   let that = this;
   hasMore.showLoading.call(that);
   wx.getStorage({
      key: 'token',
      success: function (res) {
         console.log(res)
         //我的订单接口请求
         wx.request({
            url: config.apiList.orders,
            data: {
               BS: buyOrSell,
               FK_CodeID_Status: state,
               pageIndex: that.data.page,
               pageSize: config.pageNum,
               token: res.data
            },
            method: 'GET',
            success: function (res) {
               console.log(res.data);
               if (res.data.length == 0) {
                  hasMore.noContent.call(that);
               } else {
                  that.setData({
                     page: that.data.page + 1,
                     ordersList: that.data.ordersList.concat(res.data)
                  });
                  if (res.data.length == config.pageNum) {
                     hasMore.showButton.call(that);
                  } else {
                     hasMore.noContent.call(that);
                  }
               }
               if (that.data.showLoading) {
                  that.setData({
                     showLoading: false
                  });
               }
               wx.hideLoading();
            },
            fail: function (res) {
               // fail
            }
         })
      }
   })
}

/**
 * 请求订单支付
 */
function fetchPay(payData, cb, fail_cb) {
   console.log('fetchPay');
   console.log(payData);
   //小程序支付自带有loading
   // wx.showLoading({
   //    title: '正在付款中。。。',
   //    mask:true
   // });
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
         if (res.data.return_msg === '订单已过期！') {
            common.myToast('err', '订单已过期，请重新刷新页面！', function () {
               setTimeout(function () {
                  wx.redirectTo({
                     url: '../orders/orders?bs=1&state=0&title=订单 - 待付款'
                  });
               }, 1500);
            })
         } else {
            wx.requestPayment({
               timeStamp: String(res.data.timeStamp),
               nonceStr: res.data.nonce_str,
               package: 'prepay_id=' + res.data.prepay_id,
               signType: 'MD5',
               paySign: res.data.sign,
               success: function (res) {
                  // success
                  console.log('requestPayment sucess:');
                  console.log(res);

                  common.myToast('success', '付款成功，正在跳转中', function () {
                     setTimeout(function () {
                        wx.redirectTo({
                           url: '../orders/orders?bs=1&state=1&title=订单 - 待发货'
                        })
                     }, 1500);
                  })

               },
               fail: function (res) {
                  // fail
                  console.log('requestPayment fail:');
                  console.log(res);

                  common.myToast('err', '付款失败，请重新再试', function () {
                     setTimeout(function () {
                        wx.redirectTo({
                           url: '../orders/orders?bs=1&state=0&title=订单 - 待付款'
                        });
                     }, 1500);
                  })
                  // common.myToast('err', '付款失败，请重新再试');              
               },
               complete: function (res) {
                  // complete
               }
            })
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

module.exports = {
   getOrder: addOrder,
   getDelOrder: delOrder,
   confirmOrder: confirmOrder,
   getOrders: fetchOrders,
   getOrderInfo: fecthOrderInfo,
   requestPay: fetchPay
}