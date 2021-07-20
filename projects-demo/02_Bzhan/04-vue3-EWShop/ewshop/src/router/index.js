import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue'  // 不能懒加载
const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Detail = () => import('../views/detail/Detail');
const Profile = () => import('../views/profile/Profile');
const ShopCart = () => import('../views/shopcart/ShopCart');

const routes = [
  {
    path: '',
    name: 'DefaultHome',
    component: Home,
    meta: {
      // 可用于导航守卫
      title: '图书兄弟',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      // 可用于导航守卫
      title: '图书兄弟',
    },
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      // 可用于导航守卫
      title: '图书兄弟-商品分类',
    },
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      // 可用于导航守卫
      title: '图书兄弟-商品详情',
    },
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
    meta: {
      // 可用于导航守卫
      title: '图书兄弟-购物车',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      // 可用于导航守卫
      title: '图书兄弟-个人中心',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 导航守卫-跳转之前执行
router.beforeEach((to, from, next) => {
  // 如果没有登陆，在这里到login
  next();
  document.title = to.meta; // 改变网页标题
});
export default router;
