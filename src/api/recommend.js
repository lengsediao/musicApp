import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getRecommoned () {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiscList () {
  let url = '/api/getDiscList'
  console.log(url)
  const data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return new Promise((resolve, reject) => {
      if (res.data.code === 0) {
        resolve(res.data)
      } else {
        throw new Error(res.data.code)
      }
    }).then((res) => {
      return res
    }).catch((error) => {
      console.log(error)
    })
  })
}

export function getSongs (mid) {
  let url = '/api/getSongs'
  console.log(url)
  const data = Object.assign({}, commonParams, {
    needNewCode: 0,
    platform: 'yqq',
    uin: 0,
    loginUin: 1752551073,
    hostUin: 0,
    format: 'json',
    cid: '205361747',
    songmid: '001Qu4I30eVFYb',
    filename: 'C400' + mid + '.m4a',
    guid: 6021032430
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return new Promise((resolve, reject) => {
      if (res.data.code === 0) {
        resolve(res.data)
      } else {
        throw new Error(res.data.code)
      }
    }).then((res) => {
      return res
    }).catch((error) => {
      console.log(error)
    })
  })
}
