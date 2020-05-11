const state = {
  frameNumber: 1,
  gifWidth: 0,
  gifHeight: 0,
  gifTime: ''
}

const getters = {
  getFrameNumber (state) {
    return state.frameNumber
  },
  getGifWidth (state) {
    return state.gifWidth
  },
  getGifHeight (state) {
    return state.gifHeight
  },
  getGifTime (state) {
    return state.gifTime
  },
}

const mutations = {
  setFrameNumber (state, n) {
    state.frameNumber = n
  },
  setGifWidth (state, w) {
    state.gifWidth = w
  },
  setGifHeight (state, h) {
    state.gifHeight = h
  },
  setGifTime (state, t) {
    state.gifTime = t
  },
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