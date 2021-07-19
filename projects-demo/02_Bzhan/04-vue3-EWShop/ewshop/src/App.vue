<template>
  <router-view />
  <div id="nav">
    <router-link to="/">首页</router-link> |
    <router-link to="/about">分类</router-link>
    <router-link to="/about">购物车</router-link>
    <router-link to="/about">我的</router-link>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
