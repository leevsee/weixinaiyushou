const config = require('./config');
const message = require('../../component/message/message')
const err = require('../../component/err/err')

function fetchToken(code, cb, fail_cb) {
    wx.request({
        url: config.apiList.loginToken,
        data: {
            code: code,
        },
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
            console.log('token success')
            console.log(res.data.ResultData);
            wx.setStorage({
                key: "token",
                data: res.data.ResultData
            })
        },
        fail: function (res) {
            // fail
            console.log('token fail')
        }
    })
}

//获取分类
function fetchCategory(cb, fail_cb) {
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
            message.show.call(that, {
                content: '网络开小差了',
                icon: 'offline'
            })
            wx.hideLoading();
            typeof fail_cb == 'function' && fail_cb();
        }
    })
}

//获取头条
function fetchTopLine(cb, fail_cb) {
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
            netErr();
            wx.hideLoading();
            typeof fail_cb == 'function' && fail_cb();
        }
    })
}

//获取商品列表
function fetchCommodity(typeCode, num, page, cb, fail_cb) {
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
                commodityList: res.data
            });
            // success
        },
        fail: function (res) {
            // fail
        }
    })
}

/**
 * 获取订单数量
 */
function fetchMyOrder(cb, fail_cb) {
    var that = this;
    wx.getStorage({
        key: 'token',
        success: function (res) {
            console.log(res.data);
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
                    that.setData({
                        ordersNum: res.data,
                        showLoading: false
                    });
                    wx.hideNavigationBarLoading();
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

function netErr() {
    message.show.call(that, {
        content: '网络开小差了',
        icon: 'offline'
    })
    wx.hideLoading();
    wx.hideNavigationBarLoading();
}


module.exports = {
    getToken: fetchToken,
    getCategory: fetchCategory,
    getTopLine: fetchTopLine,
    getCommodity: fetchCommodity,
    getMyOrder: fetchMyOrder
}