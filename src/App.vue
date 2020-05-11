<template>
  <div id="app" @contextmenu.prevent>
    <Main v-if="getViewType == 'main'" /> 
    <Editor v-show="getViewType != 'main'" />
    <!-- <Editor /> -->
    
    <Preview v-if="getViewType == 'preview'" />
    <ExportBox v-if="getViewType == 'export'" />
    <SaveSuccess v-if="getViewType == 'export_success'" />
    <Loading v-if="getViewType == 'loading'" />
    <!-- <Loading /> -->
    <ErrorBox />
    <DYIconfirm v-if="getIsShowConfirm" />
    <!-- <MassageBox /> -->
    <SavePngRate v-if="getViewType == 'save_all_png'" />
    <div class="font-loading">
      <span v-for="item in getFamilies" :key="item.t"  :style="{'font-family':item.t}"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Main from '_c/Main'
import Editor from '_c/Editor'
import Loading from '_c/Loading'
import ErrorBox from '_c/ErrorBox'
import ExportBox from '_c/ExportBox'
import SaveSuccess from '_c/SaveSuccess'
import Preview from '_c/Preview'
import DYIconfirm from '_c/DYIconfirm'
import MassageBox from '_c/MassageBox'
import SavePngRate from '_c/SavePngRate'

export default {
  name: 'app',
  computed: {
    ...mapGetters('main',[
      'getViewType'
    ]),
    ...mapGetters('tips',[
      'getIsShowConfirm'
    ]),
    ...mapGetters('textInfo', [
      'getFamilies'
    ])
  },
  components: {
    Main,
    Editor,
    Loading,
    ExportBox,
    SaveSuccess,
    Preview,
    ErrorBox,
    DYIconfirm,
    MassageBox,
    SavePngRate
  },
  created () {
    this.initData()
  },
  mounted () {
    window.onbeforeunload = () => {
      if(this.getViewType != 'main'){
        return "重新加载此网站？";
      }
    }
    this.main()
  },
  methods: {
    main () {
      let search = location.search
      let url = ''
      if(search.split('?url=')[1]){
        url = search.split('?url=')[1]
        // this.gourl(url)
      }else if(search.split('?blob=')[1]){
        let h = location.host == 'localhost' ? 'blob:http://localhost/' : 'blob:chrome://gifmaker/'
        url = h + search.split('?blob=')[1]
      }
      this.gourl(url)
    },
    gourl (url) {
      if(url){
        this.$store.commit('main/setGifUrl', url)
        this.$store.commit('main/setViewType', 'loading')
        this.$store.commit('main/setLoadingText', '正在加载')
      }else{
        this.$store.commit('main/setViewType', 'main')
      }
    },
    initData () {
      this.$store.dispatch('webPictureListInfo/main')
      this.$store.dispatch('webPictureListInfo/getApiWebPictureData')
      this.$store.dispatch('textInfo/initFont')
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .font-loading{
    opacity: 0;
  }
}
</style>
