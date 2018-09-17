<template>
  <div class="slider-box"
       :style="boxWidths"
       ref="sliderBox">
    <slot :width="itemWidth+'px'"></slot>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: ["len", "recommends"],
  data () {
    return {
      currentIdx: 0,
      boxWidths: {
        width: 'auto',
        left: 0
      },
      itemWidth: 'auto',
      direction: -1, // 1向右 -1向左
      step: 25, //步长
      isAuto: true //轮播自动播放
    }
  },
  name: "slider",
  methods: {
    computeWidth () {
      const len = this.len;
      // document.defaultView.getComputedStyle(html,null).width
      const wrapperWidth = window.innerWidth;
      const boxWidths = len * wrapperWidth + wrapperWidth;
      this.boxWidths.width = boxWidths;
      this.itemWidth = wrapperWidth;
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
    },
    calculPos () {
      const { step } = this;
      const itemWidth = this.itemWidth;
      // 向左
      /* if (this.currentIdx + 1 >= this.len) {
        this.currentIdx = 0;
      }
      let currentLeft = this.currentIdx * itemWidth;
      this.currentIdx = this.currentIdx + 1;
      let targetLeft = this.currentIdx * itemWidth;
      const interval = setInterval(() => {
        if (targetLeft > currentLeft) {
          currentLeft += step;
        } else {
          currentLeft = targetLeft;
        }
        this.boxWidths.left = this.direction * currentLeft + 'px';
        if (currentLeft == targetLeft) {
          // 移动到指定位置时停止移动
          clearInterval(interval);
          if (this.isAuto === true) {
            let t = setTimeout(() => {
              this.calculPos();
              if (t) {
                clearTimeout(t);
              }
            }, 1500);
          }
        }
      }, 25); */
      // 向右
      if (this.currentIdx == 0) {
        this.currentIdx = this.len;
      }

      let currentLeft = this.currentIdx * itemWidth;
      this.currentIdx = this.currentIdx - 1;
      let targetLeft = this.currentIdx * itemWidth;
      const interval = setInterval(() => {
        if (targetLeft < currentLeft) {
          currentLeft -= step;
        } else {
          currentLeft = targetLeft;
        }
        this.boxWidths.left = this.direction * currentLeft + 'px';
        if (currentLeft == targetLeft) {
          // 移动到指定位置时停止移动
          clearInterval(interval);
          if (this.isAuto === true) {
            let t = setTimeout(() => {
              this.calculPos();
              if (t) {
                clearTimeout(t);
              }
            }, 1500);
          }
        }
      }, 25);
    },
    adjustWidth () {
      const that = this;
      that.computeWidth();
      window.onresize = this.throttle(function () {
        that.computeWidth()
      }, 300)
    },
    parepareSlider () {
      this.adjustWidth();
      const { isAuto } = this;
      if (isAuto) {
        const t = setTimeout(() => { this.calculPos(); clearTimeout(t) }, 1000)
      }
    }
  },
  mounted () {
    this.parepareSlider();
  },
  destroyed () {
    window.onresize = null
  }
}
</script>

<style scoped rel="stylesheet/stylus" lang='stylus'>
.slider-wrapper
  position relative
  .slider-box
    height 260px
    overflow hidden
    position absolute
    white-space nowrap
    font-size 0
    top 0
    .slider-item
      height 100%
      display inline-block
      .slider-img-link
        display block
        height 100%
        img
          width 100%
          height 100%
</style>
