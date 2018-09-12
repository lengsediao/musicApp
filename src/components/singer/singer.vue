<template>
    <div class="singer">
      <list-view @select="selectSinger" :data="singers"></list-view>
      <router-view></router-view>
    </div>
</template>
<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import listView from 'base/listview/listview'
import {mapMutations} from 'vuex'
const HOT_SINGER_LEN = 10
const HOT_NAME = '最热'
export default {
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingers()
  },
  components: {
    listView
  },
  methods: {
    selectSinger (singer) {
      console.log(singer.id)
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingers () {
      getSingerList().then(res => {
        if (ERR_OK === res.code) {
          this.singers = this._normaLizeSinger(res.data.list)
          console.log(this.singers)
        }
      })
    },
    _normaLizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.item.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          }
        }
        map[key].item.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 有序列表 处理map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
