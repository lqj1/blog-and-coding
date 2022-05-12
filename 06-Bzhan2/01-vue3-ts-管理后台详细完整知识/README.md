# vue2&vue3搭建管理后台系统知识体系
## 建立项目仓库
### 1. git分支
- master: 主分支，一般不会在此分支上开发项目
- dev: 开发分支，一般在此分支上开发
>版本分支: 建立于dev分支下面
feature-vueAdmin-V1.0.0-20220504: 分支完整名称
feature: 描述当前分支类型(需求)
vueAdmin: 项目名称
V1.0.0: 版本号
20220504: 建立分支日期
>Bug分支: 建立于当前版本分支下面
bug-101241-20220504: bug分支完整名称
bug: 分支类型(BUG)
101241: bug的id
20220504: 建立分支的日期
## 通过脚手架构建vue项目
### 1. 路由选择-hash/history
- hash: 地址栏URL中有 # 符号
- history: 利用了 HTML5 History interface 中新增的 pushState() 和 replaceState() 方法
  - 此方法需要后端Apache 或 Nginx 进行简单的路由配置，否则会报 404

## vue3和vue2目录区别
- 去除了static、config和build目录
- 新增了public目录
- 自动依赖 node_modules
- 默认配置 webpack, 通过 vue.config.js 修改
- vue inspect 可查看webpack 默认配置
- 内置了vue-cli-service serve 服务
- 浏览器打开图形界面， vue ui 查看

## 项目初始化
### 1. 加载全局样式
#### 单位
- vh: 视觉高度，100vh 就是满屏，50vh屏幕的一半
### 2. 路由配置与router重定向
  - 根目录与路由重定向
```javascript
import Login from '@/components/Login.vue';  // 全局引入
export default new Router({
  routes: [
    {
      path: '/', 
      redirect: 'login'
    }
    {
      path: '/index',
      name: 'Home', 
      component: () => import('@/components/Home.vue')  // 按需导入
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
```
### 3. 程序入口main.js(vue2)
- 在main.js中
```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = fasle
new Vue({
  router,
  store,
  render: h -> h(App)
}).$mount('#app')
``` 
- 实例化Vue并添加router,store以及渲染App.vue首页
- 将整个实例化的对象放到 public/index.html 中 id 为 app的节点，塞入body中
- 之后的组件或者页面，都放入到 App.vue 中
- main.js 是全局配置存放的地方，全局的配置都在这个文件中 

### 4. element-ui的引入
- 全局与按需引入
- 按需导入注意要在main.js中注册之后才能使用

### 5. vue文件规则
#### 固定三块内容
- template、script、style
#### template
- vue2中必须有父元素包裹
- vue3可以有多个根节点
#### script
- name: 组件名称
- component: 组件，有组件引入时，放置引入组件名称
- data: 数据，v-model绑定数据使用
- created: 组件创建完成时使用
- mounted: 挂载完成时使用
- methods: 定义方法
- props: 子组件接收父组件参数
- watch
```javascript
<script>
export default {
  name: 'home',
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  props: {},
  watch: {}
}
</script>
```
#### style
```javascript
<style lang="less" scoped>
.body {
  background-color: red;
}
</style>
```
- scoped用于限定样式在本组件生效
- lang="less"用于限定样式语言

### 6. vue开发注意
- 用数据驱动视图，减少dom操作
#### a. v-for、v-show、v-if、v-bind
```vue
<div v-for="item in list" :key="item.id">
{{item.text}}
</div>
```
- v-for 和 v-if 不能放在一个标签中使用
- v-show 和 v-if 区别
  - v-show 在元素中添加 display，显示隐藏切换
  - v-if 直接显示或删除dom元素
  - 频繁显示隐藏节点时，使用 v-show
- v-bind 绑定属性，缩写 v-bind:className === :className
#### b. class 绑定方式
- 最简单的绑定
```vue
:class="{'active': isActive}"
```
- 判断是否绑定一个active
```vue
:class="{'active': isActive === 1}"
<!-- 遍历到哪一个，哪一个就添加样式 -->
<li :class="{'active': isActive === index}" v-for="item in list" :key="item.id">{{item.text}}</li>
```
- 绑定多个
```vue
:class="{'active': isActive === 1, 'sort': isSort}"
```

