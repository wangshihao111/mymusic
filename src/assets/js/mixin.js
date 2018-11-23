export const listOption = {
  data() {
    return {
      songInfo: null,
      optionShow: false
    }
  },
  methods: {
    showOption(song) {
      this.songInfo = song;
      this.optionShow = true;
    },
    closeOption() {
      this.optionShow = false;
    }
  }
}