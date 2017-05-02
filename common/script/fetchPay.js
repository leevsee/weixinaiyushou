const config = require('./config');
const message = require('../../component/message/message')
const err = require('../../component/err/err')

function fetchPay(payData,cb, fail_cb) {
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
            console.log(res)
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
    requestPay: fetchPay
}