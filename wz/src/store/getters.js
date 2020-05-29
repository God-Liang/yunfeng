const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  cartsInfo: state => state.user.cartsInfo,
  status: state => state.user.status
}

export default getters
