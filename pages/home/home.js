Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    content: [
      { 'url': 'http', 'wenzhi': '全程提货站红酒买一送一，优惠多多！' },
      { 'url': 'http', 'wenzhi': '全程提货站红酒买一送一，优惠多多！全程提货站红酒买一送' },
      { 'url': 'http', 'wenzhi': '全程提货站红酒买一送一，优惠多多！' }
    ],
    content1: [
      { 'url': 'http', 'wenzhi': '优惠多多优惠多多优惠多多，优惠多多！' },
      { 'url': 'http', 'wenzhi': '上线试运营上线试运营上线试运营上线试运营!' },
      { 'url': 'http', 'wenzhi': '淘宝网淘宝网淘宝网淘宝网淘宝网淘宝网淘！' }
    ]
  },
  onLoad: function () {
   
  },
  swiperPicOnClick: function (e) {
    console.log(e);
    console.log(e.target);
    console.log(e.target.dataset);
  },
  getAddress: function () {
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
  mytest:function(e){
    console.log(e);
  }
})