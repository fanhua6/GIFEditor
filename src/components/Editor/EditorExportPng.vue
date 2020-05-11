<template>
  <div class="export-png-box">
    <span class="iconfont iconone" :class="{ disabled : getPlayType == 'play' }" title="保存当前帧" @click="chooseFile"></span>
    <span class="iconfont iconmany" title="保存所有帧" @click="saveAllPng"></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EditorExportPng',
  data () {
    return {
      dom: null,
      saveType: -1,
      timer: null
    }
  },
  computed: {
    ...mapGetters('editorPlay', [
      'getPlayType',
      'getPlayIndex'
    ]),
    ...mapGetters('gifInfo', [
      'getGifWidth',
      'getGifHeight',
      'getFrameNumber'
    ]),
    ...mapGetters('editor', [
      'getCanvas'
    ])
  },
  mounted () {
    this.dom = document.getElementById('imgedit')

    this.dom.onchoosesuccess = this.onchoosesuccess
    this.dom.onsavefilesuccess = this.onsavefilesuccess
    this.dom.onerrorgifdata = this.onerrorgifdata
  },
  methods: {
    chooseFile () {
      if(this.getPlayType == 'pause') {
        if(typeof this.dom.chooseFile == 'function'){
          let d = new Date()
          let imgname = 'GIF' + d.getFullYear() + '' + this.formatTime(d.getMonth() + 1) + this.formatTime(d.getDate()) + this.formatTime(d.getHours()) + this.formatTime(d.getMinutes()) + this.formatTime(d.getSeconds())
          let index = this.getPlayIndex + 1
          this.dom.chooseFile(index, imgname)
          this.saveType = 0
        }
      }
    },
    onchoosesuccess () {
      this.getCanvas.discardActiveObject()
      let img = this.getCanvas.toDataURL() || ''
      let da = {
        index_id: this.getPlayIndex + 1,
        img_name: '', 
        img_width: this.getGifWidth,
        img_height:this.getGifHeight,
        edit_img_data: [{
          data: img
        }]
      }
      this.savePngFn(da)
    },
    saveAllPng () {
      this.getCanvas.discardActiveObject()
      this.saveType = 1
      let d = new Date()
      let imgname = 'GIF图片' + d.getFullYear() + '' + this.formatTime(d.getMonth() + 1) + this.formatTime(d.getDate()) + this.formatTime(d.getHours()) + this.formatTime(d.getMinutes()) + this.formatTime(d.getSeconds())
      let isH = false
      this.$store.commit('editorPlay/setPlayType', 'pause')
      this.$store.commit('tips/setSaveRate', 0)
      this.$store.commit('main/setViewType', 'save_all_png')
      let da = {
        index_id: 0,
        img_name: imgname, 
        img_width: this.getGifWidth,
        img_height:this.getGifHeight,
        edit_img_data: []
      }
      
      this.getCanvas.forEachObject(e => {
        isH = true
      })
      if(isH){
        this.$store.commit('editorPlay/setPlayIndex', 0)
        this.timer = setInterval(() => {
          let o = {
            data: this.getCanvas.toDataURL() || ''
          }
          da.edit_img_data.push(o)
          this.$store.commit('editorPlay/setPlayIndex', this.getPlayIndex + 1)
          if(this.getPlayIndex == 5) {
            clearInterval(this.timer)
            this.timer = null
            this.$store.commit('editorPlay/setPlayIndex', 0)
            this.savePngFn(da)
          }
        }, 50)
      }else{
        this.savePngFn(da)
        
      }
    },
    savePngFn (da) {
      this.dom.saveGifFrame(JSON.stringify(da))
    },
    onsavefilesuccess () {
      if (this.saveType == 0) {
        this.$store.commit('tips/setConfrimText', '当前帧已保存，点击“确定”打开保存目录')
        this.$store.commit('tips/setIsShowConfirm', true)
        this.$store.commit('tips/setConfrimCallback', this.openFile)
        this.$store.commit('tips/setIsSavePng', true)
      }else if(this.saveType == 1) {
        this.getSaveFileIndex()
      }
    },
    getSaveFileIndex () {
      let i = this.dom.GetSaveFileIndex()
      this.$store.commit('tips/setSaveRate', i)
      if(i == this.getFrameNumber) {
        this.$store.commit('main/setViewType', 'editing')
        this.$store.commit('tips/setConfrimText', '所有帧已保存，点击“确定”打开保存目录')
        this.$store.commit('tips/setIsShowConfirm', true)
        this.$store.commit('tips/setConfrimCallback', this.openFile)
        this.$store.commit('tips/setIsSavePng', true)
      }
    },
    onerrorgifdata () {
      this.$store.commit('tips/setConfirmType', 'iconerror')
      this.$store.commit('tips/setConfrimText', '保存失败，请重新操作')
      this.$store.commit('tips/setIsShowConfirm', true)
      this.$store.commit('tips/setIsSavePng', true)
    },
    openFile () {
      if(this.saveType != -1){
        this.dom.OpenFile(this.saveType)
      }
    },
    formatTime (s) {
      let r = ''
      if(s < 10) {
        r = '0' + s
      }else{
        r = s
      }
      return r
    }
  }
}
</script>

<style lang="scss" scoped>
.export-png-box{
  text-align: center;
  .iconfont{
    margin: 0 16px;
    color: #fff;
    cursor: pointer;
    &:hover{
      color: #b9b9b9;
    }
    &.disabled{
      color: #8c8c8c;
      cursor: not-allowed;
    }
  }
}
</style>