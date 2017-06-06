let api = require('../../common/script/fetch')

Page({
  data: {
   imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
   showLoading: true,
  },
  onLoad: function (option) {
     let that = this;
    console.log(option);
    wx.getSystemInfo({
       success: function (res) {
          let nowH = 'height:' + res.windowHeight + 'px';
          that.setData({
             setHeight: nowH
          })
       }
    })
    api.getCommodityFiles.call(this, option.commcode);
  }
})