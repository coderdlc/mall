<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <template v-slot:centre>
        <div>购物车({{ cartCount }})</div>
      </template>
    </nav-bar>
    <cart-list :cart-list="$store.state.cartList" />
    <bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar,
  },
  computed: {
    ...mapGetters(["cartCount"], ["cartList"]),
  },
};
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
