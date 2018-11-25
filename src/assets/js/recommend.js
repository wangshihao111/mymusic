import axios from 'axios'
import { errorTips } from './util'

export function getBanner() {
  return axios.get('/api/banner').then(res => Promise.resolve(res.data))
}

// 获取个性推荐列表
export function getPersonalizedList() {
  return axios.get('/api/personalized').then(res => {
    if (res.data.code === 200) {
      return Promise.resolve(res.data.result);
    } else {
      errorTips('加载失败，请刷新网页')
    }
  });
}

//尚未完成
export function getNewMusicList() {
  return axios.get('/api/personalized/newsong').then(res => {
    // console.log(res);
    if (res.data.code === 200) {
      return Promise.resolve(res.data.result);
    }
  });
}

// 获取推荐列表
export function getRecommend() {
  return fetch('/api/recommend/resource')
    .then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        return Promise.resolve(res.recommend)
      }
    });
}

// 获取歌曲列表
export function getSongList(id) {
  return axios.get(`/api/playlist/detail?id=${id}`).then(res => {
    if (res.data.code === 200) {
      return Promise.resolve(res.data.playlist);
    } else {
      errorTips('加载失败，请刷新网页')
    }
  });
}

// 获取专辑详情
export function getAlbumDetail(id) {
  return fetch('api/album?id=' + id)
    .then(res => res.json())
    .then(res => Promise.resolve(res));
}