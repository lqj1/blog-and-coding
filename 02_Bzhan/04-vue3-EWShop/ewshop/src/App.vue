<template>
  <router-view />
  <!-- <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view> -->

  <div id="nav">
    <router-link class="tab-bar-item" to="/">
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link class="tab-bar-item" to="/category">
      <div class="icon"><i class="iconfont icon-leimupinleifenleileibie"></i></div>
      <div>分类</div>
    </router-link>
    <router-link class="tab-bar-item" to="/shopcart">
      <div class="icon">
        <van-badge :content="$store.state.cartCount" max="9">
          <i class="iconfont icon-gouwuche1"></i>
        </van-badge>
      </div>
      <div>购物车</div>
    </router-link>
    <router-link class="tab-bar-item" to="/profile">
      <div class="icon">
        <van-badge>
          <i class="iconfont icon-wode"></i>
        </van-badge>
      </div>
      <div>我的</div>
    </router-link>
  </div>
</template>
<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
// 通过在App.vue中定义该方法，这样在页面其他任何地方刷新之后都能调用该方法
export default {
  setup () {
    const store = useStore()
    onMounted(() => {
      store.dispatch('updateCart') // 通过该方法添加购物车的数量
    })
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.css';
@import 'assets/css/font/iconfont.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
  a {
    color: var(--color-text);

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: var(--font-size);
  }
  .tab-bar-item .icon {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    display: inline-block;
  }
}
</style>
