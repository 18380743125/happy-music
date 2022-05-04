import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeClass = 'g-relative'

export default function createLoadingLikeDirective (Component) {
  const cname = Component.name
  return {
    mounted (el, binding) {
      // 创建 loading 组件实例
      const app = createApp(Component)
      const instance = app.mount(document.createElement('div'))
      // const cname = Component.cname
      if (!el[cname]) {
        el[cname] = {}
      }
      el[cname].instance = instance
      // 自定义加载文案
      const title = binding.arg
      if (typeof title !== 'undefined') {
        el[cname].instance.setTitle(title)
      }
      if (binding.value) {
        append(el)
      }
    },
    updated (el, binding) {
      // 自定义加载文案
      const title = binding.arg
      if (typeof title !== 'undefined') {
        el[cname].instance.setTitle(title)
      }

      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }

  // 将组件挂载到对应 dom 节点中
  function append (el) {
    // 判断要挂载的 dom 上是否存在定位
    const style = getComputedStyle(el)
    if (['absolute', 'fixed', 'relative'].includes(style.position)) {
      addClass(el, relativeClass)
    }
    el.appendChild(el[cname].instance.$el)
  }

  function remove (el) {
    removeClass(el, relativeClass)
    el.removeChild(el[cname].instance.$el)
  }
}
