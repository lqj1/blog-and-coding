<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar" title="小智同学" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <!-- 消息列表 -->
    <van-cell-group class="message-list">
      <van-cell  v-for="(item,index) in messages" :title="item.msg" :key="index"></van-cell>
    </van-cell-group>
    <!-- /消息列表 -->
    <!-- 发送消息 -->
    <van-cell-group class="send-message-wrap">
      <van-field v-model="message" placeholder="请输入消息" :border="false"></van-field>
      <van-button type="primary" size="small" style="width: 80px" @click="onSend">发送</van-button>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
// import io from 'socket.io-client'
export default {
  name: 'UserChat',
  props: {},
  data () {
    return {
      message: '',
      socket: null, // WebSocket 通信对象
      messages: [] // 消息列表
    }
  },
  created () {
    // // 建立连接
    // const socket = io('http://ttapi.research.itcast.cn')
    // this.socket = socket
    // // 监听事件
    // socket.on('connect', function () {
    //   console.log('连接建立成功了')
    // })
    // socket.on('event', function () {})
    // // 断开连接
    // socket.on('disconnect', function () {
    //   console.log('断开连接')
    // })
    // // 监听 message 事件，接收服务端消息
    // socket.on('message', function (data) {
    //   // 把对方发过来的消息存放到数组中
    //   this.messages.push(data)
    // })
  },
  methods: {
    onSend () {
      // 请求发送消息
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      // 把用户发出去的消息存储到数组中
      this.messages.push(data)
      // 清空输入框
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.send-message-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 10px;
  align-items: center;
}
</style>
