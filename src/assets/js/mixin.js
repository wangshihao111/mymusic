import {
  mapActions,
  mapMutations
} from 'vuex'

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