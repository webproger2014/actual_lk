import { Notify } from 'quasar'

export default ({ Vue, store }) => {
  const MSG_WARNING = (msg = '', ps = 'bottom') => {
    Notify.create({
      textColor: 'white',
      position: ps,
      color: 'amber-8',
      icon: 'error',
      timeout: 2000,
      message: msg,
      actions: [
        {
          color: 'white',
          icon: 'close'
        }
      ]
    })
  }

  const MSG_ERROR = (msg = '', ps = 'bottom') => {
    Notify.create({
      textColor: 'white',
      position: ps,
      color: 'red-6',
      icon: 'error',
      timeout: 2000,
      message: msg,
      actions: [
        {
          color: 'white',
          icon: 'close'
        }
      ]
    })
  }

  const MSG_SUCCESS = (msg = '', ps = 'bottom') => {
    Notify.create({
      textColor: 'white',
      position: ps,
      color: 'green-7',
      icon: 'error',
      timeout: 2000,
      message: msg,
      actions: [
        {
          color: 'white',
          icon: 'close'
        }
      ]
    })
  }

  store.$MSG_WARNING = MSG_WARNING
  store.$MSG_ERROR = MSG_ERROR
  store.$MSG_SUCCESS = MSG_SUCCESS

  Vue.prototype.$MSG_WARNING = MSG_WARNING
  Vue.prototype.$MSG_ERROR = MSG_ERROR
  Vue.prototype.$MSG_SUCCESS = MSG_SUCCESS
}
