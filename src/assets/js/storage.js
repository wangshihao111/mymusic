const HISTORY = '__HISTORY__';

const store = {
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  get(key) {
    let val = localStorage.getItem(key)
    if (val) {
      return JSON.parse(val);
    } else {
      return null;
    }
  }
}

export function addHistory(val) {
  let his = store.get(HISTORY);
  if (!his) {
    his = [];
  }
  let index = his.indexOf(val);
  if (index > -1) {
    his.splice(index, 1);
  }
  his.unshift(val);
  store.set(HISTORY, his);
}

export function deleteAllHistory() {
  store.set(HISTORY, []);
}

export function getHistory() {
  return store.get(HISTORY);
}