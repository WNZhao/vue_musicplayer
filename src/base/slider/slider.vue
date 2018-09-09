<template>
  <div class="slider-box"
       ref="sliderBox">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      boxWidth: 0
    }
  },
  props: ["len"],
  name: "slider",
  mounted () {
    console.log(this.len);
    console.log(this.$refs.sliderBox.offsetWidth)
  }
}
</script>

<style scoped rel="stylesheet/stylus" lang='stylus'>
.slider-box
  height 400px
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
