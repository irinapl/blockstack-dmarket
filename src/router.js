import Vue from 'vue'
import Router from 'vue-router'

import Ads from './components/Ads.vue'
import NewAd from './components/NewAd.vue'
import ViewAd from './components/ViewAd.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ads',
      component: Ads
    },
    {
      path: '/new',
      name: 'new',
      component: NewAd
    },
    {
      path: '/:id',
      name: 'view',
      component: ViewAd
    }
  ]
})