#### c. 基本数据类型
- 基本数据类型（按值访问）
  - Null、Undefined、Boolean、String、Number、Symbol
  - 基本数据类型复制是复制变量的副本，参与任何操作相互之间不会影响
- 引用数据类型（按引用访问）
  - Object、Array、Function
  - 引用数据类型复制的是变量的指针，该指针指向存储在堆中的一个对象，复制操作结束后，两个变量引用同一个对象
  - 改变其中一个变量，就会影响另一个变量
```javascript
// 基本数据类型
let a = 11
let b = a
b = 22
console.log(b)  // 22
console.log(a)  // 11
// 引用数据类型
let aArr = [11,22]
let bArr = aArr
let cArr = bArr
cArr[0] = 33
console.log(aArr)  // [33,22]
console.log(bArr)  // [33,22]
console.log(cArr)  // [33,22]
```
### 7. element-ui的el-form表单
- Row组件使用 gutter 属性来指定每一个栏之间的间隔，默认为0
- 一共分为 24 栏
  - :span 用于指定宽度
- 按钮添加 block 的class可以变为块状元素
- el-form 包裹 el-form-item
  - 在 el-form-item 标签中添加 prop 属性指定校验字段
  - 最终在 data 的 return 中 定义 `rules:{ 校验的prop:[validator: checkAge, trigger: 'blur']}` 来校验
  - 校验的prop一般与data中定义的双向绑定名字一样
  
```javascript
methods: {
  var validateUser=(rule, value, callback) => {
    if( value == '') {
      callback(new Error('请输入用户'))
    } else {
      if( this.ruleForm.checkPass!=='') {
        this.$refs.ruleForm.validateField('checkPass');
      }
      callback()
    }
  }
  var validatePwd =(rule, value, callback) => {
    if( value == '') {
      callback(new Error('请输入密码'))
    } else if( value != this.ruleForm.pass) {
      callback(new Error('两次输入密码不一样')) // 注册一般要验证两次密码，这里减少步骤，登录不需要
    } else {
      callback()
    }
  }
}
data() {
  return {
    ruleForm: {
      username: '',
      password: '',
      code: ''
    },
    rules: {
      username: [
        // 失去焦点就会触发这个方法
        { validator: validateUser, trigger: 'blur' }
      ],
      password: [
        { validator: validatePwd, trigger: 'blur' }
      ]
    }
  }
}
```

- v-model 可以在表单控件或组件上创建双向绑定 
  - input,select,textarea,component

### 8. 建立文件夹utils,存放一些封装的工具函数
### 9. webpack配置路径别名
```javascript
configureWebpack: (config) => {
  // 配置解析别名
  config.resolve = {
    extensions: ['.js', '.json', '.vue'],  //自动添加文件名后缀，可以省略一些文件的后缀
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components')
    }
  }
}
```
## vue3.0
### 1. vue3有什么不一样的地方
- vue3的主要特点: 响应式、模板、对象式的组件声明方式
  - 基于Proxy重新实现了响应式
  - 基于treeshaking内置了更多功能
### 2. vue3新特性
#### a.setup函数
```javascript
export default {
  setup(props, context) { 
    // 下面的也可以在上面解构出来 setup(props, {refs})
    context.attrs
    context.slots
    context.parent
    context.root
    context.emit
    context.refs
  }
}
```
#### b.reactive(声明单一对象)
- 取得一个对象并返回原始对象的响应数据处理
```javascript
const obj = reactive({count: 0})
```
#### c.ref(声明基础数据类型变量)
- 内部值并返回一个响应性且可变的ref对象，ref对象具有.value指向内部值的单个属性
```javascript
const number = ref(0)
```
- 获取值的方法：number.value
#### d.isRef和toRefs
- 检查一个对象是否是 ref 对象
- toRefs将引用对象类型转成普通数据类型
```javascript
const unwrapped = isRef(foo) ? foo value: foo
...
function useMousePosition() {
  const pos = reactive({
    x: 0,
    y: 0
  })
  return toRefs(pos)  
  aa = toRefs(pos)
  // 重点1：这里toRefs将引用类型转成普通类型，所以使用的时候需要就需要使用 ref 的方法
  // aa.x.value 和 aa.y.value
}
const {x,y} = useMousePosition()  // 重点2：所以在对数据进行解构之前，需要先使用 toRefs 转成 普通数据类型
```
- const unwrapped = isRef(foo) ? foo.value: foo 这句代码很重要！！！
  - 判断是基础数据类型还是对象对象，基础数据类型就是ref，需要返回 foo.value，对象数据类型就直接返回值
