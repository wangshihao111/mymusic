<template>
  <div class="home">
    <recommend></recommend>
    <router-view></router-view>
  </div>
</template>

<script>
import Recommend from '@/components/recommend/recommend.vue'

export default {
  components: {
    Recommend
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';
.home {
  position: fixed;
  top: $headerHeight;
  bottom: $playerHeight;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  overflow: hidden;
}

</style>

