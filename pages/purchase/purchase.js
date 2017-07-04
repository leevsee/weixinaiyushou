let api = require('../../common/script/fetchOrder')

Page({
   data: {
      imgUrls: '',
      commName: '',
      price: '',
      num: 1,
      postage: 0,
      totlePrice: '',
      deliveryNum: 1,
      deliveryPrice: '',
      totleDeliveryPrice: '',
      stock: '',
      address: '',
      message: '',
      deliveryMessage: '',
      dispalyResale: true,
      isDelivery: false,
      isResale: false,
      stationId: 0,
      stationName: '',
      item: '',
      showPostage: false,
      showLoading: true
   },
   onLoad: function (options) {
      wx.showLoading({
         title: '加载中',
      });
      console.log('purchase')
      console.log(options)
      api.getOrder.call(this, options.commcode, options.terminalID);
   },
   onShow: function () {
      let that = this;
      wx.getStorage({
         key: 'stationInfo',
         success: function (res) {
            // success
            that.setData({
               stationId: res.data.stationId,
               stationName: res.data.stationName,
               isDelivery: true
            });
            wx.removeStorage({
               key: 'stationInfo',
               success: function (res) {
                  console.log(res.data)
               }
            })
         }
      })
   },
   radioChange: function (e) {
      console.log(e);
   },
   goToOrders: function () {
      let that = this;
      console.log(Number.parseInt(Math.random() * 10000));
      if (!that.data.showPostage) {
         wx.showToast({
            title: '请选择收货地址',
            image: '/res/err2.png',
            mask: true,
            icon: 'success',
            duration: 2000
         })
      } else {
         wx.getStorage({
            key: 'token',
            success: function (res) {
               // success
               let data = {
                  FK_SellerUserID: that.data.item.FK_UserId,
                  FK_AddressID: that.data.address.provinceName + that.data.address.cityName + that.data.address.countyName + that.data.address.detailInfo,
                  AMoney: that.data.totlePrice,
                  UserLeaving: that.data.message,
                  CommCode: that.data.item.CommCode,
                  IsResaleAfter: Number(that.data.isDelivery),
                  ResaleCount: that.data.deliveryNum,
                  IsResaleTop: Number(that.data.isResale),
                  PostalCode: that.data.address.postalCode,
                  ProvinceName: that.data.address.provinceName,
                  CityName: that.data.address.cityName,
                  CountyName: that.data.address.countyName,
                  NationalCode: that.data.address.nationalCode,
                  TelNumber: that.data.address.telNumber,
                  UserName: that.data.address.userName,
                  CommCount: that.data.num,
                  FK_TerminalID: that.data.stationId,
                  Body: '爱预售-购买' + that.data.commName,
                  Sketch: that.data.deliveryMessage,
                  User_TerminalID: that.data.item.TerminalID,
                  IsFillInAddress: that.data.item.IsFillInAddress,
                  CommodityFromTerminalID: that.data.item.CommodityFromTerminalID,
                  token: res.data,
                  Onlyrequest: Number.parseInt(Math.random() * 10000)
               }
               api.confirmOrder.call(that, data);
            },
            fail: function (res) {
               // fail
            },
            complete: function (res) {
               // complete
            }
         })
      }
   },
   subNum: function () {
      // console.log(this.data.isDelivery && this.data.num > this.data.deliveryNum)
      if (this.data.num > 1 && this.data.num > this.data.deliveryNum) {
         this.setData({
            num: this.data.num - 1,
            totlePrice: Number(((this.data.num - 1) * this.data.price) + this.data.postage).toFixed(2)
         })
      }
   },
   addNum: function () {
      if (this.data.num < this.data.stock) {
         this.setData({
            num: this.data.num + 1,
            totlePrice: Number(((this.data.num + 1) * this.data.price) + this.data.postage).toFixed(2)
         })
      }
   },
   subDeliveryNum: function () {
      if (this.data.deliveryNum > 1) {
         this.setData({
            deliveryNum: this.data.deliveryNum - 1,
            totleDeliveryPrice: Number((this.data.deliveryNum - 1) * this.data.deliveryPrice)
         })
      }
   },
   addDeliveryNum: function () {
      if (this.data.deliveryNum < this.data.num && (this.data.isDelivery || this.data.isResale)) {
         this.setData({
            deliveryNum: this.data.deliveryNum + 1,
            totleDeliveryPrice: Number((this.data.deliveryNum + 1) * this.data.deliveryPrice)
         })
      }
   },
   //获取微信地址
   selectAddres: function () {
      let that = this;
      wx.showLoading({
         title: '正在打开微信地址',
         mask: true
      });
      wx.chooseAddress({
         success: function (res) {
            console.log(res);
            that.setData({
               address: res,
               showPostage: true
            });
         }, fail: function (res) {
            console.log('chooseAddress fail========');
            wx.openSetting({
               success: (res) => {
                  if (!res.authSetting['scope.address']) {
                     wx.showToast({
                        title: '可能会引起爱预售功能缺失',
                        image: '/res/err2.png',
                     })
                  }
               }
            })
         },
         complete: function () {
            wx.hideLoading();
         }
      })
   },
   isDelivery: function (e) {
      console.log(e.currentTarget.dataset);
      if (this.data.isDelivery === false) {
         wx.navigateTo({
            url: '../selectStation/selectStation'
         })
      } else if (this.data.isResale === true) {
         this.setData({
            isDelivery: !this.data.isDelivery
         })
      }
      else {
         this.setData({
            isDelivery: !this.data.isDelivery,
            deliveryNum: 1
         })
      }
   },
   isResale: function (e) {
      console.log(e.currentTarget.dataset);
      if (this.data.isDelivery === true) {
         this.setData({
            isResale: !this.data.isResale
         })
      } else {
         this.setData({
            isResale: !this.data.isResale,
            deliveryNum: 1
         })
      }
   },
   bindTextAreaBlur: function (e) {
      this.setData({
         message: e.detail.value
      })
   },
   bindDeliveryMessage: function (e) {
      this.setData({
         deliveryMessage: e.detail.value
      })
   }
})