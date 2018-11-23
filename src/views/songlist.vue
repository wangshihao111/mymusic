<template>
  <transition name="page">
    <div class="songlist">
      <back class="back" @close="$router.back()" title="歌单"></back>
      <scroll class="content_scroll">
        <div class="songlist-inner">
          <div class="header" v-if="songListInfo">
            <img class="header-back" :src="songListInfo.coverImgUrl">
            <div class="img-wrapper">
              <img :src="songListInfo.coverImgUrl">
            </div>
            <div class="detail">
              <h1 class="titl">{{songListInfo.name}}</h1>
              <div class="text">
                <span>{{songListInfo.description}}</span>
              </div>
            </div>
          </div>
          <div class="main-list-wrapper" v-if="songListInfo">
            <list :list="normalSongs" @selectItem="onItemSelect" @option="showOption"></list>
          </div>
        </div>
      </scroll>
      <loading v-if="!songListInfo" top="50px"></loading>
      <bottom-option :song="songInfo" v-if="songInfo && optionShow" @close="closeOption"></bottom-option>
    </div>
  </transition>
</template>

<script>
import Back from '@/components/back/back'
import List from '@/components/list/list'
import Loading from 'components/loading/loading'
import Scroll from 'components/scroll/scroll'
import BottomOption from 'components/bottom-option/bottom-option'
import {listOption} from 'assets/js/mixin'
import { mapActions, mapMutations } from 'vuex'
import { getSongList } from '@/assets/js/recommend'

export default {
  mixins: [listOption],
  components: {
    Back, List, Loading, Scroll, BottomOption
  },
  data() {
    return {
      songListInfo: null,
      normalSongs: []
    }
  },
  computed:{
  },
  methods: {
    ...mapActions(['playSong']),
    ...mapMutations(['setPlayList']),
    onItemSelect(item, index) {
      this.setPlayList(this.normalSongs)
      this.playSong({item, index})
    },
    normalizeSongs(songs) {
      let list = [];
      songs.forEach(item => {
        list.push({
          name: item.name,
          singer: {name: item.ar[0].name, id: item.ar[0].id},
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
    }
  },
  mounted() {
    getSongList(this.$route.params.id).then(res => {
      this.songListInfo = res;
      this.normalSongs = this.normalizeSongs(res.tracks);
    });
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';
  .songlist {
    position: fixed;
    top: 0;
    bottom: $playerHeight;
    width: 100%;
    background: white;
    overflow: hidden;
    .content_scroll {
      height: 100%;
      width: 100%;
    }
    .back {
      position: fixed;
      top: 0;
      z-index: 10;
    }
    .songlist-inner {
      width: 100%;
    }
    .header {
      display: flex;
      flex-flow: row wrap;
      position: relative;
      top: 0;
      width: 100%;
      height: 110px;
      padding: 50px 0 20px 0;
      overflow: hidden;
      .header-back {
        position: absolute;
        z-index: -1;
        width: 100%;
        filter: blur(50px)
      }
      .img-wrapper {
        flex: 0 0 100px;
        margin-left: 12px;
        img {
          width: 100%;
          height: auto;
        }
      }
      .detail {
        flex: 1;
        padding-left: 30px;
        padding-right: 30px;
        .titl {
          font-size: 16px;
        }
        .text {
          position: relative;
          height: 60px;
          padding-top: 10px;
          font-size: 13px;
          line-height: 22px;
          overflow-y: scroll;
          text-overflow: ellipsis;
          -webkit-overflow-scrolling: touch;
        }
      }
    }
  }
  .main-list-wrapper {
    width: 100%;
  }
</style>
