<template>
  <div class="img-list">
    <h2 class="titl" v-if="title !== ''">
      {{title}}
      <i class="fa fa-angle-right"></i>
    </h2>
    <div class="img-wrapper">
      <div class="item"
        v-for="(item, index) in dispList"
        :key="index"
        @click="itemClick(item, index)"
      >
        <div class="inner-wrapper">
          <img class="img" v-lazy="item.picUrl">
        </div>
        <span class="play-count">
          <span class="fa fa-headphones"></span>
          {{formatCount(item.playCount)}}
        </span>
        <p class="text">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    itemClick(item, index) {
      this.$emit('itemClick', item, index)
    },
    formatCount(num) {
      let r = Math.floor(num / 10000);
      return r > 0 ? `${r}万` : num;
    },
  },
  computed: {
    dispList() {
      if (this.list.length >= 6) {
      return this.list.slice(0, 6);
      } else {
        return this.list;
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.img-list {
  position: relative;
  width: 100%;
  .titl {
    padding: 3px 5px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    .fa {
      font-size: 18px;
      line-height: 20px;
      color: rgb(124, 112, 112);
    }
  }
  .img-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      position: relative;
      flex: 0 0 32%;
      height: auto;
      margin-bottom: 2px;
      .inner-wrapper {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: auto;
        padding-top: 100%;
        overflow: hidden;
      }
      .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
      .play-count {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 10px;
        color: lightgray;
      }
      .text {
        font-size: 10px;
        line-height: 15px;
        padding-bottom: 15px;
        padding-top: 5px;
      }
    }
  }
}
</style>
