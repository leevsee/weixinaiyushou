var api = require('../../common/script/fetchStation')

Page({
   data: {
      stationId: '',
      selectStationName: '',
      isOpenDoor: 0,
      phone: '',
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
            }
         })

      } else {
         wx.reLaunch({
            url: '../station/station?id=' + this.data.stationId + '&stationname=' + this.data.selectStationName + '&isopendoor=' + this.data.isOpenDoor + '&phone=' + this.data.phone
         })
      }
   },
   selecStation: function (e) {
      let that = this;
      console.log(that.data.stationList[e.currentTarget.id].PK_ID)
      console.log(that.data.stationList[e.currentTarget.id].TName)
      this.data.stationList.map(function (item, i) {
         if (e.currentTarget.id == i) {
            item.Select = true;
         } else {
            item.Select = false;
         }
      });    
      that.setData({
         stationId: that.data.stationList[e.currentTarget.id].PK_ID,
         selectStationName: that.data.stationList[e.currentTarget.id].TName,
         isOpenDoor: that.data.stationList[e.currentTarget.id].TType,
         phone: that.data.stationList[e.currentTarget.id].RePhone,
         stationList: that.data.stationList
      })
   }
})