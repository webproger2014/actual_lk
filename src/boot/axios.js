import axios from 'axios'

export default async ({ Vue, router, store }) => {
  let axiosCRM = axios.create({
    baseURL: 'https://api.vevanta.ru/'
  })

  axiosCRM.CancelToken = axios.CancelToken
  axiosCRM.isCancel = axios.isCancel

  if (store.state.auth.token) {
    axiosCRM.defaults.headers.common['token'] = store.state.auth.token
  }

  axiosCRM.interceptors.response.use(rs => rs, e => {
    if (!e.response) {
      return Promise.reject(e)
    }

    let rs = e.response

    switch (rs.status) {
      case 401:
        store.dispatch('auth/LOGOUT')
        break
    }

    return Promise.reject(rs)
  })

  store.$axios = axiosCRM
  Vue.prototype.$axios = axiosCRM
}
