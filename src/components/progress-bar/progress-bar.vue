<template>
  <div class="progress-bar"
    @click.stop="onProgressBarClick"
    ref="bar"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    >
    <div class="inner" :style="{width: percent * 100 + '%'}"></div>
    <div class="indicator" :style="{left: percent * 100 + '%'}"></div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onProgressBarClick(e) {
      const windowWidth = window.innerWidth;
      const barWidth = this.$refs.bar.clientWidth;
      const offset = (windowWidth - barWidth) / 2;
      const width = e.pageX - offset;
      const percent = width / barWidth;
      this.$emit('change', percent)
    },
    onTouchStart(e) {
      const windowWidth = window.innerWidth;
      const barWidth = this.$refs.bar.clientWidth;
      const offset = (windowWidth - barWidth) / 2;
      const width = e.touches[0].pageX - offset;
      const percent = width / barWidth;
      this.$emit('change', percent)
    },
    onTouchMove(e) {
      const windowWidth = window.innerWidth;
      const barWidth = this.$refs.bar.clientWidth;
      const offset = (windowWidth - barWidth) / 2;
      const width = e.touches[0].pageX - offset;
      const percent = width / barWidth;
      this.$emit('change', percent)
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  position: relative;
  width: 100%;
  height: 2px;
  background-color: rgba(0,0,0,.2);
  .inner {
    height: 100%;
    background: #f00;
  }
  .indicator {
    position: absolute;
    top: 1px;
    display: block;
    width: 12px;
    height: 12px;
    padding: 1px solid rgb(72, 88, 10);
    background: yellowgreen;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
