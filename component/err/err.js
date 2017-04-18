module.exports = {
    show: function(cfg) {
        var that = this
        that.setData({
            err: {
                visiable: true
            }
        })
        if (typeof cfg.duration !== 'undefined') {
            setTimeout(function(){
                that.setData({
                    message: {
                        visiable: false
                    }
                })
            }, cfg.duration)
        }
    },
    hide: function() {
        var that = this
        that.setData({
            err: {
                visiable: false
            }
        })
    }
}