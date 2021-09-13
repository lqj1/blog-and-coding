import { createStore } from 'vuex';
// import api from '@/api/index';
import axios from 'axios'
// import mutations from './mutations';
// import actions from './actions';
// import getters from './getters';
import { useStore } from "vuex";
const state = {};
export default createStore({
  state: {
    playlist: [{
      name: "起风了",
      id: 1330348068,
      al: {
        id: 74715426,
        name: "起风了",
        pic: 109951163699673360,
        picUrl: "http://p4.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg",
        pic_str: "109951163699673355",
        tns: []
      },
    }],
    playCurrentIndex: 0,
    lyric: '', //因为歌词需要全局使用，所以放在store中
    currentTime: 0, // 当前音乐时间
    intervalId: 0, // 间隔id
  },
  getters: {
    // 计算属性，实现歌词展示
    lyricList: function (state) {
      let arr = state.lyric.split(/\n/igs).map((item:any, i:any, arr) => {
        let min = parseInt(item.slice(1, 3))
        let sec = parseInt(item.slice(4, 6))
        let mill = parseInt(item.slice(7, 10))
        let lyric = item.slice(11, item.length)
        let time = mill + sec*1000 + min*60*1000
        // console.log(min,sec,mill,lyric,time);
        return {
          min, sec, mill, lyric,
          content: item,
          time
        }
      })
      arr.forEach((item:any, i) => {
        if (i===0) {
          item.pre = 0
        } else {
          item.pre = arr[i-1].time
        }
      })
      return arr
    }
  },
  mutations: {
    setPlaylist: function(state, value) {
      // console.log(value);
      state.playlist = value;
    },
    // 修改播放第几首
    setPlayIndex (state, val) {
      state.playCurrentIndex = val
    },
    // 修改歌詞
    setLyric (state, value) {
      // console.log('value', value);
      state.lyric = value
    },
    // 每一秒钟更新时间
    setCurrentTime (state, value) {
      state.currentTime = value
    }
  },
  actions: {
    // 异步获取歌词，导入方法有问题，就整个写
    async reqLyric (context, payload) {
      let baseUrl = 'http://localhost:3000'
      let res = await axios.get(`${baseUrl}/lyric?id=${payload.id}`)
      // console.log('res', res.data.lrc.lyric)
      context.commit('setLyric', res.data.lrc.lyric)
    },
    // updateTime (context) {
    //   context.state.intervalId = setInterval(() => {
    //     context.commit('setCurrentTime', context.state.currentTime++)
    //   })
    // }
  },
});
