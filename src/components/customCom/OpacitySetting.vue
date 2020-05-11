<template>
  <div class="border-width-box">
    <div class="title">不透明度</div>
    <div class="border-middle">
      <RangeInput :value="value" :min="min" :max="max" @mychange="changeValueFn" />
    </div>
    <div class="border-set-box">
      <fh-Number-Input :id="id" :value="value" unit="%" :min="min" :max="max" @mychange="changeValueFn" />
      <div class="title-box">
        {{mtitle}}
      </div>
    </div>
  </div>
</template>

<script>
import fhNumberInput from './fhNumberInput'
import RangeInput from './RangeInput'
export default {
  name: 'OpacitySetting',
  data () {
    return {
      min: 0,
      max: 100,
      oldValue: ''
    }
  },
  components: {
    fhNumberInput,
    RangeInput
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    mtitle: {
      String,
      default: ''
    }
  },
  methods: {
    changeValueFn (e) {
      this.$emit('mychange', e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .border-width-box{
    width: calc(100% - 2px);
    height: 44px;
    line-height: 44px;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    display: flex;
    justify-content: space-between;
    .title{
      padding-left: 14px;
      width: 72px;
    }
    .border-set-box{
      position: relative;
      padding-right: 12px;
      .title-box{
        line-height: 28px;
        padding: 0 10px;
        position: absolute;
        right: 0;
        top: 46px;
        white-space:nowrap;
        background-color: #4c4c4c;
        color: #fff;
        border-radius: 2px;
        display: none;
        z-index: 9;
      }
      &:hover .title-box{
        display: block;
      }
    }
  }
</style>