const state = {
  fillColor: '#ffffff',
  borderType: '',
  borderColor: '#ffffff',
  borderWidth: '3px',
  rectOpacity: '100%',
  isDraw: false,
  rectClientX: 0,
  rectClientY: 0,
  temporaryRect: {
    fill: '#000',
    opacity: 0.2,
    stroke: '#ffffff',
    strokeDashArray: [4, 4],
    strokeWidth: 1,
    top: 0,
    left: 0
  },
  temporaryRectTop: 0,
  temporaryRectLeft: 0,
  rectCanvaseObj: null
}

const getters = {
  getFillColor (state) {
    return state.fillColor
  },
  getBorderType (state) {
    return state.borderType
  },
  getBorderColor (state) {
    return state.borderColor
  },
  getBorderWidth (state) {
    return state.borderWidth
  },
  getRectOpacity (state) {
    return state.rectOpacity
  },
  getIsDraw (state) {
    return state.isDraw
  },
}

const mutations = {
  setFillColor (state, color) {
    state.fillColor = color
  },
  setBorderType (state, type) {
    state.borderType = type
  },
  setBorderColor (state, color) {
    state.borderColor = color
  },
  setBorderWidth (state, width) {
    state.borderWidth = width
  },
  setRectOpacity (state, opacity) {
    state.rectOpacity = opacity
  },
  setIsDraw (state, b) {
    state.isDraw = b
  },
  setRectClientX (state, x) {
    state.rectClientX = x
  },
  setRectClientY (state, y) {
    state.rectClientY = y
  },
  setRectCanvaseObj (state, obj) {
    state.rectCanvaseObj = obj
  }
}

const actions = {
  initRectAttribute ({ commit }, obj) {
    commit('setFillColor', obj.fill)
    commit('setBorderType', obj.borderType)
    commit('setBorderColor', obj.stroke)
    commit('setBorderWidth', obj.strokeWidth + 'px')
    commit('setRectOpacity', obj.opacity * 100 + '%')
  },
  initDrawingRect ({ rootState }) {
    
  },
  startDrawingRect ({ state, commit, rootState }, e) {
    let canvas = rootState.editor.canvas
    commit('setRectClientX', e.clientX)
    commit('setRectClientY', e.clientY)
    state.temporaryRect.top = e.offsetY
    state.temporaryRect.left = e.offsetX

    commit('setRectCanvaseObj', new fabric.Rect(state.temporaryRect))
    canvas.add(state.rectCanvaseObj)
  },
  darwingTemporaryRect ({ rootState }, e) {
    let canvas = rootState.editor.canvas
    let w = e.clientX - state.rectClientX
    let h = rootState.editor.isKeyDownShift ? (e.clientY - state.rectClientY < 0 ? (w < 0 ? w : -w) : (w < 0 ? -w : w)) : e.clientY - state.rectClientY
    state.rectCanvaseObj.set({width: w, height: h})
    canvas.renderAll()
  },
  addRect ({ state, commit, rootState }) {
    let canvas = rootState.editor.canvas
    if(Math.abs(state.rectCanvaseObj.width) < 30 || Math.abs(state.rectCanvaseObj.height) < 30){
      commit('editor/setInitDrawing', true, {root: true})
      commit('editor/setIsDrawing', false, {root: true})
      commit('tips/setErrorText', '绘制区域过小，请重新绘制', {root: true})
      commit('tips/setIsShowError', true, {root: true})
      canvas.remove(state.rectCanvaseObj)
    }else{
      let id = 'rect_' + rootState.editor.editIndex
      commit('editor/setEditIndex', rootState.editor.editIndex + 1, {root: true})
      
      let rectObj = new fabric.Rect({
        id,
        type: 'rect',
        borderType: state.borderType,
        top: state.rectCanvaseObj.height < 0 ? state.rectCanvaseObj.top + state.rectCanvaseObj.height : state.rectCanvaseObj.top,
        left: state.rectCanvaseObj.width < 0 ? state.rectCanvaseObj.left + state.rectCanvaseObj.width : state.rectCanvaseObj.left,
        width: Math.abs(state.rectCanvaseObj.width),
        height: Math.abs(state.rectCanvaseObj.height),
        fill: state.fillColor,
        opacity: parseInt(state.rectOpacity)/100,
        stroke: state.borderType ? state.borderColor : '',
        strokeWidth: parseInt(state.borderWidth),
        strokeDashArray: state.borderType == 'solid' ? '' : [4,4]
      })
  
      canvas.remove(state.rectCanvaseObj)
      state.rectCanvaseObj = null
      canvas.add(rectObj).setActiveObject(rectObj)
      canvas.renderAll()
    }
  },
  settingsRect ({ state, commit, rootState }, obj) {
    let canvas = rootState.editor.canvas
    let rect = canvas.getActiveObject()
    if(rect) {
      switch (obj.type) {
        case 'fill':
          rect.set({ fill: obj.value })
          break;
        case 'opacity':
          rect.set({ opacity: parseInt(obj.value)/100 })
          break;
        case 'borderType':
          if(obj.value != '') {
            rect.set({ borderType: obj.value })
            if(state.borderColor == '') {
              commit('setBorderColor', '#ffffff')
              rect.set({ stroke: '#ffffff' })
            }else{
              rect.set({ stroke: state.borderColor })
            }
            if(state.borderType == 'solid'){
              rect.set({ strokeDashArray: [] })
            }else if(state.borderType == 'dashed'){
              let a = parseInt(state.borderWidth) < 3 ? 3 : parseInt(state.borderWidth)
              rect.set({ strokeDashArray: [Math.round(a), Math.round(a)] })
            }
            rect.set({ strokeWidth: parseInt(state.borderWidth) })
          }else{
            rect.set({ stroke: '' })
          }
          break;
        case 'borderWidth':
          if(state.borderType == 'dashed'){
            let a = parseInt(state.borderWidth) < 3 ? 3 : parseInt(state.borderWidth)
            rect.set({ strokeDashArray: [Math.round(a), Math.round(a)] })
          }
          rect.set({ strokeWidth: parseInt(obj.value) })
          break;
        case 'borderColor':
          rect.set({ stroke: state.borderType ? obj.value : '' })
          break;
        default:
          break;
      }
      canvas.renderAll()
    }
  },
  initRectOptions ({ commit }) {
    commit('setFillColor', '#ffffff')
    commit('setBorderType', '')
    commit('setBorderColor', '#ffffff')
    commit('setBorderWidth', '3px')
    commit('setRectOpacity', '100%')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}