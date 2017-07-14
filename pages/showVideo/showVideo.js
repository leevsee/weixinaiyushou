let api = require('../../common/script/fetch')
const config = require('../../common/script/config')

Page({
   data: {
      videoList:[],
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
            pageSize: 10
         },
         method: 'GET',
         success: function (res) {
            console.log(res.data[0].FilePath)
            console.log(res.data)
            that.setData({
               videoList: res.data,
               videoSrc: res.data[0].FilePath
            })

         },
         fail: function (res) {

         }
      })

   }
})