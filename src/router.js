import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('views/Home.vue');
const TopSong = () => import('views/top-song');
const RankList = () => import('views/rank-list');
const Songlist = () => import('views/songlist');
const Search = () => import('views/search');
const Singer = () => import('views/singer');
const SingerDetail = () => import('views/singer-detail');
const LocalSong = () => import('views/local-song');
const Login = () => import('views/login');
const Favorite = () => import('views/favorite');

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      component: Home,
      children: [{
          path: 'top-song',
          component: TopSong,
          children: [{
            path: 'songlist/:id',
            component: Songlist
          }]
        },
        {
          path: 'rank-list',
          component: RankList,
          children: [{
            path: 'songlist/:id',
            component: Songlist
          }]
        },
        {
          path: 'songlist/:id',
          component: Songlist
        },
        {
          path: 'search',
          component: Search,
          children: [{
              path: 'songlist/:id/album/:album',
              component: Songlist
            },
            {
              path: 'singer',
              component: Singer,
              children: [{
                path: 'singer-detail/:id',
                component: SingerDetail
              }]
            }
          ]
        },
      ]
    },
    {
      path: '/local',
      component: LocalSong,
      children: [
        {
          path: 'fav',
          component: Favorite,
          children: [
            {
              path: 'singer-detail/:id',
              component: SingerDetail
            }
          ]
        },
        {
          path: 'songlist/:id/fav/:fav',
          component: Songlist
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/album/:id/album/:album',
      component: Songlist
    },
    {
      path: '/singer-detail/:id',
      component: SingerDetail
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})