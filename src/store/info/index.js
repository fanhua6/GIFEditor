const state = {
  infoType: 'gif',
  isShowShadow: true
}

const getters = {
  getInfoType (state) {
    return state.infoType
  },
  getIsShowShadow (state) {
    return state.isShowShadow
  }
}

const mutations = {
  setInfoType (state, type) {
    state.infoType = type
  },
  setIsShowShadow (state, b) {
    state.isShowShadow = b
  }
}

const actions = {
  checkIsShowShadow ({ commit }) {
    setTimeout(() => {
      commit('setIsShowShadow', document.querySelector('.info-scroll-box').clientHeight > document.querySelector('.info-content').clientHeight)
    },100)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}