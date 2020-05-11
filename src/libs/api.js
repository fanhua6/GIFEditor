import axios from 'axios'

axios.defaults.timeout = 5000

const urls = {
  picUrl: 'https://api4.minibai.com/g/1/gfc.api',
  fontUrl: 'https://api4.minibai.com/g/1/gft.api'
}

export default {
  /**
   * t: type -> int; 0 = '分组' 1 = '图片'
   * v: type -> int; 版本号
   * p: type -> int; t = 1时有效， 分页数
   */
  getWebPictureData (t, v, p) {
    let params = { t,v,p }
    return new Promise((resolve, reject) => {
      axios.get(urls.picUrl, {
        params
      }).then(e => {
        resolve(e)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * t: type -> int; 0 = '分组' 1 = '图片'
   * v: type -> int; 版本号
   */
  getWebFontData (v, t = 0) {
    let params = { t, v }
    return new Promise((resolve, reject) => {
      axios.get(urls.fontUrl, {
        params
      }).then(e => {
        resolve(e)
      }).catch(err => {
        reject(err)
      })
    })
  }
}