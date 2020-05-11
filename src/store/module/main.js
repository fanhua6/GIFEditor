const state = {
  viewType: 'main',   //'main', 'loading','editing','preview','export','export_success', 'save_all_png'
  gifUrl: '',
  loadingText: '',
  exportGIFURL: '',
  exportGIFSize: '',
  exportGIFWidth: '',
  exportGIFHeight: '',
  exportGIFTime: '',
  isPreview: false,
  isOnGragend: false
}

const getters = {
  getViewType (state) {
    return state.viewType
  },
  getGifUrl (state) {
    return state.gifUrl
  },
  getLoadingText (state) {
    return state.loadingText
  },
  getExportGIFURL (state) {
    return state.exportGIFURL
  },
  getExportGIFSize (state) {
    return state.exportGIFSize
  },
  getExportGIFWidth (state) {
    return state.exportGIFWidth
  },
  getExportGIFHeight (state) {
    return state.exportGIFHeight
  },
  getExportGIFTime (state) {
    return state.exportGIFTime
  },
  getIsPreview (state) {
    return state.isPreview
  },
  getIsOnGragend (state) {
    return state.isOnGragend
  }
}

const mutations = {
  setViewType (state, type) {
    state.viewType = type
  },
  setGifUrl (state, url) {
    state.gifUrl = url
  },
  setLoadingText (state, text) {
    state.loadingText = text
  },
  setExportGIFURL (state, url) {
    state.exportGIFURL = url
  },
  setExportGIFSize (state, s) {
    state.exportGIFSize = s
  },
  setExportGIFWidth (state, w) {
    state.exportGIFWidth = w
  },
  setExportGIFHeight (state, h) {
    state.exportGIFHeight = h
  },
  setExportGIFTime (state, t) {
    state.exportGIFTime = t
  },
  setIsPreview (state, b) {
    state.isPreview = b
  },
  setIsOnGragend (state, b) {
    state.isOnGragend = b
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