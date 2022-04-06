/*
 * @Author: Adger
 * @Date: 2022-03-01 15:45:23
 * @LastEditTime: 2022-04-05 19:46:03
 */
// pages/user/index.js
const AUTH = require('../../utils/auth')
Page({
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    collectNums: 0,
    wxlogin: true,
  },
  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect") || [];
    if (!userinfo) {
      this.setData({
        wxlogin: false,
        userinfo: {},
        collectNums: 0,
      })
    } else {
      this.setData({
        userinfo,
        collectNums: collect.length,
      })
    }

    // this.setData({
    //   userinfo,
    //   collectNums: collect.length
    // });
  },
  cancelLogin() {
    this.setData({
      wxlogin: true
    })
  },
  processLogin(e) {
    var that = this;
    wx.getUserProfile({
      desc: "获取用户信息",
      success: (res) => {
        const {
          userInfo
        } = res;
        wx.setStorageSync("userinfo", userInfo);
        this.getUserInfo()
        AUTH.register(that);
      },
      fail: () => {
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none',
        })
      }
    })
  },

  getUserInfo() {
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect") || [];

    this.setData({
      userinfo,
      collectNums: collect.length,
      wxlogin: true,
    });
  },
  login() {
    this.setData({
      wxlogin: false
    })
  },
})