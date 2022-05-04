import { createApp } from 'vue'
import Loading from './Loading.vue'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeClass = 'g-relative'

const loadingDirective = {
  mounted (el, binding) {
    // 创建 loading 组件实例
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    // 自定义加载文案
    const title = binding.arg
    if (typeof title !== 'undefined') {
      instance.setTitle(title)
    }
    if (binding.value) {
      append(el)
    }
  },
  updated (el, binding) {
    // 自定义加载文案
    const title = binding.arg
    if (typeof title !== 'undefined') {
      el.instance.setTitle(title)
    }

    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

function append (el) {
  const style = getComputedStyle(el)
  if (['absolute', 'fixed', 'relative'].includes(style.position)) {
    addClass(el, relativeClass)
  }
  el.appendChild(el.instance.$el)
}

function remove (el) {
  removeClass(el, relativeClass)
  el.removeChild(el.instance.$el)
}

export default loadingDirective
