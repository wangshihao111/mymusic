export default {
  setLoginState(state, val) {
    state.isLogin = val;
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
  }
}