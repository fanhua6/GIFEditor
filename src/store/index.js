import Vue from 'vue'
import Vuex from 'vuex'

import main from './module/main'
import editor from './editor/editor'
import editorPlay from './editor/editorPlay'
import editorFooter from './editor/editorFooter'
import tips from './module/tips'
import info from './info'
import gifInfo from'./info/gifInfo'
import textInfo from './info/textInfo'
import rectInfo from './info/rectInfo'
import circleInfo from './info/circleInfo'
import pictureInfo from './info/pictureInfo'
import webPictureInfo from './info/webPictureInfo'
import webPictureListInfo from './info/webPictureListInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    main,
    editor,
    editorPlay,
    editorFooter,
    info,
    gifInfo,
    textInfo,
    rectInfo,
    circleInfo,
    pictureInfo,
    webPictureInfo,
    webPictureListInfo,
    tips
  }
})
