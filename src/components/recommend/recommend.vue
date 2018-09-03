<template>
  <span>recommend</span>
</template>

<script type="text/escmascript-6">
/* eslint-disable */
import {getRecommend} from '../../api/recommend'
import {ERR_OK} from '../../api/config'
export default {
  name: 'recommend',
  created(){
    this._getRecommend()
  },
  methods:{
      _getRecommend(){
          getRecommend()
          .then((res)=>{
              if(res.code === ERR_OK){
                  console.log(res.data.slider);
                  
              }
          })
      }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
