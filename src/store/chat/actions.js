import { scroll, Screen } from 'quasar'

const { getScrollHeight, setScrollPosition } = scroll

export function GET_ROOMS (context) {
  const ROOMS = this.$axios.post('chat/get_rooms/' + context.rootState.user.activeContract.id)

  ROOMS
    .then(rs => {
      context.commit('SET_ROOMS', rs.data)
    })
}

export function GET_MESSAGES (context) {
  let GET_MESSAGES = new Promise((resolve, reject) => {
    if (this.$_.isEmpty(context.state.activeChat)) {
      context.commit('SET_MESSAGES', [])
      return setTimeout(() => {
        reject()
      }, 1)
    }

    const MESSAGES = this.$axios.post('chat/get_messages/' + context.state.activeChat.id, {
      message_id: 0
    })

    MESSAGES
      .then(rs => {
        context.commit('SET_MESSAGES', rs.data)
        resolve(rs.data)
      })
  })

  return GET_MESSAGES
}

export function ADD_NEW_MESSAGE (context, message) {
  const NEW_MESSAGE = this.$axios.post('chat/add_message', {
    message: message,
    chat_room_id: context.state.activeChat.id
  })

  return NEW_MESSAGE
}

export function PROXY_MESSAGES (context) {
  const CancelToken = this.$axios.CancelToken

  let msgId = 0

  if (!this.$_.isEmpty(context.state.messages)) {
    msgId = context.state.messages[context.state.messages.length - 1].id
  }

  const MESSAGES = this.$axios.post('chat/get_new_message_long_pol/' + context.state.activeChat.id, {
    message_id: msgId
  }, {
    cancelToken: new CancelToken(function executor (c) {
      context.commit('PROXY_TOKEN', c)
    })
  })

  MESSAGES
    .then(rs => {
      context.commit('PROXY_MESSAGES', rs.data)
    })
    .catch(rs => {})

  return MESSAGES
}

/// //

export function SCROLL_BOTTOM (context) {
  document.body.style.top = '-' + (getScrollHeight(window) - Screen.height) + 'px'
  setScrollPosition(window, getScrollHeight(window), 2)
}
