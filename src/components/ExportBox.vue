<template>
  <div class="dialog-bg">.
    <div class="dialog-box">
      <em @click="closeDialog" class="iconfont iconclosepx1"></em>
      <div class="left-section">
        <div class="img-box">
          <img :src="getExportGIFURL" alt="GIF编辑" @mousedown.prevent>
        </div>
        <p class="file-size">
          尺寸：{{getExportGIFWidth}}<span class="fenge">x</span>{{getExportGIFHeight}}<span class="fenge">/</span>
          时长：{{getExportGIFTime}}<span class="fenge">/</span>
          大小：<span>{{getExportGIFSize}}</span>
        </p>
      </div>
      <div class="right-section">
        <p class="box-title">导出与保存</p>
        <div class="file-contain">
          <div class="file-input">
            <span>默认路径</span>
            <input v-model="defaultPath" type="text" readonly :title="defaultPath" style="color: #868686;">
          </div>
          <em @click="changeDefaultPath" class="iconfile_" title="设置路径"></em>
        </div>
        <div class="file-contain">
          <div class="file-input">
            <span>文件名称</span>
            <input v-model="fileName" type="text" placeholder="输入文件名称">
          </div>
          <em>.gif</em>
        </div>
        <div class="btn-box">
          <button @click="saveFile" class="btn--c btn-blue">保存</button>
          <button @click="saveAsFile" class="btn--c btn-gray">另存为</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ExportBox',
  data(){
    return {
      defaultPath: '',
      fileName: '',
    }
  },
  computed: {
    ...mapGetters('main',[
      'getExportGIFURL',
      'getExportGIFSize',
      'getExportGIFWidth',
      'getExportGIFHeight',
      'getExportGIFTime',
    ])
  },
  created () {
    let d = new Date()
    chrome.settingsPrivate.getPref('browser.gif_save_path', d => {
      this.defaultPath = d.value
    })

    this.fileName = 'GIF图片' + d.getFullYear() + '' + this.formatTime(d.getMonth() + 1) + this.formatTime(d.getDate()) + this.formatTime(d.getHours()) + this.formatTime(d.getMinutes()) + this.formatTime(d.getSeconds())

    chrome.settingsPrivate.onPrefsChanged.addListener(res => {
      res.forEach(i => {
        if(i.key == 'browser.gif_save_path'){
          this.defaultPath = i.value
        }
      })
    })

    window.xbpanel = {
      FileSelectionFinished: (b) => {
        if(b){
          this.$store.commit('main/setViewType', 'export_success')
          // this.saveSuccess = true
        }else{
          //保存失败
        }
      },
      GifSaveStatus: (b) => {
        if(b){
          this.$store.commit('main/setViewType', 'export_success')
          // this.saveSuccess = true
        }else{
          //保存失败
        }
      }
    }
  },
  methods:{
    changeDefaultPath () {
      chrome.send('chooseGifFilePath')
    },
    saveFile () {
      chrome.send('saveGif', [this.fileName + '.gif', this.getExportGIFURL])
    },
    saveAsFile () {
      chrome.send('saveAsGif', [this.fileName + '.gif', this.getExportGIFURL])
    },
    closeDialog(){
      this.$store.commit('main/setViewType', 'editing')
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
button{border: none; outline: none; cursor: pointer;}
*{box-sizing: border-box;}
.dialog-bg{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 870px;
  min-height: 400px;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  z-index: 999;
}
.dialog-box{
  position: absolute;
  width: 858px;
  height: 388px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  padding: 20px 20px 62px 40px;
  border: 1px solid #000;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.1);
  & > div{
    float: left;
  }
  & .iconclosepx1{
    display: inline-block;
    position: absolute;
    top: 20px;
    right: 20px;
    opacity: .6;
    color: #000;
    cursor: pointer;
    &:hover{
      opacity: 1;
    }
  }
}
.left-section{
  width:360px;
  height: 306px;
  margin-right: 40px;
}
.right-section{
  width: 392px;
}
.box-title{
  height: 78px;
  line-height: 78px;
  color: #222;
  font-size: 18px;
}

.file-contain{
  display: inline-block;
  position: relative;
  margin-bottom: 30px;
  & > em{
    position: absolute;
    display: inline-block;
    width: 18px;
    height: 14px;
    right: -38px;
    top: 14px;
    font-style: normal;
  }
  .iconfile_{
    background: url('../assets/img/file.png') no-repeat;
    background-size: contain;
    cursor: pointer;
    &:hover{
      background-image: url('../assets/img/file_sel.png');
    }
  }
}


.btn--c{
  width: 122px;
  height: 36px;
  line-height: 36px;
  padding: 0 20px;
  margin: 28px 20px 0 0;
  color: #fff;
  font-size: 12px;
  border-radius: 100px;
  &.btn-blue{
    background: -webkit-gradient(linear,left top,right top,from(#08f),to(#00b6ff));
    box-shadow: 0px 4px 6px 0px rgba(0, 154, 255, 0.2);
    &:hover{
      background: -webkit-gradient(linear,left top,right top,from(#1490ff),to(#14bdff));
    }
  }
  &.btn-gray{
    color: #222;
    background: rgb(238, 238, 238);
    &:hover{
      background: rgb(221, 221, 221);
    }
  }
}
.file-input{
  width: 330px;
  height: 40px;
  line-height: 40px;
  background-color: #f5f5f5;
  font-size: 12px;
  border-radius: 2px;
  & > span{
    color: #888;
    display: inline-block;
    width: 76px;
    text-align: center;
    
  }
  & > input{
    width: 244px;
    padding: 0 10px 0 4px;
    border: none;
    outline: none;
    background-color: inherit;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:hover{
    background-color: rgb(228, 228, 228);
  }
}
.img-box{
  position: relative;
  width:360px;
  height: 240px;
  padding: 10px;
  margin-top: 44px;
  border: 1px solid rgb(238, 238, 238);
  & > img{
    position: absolute;
    max-width: 340px;
    max-height: 220px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
.file-size{
  margin-top: 6px;
  font-size: 12px;
  color: #000;
  .fenge{
    margin: 0 6px;
  }
}
</style>