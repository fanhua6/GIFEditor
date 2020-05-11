
<template>
  <div class="dialog-bg" @click="closeDialog">
    <em class="iconfont iconclosepx1" title="关闭"></em>
    <img :src="getExportGIFURL" alt="GIF编辑图" @click.stop.prevent @mousedown.prevent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Preview',
  computed: {
    ...mapGetters('main',[
      'getExportGIFURL'
    ])
  },
  methods:{
    closeDialog(){
      this.$store.commit('main/setViewType', 'editing')
    },
  }
}
</script>

<style lang="scss" scoped>
*{box-sizing: border-box;}
.dialog-bg{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 100px;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  z-index: 999;
  & > img{
    position: absolute;
    max-width: calc(100% - 200px);
    max-height: calc(100% - 200px);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}

.iconclosepx1{
  display: inline-block;
  position: absolute;
  
  top: 10px;
  right: 8px;
  opacity: .6;
  color: #fff;
  cursor: pointer;
  &:hover{
    opacity: 1;
  }
  &:after{
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    left: -18px;
    top: -44px;
    border-radius: 50%;
    background-color: rgba(78, 78, 78, 0.8);
    z-index: -1;
  }
}
</style>