import {
  mapActions,
  mapMutations,
  mapGetters
} from 'vuex'

import _user from 'assets/js/user'

export const listOption = {
  data() {
    return {
      songInfo: null,
      optionShow: false
    }
  },
  methods: { 
    ...mapActions(['playSong']),
    ...mapMutations(['setPlayList']),
    showOption(song) {
      this.songInfo = song;
      this.optionShow = true;
    },
    closeOption() {
      this.optionShow = false;
    },
    onItemSelect(item, index) {
      this.setPlayList(this.normalSongs || this.songs || this.playHistory)
      this.playSong({
        item,
        index
      })
    },
  }
}

export const favSinger = {
  data() {
    return {
      showSuccess: false,
      showError: false,
      successText: '',
      errorText: ''
    }
  },
  computed: {
    ...mapGetters(['favSingers'])
  },
  methods: {
    ...mapMutations(['setFavChange']),
    favText(singer) {
      const index = this.favSingers.findIndex(item => item.id === singer.id);
      return index === -1 ? '+收藏' : '-收藏';
    },
    async onFavClick(singer) {
      const index = this.favSingers.findIndex(item => item.id === singer.id);
      if (index === -1) {
        let res = await _user.setFavSinger(singer.id, 1);
        if (res.code === 200) {
          this.successText = '收藏成功';
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
            this.setFavChange();
          }, 2000);
        } else {
          this.errorText = '收藏失败';
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 2000);
        }
      } else {
        let res = await _user.setFavSinger(singer.id, 0);
        if (res.code === 200) {
          this.successText = '取消收藏成功';
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
            this.setFavChange();
          }, 2000);
        } else {
          this.errorText = '取消收藏失败';
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 2000);
        }
      }
    },
  }
}