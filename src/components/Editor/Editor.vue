<template>
  <div id="editorBox_b" class="editor-box" @click="changeInfoType" @mousedown="errorDrawing">
    <div id="editorBody"  class="editor-body" :style="{ width: bodyWidth, height: bodyHeight, cursor: (this.getInitDrawing || this.getIsDrawing ? 'crosshair' : 'default') }"> 
      <div class="editor" id="editorBox"
        :style="{ width: getGifWidth + 'px', height: getGifHeight + 'px', top: bodyTop, left: bodyLeft }"
        @click.prevent.stop>
        <imgedit id="imgedit" :width="getGifWidth" :height="getGifHeight" 
          :src="getGifUrl"
          :img_edit_indx="getPlayIndex" 
        />
        <canvas id="c"></canvas>
        <div class="drawing-box" @mousedown.stop="startDrawing" v-if="this.getInitDrawing || this.getIsDrawing"></div>
      </div>
    </div>

    <EditTypeBox />
  </div>
</template>

<script>
import EditTypeBox from './EditTypeBox'
import { mapGetters } from 'vuex'
import { fabric } from 'fabric'
import 'fabric-customise-controls'
import rotateimg from '@/assets/img/rotate.svg'

export default {
  name: 'Editor',
  data () {
    return {
      bodyWidth: 0,
      bodyHeight: 0,
      bodyTop: 0,
      bodyLeft: 0,
      canvas: null
    }
  },
  components: {
    EditTypeBox
  },
  computed: {
    ...mapGetters('main', [
      'getGifUrl',
      'getViewType'
    ]),
    ...mapGetters('gifInfo',[
      'getGifWidth',
      'getGifHeight'
    ]),
    ...mapGetters('editorFooter', [
      'getShowFrameList'
    ]),
    ...mapGetters('editorPlay',[
      'getPlayIndex'
    ]),
    ...mapGetters('editor', [
      'getInitDrawing',
      'getIsDrawing'
    ]),
    ...mapGetters('info',[
      'getInfoType'
    ])
  },
  mounted () {
    this.initEditorSize()
    window.addEventListener('resize', this.initEditorSize)
  },
  watch: {
    getShowFrameList (n) {
      this.bodyHeight = n ? document.body.clientHeight - 60 - 118 + 'px' : document.body.clientHeight - 60 + 'px'
      this.initEditorSize()
    },
    getViewType (n) {
      if(n == 'editing') {
        this.initEditorSize()
      }
    },
    getGifWidth (n) {
      if(n) {
        this.init()
      }
    },
    // getGifUrl (n) {
    //   if(n){
    //     setTimeout(this.init(), 100)
    //   }
    // }
  },
  methods: {
    init () {
      fabric.Object.prototype.customiseCornerIcons({
        settings: {
          cornerSize: 7,
          cornerShape: 'circle',
          cornerBackgroundColor: '#ffffff',
          cornerPadding: 5,
        },
        mb: {
            cornerBorderColor: '',
            cursor: 'pointer',
        },
        mtr: {
          icon: rotateimg,
          settings: {
            cornerBackgroundColor: 'rgba(79, 181, 255, 1)',
            cornerShape: 'circle',
            cornerSize: 23,
            cornerBorderColor: '',
          },
          cursor: 'pointer',
        },
      })

      this.canvas = new fabric.Canvas('c', {
        objectCaching: false,
        height: this.getGifHeight,
        width: this.getGifWidth
      })

      this.canvas.selection = false
      
      this.$store.commit('editor/setCanvas', this.canvas)

      // 监听选中事件
      this.canvas.on('selection:created', e => {
        this.$store.commit('info/setInfoType', e.target.type == 'image' ? e.selected[0].imageType ? e.target.type : 'webpic' : e.target.type)
        this.initActives(e.target.type, e.selected)
      })

      this.canvas.on('mouse:dblclick', e => {
        if(e.target.type == 'image'){
          if(e.target.imageType) {
            this.$store.dispatch('pictureInfo/replacePicture')
          }else{
            this.$store.dispatch('webPictureInfo/replacePicture')
          }
        }
      })

      this.canvas.on('selection:updated', e => {
        this.$store.commit('info/setInfoType', e.target.type == 'image' ? e.selected[0].imageType ? e.target.type : 'webpic' : e.target.type)
        this.initActives(e.target.type, e.selected)
      })

      this.canvas.on('selection:cleared', e => {
        this.$store.commit('info/setInfoType', 'gif')
        this.initActives('gif', [])
      })

      this.canvas.on('object:modified', e => {
        if(this.activeType == 'textbox'){
          if(!e.target.text){
            this.canvas.remove(e.target)
          }
          e.target.oldTop = text.top
          e.target.oldLeft = text.left
          e.target.setCoords()
        }
      })

      // 放大缩小
      // this.canvas.on('mouse:down', e => {
      //   let doc = document.getElementById('editorBox')
      //   console.log(doc.style.width)
      //   doc.style.setProperty('width', parseInt(doc.style.width)*1.2 + 'px')
      //   doc.style.setProperty('height', parseInt(doc.style.height)*1.2 + 'px')
      //   // doc.style.setProperty({width: '700px', height: '560px'})
      //   // console.log(doc.style.transform = 'scale(2, 2)')
      //   // this.canvas.set({ scale: 1.2 })
      //   // console.log(this.canvas.setZoom(0.5))
      //   this.canvas.renderAll()
      //   this.initEditorSize()
      // })
    },
    initEditorSize () {
      let dom = document.getElementById('editorBody')
      let width = document.body.clientWidth - 330
      let height = this.getShowFrameList ? document.body.clientHeight - 60 - 118 : document.body.clientHeight - 60
      this.bodyWidth = width + 'px'
      this.bodyHeight = height + 'px'
      if(width > this.getGifWidth) {
        this.bodyLeft = (width - this.getGifWidth) / 2 + 'px'
      }else{
        dom.scrollLeft = (this.getGifWidth - width) / 2
      }
      if(height > this.getGifHeight) {
        this.bodyTop = (height - this.getGifHeight) / 2 + 'px'
      }else{
        this.bodyTop = 0
        dom.scrollTop = (this.getGifHeight - height) / 2
      }
    },
    changeInfoType () {
      if(this.canvas && this.canvas.getActiveObject()){
        this.$store.commit('info/setInfoType', 'gif')
        this.canvas.discardActiveObject()
        this.canvas.renderAll()
      }
    },
    initActives (type, da) {
      if(type != 'activeSelection'){
        this.$store.commit('editor/setActiveObj', da[0])
      }
      // console.log(da)
      switch (type) {
        case 'rect':
          this.$store.dispatch('rectInfo/initRectAttribute', da[0])
          break;
        case 'circle':
          this.$store.dispatch('circleInfo/initCircleAttribute', da[0])
          break;
        case 'image':
          if(da[0].imageType) {
            this.$store.dispatch('pictureInfo/initPictureAttribute', da[0])
          }else{
            this.$store.dispatch('webPictureInfo/initPictureAttribute', da[0])
          }
          break;
        default:
          break;
      }
    },
    startDrawing (e) {
      if(this.getInitDrawing) {
        this.$store.commit('editor/setIsDrawing', true)
        switch (this.getInfoType) {
          case 'rect':
            this.$store.dispatch('rectInfo/startDrawingRect', e)
            break;
          case 'circle':
            this.$store.dispatch('circleInfo/startDrawingCircle', e)
            break;
        }
        this.$store.commit('editor/setInitDrawing', false)
      }
    },
    errorDrawing () {
      if(this.getInitDrawing) {
        this.$store.commit('tips/setErrorText', '请在图片区域内开始绘制')
        this.$store.commit('tips/setIsShowError', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .editor-box{
    width: 100%;
    position: relative;
    .editor-body{
      overflow:auto;
      position: relative;
      .editor{
        position: absolute;
        box-shadow: 0 0 20px 0 rgba(0,0,0,.2);
        background-size: 16px 16px;
          background-color: #fff;
          background-position: 0 0, 8px 8px;
          background-image: linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
        #c{
          width: 100%;
          height: 100%;
          position: absolute;
        }
        .drawing-box{
          width: 100%;
          height: 100%;
          position: absolute;
          cursor: crosshair;
          top: 0;
          left: 0;
        }
      }
    }
    .edit-type-box{
      position: absolute;
      top: 20px;
      left: 0;
    }
  }
</style>