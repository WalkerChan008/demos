// pages/movie-search/index.js
const app = getApp()
let globalData = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultList: [],
    timer: null
  },

  bindInput(e) {
    let inputValue = e.detail.value;
    let url = `${globalData.doubanBase}${globalData.searchURL}${inputValue}&&start=0&&count=10`;

    // 防抖处理
    let timer = this.data.timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      wx.request({
        url,
        header: {
          'content-type': 'json'
        },
        success: res => {
          let resultList = res.data.subjects;

          resultList.forEach(item1 => {
            let directorsStr = '';
            item1.directors.forEach(item2 => {
              directorsStr += (item2.name + '/')
            })
            item1.directorsStr = directorsStr.slice(0, directorsStr.length - 2);
          })

          this.setData({
            resultList
          })
        }
      })
    }, 300)
    this.setData({
      timer
    })
  },

  bindCencel() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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