<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in text"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === itemIndex }"
      @click="indexItem(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      itemIndex: 0,
    };
  },
  props: {
    text: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    indexItem(index) {
      this.itemIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  margin-bottom: 5px;
  padding: 3px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  text-align: center;
  height: 44px;
  line-height: 44px;
}
.active span {
  padding-bottom: 4px;
  border-bottom: 2px solid #e5539d;
}
.active {
  color: #e5539d;
}
</style>