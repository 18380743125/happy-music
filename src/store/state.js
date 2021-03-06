import { PLAY_MODE } from '@/assets/js/constant'

const state = {
  // 顺序播放列表
  sequenceList: [],
  // 真实播放列表
  playlist: [],
  // 是否在播放
  playing: false,
  // 播放模式
  playMode: PLAY_MODE.sequence,
  // 当前播放索引
  currentIndex: 0,
  // 是否全屏播放
  fullScreen: false
}

export default state
