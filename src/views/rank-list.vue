<template>
  <transition name="page">
    <div class="rank-list">
      <back title="排行榜" @close="$router.back()" class="back"></back>
      <scroll class="scroll">
        <div>
          <header class="header">
            <img :src="listInfo && listInfo.artistToplist.coverUrl" class="bakcground">
            <div class="img-wrapper">
              <img v-lazy="listInfo && listInfo.artistToplist.coverUrl">
            </div>
            <div class="info">
              <h1 class="titl">{{listInfo && listInfo.artistToplist.name}}</h1>
            </div>
          </header>
          <h1 class="main-title">排行榜</h1>
          <ul class="list-wrapper" v-if="list.length">
            <li class="list-item"
              v-for="(item, index) in list"
              :key="index"
              @click="onItemClick(item)"
              >
              <div class="img-wrapper">
                <img v-lazy="item.coverImgUrl">
              </div>
              <div class="body" v-if="item.tracks.length">
                <p>1. {{item.tracks[0].first}} - {{item.tracks[0].second}}</p>
                <p>2. {{item.tracks[1].first}} - {{item.tracks[1].second}}</p>
                <p>3. {{item.tracks[2].first}} - {{item.tracks[2].second}}</p>
              </div>
              <div class="body" v-if="!item.tracks.length">
                <div class="description">{{item.description}}</div>
              </div>
            </li>
          </ul>
          <loading v-show="!list.length"></loading>
        </div>
      </scroll>
      <router-view style="z-index: 10;"></router-view>
    </div>
  </transition>
</template>

<script>
import { getRankList } from '@/assets/js/rank-list'
import Back from 'components/back/back'
import Loading from 'components/loading/loading'
import Scroll from 'components/scroll/scroll'

export default {
  components: {Back, Loading, Scroll},
  data() {
    return {
      listInfo: null,
      list: []
    }
  },
  methods: {
    onItemClick(item) {
      this.$router.push('/index/rank-list/songlist/' + item.id);
    }
  },
  created() {
    getRankList().then(res => {
      this.listInfo = res;
      this.list = res.list;
    });
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.rank-list {
  position: fixed;
  top: 0;
  bottom: $playerHeight;
  width: 100%;
  background-color: #fff;
}
.scroll {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.back {
  position: fixed;
  top: 0;
  z-index: 2;
}
.header {
  position: relative;
  height: 150px;
  width: 100%;
  overflow: hidden;
  .bakcground {
    position: absolute;
    width: 100%;
    z-index: -1;
    filter: blur(50px);
  }
  .img-wrapper {
    position: absolute;
    left: 10px;
    top: 30px;
    height: 90px;
    width: 90px;
    margin-top: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-left: 100px;
    padding-top: 40px;
    .titl {
      padding: 20px 0 0 20px;
      font-size: 20px;
      line-height: 30px;
      font-weight: 400;
      color: #fff;
    }
  }
}
.main-title {
  position: relative;
  font-size: 16px;
  line-height: 30px;
  font-weight: 500;
  padding-left: 10px;
  @include border-1px(rgba(7,17,27,.1), bottom);
}
.list-wrapper {
  width: 100%;
  .list-item {
    position: relative;
    height: 120px;
    width: 100%;
    display: flex;
    .img-wrapper {
      flex: 0 0 120px;
      box-sizing: border-box;
      height: 120px;
      width: 120px;
      padding: 2px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .body {
      position: relative;
      flex: 1;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      overflow: hidden;
      padding: 10px 0 10px 0;
      @include border-1px(rgba(7,17,27,.2), bottom);
      p {
        padding-left: 10px;
        font-size: 12px;
        color: rgb(7,17,27);
        line-height: 30px;
        white-space: nowrap;
      }
      .description {
        padding-left: 10px;
        font-size: 12px;
        color: rgb(7,17,27);
        line-height: 30px;
      }
    }
  }
}
</style>

