import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入样式文件
import '@/assets/scss/index.scss'
// 图片懒加载
import lazyPlugin from 'vue3-lazy'
// 自定义 loading 指令
import loadingDirective from '@/components/base/loading/directive'
import noResultDirective from '@/components/base/noResult/directive'

const app = createApp(App)

// 配置图片懒加载
app.use(lazyPlugin, {
  loading: require('@/assets/images/default.png'),
  error: require('@/assets/images/default.png')
})

// 注册自定义 loading 加载指令
app.directive('loading', loadingDirective)
// 注册 noResult 指令
app.directive('no-result', noResultDirective)

app.use(store).use(router).mount('#app')
