<template>
  <!-- 返回顶部功能 -->
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
};
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 17px;
  bottom: 55px;
  z-index: 100;
  width: 43px;
  height: 43px;
}
.back-top img {
  width: 100%;
  height: 100%;
}
</style>