import { store } from './storage'

export default {
  getUserRecord(uid) { // 获取用户歌单，收藏等
    const url = `/api/user/record?uid=${uid}&&type=0`;
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => Promise.resolve(res));
  },
  getFavArtists() {
    return fetch('/api/artist/sublist', {
      method: 'post',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => Promise.resolve(res));
  },
  getPlayList(id) { // 获取用户歌单
    return fetch('/api/user/playlist?uid=' + id, {
      method: 'post',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => Promise.resolve(res));
  },
  addFavSong(songId) {
    const userData = store.get('userData');
    if (!userData) {
      return Promise.reject({
        loginState: false,
        msg: '请登陆后进行操作'
      })
    } else {
      const url = `/api/playlist/tracks?op=add&pid=${412408080}&tracks=${songId}`
      return fetch(url, {
        method: 'post',
        credentials: 'include'
      })
        .then(res => res.json())
        .then(res => Promise.resolve(res));
    }
  },
  deleteFavSong(songId) {
    const userData = store.get('userData');
    if (!userData) {
      return Promise.reject({
        loginState: false,
        msg: '请登陆后进行操作'
      })
    } else {
      const url = `/api/playlist/tracks?op=del&pid=${412408080}&tracks=${songId}`
      return fetch(url, {
        method: 'post',
        credentials: 'include'
      })
        .then(res => res.json())
        .then(res => Promise.resolve(res));
    }
  }
}