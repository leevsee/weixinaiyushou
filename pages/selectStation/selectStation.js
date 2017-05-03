var api = require('../../common/script/fetchStation')

Page({
  data: {
    stationId: '',
    selectStationName: '',
    stationList: '',
    condition: false,
    isFromOrder: false,
    showLoading: true
  },
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '玩命加载中',
    });
    if (options.isFromOrder) {
      this.setData({
        isFromOrder: options.isFromOrder
      });
    }
    api.getSelectStation.call(this);
  },
  goBack: function () {
    if (this.data.isFromOrder) {
      wx.setStorage({
        key: 'stationInfo',
        data: {
          stationId: this.data.stationId,
          selectStationName: this.data.selectStationName,
        },
        success: function (res) {
          // success
          wx.navigateBack({})
        },
        fail: function (res) {
          // fail
        }
      })

    } else {
      wx.reLaunch({
        url: '../station/station?id=' + this.data.stationId + '&stationname=' + this.data.selectStationName
      })
    }
  },
  selecStation: function (e) {
    console.log(e.currentTarget.dataset.stationId)
    console.log(e.currentTarget.dataset.stationName)
    this.data.stationList.map(function (item, i) {
      if (e.currentTarget.id == i) {
        item.Select = true;
      } else {
        item.Select = false;
      }
    });
    this.setData({
      stationId: e.currentTarget.dataset.stationId,
      selectStationName: e.currentTarget.dataset.stationName,
      stationList: this.data.stationList
    })
  }
})