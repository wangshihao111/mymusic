<template>
  <div class="back-header" @click.stop>
    <i class="fa fa-angle-left" @click="close"></i>
    <span class="titl" v-if="title !== ''">{{title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
  $height: 35px;
  .back-header {
    position: relative;
    width: 100%;
    height: $height;
    text-align: center;
    background-color: rgba(175, 157, 157, 0.1);
    .fa {
      position: absolute;
      left: 8px;
      width: 40px;
      height: 100%;
      font-size: 20px;
      line-height: $height;
      color: red;
    }
    .titl {
      font-size: 15px;
      line-height: $height;
    }
  }
</style>

