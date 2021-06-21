<template>
  <!-- 滚动插件功能 -->
  <div class="wrapper" ref="wrapper">
    <div class="concent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    //创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    //监听滚动位置
    this.scroll.on("scroll", (positions) => {
      this.$emit("showScroll", positions);
    });
    //监听上拉加载
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    //上拉位置的方法
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //刷新下一次上来加载的方法
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //刷新scroll，让他重新计算一次高度
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log("----");
    },
  },
};
</script>

<style scoped>
</style>