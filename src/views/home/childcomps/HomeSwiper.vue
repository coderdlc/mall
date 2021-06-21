<template>
  <div class="swiper-bar">
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "HomeSwiper",
  data() {
    return {
      isImgLoad: false,
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    swiperLoad() {
      if (!this.isImgLoad) {
        this.$emit("swiperLoad");
        this.isImgLoad = true;
      }
    },
  },
};
</script>

<style scoped>
.swiper-bar img {
  width: 100%;
  height: 100%;
}
</style>