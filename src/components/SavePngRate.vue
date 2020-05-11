<template>
  <div class="save-png-rate-box">
    <div class="save-body">
      <div class="save-info">
        <div class="save-title">正在保存</div>
        <div class="save-rate">
          <span>{{ getSaveRate }}</span>
          <span class="fen">|</span>
          <span>{{ getFrameNumber }}</span>
        </div>
      </div>
      <div class="rate-box">
        <div class="rate" :style="{ 'width': rwidth }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SavePngRate',
  computed: {
    ...mapGetters('gifInfo',[
      'getFrameNumber'
    ]),
    ...mapGetters('tips',[
      'getSaveRate'
    ]),
    rwidth () {
      return parseInt(this.getSaveRate) / parseInt(this.getFrameNumber) * 100 + '%'
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
  .save-png-rate-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.8);
    .save-body{
      width: 300px;
      height: 60px;
      background-color: #fff;
      border-radius: 5px;
      position: absolute;
      top: 40px;
      left: calc( 50% - 150px );
      overflow: hidden;
      .save-info{
        height: 56px;
        line-height: 60px;
        display: flex;
        font-size: 16px;
        justify-content: space-around;
        .save-rate{
          span{
            margin: 0 6px;
          }
        }
      }
      .rate-box{
        height: 4px;
        .rate{
          height: 4px;
          background-color: #4fb5ff;
        }
      }
    }
  }
</style>