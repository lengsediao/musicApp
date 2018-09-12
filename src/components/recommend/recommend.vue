<template>
    <div class="recommend">
      <scroll class="recommend-content" :data="descList">
        <div>
          <div class="slider-wrapper" v-if="recommend.length">
            <slider>
              <div v-for="item in recommend" :key="item.id">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" alt="轮播图"/>
                </a>
              </div>
            </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li class="item" v-for="item in descList" :key="item.listennum">
                <div class="icon">
                  <img v-lazy="item.imgurl" width="60" height="60" />
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!descList.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Slider from 'base/slider/slider'
import {getRecommoned, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
  components: {
    Slider,
    Scroll,
    Loading
  },
  data () {
    return {
      recommend: [],
      descList: []
    }
  },
  created () {
    this._getRecommend()
    setTimeout(() => {
      this._getDiscList()
    }, 2000)
  },
  methods: {
    _getRecommend () {
      let _this = this
      getRecommoned().then((res) => {
        if (res.code === ERR_OK) {
          _this.recommend = res.data.slider
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.descList = res.data.list
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          text-align: center
          line-height: 65px
          color: $color-theme
          font-size: $font-size-medium
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-text-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
          position: absolute
          width: 100%
          top: 50%
          transform: translateY(-50%)
</style>
