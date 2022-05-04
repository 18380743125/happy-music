<template>
  <div ref="rootRef">
    <slot/>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useScroll from './useScroll'

export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  emits: ['scroll'],
  setup (props, { emit }) {
    const rootRef = ref(null)
    const { scroll } = useScroll(rootRef, props, emit)

    return {
      rootRef,
      scroll
    }
  }
}
</script>

<style>

</style>
