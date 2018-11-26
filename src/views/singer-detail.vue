<template>
  <transition name="page">
    <div class="singer-detail" @click.stop>
      <el-alert
        :title="successText"
        type="success"
        v-show="showSuccess"
        show-icon>
      </el-alert>
      <el-alert
        :title="errorText"
        type="error"
        v-show="showError"
        show-icon>
      </el-alert>
      <header class="header" ref="header">
        <div class="arrow" @click="back"><i class="el-icon-arrow-left"></i></div>
        <div class="desc" v-show="topShow">
          <span class="name">{{artist.name}}</span>
          <span class="fav" @click.stop="onFavClick(artist)">{{favText(artist)}}</span>
        </div>
      </header>
      <section class="top" ref="top">
        <div class="img-wrapper">
          <img :src="artist.picUrl" ref="img">
        </div>
        <div class="mask" ref="mask"></div>
        <div class="action" ref="action">
          <div class="left">
            <p class="name">{{artist.name}}</p>
            <p class="desc"></p>
          </div>
          <div class="right">
            <span class="fav" @click.stop="onFavClick(artist)">{{favText(artist)}}</span>
          </div>
        </div>
      </section>
      <div class="bg-layer" ref="layer"></div>
      <scroll class="scroll" @scroll="onScroll" :listenScroll="true" :probeType="3" ref="scroll">
        <div>
          <section class="list-wrapper" ref="list">
            <h1 class="list-top"></h1>
            <list :list="songs" @selectItem="onItemSelect" @option="showOption"></list>
          </section>
          <loading v-show="!songs.length"></loading>
        </div>
      </scroll>
      <bottom-option :song="songInfo" v-if="songInfo && optionShow" @close="closeOption"></bottom-option>
    </div>
  </transition>
</template>

<script>
import List from 'components/list/list';
import Scroll from 'components/scroll/scroll';
import BottomOption from 'components/bottom-option/bottom-option';
import Loading from 'components/loading/loading';
import { listOption } from 'assets/js/mixin';
import _singer from 'assets/js/singer';
import _ from 'lodash';
import { favSinger } from 'assets/js/mixin'

const OFFSET_Height = 40;

export default {
  components: {
    List,
    Scroll,
    BottomOption,
    Loading
  },
  mixins: [listOption, favSinger],
  data() {
    return {
      topShow: false,
      artist: {},
      songs: []
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    onScroll: _.throttle(function(e) {
      this._handleScroll(e);
      this._handlePullDowm(e);
    }, 20),
    _normalizeSongs(songs) {
      let list = [];
      songs.forEach(item => {
        list.push({
          name: item.name,
          singer: { name: item.ar[0].name, id: item.ar[0].id },
          al: {
            picUrl: item.al.picUrl,
            name: item.al.name,
            id: item.al.id
          },
          picUrl: item.al.picUrl,
          id: item.id
        });
      });
      return list;
    },
    _handleTouchMove(e) {
      this.touch.delta = e.touches[0].clientY - this.touch.start;
      if (this.touch.delta < 0) {
        return;
      }
      const list = this.$refs.list;
      const top = this.$refs.top;
      list.style['transform'] = `translateY(${this.touch.delta}px)`;
      top.style['transform'] = `scale(${1 +
        (this.touch.delta * 3) / window.innerHeight})`;
    },
    _handleScroll(e) {
      const layer = this.$refs.layer;
      let bgTransition = topHeight - Math.min(topHeight - OFFSET_Height, y);
      let topHeight = this.$refs.top.clientHeight;
      let y = -e.y;
      this.$refs.mask.style['opacity'] = y / topHeight;
      y > topHeight - 20 ? (this.topShow = true) : (this.topShow = false);
      y >= topHeight - 20 //  顶部返回栏的样式
        ? (this.$refs.header.style['background'] = 'rgba(7,16,25, .5)')
        : (this.$refs.header.style['background'] = '');
      y > 0 && (layer.style.transform = `translate3d(0,${-bgTransition}px,0)`);
    },
    _handlePullDowm(e) {
      const top = this.$refs.top;
      if (e.y > 0) {
        const imgHeight = this.$refs.img.clientHeight;
        this.$refs.img.style['transform'] = `scale(${1 + e.y / imgHeight})`;
        this.$refs.action.style.transform = `translate3d(0,${e.y}px,0)`;
      } else {
        top.style['transform'] = `scale(1)`;
        this.$refs.action.transform = `translate3d(0,0,0)`;
      }
    },
    _initDetail() {
      const top = this.$refs.top;
      const scroll = this.$refs.scroll;
      let topHeight = top.clientHeight;
      scroll.$el.style.top = topHeight + 'px';
      !this.$route.params.id && this.$router.back();
      _singer.getSingerSongs(this.$route.params.id).then(res => {
        this.artist = res.artist;
        this.songs = this._normalizeSongs(res.hotSongs);
      });
    }
  },
  mounted() {
    this._initDetail();
  },
  activated() {
    this._initDetail();
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.singer-detail {
  position: fixed;
  top: 0;
  bottom: $playerHeight;
  left: 0;
  right: 0;
  background-color: #fff;
  overflow: hidden;
  z-index: 10;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    color: #fff;
    z-index: 13;
    .arrow {
      position: absolute;
      left: 0;
      top: 0;
      display: inline-block;
      width: 40px;
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      z-index: 2;
    }
    .desc {
      position: relative;
      box-sizing: border-box;
      height: 100%;
      padding-left: 40px;
      .name,
      .fav {
        display: block;
        height: 100%;
        line-height: 40px;
        padding-left: 10px;
        font-size: 14px;
      }
      .fav {
        position: absolute;
        right: 10px;
        top: 10px;
        height: 20px;
        padding-left: 10px;
        padding-right: 10px;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
        border-radius: 10px;
        color: #fff;
        background: radial-gradient(circle at -70%, #fff, red);
      }
    }
  }
  .bg-layer {
    width: 100%;
    height: 100%;
    z-index: 11;
  }
  .scroll {
    position: fixed;
    top: 0;
    bottom: $playerHeight;
    width: 100%;
    z-index: 12;
  }
  .top {
    position: relative;
    width: 100%;
    .img-wrapper {
      position: relative;
      width: 100%;
      padding-top: 70%;
      z-index: -1;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-origin: 50% top;
        z-index: -1;
      }
    }
    .mask {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgb(7, 17, 27);
      opacity: 0;
    }
    .action {
      position: absolute;
      bottom: 20px;
      width: 100%;
      display: flex;
      color: #fff;
      z-index: 3;
      .left {
        flex: 0 0 50px;
        height: 40px;
        font-size: 12px;
        text-align: center;
        padding-left: 10px;
      }
      .right {
        position: relative;
        flex: 1;
        .fav {
          display: block;
          position: absolute;
          right: 20px;
          font-size: 10px;
          line-height: 20px;
          border-radius: 10px;
          padding: 0 10px;
          text-align: center;
          background: radial-gradient(circle at -60%, #fff, #f00);
        }
      }
    }
  }
}
</style>
