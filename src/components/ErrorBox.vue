<template>
  <div class="error-box" :class="{ active: getIsShowError }">
    <span class="iconfont iconerror"></span>
    <span class="error-text">{{ getErrorText }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ErrorBox',
  computed: {
    ...mapGetters('tips', [
      'getErrorText',
      'getIsShowError'
    ])
  },
  watch: {
    getIsShowError (n) {
      if(n){
        setTimeout(() => {
          this.$store.commit('tips/setIsShowError', false)
        }, 2000)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .error-box{
    position: fixed;
    padding: 10px 20px;
    top: -60px;
    left: 50%;
    border: 1px solid rgba( 0, 0, 0, .1 );
    box-shadow: 0 6px 16px rgba( 0, 0, 0, .1 );
    border-radius: 3px;
    transform: translateX( -50% );
    transition: top 0.5s ease-out;
    background-color: #ffffff;
    .iconfont{
      color: #e81123;
      font-size: 18px;
      vertical-align: middle;
      margin-right: 10px;
    }
    &.active{
      top: 90px;
    }
  }
</style>