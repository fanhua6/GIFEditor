<template>
  <div class="delect-btn-body">
    <span class="iconfont icondel" title="删除" @click="clickFn"></span>
  </div>
</template>

<script>
export default {
  name: 'DelectButton',
  methods: {
    clickFn () {
      this.$emit('myclick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .delect-btn-body{
    .iconfont{
      width: 45px;
      height: 45px;
      line-height: 45px;
      display: inline-block;
      border: 1px solid #e5e5e5;
      border-radius: 50%;
      font-size: 32px;
      color: #4d4d4d;
      cursor: pointer;
    }:hover{
      border-color: rgb(79, 181, 255);
      color: rgb(79, 181, 255);
    }
  }
</style>