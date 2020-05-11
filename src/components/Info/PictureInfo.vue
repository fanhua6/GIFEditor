<template>
  <div class="info-body">
    <div class="info-scroll-box">
      <div class="info-con">
        <div class="info-title">
          贴图属性
        </div>

        <div class="info-item text-overflow">
          <span class="child-info-title">贴图名称 ：</span>
          <span class="child-info-value" :title="getPictureName">{{getPictureName}}</span>
        </div>

        <div class="info-item">
          <span class="child-info-title">贴图尺寸 ：</span>
          <span class="child-info-value">{{getPictureWidth}}宽 x {{getPictureHeight}}高</span>
        </div>

        <div class="info-item">
          <span class="btn" @click="replacePicture" title="提示：双击贴图可替换">替换贴图</span>
        </div>

        <div class="info-item" style="margin-top: 20px;">
          <OpacitySetting v-model="getPictureOpacity" id="PictureOpacitySetting" @mychange="changeOpacityFn" mtitle="输入从0到100的值" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OpacitySetting from '_c/customCom/OpacitySetting'

export default {
  name: 'PictureInfo',
  components: {
    OpacitySetting
  },
  computed: {
    ...mapGetters('pictureInfo', [
      'getPictureName',
      'getPictureWidth',
      'getPictureHeight',
      'getPictureOpacity'
    ])
  },
  methods: {
    changeOpacityFn (e) {
      this.$store.commit('pictureInfo/setPictureOpacity', e)
      this.$store.dispatch('pictureInfo/settingsPicture', { type: 'opacity', value: e })
    },
    replacePicture () {
      this.$store.dispatch('pictureInfo/replacePicture')
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-body{
    .info-item{
      line-height: 34px;
      
      .btn{
        display: block;
        padding: 0;
        text-align: center;
      }
    }
    .text-overflow{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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