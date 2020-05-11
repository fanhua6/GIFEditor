<template>
  <div class="massage-box">
    <span class="iconfont" :class=" [icon , 'type' + getMassageType ] "></span>
    <span class="error-text">{{ getMassageText }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MassageBox',
  data () {
    return {
      icons: ['iconerror','iconsuccess','icontips'],
      icon: 'iconerror'
    }
  },
  computed: {
    ...mapGetters('tips',[
      'getMassageType',
      'getIsShowMassage',
      'getMassageText'
    ])
  },
  watch: {
    getIsShowMassage (n) {
      if(n){
        setTimeout(() => {
          this.$store.commit('tips/setIsShowMassage', false)
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .massage-box{
    position: fixed;
    padding: 10px 20px;
    top: 60px;
    left: 50%;
    border: 1px solid rgba( 0, 0, 0, .1 );
    box-shadow: 0 6px 16px rgba( 0, 0, 0, .1 );
    border-radius: 3px;
    transform: translateX( -50% );
    transition: top 0.5s ease-out;
    .iconfont{
      font-size: 18px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .type0{
      color: #e81123;
    }
    .type1{
      color: #00cf43;
    }
    .type2{
      color: #009bf1;
    }
    &.active{
      top: 90px;
    }
  }
</style>