<template>
  <div class="bottom-list">
    <h2 class="titl">正在播放</h2>
    <div class="list-wrapper">
      <ul class="list" v-if="playList.length">
        <li class="item"
          @click="selectItem(item, index)"
          v-for="(item, index) in playList" :key="index">
          <span class="playing-icon playing" v-show="playingSong.id === item.id">
            <i class="fa fa-volume-up"></i>
          </span>
          <span class="text" :class="{playing: playingSong.id === item.id}">{{item.name}}-{{item.singer.name}}</span>
          <span class="fav">
            <i class="fa fa-heart"></i>
          </span>
          <span class="icon-delete" @click.stop="deleteOne({item})">
            <i class="el-icon-close"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['playList', 'playingSong'])
  },
  methods: {
    ...mapActions(['playSong', 'deleteOne']),
    selectItem(item, index) {
      this.playSong({item, index});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.bottom-list {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .titl {
    box-sizing: border-box;
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
    line-height: 30px;
    background-color: #fff;
    color: #e00;
  }
  .list-wrapper {
    height: 100%;
    width: 100%;
    background: #fff;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .list {
      width: 100%;
      .item {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 36px;
        padding-left: 10px;
        line-height: 36px;
        @include border-1px(#ccc, bottom);
        .playing-icon, .icon-delete, .fav {
          font-size: 14px;
          line-height: 36px;
          color: #ccc;
        }
        .playing-icon {
          padding-right: 5px;
        }
        .playing {
          color: red;
        }
        .text {
          font-size: 12px;
        }
        .fav {
          position: absolute;
          right: 30px;
        }
        .icon-delete {
          position: absolute;
          right: 5px;
          width: 20px;
          height: 36px;
          text-align: center;
        }
      }
    }
  }
}
</style>
