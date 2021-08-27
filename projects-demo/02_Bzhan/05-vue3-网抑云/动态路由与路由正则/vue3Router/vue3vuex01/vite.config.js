// 配置解决跨域问题，服务器之间一般不会有跨域问题，主要是浏览器客户端做了限制
module.exports = {
  // devServer: {  // vue.config.js 中需要写这一层，vite中不需要
  // 配置代理
  proxy: {
    // 通过这种设置，到时候 axios 请求的前缀地址就变为 api
    '/api': {
      // 目标，代理地址，无法访问到的目的地
      target: 'https://pvp.qq.com/', // 王者荣耀官网
      // 是否允许跨域
      changeOrigin: true,
      // 设置重写
      rewrite: path => path.replace(/^\/api/, ''), //api变成空字符串
    },
  },
  // },
};
// 例如 请求 api = '/api/web2323/js/herolist.json'
// 通过代理变成  https://pvp.qq.com/web2323/js/herolist.json
// 先拼接，然后把 /api 字符串变成 空
