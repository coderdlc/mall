<template>
  <div class="cart-list">
    <scroll ref="scroll" class="cat-scroll">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  activated() {
    this.$refs.scroll.refresh();
    console.log("---");
  },
};
</script>

<style scoped>
.cart-list {
  height: 100%;
}
.cat-scroll {
  height: calc(100% - 44px - 49px);
}
</style>
