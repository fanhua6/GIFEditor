<template>
  <div class="info-box">
    <div class="info-scroll-box">
      <div class="info-content">
        <GifInfo v-if="getInfoType == 'gif'" />
        <TextInfo v-if="getInfoType == 'textbox'" />
        <RectInfo v-if="getInfoType == 'rect'" />
        <CircleInfo v-if="getInfoType == 'circle'" />
        <PictureInfo v-if="getInfoType == 'image'" />
        <WebPictureListBox v-if="getInfoType == 'webpicbox'" />
        <WebPictureInfo v-if="getInfoType == 'webpic'" />
      </div>
    </div>

    <div class="info-footer" :class="{ 'no-shadow': getIsShowShadow }" v-if="getInfoType != 'gif' && getInfoType != 'webpicbox'">
      <DelectButton @myclick="delectFn" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GifInfo from './GifInfo'
import TextInfo from './TextInfo'
import RectInfo from './RectInfo'
import CircleInfo from './CircleInfo'
import PictureInfo from './PictureInfo'
import WebPictureListBox from './WebPictureListBox'
import WebPictureInfo from './WebPictureInfo'
import DelectButton from '_c/customCom/DelectButton'

export default {
  name: 'InfoBox',
  data () {
    return {
      isShowShadow: true
    }
  },
  components: {
    GifInfo,
    TextInfo,
    RectInfo,
    CircleInfo,
    PictureInfo,
    WebPictureListBox,
    WebPictureInfo,
    DelectButton
  },
  computed: {
    ...mapGetters('info', [
      'getInfoType',
      'getIsShowShadow'
    ]),
    ...mapGetters('editor',[
      'getCanvas',
      'getActiveObj',
      'getAnimateObj'
    ])
  },
  mounted () {
    this.checkIsShowShadow()
    window.addEventListener('resize', this.checkIsShowShadow)
  },
  watch: {
    getInfoType () {
      this.checkIsShowShadow()
    }
  },
  methods: {
    delectFn () {
      this.$store.dispatch('editor/deleteActiveObject')
      // if(this.getActiveObj && this.getAnimateObj[this.getActiveObj.id]){
      //   this.$store.commit('editor/deleteAnimateObj', this.getActiveObj.id)
      // }
      // if(this.getInfoType == 'textbox'){
      //   this.getActiveObj.set({text:''})
      // }
      
      // if(this.getActiveObj){
      //   this.getCanvas.remove(this.getActiveObj)
      // }
      // this.$store.commit('info/setInfoType', 'gif')
      // this.getCanvas.discardActiveObject()
      // this.getCanvas.renderAll()
    },
    checkIsShowShadow () {
      this.$store.dispatch('info/checkIsShowShadow')
    }
  }
}
</script>

<style lang="scss">
  .info-box{
    width: 332px;
    border-left: 1px solid #e5e5e5;
    color: #000;
    height: 100%;
    display: flex;
    flex-direction: column;
    .info-scroll-box{
      flex: 1;
      overflow-y: auto;
      .info-con{
        padding: 20px;
      }
    }
    .info-title{
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 16px;
      color: #000;
      font-weight: 400;
    }
    .item-title{
      font-weight: 400;
      line-height: 50px;
      margin-top: 16px;
    }
    .info-item{
      .info-item-title{
        line-height: 52px;
        color: #000;
      }
    }
    .info-footer{
      width: 100%;
      line-height: 118px;
      background-color: #fff;
      text-align: center;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    }.no-shadow{
      box-shadow: unset;
    }
  }
</style>