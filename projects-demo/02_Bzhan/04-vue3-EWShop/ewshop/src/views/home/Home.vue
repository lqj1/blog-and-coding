<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar><template v-slot:default>图书兄弟</template></nav-bar>
    <!-- /导航栏 -->
    <tab-control v-show="isTabFixed" @tabClick="tabClick" :titles="['畅销','新书','精选']"></tab-control>
    <!-- 可滑动区域 -->
    <!-- 可滑动外层 -->
    <div class="wrapper">
      <!-- 可滑动内层 -->
      <div class="content">
        <div ref="banref">
          <!-- <div class="banners">
            <img src="~assets/images/1.png" alt="">
          </div> -->
          <home-swiper :banners="banners"></home-swiper>
          <recomment-view :recommends="recommends"></recomment-view>
        </div>
        <tab-control @tabClick="tabClick" :titles="['畅销','新书','精选']"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </div>
    </div>
    <!-- /可滑动区域 -->
    <!-- 回到顶部 -->
    <!-- 在组件中添加事件，必须要加 native 修饰 -->
    <back-top v-show="isShowBackTop" @bTop='bTop'></back-top>
    <!-- /回到顶部 -->
  </div>
</template>

<script>
import HomeSwiper from './ChildComps/HomeSwiper'
import NavBar from 'components/common/navbar/NavBar'
import RecommentView from './ChildComps/RecommentView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/common/backtop/BackTop'
import { getHomeAllData, getHomeGoods } from 'network/home'
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from 'vue'
import BScroll from 'better-scroll'
export default {
  name: 'Home',
  setup () {
    // 切换隐藏的卡片栏的显示状态
    let isTabFixed = ref(false)
    // 切换回到顶部的显示状态
    let isShowBackTop = ref(false)
    // 外面绑定一个 ref 的元素，里面再定义一个响应式变量，就可以实现绑定外面的DOM节点
    let banref = ref(null)
    const recommends = ref([])
    // 商品列表数据模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      recommend: { page: 1, list: [] },
      new: { page: 1, list: [] }
    })
    // 当前商品类型
    let currentType = ref('sales')
    const showGoods = computed( ()=> {
      return goods[currentType.value].list
    })
    // 因为 refresh() 的方法是只要页面有变化就调用，所以需要在外面定义 bscroll
    let bscroll = reactive({})
    // 轮播
    let banners = ref([])
    onMounted(() => {
      // 获取首页所有数据
      getHomeAllData().then(res => {
        recommends.value = res.goods.data
        banners.value = res.slides
      })
      // 按销量排行
      getHomeGoods('sales').then(res => {
        // console.log('res', res)
        goods.sales.list = res.goods.data
      })
      // 按新品排行
      getHomeGoods('new').then(res => {
        goods.new.list = res.goods.data
      })
      // 按推荐排行
      getHomeGoods('recommend').then(res => {
        goods.recommend.list = res.goods.data
      })
      // console.log('goods', goods)
      // DOM元素已经创建完成，在 onMounted 这里面创建BetterScroll对象
      bscroll = new BScroll(document.querySelector('.wrapper'), {
        probeType: 3, // 0,1,2,3,  3->只要在运动就触发scroll事件
        click: true, // 是否允许滚动区域内点击
        pullUpLoad: true // 上拉加载更多，默认为false
      })
      // 触发滚动事件
      bscroll.on('scroll', (position) => {
        console.log(banref.value.offsetHeight)
        isTabFixed.value = (-position.y) > banref.value.offsetHeight
      })
      // 上拉加载数据，当滑到底部加载数据，pullingUp
      bscroll.on('pullingUp', () => {
        console.log('上拉加载更多...')
        document.querySelector('.content').clientHeight
        const page = goods[currentType.value].page + 1
        getHomeGoods(currentType.value, page).then( res => {
          goods[currentType.value].list.push(...res.goods.data)
          goods[currentType.value].page += 1
        })
        // 完成上拉，等数据请求完成，要将新数据展示出来
        bscroll.finishPullUp()
        // 重新计算高度
        bscroll.refresh()
        console.log('contentHeight: ' + document.querySelector('.content').clientHeight)
        console.log('当前类型: ' + currentType.value + '，当前页: ' + page)
      })

    })
    const tabClick = (index) => {
      let types = ['sales','new','recommend']
      currentType.value = types[index]
      // nextTick 当DOM渲染完再去刷新，重新计算高度
      nextTick(() => {
        // 重新计算高度
        bscroll && bscroll.refresh()
      })
    }
    // 监听 任何一个变量
    watchEffect( () => {
      // nextTick 当DOM渲染完再去刷新，重新计算高度
      nextTick(() => {
        // 重新计算高度
        bscroll && bscroll.refresh()
      })
    })
    // 返回顶部
    const bTop = () => {
      bscroll.scrollTo(0,0)
    }
    return {
      recommends,
      tabClick,
      goods,
      showGoods,
      isTabFixed,
      isShowBackTop,
      banref,
      bTop,
      banners
    }
  },
  components: {
    HomeSwiper,
    NavBar,
    RecommentView,
    TabControl,
    BackTop,
    GoodsList
  }
}
</script>

<style scoped>
.banners img{
  width: 100%;
  height: auto;
}
#home {
  height: 100vh;
  position: relative;
}
/* 给可滑动外层添加高度 */
.wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
  /* background: red; */
}
</style>