import _ from 'lodash'

export default async ({ Vue, store }) => {
  store.$_ = _
  Vue.prototype.$_ = _
}
