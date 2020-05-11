<template>
  <div class="header-box">
    <div class="header-left">
      <div class="logo">
        <span class="logo-img" @click="toHome"></span>
        <span class="logo-title" @click="toHome">小白GIF编辑器</span>
      </div>
    </div>
    <!-- <div class="menu">
      <span class="iconfont icontext" @click="addTextFn">
        <span class="iconfont-info">文字</span>
      </span>
    </div> -->
    <div class="size-tool" v-if="false">
      <span class="iconfont iconnarrow"></span>
      <span class="size-num">98%</span>
      <span class="iconfont iconenlarge"></span>
    </div>
    <div class="header-right">
      <span class="menu" @click="previewGIF"><span class="iconfont iconpreview"></span>预览GIF</span>
      <span class="menu" @click="showSelectFileFn">
        <span class="iconfont iconImport"></span>导入GIF
        <!-- <input type="file" name="" id="" @change="selectFileFn" accept="image/gif" ref="updataGif2" hidden> -->
      </span>
      <span class="blue-btn" @click="exportGIF"><span class="iconfont iconsave"></span>导出GIF</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data(){
    return{
      swtich: false
    }
  },
  computed: {
    ...mapGetters('editorPlay',[
      'getPlayIndex',
      'getPlayMode',
      'getPlaySpeed'
    ]),
    ...mapGetters('gifInfo', [
      'getGifWidth',
      'getGifHeight'
    ]),
    ...mapGetters('editor', [
      'getCanvas'
    ])
  },
  methods: {
    showSelectFileFn () {
      chrome.send('chooseGifFile')
    },
    selectFileFn (e) {
      let files = e.target.files
      if(files.length > 1){
        this.$store.commit('tips/setErrorText', 'GIF编辑只能选择一个文件！')
        this.$store.commit('tips/setIsShowError', true)
      }else if(files[0].type != 'image/gif'){
        this.$store.commit('tips/setErrorText', '格式不符，导入失败！')
        this.$store.commit('tips/setIsShowError', true)
      }else{
        this.$store.dispatch('tips/confrimFn', { text: '你确定要放弃本次编辑？', callback: () => {
          let reader = new FileReader()
          reader.readAsArrayBuffer(files[0])
          reader.onload = e => {
            let bf = e.target.result
            let blob = new Blob([bf],{ type: 'image/gif' })
            let url = URL.createObjectURL(blob)
          }
        } })
        
      }
    },
    toHome () {
      this.$store.dispatch('tips/confrimFn', { text: '你确定要放弃本次编辑？', callback: () => {
        this.$store.commit('main/setViewType', 'main')
        location.href = '/'
      } })
    },
    previewGIF () {
      this.$store.commit('main/setIsPreview', true)
      this.$store.commit('main/setLoadingText', '正在加载')
      this.generateGIF()  
    },
    exportGIF () {
      this.$store.commit('main/setIsPreview', false)
      this.$store.commit('main/setLoadingText', '正在导出')
      this.generateGIF()  
    },
    generateGIF () {
      this.getCanvas.discardActiveObject()
      this.getCanvas.requestRenderAll()
      let isH = false
      this.$store.commit('editorPlay/setPlayIndex', 0)
      this.$store.commit('editorPlay/setPlayType', 'pause')
      this.$store.commit('main/setViewType', 'loading')
      
      let obj = {
        play_mode: this.getPlayMode,
        play_speed: this.getPlaySpeed,
        img_width: this.getGifWidth,
        img_height: this.getGifHeight,
        edit_img_data: []
      }
      let dom = document.getElementById('imgedit')
      this.getCanvas.forEachObject(e => {
        isH = true
      })
      if(isH){
        let t = setInterval(() => {
          let o = {
            id: this.getPlayIndex,
            data: this.getCanvas.toDataURL() || ''
          }
          obj.edit_img_data.push(o)
          this.$store.commit('editorPlay/setPlayIndex', this.getPlayIndex + 1)
          if(this.getPlayIndex == 5) {
            clearInterval(t)
            this.$store.commit('editorPlay/setPlayIndex', 0)
            dom.startCompositor(JSON.stringify(obj))
          }
        }, 50)
      }else{
        dom.startCompositor(JSON.stringify(obj))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-box{
    width: 100%;
    height: 58px;
    line-height: 58px;
    box-shadow: 0 0 6px rgba( 0, 0, 0, .1);
    display: flex;
    .header-left{
      flex: 1;
    }
    .logo{
      margin-left: 20px;
      span{
        cursor: pointer;
      }
      .logo-img{
        width: 36px;
        height: 36px;
        display: inline-block;
        background: url('../../assets/img/logo.png') no-repeat center;
        background-size: 36px 36px;
        vertical-align: middle;
        margin: 0 10px 0 0;
      }
    }
    .iconfont{
      cursor: pointer;
    }
    // .menu{
    //   flex: 1;
    //   text-align: center;
    //   .iconfont{
    //     width: 32px;
    //     height: 32px;
    //     line-height: 32px;
    //     color: #545454;
    //     display: inline-block;
    //     vertical-align: middle;
    //     position: relative;
    //     .iconfont-info{
    //       min-width: 40px;
    //       // height: 26px;
    //       // line-height: 26px;
    //       position: absolute;
    //       bottom: -40px;
    //       left: -10px;
    //       color: #fff;
    //       background-color: #525253;
    //       border-radius: 3px;
    //       padding: 0 6px;
    //       display: none;
    //     }
    //     &:hover{
    //       background-color: #f0f0f0;
    //       .iconfont-info{
    //         display: inline-block;
    //       }
    //     }
    //   }
    // }
    .size-tool{
      color: #949494;
      margin-right: 20px;
      .size-num{
        margin: 0 18px
      }
    }
    .header-right{
      // width: 332px;
      // text-align: right;
      float: right;
      .menu{
        margin-right: 20px;
        cursor: pointer;
        color: #000;
        transition: all .2s;
        &:hover{
          color: #4fb5ff;
        }
      }
      .blue-btn{
        width: 140px;
        height: 58px;
        display: inline-block;
        padding: 0;
        text-align: center;
        background-image: linear-gradient(to right, #007eff, #00c0ff);
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 154, 255, .2);
        transition: all .2s;
        &:hover{
          background-image: linear-gradient(to right, #0579e2, #25bffb);
        }
      }
      .iconfont{
        vertical-align: 0;
        margin-right: 6px;
      }
    }
  }
</style>