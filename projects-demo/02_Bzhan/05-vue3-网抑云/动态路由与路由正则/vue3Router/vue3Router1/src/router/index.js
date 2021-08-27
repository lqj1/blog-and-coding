import { createRouter, createWebHashHistory, createWebHistory, onBeforeRouteUpdate } from 'vue-router';
// 1. Define route components.
// These can be imported from other files
const About = { template: '<div>About</div>' };
import Home from '../components/Home.vue';
import News from '../components/News.vue';
import Article from '../components/Article.vue';
import Films from '../components/Films.vue';
import User from '../components/User.vue';
import Yangshi1 from '../components/Yangshi1.vue';
import Yangshi2 from '../components/Yangshi2.vue';
import NotFound from '../components/NotFound.vue';
import Page from '../components/Page.vue';
import ShopMain from '../components/ShopMain.vue';
import ShopTop from '../components/ShopTop.vue';
import ShopFooter from '../components/ShopFooter.vue';
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  {
    name: 'news',
    path: '/news/:id',
    component: News,
  },
  {
    // 文档的id必须是数字，第一个反斜杠是正则的转义
    path: '/article/:id(\\d+)',
    component: Article,
  },
  {
    // 文档的id必须是数字，至少一个，可以有多个，比如 films/123/456
    // * 表示 有或者没有
    // ？表示 有或者没有，但是不能重复，不能有多个  films/123/457 就会出错
    path: '/film/:id?',
    component: Films,
  },
  {
    // 用于匹配导航到非法导航
    path: '/:path(.*)',
    component: NotFound,
  },
  // 嵌套路由的使用，在父页面使用 router-view
  {
    path: '/user',
    component: User,
    children: [
      {
        path: 'yangshi1',
        component: Yangshi1,
      },
      {
        path: 'yangshi2',
        component: Yangshi2,
      },
    ],
  },
  {
    path: '/page',
    component: Page,
    // 单独设置导航守卫，进入page页面会触发
    beforeEnter: (to, from) => {
      console.log('beforeEnter');
    },
  },
  // 命名视图
  {
    path: '/shop',
    // 取别名
    alias: '/anotherShop', // 输入这个也可以导航到该组件
    alias: ['/anotherShop', '/anotherShop2'], // 多个别名
    components: {
      // 一个名字对应一个 router-view 标签，可以写在 App.vue 中
      default: ShopMain, // 默认显示
      ShopTop: ShopTop,
      ShopFooter: ShopFooter,
    },
  },
  // 重定向
  {
    path: '/mail',
    // redirect: to => {
    //   // 注意要 return，否则就是执行一个大括号里的函数
    //   return {
    //     path: '/shop',
    //   };
    // },
    redirect: '/shop',
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  // history: createWebHashHistory(), // 哈希模式
  history: createWebHistory(), // 没有 #
  routes, // short for `routes: routes`
});

// 导航守卫
// 每次跳转都会经过
router.beforeEach((to, from, next) => {
  console.log('to', to);
  // return false; //取消跳转，无法跳转
  next(); // 允许通过
});
// 路由跳转完成后调用的方法
// router.beforeResolve(to => {
// })
// 在 vue 组件文件中，也可以写路由守卫相关的函数，属于生命周期一部分，与 methods 同级
beforeRouteEnter();
beforeRouteUpdate();
beforeRouteLeave();
export default router;
