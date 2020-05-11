<template>
  <div class="color-select-body">
    <div class="color-select-item" v-for="item in colors" :key="item">
      <label :for="name + item">
        <input :id="name + item" class="check-color" type="radio" :name="name" :value="item" :checked="item == value" hidden>
        <span class="item-color" :style="{ backgroundColor: item }"  :class="{'white-class': item == '#ffffff'}"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorSelecter',
  data () {
    return {
      // colorValue: '#ffffff',
      colors: [
        '#ffffff',
        '#000000',
        '#ff2880',
        '#ff053c',
        '#c91e33',
        '#ff653e',
        '#ffd503',
        '#a9ff04',
        '#688c6d',
        '#02881f',
        '#4fb5ff',
        '#1279e1',
        '#e2d2ff',
        '#8d71ff'
      ],
    }
  },
  props: {
    color: {
      type: String
    },
    name: {
      type: String
    },
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
  },
  methods: {
    changeColorFn (item) {
      this.$emit('update:value', item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .color-select-body{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 -10px;
    .color-select-item{
      width: 42px;
      label{
        display: block;
        text-align: center;
      }
      .item-color{
        width: 22px;
        height: 22px;
        display: inline-block;
        margin: 5px 0;
        border-radius: 50%;
        cursor: pointer;
        &.white-class{
          width: 20px;
          height: 20px;
          border: 2px solid #e7e7e7;
        }
      }
      .check-color:checked + .item-color{
        position: relative;
        &::before{
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          border-radius: 50%;
          border: 2px solid #fff;
        }
        &.white-class{
          // border: 2px solid #e7e7e7;
        }
        &.white-class::before{
          border: 2px solid #e7e7e7;
        }
      }
    }
  }
</style>