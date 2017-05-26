const config = require('./config');
const message = require('../../component/message/message')
const err = require('../../component/err/err')


/**
 * 从服务器获取token
 */
function fetchToken(cb, fail_cb) {
   console.log('fetchToken');
   //微信登陆
   wx.login({
      success: function (res) {
         //通过code请求token
         wx.request({
            url: config.apiList.loginToken,
            data: {
               code: res.code,
            },
            header: {
               'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
               console.log('token success')
               console.log(res.data);
               //保存token
               wx.setStorage({
                  key: "token",
                  data: res.data.ResultData
               })
               typeof cb == 'function' && cb(res.data.ResultData);
            },
            fail: function (res) {
               // fail
               console.log('token fail')
            }
         })
      }
   });
}

/**
 * 错误提示信息
 */
function netErr(that) {
   message.show.call(that, {
      content: '网络开小差了',
      icon: 'offline'
   })
   wx.hideLoading();
   wx.hideNavigationBarLoading();
}


/**
 * 需要提示信息
 */
function updataErr(that) {
   message.show.call(that, {
      content: '当前微信版本过低，请升级到最新微信版本后重试。',
      icon: 'updata'
   })
   wx.hideLoading();
   wx.hideNavigationBarLoading();
}

/**
 * 检测版本
 */
function checkVersion(callback){
   wx.getStorage({
      key: 'systemInfo',
      success: callback
   })
}

/**
 * 
 */
function errShow(message, reLaunchUrl) {
   wx.showModal({
      title: '发生错误',
      content: message,
      showCancel: false,
      success: function (res) {
         if (res.confirm) {
            console.log('用户点击确定')
            wx.reLaunch({
               url: reLaunchUrl
            })
         }
      }
   })
}

/**
 * 
 */
function myToast(type,title,callback) {
   let icon = 'success';
   let image = '';
   switch (type) {
      case "success":
         icon = 'success';
         break;
      case "err":
         image = '/res/err2.png';
         break;
      default:
         break;
   }
   wx.showToast({
      title: title,
      image: image,
      icon: 'success',
      mask: true,
      duration: 2000,
      success:callback
   })
}


module.exports = {
   getToken: fetchToken,
   netErr: netErr,
   updataErr: updataErr,
   checkVersion: checkVersion,
   errShow: errShow,
   myToast: myToast
}