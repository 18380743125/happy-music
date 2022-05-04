import { computed, nextTick, ref, watch } from 'vue'

export default function useFixed (props) {
  // 固定区域高度
  const TITLE_HEIGHT = 30
  // 组 ref 实例
  const groupRef = ref(null)
  // 每组的区间
  const listHeights = ref([])
  // 滚动的高度
  const scrollY = ref(0)
  // 当前组列表的索引
  const currentIndex = ref(0)
  // 当前组的下一个组距离顶部距离
  const distance = ref(0)

  // 固定标题
  const fixedTitle = computed(() => {
    if (scrollY.value < 0) return ''
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  // 固定区域向上偏移量
  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0, ${diff}px, 0)`
    }
  })

  // 监听数据变化, 当 dom 渲染完成后计算高度
  watch(() => props.data, async () => {
    await nextTick()
    calculate()
  })

  // 监听滚动
  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i + 1]
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })

  // 计算每组区间高度范围
  function calculate () {
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value
    let height = 0
    // 计算之前清空高度区间
    listHeightsVal.length = 0
    listHeightsVal.push(height)
    // 计算吗每组的高度区间
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }

  // 监听滚动位置
  function onScroll (pos) {
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    currentIndex,
    fixedTitle,
    fixedStyle,
    onScroll
  }
}
