<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar><template v-slot:default>购物车</template></nav-bar>
    <!-- /导航栏 -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'ShopCart',
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>