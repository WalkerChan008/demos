import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods'
import Ratings from '@/components/Ratings'
import Sellers from '@/components/Sellers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/sellers',
      name: 'sellers',
      component: Sellers
    }
  ]
})
