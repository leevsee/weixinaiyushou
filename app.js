//app.js
var api = require('./common/script/common')

App({
  onLaunch: function () {
    api.getToken.call(this);
  
  }
})