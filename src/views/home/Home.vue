<template>
  <div id="home">
    <nav-bar>
      <template v-slot:centre>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      ref="tabControl2"
      class="tab-show"
      :text="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isTab"
    />
    <scroll
      class="scroll"
      ref="scroll"
      :probeType="3"
      :pull-up-load="true"
      @showScroll="showScroll"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @swiperLoad="swiperLoad" />
      <recommend :recommends="recommends" />
      <feature />
      <tab-control
        ref="tabControl1"
        :text="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";

import HomeSwiper from "./childcomps/HomeSwiper";
import Recommend from "./childcomps/Recommend";
import Feature from "./childcomps/Feature";

import { getHomeMultidata, getHomeData } from "network/home.js";
import { debounce } from "common/utils.js";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    Recommend,
    Feature,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      goodsType: "pop",
      isShow: false,
      tabControlTop: 0,
      isTab: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.goodsType].list;
    },
    destroyed() {
      console.log("qqq");
    },
    activated() {
      console.log("sss");
    },
    deactivated() {
      console.log("dd");
    },
  },
  created() {
    //请求home的轮播图数据
    this.getHomeMultidata();

    //请求home的款式数据
    this.getHomeData("pop");
    this.getHomeData("new");
    this.getHomeData("sell");
  },
  mounted() {
    //监听图片加载完成的事件，然后调用函数
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("homeImgLoad", () => {
      // console.log(this.$refs.scroll.scroll);
      // this.$refs.scroll.refresh();
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听
     */
    tabClick(index) {
      if (index == 0) {
        this.goodsType = "pop";
      } else if (index == 1) {
        this.goodsType = "new";
      } else {
        this.goodsType = "sell";
      }
      this.$refs.tabControl2.itemIndex = index;
      this.$refs.tabControl1.itemIndex = index;
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    showScroll(positions) {
      this.isShow = -positions.y > 1000;
      this.isTab = -positions.y > this.tabControlTop;
    },
    pullingUp() {
      // console.log("上拉加载");
      this.getHomeData(this.goodsType);
    },
    //监听轮播图的图片加载
    swiperLoad() {
      this.tabControlTop = this.$refs.tabControl1.$el.offsetTop;
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    /**
     * 网络请求
     */
    //请求home的轮播图数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //请求home的款式数据
    getHomeData(type) {
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then((res) => {
        // for(let n of res.data.list){
        //   this.goods[type].list.push(n)
        // }
        //...res.data.list语法表示将res.data.list里的元素一个一个的解析开，然后push进去
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // scroll内部的的finisPullUp方法，只有调用该方法当执行完一次上拉加载才能继续执行下一次，不调用该方法则执行一次上拉加载就不会执行下一次
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #ffc0cb;
  color: #fff;
}

.swiper-bar {
  padding-top: 0;
}

.tab-show {
  position: relative;
  right: 0;
  left: 0;
  top: 43px;
  z-index: 9;
}
.scroll {
  position: absolute;
  top: 44px;
  bottom: 10px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
