import model from './model'
import { getBase64 } from '@/libs/tools'

export default {
  connectDB () {
    return new Promise((resolve, reject) => {
      model.connectDB().then((db) => {
        resolve(db)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  getWebPictureType () {
    return new Promise((resolve, reject) => {
      let storeName = 'pictureTypeDB'
      model.getListByStore(storeName).then(res => {
        resolve(res)
      })
    })
  },
  getWebPictureList () {
    return new Promise((resolve, reject) => {
      let storeName = 'pictureListDB'
      model.getListByStore(storeName).then(res => {
        resolve(res)
      })
    })
  },
  getWebFontList () {
    return new Promise((resolve, reject) => {
      let storeName = 'fontListDB'
      model.getListByStore(storeName).then(res => {
        resolve(res)
      })
    })
  },
  setWebPictureType (da) {
    return new Promise((resolve, reject) => {
      let storeName = 'pictureTypeDB'
      model.clearDataByStore(storeName).then(() => {
        let len = da.length
        for(let i = 0; i < len; i++){
          model.addDataByStore(da[i], storeName).then(() => {
            if(i == len - 1){
              resolve()
            }
          })
        }
      })
    })
  },
  setWebPictureList (da) {
    return new Promise((resolve, reject) => {
      let storeName = 'pictureListDB'
      console.log(da)
      model.clearDataByStore(storeName).then(() => {
        let len = da.length
        for(let i = 0; i < len; i++) {
          getBase64(da[i].i).then(e => {
            da[i].i = e
            model.addDataByStore(da[i], storeName).then(() => {
              if(i == len - 1){
                resolve()
              }
            })
          })
        }
      })
    })
  },
  setWebFontList (da) {
    return new Promise((resolve, reject) => {
      let storeName = 'fontListDB'
      model.clearDataByStore(storeName).then(() => {
        let len = da.length
        for(let i = 0; i < len; i++) {
          getBase64(da[i].f).then(e => {
            da[i].f = e
            model.addDataByStore(da[i], storeName).then(() => {
              if(i == len - 1){
                resolve()
              }
            })
          })
        }
      })
    })
  }
}