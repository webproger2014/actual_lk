
export function GET_NICKNAME (state, getters, rootState) {
  let phone = ''
  if (!rootState.auth.user.name && rootState.auth.user.login) {
    phone = rootState.auth.user.login.toString()
      .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '7 ($1) $2-$3-$4')
  }
  return rootState.auth.user.name || phone
}

export function GET_AVATAR (state, getters, rootState) {
  return rootState.auth.user.photo ? rootState.constant.CDN_DOMAIN + rootState.auth.user.photo : '/statics/avatar.jpg'
}

export function CONTRACT (state) {
  return state.contract
}

export function STAGES (state) {
  return state.stages
}

export function GRAPHPAYMENT (state) {
  return state.graphpayment
}

export function SERVICES (state) {
  return state.services
}

export function OFFERS (state) {
  return state.offers
}
