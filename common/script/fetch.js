const config = require('./config');
const common = require('./common');
const message = require('../../component/message/message')
const err = require('../../component/err/err')
const circle = require('../../component/circle/circle')
const loading = require('../../component/loading/loading')

/**
 * 获取分类
 */
function fetchCategory(cb, fail_cb) {
    console.log('fetchCategory');
    var that = this;
    message.hide.call(that);
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
                res.data.map(function (item, i) {
                    if (item.TCode.substring(0, 3) == "001") {
                        allCategory[0].push(item);
                    } else {
                        allCategory[1].push(item);
                    }
                });
                that.setData({
                    showLoading: false,
                    classification: allCategory[0],
                    category: allCategory[1]
                });
                wx.hideLoading();
                wx.hideNavigationBarLoading();
            } else {
                netErr();
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
    var that = this;
    message.hide.call(that);
    wx.request({
        url: config.apiList.topLine,
        data: {
        },
        method: 'GET',
        success: function (res) {
            if (res.statusCode == 200) {
                let topLine = new Array();
                for (var i = 0; i < res.data.length; i = i + 2) {
                    topLine[i] = [];
                    topLine[i][0] = res.data[i];
                    topLine[i][1] = res.data[i + 1];
                };
                for (var i = 0; i < topLine.length; i++) {
                    if (topLine[i] == "" || typeof (topLine[i]) == "undefined") {
                        topLine.splice(i, 1);
                        i = i - 1;
                    }
                };
                that.setData({
                    showLoading: false,
                    topLine: topLine
                });
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
function fetchCommodity(typeCode, num, page, cb, fail_cb) {
    console.log('fetchCommodity');
    var that = this;
    wx.request({
        url: config.apiList.commodity,
        data: {
            FK_TypeCode: typeCode,
            pageSize: num,
            pageIndex: page
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
            // console.log(res)
            that.setData({
                commodityList: res.data,
                showLoading: false
            });
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
                // success
                wx.request({
                    url: config.apiList.myOrderNum,
                    data: {
                        token: res.data
                    },
                    method: 'GET',
                    success: function (res) {
                        // success
                        console.log(res);
                        if (res.data.error_code == -1) {
                            common.getToken(function (token) {
                                fetchMyOrder.call(that);
                            }, '');
                        } else {
                            that.setData({
                                ordersNum: res.data,
                                percent: res.data.return_Value.toFixed(0),
                                income: res.data.SIncome.toFixed(2),
                                expenditure: res.data.SPay.toFixed(2),
                                percentage: res.data.return_Value,
                                showLoading: false
                            });
                            wx.hideNavigationBarLoading();
                            wx.hideLoading();
                            fetchMySaleOrder.call(that);
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
    // circle.show.call(that);
    loading.show.call(that);

    //获取token
    wx.getStorage({
        key: 'token',
        success: function (res) {
            console.log(res.data);
            // success
            wx.request({
                url: config.apiList.mySaleOrder,
                data: {
                    pageIndex: 0,
                    pageSize: 5,
                    token: res.data
                },
                method: 'GET',
                success: function (res) {
                    // success
                    console.log(res);
                    that.setData({
                        mySaleOrders: res.data
                    });
                    // circle.hide.call(that);
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

    wx.showModal({
        title: '提示',
        content: '是否删除',
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
                        // token success
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
                                // success
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
                                    tmp.map(function (item, i) {
                                        if (item.CommCode == commCode) {
                                            tmp.splice(i, 1);
                                        }
                                    });
                                    console.log(tmp);
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