export function LOGIN (context, account) {
  const AUTH = this.$axios.post('auth', account)
  AUTH
    .then(rs => {
      this.$axios.defaults.headers.common['token'] = rs.data.token
      context.dispatch('CATALOG').then(() => {
        context.commit('LOGIN', rs.data.token)
      })
    })
    .catch(rs => {
      this.$MSG_ERROR(rs.data.msg)
    })

  return AUTH
}

export function REGISTER (context, account) {
  const REGISTRATION = this.$axios.post('auth/registration', account)

  REGISTRATION
    .then(rs => {
      this.$MSG_SUCCESS(rs.data.msg)
    }).catch(rs => {
      this.$MSG_ERROR(rs.data.msg)
    })

  return REGISTRATION
}

export function CATALOG (context) {
  let promise = new Promise((resolve, reject) => {
    if (this.$_.isEmpty(context.state.user)) {
      this.$axios.post('catalog')
        .then(rs => {
          // console.log(rs)
          context.commit('USER', rs.data.user)
          this.dispatch('user/GET_CONTRACT')
          resolve()
        })
    } else {
      reject()
    }
  })

  return promise
}

export function GET_CATALOG (context) {
  const CATALOG = this.$axios.post('catalog')
  return CATALOG
}

export function RESET_PASSWORD (context, data) {
  this.$axios.post('auth/recovery', data)
    .then(rs => {
      this.$MSG_SUCCESS(rs.data.msg)
    })
    .catch(rs => {
      this.$MSG_ERROR('Ошибка запроса! Нету аккаунта или email')
    })
}

export function REPASSWORD (context, data) {
  this.$axios.post('users/new_password', {
    password: data
  })
    .then(rs => {
      this.$MSG_SUCCESS('Пароль успешно обновлён')
      context.dispatch('LOGOUT')
    })
    .catch(rs => {
    })
}
export function LOGOUT (context) {
  context.commit('LOGOUT')
}
