const state = {
  isShowError: false,
  errorText: '',
  isShowConfirm: false,
  confirmType: 'icontips',
  confrimText: '',
  confrimCallback: undefined,
  massageType: 0,   //0错误、1正确、2警告
  isShowMassage: false,
  massageText: '先提示一点错误',
  isSavePng: false,
  saveRate: 0,
}

const getters = {
  getIsShowError (state) {
    return state.isShowError
  },
  getErrorText (state) {
    return state.errorText
  },
  getIsShowConfirm (state) {
    return state.isShowConfirm
  },
  getConfirmType (state) {
    return state.confirmType
  },
  getConfrimText (state) {
    return state.confrimText
  },
  getConfrimCallback (state) {
    return state.confrimCallback
  },
  getMassageType (state) {
    return state.massageType
  },
  getIsShowMassage (state) {
    return state.isShowMassage
  },
  getMassageText (state) {
    return state.massageText
  },
  getIsSavePng (state) {
    return state.isSavePng
  },
  getSaveRate (state) {
    return state.saveRate
  }
}

const mutations = {
  setIsShowError (state, b) {
    state.isShowError = b
  },
  setErrorText (state, text) {
    state.errorText = text
  },
  setIsShowConfirm (state, b) {
    state.isShowConfirm = b
  },
  setConfirmType (state, s) {
    state.confirmType = s
  },
  setConfrimText (state, text) {
    state.confrimText = text
  },
  setConfrimCallback (state, fn) {
    state.confrimCallback = fn
  },
  setMassageType (state, t) {
    state.massageType = t
  },
  setIsShowMassage (state, b) {
    state.isShowMassage = b
  },
  setMassageText (state, s) {
    state.massageText = s
  },
  setIsSavePng (state, b) {
    state.isSavePng = b
  },
  setSaveRate (state, n) {
    state.saveRate = n
  }
}

const actions = {
  confrimFn ({ commit }, obj) {
    commit('setConfrimText', obj.text)
    commit('setIsShowConfirm', true)
    commit('setConfrimCallback', obj.callback)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}