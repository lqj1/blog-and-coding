1. 后台服务

   其中 https://neteasecloudmusicapi.vercel.app/#/ 为后台参考地址，进入 NeteaseCloudMusicApi 之后，第一次需要安装依赖npm install，之后通过 node app.js 就可以启动本地的后台服务。

2. 注意：
    - wangyiyun 为前端项目vue2版本，不能使用vue3语法，
    - music-wangyiyun是vue3版本，但是安装swiper遇到各种问题
    - 最终通过在 package.json 中填写 swiper 版本为 6.7.5，然后删除 node_modules，重新 npm install
    - 判断为 7.0 以上的 swiper 有很多bug

3. 前端直接使用vue3的music-wangyiyun即可