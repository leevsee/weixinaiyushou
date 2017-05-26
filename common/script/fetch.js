const config = require('./config');
const common = require('./common');
const message = require('../../component/message/message')
const loading = require('../../component/loading/loading')
const hasMore = require('../../component/hasMore/hasMore')

/**
 * 获取分类
 */
function fetchCategory(cb, fail_cb) {
   console.log('fetchCategory');
   let that = this;
   message.hide.call(that);
   //分类请求
   wx.request({
      url: config.apiList.category,
      data: {
         TCode: config.categoryTCode,
         pageSize: config.categoryNum
      },
      method: 'GET',
      success: function (res) {
         console.log(res);
         if (res.statusCode == 200) {
            let allCategory = new Array();
            allCategory[0] = [];
            allCategory[1] = [];
            //区分大商品和小商品分类
            res.data.map(function (item, i) {
               if (item.TCode.substring(0, 3) == "001") {
                  allCategory[0].push(item);
               } else {
                  allCategory[1].push(item);
               }
            });
            //更新数据
            that.setData({
               showLoading: false,
               classification: allCategory[0],
               category: allCategory[1]
            });
            //获取头条
            fetchTopLine.call(that);
            //获取首页轮播图
            fetchSlideShow.call(that);
            wx.hideLoading();
            wx.hideNavigationBarLoading();
         } else {
            common.netErr(that);
         }
         typeof cb == 'function' && cb(allCategory);
      },
      fail: function (res) {
         common.netErr(that);
         wx.hideLoading();
         typeof fail_cb == 'function' && fail_cb();
      }
   })
}


/**
 * 获取头条
 */
function fetchTopLine(cb, fail_cb) {
   console.log('fetchTopLine');
   let that = this;
   // message.hide.call(that);
   loading.show.call(that);
   //头条请求
   wx.request({
      url: config.apiList.topLine,
      data: {
      },
      method: 'GET',
      success: function (res) {
         console.log(res);
         if (res.statusCode == 200) {
            let topLine = new Array();
            //把头条列表变成两条为一组的数组
            // for (let [i, temp] = [0, res.data.length]; i < temp; i = i + 2) {
            for (let i = 0; i < res.data.length; i = i + 2) {
               topLine[i] = [];
               topLine[i][0] = res.data[i];
               topLine[i][1] = res.data[i + 1];
            };
            // for (let [i, temp] = [0, topLine.length]; i < temp; i++) {
            for (let i = 0; i < topLine.length; i++) {
               if (topLine[i] == "" || typeof (topLine[i]) == "undefined") {
                  topLine.splice(i, 1);
                  i = i - 1;
               }
            };
            //更新数据
            that.setData({
               showLoading: false,
               topLine: topLine,
               animation: 'swiperSlide'+topLine.length
            });
            loading.hide.call(that);
            wx.hideNavigationBarLoading();
            wx.hideLoading();
         }
         typeof cb == 'function' && cb(topLine);
      },
      fail: function (res) {
         common.netErr(that);
         wx.hideLoading();
         typeof fail_cb == 'function' && fail_cb();
      }
   })
}

/**
 * 获取首页轮播图
 */
function fetchSlideShow(cb, fail_cb) {
   console.log('fetchSlideShow');
   let that = this;
   loading.show.call(that);
   //轮播图请求
   wx.request({
      url: config.apiList.slideShow,
      data: {
      },
      method: 'GET',
      success: function (res) {
         console.log(res);
         if (res.statusCode == 200) {
            //更新数据
            that.setData({
               imgUrls: res.data
            });
            loading.hide.call(that);
            wx.hideNavigationBarLoading();
            wx.hideLoading();
         }
         typeof cb == 'function' && cb(topLine);
      },
      fail: function (res) {
         common.netErr(that);
         wx.hideLoading();
         typeof fail_cb == 'function' && fail_cb();
      }
   })
}

/**
 * 获取商品列表
 */
