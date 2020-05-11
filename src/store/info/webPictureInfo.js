const state = {
  pictureUrl: '',
  pictureName: '',
  pictureWidth: 0,
  pictureHeight: 0,
  pictureOpacity: '100%',
  isReplacePicture: false,
  pictureCount: 0
}

const getters = {
  getPictureUrl (state) {
    return state.pictureUrl
  },
  getPictureName (state) {
    return state.pictureName
  },
  getPictureWidth (state) {
    return state.pictureWidth
  },
  getPictureHeight (state) {
    return state.pictureHeight
  },
  getPictureOpacity (state) {
    return state.pictureOpacity
  },
  getIsReplacePicture (state) {
    return state.isReplacePicture
  },
  getPictureCount (state) {
    return state.pictureCount
  }
}

const mutations = {
  setPictureUrl (state, url) {
    state.pictureUrl = url
  },
  setPictureName (state, name) {
    state.pictureName = name
  },
  setPictureWidth (state, w) {
    state.pictureWidth = w
  },
  setPictureHeight (state, h) {
    state.pictureHeight = h
  },
  setPictureOpacity (state, opacity) {
    state.pictureOpacity = opacity
  },
  setIsReplacePicture (state, b) {
    state.isReplacePicture = b
  },
  setPictureCount (state, n) {
    state.pictureCount = n
  }
}

const actions = {
  initPictureAttribute ({ commit }, obj) {
    commit('setPictureName', obj.name)
    commit('setPictureWidth', obj.width)
    commit('setPictureHeight', obj.height)
    commit('setPictureOpacity', obj.opacity * 100 + '%')
  },
  replacePicture ({ commit, rootState }) {
    let canvas = rootState.editor.canvas
    let picture = canvas.getActiveObject()
    if(!picture.imageType) {
      commit('info/setInfoType', 'webpicbox', {root: true})
      commit('setIsReplacePicture', true)
    }
  },
  initAddPicture ({ commit, dispatch }, obj) {
    // console.log(obj)
    commit('setPictureName', obj.t)
    dispatch('addPicture', obj.i)
  },
  addPicture ({ state, commit, rootState }, url) {
    let canvas = rootState.editor.canvas
    let id = 'webPicture_' + rootState.editor.editIndex
    commit('editor/setEditIndex', rootState.editor.editIndex + 1, {root: true})
    let img = new Image()
    img.src = url

    img.onload = () => {
      let scale = 1
      let top = 0
      let left = 0
      commit('setPictureWidth', img.width)
      commit('setPictureHeight', img.height)

      if(img.width > rootState.gifInfo.gifWidth) {
        scale = rootState.gifInfo.gifWidth / img.width
      }else{
        left = (rootState.gifInfo.gifWidth - img.width) / 2
      }

      if(img.height > rootState.gifInfo.gifHeight) {
        let scaleY = rootState.gifInfo.gifHeight / img.height
        if(scaleY < scale){
          scale = scaleY
          left = (rootState.gifInfo.gifWidth - img.width * scaleY) / 2
        }
        top = (rootState.gifInfo.gifHeight - img.height * scale) / 2
      }else{
        top = (rootState.gifInfo.gifHeight - img.height) / 2
      }
      
      let picObj = new fabric.Image(img, {
        id,
        left,
        top,
        imageType: 0,
        name: state.pictureName,
        scaleX: scale,
        scaleY: scale
      })

      if(state.isReplacePicture) {
        canvas.remove(canvas.getActiveObject())
      }else{
        commit('setPictureCount', state.pictureCount + 1)
      }

      canvas.add(picObj).setActiveObject(picObj)
      canvas.renderAll()

      commit('info/setInfoType', 'webpic', {root: true})
    }
  },
  settingsPicture ({ state, rootState }, obj) {
    let canvas = rootState.editor.canvas
    let picture = canvas.getActiveObject()
    if(picture.type == 'image') {
      switch (obj.type) {
        case 'opacity':
          picture.set({ opacity: parseInt(obj.value)/100 })
          break;
      
        default:
          break;
      }
      canvas.renderAll()
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}