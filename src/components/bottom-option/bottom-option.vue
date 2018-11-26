<template>
  <transition name="slide">
    <div class="bottom-option">
      <el-alert :title="tipText" type="success" show-icon v-show="showSuccess">
        <el-alert title="错误" type="error" center show-icon v-show="showError">
        </el-alert>
      </el-alert>
      <div class="mask" @click.stop="close"></div>
      <div class="inner">
        <p class="titl">歌曲：{{song.item.name}}</p>
        <ul class="content">
          <li class="item" @click="onPlayClick(song.item.id)">
            <i class="fa fa-play-circle-o"></i>
            {{playText}}
          </li>
          <li class="item" @click="onFavClick">
            <i class="fa fa-plus-square-o"></i>
            <span>{{favText}}</span>
          </li>
          <li class="item" @click="onSingerClick">
            <i class="fa fa-user"></i>
            <span>歌手：</span>
            <span>{{song.item.singer.name}}</span>
          </li>
          <li class="item" @click="onAlbumClick">
            <i class="fa fa-user-circle-o"></i>
            专辑：{{song.item.al.name}}
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import _user from 'assets/js/user';

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
      playText: '',
      showSuccess: false,
      showError: false,
      index: -1, // 在收藏歌曲中的索引， -1为没有收藏
      tipText: ''
    };
  },
  computed: {
    ...mapGetters([
      'playIndex',
      'playingSong',
      'playList',
      'playIndex',
      'favSongs'
    ]),
    favText() {
      return this.index === -1 ? '收藏' : '取消收藏';
    }
  },
  methods: {
    ...mapActions(['playNext', 'playSong']),
    ...mapMutations(['setPlayList', 'setFavChange']),
    onPlayClick(id) {
      if (id === this.playingSong.id) {
        this.playNext();
      } else {
        if (!this.playList.length) {
          // 如果为空队列，则加进去并播放
          let list = this.playList.slice(0);
          list.push(this.song.item);
          this.setPlayList(list);
          this.playSong({
            item: this.song.item,
            index: 0
          });
        } else {
          let index = this.playList.findIndex(
            item => item.id === this.song.item.id
          );
          if (index === -1) {
            let list = this.playList.slice(0);
            list.push(this.song.item);
            this.setPlayList(list);
            this.playSong({
              item: this.song.item,
              index: this.playList.length - 1
            });
          } else {
            this.playSong({
              item: this.song.item,
              index: index
            });
          }
        }
      }
    },
    close() {
      this.$emit('close');
    },
    onAlbumClick() {
      this.$router.push(`/album/${this.song.item.al.id}/album/true`);
    },
    onSingerClick() {
      this.$router.push('/singer-detail/' + this.song.item.singer.id);
    },
    onFavClick() {
      if (this.index == -1) {
        _user.addFavSong(this.song.item.id).then(res => {
          if (res.code === 200) {
            this.showSuccess = true;
            this.tipText = '收藏成功';
            this.setFavChange();
            setTimeout(() => {
              this.showSuccess = false;
            }, 2000);
          } else {
            this.showError = true;
            setTimeout(() => {
              this.showSuccess = false;
            }, 2000);
          }
        });
      } else {
        _user.deleteFavSong(this.song.item.id).then(res => {
          if (res.code === 200) {
            this.showSuccess = true;
            this.tipText = '取消收藏成功';
            this.setFavChange();
            setTimeout(() => {
              this.showSuccess = false;
            }, 2000);
          } else {
            this.showError = true;
            setTimeout(() => {
              this.showSuccess = false;
            }, 2000);
          }
        });
      }
    }
  },
  mounted() {
    this.playText = this.song.text;
    this.index = this.favSongs.findIndex(item => item.id === this.song.item.id);
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
  z-index: 100;
  .mask {
    position: absolute;
    top: -100%;
    bottom: $playerHeight;
    width: 100%;
    opacity: .5;
    background: rgba(100, 100, 100, 1);
    transition: all .5s;
    z-index: 1000;
  }
  .inner {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 250px;
    border-radius: 5px;
    background: #fff;
    z-index: 1001;
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
  transform: translateY(100%);
}
.slide-leave,
.slide-enter-to {
  transform: translateY();
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
}
</style>
