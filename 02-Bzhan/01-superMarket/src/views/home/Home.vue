<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed" />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- native监听组件元素的原生事件，不然没法监听 -->
    <back-top @click.native="backClick"
              v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from './ChildComps/HomeSwiper'
import RecommendView from './ChildComps/RecommendView'
import FeatureView from './ChildComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    }
  },
  // created里面不要拿dom，在mounted中
  created () {
    // 1. 请求多个数据
    this.getHomeMultidata()
    // 2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    // 执行刷新
    // 1. 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh);
    // 对监听的事件进行保存
    this.itemImgListener = () => {
      // this.$refs.scroll.refresh();
      // console.log('---');
      refresh(20, 30, 'abc');
    }
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad',)
    // 2. 获取tabControl的offsetTop
    // 所有的组件都有一个属性$el:用于获取组件中元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    // console.log('this.tab', this.tabOffsetTop)
  },
  destroyed () {
    console.log('home destroy');
  },
  activated () {
    // console.log('home activate');
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    // 1. 保存Y值
    // console.log('home deactivate');
    this.saveY = this.$refs.scroll.getScrollY()
    // 2. 取消全局事件的监听
    this.$bus.off('itemImageLoad', this.itemImgListener)
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }

  },
  methods: {
    /**
     * 事件监听相关的
     */

    // 防抖函数->utils中调用
    loadMore () {
      // console.log('首页上拉加载更多')
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },
    contentScroll (position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000
      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    backClick () {
      // 访问组件内部data(scroll)属性，并调用方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
      // console.log(index);
    },
    swiperImageLoad () {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log('this.tab', this.tabOffsetTop)
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        // this.result = res;
        // console.log(res.data)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    // 请求三种不同的分类数据
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* 
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>