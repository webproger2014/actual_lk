import axios from 'axios'

export function GET_USER (context, id = null) {
  return this.$axios.post('users/get_user', {
    'user_id': id || context.rootState.auth.user.id
  })
}

export function UPDATE_DATA_PROFILE (context, data) {
  data['id'] = context.rootState.auth.user.id || data['id']

  const UPDATE = this.$axios.post('users/save_user', data)

  UPDATE
    .then(rs => {
      this.commit('user/UPDATE_DATA_PROFILE', data)
      this.$MSG_SUCCESS(rs.data.msg)
    })
    .catch(rs => {
      this.$MSG_ERROR('Ошибка')
    })

  return UPDATE
}

export function GET_CITY_BY_ID (context, id = false) {
  let city = this.$axios.get(`city/get/${id || context.rootState.auth.user.city_id}`)

  city.then(rs => {
    if (!this.$_.isEmpty(rs.data)) {
      context.commit('SET_CITY', rs.data)
    }
  })
  return city
}

export function UPDATE_AVATAR (context) {
  const user = this.dispatch('user/GET_USER')

  user.then(rs => {
    this.commit('user/UPDATE_AVATAR', rs.data.photo)
    this.$MSG_SUCCESS('Ваша фотография обновлена')
  })
    .catch(rs => {
      this.$MSG_ERROR('Ошибка загрузки')
    })
}

export function UPDATE_TEAM (context) {
  const TEAM = context.dispatch('GET_CONTRACT_TEAM')

  TEAM
    .then(rs => {
      context.commit('UPDATE_TEAM', rs.data)
    })
}

export function UPDATE_ACTIVE_CONTRACT (context, index = 0) {
  if (context.state.contract.length) {
    context.commit('UPDATE_ACTIVE_CONTRACT', index)
  }
}

export function GET_CONTRACT_TEAM (context) {
  return this.$axios.post('contract/get_staff_by_id/' + context.state.activeContract.id)
}

export function GET_CONTRACT (context) {
  if (!context.state.contract.length) {
    this.$axios.post('contract/contracts_by_user', {
      id: context.rootState.auth.user.id
    }).then(rs => {
      if (this.$_.isEmpty(rs.data)) {
        context.dispatch('GET_CONTRACT_BY_ID')
      } else {
        context.commit('GET_CONTRACT', rs.data)
        context.dispatch('UPDATE_ACTIVE_CONTRACT')
      }
    })
  }
}

export function GET_CONTRACT_BY_ID (context, idUser = 83) {
  this.$axios.post('contract/contracts_by_user', {
    id: idUser
  }).then(rs => {
    // console.log(rs.data)
    context.commit('GET_CONTRACT', rs.data)
    context.dispatch('UPDATE_ACTIVE_CONTRACT')
  })
}

export function GET_DOC_CONTRACT (context) {
  if (!this.$_.isEmpty(context.state.activeContract)) {
    this.$axios.post('contract/get_contract_docs/' + context.state.activeContract.id, {
      confirmed: 1
    })
      .then(rs => {
        context.commit('UPDATE_CONTRACT_DOCS', rs.data)
      })
  } else {
    context.commit('UPDATE_CONTRACT_DOCS', [])
  }
}

export function GET_STAGES (context) {
  if (!this.$_.isEmpty(context.state.activeContract)) {
    this.$axios.post('stage/list/' + context.state.activeContract.id)
      .then(rs => {
        context.commit('UPDATE_STAGES', rs.data)
      })
  } else {
    context.commit('UPDATE_STAGES', [])
  }
}

export function GET_GRAPHPAYMENT (context) {
  if (!this.$_.isEmpty(context.state.activeContract)) {
    this.$axios.post('payment/list/' + context.state.activeContract.id)
      .then(rs => {
        context.commit('UPDATE_GRAPHPAYMENT', rs.data)
        context.commit('GRAPHPAYMENT_LOADING')
      })
      .catch(rs => {
        context.commit('GRAPHPAYMENT_LOADING')
      })
  }
}

/// ///////////////////

const axiosCRM = axios.create({
  baseURL: 'https://cdn.vevanta.com/',
  transformResponse (rs) {
    rs = JSON.parse(rs)
    return rs
  }
})

export function GET_SERVICES (context) {
  if (!context.state.services.length) {
    axiosCRM.get('services.php')
      .then(rs => {
        context.commit('GET_SERVICES', rs.data)
      })
  }
}

export function GET_OFFERS (context) {
  if (!context.state.offers.length) {
    axiosCRM.get('offers.php')
      .then(rs => {
        context.commit('GET_OFFERS', rs.data)
      })
  }
}
