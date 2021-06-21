const getters = {
  cartList(state, payload) {

    return state.cartList
  },
  cartCount(state, getters) {
    return getters.cartList.length
  }
}

export default getters
