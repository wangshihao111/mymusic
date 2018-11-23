import {errorTips} from './util'

export function getTopList() {
  return fetch('/api/top/playlist').then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        return Promise.resolve(res.playlists);
      }
      else {
        errorTips('资源未找到')
      }
    });
}

export function getTopSong() {
  return fetch('/api/top/song').then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        return Promise.resolve(res.data);
      }
      else {
        errorTips('资源未找到')
      }
    });
}
