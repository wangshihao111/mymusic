<template>
  <transition name="slide">
    <div class="bottom-option">
      <div class="mask" @click.stop="close"></div>
      <div class="inner">
        <p class="titl">歌曲：{{song.item.name}}</p>
        <ul class="content">
          <li class="item" @click="onPlayClick(song.item.id)">
            <i class="fa fa-play-circle-o"></i>
            {{playText}}
          </li>
          <li class="item">
            <i class="fa fa-plus-square-o"></i>
            <span>收藏到歌单</span>
          </li>
          <li class="item">
            <i class="fa fa-user"></i>
            <span>歌手：</span>
            <span>{{song.item.singer.name}}</span>
          </li>
          <li class="item">
            <i class="fa fa-user-circle-o"></i>
            专辑：{{song.item.al.name}}
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    song: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      playText: ''
    };
  },
  computed: {
    ...mapGetters(['playIndex', 'playingSong', 'playList', 'playIndex'])
  },
  methods: {
    ...mapActions(['playNext', 'playSong']),
    onPlayClick(id) {
      if (id === this.playingSong.id) {
        this.playNext();
      } else {
        this.playSong({
          item: this.song.item,
          index: this.song.index
        });
      }
    },
    close() {
      this.$emit('close');
    }
  },
  mounted() {
    this.playText = this.song.text;
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/style/global';

$optionHeight: 50px;
.bottom-option {
  position: fixed;
  bottom: $playerHeight;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  .mask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(100, 100, 100, 0.3);
  }
  .inner {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 250px;
    border-radius: 5px;
    background: #fff;
  }
  .titl {
    display: block;
    height: $optionHeight;
    padding-left: 10px;
    margin: 0;
    font-size: 14px;
    line-height: $optionHeight;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .content {
    padding-top: 0;
    background: #fff;
    .item {
      height: $optionHeight;
      line-height: $optionHeight;
      font-size: 14px;
      padding-left: 10px;
      .fa {
        line-height: $optionHeight;
        margin-right: 10px;
        color: rgba(255, 0, 0, 0.8);
      }
    }
  }
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}
.slide-leave,
.slide-enter-to {
  opacity: 1;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s linear;
}
</style>
