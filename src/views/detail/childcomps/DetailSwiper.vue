<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in swiperData" :key="index">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "DetailSwiper",
  props: {
    swiperData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    // console.log(this.swiperData);
  },
  mounted() {
    console.log(this.swiperData);
    this.$forceUpdate();
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.detail-swiper {
  /* position: relative; */
  width: 100%;
  height: 300px;
  /* width: 300px; */
}
</style>