<template>
  <div class="recommend"
       ref="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length"
           class="slider-wrapper"
           ref="sliderWrapper">
           &nbsp;
        <slider v-if="recommends.length"
                :len="recommends.length">
          <template slot-scope="cssObj">
            <div class="slider-item"
                 v-for="item in recommends"
                 :style="cssObj"
                 :key="item.id">
              <a class="slider-img-link"
                 :href="item.linkUrl">
                <img class="needsclick"
                     @load="loadImage"
                     :src="item.picUrl">
              </a>
            </div>
          </template>

        </slider>
      </div>
      
        <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
            <li v-for="item in discList" class="item" :key="item.dissid">
                <div class="icon">
                    <img :src="item.imgurl" alt="." width="60" height="60">
                </div>
                <div class="text">
                    <h2 class="name" v-html="item.creator.name"></h2>
                    <p class="desc" v-html="item.dissname"></p>
                </div>
            </li>
        </ul>
      </div>
      
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''

      this.$refs.recommend.style.bottom = bottom
    },
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = true
      }
    },
    selectItem (item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
          if (res.code === ERR_OK){
              this.discList = res.data.list;
          }
      })
    }
  },
  components: {
    Slider,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.recommend
  position fixed
  width 100%
  top 88px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      height 260px
      overflow hidden
    .recommend-list
      overflow auto 
      height 100%
      .list-title
        height 65px
        line-height 65px
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        display flex
        box-sizing border-box
        color red
        align-items center
        padding 0 20px 20px 20px
        .icon
          flex 0 0 60px
          width 60px
          padding-right 20px
        .text
          display flex
          flex-direction column
          justify-content center
          flex 1
          line-height 20px
          overflow hidden
          font-size $font-size-medium
          .name
            margin-bottom 10px
            color $color-text
          .desc
            color $color-text-d
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
