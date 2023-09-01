import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'

// 引入vant组件的样式
import 'vant/lib/index.css';

import './assets/common.scss'

// import { Tabbar, TabbarItem } from 'vant';

const app = createApp(App)
// app.use(Tabbar).use(TabbarItem)
app.use(router)


const rootValue = 16
const rootWidth = 390
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = deviceWidth * rootValue / rootWidth + 'px'

app.mount('#app')


