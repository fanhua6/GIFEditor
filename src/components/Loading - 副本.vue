<template>
  <div class="loading-box">
    <div class="loading-text">{{ getLoadingText }}</div>
    <div class="loading-inner">
      <span class="inner" v-for="inner in inners" :key="inner"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Loading',
  data () {
    return {
      inners: ['1','2','3','4','5','6']
    }
  },
  computed: {
    ...mapGetters('main', [
      'getLoadingText'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .loading-box{
    width: 100%;
    height: 100%;
    background-color: rgba( 0, 0, 0, .8 );
    color: #fff;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    .loading-text{
      width: 100%;
      font-size: 16px;
    }
    .loading-inner{
      width: 100%;
      height: 18px;
      margin-top: 70px;
      .inner{
        width: 14px;
        height: 14px;
        background-color: #00a0e9;
        display: inline-block;
        border-radius: 50%;
        opacity: 0;
        margin: 0 16px;
      }
      .inner:nth-child(1){
        animation: loader 3s 600ms infinite ease-in-out;
      }
      .inner:nth-child(2){
        animation: loader 3s 500ms infinite ease-in-out;
      }
      .inner:nth-child(3){
        animation: loader 3s 400ms infinite ease-in-out;
      }
      .inner:nth-child(4){
        animation: loader 3s 300ms infinite ease-in-out;
      }
      .inner:nth-child(5){
        animation: loader 3s 200ms infinite ease-in-out;
      }
      .inner:nth-child(6){
        animation: loader 3s 100ms infinite ease-in-out;
      }
    }
  }

  @keyframes loader {
    0% {
      opacity: 0;
      transform: translateX(-200px) scale(.6);
    }
    45% {
      opacity: 1;
      transform: translateX(0px) scale(1.3);
    }
    55% {
      opacity: 1;
      transform: translateX(0px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateX(200px) scale(.6);
    }
  }
</style>