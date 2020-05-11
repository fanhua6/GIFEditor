<template>
  <div class="loading-box">
    <!-- <div class="loading-text">{{ getLoadingText }}</div>
    <div class="loading-inner">
      <span class="inner" v-for="inner in inners" :key="inner"></span>
    </div> -->
    <div class="loading-con">
      <div class="logo">
        <div class="logo-gif"></div>
      </div>
      <div class="loading-text">{{ getLoadingText }}</div>
      <div class="loading-help">{{ helpinfo }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Loading',
  data () {
    return {
      helpinfo: '',
      helpInfos: [
        '',
        '鼠标移入网页GIF动图即可打开编辑',
        '网页GIF动图可从右键菜单打开编辑',
        '本地GIF文件可从右键菜单打开编辑',
        '网络GIF动图可鼠标拖入编辑器打开',
        '本地GIF文件可鼠标拖入编辑器打开',
        '点击右上角GIF按钮快速打开编辑器',
        '使用空格键切换GIF播放/暂停状态',
        '使用ESC键退出GIF预览播放状态',
        '滑动鼠标滚轮左右查看GIF分帧列表',
        '添加贴图后双击贴图可替换本地图片'
      ]
    } 
  },
  computed: {
    ...mapGetters('main', [
      'getLoadingText'
    ])
  },
  created () {
    let i = Math.floor(Math.random()*this.helpInfos.length)
    this.helpinfo = this.helpInfos[i]
  }
}
</script>

<style lang="scss" scoped>
  .loading-box{
    width: 100%;
    height: 100%;
    background-color: rgba( 0, 0, 0, .8 );
    color: #fff;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    .loading-con{
      width: 370px;
      min-height: 200px;
      background-color: #fff;
      border-radius: 3px;
      .logo{
        width: 90px;
        height: 90px;
        background: #fff url('../assets/img/loading.png') no-repeat center;
        margin: 50px auto 20px;
        .logo-gif{
          width: 90px;
          height: 90px;
          background: url('../assets/img/logo.gif') no-repeat center;
        }
      }
      .loading-text{
        color: #222;
        font-size: 20px;
      }
      .loading-help{
        color: #666;
        line-height: 28px;
        margin: 20px 0;
      }
    }
  }
</style>