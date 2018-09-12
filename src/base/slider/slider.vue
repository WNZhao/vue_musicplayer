<template>
  <div class="slider-box"
       :style="boxWidths"
       ref="sliderBox">
    <slot :width="itemWidth"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      boxWidths: {
        width: 'auto'
      },
      itemWidth: 'auto'
    }
  },
  props: ["len", "recommends"],
  name: "slider",
  methods: {
    computeWidth () {
      const len = this.len;
      // document.defaultView.getComputedStyle(html,null).width
      const wrapperWidth = window.innerWidth;
      const boxWidths = len * wrapperWidth + wrapperWidth;
      this.boxWidths.width = boxWidths + 'px';
      this.itemWidth = wrapperWidth + 'px';
      return boxWidths;
    },
    throttle (fn, sec = 300) {
      let timeout = null;
      return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          fn()
        }, sec);
      }
    }
  },
  mounted () {
    const that = this;
    that.computeWidth();
    window.onresize = this.throttle(function () {
      that.computeWidth()
    }, 300)
  },
  destroyed () {
    window.onresize = null
  }
}
</script>

<style scoped rel="stylesheet/stylus" lang='stylus'>
.slider-box
  height 260px
  overflow hidden
  position relative
  .slider-item
    height 100%
    .slider-img-link
      display block
      height 100%
      img
        width 100%
        height 100%
</style>
