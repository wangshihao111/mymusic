<template>
  <div class="local-song">
    <el-alert :title="errorText" type="error" center show-icon v-show="showError">
    </el-alert>
    <ul class="menu">
      <li class="menu-item" @click="showPlayHistory = true">
        <span class="icon"><i class="fa fa-play-circle-o"></i></span>
        <span class="txt">最近播放</span>
      </li>
      <li class="menu-item" @click="onFavClick">
        <span class="icon"><i class="fa fa-star-o"></i></span>
        <span class="txt">我的收藏</span>
      </li>
    </ul>
    <div class="my-songlist">
      <h1 class="subtitle" @click="showPlayList = !showPlayList">创建的歌单
        <i class="icon" :class="arrow"></i>
      </h1>
      <ul v-show="showPlayList" class="list">
        <li class="item" v-for="(item, index) in playList" :key="index" @click="onPlayListClick(item)">
          <div class="pic">
            <img :src="item.coverImgUrl">
          </div>
          <div class="content">
            <h3 class="name">{{item.name}}</h3>
            <p class="desc">{{item.trackCount}}首</p>
          </div>
        </li>
      </ul>
    </div>
    <transition name="his">
      <div class="play-history" v-show="showPlayHistory">
        <back title="播放历史" class="back" @close="showPlayHistory=false"></back>
        <scroll class="scroll">
          <list :list="playHistory" @selectItem="onItemSelect" @option="showOption"></list>
        </scroll>
      </div>
    </transition>
    <bottom-option :song="songInfo" v-if="songInfo && optionShow" @close="closeOption"></bottom-option>
    <router-view :artists="favoriteArtists"></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import _user from 'assets/js/user';
import Back from 'components/back/back';
import Scroll from 'components/scroll/scroll';
import List from 'components/list/list';
import BottomOption from 'components/bottom-option/bottom-option';
import { listOption } from 'assets/js/mixin';
import { getSongList } from 'assets/js/recommend';
import { store } from 'assets/js/storage'
export default {

  mixins: [listOption],
  components: {
    Back,
    Scroll,
    List,
    BottomOption
  },
  data() {
    return {
      playHistory: [],
      favoriteArtists: [],
      playList: [], // 用户收藏的歌单
      showPlayHistory: false,
      showPlayList: true, // 是否展示用户歌单
      allFavSongs: [],
      showError: false,
      errorText: ''
    };
  },
  computed: {
    ...mapGetters(['loginState', 'userInfo', 'favChange']),
    arrow() {
      return this.showPlayList ? 'el-icon-arrow-down' : 'el-icon-arrow-right';
    }
  },
  methods: {
    ...mapMutations(['setFavSongs', 'setFavSingers']),
    onFavClick() {
      if (!this.loginState) {
        this.errorText = '还没有登陆哦！'
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 2000);
      }
      this.loginState && this.$router.push('/local/fav');
    },
    onPlayListClick(item) {
      this.$router.push(`/local/songlist/${item.id}/fav/true`);
    },
    _normalizeSongs(list) {
      let songs = [];
      list.forEach(item => {
        songs.push({
          name: item.song.name,
          singer: { name: item.song.ar[0].name, id: item.song.ar[0].id },
          al: {
            picUrl: item.song.al.picUrl,
            name: item.song.al.name,
            id: item.song.al.id
          },
          picUrl: item.song.al.picUrl,
          id: item.song.id
        });
      });
      return songs;
    },
    _getPlayHistory() {
      this.loginState &&
        _user.getUserRecord(this.userInfo.account.id).then(res => {
          res.code === 200 &&
            (this.playHistory = this._normalizeSongs(res.allData));
        });
    },
    _getFavArtists() {
      // 获取收藏歌手
      this.loginState &&
        _user.getFavArtists().then(res => {
          res.code === 200 && (this.favoriteArtists = res.data);
          this.setFavSingers(this.favoriteArtists);
        });
    },
    async _getAllFavSongs(playList) {
      // 获取所有收藏的歌曲并且存入vuex中
      for (let i = 0; i < playList.length; i++) {
        let res = await getSongList(playList[i].id);
        this.allFavSongs = this.allFavSongs.concat(res.tracks);
      }
      this.setFavSongs(this.allFavSongs);
    },
    _getUserPlayList() {
      if (!this.loginState) {
        return;
      }
      let id = this.userInfo.account.id;
      _user.getPlayList(id).then(res => {
        if (res.code === 200) {
          this.playList = res.playlist;
          this._getAllFavSongs(res.playlist);
          store.set('pid', res.playlist.length ? res.playlist[0].id : null);
        }
      });
    }
  },
  watch: {
    favChange() {
      // 观测到收藏变化就重新加载
      this._getFavArtists();
      this._getUserPlayList();
    }
  },
  created() {
    this._getPlayHistory();
    this._getFavArtists();
    this._getUserPlayList();
  },
  activated() {
    this._getPlayHistory();
    this._getFavArtists();
    this._getUserPlayList();
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.local-song {
  .menu {
    .menu-item {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding-left: 40px;
      height: 40px;
      font-size: 13px;
      line-height: 40px;
      .icon {
        position: absolute;
        left: 0;
        top: 0;
        width: 40px;
        height: 40px;
        font-size: 20px;
        text-align: center;
        color: rgb(255, 10, 10);
      }
    }
  }
  .my-songlist {
    .subtitle {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding-left: 20px;
      line-height: 20px;
      font-size: 12px;
      text-indent: 10px;
      background-color: #eee;
      overflow: hidden;
      .icon {
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        transform-origin: 50% 50%;
        transition: all 0.2s;
      }
      .item {
        height: 45px;
      }
    }
    .list {
      .item {
        box-sizing: border-box;
        padding-left: 10px;
        position: relative;
        display: flex;
        height: 40px;
        width: 100%;
        margin-bottom: 3px;
        @include border-1px(#ccc, bottom);
        .pic {
          flex: 0 0 40px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content {
          box-sizing: border-box;
          flex: 1;
          padding-left: 10px;
          .name {
            font-size: 14px;
            line-height: 25px;
          }
          .desc {
            font-size: 12px;
            line-height: 15px;
            color: #aaa;
          }
        }
      }
    }
  }
  .play-history {
    position: fixed;
    top: 0;
    bottom: $playerHeight;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    .back {
      height: 36px;
    }
    .scroll {
      position: absolute;
      top: 36px;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }
    &.his-enter,
    &.his-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    &.his-enter-to,
    &.his-leave {
      transform: translate3d(0, 0, 0);
    }
    &.his-enter-active,
    &.his-leave-active {
      transition: all 0.2s;
    }
  }
}
</style>
