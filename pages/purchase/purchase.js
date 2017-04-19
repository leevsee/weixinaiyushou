Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    price: '118.00',
    num: 2,
    totlePrice: '128.00',
    address: '',
    condition: false,
    condition1: true,
  },
  onLoad: function () {

  },
  radioChange: function (e) {
    console.log(e);
  },
  goToOrders: function () {
    wx.redirectTo({
      url: '../orders/orders'
    })
  },
  subNum: function () {
    if (this.data.num > 1) {
      this.setData({
        num: this.data.num - 1,
        totlePrice: Number((this.data.num - 1) * this.data.price).toFixed(2)
      })
    }
  },
  addNum: function () {
    if (this.data.num < 99) {
      this.setData({
        num: this.data.num + 1,
        totlePrice: Number((this.data.num + 1) * this.data.price).toFixed(2)
      })
    }
  },
  selectAddres: function () {
    let that = this;
    wx.chooseAddress({
      success: function (res) {
        that.setData({
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo
        })
      }
    })
  }
})