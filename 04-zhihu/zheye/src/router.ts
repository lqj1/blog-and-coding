import { createRouter, createWebHistory } from 'vue-router'
import ColumnDetail from './views/ColumnDetail.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import CreatePost from './views/CreatePosts.vue'
// import PostDetail from './views/Post'
import store from './store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    // {
    //   path: '/posts/:id',
    //   name: 'post',
    //   component: PostDetail
    // },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})
export default router
