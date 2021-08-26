import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';
// 使用路由
const app = createApp(App);
app.use(router);
app.mount('#app');
