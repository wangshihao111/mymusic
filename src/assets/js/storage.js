const HISTORY = '__HISTORY__';
const USER = '__USER__'


export const store = {
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

export function setUserInfo(obj) {
  if (existUserInfo(obj)) {
    return;
  }
  store.set(USER, obj)
}

export function getUserInfo() {
  return store.get(USER);
}

function existUserInfo(obj) {
  var old = store.get(USER);
  if (JSON.stringify(old) === JSON.stringify(obj)) {
    return true;
  } else return false;
}