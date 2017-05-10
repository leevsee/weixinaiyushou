var api = require('../../common/script/fetchStation')

Page({
   data: {
      stationList: '',
      selcStationInfo:'',
      stationId: '',
      selectStationName: '',
      isOpenDoor: 0,
      phone: '',
      condition: false,
      isFromOrder: false,
      showLoading: true
   },
   onLoad: function (options) {
      wx.showNavigationBarLoading();
      wx.showLoading({
         title: '玩命加载中',
         mask: true
      });
      // if (options.isFromOrder) {
      //    this.setData({
      //       isFromOrder: options.isFromOrder
      //    });
      // }
      api.getSelectStation.call(this);
   },
   //返回上层页面
   goBack: function () {
      wx.setStorage({
         key: 'stationInfo',
         data: {
            stationInfo: this.data.selcStationInfo,
            stationId: this.data.stationId,
            stationName: this.data.selectStationName,
            isOpenDoor: this.data.isOpenDoor,
            phone: this.data.phone
         },
         success: function (res) {
            wx.navigateBack({})
         }
      })
   },
   //选择当前地点
   selecStation: function (e) {
      // let that = this;
      console.log(this.data.stationList[e.currentTarget.id].PK_ID)
      console.log(this.data.stationList[e.currentTarget.id].TName)
      this.data.stationList.map(function (item, i) {
         if (e.currentTarget.id == i) {
            item.Select = true;
         } else {
            item.Select = false;
         }
      });
      this.setData({
         selcStationInfo: this.data.stationList[e.currentTarget.id],
         stationId: this.data.stationList[e.currentTarget.id].PK_ID,
         selectStationName: this.data.stationList[e.currentTarget.id].TName,
         isOpenDoor: this.data.stationList[e.currentTarget.id].TType,
         phone: this.data.stationList[e.currentTarget.id].RePhone,
         stationList: this.data.stationList
      })
   }
})