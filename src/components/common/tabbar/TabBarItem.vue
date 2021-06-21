<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{ active: isActive }"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBaritme",
  props: {
    path: String,
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      //判断活跃状态下的path是否和点击的path一致
      return this.$route.path.indexOf(this.path) !== -1;
    },
  },
  methods: {
    itemClick() {
      //路由跳转
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.active {
  color: #e76262;
}
</style>