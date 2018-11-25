<template>
  <transition name="page">
    <div class="favorite">
      <back @close="$router.back()" class="back"></back>
      <div class="tab-wrapper">
        <div class="tab-title">
          <div class="titl" @click="tabPage=1" :class="{active: tabPage === 1}">专辑</div>
          <div class="titl" @click="tabPage=2" :class="{active: tabPage === 2}">歌手</div>
          <span class="underline" ref="underLine"></span>
        </div>
        <div class="tab-content">
          <scroll class="album" v-show="tabPage === 1">
            <div>
              暂无收藏
            </div>
          </scroll>
          <scroll class="artists" v-show="tabPage === 2">
            <ul class="list">
              <li class="item" v-for="(singer, index) in artists" :key="index" @click="selectSinger(singer)">
                <img v-lazy="singer.picUrl" class="avatar">
                <p class="desc">{{singer.name}}
                  <span class="fav">取消收藏</span>
                </p>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import Back from 'components/back/back';
import Scroll from 'components/scroll/scroll'

export default {
  components: {
    Back,
    Scroll
  },
  props: {
    artists: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      tabPage: 1
    };
  },
  methods: {
    selectSinger(item) {
      this.$router.push('/local/fav/singer-detail/' + item.id);
    }
  },
  created() {
    this.tabPage = 2;
  },
  watch: {
    tabPage(newPage, oldPage) {
      const underLine = this.$refs['underLine'];
      if (newPage === 2 && oldPage === 1) {
        underLine.style.left = '75%';
      } else if (newPage === 1 && oldPage === 2) {
        underLine.style.left = '25%';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.favorite {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  bottom: $playerHeight;
  overflow: hidden;
  background-color: #fff;
  .back {
    flex: 0 0 36px;
  }
  .tab-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    .tab-title {
      position: relative;
      flex: 0 0 40px;
      display: flex;
      height: 40px;
      line-height: 40px;
      @include border-1px(#ccc, bottom);
      .titl {
        flex: 0 0 50%;
        text-align: center;
        &.active {
          color: red;
        }
      }
      .underline {
        position: absolute;
        bottom: 2px;
        left: 25%;
        width: 40px;
        height: 2px;
        transform: translateX(-50%);
        transition: 0.3s;
        background-color: red;
      }
    }
    .tab-content {
      flex: 1;
      .album,
      .artists {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .album {
        color: red;
      }
      .artists {
        .list {
          .item {
            display: flex;
            padding-left: 10px;
            line-height: 40px;
            .avatar {
              flex: 0 0 36px;
              width: 36px;
              height: 36px;
              padding: 2px;
              border-radius: 50%;
            }
            .desc {
              flex: 1;
              height: 100%;
              position: relative;
              font-size: 13px;
              padding-left: 10px;
              line-height: 36px;
              @include border-1px(#eee, bottom);
              .fav {
                display: inline-block;
                position: absolute;
                right: 10px;
                top: 10px;
                height: 20px;
                padding: 0 8px;
                font-size: 12px;
                line-height: 20px;
                color: red;
                text-align: center;
                @include all-border-1px(red, 10px);
              }
            }
          }
        }
      }
    }
  }
}
</style>
