<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar><template v-slot:default>图书兄弟</template></nav-bar>
    <!-- /导航栏 -->
    <div class="banners">
      <img src="~assets/images/1.png" alt="">
    </div>
    <recomment-view :recommends="recommends"></recomment-view>
    <tab-control @tabClick="tabClick" :titles="['畅销','新书','精选']"></tab-control>
    <goods-list></goods-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import RecommentView from './ChildComps/RecommentView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import { getHomeAllData, getHomeGoods } from 'network/home'
import { ref, reactive, onMounted } from 'vue'
export default {
  name: 'Home',
  setup () {
    const recommends = ref([])
    // 声明临时变量
    let temid = ref(0)
    // 商品列表数据模型
    const goods = reactive({
      sales: { page: 0, list: [] },
      recommend: { page: 0, list: [] },
      new: { page: 0, list: [] }
    })
    onMounted(() => {
      // 获取所有数据
      getHomeAllData().then(res => {
        recommends.value = res.goods.data
      })
      // 按销量排行
      getHomeGoods('sales').then(res => {

      })
      // 按推荐排行
      getHomeGoods('recommend').then(res => {

      })
      // 按新品排行
      getHomeGoods('new').then(res => {

      })
    })
    const tabClick = (index) => {
      temid.value = index
    }
    return {
      recommends,
      temid,
      tabClick,
      goods
    }
  },
  components: {
    NavBar,
    RecommentView,
    TabControl,
    GoodsList
  }
}
</script>

<style scoped>
.banners img{
  width: 100%;
  height: auto;
  margin-top: 45px;
}
</style>