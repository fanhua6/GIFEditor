<template>
  <div class="editor-content">
    <Editor />
    <EditorFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Editor from './Editor'
import EditorFooter from './EditorFooter'

export default {
  name: 'EditorCon',
  computed: {
    ...mapGetters('main',[
      'getIsPreview',
      'getViewType',
      'getGifUrl'
    ])
  },
  components: {
    Editor,
    EditorFooter
  },
  mounted () {
    let dom = document.getElementById('imgedit')
    dom.onload = () => {
      let info = JSON.parse(dom.GetGifInfo())
      let len = info.gif_frame_size
      if(len == 0){
        this.$store.commit('main/setViewType', 'main')
        this.$store.commit('tips/setErrorText', 'GIF导入失败，将返回首页！')
        this.$store.commit('tips/setIsShowError', true)
        setTimeout(() => {
          location.href = '/'
        }, 2000)
      }
      if(info.transparent_rgb){
      }
      let time = 0
      let boxWidth = 0
      let imgList = []
      this.$store.commit('gifInfo/setFrameNumber', len)
      boxWidth = 120 * len + 'px'
      this.$store.commit('editorFooter/setFrameListWidth', boxWidth)

      for(let i = 0; i < len; i++){
        let data = JSON.parse(dom.GetImgDataByIndx(i))
        
        imgList.push(data)
        let a = data.time_delay == 0 ? 100 : (data.time_delay < 30 ? 30 : data.time_delay)
        time += a
      }

      if(len != 0){
        history.replaceState(null,'','/')
        this.$store.commit('main/setViewType', 'editing')

        this.$store.commit('editorFooter/setFrameList', imgList)
        this.$store.commit('editorPlay/setPlayOutTime', time/imgList.length)
        this.$store.commit('gifInfo/setGifTime', this.getGifTime(time))

        this.$store.commit('gifInfo/setGifWidth', dom.querySelector('img').naturalWidth)
        this.$store.commit('gifInfo/setGifHeight', dom.querySelector('img').naturalHeight)
        this.$store.commit('editorPlay/setPlayType', 'play')
      }
      
    }
    dom.onimagecompositesuccess = () => {
      //GIF合成完毕
      let obj = dom.GetComplexGifBase64Data()
      obj = JSON.parse(obj)
      
      this.$store.commit('main/setExportGIFURL', obj.gif_data)
      this.$store.commit('main/setExportGIFSize', this.getFileSize(obj.gif_length*1024))
      this.$store.commit('main/setExportGIFWidth', obj.gif_width)
      this.$store.commit('main/setExportGIFHeight', obj.gif_height)
      this.$store.commit('main/setExportGIFTime', this.getGifTime(obj.gif_time))
      this.$store.commit('main/setViewType', this.getIsPreview ? 'preview' : 'export')
    }

    dom.onerror = e => {
      this.$store.commit('main/setViewType', 'main')
      setTimeout(() => {
        location.href = '/'
      }, 500)
    }

    dom.ongifimporterror = e => {
      location.href = '/'
    }

    dom.ongifcomposeerror = e => {
      this.$store.commit('main/setViewType', 'editing')
    }

    dom.onloadeddata = e => {
      if(this.getViewType == 'main') {
        location.href = '/' + dom.getAttribute('new_src')
      }else if(dom.getAttribute('new_src').split('?url=')[1] == this.getGifUrl){
      }else if(dom.getAttribute('new_src').length > 5 && this.getGifUrl != dom.getAttribute('new_src').split('?url=')[1]){
        if(this.getViewType == 'loading'){
        }else if(this.getViewType == 'preview' || this.getViewType == 'export' || this.getViewType == 'export_success'){
          this.$store.commit('main/setViewType', 'editing')
        }
        this.$store.dispatch('tips/confrimFn', { text: '你确定要导入新的GIF？', callback: () => {
          this.$store.commit('main/setViewType', 'main')
          location.href = '/' + dom.getAttribute('new_src')
        } })
      }
    },

    dom.ondragend = e => {
      this.$store.commit('main/setIsOnGragend', true)
    }
  },
  methods: {
    getFileSize (byte) {
      let size = ''
      if(byte < 1048576){
        size = (byte / 1024).toFixed(2) + 'KB'
      }else{
        size = (byte / 1024 / 1024).toFixed(2)  + 'MB'
      }
      return size
    },
    getGifTime (t) {
      return (t/1000).toFixed(1) + '秒'
    }
  }
}
</script>

<style lang="scss" scoped>
  .editor-content{
    flex: 1;
    background-color: #f1f3f7;
    display: flex;
    flex-direction: column;
  }
</style>