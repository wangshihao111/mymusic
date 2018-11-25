export default {
  loginState: false, // 登录状态， true 为已登录
  userInfo: {},
  mode: 'sequence', // 播放模式 sequence loop random
  playList: [], // 播放列表,
  playState: 'playing', // 播放状态 只有playing 和 pause 两种状态
  playingSong: {},  // 正在播放的歌曲
  readyState: false, // 歌曲是否准备好播放准备
  progress: 0, // 播放进度
  playIndex: 999999999,
  bigPlayer: false, // 是否使用全屏播放器,
  favSongs: [],
  favChange: false // 收藏改变时触发，不论真假
}