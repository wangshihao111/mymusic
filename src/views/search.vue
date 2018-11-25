<template>
  <transition name="page">
    <div class="search">
      <search-box @back="goBack"
        @change="onQueryChange"
        @blur="showSuggest=false"
        class="search-box"
      ></search-box>
      <transition name="suggest">
        <suggest
          :query="query"
          class="suggest"
          v-show="(query !='') && showSuggest"
          @contentSelect="gotoSearch"
          @itemSelect="gotoSearchItem"
        ></suggest>
      </transition>
      <router-link class="search-singer" to="/index/search/singer" tag="div">
        <h1 class="titl">
          按歌手搜索
          <span><i class="icon el-icon-arrow-right"></i></span>
        </h1>
        <div class="img-wrapper">
          <img src="http://p3.music.126.net/ZAP_c5J1QJEvFrR9Lq-adw==/109951163186202231.jpg" class="img">
          <img src="http://p3.music.126.net/_cB2figc8IpT89DYhpARxA==/3389794350704969.jpg" class="img">
          <img src="http://p3.music.126.net/6zwL-LFHpoTa7OkVZeZ9tw==/109951163105978090.jpg" class="img">
        </div>
      </router-link>
      <section class="hot-search">
        <h1 class="titl">热门搜索</h1>
        <ul class="list">
          <li class="item"
            v-for="(item, index) in hotSearch" :key="index"
            @click="gotoSearchItem(item)"
          >{{item.first}}</li>
        </ul>
      </section>
      <section class="history">
        <h1 class="titl">搜索历史
          <span class="delete" @click="dialogVisible = true"><i class="el-icon-delete"></i></span>
        </h1>
        <ul class="list">
          <li class="item"
            v-for="(item, index) in searchHistory" :key="index"
            @click="gotoSearch(item)"
          >{{item}}</li>
        </ul>
        <el-dialog
          title="提示"
          :modal="false"
          :visible.sync="dialogVisible"
          width="80%">
          <span>确定删除所有历史？</span>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="deleteAllHis">确 定</el-button>
          </span>
        </el-dialog>
      </section>
      <router-view></router-view>
      <search-detail :query="searchText" v-if="searchDetailVisible"></search-detail>
    </div>
  </transition>
</template>

<script>
import SearchBox from 'components/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import SearchDetail from './search-detail'
import {getSearchHot} from 'assets/js/search'
import { addHistory, deleteAllHistory, getHistory } from 'assets/js/storage'

export default {
  components: {
    SearchBox, Suggest, SearchDetail
  },
  data() {
    return {
      query: '',
      showSuggest: false,
      hotSearch: [], // 热词
      searchHistory: getHistory() || [],
      dialogVisible: false,
      searchDetailVisible: false,
      searchText: '' // 建议框中选择的搜索关键字
    }
  },
  methods: {
    goBack() {
      if (this.searchDetailVisible) {
        this.searchDetailVisible = false;
      } else {
        this.$router.back();
      }
    },
    onQueryChange(query) {
      this.query = query;
      this.showSuggest = true;
    },
    gotoSearch(item) {
      if (item) {
        this.searchText = item;
        this.searchDetailVisible = true;
        addHistory(item);
        this.searchHistory = getHistory();
        return;
      }
      if (this.query != '') {
        this.searchDetailVisible = true;
        this.searchText = this.query;
        addHistory(this.query);
        this.searchHistory = getHistory()
      }
    },
    gotoSearchItem(item) {
      if (item.name) {
        this.searchText = item.name;
        this.searchDetailVisible = true;
        addHistory(item.name)
        this.searchHistory = getHistory()
      } else if (item.first) {
        this.searchText = item.first;
        this.searchDetailVisible = true;
        addHistory(item.first)
        this.searchHistory = getHistory()
      }
    },
    deleteAllHis() {
      this.dialogVisible = false;
      deleteAllHistory();
      this.searchHistory = getHistory();
    }
  },
  mounted() {
    getSearchHot().then(res => {
      this.hotSearch = res;
    });
  },
  activated() {
    this.query = '';
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.search {
  position: fixed;
  top: 0;
  bottom: $playerHeight;
  left: 0;
  right: 0;
  padding-top: $searchHeight;
  overflow: hidden;
  background-color: #fff;
  .search-box {
    position: fixed;
    top: 0;
    z-index: 2;
  }
  .suggest {
    position: fixed;
    top: $searchHeight;
    width: 90%;
    margin: 10px 5%;
    z-index: 80;
  }
  .search-singer {
    position: relative;
    height: $searchHeight;
    width: 100%;
    @include border-1px(#ccc, bottom);
    .titl {
      font-size: 14px;
      line-height: $searchHeight;
      font-weight: 600;
      padding-left: 10px;
      .icon {
        padding-left: 5px;
        color: #ccc;
      }
    }
    .img-wrapper {
      position: absolute;
      right: 10px;
      top: 5px;
      width: 60px;
      img {
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        &:first-of-type {
          left: 0;
          z-index: 0;
        }
        &:nth-of-type(2) {
          left: 15px;
          z-index: 1;
        }
        &:nth-of-type(3) {
          left: 30px;
          z-index: 2;
        }
      }
    }
  }
  .hot-search, .history {
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px 0 10px;
    .titl{
      font-size: 14px;
      line-height: $searchHeight;
      font-weight: 600;
    }
    .list {
      .item {
        display: inline-block;
        padding: 0 10px 0 10px;
        margin: 4px;
        font-size: 12px;
        background: #eee;
        border-radius: 20px;
        text-align: center;
        line-height: 30px;
        color: #000;
      }
    }
  }
  .history {
    margin-top: 20px;
    .titl {
      position: relative;
      .delete {
        position: absolute;
        right: 10px;
        width: 30px;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
        color: #ccc;
        text-align: center;
      }
    }
  }
}
</style>