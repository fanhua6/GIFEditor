const state = {
  playType: 'pause',   //pause play
  playIndex: 0,
  playSpeed: 1,
  speedLeft: '47.5%',
  playOutTime: 30,
  playMode: 0
}

const getters = {
  getPlayType (state) {
    return state.playType
  },
  getPlayIndex (state) {
    return state.playIndex
  },
  getPlaySpeed (state) {
    return state.playSpeed
  },
  getSpeedLeft (state) {
    return state.speedLeft
  },
  getPlayOutTime (state) {
    return state.playOutTime
  },
  getPlayMode (state) {
    return state.playMode
  }
}

const mutations = {
  setPlayType (state, type) {
    state.playType = type
  },
  setPlayIndex (state, i) {
    state.playIndex = i
  },
  setPlaySpeed (state, s) {
    state.playSpeed = s
  },
  setSpeedLeft (state, l) {
    state.speedLeft = l
  },
  setPlayOutTime (state, t) {
    state.playOutTime = t
  },
  setPlayMode (state, m) {
    state.playMode = m
  }
}

const actions = {
  setPlayIndex ({ dispatch, commit }, i) {
    commit('setPlayIndex', i)
  },
  changePlaySpeed ({ commit }, item) {
    commit('setPlaySpeed', item.value)
    commit('setSpeedLeft', item.left)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}