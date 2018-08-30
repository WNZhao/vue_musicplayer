<template>
  <div id="app">
    <tab></tab>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
import Tab from 'src/components/tab/tab'
console.log(Tab)
export default {
  name: 'App',
  components: {
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #app
    color: $color-theme
</style>
