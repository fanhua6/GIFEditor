<template>
  <div class="editor-body">
    <EditorCon />
    <InfoBox />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditorCon from './EditorCon'
import InfoBox from '_c/Info/InfoBox'
import { throttle } from '@/libs/tools' 

export default {
  name: 'EditorBody',
  components: {
    EditorCon,
    InfoBox
  },
  computed: {
    ...mapGetters('editor', [
      'getInitDrawing',
      'getIsDrawing'
    ]),
    ...mapGetters('info',[
      'getInfoType'
    ])
  },
  mounted () {
    window.addEventListener('mousemove', throttle(this.windowMousemoveFn, 160), true)
    window.addEventListener('mouseup', this.windowMouseupFn, true)
  },
  methods: {
    windowMousemoveFn (e) {
      if(this.getIsDrawing) {
        switch (this.getInfoType) {
          case 'rect':
            this.$store.dispatch('rectInfo/darwingTemporaryRect', e)
            break;
          case 'circle':
            this.$store.dispatch('circleInfo/darwingTemporaryCircle', e)
            break;
          default:
            break;
        }
      }
    },
    windowMouseupFn () {
      if(this.getIsDrawing) {
        this.$store.commit('editor/setIsDrawing', false)
        switch (this.getInfoType) {
          case 'rect':
            this.$store.dispatch('rectInfo/addRect')
            break;
          case 'circle':
            this.$store.dispatch('circleInfo/addCircle')
            break;
          default:
            break;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .editor-body{
    width: 100%;
    height: calc( 100% - 58px );
    display: flex;
  }
</style>