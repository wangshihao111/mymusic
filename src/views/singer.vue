<template>
  <transition name="page">
    <div class="singer">
      <back title="歌手" @close="$router.back()" class="back"></back>
      <header class="header">
        <h2 class="titl" v-show="!categoryShow">
          <span class="now">{{nowCat}}</span>
          <span class="select" v-show="!categoryShow" @click="categoryShow = true">筛选</span>
        </h2>
        <transition name="sec">
          <ul v-show="categoryShow" class="cate-list">
            <li class="item"
              v-for="(item, index) in categoryList" :key="index"
              @click="onCatClick(item)"
            >
              {{item.name}}
            </li>
          </ul>
        </transition>
      </header>
      <scroll class="list"
        :listenScroll="true"
        @scroll="onScroll"
        @scrollEnd="onScrollEnd"
        :probeType="2"
      >
        <div>
          <section class="singer-list">
            <h4 class="sub-titl">热门歌手</h4>
            <ul class="list">
              <li class="item" v-for="(singer, index) in singers" :key="index" @click="selectSinger(singer)">
                <img v-lazy="singer.picUrl" class="avatar">
                <p class="desc">{{singer.name}}
                  <span class="fav">+收藏</span>
                </p>
              </li>
            </ul>
            <loading v-show="more && nowCat === '全部歌手'"></loading>
            <p class="nomore" v-show="!more">没有更多了...</p>
          </section>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import _singer from 'assets/js/singer'
import Back from 'components/back/back'
import Loading from 'components/loading/loading'
import Scroll from 'components/scroll/scroll'

export default {
  components: {
    Back, Loading, Scroll
  },
  data() {
    return {
      categoryList: [
        {id: 0, name: '全部歌手'},
        {id: 1001, name: '华语男歌手'},
        {id: 1002, name: '华语女歌手'},
        {id: 6001, name: '日本男歌手'},
        {id: 6002, name: '日本女歌手'},
        {id: 4003, name: '其他'}
      ],
      categoryShow: false,
      singers: [],
      nowCat: '全部歌手', // 当前所选分类
      more: true // 是否还有更多
    }
  },
  methods: {
    onScroll(e) {
      if (-e.y > 50) { // 隐藏筛选列表
        this.categoryShow = false;
      }
    },
    onScrollEnd() {
      if (this.nowCat !== '全部歌手') {
        return;
      }
      let length = this.singers.length; // 列表的长度
      this._getAllSinger(length);
    },
    selectSinger(item) {
      this.$router.push('/index/search/singer/singer-detail/' + item.id);
    },
    _getAllSinger(offset) {
      _singer.getTopSinger(offset).then(res => {
        this.more = res.more;
        if (offset) {
          this.singers = this.singers.concat(res.artists)
        }
        else {
          this.singers = res.artists;
        }
      });
    },
    onCatClick(item) {
      this.categoryShow = false;
      this.nowCat = item.name;
      this.singers = [];
      this.more = true;
      if (item.id === 0) {
        this._getAllSinger();
        return;
      }
      _singer.getCatSinger(item.id).then(res => {
        this.more = false;
        this.singers = res.artists;
      })
    }
  },
  mounted() {
    this._getAllSinger();
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.singer {
  position: fixed;
  top: 0;
  bottom: $playerHeight;
  left: 0;
  right: 0;
  padding-top: 65px;
  background: #fff;
  z-index: 20;
  .back {
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 2;
  }
  .header {
    position: fixed;
    top: 35px;
    width: 100%;
    height: 30px;
    @include border-1px(#ccc, top);
    background-color: #fff;
    z-index: 2;
    .titl {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      padding-left: 10px;
      line-height: 30px;
      font-size: 14px;
      .select {
        position: absolute;
        right: 10px;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        color: #333;
      }
    }
    .cate-list {
      width: 100%;
      position: absolute;
      top: 0;
      @include border-1px(#ccc, top);
      box-shadow: 0 6px 18px 0px #999;
      background-color: #fff;
      z-index: 3;
      .item {
        display: inline-block;
        padding: 0 8px;
        margin: 8px;
        font-size: 12px;
        line-height: 25px;
        background-color: rgba(222,222,222,.2);
        border-radius: 1px;
      }
    }
  }
  .list {
    width: 100%;
    height: 100%;
  }
  .singer-list {
    .sub-titl {
      font-size: 10px;
      line-height: 20px;
      padding-left: 10px;
      color: rgba(7,17,27,.5);
      background-color: #eee;
    }
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
    .nomore {
      width: 100%;
      text-align: center;
      font-size: 12px;
      line-height: 30px;
      color: #666;
    }
  }
}
.sec-enter, .sec-leave-to {
  transform: scale3d(0,0,0);
}
.sec-enter-active, .sec-leave-active {
  transition: all .2s;
}
</style>