- toRefs将reactive对象转换成普通对象，保证对象解构或扩展运算符不会丢失原有响应式对象的响应
#### e.watch侦听器
```javascript
const count = ref(100)
watch(()=>count.value,()=>{
  console.log('count数值发生变化了')
})
count.value = 200; // count重新赋值，watch则被触发
```
#### f.computed
- 可传入get和set，用于定义可更改的计算属性
```javascript
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => { count.value = val - 1 }
})
plusOne.value = 1
console.log(count.value)  // 0
```
#### g.$refs实例属性
```javascript
<template>
<div>
  <hello-world ref="hel"></hello-world>
  <button ref="btn"></button>
</div>
</template>
<script>
  export default {
    setup() {
      const hel = ref(null) // helloworld 组件实例
      const dom = ref(null)  // button dom节点对象，命名和上面的 ref 一致
      return {
        btn,
        hel
      }
    }
  }
</script>
```
#### h.props外部属性（一般在组件用得多）
```javascript
export default {
  props: {
    name: String
  },
  setup(props) {
    console.log(props.name)
  }
}
```
#### i.生命周期挂钩
```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'
const MyComponent = {
  setup() {
    onMounted(()=> {
      console.log('mounted')
    })
    onUpdated(()=> {
      console.log('updated')
    })
    onUnmounted(()=> {
      console.log('unmounted')
    })
  }
}
```
- vue3删除了onBeforeCreated和onCreated
- 因为 setup 总是在创建组件实例时调用，即 onBeforeCreate之后和 onCreated 之前调用
- 所以 使用了 setup 来代替 onBeforeCreated和onCreated
#### j.vue2、vue3生命周期关系
```
beforeCreate -> 使用 setup()
created -> 使用 setup()
beforeMount -> onBeforeMount
mounted -> onMounted
methods -> 去除，普通方式写
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCapture -> onErrorCaptured
```
- methods 方法使用普通声明函数
```javascript
// 在 setup() 函数中
const toggle = () => {
  // do something
  ...
}
// 使用后需要return返回出去
return {
  toggle
}
```
## axios请求
- axios接口使用
```javascript
// get请求
axios.get('/user',{
  params: {
    id: 1234
  }
})
.then(()=>{
})
.catch(()=>{
})
// post请求
axios.post('/user',{
  firstName: 'sam',
  lastName: 'lee'
})
.then(()=>{
})
.catch(()=>{
})
```
### 1.axios优化
- 如果每个页面都通过使用上面的方式去请求，那么后期如果需要将get改成post或者post改成get就会比较麻烦
- 所以通过整合成 axios.request 来优化
```javascript
axios.request({
  method: 'post', // 默认get
  url: '/user/1234',
  data: {
    firstName: 'sam',
    lastName: 'lee'
  }
})
.then(()=>{
})
.catch(()=>{
})
```
### 2.拦截器
- 分为请求拦截器和响应拦截器，在请求之前以及响应之后做的事情
- 注意函数中return会配置信息
- 具体见下面 request.js 内容
### 3.封装api请求
- 在src目录下新建utils夹，并建立基础的request.js请求文件
- 在src目录下新建api文件夹，分业务模块建立各个请求文件如 login.js、news.js、user.js
>request.js文件内容如下
```javascript
import axios from 'axios'
// 创建axios，赋值给变量 instance
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 3000,
  headers: {'X-Custom-Header': 'foobar'}
})
// 添加请求拦截器
// 注意因为新创建了对象，所以 axios 要改成 service
instance.interceptors.request.use(funciton(config)=>{
  // 在发送请求之前做些什么
  ...
  return config   // 记得return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(function(response){
  // 对响应数据做些什么
  return response
}, function(error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default service  // 最后要返回这个创建的实例
```
>login.js请求文件中内容如下
```javascript
import req from '@utils/request'  // 不用括号引用的导入可以修改导出文件的默认名称，这里service改为request
/** 
 * 获取验证码
 **/
export function GetSms(data){
  return req.request({   // 需要使用 return，那边的才能接收然后返回Promise，继续 then
    method: 'post',
    url: '/getSms/',
    data  // es6语法，data:data，直接写成 data 形式就好
  })
}
```
- 图片如下
![axios](./images/axios.png)

