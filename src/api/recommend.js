/* eslint-disable */
import jsonp from 'common/js/jsonp';
import axios from 'axios';
import {
  commonParams,
  options
} from './config'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
    // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg'
    const url = '/api/getDiscList'
    const data  = Object.assign({}, commonParams, {
        platform: 'yyq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
      })
    // return jsonp(url, data, options)
    return axios.get(url,{
        params: data
    }).then((res) => {
        return Promise.resolve(res.data);
    })
}

function getPlaylistTags(data){
    console.log(data)
}
window.getPlaylistTags= getPlaylistTags;