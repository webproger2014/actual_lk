export default ({ store, Vue }) => {
  Vue.prototype.getPhoto = photo => {
    if (photo) {
      photo = store.state.constant.CDN_DOMAIN + photo
    } else {
      photo = '/statics/avatar.jpg'
    }
    return photo
  }
}