### 4.跨域问题解决
```javascript
// vue.config.js
const path = require('path')
module.exports = {
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist'
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.v2ex.com',  //api服务器地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/testapi'  
          // 上面会将baseUrl如 http://localhost:8080/api 替换成 https://www.v2ex.com/testapi
        }
      }
    }
  }
}
```
## 引用文件花括号问题
- 两种引用文件方式如下
```javascript
import service from '@/utils/request'  
import { ref, reactive } from 'vue'

// 引用文件中的内容
export default service
export function ref(){}
export function reactive(){}
```
- 没有花括号包裹的返回如上所示，使用了 export default 来返回，有default
  - export default 在一个文件中只能有一个，所以不使用花括号的引用只能有一个
- 有花括号包裹的文件中没有使用默认返回，而是直接返回了函数名，所以需要花括号
  - 花括号中可以包裹多个
## vue环境变量
- development开发、production生产、test测试
- 使用 process.env.NODE_ENV 来判断
  - process.env.NODE_ENV === 'production' / 'development'
- 在根目录和src文件夹同级目录下分别创建 开发和生产环境下执行的两个文件
  - .env.development
  - .env.production
- 在 .env.development 中写入以下内容：VUE_APP_ABC = 11111，其中 VUE_APP 不能修改
  - 然后就可以在文件中取到这个变量，通过 console.log(process.env.VUE_APP_ABC)

## 登录请求接口
### 账号注册
- 登录测试用例如下图所示
![login](./images/login.png)
- 按钮是否禁用的代码
```vue
<el-button :disable="isDisable"></el-button>
```
### vue3与this
- vue3中没有this的概念
### 请求返回之后的拦截器处理
```javascript
axios.interceptors.response.use(function (res) {
  // 对响应式数据做点什么
  let data = res.data
  // 根据返回码做相应的处理
  if(data.resCode !== 0) {
    alert(111)
  }
  return res  // 返回之后去执行 Promise 的 then
}, function (err) {
  // 对响应错误做些操作
  return Promise.reject(err)  // 返回之后去执行 Promise 的 catch
})
```
## Router路由
### router-link
1. 不带参数-通过路由配置的名字和路径
```javascript
<router-link :to="{name:'home'}">  
<router-link :to="{path:'/home'">
```
2. 带参数
- 路由配置 path:'/home/:id' 或者 path:'/home:id/
- url参数不可见，刷新之后参数会消失
```javascript
<router-link :to="{name:'home', params:{id:1}}">
```
- 路由可不配置
- url带的参数是可见的，刷新后参数不会消失
```javascript
<router-link :to="{name:'home', query:{id:1}">
```
### this.$router.push()(函数中调用)
1. 不带参数
```javascript
this.$router.push('/home')
this.$router.push({name: 'home'})
this.$router.push({path: '/home'})
```
2. query传参
- url带的参数是可见的，刷新之后参数不会消失
```javascript
this.$router.push({name:'home',query:{id:1}})
this.$router.push({path:'/home',query:{id:1}})  
```
3. params传参
```javascript
- 路由配置 path:'/home/:id' 或者 path:'/home:id'
- 不配置path，刷新页面参数会消失
- 配置path，刷新页面id会保留
this.$router.push({name:'home',params:{id:1}})
```
4. query和params区别
- query跳转配合路由 path 属性，传参为明文，url上参数可见，刷新之后参数不会消失
- params跳转配合路由 name 属性，传参为密文，url上参数不可见，刷新后参数会消失

## layout布局
- 一般会在 view 目录下创建用于存放布局结构的文件
  - Header.vue/Main.vue/Nav.vue
