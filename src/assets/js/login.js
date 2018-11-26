import {
  store
} from './storage'

export default {
  login(obj) {
    return fetch(`/api/login/cellphone?phone=${obj.user}&password=${obj.pass}`, {
        method: 'post',
        credentials: 'include' // 是否携带cookie
      })
        .then(res => res.json())
        .then(res => {
          return Promise.resolve(res)
        })
  },
  logout() {
    let loginState = store.get('loginState');
    if (!loginState) {
      return;
    }
    const url = '/api/logout'
    return fetch(url).then(res => res.json())
      .then(res => Promise.resolve(res));
  },
  checkState() {
    const url = '/api/login/status';
    return fetch(url, {
        method: 'post',
        credentials: 'include'
      }).then(res => res.json())
      .then(res => Promise.resolve(res));
  }
}