<template>
  <div id="app">
    <layout :showAside="showAside" @close="showAside = false">
      <side-bar slot="aside" class="side"></side-bar>
      <main slot="main" class="main">
        <div class="header-wrapper">
          <header-nav @openMenu="showAside = true"></header-nav>
        </div>
        <div class="router">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </main>
    </layout>
    <player :class="{'hide-layer': showAside}"></player>
  </div>
</template>

<script>
import Layout from 'components/layout/layout';
import SideBar from 'components/side-bar/side-bar';
import HeaderNav from 'components/header-nav/header-nav';
import Player from 'components/player/player';
import { store } from 'assets/js/storage';
import { mapMutations } from 'vuex'

export default {
  components: {
    Layout,
    SideBar,
    HeaderNav,
    Player
  },
  data() {
    return {
      showAside: false
    };
  },
  methods: {
    ...mapMutations(['setLoginState', 'setUserInfo'])
  },
  created() {
    let state = store.get('loginState');
    let user = store.get('userData');
    if (state && user) {
      this.setLoginState(true);
      this.setUserInfo(user); 
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

#app {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.main {
  width: 100%;
  height: 100%;
}
.header-wrapper {
  z-index: 0;
}
.router {
  z-index: 1;
}
.hide-layer {
  z-index: -1;
}
</style>
