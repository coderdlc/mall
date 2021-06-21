<template>
  <div id="detail">
    <tab-bar-detail class="detail-tabbar"></tab-bar-detail>

    <scroll
      class="conter"
      ref="scroll"
      :pull-up-load="true"
      :probeType="3"
      @showScroll="detailScroll"
    >
      <detail-swiper :swiper-data="swiperData" />
      <detail-base-info :goods="goods" />
      <detail-store :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @goodsImgLoad="goodsImgLoad"
      />
      <detail-parameter :detail-params="detailParams" />
      <detail-comment :detail-coms="detailComs" />
      <goods-list :goods="detailRecommend" />
    </scroll>
    <back-top
      v-show="isdetailBackTop"
      class="detail-back"
      @click.native="detailClick"
    ></back-top>
    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>
import TabBarDetail from "./childcomps/TabBarDetail";
import DetailSwiper from "./childcomps/DetailSwiper";
import DetailBaseInfo from "./childcomps/DetailBaseInfo";
import DetailStore from "./childcomps/DetailStore";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
import DetailParameter from "./childcomps/DetailParameter";
import DetailComment from "./childcomps/DetailComment";
import DetailBottomBar from "./childcomps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";
import GoodsList from "components/content/goods/GoodsList";

import { getDetailData, Goods, Shop, getDetailRecommend } from "network/detail";
import { debounce } from "common/utils";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      swiperData: [],
      goods: {},
      shop: {},
      detailInfo: {},
      detailParams: {},
      detailComs: {},
      detailRecommend: [],
      isdetailBackTop: false,
    };
  },
  components: {
    TabBarDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailStore,
    DetailGoodsInfo,
    DetailParameter,
    DetailComment,
    DetailBottomBar,
    Scroll,
    BackTop,
    GoodsList,
  },
  created() {
    this.iid = this.$route.params.iid;
    //详情页商品数据
    getDetailData(this.iid).then((res) => {
      const data = res.result;
      //取出详情页轮播图数据
      this.swiperData = data.itemInfo.topImages;
      console.log(res);

      //取出详情页商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //取出详情页店铺数据
      this.shop = new Shop(data.shopInfo);

      //取出详情页商品详情数据
      this.detailInfo = data.detailInfo;

      //取出详情页商品参数数据
      this.detailParams = data.itemParams.info;

      //取出详情页评论数据
      if (data.rate.cRate !== 0) {
        this.detailComs = data.rate.list[0];
      }
    });

    // 详情页商品推荐数据
    getDetailRecommend().then((res) => {
      this.detailRecommend = res.data.list;
    });
  },
  methods: {
    //刷新scroll
    goodsImgLoad() {
      console.log(this.$refs.scroll.scroll);
      // console.log("111");
      this.$refs.scroll.refresh();
    },
    //显示回到顶部按钮
    detailScroll(positions) {
      this.isdetailBackTop = -positions.y > 1000;
      // console.log(positions.y);
      // console.log(this.isdetailBackTop);
    },
    //回到顶部方法
    detailClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    addToCart() {
      //传出商品基本信息到购物车
      const product = {};
      product.image = this.swiperData[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.newPrice = this.goods.nowPrice;
      product.iid = this.iid;

      // this.$store.commit("addCart", product);

      this.$store.dispatch("addCart", product);
    },
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("detailImgLoad", () => {
      // console.log(this.$refs.scroll.scroll);
      // this.$refs.scroll.refresh();
      refresh();
    });
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  background-color: #fff;
  z-index: 10;
  height: 100vh;
}
.detail-tabbar {
  position: relative;
  background-color: #fff;
  z-index: 10;
}
.conter {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>