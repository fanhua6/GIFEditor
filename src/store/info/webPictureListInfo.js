import api from '@/libs/api'
import { arrSort } from '@/libs/tools'
import controller from '@/libs/controller'

const state = {
  isConnectDB: false,
  isConnectWeb: true,
  picTypes: [],
  picAllListData: [],
  picListData: [],
  picType: 'all',
  picPageIndex: 1,
  picPageCount: 1,
  pageCapacity: 16
}

const getters = {
  getIsConnectWeb (state) {
    return state.isConnectWeb
  },
  getPicTypes (state) {
    return state.picTypes
  },
  getPicListData (state) {
    return state.picListData
  },
  getPicType (state) {
    return state.picType
  },
  getPicPageIndex (state) {
    return state.picPageIndex
  },
  getPicPageCount (state) {
    return state.picPageCount
  }
}

const mutations = {
  setIsConnectDB (state, b) {
    state.isConnectDB = b
  },
  setIsConnectWeb (state, b) {
    state.isConnectWeb = b
  },
  setPicTypes (state, types) {
    state.picTypes = types
  },
  setPicAllListData (state, da) {
    state.picAllListData = da
  },
  setPicListData (state, da) {
    state.picListData = da
  },
  setPicType (state, t) {
    state.picType = t
  },
  setPicPageIndex (state, i) {
    state.picPageIndex = i
  },
  setPicPageCount (state, n) {
    state.picPageCount = n
  }
}

const actions = {
  main ({ commit, dispatch }) {
    controller.connectDB().then(() => {
      commit('setIsConnectDB', true)
      console.log('%cDB connect success', 'color: green;')
      dispatch('getPictureTypeDB')
      dispatch('getPictureAllListDB')
      this.dispatch('textInfo/getWebFontList')
    })
  },
  getPictureTypeDB ({ commit }) {
    controller.getWebPictureType().then(res => {
      let types = arrSort(res, 'p')
      if(!!res.length){
          types.unshift({
          id: 'all',
          p: '1000000000',
          t: '全部'
        })
      }
      
      // types.push({
      //   id: '12333',
      //   p: '1',
      //   t: '太搞笑'
      // })
      // types.push({
      //   id: '565545',
      //   p: '1',
      //   t: '太搞'
      // })
      // console.log(types)
      commit('setPicTypes', types)
    })
  },
  getPictureAllListDB ({ state, commit, dispatch }) {
    controller.getWebPictureList().then(res => {
      commit('setPicAllListData', res)
      dispatch('getPictureList', { type: state.picType, index: state.picPageIndex })
    })
  },
  /**
   * 
   * @param {*} param0 
   * @param { Object } page page.type/page.index
   */
  getPictureList ({ state, commit }, page) {
    // console.log(state.picAllListData, page.type, page.index)
    let arr = state.picAllListData
    if(page.type != 'all') {
      arr = state.picAllListData.filter(item => item.gid == page.type)
      arr = arrSort(arr, 'p')
    }else{
      arr = arrSort(arr, 'ap')
    }

    commit('setPicPageCount', Math.ceil(arr.length/state.pageCapacity))

    let newarr = []
    let len = state.pageCapacity*page.index < arr.length ? state.pageCapacity*page.index : arr.length
    // console.log(len)
    
    for(let i = state.pageCapacity * (page.index - 1); i < len; i++){
      newarr.push(arr[i])
    }

    // console.log(newarr)

    if(page.index == 1) {
      commit('setPicListData', newarr)
    }else if(page.index > 1 && state.picPageCount >= page.index) {
      commit('setPicListData', state.picListData.concat(newarr))
    }
    // console.log(state.picListData)
  },
  getApiWebPictureData ({ dispatch }) {
    dispatch('getApiWebPictureType')
    dispatch('getApiWebPictureList')
  },
  getApiWebPictureType ({ state, commit, dispatch }) {
    let v = localStorage.getItem('webPicTypeV')
    api.getWebPictureData(0, v).then(da => {
      console.log(da)
      if(da.data.bd.data) {
        let data = arrSort(da.data.bd.data, 'p')
        commit('setPicTypes', data)
        if(state.isConnectDB) {
          controller.setWebPictureType(data).then(() => {
            dispatch('getPictureTypeDB')
            localStorage.setItem('webPicTypeV', da.data.bd.v)
          })
        }else{
          console.log('%c居然没链接成功', 'color: red;')
          controller.connectDB().then(() => {
            controller.setWebPictureType(data).then(() => {
              dispatch('getPictureTypeDB')
              localStorage.setItem('webPicTypeV', da.data.bd.v)
            })
          })
        }
      }else{
        localStorage.setItem('webPicTypeV', da.data.bd.v)
      }
    }).catch(err => {
      if(!err.response){
        //网络异常
        commit('setIsConnectWeb', false)
      }else if(err.response.status == 304) {
        console.log('%cNo picture type data updates', 'color: green;')
      }
    })
  },
  getApiWebPictureList ({ state, commit, dispatch }) {
    let v = localStorage.getItem('webPicListV')
    let picCount = 0
    let picPageCount = 0
    api.getWebPictureData(1, v, 1).then(da => {
      console.log(da)
      let data = da.data.bd.data
      picCount = da.data.bd.ct
      picPageCount = da.data.bd.ps
      console.log(picPageCount)
      
      if(picPageCount > 1) {
        for(let i = 1; i < picPageCount; i++) {
          api.getWebPictureData(1, v, (i + 1)).then(res => {
            data = data.concat(res.data.bd.data)
            if(data.length == picCount){
              if(state.isConnectDB) {
                controller.setWebPictureList(data).then(() => {
                  // 数据库存储成功
                  dispatch('getPictureAllListDB', { type: state.picType, index: state.picPageIndex })
                  localStorage.setItem('webPicListV', res.data.bd.v)
                })
              }else{
                console.log('%c居然没链接成功', 'color: red;')
                controller.connectDB().then(() => {
                  controller.setWebPictureType(data).then(() => {
                    dispatch('getPictureAllListDB', { type: state.picType, index: state.picPageIndex })
                    localStorage.setItem('webPicListV', res.data.bd.v)
                  })
                })
              }
            }
          })
        }
      }else if(picPageCount == 1){
        if(state.isConnectDB) {
          controller.setWebPictureList(data).then(() => {
            // 数据库存储成功
            dispatch('getPictureAllListDB', { type: state.picType, index: state.picPageIndex })
            localStorage.setItem('webPicListV', da.data.bd.v)
          })
        }else{
          console.log('%c居然没链接成功', 'color: red;')
          controller.connectDB().then(() => {
            controller.setWebPictureType(data).then(() => {
              dispatch('getPictureAllListDB', { type: state.picType, index: state.picPageIndex })
              localStorage.setItem('webPicListV', da.data.bd.v)
            })
          })
        }
      }else{
        localStorage.setItem('webPicListV', da.data.bd.v)
      }
    }).catch(err => {
      if(!err.response){
        //网络异常
        commit('setIsConnectWeb', false)
      }else if(err.response.status == 304) {
        console.log('%cNo picture list data updates', 'color: green;')
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}