## router中添加额外参数
```javascript
{
  path: '/login',
  name: 'Login',
  hidden: true,
  meta: {
    name: '登录'
  },
  component: () => import('../views/Login/index.vue')
}
```
## 页面icon处理
### 使用单独页面
- 使用全局组件来注册使用 icon
- 用法
```vue
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({  }))
// 注册组件，传入一个选项对象（自动调用 Vue.extend）
Vue.component('my-component', {})
```
- vue3.0运行的两种模式
  - 1. compiler(模板)模式
  - 2. runtime模式(运行时)
- Vue模块的默认为 runtime 模式，指向了 'dist/vue.runtime.common.js'位置

```javascript
// compiler(模板)模式
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: {App}
})
// runtime模式(运行时)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

- 全局注册组件例子
```javascript
Vue.component('componentName', {
  template: `
   <div>
    <button></button>
   </div>`,
  data: function() {
    return {
      msg: 'test'
    }
  },
  methods: {
    getMes: function() {
      // 执行函数
    }
  }
})
```
- 一般不会直接在 main.js 中写全局注册的代码，因为会很臃肿
- 所以一般会提取到单独的文件如 icons 目录下的 index.vue 文件，然后在main.js中引用它
  - 因为有使用 Vue.component，所以在 index.vue 文件中，需要引入 import Vue from 'vue'
  - import './icons 

- 进一步对 Vue.component('componentName', {template}) 中 template 的内容进行抽离
  - 抽离到单独的 template 的vue文件
  - 然后变成 
```javascript
import Vue from 'vue'
import SvgIcon from './SvgIcon'
Vue.component('componentName', SvgIcon)
```
### 使用阿里的iconfont

## 父子间传值
### props
```javascript
export default {
  name: 'svgIcon',
  props: ['iconClass']  // 简单用法
  // 复杂使用
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: Array,  // 限定父节点传过来的值类型
      default: 'qq', // 默认值
      required: true,  // 必须要传值
      validator: (val) => {  // 校验项
        return val > 0
      }
    }
  }
  setup(props) {
    // 这里可以打印出 父节点传进来的数据
    console.log(props.iconClass)
    const msg = ref('hello world')
    return {msg}
  }
}
```
- 可选属性
  - type
  - default
  - required: Boolean
  - validator: function
  
## computed
```javascript
export default {
  setup(props) {
    console.log(props.iconClass)
    console.log(props.className)
    const msg = ref('test')
    const count = ref(10)
    // computed：监听属性变化，并计算属性
    const plusOne = computed(()=>{
      return count.value + 1
    })
    return {
      msg,
      plusOne
    }
  }
}
```
## Vuex
- 一共有5个模块
### 1. state
- 储存初始化数据
### 2. getters
- 对state里面的数据二次处理(对数据进行过滤类似filter的作用)，比如state返回的为一个对象
### 3. mutations
- 对数据进行计算的方法全部写在里面(类似于computed)
- 在页面中触发时使用 this.$store.commit('mutationName')触发 mutaions 方法改变 state 的值
### 4. actions
- 处理mutations中已经写好的方法，支持异步，其直接触发的方式是 this.$store.dispatch(actionName)
### 5. modules
- 模块化 Vuex

- mutations和actions区别
  - mutation: 专注于修改state,理论上是修改state的唯一途径
  - action: 业务代码，异步请求

- 取值方式
  - this.$store.state.xxx
  - this.$store.getters.xxx

```javascript
// index.js
export default new Vuex.Store({
  state: {
    isCollapse: false,
    count: 10
  },
  getters: {   // 类似于 computed,取state中的值
    count: state => state.count + 10,
  },
  mutations: {
    set_collapse(state) {
      state.isCollapse = !state.isCollapse
    },
    SET_COUNT(state, val) {
      state.count = value
      console.log(state.count)
    }
  },
  actions: {}
})
// 或
import app from './app.js'  // 需要在对应的文件末尾  export default app;
export default new Vuex.Store({
  modules: {
    login,
    app,
    user
  }
})

