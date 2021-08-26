import { createRouter, createWebHashHistory } from 'vue-router';
// 1. Define route components.
// These can be imported from other files
const Home = { template: '<div>Home</div>' };
const About = { template: '<div>About</div>' };
import News from '../components/News.vue';
import Article from '../components/Article.vue';
import Films from '../components/Films.vue';
import User from '../components/User.vue';
import Yangshi1 from '../components/Yangshi1.vue';
import Yangshi2 from '../components/Yangshi2.vue';
import NotFound from '../components/NotFound.vue';
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  {
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
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
export default router;
