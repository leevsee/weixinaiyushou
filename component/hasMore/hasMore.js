module.exports = {
    showButton: function () {
        // let that = this
        this.setData({
            hasMore: {
                type: 0
            }
        });
    },
    showLoading: function () {
        this.setData({
            hasMore: {
                type: 1
            }
        });
    },
    noContent: function () {
        this.setData({
            hasMore: {
                type: 2
            }
        })
    },
    test: function (e) {
        console.log(e);
    }
}