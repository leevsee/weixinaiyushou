module.exports = {
    show: function (cfg) {
        let that = this
        that.setData({
            loading: {
                visiable: true
            }
        });
    },
    hide: function () {
        var that = this
        that.setData({
            loading: {
                visiable: false
            }
        })
    },
    test: function (e) {
        console.log(e);
    }
}