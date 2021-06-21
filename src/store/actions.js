export default {
  addCart(context, payload) {
    // find数组函数，遍历查找该数组的所有的元素是否含有符合的值
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = tiem
    //   }
    // }
    if (oldProduct) {
      context.commit('addCount', oldProduct)
    } else {
      payload.count = 1
      context.commit('addToCart', payload)
    }

  }
}