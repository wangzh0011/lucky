// pages/fireworks/fireworks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFireWorks: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showModal({
      title: "温馨提示",
      content: "准备好了吗？",
      confirmText: "是的呢！",
      cancelText: "不想看了",
      success(res) {
        if(res.confirm) {
           that.setData({
             showFireWorks: true
           }) 
        }else {
          wx.showModal({
            content: '看一下吧☺',
            confirmText: "OK",
            showCancel: false,
            success(res) {
              that.setData({
                showFireWorks: true
              }) 
            }
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

