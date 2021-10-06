export function SET_MESSAGES (state, data = []) {
  state.messages = data.reverse()
}

export function ADD_MSG_HISTORY (state, messages) {
  messages.forEach((msg) => {
    state.messages.unshift(msg)
  })
}

export function SET_ROOMS (state, data) {
  state.rooms = data
  if (!this.$_.isEmpty(data)) {
    state.activeChat = data[0]
  } else {
    state.activeChat = []
  }
}

export function PROXY_TOKEN (state, token) {
  state.proxyToken = token
}

export function ADD_MSG (state, msg) {
  state.messages.push(msg)
}

export function SET_CHAT_ROOMS (state, data) {
  state.idChat = data[0].id
}

export function SET_USERS (state, users = []) {
  state.users = users
}
