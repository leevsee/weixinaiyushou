var api = require('../../common/script/fetchOrder')

Page({
  data: {
    imgUrls: '',
    commName: '',
    price: '',
    num: 1,
    postage: 10,
    totlePrice: '',
    deliveryNum: 1,
    deliveryPrice: '',
    totleDeliveryPrice: '',
    stock: '',
    address: '',
    message: '',
    dispalyResale: true,
    isDelivery: false,
    isResale: false,
    stationId: 0,
    stationName: '',
    item: '',
    showLoading: true
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    console.log(options.commcode)
    api.getOrder.call(this, options.commcode);
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'stationInfo',
      success: function (res) {
        // success
        that.setData({
          stationId: res.data.stationId,
          stationName: res.data.selectStationName,
          isDelivery: true
        });
        wx.removeStorage({
          key: 'stationInfo',
          success: function (res) {
            console.log(res.data)
          }
        })
      },
      fail: function (res) {
        // fail
      }
    })
  },
  radioChange: function (e) {
    console.log(e);
  },
  goToOrders: function () {
    var that = this;
    if (this.data.address == '') {
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
          var data = {
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
            token: res.data,
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
    if (this.data.num > 1) {
      this.setData({
        num: this.data.num - 1,
        totlePrice: Number(((this.data.num - 1) * this.data.price) + 10).toFixed(2)
      })
    }
  },
  addNum: function () {
    if (this.data.num < this.data.stock) {
      this.setData({
        num: this.data.num + 1,
        totlePrice: Number(((this.data.num + 1) * this.data.price) + 10).toFixed(2)
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
    if (this.data.deliveryNum < this.data.num) {
      this.setData({
        deliveryNum: this.data.deliveryNum + 1,
        totleDeliveryPrice: Number((this.data.deliveryNum + 1) * this.data.deliveryPrice)
      })
    }
  },
  //获取微信地址
  selectAddres: function () {
    let that = this;
    wx.chooseAddress({
      success: function (res) {
        console.log(res);
        that.setData({
          address: res
        })
      }
    })
  },
  isDelivery: function (e) {
    console.log(e.currentTarget.dataset);
    if (this.data.isDelivery == false) {
      wx.navigateTo({
        url: '../selectStation/selectStation?isFromOrder=true'
      })
    } else {
      this.setData({
        isDelivery: !this.data.isDelivery
      })
    }
  },
  isResale: function (e) {
    console.log(e.currentTarget.dataset);
    this.setData({
      isResale: !this.data.isResale
    })
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      message: e.detail.value
    })
  }
})