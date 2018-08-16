var md5 = require('../../utils/md5.js');
//请求数据
var list = [];
var app = getApp()
function getJokeList(that, p = 1) {
  wx.request({
    url: md5.sign(app.globalData.serverUrl+'/Joke/getlistByWord'),
    data: {
      p: p
    },
    header: {
      'contentType': 'application/json'
    },
    success: function (res) {
      console.log(res.data)
      if (res.data.code) {

        for (var i = 0; i < res.data.list.length; i++) {
          list.push(res.data.list[i]);
        }
        that.setData({
          jokeList: list
        })
      } else {
        console.log('fail');
      }
    }
  })
}

var p = 1

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    jokeList: [],
  },
  onLoad: function () {
    console.log('onLoad');
    console.log(app.globalData);
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    getJokeList(that);
  },
  onReachBottom: function (e) { //onReachBottom
    p = p + 1;
    var that = this
    wx.showToast({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    getJokeList(that, p);
  },
  onShareAppMessage: function () { //分享
    return {
      title: '希望塔娱乐',
      desc: '希望塔致力于做你休闲时光的伴侣!',
      path: '/page/word/word'
    }
  }

})