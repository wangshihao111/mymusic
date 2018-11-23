export function errorTips(err) {
  alert(err || '加载失败')
}

export function getSongInfo(id) {
  return fetch(`/api/song/url?id=${id}`).then(res => res.json())
    .then(res => Promise.resolve(res.data))
}

export function formatTime(time) {
  const m = Math.floor(time / 60)
  let s = Math.floor(time % 60)
  if (s < 10) {
    s = '0' + s;
  }
  return m + ':' + s;
}

export function debounce(func, delay) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}

