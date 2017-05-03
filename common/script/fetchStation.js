const config = require('./config');
const message = require('../../component/message/message')
const err = require('../../component/err/err')


function fetchStation(cb, fail_cb) {
    var that = this;
    message.hide.call(that);
    //获取当前位置经纬度
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
            //获取距离最近的提货站
            wx.request({
                url: config.apiList.station,
                data: {
                    latitude: res.latitude,
                    longitude: res.longitude
                },
                method: 'GET',
                success: function (res) {
                    console.log(res.data.Address);
                    that.setData({
                        stationName: res.data.Address
                    });
                    //获取提货站中的商品数据
                    wx.request({
                        url: config.apiList.commodityByStation,
                        data: {
                            PK_ID: res.data.PK_ID,
                            pageIndex: 0,
                            pageSize: config.commodityByStationSize
                        },
                        method: 'GET',
                        success: function (res) {
                            // success
                            console.log(res.data);
                            //更新数据
                            that.setData({
                                showLoading: false,
                                commodityList: res.data,
                                showLoading: false
                            });
                            wx.hideNavigationBarLoading();
                            wx.hideLoading();
                        },
                        fail: function (res) {
                            // fail
                            message.show.call(that, {
                                content: '网络开小差了',
                                icon: 'offline'
                            })
                            wx.hideLoading();
                        },
                        complete: function (res) {
                            // complete
                        }
                    })

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
    })
}


//根据提货站ID获取其中的商品数据
function fetchStationByID(id, cb, fail_cb) {
    console.log(id);
    console.log(cb);
    console.log(fail_cb);
    var that = this;
    message.hide.call(that);
    wx.request({
        url: config.apiList.commodityByStation,
        data: {
            PK_ID: id,
            pageIndex: 0,
            pageSize: config.commodityByStationSize
        },
        method: 'GET',
        success: function (res) {
            // success
            console.log(res.data);
            //更新数据
            that.setData({
                showLoading: false,
                commodityList: res.data
            });
            wx.hideNavigationBarLoading();
            wx.hideLoading();
        },
        fail: function (res) {
            // fail
            message.show.call(that, {
                content: '网络开小差了',
                icon: 'offline'
            })
            wx.hideLoading();
        },
        complete: function (res) {
            // complete
        }
    })
}


//获取所有提货站
function fetchSelectStation(cb, fail_cb) {
    var that = this;
    message.hide.call(that);
    //获取当前位置经纬度
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
            console.log(res);
            //获取距离最近的提货站
            wx.request({
                url: config.apiList.selectStation,
                data: {
                    latitude: res.latitude,
                    longitude: res.longitude,
                    pageIndex: '0',
                    pageSize: '10'
                },
                method: 'GET',
                success: function (res) {
                    res.data[0].select = false;
                    console.log(res.data[0].select);
                    that.setData({
                        selectStationName: res.data[0].TName,
                        stationList: res.data,
                        showLoading: false
                    });
                    wx.hideLoading();
                    wx.hideNavigationBarLoading();
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
    })
}


module.exports = {
    getStation: fetchStation,
    getSelectStation: fetchSelectStation,
    getStationByID: fetchStationByID
}