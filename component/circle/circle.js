module.exports = {
    show: function (cfg) {
        let that = this
        that.setData({
            circle: {
                visiable: true
            }
        });
    },
    hide: function () {
        var that = this
        that.setData({
            circle: {
                visiable: false
            }
        })
    },
    test: function (e) {
        console.log(e);
    }
}