// 在其他文件中调用
export default {
  name: 'navMenu',
  setup(props, {root}) {
    /**
     * data数据
     **/
   const isCollapse = ref(false)
   const routers = reactive(root.$router.options.routes)
    /**
     * computed 监听 
     **/
    const isCollapse = computed(()=> {
      // 计算属性中，isCollapse变化不会输出打印，只有整个函数被调用了，才会打印
      console.log(root.$store.state.isCollapse)
      return root.$store.state.isCollapse
    })
    /**
     * 函数
     **/
    const navMenuState = () => {
      root.$store.commit('SET_COUNT')
    }
  }
}
```
### Vuex命名空间
- 在 store 目录下新建 modules 文件夹
```javascript
// index.js 中内容
import app from './modules/app.js'
import login from './modules/login.js'
```
- app.js文件中内容
```javascript
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false 
  token: '',
  username: cookie.get('username') || '',  // 有的话取cookie，没有的话置为空
}
const getters =  {
    isCollapse: state => state.isCollapse
}
const mutations = {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      // html5本地存储
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state, value) {
      state.token = value
    },
    SET_USERNAME(state,value) {
      state.username = value
    }
}
const actions = {
  setMenuStatus({state,getters,commit,rootGetters,rootGetters}, data){
    // content.state
    // content.getters
    // 解构如上述所示
    content.commit('SET_COLLAPSE')  // 在actions中调用同步方法，操作数据
  },
  /**
   * 登录，处理token
   **/
  login(context, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData).then((res) => {
        let data = res.data
        // 普通方式
        content.commit('SET_TOKEN', data.token)
        content.commit('SET_USERNAME', data.username)
        // 解构方式  login(context, requestData) 改成 login({commit}, requestData)
        commit('SET_TOKEN', data.token)
        commit('SET_USERNAME', data.username)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

```
### 使用命名空间
```javascript
export default {
  name: 'layoutHeader',
  setup(props, {root}) {
    const navMenuState = () => {
      root.$store.commit('app/SET_COLLAPSE')   // 类似于路径的方式，添加命名空间名字
    }
    return {
      navMenuState
    }
  }
}
```


## 过渡效果
- 过渡效果
  - -webkit-transition: all .3s ease 0s;

## 刷新存储(浏览器存储)
### cookie.js
npm install cookie_js --save
```javascript
// 储存
cookie.set('key','value')
cookie.set({key1:'value1', key2:'value2'})
// 获取
cookie.get('key')
cookie.get(['key1','key2'])
// 清除
cookie.remove('key')
cookie.remove('key1','key2')
cookie.remove(['key1','key2'])
```
### HTML5储存
1. sessionStorage(关闭浏览器时即清除)
```javascript
// 存储
window.sessionStorage.setItem('key','value')
// 获取
window.sessionStorage.getItem('key')
// 删除
window.sessionStorage.removeItem('key')
// 清空所有
sessionStorage.clear()
```
- sessionStorage存储大小为 5M
- 存储于 客户端
- 只能存储字符串类型
  - 当遇到对象类型的时候，可以使用JSON.stringify()进行转化之后存储

2. localStorage(长期，需要手动清除)
```javascript
// 存储
window.localStorage.setItem('key','value')
// 获取
window.localStorage.getItem('key')
// 删除
window.localStorage.removeItem('key')
// 清空所有
localStorage.clear()
```
- 在 store.js 中使用
```javascript
// store.js
export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false  // 优先取浏览器，JSON.parse()转成对象形式，没有就赋值为false
  },
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      // html5本地存储
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    }
  },
  actions: {
    setMenuStatus({state,getters,commit,rootGetters,rootGetters}, data){
      // content.state
      // content.getters
      // 解构如上述所示
      content.commit('SET_COLLAPSE')  // 在actions中调用同步方法，操作数据
    }
  }
})
```
- 调用action方式
  - this.$store.dispatch('setMenuStatus')

### 登录异步代码逻辑
```javascript
/**
 * 登录
 **/
const login = (()=>{
  let requestData = {
    username: ruleForm.username,
    password: sha1(ruleForm.password),
    code: ruleForm.code
  }
  root.$store.dispatch('login', requestData)  // login是调用的函数名，第二个是参数
})

