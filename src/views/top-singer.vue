<template>
  <div class="top-singer">
    <back @close="$router.back()"></back>
  </div>
</template>

<script>
import Back from 'components/back/back'

export default {
  components: {
    Back
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.top-singer {
  position: fixed;
  top: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  bottom: $playerHeight;
}
</style>
