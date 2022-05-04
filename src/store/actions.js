import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'

export function selectPlay ({ commit }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setSequenceList', list)
  commit('setPlaylist', list)
  commit('setCurrentIndex', index)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
}

export function randomPlay ({ commit }, list) {
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSequenceList', list)
  commit('setPlaylist', shuffle(list))
  commit('setCurrentIndex', 0)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
}
