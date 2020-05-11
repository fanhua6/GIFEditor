<template>
  <div class="gif-info-body">
    <div class="info-title">
      GIF属性
    </div>

    <div class="child-info-item">
      <span class="child-info-title">文件帧数 ：</span>
      <span class="child-info-value">{{getFrameNumber}}帧</span>
    </div>
    <div class="child-info-item">
      <span class="child-info-title">动画时长 ：</span>
      <span class="child-info-value">{{getGifTime}}</span>
    </div>
    <div class="child-info-item">
      <span class="child-info-title">文件尺寸 ：</span>
      <span class="child-info-value">{{getGifWidth}}宽 x {{getGifHeight}}高</span>
    </div>

    <div class="item-title">播放速度</div>
    <div class="speed-controller">
      <!-- <div class="speed-view"><span class="round" :style="{ left: getSpeedLeft }"></span></div> -->
      <div>
        <input id="speed" class="speed-view" type="range" name="" min="0" max="4" step="1" value="2" :v-value="speedValue" @input="rangeSpeed">
      </div>
      <div class="speed-list">
        <div class="speed-item" v-for="item in speedList" :key="item.id" :class="{ active: item.value == getPlaySpeed }" @click="changeSpeed(item)">
          {{ item.title }}
        </div>
      </div>
    </div>

    <div class="item-title">播放顺序</div>
    <div class="play-type-controller">
      <div class="play-type-item" v-for="item in playModes" :key="item.id">
        <!-- <div class="play-type-animate">
          <span class="dian"></span>
        </div> -->
        <span class="btn" :class="{ active: item.value == getPlayMode }" @click="changePlayMode(item)">
          <span class="iconfont" :class=" item.icon "></span>
          {{ item.title }}
        </span>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GifInfo',
  data () {
    return {
      speedValue: 2,
      speedList: [
        { id: 'speed1', value: 0.1, title: '0.1x', speedValue: '0' },
        { id: 'speed2', value: 0.5, title: '0.5x', speedValue: '1' },
        { id: 'speed3', value: 1, title: '1x', speedValue: '2' },
        { id: 'speed4', value: 2, title: '2x', speedValue: '3' },
        { id: 'speed5', value: 3, title: '3x', speedValue: '4' }
      ],
      playModes: [
        { id: 'mode1', value: 0, title: '正序', icon: 'iconicon-test2' },
        { id: 'mode2', value: 1, title: '反序', icon: 'iconicon-test' },
        { id: 'mode3', value: 2, title: '正反交替', icon: 'iconicon-test1' },
      ],
    }
  },
  computed: {
    ...mapGetters('editorPlay', [
      'getPlaySpeed',
      'getSpeedLeft',
      'getPlayMode'
    ]),
    ...mapGetters('gifInfo', [
      'getFrameNumber',
      'getGifWidth',
      'getGifHeight',
      'getGifTime'
    ])
  },
  methods: {
    rangeSpeed (e) {
      this.speedValue = e.target.value
      this.changeSpeed(this.speedList[e.target.value])
    },
    changeSpeed (item) {
      this.$store.dispatch('editorPlay/changePlaySpeed', item)
      this.speedValue = item.speedValue
      document.getElementById('speed').value = item.speedValue
      // this.speedLeft = item.left
    },
    changePlayMode (item) {
      this.$store.commit('editorPlay/setPlayMode', item.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .gif-info-body{
    padding: 20px;
  }
  .child-info-item{
    line-height: 34px;
  }
  .speed-controller{
    margin-bottom: 10px;
    .speed-view{
      width: 100%;
      height: 7px;
      background-color: #4fb5ff;
      border-radius: 4px;
      position: relative;
      -webkit-appearance: none; /*去除默认样式*/
      margin-top: 12px;
      -webkit-appearance: none;
      padding: 0;
      border: none;
      outline: none;
      &::-webkit-slider-thumb {
        -webkit-appearance: none;/*去除默认样式*/
        cursor: default;
        top: 0;
        height: 15px;
        width: 15px;
        transform: translateY(0px);
        background: #4fb5ff;
        border-radius: 15px;
        border: 2px solid #fff;
        cursor: pointer;
      }
    }
  }
  .speed-list{
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .speed-item{
      width: 38px;
      height: 23px;
      line-height: 23px;
      text-align: center;
      border: 1px solid #dcdcdc;
      border-radius: 3px;
      cursor: pointer;
      &.active{
        background-color: #4fb5ff;
        border: 1px solid #4fb5ff;
        color: #fff;
        position: relative;
        // &:before{
        //   content:"";
        //   position:absolute;
        //   top:-7px;
        //   left:10px;
        //   border-bottom:10px solid #4fb5ff;
        //   border-left:10px solid transparent;
        //   border-right:10px solid transparent;
        // }
      }
    }
  }

  .play-type-controller{
    display: flex;
    .play-type-item{
      margin-right: 12px;
      height: 60px;
      &:nth-child(2){
        .dian{
          left: 93%;
        }
      }
      .play-type-animate{
        height: 10px;
        border-bottom: 1px solid #afdaf9;
        margin-bottom: 20px;
        position: relative;
        .dian{
          width: 5px;
          height: 4px;
          display: block;
          background-color: #0096ff;
          border-radius: 2px;
          position: absolute;
        }
      }
      .btn{
        .iconfont{
          vertical-align: -1px;
        }
        &.active{
          border-color: #4fb5ff;
          background-color: #4fb5ff;
          color: #fff;
        }
      }
    }:hover{
      &:nth-child(1){
        .dian{
          animation: leftToR 1s infinite linear;
        }
      }
      &:nth-child(2){
        .dian{
          animation: leftToR 1s infinite linear reverse;
        }
      }
      &:nth-child(3){
        .dian{
          animation: leftToR 1s infinite linear alternate;
        }
      }
    }
  }

  @keyframes leftToR{
    0% {
      left: 0;
    }
    100% {
      left: 100%;
    }
  }
</style>