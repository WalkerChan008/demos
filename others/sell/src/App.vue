<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link :to="{name: 'goods'}">商品</router-link>
      <router-link :to="{name: 'ratings'}">评价</router-link>
      <router-link :to="{name: 'sellers'}">商家</router-link>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import '../mock/index'
import axios from 'axios'
import Header from './components/Header'

export default {
  name: 'App',
  data() {
    return {
      seller: {},
    }
  },
  created() {
    axios.get('/sell/seller').then((res) => {
        var resData = res.data;
        if(resData.code === 200 && resData.success) {
            this.seller = resData.data;
        }
    })
  },
  components: {
    vHeader: Header,
  }
}
</script>

<style lang="stylus">
  @import '../static/reset.css';
  @import '../static/style.css';
  @import './assets/stylus/index.styl';

  .tab
    display flex
    justify-content space-around
    padding 13px 0
    width 100%
    border-1px(rgba(7, 17, 27, 0.1))
    a
      font-size 14px
      font-weight 500
      line-height 14px
      color rgb(77, 85, 93)
      &.router-link-exact-active
        color rgb(240, 20, 20)
</style>