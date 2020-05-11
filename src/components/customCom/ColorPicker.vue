<template>
  <div class="color-picker">
    <span class="color-box" @click="showColorFn" :style="{ backgroundColor: colorValue }"></span>
    <span class="iconfont iconxiguan" @click="showColorPickerFn"></span>
    <input type="color" name="" v-model="colorValue" hidden ref="colorInput" @change="changeColorFn">
    <input type="color-picker" hidden ref="colorPickerInput" @change="changeColorFn">
  </div>
</template>

<script>
export default {
  name: 'ColorPicker',
  data () {
    return {
      colorValue: '#fff'
    }
  },
  props: ['color'],
  mounted () {
    this.colorValue = this.color
  },
  watch: {
    color (n) {
      this.colorValue = n
    }
  },
  methods: {
    showColorFn () {
      this.$refs.colorInput.click()
    },
    showColorPickerFn () {
      this.$refs.colorPickerInput.click()
    },
    changeColorFn (e) {
      this.colorValue = e.target.value
    }
  }
}
</script>

<style lang="scss" scoped>
  .color-picker{
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    line-height: 100%;
    border: 1px solid #d6d6d6;
    border-radius: 2px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      cursor: pointer;
    }
    .color-box{
      width: 64px;
      height: 16px;
      border: 1px solid #eee;
      display: inline-block;
      border-radius: 2px;
    }
    .iconfont{
      display: inline-block;
      margin: 2px;
    }
  }
</style>