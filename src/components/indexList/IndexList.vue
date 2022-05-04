<template>
  <scroll
    class="index-list"
    :probe-type="3"
    @scroll="onScroll"
    ref="scrollRef"
  >
    <!-- 组列表 -->
    <ul ref="groupRef">
      <li
        v-for="group in data"
        :key="group.title"
        class="group"
      >
        <!-- 每组标题 -->
        <h2 class="title">{{group.title}}</h2>
        <!-- 每组中的歌手 -->
        <ul>
          <li
            v-for="item in group.list"
            :key="item.id"
            class="item"
            @click="onItemClick(item)"
          >
            <img class="avatar" v-lazy="item.pic">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 固定层, 固定当前标题到顶部 -->
    <div
      class="fixed"
      v-show="fixedTitle"
      :style="fixedStyle"
    >
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <!-- 快捷切换每组, 通过事件委托的方式绑定事件 -->
    <div
      class="shortcut"
      @touchstart.stop.prevent="onShortcutStart"
      @touchmove.stop.prevent="onShortcutMove"
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
          class="item"
          :class="{'current':currentIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/components/base/scroll/Scroll.vue'
import useFixed from './useFixed'
import useShortcut from './useShortcut'

export default {
  name: 'index-list',
  components: {
    Scroll
  },
  emits: ['select'],
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props, { emit }) {
    // 固定当前组的标题
    const { groupRef, currentIndex, fixedTitle, fixedStyle, onScroll } = useFixed(props)
    // 快捷导航
    const { scrollRef, shortcutList, onShortcutStart, onShortcutMove } = useShortcut(props, groupRef)

    function onItemClick (item) {
      emit('select', item)
    }

    return {
      onItemClick,
      // fixed
      groupRef,
      currentIndex,
      fixedTitle,
      fixedStyle,
      onScroll,
      // 快捷导航
      scrollRef,
      shortcutList,
      onShortcutStart,
      onShortcutMove
    }
  }
}
</script>

<style lang="scss" scoped>
  .index-list {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    // 组列表区域
    .group {
      padding-bottom: 30px;
      // 每组的标题
      .title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }
      // 每组中的歌手们区域
      .item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .name {
          margin-left: 20px;
          color: $color-text-l;
          font-size: $font-size-medium;
        }
      }
    }
    // 固定层, 固定当前组的标题
    .fixed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .fixed-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }
    }
    // 快捷切换到某组
    .shortcut {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background: $color-background-d;
      font-family: Helvetica;
      .item {
        padding: 3px;
        line-height: 1;
        color: $color-text-l;
        font-size: $font-size-small;
        &.current {
          color: $color-theme
        }
      }
    }
  }
</style>
