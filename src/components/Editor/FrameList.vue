<template>
  <div class="frame-list-box" id="listBox" @mousewheel="onmousewheelFn">
    <div class="frame-list-body" :style="{ width: getFrameListWidth, left: listLeft + 'px' }" ref="frameListBody">
      <div class="frame-item" v-for="(item, index) in getFrameList"
       :key="index" :class="{ active: index == getPlayIndex }"
       @click="changePlayIndex(index)">
        <div class="item-box">
          <img :src="item.data" alt="" srcset="" @mousedown.prevent>
        </div>
        <div class="iten-index">{{index + 1}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FrameList',
  data () {
    return {
      listLeft: 0
    }
  },
  computed: {
    ...mapGetters('editorFooter',[
      'getFrameList',
      'getFrameListWidth'
    ]),
    ...mapGetters('editorPlay',[
      'getPlayIndex'
    ]),
  },
  mounted(){
    window.addEventListener('resize', this.computLeft)
  },
  watch: {
    getPlayIndex (n) {
      // this.computLeft()
    }
  },
  methods: {
    changePlayIndex (i) {
      this.$store.commit('editorPlay/setPlayType', 'pause')
      this.$store.dispatch('editorPlay/setPlayIndex', i)
    },
    computLeft () {
      let dom = document.getElementById('listBox')
      let w = dom.clientWidth
      let n = parseInt(w/124)
      if(n <= this.getPlayIndex){
        dom.scrollLeft = (this.getPlayIndex - n + 1)*124
      }else{
        dom.scrollLeft = 0
      }
    },
    onmousewheelFn (e) {
      document.getElementById('listBox').scrollLeft -= e.wheelDelta
    }
  }
}
</script>

<style lang="scss" scoped>
  .frame-list-box{
    width: 100%;
    height: 118px;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    .frame-list-body{
      position: absolute;
      overflow-x: auto;
      height: 118px;
      .frame-item{
        float: left;
        width: 96px;
        height: 96px;
        border: 2px solid #fff;
        margin: 8px 10px 0;
        &.active{
          border: 2px solid rgb(0, 255,255);
          border-radius: 4px;
          background-color: rgb(110,202,255);
        }
        .item-box{
          width: 86px;
          height: 76px;
          border-radius: 3px;
          margin: 5px 5px 2px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            max-width: 86px;
            max-height: 76px;
            vertical-align: middle;
          }
        }
        .iten-index{
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
</style>