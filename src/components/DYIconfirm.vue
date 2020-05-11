<template>
  <div class="confirm-box">
    <div class="confirm-body">
      <span class="iconfont iconclosepx1" @click="cancelFn"></span>
      <div class="confirm-info">
        <span class="iconfont" :class="getConfirmType"></span>
        {{ getConfrimText }}
      </div>

      <div class="btn-box">
        <span class="btn--c btn-blue" @click="confirmFn">确定</span>
        <span class="btn--c btn-gray" @click="cancelFn" v-if="!getIsSavePng">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DYIconfirm',
  computed: {
    ...mapGetters('tips',[
      'getConfrimText',
      'getConfirmType',
      'getConfrimCallback',
      'getIsSavePng'
    ])
  },
  methods: {
    cancelFn () {
      this.$store.commit('tips/setConfrimText', '')
      this.$store.commit('tips/setConfirmType', 'icontips')
      this.$store.commit('tips/setConfrimCallback', undefined)
      this.$store.commit('tips/setIsSavePng', false)
      this.$store.commit('tips/setIsShowConfirm', false)
    },
    confirmFn () {
      this.$store.commit('tips/setConfrimText', '')
      this.$store.commit('tips/setConfirmType', 'icontips')
      this.$store.commit('tips/setIsSavePng', false)
      this.$store.commit('tips/setIsShowConfirm', false)
      if(typeof this.getConfrimCallback == 'function') {
        this.getConfrimCallback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .confirm-box{
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.8);
    .confirm-body{
      padding: 50px 70px 20px;
      background-color: #fff;
      border: 1px solid rgba(0,0,0,.1);
      border-radius: 3px;
      box-shadow: 0 6px 16px rgba(0,0,0,.1);
      position: relative;
      .iconclosepx1{
        position: absolute;
        top: 13px;
        right: 15px;
        opacity: .6;
        color: #000;
        &:hover{
          opacity: 1;
        }
      }
      .confirm-info {
        font-size: 16px;
        color: #222;
        .iconfont{
          font-size: 24px;
          margin-right: 10px;
          vertical-align: -4px;
        }
        .icontips{
          color: #009bf1;
        }
        .iconerror {
          color: #e81123;
        }
      }
      .btn-box{
        margin-top: 30px;
        text-align: center;
        .btn--c{
          width: 82px;
          height: 36px;
          line-height: 36px;
          padding: 0 10px;
          margin: 10px;
          color: #fff;
          font-size: 12px;
          border-radius: 18px;
          border: 0 none;
          display: inline-block;
          text-align: center;
          cursor: pointer;
          &.btn-blue{
            background: -webkit-gradient(linear,left top,right top,from(#08f),to(#00b6ff));
            box-shadow: 0px 4px 6px 0px rgba(0, 154, 255, 0.2);
            &:hover{
              background: -webkit-gradient(linear,left top,right top,from(#1490ff),to(#14bdff));
            }
          }
          &.btn-gray{
            color: #222;
            background: rgb(238, 238, 238);
            &:hover{
              background: rgb(221, 221, 221);
            }
          }
        }
      }
    }
  }
</style>