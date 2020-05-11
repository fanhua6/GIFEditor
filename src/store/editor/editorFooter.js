const state = {
  showFrameList: true,
  frameList: [],
  frameListWidth: 0
}

const getters = {
  getShowFrameList (state) {
    return state.showFrameList
  },
  getFrameList (state) {
    return state.frameList
  },
  getFrameListWidth (state) {
    return state.frameListWidth
  }
}

const mutations = {
  setShowFrameList (state, b) {
    state.showFrameList = b
  },
  setFrameList (state, list) {
    state.frameList = list
  },
  setFrameListWidth (state, w) {
    state.frameListWidth = w
  }
}

const actions = {
  
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}