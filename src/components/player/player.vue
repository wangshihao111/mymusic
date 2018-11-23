<template>
  <div class="player">
    <transition name="player">
      <div class="full-screen-player" v-show="bigPlayer">
        <back :title="title" class="back" @close="setBigPlayer(false)"></back>
        <img :src="playList[playIndex] && playList[playIndex].al.picUrl" class="background">
        <div class="center"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd">
          <div class="cd-wrapper" v-show="playList.length" ref="left">
            <div class="img-wrapper">
              <img :src="playList[playIndex] && playList[playIndex].al.picUrl"
              class="cd" :class="cdClass">
            </div>
          </div>
          <scroll class="lyric-wrapper" ref="right" v-if="lrc">
            <div class="lyric">
              <p class="lyric-txt"
                ref="lrcLine"
                v-for="(line, index) in lrc.lines" :key="index"
                :class="{current: currentLineNum === index}"
              >
                {{line.txt}}
              </p>
            </div>
          </scroll>
          <p v-show="!playList.length">还没有可以播放的歌曲哦</p>
        </div>
        <div class="left-lyric" v-show="page === 1">{{playingLyric}}</div>
        <div class="indicator-wrapper">
          <span class="item" :class="{active: page === 1}"></span>
          <span class="item" :class="{active: page === 2}"></span>
        </div>
        <div class="controls">
          <div class="progress-wrapper">
            <span class="timel">{{currentTime || '-:-'}}</span>
            <progress-bar :percent="percent" @change="onProgressBarChange"></progress-bar>
            <span class="timer">{{totalTime || '-:-'}}</span>
          </div>
          <ul class="control-wrapper">
            <li class="control" @click="switchMode">
              <i class="fa" :class="playTypeClass"></i>
            </li>
            <li class="control" @click="playPrev">
              <i class="el-icon-d-arrow-left"></i>
            </li>
            <li class="control" @click="switchPlayState">
              <i class="fa" :class="playStateClass"></i>
            </li>
            <li class="control" @click="playNext">
              <i class="el-icon-d-arrow-right"></i>
            </li>
            <li class="control">
              <i class="fa fa-heart"></i>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="list-mask" v-show="showBottomList" @click="showBottomList=false"></div>
    </transition>
    <transition name="list">
      <div class="bottom-list-wrapper" v-show="showBottomList">
        <bottom-list></bottom-list>
      </div>
    </transition>
    <div class="mini" v-show="!bigPlayer" @click="showBigPlayer">
      <mini-player @progress="progressUpdate"
        @duration="readDuration"
        @ready="ready"
        ref="mini"
        @listClick="showBottomList=!showBottomList"
        ></mini-player>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Back from 'components/back/back'
import MiniPlayer from 'components/mini-player/mini-player'
import ProgressBar from 'components/progress-bar/progress-bar'
import BottomList from 'components/bottom-list/bottom-list'
import Scroll from 'components/scroll/scroll'
import { formatTime } from 'assets/js/util'
import { getLyric } from 'assets/js/music'
import Lyric from 'assets/js/lyric'

