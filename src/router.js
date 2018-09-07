import Vue from 'vue'
import Router from 'vue-router'

import Ads from './components/Ads.vue'
import NewAd from './components/NewAd.vue'
import ViewAd from './components/ViewAd.vue'
import MyAds from './components/MyAds.vue'
import Favorites from './components/Favorites.vue'

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
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/myads',
      name: 'myads',
      component: MyAds
    },
    {
      path: '/:username/:id',
      name: 'view',
      component: ViewAd
    }
  ]
})
