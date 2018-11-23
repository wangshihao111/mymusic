<template>
  <transition name="page">
    <div class="topsong">
      <back class="header-back" title="歌单" @close="$router.back()"></back>
      <scroll class="scroll">
        <div class="list-wrapper">
          <div class="item"
            v-for="(item, index) in list"
            :key="index">
            <img v-lazy="item.coverImgUrl" @click="onItemClick(item, index)">
            <p class="name">{{item.name}}</p>
            <div class="playcount">
              <i class="fa fa-headphones"></i>
              {{formatCount(item.playCount)}}
            </div>
          </div>
        </div>
      </scroll>
      <loading v-show="!list.length" top="30px"></loading>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import Loading from 'components/loading/loading'
import Back from '@/components/back/back'
import Scroll from 'components/scroll/scroll'
import { getTopList } from '@/assets/js/top-song'

export default {
  components: {
    Back, Loading, Scroll
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    // 图片列表元素呗点击时，获取数据
    onItemClick(item) {
      this.$router.push('/index/top-song/songlist/' + item.id);
    },
    formatCount(num) {
      let r = Math.floor(num / 10000);
      return r > 0 ? `${r}万` : num;
    },
  },
  mounted() {
    getTopList().then(res => {
      this.list = res;
    })
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';
  .topsong {
    position: fixed;
    top: 0;
    bottom: $playerHeight;
    width: 100%;
    background: white;
    .scroll {
      width: 100%;
      height: 100%;
    }
    .header-back {
      position: fixed;
      z-index: 2;
    }
    .list-wrapper {
      display: flex;
      justify-content: space-around;
      width: 100%;
      padding-top: 50px;
      flex-flow: row wrap;
      .item {
        flex: 0 0 45%;
        position: relative;
        img {
          width: 100%;
          height: auto;
        }
        .name {
          font-size: 12px;
          text-align: center;
          line-break: 14px;
        }
        .playcount {
          position: absolute;
          top: 5px;
          right: 5px;
          font-size: 10px;
          color: #ccc;
        }
      }
    }
  }
</style>
