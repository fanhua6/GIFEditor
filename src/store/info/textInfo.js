import api from '@/libs/api'
import { arrSort } from '@/libs/tools'
import controller from '@/libs/controller'

const state = {
  text: '',
  textColor: '#ffffff',
  textFamily: '思源黑体',
  families: [
    // {
    //   t: '思源黑体',
    //   name: '思源黑体'
    // },
    //  {
    //   t: '站酷文艺',
    //   name: '站酷文艺'
    // }, {
    //   t: '庞门正道',
    //   name: '庞门正道'
    // }, 
  ],
  textAnimate: 'none',
  fontList: []
}

const getters = {
  getText (state) {
    return state.text
  },
  getTextColor (state) {
    return state.textColor
  },
  getTextFamily (state) {
    return state.textFamily
  },
  getFamilies (state) {
    return state.families
  },
  getTextAnimate (state) {
    return state.textAnimate
  },
  getFontList (state) {
    return state.fontList
  }
}

const mutations = {
  setText (state, t) {
    state.text = t
  },
  setTextColor (state, c) {
    state.textColor = c
  },
  setTextFamily (state, tf) {
    state.textFamily = tf
  },
  setFamilies (state, list) {
    state.families = list
  },
  setTextAnimate (state, ani) {
    state.textAnimate = ani
  },
  setFontList (state, list) {
    state.fontList = list
  }
}

const actions = {
  initFont ({ dispatch, rootState }) {
    // console.log(rootState.webPictureListInfo.isConnectDB)
    // dispatch('getWebFontList')
    dispatch('getApiWebFontList')
  },
  getWebFontList ({ commit }) {
    let arr = [{ t: '思源黑体' }]
    commit('setFamilies', arr)
    controller.getWebFontList().then(res => {
      res.forEach(i => {
        let str = `@font-face {
          font-family:'${i.t}';
          src: local('${i.t}'),
          url('${i.f}');
        }`
        
        let style = document.createElement('style')
        let cssText = document.createTextNode(str)
        style.appendChild(cssText)

        let heads = document.getElementsByTagName('head')
        heads[0].appendChild(style)
      });
      res = arrSort(res, 'p')
      
      res.forEach(i => {
        arr.push(i)
      })
      commit('setFamilies', arr)
    })
  },
  getApiWebFontList ({ dispatch, rootState }) {
    let v = localStorage.getItem('webFontV')
    api.getWebFontData(v, 0).then(da => {
      let data = arrSort(da.data.bd.data, 'p')
      if(rootState.webPictureListInfo.isConnectDB) {
        controller.setWebFontList(data).then(() => {
          dispatch('getWebFontList')
          localStorage.setItem('webFontV', da.data.bd.v)
        })
      }else{
        controller.connectDB().then(() => {
          controller.setWebFontList(data).then(() => {
            dispatch('getWebFontList')
            localStorage.setItem('webFontV', da.data.bd.v)
          })
        })
      }
    }).catch(err => {
      if(err.response.status == 304) {
        console.log('%cNo fonts data updates', 'color: green;')
      }else{
        //网络异常
        console.error(err)
      }
    })
  },
  setText ({ commit }, t) {
    commit('setText', t)
  },
  addText ({ state, rootState, commit }) {
    let canvas = rootState.editor.canvas
    let id = 'text_' + rootState.editor.editIndex
    commit('editor/setEditIndex', rootState.editor.editIndex + 1, {root: true})
    let text = new fabric.Textbox('', {
      id: id,
      type: 'textbox',
      left: parseInt(rootState.gifInfo.gifWidth/2 - 90),
      top: parseInt(rootState.gifInfo.gifHeight/2 - 12),
      oldTop: parseInt(rootState.gifInfo.gifHeight/2 - 12),
      width: 180,
      height: 80,
      fontSize: 24,
      oldFontSize: 24,
      centeredScaling: true,
      fill: state.textColor,
      fontFamily: state.textFamily,
      borderColor: 'rgba(160,160,160,1)',
      borderDashArray: [4, 2],
      cornerColor: '#00a0e9',
      cornerStrokeColor: 'rgba(160,160,160,1)',
      cornerStyle: 'circle',
      transparentCorners: false,
      cornerSize: 7,
      rotatingPointOffset: 30,
      textAlign: 'center',
      animateType: 'none',
      dirty: true,
      selectionBackgroundColor: 'rgba(0,0,0,.18)',
      padding: 10,
    })

    text.on('moving', e => {
      text.oldTop = text.top
      text.oldLeft = text.left
      
    })

    text.on('changed', e => {
      dispatch('setText', text.text)
    })

    canvas.add(text).setActiveObject(text)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}