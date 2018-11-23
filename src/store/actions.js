import { getSongInfo } from 'assets/js/util'

// 核心播放逻辑
export function playNext({commit, state}) {
  if (state.playList.length === 0) {
    return;
  }
  if (state.playList.length === 0) {
    return;
  }
  const index = state.playIndex;
  if (state.mode === 'sequence' || state.mode === 'loop') {
    const nextIndex = index === state.playList.length -1 ? 0 : index + 1;
    playSong({commit}, {item: state.playList[nextIndex], index: nextIndex})
  }
  else if (state.mode === 'random') {
    const length = state.playList.length;
    let nextIndex =  Math.floor(Math.random() * length);
    if (nextIndex === index) {
      //如果生成的nextIndex为0 就播放下一首
      if (nextIndex === 0) {
        playSong({commit}, {item: state.playList[nextIndex], index: 1})
        commit('setPlayingSong', state.playList[nextIndex + 1]);
      } else if (nextIndex === length -1 ) {
        playSong({commit}, {item: state.playList[nextIndex], index: 0})
      }
    } else {
      playSong({commit}, {item: state.playList[nextIndex], index: nextIndex})
    }
  }
}

export function playPrev({commit, state}) {
  if (state.playList.length === 0) {
    return;
  }
  if (state.playList.length === 0) {
    return;
  }
  const index = state.playIndex;
  const length = state.playList.length;
  if (state.mode === 'sequence'  || state.mode === 'loop') {
    const nextIndex = index === 0 ? length - 1 : index - 1;
    playSong({commit}, {item: state.playList[nextIndex], index: nextIndex})
  }
  else if (state.mode === 'random') {
    let nextIndex =  Math.floor(Math.random() * length);
    if (nextIndex === index) {
      //如果生成的nextIndex为0 就播放下一首
      if (nextIndex === 0) {
        playSong({commit}, {item: state.playList[nextIndex], index: 1})
      } else if (nextIndex === length -1 ) {
        playSong({commit}, {item: state.playList[nextIndex], index: 0})
      }
    } else {
      playSong({commit}, {item: state.playList[nextIndex], index: nextIndex})
    }
  }
}

export function playSong({commit}, {item, index}) {
  let id = item.id;
  let song;
  getSongInfo(id).then(res => {
    song = res;
    commit('setPlayingSong', song[0]);
    commit('setPlayIndex', index);
    commit('setPlayState', 'playing');
  });
}

export function deleteOne({commit, state}, {item}) {
  let playList = state.playList.slice(0),
      playIndex = state.playIndex;
  const index = playList.findIndex(song => song.id === item.id);
  if (index > playIndex) {
    playList.splice(index, 1);
    commit('setPlayList', playList);
  } else if (index === playIndex) {
    playList.splice(index, 1);
    playIndex -= 1;
    commit('setPlayList', playList);
    commit('setPlayIndex', playIndex)
    playNext({commit, state});
  } else {
    playList.splice(index, 1);
    playIndex -= 1;
    commit('setPlayList', playList);
    commit('setPlayIndex', playIndex)
  }
}