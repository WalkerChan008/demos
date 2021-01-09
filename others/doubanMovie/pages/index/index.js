//index.js
//获取应用实例
const app = getApp()
let globalData = app.globalData

Page({
  data: {
  },

  getMovieList(url, _type) {
    wx.request({
      url,
      header: {
        'content-type': 'json'
      },
      success: res => {
        if(res.statusCode == 200) {
          this.setData({
            [_type]: res.data.subjects
          })
        }
      }
    })
  },

  searchMovie() {
    wx.navigateTo({
      url: '../movie-search/index'
    })
  },
  onLoad: function () {
    let theaterHot = `${globalData.doubanBase}${globalData.theaterHot}?start=0&&count=10`,
        comingSoon = `${globalData.doubanBase}${globalData.comingSoon}?start=0&&count=10`

    this.getMovieList(theaterHot, 'theaterHot')
    this.getMovieList(comingSoon, 'comingSoon')
    // this.getMovieList('https://www.easy-mock.com/mock/5be2f980033152564881d2fe/theater_hot', 'theaterHot')
    // this.getMovieList('https://www.easy-mock.com/mock/5be2f980033152564881d2fe/coming_soon', 'comingSoon')
  },
})
