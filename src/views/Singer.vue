<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger" />
    <router-view appear
      v-slot="{ Component }"
    >
      <transition name="slide">
        <component :is="Component" :singer="singer" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/indexList/IndexList.vue'

export default {
  name: 'singer',
  components: {
    IndexList
  },
  data () {
    return {
      singers: [],
      singer: null
    }
  },
  async created () {
    const result = await getSingerList()
    this.singers = result.singers
  },
  methods: {
    selectSinger (singer) {
      this.singer = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${this.singer.mid}`
      })
    },
    cacheSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  }
}
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
