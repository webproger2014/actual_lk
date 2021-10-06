
export default async ({ Vue, store }) => {
  store.watch((state) => {
    return state.user.contract
  }, () => {
    store.dispatch('user/UPDATE_ACTIVE_CONTRACT')
  })

  store.watch((state) => {
    return state.user.activeContract
  }, () => {
    store.dispatch('user/UPDATE_TEAM')
    store.dispatch('chat/GET_ROOMS')
  })
}
