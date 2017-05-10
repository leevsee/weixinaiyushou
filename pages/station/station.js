var api = require('../../common/script/fetchStation')

Page({
   data: {
      imgUrls: [
         'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
         'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
         'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      stationInfo: '',
      stationName: '',
      isOpenDoor: 0,
      phone: '',
      commodityList: [],
      openDoorWidth: '',
      page: 0,
      hasMore: {
         type: 2
      },
      isSelect: false,
      hasMore: false,
      showLoading: true,
      hiddenLoading: true
   },
   onLoad: function (options) {
      console.log('onLoad');
      console.log(options);
      // wx.showNavigationBarLoading();
      wx.showLoading({
         title: '玩命加载中',
      });
      console.log(options);
      //判断是否首次加载
      if (options.stationId == undefined) {
         api.getStation.call(this);
      } else {
         //根据选择提货站ID显示
         api.getCommByID.call(this, options.stationId);
         this.setData({
            stationInfo: options.stationInfo,
            stationName: options.stationName,
            isOpenDoor: options.isOpenDoor,
            phone: options.phone,
         });
      }
   },
   onShow: function (options) {
      // Do something when show.
      console.log('onShow');
      var that = this;
      wx.getStorage({
         key: 'stationInfo',
         success: function (res) {
            console.log(res);
            that.setData({
               stationName: '',
               page: 0,
               commodityList: [],
               showLoading: true,
               hiddenLoading: true
            })            
            that.onLoad(res.data);
            wx.removeStorage({
               key: 'stationInfo'
            })
         }
      })
   },
   onReachBottom: function () {
      console.log('onReachBottom');

      api.getCommByID.call(this, this.data.stationInfo.PK_ID);
   },
   onPullDownRefresh: function () {
      this.setData({
         stationName: '',
         page: 0,
         commodityList: [],
         showLoading: true,
         hiddenLoading: true
      })
      this.onLoad('');
      wx.stopPullDownRefresh();
   },
   //选择提货站
   goToStation: function () {
      wx.navigateTo({
         url: '../selectStation/selectStation'
      })
   },
   //购买商品
   goToPurchase: function (e) {
      console.log(e.currentTarget.dataset.commcode)
      wx.navigateTo({
         url: '../purchase/purchase?commcode=' + e.currentTarget.dataset.commcode
      })
   },
   //自助开门
   openStationDoor: function (e) {
      api.openStationDoor.call(this, e.currentTarget.dataset.stationid)
   },
   //加盟提货站
   joinStation: function (e) {
      console.log(e.currentTarget.dataset.phone);
      wx.makePhoneCall({
         phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
      })
   },
   
   goToPic: function (e) {
      console.log(e.currentTarget.dataset.commcode);
      wx.navigateTo({
         url: '../showPic/showPic?commcode=' + e.currentTarget.dataset.commcode
      })

   },
   goToVideo: function (e) {
      console.log(e.currentTarget.dataset.commcode);
      wx.navigateTo({
         url: '../showPic/showPic?commcode=' + e.currentTarget.dataset.commcode
      })
   }
})