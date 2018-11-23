<template>
  <div class="recommend no-padding">
    <scroll class="list">
      <div>
        <div class="carousel-wrapper">
          <el-carousel height="130px" arrow="always">
            <el-carousel-item v-for="(item, index) in banners" :key="index" class="item">
              <img class="banner-img" :src="item.imageUrl">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="sub-menu">
          <div class="item-wrapper">
            <router-link to="/index/search/singer" tag="div" class="item">
              <i class="fa fa-calendar"></i>
            </router-link>
            <p>热门歌手</p>
          </div>
          <div class="item-wrapper">
            <router-link to="/index/top-song" tag="div" class="item">
              <i class="fa fa-list"></i>
            </router-link>
            <p>歌单</p>
          </div>
          <div class="item-wrapper">
            <router-link to="/index/rank-list" tag="div" class="item">
              <i class="fa fa-bar-chart"></i>
            </router-link>
            <p>排行榜</p>
          </div>
        </div>
        <div class="content">
          <img-list :list="recommendList" title="推荐歌单"
            @itemClick="onItemClick"></img-list>
          <img-list title="最新音乐"></img-list>
          <list :list="newSongList" @selectItem="onNewSongSelect" @option="showOption"
          ></list>
        </div>
      </div>
    </scroll>
    <bottom-option :song="songInfo" v-if="songInfo && optionShow" @close="closeOption"></bottom-option>
  </div>
</template>

<script>
import ImgList from '@/components/img-list/img-list'
import List from 'components/list/list'
import Scroll from 'components/scroll/scroll'
import BottomOption from 'components/bottom-option/bottom-option'
import {listOption} from 'assets/js/mixin'
import {getBanner} from '@/assets/js/recommend'
import {getPersonalizedList, getNewMusicList} from '@/assets/js/recommend'
import { getTopSong } from 'assets/js/top-song'
import { mapActions, mapMutations } from 'vuex'

export default {
  mixins: [listOption],
  components: {
    ImgList, List, Scroll, BottomOption
  },
  data() {
    return {
      banners: [],
      recommendList: [],
      newSongList: [],
      // displayedSongs: 
    }
  },
  created() {
    this._getBanner();
    getPersonalizedList().then(res => {
      this.recommendList = res;
    });
    getNewMusicList() // 最新音乐列表
    getTopSong().then(res => { // 获取新歌速递
      this.newSongList = this.normalizeSongs(res);
    })
    // getRecommend().then(res => { // 获取推荐列表，需要登录
    //   console.log(res)
    // })
  },
  methods: {
    ...mapActions(['playSong']),
    ...mapMutations(['setPlayList']),
    onItemClick(item) {
      this.$router.push('/index/songlist/' + item.id);
    },
    onNewSongSelect(item, index) {
      this.setPlayList(this.newSongList);
      this.playSong({item, index})
    },
    _getBanner() {
      getBanner().then(res => {
        if (res.code === 200) {
          this.banners = res.banners;
        }
      })
    },
    normalizeSongs(songs) {
      let list = [];
      songs.forEach(item => {
        list.push({
          name: item.name,
          singer: {name: item.artists[0].name, id: item.artists[0].id},
          al: {
            id: item.album.id,
            name: item.album.name,
            picUrl: item.album.picUrl
          },
          picUrl: item.album.picUrl,
          id: item.id
        });
      });
      return list;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

  $iconSize: 50px;
  .recommend {
    height: 100%;
  }
  .list {
    width: 100%;
    height: 100%;
  }
  .carousel-wrapper {
    width: 100%;
    height: auto;
    margin-top: 10px;
    z-index: 0;
    .item {
      height: fit-content;
    }
    .banner-img {
      width: 100%;
      height: auto;
    }
  }
  div {
    height: auto;
  }
  .sub-menu {
    flex: 0 0 80px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    width: 100%;
    margin-top: 15px;
    .item-wrapper {
      height: 100%;
      text-align: center;
      font-size: 12px;
      padding-top: 5px;
      p{
        padding-top: 5px;
      }
      .item {
        display: inline-block;
        width: $iconSize;
        height: $iconSize;
        border-radius: 50%;
        font-size: 20px;
        line-height: $iconSize;
        background: rgba(255, 0, 0, .8);
        text-align: center;
        color: white;
      }
    }
  }
  .content {
    width: 100%;
  }
  .new-song-list {
    width: 100%;
  }
</style>

