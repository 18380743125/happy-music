import { computed, ref } from 'vue'

export default function useShortcut (props, groupRef) {
  // 锚点高度
  const ANCHOR_HEIGHT = 18
  // 滚动实例 ref
  const scrollRef = ref(null)
  // 快捷标题
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  const touch = {}

  // 监听触摸开始
  function onShortcutStart (e) {
    // 点击的目标对象索引
    const anchorIndex = parseInt(e.target.dataset.index)
    // 开始 y 坐标
    touch.y1 = e.touches[0].pageY
    // 开始组的索引
    touch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }

  // 监听触摸中(滑动时)
  function onShortcutMove (e) {
    touch.y2 = e.touches[0].pageY
    // | 0 代表向下取整
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }

  function scrollTo (anchorIndex) {
    if (isNaN(anchorIndex)) return
    // 预防边界情况
    anchorIndex = Math.max(0, Math.min(shortcutList.value.length - 1, anchorIndex))
    // 滚动的元素
    const targetEl = groupRef.value.children[anchorIndex]
    // 拿到 scroll 组件实例
    const scroll = scrollRef.value.scroll
    // 滚动到指定位置上
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    scrollRef,
    shortcutList,
    onShortcutStart,
    onShortcutMove
  }
}
