<template>
  <div class="main" :class="{ draging: isDraging }" @dragover="dragoverFn" @dragleave="dragleaveFn" @dragend="dragendFn">
    <div class="main-header">
      <div class="logo"></div>
      <div class="title">
        <h1>小白GIF编辑器</h1>
        <p>轻松玩转GIF</p>
      </div>
    </div>

    <div class="main-uplaod-box" :class="{ 'draging-center' : isDragingCenter }" @dragover.prevent="dragoverInFn" @drop="dragFn" @dragleave="dragleaveInFn">
      <div class="upload-icon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconmoren"></use>
        </svg>
      </div>
      <div class="upload-info">
        <p>拖拽GIF文件至本页</p>
        <p>即可打开编辑</p>
      </div>
      <span class="upload-btn btn blue-btn" @click="showSelectFileFn">打开本地GIF图片</span>
      <input type="file" name="" id="" @change="selectFileFn" accept="image/gif" ref="updataGif" hidden>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      isDraging: false,
      isDragingCenter: false
    }
  },
  computed: {
    ...mapGetters('main',[
      'getIsOnGragend'
    ])
  },
  watch: {
    getIsOnGragend (n) {
      if(n) {
        this.isDraging = false
        this.isDragingCenter = false
        this.$store.commit('main/setIsOnGragend', false)
      }
    }
  },
  created () {
    this.$store.commit('main/setIsOnGragend', false)
  },
  methods: {
    showSelectFileFn () {
      this.$refs.updataGif.click()
    },
    selectFileFn (e) {
      this.initFile(e.target.files)
    },
    dragoverFn () {
      this.isDraging = true
    },
    dragleaveFn () {
      this.isDraging = false
    },
    dragFn (e) {
      this.isDraging = false
      this.initFile(e.dataTransfer.files)
    },
    dragoverInFn () {
      this.isDragingCenter = true
    },
    dragleaveInFn () {
      this.isDragingCenter = false
    },
    dragendFn () {
    },
    initFile (files) {
      if(files.length > 1){
        this.$store.commit('tips/setErrorText', 'GIF编辑只能选择一个文件！')
        this.$store.commit('tips/setIsShowError', true)
      }else if(files[0].type != 'image/gif'){
        this.$store.commit('tips/setErrorText', '格式不符，导入失败！')
        this.$store.commit('tips/setIsShowError', true)
      }else{
        let reader = new FileReader()
        reader.readAsArrayBuffer(files[0])
        reader.onload = e => {
          let bf = e.target.result
          let blob = new Blob([bf],{ type: 'image/gif' })
          let url = URL.createObjectURL(blob)
          this.$store.commit('main/setGifUrl', url)
          this.$store.commit('main/setLoadingText', '正在加载')
          this.$store.commit('main/setViewType', 'loading')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fb;
    .main-header{
      width: 1000px;
      max-width: 98%;
      min-width: 260px;
      display: flex;
      transition: all 0.3s;
      .logo{
        width: 80px;
        height: 80px;
        background: #fff url('../assets/img/logo.png') no-repeat center;
        border-radius: 50%;
        margin-right: 10px;
      }
      .title{
        h1{
          font-size: 22px;
          font-weight: 400;
          line-height: 45px;
          color: #000;
        }
        p{
          color: #646464;
        }
      }
    }
    .main-uplaod-box{
      width: 1000px;
      max-width: 98%;
      min-width: 260px;
      height: 520px;
      border: 1px dashed #d2d2d2;
      border-radius: 12px;
      margin-top: 55px;
      text-align: center;
      transition: all 0.3s;
      background-color: #fff;
      &.draging-center{
        background-color: #fafafa;
      }
      .upload-icon{
        width: 140px;
        height: 140px;
        line-height: 190px;
        background-color: #f0f0f0;
        border-radius: 50%;
        margin: 125px auto 30px;
        .icon{
          width: 60px;
          height: 65px;
        }
      }
      .upload-info{
        color: #000;
        line-height: 30px;
      }
      .upload-btn{
        width: 200px;
        height: 40px;
        line-height: 40px;
        padding: 0;
        border-radius: 20px;
        margin-top: 30px;
        font-size: 14px;
        opacity: 1;
        transition: all 0.3s;
        display: inline-block;
      }
    }
  }
  .draging{
    .main-header{
      opacity: .6;
    }
    .main-uplaod-box{
      border: 1px dashed #99d4ff;
      box-shadow: 0 0 20px rgba( 0, 0, 0, .2 );
      .upload-btn{
        opacity: 0;
      }
    }
  }
</style>