// import Vue from "vue";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

// Vue.config.productionTip = false;

// vue2
// 创建 vue 根实例，将router/store配置到根实例中
// 把 App 根组件渲染到 #app节点
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app");
// vue3
createApp(App)
  .use(router)
  .mount("#app");
