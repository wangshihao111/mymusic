<template>
  <div class="layout">
    <transition name="side">
      <div class="side" v-show="showAside">
        <slot name="aside"></slot>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" @click="close" v-show="showAside"></div>
    </transition>
    <div class="main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showAside: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
};
</script>

<style lang="scss" scoped>
  .layout {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  .side {
    position: fixed;
    left: 0;
    height: 100%;
    width: 300px;
    z-index: 100;
    background: white;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(10,20,30,.5);
    z-index: 3;
  }
  .main {
    width: 100%;
    height: 100%;
    z-index: 2;
  }
</style>
