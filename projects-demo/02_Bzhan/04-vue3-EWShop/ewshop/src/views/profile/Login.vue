<template>
  <div>
    <nav-bar>
      <template v-slot:default>登录</template>
    </nav-bar>
    <div style="margin-top: 50px">
      <div style="text-align: center">
        <van-image width="10rem" height="5rem" fit="contain"
          src="https://bkimg.cdn.bcebos.com/pic/8601a18b87d6277f44e129fb26381f30e824fc06?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto" />
      </div>
    </div>
    <van-form @submit="onSubmit">
      <van-field v-model="email" name="用户名" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名'}]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
        :rules="[ { required: true, message: '请填写密码'}]" />
      <div style="margin: 16px">
        <div class="link-login" @click="$router.push({path:'/register'})">
          没有账号，立即注册
        </div>
        <van-button round block type="info" color="#44b883" native-type="submit">提交</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { ref, reactive, toRefs } from 'vue'
import { login } from 'network/user'
import { Notify, Toast } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: "Login",
  components: {
    NavBar
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const userinfo = reactive({
      email: '',
      password: '',
    })
    const onSubmit = () => {
      login(userinfo).then(res => {
        // 将 token 保存到本地 window.localStorage, setItem(key, value)  getItem(key)
        window.localStorage.setItem('token', res.access_token)
        // 在 vuex 中保存 isLogin，commit调用 mutations 中的方法
        store.commit('setIsLogin', true) // true是payload中附带的参数，在Profile.vue中设置为false
        Toast.success('登录成功')
        userinfo.email = ''
        userinfo.password = ''
        setTimeout(() => {
          router.go(-1)
        }, 1000);
      })
    }
    return {
      ...toRefs(userinfo),
      onSubmit
    }
  }
}
</script>

<style scoped>
.link-login {
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  display: inline-block;
  text-align: left;
}
</style>