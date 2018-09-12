import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
// import axios from 'axios'

export function getVkey (mid) {
  let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, commonParams, {
    needNewCode: 0,
    platform: 'yqq',
    uin: 0,
    loginUin: 1752551073,
    hostUin: 0,
    format: json,
    cid: '205361747',
    songmid: '001Qu4I30eVFYb',
    filename: 'C400'+ mid +'.m4a',
    guid: 6021032430,
  })
  return jsonp(url, data, options)
}
