<template>
  <div class="border-box">
    <div class="border-type-item" v-for="item in types" :key="item.id" :class="{ active: item.type == value }">
      <label :for="name + item.id">
        <input :id="name + item.id" class="check-border" type="radio" :name="name" :value="item.type" :checked="item.type == value" hidden @change="changeBorderStyle(item.type)">
        <span class="border-type-btn" :class="item.type">{{ item.title }}</span>
        <div class="border-icon" v-if="item.type" :style="{ borderBottomStyle: item.type }"></div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BorderSelect',
  data () {
    return {
      types: [
        { id: 1, type: '', title: '无边框' },
        { id: 2, type: 'solid', title: '' },
        { id: 3, type: 'dashed', title: '' }
      ]
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  created () {
  },
  methods: {
    changeBorderStyle (type) {
      this.$emit('update:value', type)
    }
  }
}
</script>

<style lang="scss" scoped>
  .border-box{
    display: flex;
    justify-content: space-between;
    .border-type-item{
      width: 88px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #e5e5e5;
      border-radius: 2px;
      cursor: pointer;
      label{
        width: 100%;
        height: 100%;
        display:inline-block;
        cursor: pointer;
      }
      .border-type-btn{
        cursor: pointer;
      }
      .border-icon{
        width: 70%;
        height: 15px;
        margin: 0 auto;
        border-bottom: 1px solid #7d7d7d;
        cursor: pointer;
      }
      &.active{
        border-color: #4fb5ff;
        background-color: #4fb5ff;
        color: #fff;
        .border-icon{
          border-bottom-color: #fff;
        }
      }
    }
  }
</style>