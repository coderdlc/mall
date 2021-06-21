<template>
  <div class="goods-item" @click="itemClick">
    <img :src="GoodsImg" alt="" @load="imgLoad" />
    <p>{{ goodsItem.title }}</p>
    <div class="goods-text">
      <span class="goods-price">{{ goodsItem.price }}</span>
      <span
        ><button>
          <img src="~assets/img/common/collect.svg" alt="" /></button
      ></span>
      <span>{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      defualt() {
        return {};
      },
    },
  },
  computed: {
    GoodsImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    //当加载完一张图片是发射该事件到事件总线
    imgLoad() {
      // this.$bus.$emit("homeImgLoad");
      if (!this.$route.path.indexOf("/home")) {
        this.$bus.$emit("homeImgLoad");
        // console.log("home");
      }
      if (!this.$route.path.indexOf("/detail")) {
        this.$bus.$emit("detailImgLoad");
      }
    },

    //跳转详情页
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  display: inline-block;
  width: 48%;
  margin: 3px;
}
.goods-item img {
  width: 100%;
  height: 85%;
  border-radius: 10px;
}

.goods-item p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 6px;
}
.goods-text {
  text-align: center;
}
.goods-text span {
  margin: 0 3px 0 3px;
}
.goods-price {
  color: var(--color-high-text);
}
.goods-text button {
  background-color: white;
  border: none;
}
.goods-text img {
  width: 14px;
  height: 14px;
}
</style>