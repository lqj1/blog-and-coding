<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar><template v-slot:default>商品分类</template></nav-bar>
    <!-- /导航栏 -->
    <div id="mainbox">
      <!-- 销量排行 -->
      <div class="ordertab">
        <van-tabs v-model="active" @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
      </div>
      <!-- /销量排行 -->
      <!-- 左侧下拉菜单 -->
      <van-sidebar class="leftmenu" v-model="activeKey">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item v-for="item in categories" :key="item.id" :title="item.name" :name="item.name">
            <van-sidebar-item v-for="sub in item.children" :title="sub.name" :key="sub.id" @click="getGoods(sub.id)" />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
      <!-- /左侧下拉菜单 -->
      <!-- 列表详情 -->
      <div class="goodslist">
        <div class="content">
          <van-card v-for="item in showGoods" :key="item.id" :num="item.comments_count" :price="item.price"
            :tag="item.comments_count >= 0 ? '流行': '标签'" :desc="item.updated_at" :title="item.title"
            :thumb="item.cover_url" :lazy-load=true @click="itemClick(item.id)" />
        </div>
      </div>
      <!-- /列表详情 -->
    </div>
    <!-- 回到顶部 -->
    <!-- 在组件中添加事件，必须要加 native 修饰 -->
    <back-top v-show="isShowBackTop" @bTop='bTop'></back-top>
    <!-- /回到顶部 -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import BackTop from 'components/common/backtop/BackTop'
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { getCategory, getCategoryGoods } from 'network/category'
import BScroll from 'better-scroll'
export default {
  name: 'Category',
  setup () {
    // 定义路由器
    const router = useRouter()
    let activeKey = ref(0)
    let activeName = ref(1)
    let categories = ref([])
    let active = ref(1)
    // 当前的排序条件
    let currentOrder = ref('sales')
    // 当前的分类id
    let currentCid = ref(0)
    // 返回顶部
    let isShowBackTop = ref(false)
    // 数据模型
    const goods = reactive({
      sales: {
        page: 1,
        list: []
      },
      price: {
        page: 1,
        list: []
      },
      comments_count: {
        page: 1,
        list: []
      },
    })
    // 计算属性
    const showGoods = computed(() => {
      return goods[currentOrder.value].list
    })
    // 获取数据
    const init = () => {
      getCategoryGoods('sales', currentCid.value).then(res => {
        goods.sales.list = res.goods.data
      })
      getCategoryGoods('price', currentCid.value).then(res => {
        goods.price.list = res.goods.data
      })
      getCategoryGoods('comments_count', currentCid.value).then(res => {
        goods.comments_count.list = res.goods.data
      })
    }
    let bscroll = reactive({})
    onMounted(() => {
      getCategory().then(res => {
        categories.value = res.categories
      })
      // 初始化只需要初始化一个类别就可以
      getCategoryGoods('sales', currentCid.value).then(res => {
        goods.sales.list = res.goods.data
      })
      // 右侧下拉加载更多，需要放在onMounted中
      bscroll = new BScroll(document.querySelector('.goodslist'), {
        probeType: 3, // 0,1,2,3,  3->只要在运动就触发scroll事件
        click: true, // 是否允许滚动区域内点击
        pullUpLoad: true // 上拉加载更多，默认为false
      })
      // 注册滚动事件
      bscroll.on('scroll', (position) => {
        isShowBackTop.value = (-position.y) > 300
      })
      // 上拉加载数据，当滑到底部加载数据，pullingUp
      bscroll.on('pullingUp', () => {
        console.log('上拉加载更多...')
        const page = goods[currentOrder.value].page + 1
        getCategoryGoods(currentOrder.value, currentCid.value).then(res => {
          // 直接压入会以数组的形式，所以使用扩展运算符
          goods[currentOrder.value].list.push(...res.goods.data)
          goods[currentOrder.value].page += 1
        })
        // 完成上拉，等数据请求完成，要将新数据展示出来
        bscroll.finishPullUp()
        // 重新计算高度
        // 切换选项卡也需要刷新高度 
        nextTick(() => {
          bscroll && bscroll.refresh()
        })
        console.log('contentHeight: ' + document.querySelector('.content').clientHeight)
        console.log('当前类型: ' + currentOrder.value + '，当前页: ' + page)
      })
      // 监听 任何一个变量
      watchEffect(() => {
        // nextTick 当DOM渲染完再去刷新，重新计算高度
        nextTick(() => {
          // 重新计算高度
          bscroll && bscroll.refresh()
        })
      })
    })
    // 排序选项卡
    const tabClick = (index) => {
      let orders = ['sales', 'price', 'comments_count']
      currentOrder.value = orders[index]
      getCategoryGoods(currentOrder.value, currentCid.value).then(res => {
        goods[currentOrder.value].list = res.goods.data
        // 切换选项卡也需要刷新高度 
        nextTick(() => {
          bscroll && bscroll.refresh()
        })
      })
    }
    // 通过左侧下拉分类得到商品
    const getGoods = (cid) => {
      currentCid.value = cid
      init()
    }
    // 返回顶部
    const bTop = () => {
      bscroll.scrollTo(0, 0, 300)
    }
    return {
      activeKey,
      activeName,
      categories,
      active,
      tabClick,
      getGoods,
      currentOrder,
      currentCid,
      showGoods,
      bscroll,
      isShowBackTop,
      bTop,
      itemClick: (id) => {
        router.push({
          path: '/detail',
          query: { id }
        })
      }
    }
  },
  components: {
    NavBar,
    BackTop
  }
}
</script>

<style scoped lang="scss">
#mainbox {
  margin-top: 45px;
  display: flex;
  .ordertab {
    flex: 1;
    height: 50px;
    z-index: 9;
    position: fixed;
    top: 45px;
    right: 0;
    left: 130px;
  }
  .leftmenu {
    position: fixed;
    top: 95px;
    left: 0;
    width: 130px;
    height: 200px;
  }
  .goodslist {
    flex: 1;
    position: absolute;
    top: 100px;
    left:130px;
    right: 0;
    height: 100vh;
    padding: 10px;
    text-align: left;
    // .content {
    //   padding-top: 100px;
    // }
  }
}
.van-card__thumb {
  width: 68px !important;
}
</style>