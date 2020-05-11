<template>
  <div class="editor-box-b">
    <Header />
    <EditorBody />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from './Header'
import EditorBody from './EditorBody'

export default {
  name: 'Editor',
  components: {
    Header,
    EditorBody
  },
  computed: {
    ...mapGetters('editor',[
      'getCanvas'
    ]),
    ...mapGetters('main',[
      'getViewType'
    ]),
    ...mapGetters('editorPlay',[
      'getPlayType'
    ])
  },
  created () {
    window.addEventListener('keydown', this.keydownFn)
    window.addEventListener('keyup', this.keyupFn)
  },
  methods: {
    keydownFn (e) {
      switch (e.keyCode) {
        case 46:
          this.deleteActiveObject()
          break;
        case 27:
          if(this.getViewType == 'preview'){
            this.$store.commit('main/setViewType', 'editing')
          }
          break;
        case 32:
          if(!this.getCanvas.getActiveObject() || !this.getCanvas.getActiveObject().type == 'textbox' || !this.getCanvas.getActiveObject().isEditing){
            if(document.activeElement.id != 'inputText'){
              this.$store.commit('editorPlay/setPlayType', this.getPlayType == 'pause' ? 'play' : 'pause')
            }
          } 
          break;
        case 16:
          this.$store.commit('editor/setIsKeyDownShift', true)
          break;
        default:
          break;
      }
    },
    keyupFn (e) {
      switch (e.keyCode) {
        case 16:
          this.$store.commit('editor/setIsKeyDownShift', false)
          break;
      
        default:
          break;
      }
    },
    deleteActiveObject () {
      this.$store.dispatch('editor/deleteActiveObject')
    }
  }
}
</script>

<style lang="scss" scoped>
  .editor-box-b{
    width: 100%;
    height: 100%;
  }
</style>