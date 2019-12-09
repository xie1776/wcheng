
var md5 = require('../../utils/md5.js');
var app = getApp()
Page({
  onLoad: function (option) {
    var id = option.id;
    var that = this
    console.log(option.id);
    wx.request({
      url: md5.sign(app.globalData.URL + '/Joke/getDetailImg'),
      data: {
        id: id
      },
      header: {
        'contentType': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code) {
          that.setData({
            info: res.data.info
          })
        } else {
          console.log('fail');
        }
      }
    })
  },
  onShareAppMessage: function (e) { //分享
    // console.log(e);
    return {
      title: '希望塔娱乐',
      desc: '希望塔致力于做你休闲时光的伴侣!',
      path: '/page/detail/detail?id='+id
    }
  },
});