function fetchCommodity(typeCode, cb, fail_cb) {
   console.log('fetchCommodity');
   let that = this;
   hasMore.showLoading.call(that);
   //商品列表请求
   wx.request({
      url: config.apiList.commodity,
      data: {
         FK_TypeCode: typeCode,
         pageIndex: that.data.page,
         pageSize: config.pageNum
      },
      method: 'GET',
      success: function (res) {
         console.log(res)
         if (res.data.length == 0) {
            hasMore.noContent.call(that);
         } else {
            that.setData({
               page: that.data.page + 1,
               commodityList: that.data.commodityList.concat(res.data)
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
         wx.hideNavigationBarLoading();
         wx.hideLoading()
      },
      fail: function (res) {
         // fail
         common.netErr(that);
      }
   })
}

/**
 * 转售信息
 */
function fetchResaleInfo(code, cb, fail_cb) {
   console.log('fetchResaleInfo');
   //商品列表请求
   wx.request({
      url: config.apiList.commodityResaleInfo,
      data: {
         ParentCode: code,
         pageIndex: that.data.page,
         pageSize: config.pageNum
      },
      method: 'GET',
      success: function (res) {
         console.log(res)

         wx.hideNavigationBarLoading();
         wx.hideLoading()
      },
      fail: function (res) {
         // fail
         common.netErr(that);
      }
   })
}

/**
 * 获取订单数量
 */
function fetchMyOrder(cb, fail_cb) {
   console.log('fetchMyOrder');
   let that = this;
   message.hide.call(that);
   //获取token
   wx.getStorage({
      key: 'token',
      success: function (res) {
         console.log(res.data);
         //若token为null，则重新获取
         if (res.data == null) {
            common.getToken(function (token) {
               if (token == null) {
                  common.netErr(that);
               } else {
                  fetchMyOrder.call(that);
               }
            }, '');
         } else {
            // 订单请求
            wx.request({
               url: config.apiList.myOrderNum,
               data: {
                  token: res.data
               },
               method: 'GET',
               success: function (res) {
                  console.log(res);
                  if (res.data.error_code == -1) {
                     common.getToken(function (token) {
                        fetchMyOrder.call(that);
                     }, '');
                  } else {
                     //更新数据
                     that.setData({
                        ordersNum: res.data,
                        percent: res.data.return_Value.toFixed(0),
                        income: res.data.SIncome.toFixed(2),
                        expenditure: res.data.SPay.toFixed(2),
                        percentage: res.data.return_Value,
                        showLoading: false
                     });
                     loading.show.call(that);
                     //获取转、预售订单
                     fetchMySaleOrder.call(that);
                     wx.hideNavigationBarLoading();
                     wx.hideLoading();
                  }
               },
               fail: function (res) {
                  // fail
                  console.log('request fail');
                  common.netErr(that);
               }
            })
         }
      },
      fail: function (res) {
         // fail
         console.log('getStorage fail');
         common.netErr(that);
      }
   })
}

/**
 * 转、预售订单
 */
function fetchMySaleOrder(cb, fail_cb) {
   console.log('fetchMySaleOrder');
   let that = this;
   hasMore.showLoading.call(that);
   //获取token
   wx.getStorage({
      key: 'token',
      success: function (res) {
         console.log(res.data);
         // 转、预售订单请求
         wx.request({
            url: config.apiList.mySaleOrder,
            data: {
               pageIndex: that.data.page,
               pageSize: config.pageNum,
               token: res.data
            },
            method: 'GET',
            success: function (res) {
               console.log(res);
               //更新数据
               if (res.data.length == 0) {
                  hasMore.noContent.call(that);
               } else {
                  that.setData({
                     page: that.data.page + 1,
                     mySaleOrders: that.data.mySaleOrders.concat(res.data)
                  });
                  if (res.data.length == config.pageNum) {
                     hasMore.showButton.call(that);
                  } else {
                     hasMore.noContent.call(that);
                  }
               }

               loading.hide.call(that);
            },
            fail: function (res) {
               // fail
               console.log('request fail');

            }
         })
      },
      fail: function (res) {
         // fail
         console.log('getStorage fail');

      }
   })
}

/**
 * 删除转、预售订单
 */
function delMySaleOrder(commCode, cb, fail_cb) {
   console.log('delMySaleOrder');
   console.log(commCode);

   let that = this;
   console.log(that.data.mySaleOrders);
   //删除提示
   wx.showModal({
      title: '提示',
      content: '是否删除该正在出售中的商品',
      confirmColor: '#1392e3',
      success: function (res) {
         if (res.confirm) {
            console.log('用户点击确定')
            wx.showLoading({
               title: '正在删除中',
               mask: true
            });
            //获取token
            wx.getStorage({
               key: 'token',
               success: function (res) {
                  // 删除请求
                  wx.request({
                     url: config.apiList.delMySaleOrder,
                     data: {
                        CommCode: commCode,
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
                           let tmp = that.data.mySaleOrders;
                           //显示列表删除
                           tmp.map(function (item, i) {
                              if (item.CommCode == commCode) {
                                 tmp.splice(i, 1);
                              }
                           });
                           console.log(tmp);
                           //更新删除后数据
                           that.setData({
                              mySaleOrders: tmp
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
                        console.log('request fail');
                        common.netErr(that);
                     }
                  })

               },
               fail: function (res) {
                  // fail
                  console.log('getStorage fail');
                  common.netErr(that);
               }
            })
         }
      }
   })
}

module.exports = {
   getCategory: fetchCategory,
   getTopLine: fetchTopLine,
   getCommodity: fetchCommodity,
   getMyOrder: fetchMyOrder,
   getMySaleOrder: fetchMySaleOrder,
   getDelSaleOrder: delMySaleOrder
}