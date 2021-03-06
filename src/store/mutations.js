const mutations = {
  // 改变播放状态
  setPlayingState (state, playing) {
    state.playing = playing
  },
  // 设置顺序播放列表
  setSequenceList (state, list) {
    state.sequenceList = list
  },
  // 设置真实播放列表
  setPlaylist (state, list) {
    state.playlist = list
  },
  // 设置播放模式
  setPlayMode (state, mode) {
    state.playMode = mode
  },
  // 切歌
  setCurrentIndex (state, index) {
    state.currentIndex = index
  },
  // 设置是否全屏播放
  setFullScreen (state, fullScreen) {
    state.fullScreen = fullScreen
  }
}

export default mutations
