//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null,
    doubanBase: 'http://localhost',
    searchURL: '/v2/movie/search?q=',
    theaterHot: '/v2/movie/in_theaters',
    comingSoon: '/v2/movie/coming_soon',
    subject: '/v2/movie/subject/'
  }
})