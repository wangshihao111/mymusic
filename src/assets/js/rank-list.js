import {errorTips} from './util'

export function getRankList() {
  return fetch('/api/toplist/detail').then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        return Promise.resolve(res);
      }
      else {
        errorTips('资源未找到')
      }
    });
}