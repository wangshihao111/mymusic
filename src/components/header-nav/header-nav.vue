<template>
  <div class="header-nav">
    <div class="header">
      <router-link to="/local" class="link" activeClass="link-red" tag="div">
        <i class="fa fa-music"></i>
      </router-link>
      <router-link to="/index" class="link" activeClass="link-red" tag="div">
        <i class="fa fa-headphones"></i>
      </router-link>
    </div>
    <div class="menu-btn" @click="openMenu">
      <i class="fa fa-bars"></i>
    </div>
    <router-link to="/index/search" tag="div" class="search">
      <i class="fa fa-search"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  methods: {
    openMenu() {
      this.$emit('openMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~assets/style/global.scss';

  .header-nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    position: relative;
    width: 100%;
    height: $headerHeight;
    background: #fff;
    @include border-1px(#ccc, bottom);
  }
  .header {
    display: flex;
    justify-content: center;
    flex: 0 0 130px;
    height: 100%;
    font-size: 22px;
    line-height: $headerHeight;
    text-align: center;
    color: rgba(100, 100, 100, .5);
  }
  .link {
    flex: 0 0 30px;
  }
  .link-red {
    color: rgba(200,0,0,.8);
  }
  .menu-btn {
    position: absolute;
    left: 0;
    height: $headerHeight;
    width: 20px;
    font-size: 20px;
    line-height: $headerHeight;
    padding: 0 8px;
    color: #ccc;
  }
  .search {
    position: absolute;
    right: 5px;
    width: $headerHeight;
    height: $headerHeight;
    font-size: 16px;
    color: #ccc;
    text-align: center;
    line-height: $headerHeight;
  }
</style>
