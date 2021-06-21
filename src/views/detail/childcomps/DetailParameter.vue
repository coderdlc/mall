<template>
  <div>
    <div class="title">{{ detailParams.key }}</div>
    <div
      v-for="(item, index) in detailParams.set"
      :key="index"
      class="item-message"
    >
      <span class="key">{{ item.key }}:</span>
      <span class="value">{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParameter",
  props: {
    detailParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.title {
  height: 35px;
  color: var(--color-high-text);
  margin-top: 10px;
  text-align: center;
  font-size: 18px;
}
.item-message {
  width: 100%;
  height: 40px;
  border-bottom: 2px solid #f2f4f9;
  line-height: 44px;
  font-size: 12px;
}
.key {
  margin-right: 30px;
  margin-left: 3px;
}
.value {
  width: 70%;
  color: var(--color-high-text);
  overflow: hidden;
}
</style>