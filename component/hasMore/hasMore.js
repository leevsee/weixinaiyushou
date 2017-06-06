module.exports = {
   showButton: function () {
      // let that = this
      this.setData({
         hasMore: {
            type: 0,
            moreMessage: '上拉到底部，加载更多'
         }
      });
   },
   showLoading: function () {
      this.setData({
         hasMore: {
            type: 1,
            loadingMessage: '正在加载中…'
         }
      });
   },
   noContent: function () {
      this.setData({
         hasMore: {
            type: 2,
            noMessage: '没有更多内容了'
         }
      })
   }, 
   custom_showButton: function (jsonData) {
      // let that = this
      // this.setData({
      //    hasMore: {
      //       type: 0,
      //       moreMessage: '滑动到左边部，加载更多'
      //    }
      // });

      this.setData(jsonData);
   },
   custom_showLoading: function (jsonData) {
      // this.setData({
      //    hasMore: {
      //       type: 1,
      //       loadingMessage: '正在加载中…',
      //       customCss: 'custom-loadEffect'
      //    }
      // });
      this.setData(jsonData);
   }
}