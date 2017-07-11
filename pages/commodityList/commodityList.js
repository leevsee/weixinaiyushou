let api = require('../../common/script/fetch')
const config = require('../../common/script/config')

Page({
   data: {
      imgUrls: [
         'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
         'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
         'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      commodityList: [],
      options: '',
      page: 0,
      showLoading: true,
      setHeight: '',
      scrollMore: {
         type: 0,
         moreMessage: '滑动到左边，加载更多',
         customloadingCss:'custom-loading-tip'
      },
      showInfo: true
   },
   onLoad: function (options) {
      console.log(options);
      let that = this
      // wx.showNavigationBarLoading();
      wx.showLoading({
         title: '玩命加载中',
         mask: true
      });
      wx.getSystemInfo({
         success: function (res) {
            let nowH = 'height:' + (res.windowHeight - (res.screenWidth / 750) * 132) + 'px';
            console.log(nowH);
            that.setData({
               options: options,
               setHeight: nowH
            })
         }
      })
      if (options.single){
         console.log('single')
         api.getOneCommodity.call(this, options.tcode);
      }else{
         console.log('nosingle')
         api.getCommodity.call(this, options.tcode);
      }
   },
   onReachBottom: function () {
      console.log("onReachBottom");
      api.getCommodity.call(this, this.data.options.tcode);
   },
   scrollTest: function (e) {
      // console.log(e.currentTarget.dataset.index);
      // console.log(this.data.commodityList[e.currentTarget.dataset.index].pageNum = 1);
      // console.log(this.data.commodityList[e.currentTarget.dataset.index].pageNum);
      console.log('get===========');
      if (this.data.scrollMore.type == 0) {
         api.getResaleList.call(this, e.currentTarget.dataset.index);
      }


      // let temp = this.data.commodityList[e.currentTarget.dataset.index]
      // temp.pageNum = 0
      // this.setData({

      // })

      // api.getResaleList.call(this, this.data.commodityList[e.currentTarget.dataset.index]);      
      // console.log(this.data.m.size);
      // if (this.data.m.size == undefined) {
      //    let m = new Map();
      //    m.set(e.currentTarget.dataset.commcode, 0);
      //    this.setData({
      //       scrollMore: {
      //          type: 1,
      //          loadingMessage: '正在加载中...',
      //          customCss: 'custom-loadEffect'
      //       },
      //       m: m
      //    })
      //    api.getResaleList.call(this, m);
      // } else {
      //    let m = this.data.m;
      //    if (!m.has(e.currentTarget.dataset.commcode)) {
      //       m.set(e.currentTarget.dataset.commcode, 0)
      //    }
      //    api.getResaleList.call(this, m);
      // }

   },
   onPullDownRefresh: function () {
      this.setData({
         commodityList: [],
         page: 0,
         showLoading: true,
         hasMore: false
      })
      this.onLoad(this.data.options);
      wx.stopPullDownRefresh();
   },
   goToPurchase: function (e) {
      console.log(e.currentTarget.dataset)
      wx.navigateTo({
         url: '../purchase/purchase?commcode=' + e.currentTarget.dataset.commcode + '&terminalID=' + e.currentTarget.dataset.terminalid
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
         url: '../showVideo/showVideo?commcode=' + e.currentTarget.dataset.commcode
      })


   }
})