<template>
  <div class="list-wrapper" v-cloak>
    <ul ref="listwrapper">
      <li class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="onItemClick(item, index)"
        :class="{active: playingSong.id === item.id}"
        ref="list"
      >
        <div class="order">
          {{index + 1}}
        </div>
        <div class="detail">
          <h2 class="titl">{{item.name}}</h2>
          <p class="singer">{{item.singer.name}} - {{item.al.name}}</p>
        </div>
        <div class="operate">
          <i class="fa fa-ellipsis-v" @click.stop="showOption(item, index)"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['playIndex', 'playingSong', 'playList', 'playIndex'])
  },
  methods: {
    ...mapActions(['playNext']),
    showOption(item, index) {
      this.$emit('option', {
        item,
        index,
        text: item.id === this.playingSong.id ? '播放下一首' : '播放这首歌曲'
      });
    },
    onItemClick(item, index) {
      this.$emit('selectItem', item, index)
    },
    itemScrollIntoView() {
      let list = this.$refs.listwrapper;
      let item = list.getElementsByClassName('active')[0];
      if (item) {
        item.scrollIntoView({behavior: "instant", block: "center", inline: "nearest"});
      }
    }
  },
  mounted() {
    this.itemScrollIntoView();
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

$listHeight: 50px;
  .list-wrapper {
    width: 100%;
    background-color: #fff;
    ul {
      padding-left: 0;
      padding-top: 10px;
    }
    .item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      position: relative;
      width: 100%;
      height: $listHeight;
      list-style-type: none;
      @include border-1px(#ccc, bottom);
      &.active {
        background-color: #eee;
      }
      .order {
        flex: 0 0 40px;
        height: $listHeight;
        line-height: $listHeight;
        text-align: center;
      }
      .detail {
        flex: 1;
        height: $listHeight;
        .titl {
          font-size: 14px;
          line-height: 30px;
          font-weight: 400;
        }
        .singer {
          font-size: 10px;
          color: #666;
        }
      }
      .operate {
        flex: 0 0 35px;
        font-size: 14px;
        color: #ccc;
        text-align: center;
        line-height: $listHeight;
      }
    }
  }
</style>

