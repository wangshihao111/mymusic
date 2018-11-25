<template>
  <div class="playlist-detail">
    <back class="back"></back>
    <scroll class="main-wrapper">
      <div class="top"></div>
    </scroll>
  </div>
</template>

<script>
import Back from 'components/back/back'
import Scroll from 'components/scroll/scroll'

export default {
  components: {
    Back, Scroll
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.playlist-detail {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: $playerHeight;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
  .back {
    flex: 0 0 36px;
  }
  .main-wrapper {
    flex: 1;
    overflow: hidden;
  }
}
</style>
