<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar><template v-slot:default>个人中心</template></nav-bar>
    <!-- /导航栏 -->
    <div style="margin: 15px; margin-top: 100px">
      <van-button round block color="#44BA80" @click="toLogout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { logout } from 'network/user'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'Profile',
  components: {
    NavBar
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const toLogout = () => {
      logout().then(res => {
        console.log('res', res)
        if (res.status === 204) {
          Toast.success('退出成功')
          // 清除 token
          window.localStorage.setItem('token', '')
          store.commit('setIsLogin', false) // 对应Login.vue中设置的登录状态为 true
          setTimeout(() => {
            router.push({ path: '/login' })
          }, 500);
        }
      })
    }
    return {
      toLogout
    }
  }
}
</script>

<style scoped>

</style>