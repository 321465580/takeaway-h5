import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
// 引入插件
import lazyPlugin from './directives/lazyLoading';

// 引入pinia
import { createPinia } from "pinia";
const pinia = createPinia();

// 引入vant组件的样式
import 'vant/lib/index.css';

import './assets/common.scss'

// import { Tabbar, TabbarItem } from 'vant';

const app = createApp(App)
app.use(pinia);
// app.use(Tabbar).use(TabbarItem)
app.use(router)
// 注册插件
app.use(lazyPlugin)

const rootValue = 16
const rootWidth = 390
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = deviceWidth * rootValue / rootWidth + 'px'

app.mount('#app')


