const config = require('./config');
const message = require('../../component/message/message')
const err = require('../../component/err/err')

/**
 * 获取当前提货站并获取商品数据
 */
function fetchStation(cb, fail_cb) {
   console.log('fetchStation');
   let that = this;
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
               console.log(res.data);
               //设置提货站名称
               that.setData({
                  stationInfo: res.data,
                  stationName: res.data.Address,
                  isOpenDoor: res.data.TType,
                  phone: res.data.RePhone
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
                     //更新商品数据
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


/**
 * 根据提货站ID获取其中的商品数据
 */
function fetchStationByID(id, cb, fail_cb) {
   console.log('fetchStationByID');
   let that = this;
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
         //更新商品数据
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


/**
 * 获取所有提货站
 */
function fetchSelectStation(cb, fail_cb) {
   console.log('fetchSelectStation');
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
               console.log(res.data);
               //更新提货站数据
               that.setData({
                  stationId: res.data[0].PK_ID,
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

/**
 * 提货站开门
 */
function openStationDoorByID(stationID,cb, fail_cb){
   console.log('openStationDoor');
   console.log(stationID);
   wx.showModal({
      title: '提示',
      content: '确定要打开该提货站自动门？',
      success: function (res) {
         if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
               url: config.apiList.openStationDoor,
               data:{
                  PK_ID: stationID
               },
               success:function(res){
                  console.log(res.data);
               }
            })
         } else if (res.cancel) {
            console.log('用户点击取消')
         }
      }
   })
}

module.exports = {
   getStation: fetchStation,
   getSelectStation: fetchSelectStation,
   getStationByID: fetchStationByID,
   openStationDoor: openStationDoorByID
}