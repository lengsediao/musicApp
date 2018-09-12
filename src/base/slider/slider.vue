<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: dotPageIndex === index}"></span>
    </div>
  </div>
</template>
<script>
import {addClass} from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      dots: [],
      dotPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._dotsInit()
      this._inits()
      if (this.autoPlay) {
        this._paly()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth (reSize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0 // sliderGroup宽度
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !reSize) {
        width += 2 * sliderWidth
      }
      console.log(width)
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _dotsInit () {
      this.dots = this.$refs.sliderGroup.children.length
    },
    _inits () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
      this.slider.on('scrollEnd', () => {
        let indexPage = this.slider.getCurrentPage().pageX
        if (this.loop) {
          indexPage -= 1
        }
        this.dotPageIndex = indexPage
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._paly()
        }
      })
    },
    _paly () {
      let pageIndex = this.dotPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .slider
    min-height:1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
          img
            display: block
            width: 100%
    .dots
      position: absolute
      left: 0
      right: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
