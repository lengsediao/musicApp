
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
export function createSong (musicData, vkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://isure.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${vkey}&guid=6021032430&uin=0&fromtag=66`
  })
}
// http://isure.stream.qqmusic.qq.com/C4000024vbNZ4bQz74.m4a?vkey=7445FB9D9570009CA7CB37285E27667039A41AC59EA5741A35BF5607D5FD2D6F73F0956956B9F32DD2DF55F53AD6A3D73995C527E5E8D80D&guid=6021032430&uin=1752551073&fromtag=66
// http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46
function filterSinger (singer) {
  let singerArray = []
  if (!singer) {
    return ''
  }
  singer.forEach((item) => {
    singerArray.push(item.name)
  })
  return singerArray.join('/')
}

// export function str (mid) {
//   getVkey(mid).then((res) => {
//     console.log(res)
//     console.log('========================')
//     return '123'
//   })
// }

// function getVkey (mid) {
//   // console.log(mid)
//   let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
//   const data = Object.assign({}, commonParams, {
//     needNewCode: 0,
//     platform: 'yqq',
//     uin: 0,
//     loginUin: 1752551073,
//     hostUin: 0,
//     format: 'json',
//     cid: '205361747',
//     songmid: '001Qu4I30eVFYb',
//     filename: 'C400' + mid + '.m4a',
//     guid: 6021032430
//   })
//   return jsonp(url, data, options)
// }
