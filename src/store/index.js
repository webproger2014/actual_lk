import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import constant from './constant'
import auth from './auth'
import user from './user'
import chat from './chat'
import events from './events'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      // then we reference it
      constant,
      user,
      auth,
      chat,
      events
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./constant'], () => {
      const newConstant = require('./constant').default
      Store.hotUpdate({ modules: { constant: newConstant } })
    })

    module.hot.accept(['./user'], () => {
      const newUser = require('./user').default
      Store.hotUpdate({ modules: { user: newUser } })
    })

    module.hot.accept(['./auth'], () => {
      const newAuth = require('./auth').default
      Store.hotUpdate({ modules: { auth: newAuth } })
    })

    module.hot.accept(['./chat'], () => {
      const newChat = require('./chat').default
      Store.hotUpdate({ modules: { chat: newChat } })
    })

    module.hot.accept(['./events'], () => {
      const newEvents = require('./events').default
      Store.hotUpdate({ modules: { events: newEvents } })
    })
  }

  return Store
}
