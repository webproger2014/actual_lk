import { Cookies } from 'quasar'
export function USER (state, user) {
  state.user = user
}

export function LOGIN (state, token) {
  state.token = token

  Cookies.set('token', token, {
    'path': '/'
  })
  this.$router.push('/')
}

export function LOGOUT (state, data, mapGetters, s) {
  Cookies.remove('token', {
    'path': '/'
  //  'domain': '*'
  })
  location.href = '/auth'
}
