import _ from 'lodash'
export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    document.title = 'Веванта: ' + to.name

    if (store.state.auth.token) {
      if (to.path === '/auth' || to.path === '/register') {
        next('/')
      } else {
        if (_.isEmpty(store.state.auth.user)) {
          store.dispatch('auth/CATALOG')
        }
        next()
      }
    } else if (to.path === '/auth' || to.path === '/register') {
      next()
    } else {
      next('/auth')
    }
  })
}
