<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSongs} from 'api/recommend'
// import {getVkey} from 'api/song'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import musicList from 'components/music-list/music-list'

export default {
  components: {
    musicList
  },
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      console.log(this.singer.avatar)
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    // console.log(this.singer)
    this._singerDetail()
  },
  methods: {
    _singerDetail () {
      let _this = this
      if (!this.singer.id) {
        this.$router.push({path: '/singer'})
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          _this.songs = this._normalizeSongs(res.data.list)
          // console.log(songs)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        // console.log(musicData)
        if (musicData.songid && musicData.albummid && musicData.songmid) {
          getSongs(musicData.songmid).then((res) => {
            if (res.code === ERR_OK) {
              let getVKey = res.data.items[0].vkey
              // console.log(getVKey)
              ret.push(createSong(musicData, getVKey))
            }
          })
        }
      })
      return ret
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable";
  .slide-enter-active,.slide-leave-active
    transition: all 1s
  .slide-enter,.slide-leave-to
    transfrom: translate3d(100%,0,0)
</style>
