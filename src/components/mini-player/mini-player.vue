<template>
  <div class="player-core">
    <div class="img-wrapper">
      <img :src="imgUrl">
    </div>
    <div class="center">
      <h3 class="name" :class="{'no-playing': !playingSong.id}">{{playList[playIndex] && playList[playIndex].name || '音乐你的生活！'}}</h3>
      <p class="singer">{{playList[playIndex] && playList[playIndex].singer.name}}</p>
    </div>
    <div class="right">
      <div class="play"  @click.stop="setPlayState(playState === 'playing' ? 'pause' : 'playing')">
        <div class="progress-circle">
          <progress-circle :radius="36" :percent="percent">
            <i class="fa" :class="playIcon"></i>
          </progress-circle>
        </div>
      </div>
      <div class="list" @click.stop.prevent="listClick">
        <i class="fa fa-list"></i>
      </div>
    </div>
    <audio
      class="audio"
      ref="audio"
      autoplay
      :src="playingSong.url"
      :loop="mode === 'loop'"
      @play="ready"
      @timeupdate="onProgressChange"
      @ended="playNext"
      @durationchange="onDurationChange"
    ></audio>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import ProgressCircle from 'components/progress-circle/progress-circle'

export default {
  components: {
    ProgressCircle
  },
  data() {
    return {
      duration: 0,
      currentTime: 0,
      percent: 0
    }
  },
  computed: {
    ...mapGetters(['playState', 'playIndex', 'playList', 'playingSong', 'mode']),
    imgUrl() {
      if (!this.playList.length) {
        return require('assets/img/default.jpg')
      }
      if (this.playList[this.playIndex]) {
        return this.playList[this.playIndex].al.picUrl
      }
    },
    playIcon() {
      if (!this.playingSong.url) {
        return 'fa-play-circle'
      }
      return this.playState === 'playing' ? 'fa-pause-circle' : 'fa-play-circle';
    }
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['setProgress', 'setPlayState']),
    ...mapActions(['playNext']),
    onProgressChange(e) { // 进度变化时通知外部, 百分比
      this.currentTime = e.target.currentTime;
      if (this.dutation !== 0) {
        this.percent = this.currentTime / this.duration;
      }
      this.$emit('progress', this.currentTime / e.target.duration);
    },
    setCurrentTime(time) { // 供外部调用以改变播放进度
      if (time) {
        this.$refs.audio.currentTime = time;
      }
    },
    onDurationChange() {
      this.duration = this.$refs.audio.duration;
      this.$emit('duration', this.duration);
    },
    // 音乐准备好播放的时候出发
    ready() {
      this.$emit('ready');
    },
    listClick() {
      this.$emit('listClick')
    }
  },
  watch: {
    playState(newState) {
      const ref = this.$refs.audio;
      if (newState === 'playing') {
        ref.play();
      } else if (newState === 'pause') {
        ref.pause();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.player-core {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: $playerHeight;
  background-color: #fff;
}
.img-wrapper {
  flex: 0 0 $playerHeight;
  width: $playerHeight;
  box-sizing: border-box;
  padding: 2px;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
.center {
  flex: 1;
  padding-left: 10px;
  font-size: 12px;
  line-height: 15px;
  .name {
    padding-top: 5px;
    &.no-playing {
      line-height: 30px;
      font-size: 14px;
    }
  }
  .singer {
    color: #666;
  }
}
.right {
  flex: 0 0 100px;
  display: flex;
  justify-content: space-around;
  width: 100px;
  .play,.list {
    flex: 0 0 $playerHeight;
    line-height: $playerHeight;
    font-size: 20px;
    text-align: center;
    color: rgba(0,0,0,.3);
    font-weight: 100;
  }
  .play {
    display: flex;
    justify-content: center;
    align-items: center;
    .progress-circle {
      position: relative;
      width: 40px;
      height: 40px;
    }
    .fa {
      position: absolute;
      top: 0px;
      left: 5px;
      font-size: 35px;
      color: #eee;
    }
  }
}
.audio {
  flex: 0 0 0;
}
</style>
