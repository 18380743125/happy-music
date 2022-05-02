<template>
  <m-header/>
  <tab />
  <router-view />
</template>

<script>
import Header from '@/components/header/Header.vue'
import Tab from '@/components/tab/Tab.vue'
export default {
  components: {
    MHeader: Header,
    Tab
  }
}
</script>
