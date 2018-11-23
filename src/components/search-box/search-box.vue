<template>
  <transition name="search">
    <div class="search-box" click.stop>
      <span class="back-btn" @click="back">
        <i class="el-icon-arrow-left"></i>
      </span>
      <div class="input-wrapper">
        <input class="input"
          v-model="query"
          type="text"
          placeholder="搜索歌曲、歌手"
        />
      </div>
      <span class="clear-btn" v-show="query !== ''" @click="clear">
        <i class="el-icon-close"></i>
      </span>
    </div>
  </transition>
</template>

<script>
import { debounce } from 'assets/js/util'

export default {
  components: {
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    clear() {
      this.query = '';
    },
    back() {
      this.$emit('back');
    }
  },
  mounted() {
    this.$watch('query', debounce((newVal) => {
      this.$emit('change', newVal);
    }, 200));
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/style/global.scss';

.search-box {
  position: relative;
  width: 100%;
  height: $searchHeight;
  overflow: hidden;
  .back-btn, .clear-btn {
    display: block;
    position: absolute;
    top: 0;
    width: $searchHeight;
    font-size: 20px;
    line-height: $searchHeight;
    text-align: center;
    z-index: 2;
  }
  .back-btn {
    left: 0;
  }
  .clear-btn {
    right: 0;
  }
  .input-wrapper {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0 $searchHeight 0 $searchHeight;
    @include border-1px(#bbb, bottom);
    .input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
    }
  }
}
</style>