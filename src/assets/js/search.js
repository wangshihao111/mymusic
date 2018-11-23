export function getSuggest(query) { // 获取搜索建议
  return fetch('/api/search/suggest?keywords='+query)
    .then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        return Promise.resolve(res.result)
      }
      else {
        return Promise.reject('没有获取到任何内容')
      }
    })
}

export function getSearchHot() { // 获取热刺推荐
  return fetch('/api/search/hot')
    .then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        return Promise.resolve(res.result.hots)
      } else {
        return Promise.reject('获取失败')
      }
    })
}

export function getSearch(keyWord) { // 搜索内容
  return fetch('/api/search?keywords=' + keyWord)
    .then(res => res.json())
    .then(res  => {
      if (res.code === 200) {
        return Promise.resolve(res.result.songs)
      }
    });
}

export function getMultiMatchSearch(keyWord) { // 获取搜索多匹配 包含歌曲和歌手
  return fetch('/api/search/multimatch?keywords=' + keyWord)
    .then(res => res.json())
    .then(res  => {
      if (res.code === 200) {
        return Promise.resolve(res.result)
      }
    })
}