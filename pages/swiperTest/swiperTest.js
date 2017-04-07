Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    content: [
      { 'url': 'http', 'wenzhi': '全程提货站红酒买一送一，优惠多多！' },
      { 'url': 'http', 'wenzhi': '热烈庆祝淘宝网邕宁特色馆上线试运营！' },
      { 'url': 'http', 'wenzhi': '热烈庆祝淘宝网邕宁特色馆上线试运营！热烈庆祝淘宝网邕宁特色馆上线试运营！' }
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    // this.setData({
    //   indicatorDots: !this.data.indicatorDots
    // })
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  itemOnClick: function (e) {
    console.log(e);
  }
})