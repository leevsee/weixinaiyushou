const config = require('./config');
const message = require('../../component/message/message')
const err = require('../../component/err/err')

function fetchCategory1(codeNum, pageSize, cb) {
    wx.request({
        url: config.apiList.category,
        data: {
            TCode: codeNum,
            pageSize: config.categoryNum
        },
        method: 'GET',
        success: cb,
        fail: function (res) {
            // fail
        }
    })
}


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
            
            wx.hideNavigationBarLoading()
            let allCategory = new Array();
            allCategory[0] = [];
            allCategory[1] = [];
            res.data.map(function (item, i) {
                if (item.TCode.substring(0,3) == "001") {
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

function fetchTopLine(cb, fail_cb) {
    var that = this;
    message.hide.call(that);
    wx.request({
        url: config.apiList.topLine,
        data: {
        },
        method: 'GET',
        success: function (res) {
            wx.hideNavigationBarLoading()
            console.log(res);
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
            wx.hideLoading();
            typeof cb == 'function' && cb(topLine);
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


module.exports = {
    getCategory: fetchCategory,
    getTopLine: fetchTopLine
}