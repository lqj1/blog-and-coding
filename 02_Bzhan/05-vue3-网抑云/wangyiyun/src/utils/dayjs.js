/**
 * 初始化 dayjs 相关配置
 */
import Vue from 'vue'
import dayjs from 'dayjs'
// 配置使用中文语言包
import 'dayjs/locale/zh-cn'
// 相对时间的引入
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime) // 配置使用处理相对时间
dayjs.locale('zh-cn') // 全局使用语言包
// 知识点
// 例如时间日期格式化
// 把处理时间的相关代码包装为全局过滤器，然后可以在任何组件的模板中使用
// 过滤器就是可以在模板中调用的函数
// 在组件的模板中使用过滤器， {{ xxx | relativeTime }}
// 管道符前面的内容会作为参数传递给过滤器函数，过滤器返回值会渲染到使用过滤器的模板中
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
Vue.filter('dateTime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
// 日期格式化
// console.log(dayjs().format('YYYY^MM-DD HH:mm:ss'))
// console.log(dayjs('2020-05-13 15:38:30').from(dayjs()))
