const state = {
  fillColor: '#ffffff',
  borderType: '',
  borderColor: '#ffffff',
  borderWidth: '3px',
  circleOpacity: '100%',
  isDraw: false,
  circleClientX: 0,
  circleClientY: 0,
  temporaryCircle: {
    fill: '#000',
    opacity: 0.2,
    stroke: '#ffffff',
    strokeDashArray: [4, 4],
    strokeWidth: 1,
    top: 0,
    left: 0
  },
  temporaryCircleTop: 0,
  temporaryCircleLeft: 0,
  circleCanvaseObj: null
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
  getCircleOpacity (state) {
    return state.circleOpacity
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
  setCircleOpacity (state, opacity) {
    state.circleOpacity = opacity
  },
  setIsDraw (state, b) {
    state.isDraw = b
  },
  setCircleClientX (state, x) {
    state.circleClientX = x
  },
  setCircleClientY (state, y) {
    state.circleClientY = y
  },
  setCircleCanvaseObj (state, obj) {
    state.circleCanvaseObj = obj
  }
}

const actions = {
  initCircleAttribute ({ commit }, obj) {
    commit('setFillColor', obj.fill)
    commit('setBorderType', obj.borderType)
    commit('setBorderColor', obj.stroke)
    commit('setBorderWidth', obj.strokeWidth + 'px')
    commit('setCircleOpacity', obj.opacity * 100 + '%')
  },
  initDrawingCircle ({ rootState }) {
    
  },
  startDrawingCircle ({ state, commit, rootState }, e) {
    let canvas = rootState.editor.canvas
    commit('setCircleClientX', e.clientX)
    commit('setCircleClientY', e.clientY)
    state.temporaryCircle.top = e.offsetY
    state.temporaryCircle.left = e.offsetX
    commit('setCircleCanvaseObj', new fabric.Ellipse(state.temporaryCircle))
    canvas.add(state.circleCanvaseObj)
  },
  darwingTemporaryCircle ({ state, rootState }, e) {
    let canvas = rootState.editor.canvas
    let w = e.clientX - state.circleClientX
    let h = e.clientY - state.circleClientY
    let rx = 0
    let ry = 0
    if(rootState.editor.isKeyDownShift) {
      if(w < 0) {
        state.circleCanvaseObj.set({ left: state.temporaryCircle.left + w })
      }else{
        state.circleCanvaseObj.set({ left: state.temporaryCircle.left })
      }
      if(h < 0) {
        state.circleCanvaseObj.set({ top: state.temporaryCircle.top + (w < 0 ? w : -w) })
      }else{
        state.circleCanvaseObj.set({ top: state.temporaryCircle.top })
      }
      ry = Math.abs(w/2)
    }else{
      if(w < 0) {
        state.circleCanvaseObj.set({ left: state.temporaryCircle.left + w })
      }else{
        state.circleCanvaseObj.set({ left: state.temporaryCircle.left })
      }
      if(h < 0) {
        state.circleCanvaseObj.set({ top: state.temporaryCircle.top + h })
      }else{
        state.circleCanvaseObj.set({ top: state.temporaryCircle.top })
      }
      ry = Math.abs(h/2)
    }
    
    rx = Math.abs(w/2)
    state.circleCanvaseObj.set({rx, ry})
    canvas.renderAll()
  },
  addCircle ({ state, commit, rootState }) {
    let canvas = rootState.editor.canvas
    if(state.circleCanvaseObj.rx < 15 && state.circleCanvaseObj.ry < 15){
      commit('editor/setInitDrawing', true, {root: true})
      commit('editor/setIsDrawing', false, {root: true})
      commit('tips/setErrorText', '绘制区域过小，请重新绘制', {root: true})
      commit('tips/setIsShowError', true, {root: true})
      canvas.remove(state.circleCanvaseObj)
    }else{
      let id = 'circle_' + rootState.editor.editIndex
      commit('editor/setEditIndex', rootState.editor.editIndex + 1, {root: true})
      let circleObj = new fabric.Ellipse({
        id,
        type: 'circle',
        borderType: state.borderType,
        top: state.circleCanvaseObj.height < 0 ? state.circleCanvaseObj.top + state.circleCanvaseObj.height : state.circleCanvaseObj.top,
        left: state.circleCanvaseObj.left,
        rx: state.circleCanvaseObj.rx,
        ry: Math.abs(state.circleCanvaseObj.ry),
        fill: state.fillColor,
        opacity: parseInt(state.circleOpacity)/100,
        stroke: state.borderType ? state.borderColor : '',
        strokeWidth: parseInt(state.borderWidth),
        strokeDashArray: state.borderType == 'solid' ? '' : [4,4]
      })

      canvas.remove(state.circleCanvaseObj)
      state.circleCanvaseObj = null
      canvas.add(circleObj).setActiveObject(circleObj)
      canvas.renderAll()
    }
  },
  settingsCircle ({ state, commit, rootState }, obj) {
    let canvas = rootState.editor.canvas
    let circle = canvas.getActiveObject()
    if(circle) {
      switch (obj.type) {
        case 'fill':
          circle.set({ fill: obj.value })
          break;
        case 'opacity':
          circle.set({ opacity: parseInt(obj.value)/100 })
          break;
        case 'borderType':
          if(obj.value != '') {
            circle.set({ borderType: obj.value })
            if(state.borderColor == '') {
              commit('setBorderColor', '#ffffff')
              circle.set({ stroke: '#ffffff' })
            }else{
              circle.set({ stroke: state.borderColor })
            }
            if(state.borderType == 'solid'){
              circle.set({ strokeDashArray: [] })
            }else if(state.borderType == 'dashed'){
              let a = parseInt(state.borderWidth) < 3 ? 3 : parseInt(state.borderWidth)
              circle.set({ strokeDashArray: [a, a] })
            }
            circle.set({ strokeWidth: parseInt(state.borderWidth) })
          }else{
            circle.set({ stroke: '' })
          }
          break;
        case 'borderWidth':
          if(state.borderType == 'dashed'){
            let a = parseInt(state.borderWidth) < 3 ? 3 : parseInt(state.borderWidth)
            circle.set({ strokeDashArray: [a, a] })
          }
          circle.set({ strokeWidth: parseInt(obj.value) })
          break;
        case 'borderColor':
          circle.set({ stroke: state.borderType ? obj.value : '' })
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
    commit('setCircleOpacity', '100%')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}