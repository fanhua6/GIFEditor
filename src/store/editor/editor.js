const state = {
  canvas: null,
  editIndex: 1,
  // activeObj: null,
  activeObj: {text: ''},
  animateObj: {},
  initDrawing: false,
  isDrawing: false,
  isKeyDownShift: false
}

const getters = {
  getCanvas (state) {
    return state.canvas
  },
  getEditIndex (state) {
    return state.editIndex
  },
  getActiveObj (state) {
    return state.activeObj
  },
  getAnimateObj (state) {
    return state.animateObj
  },
  getInitDrawing (state) {
    return state.initDrawing
  },
  getIsDrawing (state) {
    return state.isDrawing
  },
  getIsKeyDownShift (state) {
    return state.isKeyDownShift
  }
}

const mutations = {
  setCanvas (state, c) {
    state.canvas = c
  },
  setEditIndex (state, i) {
    state.editIndex = i
  },
  setActiveObj (state, o) {
    state.activeObj = o
  },
  addAnimateObj (state, obj) {
    state.animateObj[obj.id] = obj
  },
  deleteAnimateObj (state, id) {
    delete state.animateObj[id]
  },
  setInitDrawing (state, b) {
    state.initDrawing = b
  },
  setIsDrawing (state, b) {
    state.isDrawing = b
  },
  setIsKeyDownShift (state, b) {
    state.isKeyDownShift = b
  }
}

const actions = {
  // addText ({ state, rootState, commit, dispatch }) {
  //   let id = 'text_' + state.editIndex
  //   commit('setEditIndex', state.editIndex + 1)
  //   let text = new fabric.Textbox('', {
  //     id: id,
  //     type: 'textbox',
  //     left: parseInt(rootState.gifInfo.gifWidth/2 - 90),
  //     top: parseInt(rootState.gifInfo.gifHeight/2 - 12),
  //     oldTop: parseInt(rootState.gifInfo.gifHeight/2 - 12),
  //     width: 180,
  //     height: 80,
  //     fontSize: 24,
  //     oldFontSize: 24,
  //     centeredScaling: true,
  //     fill: rootState.textInfo.textColor,
  //     fontFamily: rootState.textInfo.textFamily,
  //     borderColor: 'rgba(160,160,160,1)',
  //     borderDashArray: [4, 2],
  //     cornerColor: '#00a0e9',
  //     cornerStrokeColor: 'rgba(160,160,160,1)',
  //     cornerStyle: 'circle',
  //     transparentCorners: false,
  //     cornerSize: 7,
  //     rotatingPointOffset: 30,
  //     textAlign: 'center',
  //     animateType: 'none',
  //     dirty: true,
  //     selectionBackgroundColor: 'rgba(0,0,0,.18)',
  //     padding: 10,
  //   })

  //   text.on('moving', e => {
  //     text.oldTop = text.top
  //     text.oldLeft = text.left
      
  //   })

  //   text.on('changed', e => {
  //     this.dispatch('textInfo/setText', text.text)
  //   })

  //   state.canvas.add(text).setActiveObject(text)
  // },
  deleteActiveObject ({ state, commit, rootState }) {
    let obj = state.canvas.getActiveObject()
    if(obj && state.animateObj[obj.id]){
      commit('deleteAnimateObj', obj.id)
    }
    
    switch (obj.type) {
      case 'image':
        commit('pictureInfo/setPictureCount', rootState.pictureInfo.pictureCount - 1, {root: true})
        break;
    
      default:
        break;
    }

    state.canvas.remove(obj)
    commit('info/setInfoType', 'gif', {root: true})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}