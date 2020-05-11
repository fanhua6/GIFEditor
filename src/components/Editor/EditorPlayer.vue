<template>
  <div class="player-box">
    <span class="iconfont iconleftplay" :class="{ disabled : getPlayType == 'play' }" @click="changePlayIndex(-1)" title="上一帧"></span>
    <span class="iconfont iconplay" v-if="getPlayType == 'pause'" @click="changePlayType('play')" title="播放"></span>
    <span class="iconfont iconsuspend" v-if="getPlayType == 'play'" @click="changePlayType('pause')" title="暂停"></span>
    <span class="iconfont iconrightplay" :class="{ disabled : getPlayType == 'play' }" @click="changePlayIndex(1)" title="下一帧"></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EditorPlayer',
  data () {
    return {
      timer: null,
      gifIndex: 0,
      isUp: true,
      animateStep: 5
    }
  },
  computed: {
    ...mapGetters('editorPlay',[
      'getPlayType',
      'getPlaySpeed',
      'getPlayOutTime',
      'getPlayIndex',
      'getPlayMode'
    ]),
    ...mapGetters('gifInfo', [
      'getFrameNumber'
    ]),
    ...mapGetters('editor',[
      'getCanvas',
      'getAnimateObj'
    ])
  },
  watch: {
    getPlaySpeed () {
      if(this.getPlayType == 'play') {
        clearInterval(this.timer)
        this.gifPlay()
      }
    },
    getPlayMode () {
      if(this.getPlayType == 'play') {
        clearInterval(this.timer)
        this.gifPlay()
      }
    },
    getPlayType () {
      clearInterval(this.timer)
      if(this.getPlayType == 'play') {
        this.gifPlay()
      }
    },
    getPlayIndex (n) {
      this.gifIndex = n
      this.initAnimate(n)
    }
  },
  mounted () {
    if(this.getPlayType == 'play') {
      clearInterval(this.timer)
      this.gifPlay()
    }
  },
  methods: {
    changePlayType (t) {
      this.$store.commit('editorPlay/setPlayType', t)
      clearInterval(this.timer)
      if(t == 'play'){
        this.gifPlay()
      }
    },
    changePlayIndex (i) {
      if(this.getPlayType == 'pause'){
        let n = i == 1 ? (this.getPlayIndex + i == this.getFrameNumber ? 0 : this.getPlayIndex + i) : (this.getPlayIndex + i == -1 ? this.getFrameNumber - 1 : this.getPlayIndex + i)
        this.$store.dispatch('editorPlay/setPlayIndex', n)
      }
    },
    gifPlay () {
      let t = Math.round(this.getPlayOutTime/this.getPlaySpeed)
      this.timer = setInterval(() => {
        if(this.getPlayMode == 0){
          this.gifIndex = this.gifIndex + 1 == this.getFrameNumber ? 0 : this.gifIndex + 1
        }else if(this.getPlayMode == 1){
          this.gifIndex = this.gifIndex < 1 ?  this.getFrameNumber - 1 : this.gifIndex - 1
        }else if(this.getPlayMode == 2) {
          if(this.isUp) {
            this.gifIndex = this.gifIndex + 1 == this.getFrameNumber ? 0 : this.gifIndex + 1
            this.isUp = !(this.gifIndex + 1 == this.getFrameNumber)
          }else{
            this.gifIndex = this.gifIndex < 1 ?  this.getFrameNumber - 1 : this.gifIndex - 1
            this.isUp = this.gifIndex < 1
          }
        }
        
        this.$store.dispatch('editorPlay/setPlayIndex', this.gifIndex)
      }, t)
    },
    initAnimate (i) {
      for(let o in this.getAnimateObj){
        switch (this.getAnimateObj[o].animateType) {
          case 'zoomInOut':
            this.animateSizeFn(i, this.getAnimateObj[o])
            break;
          case 'flash':
            this.animateFlashFn(i, this.getAnimateObj[o])
            break;
          case 'shakeUpDown':
            this.animateShakeUpDownFn(i, this.getAnimateObj[o])
            break;
          default:
            break;
        }
      }
    },
    animateSizeFn (i, o) {
      let size = o.oldFontSize
      let interval = parseInt(o.oldFontSize/10)
      let vertex = Math.ceil(this.animateStep/2)
      let top = o.oldTop
      let left = o.oldLeft
      let scale = i % this.animateStep > (vertex - 1) ? 1 + (this.animateStep - ( i % this.animateStep ) - 1) / 10 : 1 + (i % this.animateStep) / 10

      size = i % this.animateStep > (vertex - 1) ? size + (this.animateStep - ( i % this.animateStep ) - 1) : size + (i % this.animateStep)

      // size = i % this.animateStep > (vertex - 1) ? size + (interval * (this.animateStep - ( i % this.animateStep ) - 1)) : size + (interval * (i % this.animateStep))

      // let aa = i % this.animateStep > (vertex - 1) ? interval * (this.animateStep - ( i % this.animateStep ) - 1) : interval * (i % this.animateStep)

      // o.set({ fontSize: size, top: top - aa / 2, left: left - (aa * o.text.length / 2), dirty: true })
      // o.set({ opacity: 1 })
      // o.set({ fontSize: size, dirty: true })

      o.set({ opacity: 1 })
      o.set({ fontSize: size, dirty: true })
      
      this.getCanvas.requestRenderAll()
    },
    animateFlashFn (i, o) {
      let vertex = Math.ceil(this.animateStep/2)
      let opacity = i % this.animateStep > (vertex - 1) ? 1 - .5 * (this.animateStep - ( i % this.animateStep ) - 1) : 1 - .5 * (i % this.animateStep)
      opacity = opacity.toFixed(2)
      o.set({ opacity: opacity, dirty: true })
      this.getCanvas.renderAll()
    },
    animateShakeUpDownFn (i, o) {
      let top = o.oldTop
      let vertex = Math.ceil(this.animateStep/2)
      let translateY = i % this.animateStep > (vertex - 1) ? -2 * -(this.animateStep - ( i % this.animateStep ) - 1) : 2 * (i % this.animateStep)
      o.set({ opacity: 1 })
      o.set({ top: top + translateY, dirty: true })
      this.getCanvas.renderAll()
    },
  }
}
</script>

<style lang="scss" scoped>
  .player-box{
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