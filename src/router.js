import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home.vue'
import TopSong from 'views/top-song'
import RankList from 'views/rank-list'
import Songlist from 'views/songlist'
import Search from 'views/search'
import SearchDetail from 'views/search-detail'
import Singer from 'views/singer'
import SingerDetail from 'views/singer-detail'
import LocalSong from 'views/local-song'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      component: Home,
      children: [
        {
          path: 'top-song',
          component: TopSong,
          children: [
            {
              path: 'songlist/:id',
              component: Songlist
            }
          ]
        },
        {
          path: 'rank-list',
          component: RankList,
          children: [
            {path: 'songlist/:id', component: Songlist}
          ]
        },
        {
          path: 'songlist/:id',
          component: Songlist
        },
        {
          path: 'search',
          component: Search,
          children: [
            {
              path: 'search-detail/:query',
              component: SearchDetail
            },
            {
              path: 'singer',
              component: Singer,
              children: [
                { path: 'singer-detail/:id', component: SingerDetail}
              ]
            }
          ]
        },
      ]
    },
    {
      path: 'local',
      component: LocalSong
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
