<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar" title="注册 / 登录" left-arrow @click-left="$router.back()" />
    <!-- 导航栏 -->
    <!-- 登录表单 -->
    <!-- 基于vant的表单验证
      1. 使用 van-form 组件包裹所有的表单项 van-field
      2. 给 van-form 绑定 submit 事件，当表单提交的时候会触发
        提示：【只有表单验证通过，它才会调用submit】
      3. 使用 Field 的 rules 属性定义校验规则
    -->
    <van-form :show-error="false" :show-error-message="false" validate-first ref="login-form" @submit="onLogin" @failed="onFailed">
      <van-field v-model="user.mobile" icon-prefix="icon" left-icon="shouji" center placeholder="请输入手机号" name="mobile" :rules="formRules.mobile" />
      <van-field v-model="user.code" icon-prefix="icon" left-icon="yanzhengma" center placeholder="请输入验证码" name="code" :rules="formRules.code">
        <template #button>
          <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s" @finish="isCountDownShow = false"></van-count-down>
          <van-button v-else class="send-btn" size="small" round :loading="isSendSmsLoading" @click.prevent="onSendMsg">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
    <!-- 登录表单 -->
  </div>
</template>
<script>
import { login, sendMsg } from '@/api/user'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '17090086870', // 手机号
        code: '246810' // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false, // 控制倒计时和发送按钮的显示状态
      isSendSmsLoading: false // 发送验证码按钮的loading状态
    }
  },
  methods: {
    async onLogin () {
      // Toast.loading({
      this.$toast.loading({
        message: '登陆中...', // 提示文字
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时间，0为持续展示
      })
      // 1. 找到数据接口
      // 2. 封装请求方法
      // 3. 请求调用登录
      try {
        const { data } = await login(this.user)
        // 4. 处理相应结果
        this.$toast.success('登陆成功')
        // 将后端返回的用户登陆状态（token)放到vuex中
        this.$store.commit('setUser', data.data)
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
      }
    },
    onFailed (error) {
      console.log(error)
      // 只需要拿到第一个错误的提示就可以了
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendMsg () {
      // 方法一：
      // this.$ref['login-form'].validate('mobile').then( // 只验证手机号，通过then接收结果
      //   data => {
      //   }
      // )
      // 方法二：也可以通过async和await来处理then的返回
      try {
        // 校验手机号
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        this.isSendSmsLoading = true // 展示按钮的loading状态，防止网络慢，用户多次点击触发发送行为
        // 校验通过，发送请求
        await sendMsg(this.user.mobile)
        // 短信发送出去了，隐藏发送按钮，显示倒计时
        this.isCountDownShow = true
        // 倒计时结束，显示发送按钮，隐藏倒计时，监视倒计时组件的 finish 事件
      } catch (err) {
        // try中任何错误都会进入catch
        // 不同的错误需要有不同的提示
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
          // console.log(message)
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        // 表单验证失败
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论成功或者失败，最后都要关闭发送按钮loading状态
      this.isSendSmsLoading = false

      // 表单中所有的按钮点击都会触发表单提交，click.prevent 时间阻止默认行为
      // 验证手机号
      // 验证通过 -> 请求发送验证码 -> 用户接收短信 -> 用户输入验证码 -> 请求登陆
      // 请求发送验证码 -> 隐藏发送按钮 -> 显示倒计时
      // 倒计时结束 -> 隐藏倒计时，显示发送按钮
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .send-btn {
    width: 78px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
