export function UPDATE_DATA_PROFILE (state, payload) {
  this.state.auth.user.name = payload.name
  this.state.auth.user.lastname = payload.lastname
  this.state.auth.user.surname = payload.surname
  this.state.auth.user.phone = payload.phone
  this.state.auth.user.city_id = payload.city_id
  this.state.auth.user.mail = payload.mail
}

export function UPDATE_AVATAR (state, avatar) {
  this.state.auth.user.photo = avatar
}

export function GET_CONTRACT (state, payload) {
  if (!payload.length) {
    state.contractStatus = 0
  }
  state.contract = payload
}

export function UPDATE_ACTIVE_CONTRACT (state, payload = 0) {
  // RESET STATES
  state.stages = []
  state.graphpayment = []
  state.contractDocs = []

  state.activeContract = state.contract[payload]
  state.contractActiveIndex = payload
}

export function UPDATE_TEAM (state, payload) {
  state.team = payload
}

export function UPDATE_CONTRACT_DOCS (state, payload) {
  state.contractDocs = payload
}

export function UPDATE_STAGES (state, stages) {
  state.stages = stages.reverse()
}

export function UPDATE_GRAPHPAYMENT (state, payload) {
  state.graphpayment = payload
}

export function GET_SERVICES (state, payload) {
  state.services = payload
}

export function SETTINGS_SET_NOTIFYNEWMSG (state, payload) {
  state.settings.notifyNewMsg = payload
}

export function GRAPHPAYMENT_LOADING (state, status = false) {
  state.graphpaymentLoading = status
}

export function GET_OFFERS (state, payload) {
  state.offers = payload
}

export function SET_CITY (state, city) {
  state.city = city
}
