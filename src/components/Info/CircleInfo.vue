<template>
  <div class="info-body">
    <div class="info-scroll-box">
      <div class="info-con">
        <div class="info-title">
          圆形属性
        </div>

        <div class="info-item">
          <div class="info-item-title">
            填充颜色
            <div class="fr color-picker-box">
              <ColorPicker @change.native="changeColorFn" :color="getFillColor" />
            </div>
          </div>

          <div class="color-select-box">
            <ColorSelecter @change.native="changeColorFn" v-model="getFillColor" name="circleFillColor"  />
          </div>
        </div>

        <div class="info-item">
          <div class="info-item-title">
            边框样式
          </div>

          <BorderSelect @change.native="changeBorderStyleFn" v-model="getBorderType" name="circleBorder" />
        </div>

        <div class="info-item" v-if="getBorderType">
          <div class="info-item-title">
            边框颜色
            <div class="fr color-picker-box">
              <ColorPicker @change.native="changeBorderColorFn" :color="getBorderColor" />
            </div>
          </div>

          <div class="color-select-box">
            <ColorSelecter @change.native="changeBorderColorFn" v-model="getBorderColor" name="borderColor"  />
          </div>
        </div>

        <div class="info-item" v-if="getBorderType" style="margin-top: 20px;">
          <BorderWidthSetting v-model="getBorderWidth" id="CircleBorderWidthSetting" @mychange="changeCircleBorderWidthFn" mtitle="输入从0到10的值" />
        </div>

        <div class="info-item" style="margin-top: 20px;">
          <OpacitySetting v-model="getCircleOpacity" id="CircleOpacitySetting" @mychange="changeOpacityFn" mtitle="输入从0到100的值" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ColorSelecter from '_c/customCom/ColorSelecter'
import ColorPicker from '_c/customCom/ColorPicker'
import BorderSelect from '_c/customCom/BorderSelect'
import BorderWidthSetting from '_c/customCom/BorderWidthSetting'
import OpacitySetting from '_c/customCom/OpacitySetting'
import DelectButton from '_c/customCom/DelectButton'

export default {
  name: 'CircleInfo',
  components: {
    ColorSelecter,
    ColorPicker,
    BorderSelect,
    BorderWidthSetting,
    OpacitySetting,
    DelectButton
  },
  computed: {
    ...mapGetters('circleInfo',[
      'getFillColor',
      'getBorderType',
      'getBorderColor',
      'getBorderWidth',
      'getCircleOpacity'
    ])
  },
  methods: {
    changeColorFn (e) {
      this.$store.commit('circleInfo/setFillColor', e.target.value)
      this.$store.dispatch('circleInfo/settingsCircle', { type: 'fill', value: e.target.value })
    },
    changeBorderColorFn (e) {
      this.$store.commit('circleInfo/setBorderColor', e.target.value)
      this.$store.dispatch('circleInfo/settingsCircle', { type: 'borderColor', value: e.target.value })
    },
    changeBorderStyleFn (e) {
      this.$store.commit('circleInfo/setBorderType', e.target.value)
      this.$store.dispatch('info/checkIsShowShadow')
      this.$store.dispatch('circleInfo/settingsCircle', { type: 'borderType', value: e.target.value })
    },
    changeCircleBorderWidthFn (e) {
      this.$store.commit('circleInfo/setBorderWidth', e)
      this.$store.dispatch('circleInfo/settingsCircle', { type: 'borderWidth', value: e })
    },
    changeOpacityFn (e) {
      this.$store.commit('circleInfo/setCircleOpacity', e)
      this.$store.dispatch('circleInfo/settingsCircle', { type: 'opacity', value: e })
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-body{
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