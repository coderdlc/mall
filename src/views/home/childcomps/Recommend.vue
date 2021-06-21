<template>
  <div class="recommend-bar">
    <div v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend-bar {
  display: flex;
  margin-top: 10px;
  /* padding: 8px; */
  border-bottom: 10px solid #d6d6d6;
}
.recommend-bar > div {
  flex: 1;
  text-align: center;
  font-size: 14px;
}

.recommend-bar img {
  width: 75px;
  height: 75px;
  /* margin: 5px; */
}
</style>