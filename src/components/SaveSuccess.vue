<template>
  <div class="dialog-bg">.
    <div class="dialog-box">
      <em @click="closeDialog" class="iconfont iconclosepx1"></em>
      <div class="left-section">
        <div class="img-box">
          <img :src="getExportGIFURL" alt="GIF编辑图" @mousedown.prevent id="img123">
        </div>
        <p class="file-size">
          尺寸：{{getExportGIFWidth}}<span class="fenge">x</span>{{getExportGIFHeight}}<span class="fenge">/</span>
          时长：{{getExportGIFTime}}<span class="fenge">/</span>
          大小：<span>{{getExportGIFSize}}</span>
        </p>
      </div>
      <div class="right-section">
        <p class="box-title">导出与保存</p>
        <div class="success-pop">
          <span class="iconfont iconsuccess"></span>
          <p class="pop-text">保存成功</p>
        </div>
        <div class="btn-box">
          <button @click="openFile" class="btn--c btn-blue">打开文件</button>
          <button @click="openFolder" class="btn--c btn-gray">打开所在文件夹</button>
          <button @click="copyFile" class="btn--c btn-gray" data-clipboard-action="cut" data-clipboard-target="#img123">复制文件</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SaveSuccess',
  computed: {
    ...mapGetters('main',[
      'getExportGIFURL',
      'getExportGIFSize',
      'getExportGIFWidth',
      'getExportGIFHeight',
      'getExportGIFTime',
    ])
  },
  methods:{
    closeDialog(){
      this.$store.commit('main/setViewType', 'editing')
    },
    openFile(){
      chrome.send('openGifFile')
    },
    openFolder(){
      chrome.send('openGifFileFolder')
    },
    copyFile () {
      chrome.send("saveDataToClipboard")
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

.success-pop{
  height: 140px;
  text-align: center;
  .iconsuccess{
    display: inline-block;
    margin-top: 28px;
    font-size: 40px;
    color: rgb(0, 207, 67);
  }
  .pop-text{
    margin-top: 16px;
    font-size: 14px;
    color: #222;
  }
}

.btn-box{text-align: center;}
.btn--c{
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
  margin: 28px 6px 0 0;
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
}
</style>