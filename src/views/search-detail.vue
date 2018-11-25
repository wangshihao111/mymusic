<template>
  <transition name="scale">
    <div class="search-detail">
      <div class="reco" v-if="multi && (multi.album || multi.artist)">
        <h1 class="titl">您可能喜欢</h1>
        <div class="al" v-if="multi.album" @click="onAlbumClick(multi.album[0])">
          <div class="img">
            <img v-lazy="multi.album[0].picUrl">
          </div>
          <div class="desc">
            <h1 class="name">专辑：{{multi.album[0].name}}</h1>
            <p class="singer">{{multi.album[0].artist.name}}</p>
          </div>
        </div>
        <div class="ar" v-if="multi.artist" @click="$router.push('/index/search/singer/singer-detail/'+multi.artist[0].id)">
          <div class="img">
            <img v-lazy="multi.artist[0].picUrl">
          </div>
          <div class="desc">
            歌手：{{multi.artist[0].name}}
          </div>
        </div>
      </div>
      <div class="list-wrappwer">
        <list :list="songList" @selectItem="onItemSelect"></list>
      </div>
    </div>
  </transition>
</template>

<script>
import List from 'components/list/list';
import { getSearch, getMultiMatchSearch } from 'assets/js/search';
import { mapActions, mapMutations } from 'vuex';

export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  components: {
    List
  },
  data() {
    return {
      multi: null,
      songList: []
    };
  },
  methods: {
    ...mapActions(['playSong']),
    ...mapMutations(['setPlayList']),
    getSearchResult(query) {
      getSearch(query).then(res => {
        this.songList = this._normalizeSongs(res);
      });
      getMultiMatchSearch(query).then(res => {
        this.multi = res;
      });
    },
    onItemSelect(item, index) {
      this.setPlayList(this.songList);
      this.playSong({ item, index });
    },
    onAlbumClick(album) {
      this.$router.push(`/index/search/songlist/${album.id}/album/${true}`);
    },
    _normalizeSongs(songs) {
      // 格式化歌曲信息
      let list = [];
      songs.forEach(item => {
        list.push({
          name: item.name,
          singer: { name: item.artists[0].name, id: item.artists[0].id },
          al: {
            id: item.album.id,
            name: item.album.name,
            picUrl: item.artists[0].img1v1Url
          },
          picUrl: item.album.picUrl,
          id: item.id
        });
      });
      return list;
    }
  },
  mounted() {
    this.getSearchResult(this.query);
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.search-detail {
  position: fixed;
  left: 0;
  right: 0;
  bottom: $playerHeight;
  top: $searchHeight;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: #fff;
  z-index: 10;
  .reco {
    width: 100%;
    box-sizing: border-box;
    padding-left: 10px;
    .titl {
      font-size: 12px;
      color: #ccc;
      line-height: 20px;
    }
    .al,
    .ar {
      display: flex;
      height: 50px;
      border-bottom: 1px solid #eee;
      .img {
        flex: 0 0 50px;
        height: 50px;
        width: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .desc {
        flex: 1;
        padding-left: 20px;
        .name {
          font-size: 14px;
          line-height: 30px;
        }
        .singer {
          font-size: 10px;
          color: #888;
          line-height: 20px;
        }
      }
    }
    .ar {
      margin-top: 3px;
      .desc {
        font-size: 15px;
        line-height: 50px;
      }
    }
  }
}
</style>
