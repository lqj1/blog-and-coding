import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import { Dialog } from 'vant'
import store from '@/store/'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    meta: { // 给路由添加额外的自定义数据
      requiresAuth: true
    }
  },
  {
    // 一级路由渲染到根组件中的 router-view
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', //  默认子路由
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { // 给路由添加额外的自定义数据
          requiresAuth: false // false表示不需要登陆也能访问
        }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/'),
        meta: { // 给路由添加额外的自定义数据
          requiresAuth: false
        }
      },
      {
        path: '/my', //  默认子路由
        name: 'my',
        component: () => import('@/views/my/'),
        meta: { // 给路由添加额外的自定义数据
          requiresAuth: false
        }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: { // 给路由添加额外的自定义数据
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: { // 给路由添加额外的自定义数据
      requiresAuth: false
    }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    props: true, // 知识点，将动态路由参数映射到组件的props中，无论是访问还是维护都很方便
    meta: { // 给路由添加额外的自定义数据
      requiresAuth: false
    }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    meta: { // 给路由添加额外的自定义数据
      requiresAuth: false
    }
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat'),
    meta: { // 给路由添加额外的自定义数据
      requiresAuth: true // true需要登陆才能访问
    }
  }
]

const router = new VueRouter({
  routes
})

// to: 要访问的页面路由信息
// from: 来自哪个页面的路由信息
// next: 放行的标记
router.beforeEach((to, from, next) => {
  // 判断页面是否需要登陆才能访问
  // 如果访问的页面需要登陆
  if (to.meta.requiresAuth) {
    // 如果已登陆，则直接通过
    if (store.state.user) {
      return next()
    }
    // 没有登陆则，提示是否登陆
    // 校验登陆状态，没有提示用户
    Dialog.confirm({
      title: '标题',
      message: '该功能需要登陆才能访问，确认登陆吗？'
    })
      .then(() => { // 确认执行这里，跳转登录页
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => { // 取消执行这里
        // 取消了，停止路由导航
        next(false)
      })
  } else {
    // 不需要登陆状态的页面，直接过去
    next()
  }
})

export default router
