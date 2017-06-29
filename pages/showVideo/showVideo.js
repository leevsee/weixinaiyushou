let api = require('../../common/script/fetch')
const config = require('../../common/script/config')

Page({
   data: {
      videoSrc: '',
      showLoading: true,
   },
   onLoad: function (option) {
      let that = this;
      console.log(option);

      // api.getCommodityFiles.call(this, option.commcode);

      wx.request({
         url: config.apiList.commodityImgList,
         data: {
            CommCode: option.commcode,
            type: 'video',
            pageIndex: 0,
            pageSize: 1
         },
         method: 'GET',
         success: function (res) {
            console.log(res.data[0].FilePath)
            that.setData({
               videoSrc: res.data[0].FilePath
            })

         },
         fail: function (res) {

         }
      })

   }
})