export default {
  components: {
    Back, MiniPlayer, ProgressBar, BottomList, Scroll
  },
  data() {
    return {
      percent: 0,
      duration: 0, // 读取的原始数据
      totalTime: '', // 转化后的总时间
      page: 1,
      lrc: null,
      currentLineNum: 0, //当前播放的歌词是第n行
      playingLyric: '',
      readyState: false,
      showBottomList: false
    }
  },
  computed: {
    ...mapGetters([
      'mode',
      'playingSong',
      'playList',
      'playState',
      'bigPlayer',
      'playIndex'
    ]),
    title() {
      if (this.playList.length) {
        return this.playList[this.playIndex] ? this.playList[this.playIndex].name : '';
      }
      return '';
    },
    cdClass() {
      return this.playState === 'pause' ? 'cd-pause' : 'cd-play';
    },
    currentTime() { // 进度条左侧的时间
      const time = this.duration * this.percent;
      return formatTime(time);
    },
    playTypeClass() {
      return 'icon-' + this.mode;
    },
    playStateClass() {
      if (!this.playingSong.url) {
        return 'fa-play-circle'
      }
      return this.playState === 'playing' ? 'fa-pause-circle-o' : 'fa-play-circle-o';
    }
  },
  methods: {
    ...mapMutations(['setMode', 'setPlayState', 'setBigPlayer']),
    ...mapActions(['playNext', 'playPrev']),
    switchMode() { // 切换播放模式
      switch (this.mode) {
        case 'sequence':
          this.setMode('random');
          break;
        case 'random':
          this.setMode('loop');
          break;
        case 'loop':
          this.setMode('sequence');
          break;
        default:
          break;
      }
    },
    switchPlayState() {
      if (this.playList.length === 0) {
        return;
      }
      this.playState === 'playing' ? this.setPlayState('pause') : this.setPlayState('playing');
      
      this.lrc && this.lrc.togglePlay();
    },
    showBigPlayer() {
      this.setBigPlayer(true)
      this.showBottomList = false;
    },
    progressUpdate(percent) {
      this.percent = percent;
    },
    readDuration(time) { // 读取播放总时间
      this.duration = time;
      this.totalTime = formatTime(time);
      this.lrc && this.lrc.play();
    },
    onProgressBarChange(percent) {
      this.$refs.mini.setCurrentTime(this.duration * percent);
      if (this.lrc) {
        this.lrc.seek(this.duration * this.percent * 1000);
      }
    },
    onTouchStart(e) {
      this.$refs.left.style['transition'] = '';
      this.$refs.right.$el.style['transition'] = '';
      this.touch = {};
      this.touch.start = e.touches[0].pageX;
    },
    onTouchMove(e) {
      const width = window.innerWidth;
      const left = this.$refs.left;
      const right = this.$refs.right.$el;
      this.touch.delta = e.touches[0].pageX - this.touch.start;
      if ((this.page === 1 && this.touch.delta > 0) || (this.page === 2 && this.touch.delta < 0)) {
        return;
      }
      else if (this.page === 1 && this.touch.delta < 0) {
        right.style['transform'] = `translateX(${width + this.touch.delta}px)`;
        left.style['opacity'] = 1 + this.touch.delta / width;
      } else if (this.page === 2 && this.touch.delta > 0) {
        right.style['transform'] = `translateX(${this.touch.delta}px)`;
        left.style['opacity'] = `${this.touch.delta / width}`;
      }
    },
    onTouchEnd() {
      const width = window.innerWidth;
      const left = this.$refs.left;
      const right = this.$refs.right.$el;
      if (Math.abs(this.touch.delta) < width * 0.3) {
        // right.style['display'] = 'none';
        if (this.page === 1) {
          left.style['opacity'] = '1';
          right.style['transform'] = 'translateX(100%)';
          right.style['zIndex'] = -1;
        } else {
          left.style['opacity'] = '0';
          right.style['transform'] = `translateX(0)`;
          right.style['zIndex'] = 2;
        }
        return;
      }
      if (this.page === 1 && this.touch.delta < 0) {
        right.style['transition'] = left.style['transition'] = 'all .2s';
        left.style['opacity'] = '0';
        right.style['transform'] = 'translateX(0)';
        right.style['zIndex'] = 2;
        this.page = 2;
      } else if (this.page === 2 && this.touch.delta > 0) {
        right.style['transition'] = left.style['transition'] = 'all .2s';
        left.style['opacity'] = '1';
        right.style['transform'] = `translateX(${width}px)`;
        right.style['zIndex'] = -1;
        this.page = 1;
      }
    },
    ready() {
        if (this.lrc) {
          if (this.lrc.state === 1) {
            return;
          }
          this.lrc.play();
        }
    },
    handleLrc({txt, lineNum}) {
      this.currentLineNum = lineNum;
      const el = this.$refs.lrcLine[lineNum];
      this.$refs.right.scrollToElement(el, '1s', true, true)
      this.playingLyric = txt;
    }
  },
  watch: {
    playingSong(newSong, oldSong) {
      if (newSong.id !== oldSong.id) {
        this.lrc && this.lrc.stop();
        this.lrc = null;
        getLyric(newSong.id).then(res => {
          this.lrc = new Lyric(res.lyric, this.handleLrc);
          this.playState === 'playing' && this.lrc.play();
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';
  .player {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
  }
  .full-screen-player {
    position: fixed;
    bottom: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #fff;
  }
  .back {
    flex: 0 0 $headerHeight;
  }
  .center {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .cd-wrapper {
      position: relative;
      width: 70%;
      height: auto;
      padding: 2px;
      border-radius: 50%;
      overflow: hidden;
      .img-wrapper {
        width: 100%;
        padding-top: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
      .cd {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        border: 1px solid rgba(255,0,0,.6);
        animation: rotate 20s linear infinite;
        z-index: -1;
      }
      .cd-play {
        animation-play-state: running;
      }
      .cd-pause {
        animation-play-state: paused;
      }
    }
    .lyric-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      transform: translateX(100%);
      overflow: hidden;
      .lyric {
        width: 100%;
        .lyric-txt {
          font-size: 13px;
          line-height: 30px;
          text-align: center;
          color: rgba(255, 255, 255,.8);
          transition: all 1s;
        }
        .current {
          color: #0f0;
        }
      }
    }
  }
  .left-lyric {
    flex: 0 0 30px;
    line-height: 30px;
    width: 100%;
    font-size: 16px;
    color: #0f0;
    text-align: center;
  }
  .indicator-wrapper {
    flex: 0 0 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    padding-bottom: 10px;
    .item {
      display: inline-block;
      width: 15px;
      height: 8px;
      margin-left: 5px;
      border-radius: 5px;
      background-color: rgba(255,255,255,.5);
      &.active {
        background-color: #f00;
      }
    }
  }
  .controls {
    flex: 0 0 100px;
    position: relative;
  }
  .progress-wrapper {
    position: relative;
    box-sizing: border-box;
    padding: 0 40px;
    width: 100%;
    border: #000;
    .timel {
      display: block;
      position: absolute;
      left: 10px;
      top: 0;
      font-size: 10px;
      transform: translateY(-50%);
    }
    .timer {
      display: block;
      position: absolute;
      top: 0;
      font-size: 10px;
      right: 10px;
      transform: translateY(-50%);
    }
  }
  .control-wrapper {
    position: absolute;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    .control {
      flex: 0 0 30px;
      height: 30px;
      font-size: 30px;
      line-height: 30px;
      color: rgba(255,0,0,.6);
      .fa-heart {
        color: #ccc;
        font-size: 25px;
      }
    }
  }
  .list-mask {
    position: fixed;
    top: 0;
    bottom: $playerHeight;
    width: 100%;
    background: rgba(7,17,27,.5);
    z-index: 100;
    &.mask-enter, &.mask-leave-to {
      opacity: 0;
    }
    &.mask-enter-active, &.mask-leave-active {
      transition: all .2s;
    }
  }
  .bottom-list-wrapper {
    position: absolute;
    bottom: $playerHeight;
    height: 350px;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    z-index: 101;
    transform-origin: 0 bottom;
    &.list-enter, &.list-leave-to {
      transform: scaleY(0);
    }
    &.list-enter-active, &.list-leave-active {
      transition: all .2s;
    }
  }
  .mini {
    position: relative;
    @include border-1px(rgba(7,17,27,.2), top);
  }
  .player-enter, .player-leave-to {
    transform: translate(-90%,100%) scaleX(0) scaleY(0);
  }
  .player-leave, .player-enter-to {
    transform: translate(0,0) scaleX(1) scaleY(1);
  }
  .player-enter-active, .player-leave-active {
    transition: all .3s;
  }
  .background {
    position: absolute;
    height: 100%;
    filter: blur(50px);
    z-index: -1;
  }
  @keyframes rotate {
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
