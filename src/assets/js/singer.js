export default {
  getTopSinger(offset) {
    if (!offset) {
      offset = 0;
    }
    return fetch(`/api/top/artists/?offset=${offset}&limit=20`)
      .then(res => res.json())
      .then(res => {
        if (res.code === 200) {
          return Promise.resolve(res)
        } else {
          return Promise.reject('获取内容失败')
        }
      });
  },
  getCatSinger(id) {
    return fetch(`/api/artist/list?cat=${id}&limit=100`)
      .then(res => res.json())
      .then(res => {
        if (res.code === 200) {
          return Promise.resolve(res)
        } else {
          return Promise.reject('获取内容失败')
        }
      });
  },
  getSingerSongs(id) { // 获取歌手歌曲
    return fetch(`/api/artists?id=${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.code === 200) {
          return Promise.resolve(res)
        } else {
          return Promise.reject('获取内容失败')
        }
      });
  }
}