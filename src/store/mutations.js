export default {
  setLoginState(state, val) {
    state.loginState = val;
  },
  setUserInfo(state, val) {
    state.userInfo = val;
  },
  // setSongListInfo(state, val) {
  //   state.songListInfo = val
  // },
  setMode(state, val) {
    state.mode = val
  },
  setPlayList(state, val) {
    state.playList = val;
  },
  setPlayState(state, val) {
    state.playState = val;
  },
  setPlayingSong(state, val) {
    state.playingSong = val;
  },
  setProgress(state, val) {
    state.progress = val;
  },
  setPlayIndex(state, val) {
    state.playIndex = val;
  },
  setBigPlayer(state, val) {
    state.bigPlayer = val;
  },
  setFavSongs(state, val) {
    state.favSongs = val;
  },
  setFavChange(state) {
    state.favChange = !state.favChange;
  },
  setFavSingers(state, val) {
    state.favSingers = val;
  }
}