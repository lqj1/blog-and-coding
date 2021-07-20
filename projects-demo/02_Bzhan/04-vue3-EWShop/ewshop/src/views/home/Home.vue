<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar><template v-slot:default>图书兄弟</template></nav-bar>
    <!-- /导航栏 -->

    <div class="banners">
      <img src="~assets/images/1.png" alt="">
    </div>
    <recommend-view :recommends="recommends"></recommend-view>
    <tab-control :title="['畅销','新书','精选']"></tab-control>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import RecommentView from './ChildComps/RecommentView'
import TabControl from 'components/content/tabControl/TabControl'
import { getHomeAllData } from 'network/home'
import { ref, reactive, onMounted } from 'vue'
export default {
  name: 'Home',
  setup () {
    const recommends = ref([])
    const demo = reactive({})

    onMounted(() => {
      getHomeAllData().then(res => {
        console.log(res.goods)
      })
    })
    return {
      recommends
    }
  },
  components: {
    NavBar,
    RecommentView,
    TabControl
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