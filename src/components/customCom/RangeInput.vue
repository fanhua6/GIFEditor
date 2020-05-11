<template>
  <div class="range-box">
    <input type="range" v-model="newValue" :id="id" class="m-range" :min="min" :max="max" @change="changeValueFn">
  </div>
</template>

<script>
export default {
  name: 'RangeInput',
  data () {
    return {
      newValue: 100
    }
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
    unit: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 30
    }
  },
  watch: {
    value (n, o) {
      this.newValue = parseInt(this.value) || 1
    }
  },
  created () {
    this.newValue = this.value ? parseInt(this.value) : 100
  },
  methods: {
    changeValueFn (e) {
      this.$emit('mychange', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .range-box{
    margin: 0 14px 0 10px;
    flex: 1;
    .m-range{
      width: 100%;
      height: 2px;
      background-color: #4fb5ff;
      border-radius: 4px;
      position: relative;
      -webkit-appearance: none; /*去除默认样式*/
      -webkit-appearance: none;
      padding: 0;
      border: none;
      outline: none;
      vertical-align: middle;
      &::-webkit-slider-thumb {
        -webkit-appearance: none;/*去除默认样式*/
        cursor: default;
        top: 0;
        height: 14px;
        width: 14px;
        transform: translateY(0px);
        background: #4fb5ff;
        border-radius: 14px;
        cursor: pointer;
        &:hover{
          box-shadow: 0 0 5px #4fb5ff;
        }
      }
    }
  }
</style>