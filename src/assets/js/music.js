
export function getLyric(id) {
  return fetch(`/api/lyric?id=${id}`)
    .then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        return Promise.resolve(res.lrc);
      }
    });
}