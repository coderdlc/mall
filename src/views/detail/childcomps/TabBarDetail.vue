<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div @click="imgClick">
          <img src="~assets/img/common/back.svg" alt="" class="left-img" />
        </div>
      </template>
      <template v-slot:centre>
        <div class="centre">
          <div
            v-for="(item, index) in titledata"
            :key="index"
            class="centre-item"
            :class="{ avtive: isTitle === index }"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "TabBarDetail",
  data() {
    return {
      titledata: ["商品", "参数", "评论", "推荐"],
      isTitle: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    imgClick() {
      this.$router.go(-1);
    },
    titleClick(index) {
      this.isTitle = index;
    },
  },
};
</script>

<style scoped>
.left-img {
  margin: 10px 15px 10px 15px;
}
.centre {
  display: flex;
  font-size: 14px;
}
.centre-item {
  flex: 1;
}
.avtive {
  color: var(--color-high-text);
}
</style>