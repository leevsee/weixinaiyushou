const config = require('./config');
const common = require('./common');
const message = require('../../component/message/message')
const err = require('../../component/err/err')
const circle = require('../../component/circle/circle')

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
    wx.showNavigationBarLoading();
    wx.showLoading({
        title: '玩命加载中',
    });
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
    circle.show.call(that);
    //获取token
    wx.getStorage({
        key: 'token',
        success: function (res) {
            console.log(res.data);
            //若token为null，则重新获取
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
                        mySaleOrders:res.data
                    });
                    circle.hide.call(that);
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

module.exports = {
    getCategory: fetchCategory,
    getTopLine: fetchTopLine,
    getCommodity: fetchCommodity,
    getMyOrder: fetchMyOrder,
    getMySaleOrder:fetchMySaleOrder
}