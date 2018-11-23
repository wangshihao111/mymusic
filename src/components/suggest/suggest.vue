<template>
  <div class="suggest">
    <h1 class="titl" @click="contentSelect">搜索"{{query}}"</h1>
    <ul class="suggest-list">
      <li class="item" v-for="(item, index) in al" :key="index" @click="itemSelect(item)">
        <span class="icon"><i class="el-icon-search"></i></span>
        <span>{{item.name}}</span>
      </li>
      <li class="item" v-for="(item) in ar" :key="item.first" @click="itemSelect(item)">
        <span class="icon"><i class="el-icon-search"></i></span>
        <span>{{item.name}}</span>
      </li>
      <li class="item" v-show="!al.length && !ar.length">{{errMsg}}</li>
    </ul>
  </div>
</template>

<script>
import {getSuggest} from 'assets/js/search'

export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      al: [],
      ar: [],
      errMsg: ''
    }
  },
  methods: {
    contentSelect() {
      this.$emit('contentSelect');
    },
    itemSelect(item) {
      this.$emit('itemSelect', item);
    }
  },
  watch: {
    query(newVal) {
      newVal !== '' && getSuggest(newVal).then(res => {
        this.al = res.albums;
        this.ar = res.artists;
      }, err => this.errMsg = err);
    }
  }
}
</script>

<style lang="scss" scoped>
  .suggest {
    box-sizing: border-box;
    width: 100%;
    background: #eee;
    padding-left: 10px;
    box-shadow: 1px 1px 6px 3px #ccc;
    h1 {
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      color: cornflowerblue;
      border-bottom: 1px solid #ccc;
    }
    .suggest-list {
      box-sizing: border-box;
      width: 100%;
      border-bottom: 1px solid #ccc;
      .item {
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        color: #777;
        .icon {
          text-align: center;
          margin-right: 10px;
        }
      }
    }
  }
</style>