// store.js中文件内容
actions: {   // 异步可以回调处理，同步没有回调处理逻辑
  login(content, requestData) {
    return new Promise((resolve, reject)=> {
      // 接口
      Login(requestData).then((response) => {
        resolve()
      }).catch(error => {
        reject()
      })
    })
  }
}
```
## 守卫路由 router.beforeEach
- 在路由跳转之前使用
- next:Function,一定要调用该方法来 resove 这个钩子，执行效果依赖next方法的调用参数
- next() 执行了 to里面的路由对象
  - 进行管道中的下一个钩子，如果全部钩子执行完了，则导航的状态就是 confirmed 确认的
- next(false)
  - 中断当前的导航
  - 如果浏览器的 URL 改变了，用户手动或者浏览器后退按钮，那么URL地址会重置到 from 路由对应的地址
- next('/') 或者 next({path:'/'})
- 确保要执行 next()

- 在main.js中调用文件
  - import './router/pre.js
- pre.js文件内容
```javascript
// pre.js；路由跳转之前处理
import router from './router/index.js'
import { getToken } from './utils/app.js'
// 申请白名单
const whiteRouter = ['/login']
router.beforeEach(to,from,next) => {
  // to    // 下一个页面
  // from  // 离开之前的页面(上一个)
  // next('/index')  // 在 beforeEach 中调用路由跳转，会继续执行 beforeEach，从而进入死循环
  if(getToken()) {
    // 有token做什么
    next()
    // 路由动态添加，分配菜单，每个角色分配不同的菜单
  } else {
    // 没有token做什么
    // next('/login')   // 死循环
    if(whiteRouter.indexOf(to.path) !== -1) {  // 判断下一个页面是否白名单
      next()  // 进入白名单，且不会发生 beforeEach
    } else {
      next('/login')  // 路由指向，下一次再进入 beforeEach，to.path==login，就和whiteRouter匹配上了
    }
  }
}
```
- 上面的代码逻辑如下：
  - 1. 直接进入index的时候，参数to被改变成了 '/index'，触发路由指向，就会跑 beforeEach
  - 2. 不存在 token，不在白名单，执行 next('/login')，再次发生路由指向，跑 beforeEach
  - 3. 是白名单，执行 next()，因为没参数，所以不跑 beforeEach，进入 login

## token相关
### 登录存储token
- 图如下
![token](./images/token.png)
- cookie使用
```javascript
// utils/app.js 内容
import cookie from 'cookie.js'
export function getToken() {
  return cookie.get('admin_token')
}
```
- 具体使用如上【### Vuex命名空间`】所示
- 将上述token设置到 cookie 中
```javascript
import cookie from 'cookie_js'
export function getToken(){
  return cookie.get('admin-token')
}
export function setToken(token) {
  return cookie.set('admin-token')
}
export function removeToken(token) {
  return cookie.remove('admin-token')
}
export function setUserName(value) {
  return cookie.set('username', value)
}
export function getUserName() {
  return cookie.get('username')
}
```
### 退出后台清空token
- 当进入登录页面 /login 之后，清空token，就无法再进入首页
- 修改路由守卫
```javascript
import router from './router/index.js'
import { getToken,removeToken } from './utils/app.js'
// 申请白名单
const whiteRouter = ['/login']
router.beforeEach(to,from,next) => {
  if(getToken()) {
    // 有token做什么
    if(to.path === '/login') {
      removeToken()
      next()
    } else {
      next()
    }
  } else {
    // 没有token做什么
    // next('/login')   // 死循环
    if(whiteRouter.indexOf(to.path) !== -1) {  // 判断下一个页面是否白名单
      next()  // 进入白名单，且不会发生 beforeEach
    } else {
      next('/login')  // 路由指向，下一次再进入 beforeEach，to.path==login，就和whiteRouter匹配上了
    }
  }
}
```
- 然后再清除store中的token
  - 同样在 mutations 中添加相应的方法，方法就是传空值

```javascript
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse
    // html5本地存储
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  },
  SET_TOKEN(state, value) {
    state.token = value
  },
  SET_USERNAME(state,value) {
    state.username = value
  },
  REMOVE_TOKEN(state) {
    state.token = ''
  }
}
```
- 然后将清除的方法传入 路由守卫 中去调用
- 在store/modules/app.js文件中添加退出的方法
```javascript
exit({commit}) {
  return new Promise((resolve, reject)=>{
    removeToken()
    removeUserName()
    commit('SET_TOKEN','')
    commit('SET_USERNAME','')
    resolve()
  })
}
```