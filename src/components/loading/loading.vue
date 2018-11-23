<template>
  <div class="loading" :style="{marginTop: top}">
    <img :src="require('assets/img/loading.gif')">
    <p class="text">正在加载中...</p>
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    width: 100%;
    height: 60px;
    text-align: center;
    img {
      height: 40px;
      width: 40px;
    }
    .text {
      width: 100%;
      height: 20px;
      text-align: center;
      font-size: 14px;
      line-height: 20px;
    }
  }
</style>
