<template>
  <div class="editor-footer">
    <span class="iconfont footer-btn" :class=" getShowFrameList ? 'iconretract' : 'iconopen' " @click="changeShowFrameList" :title=" getShowFrameList ? '收起' : '展开' "></span>
    <EditorController />
    <FrameList v-show="getShowFrameList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FrameList from './FrameList'
import EditorController from './EditorController'

export default {
  name: 'EditorFooter',
  computed: {
    ...mapGetters('editorFooter', [
      'getShowFrameList'
    ])
  },
  components: {
    FrameList,
    EditorController
  },
  methods: {
    changeShowFrameList () {
      this.$store.commit('editorFooter/setShowFrameList', !this.getShowFrameList)
    }
  }
}
</script>

<style lang="scss" scoped>
  .editor-footer{
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
    position: relative;
    .footer-btn{
      width: 23px;
      height: 14px;
      text-align: center;
      background-color: #949494;
      color: #fff;
      position: absolute;
      border-radius: 0 3px 3px 0;
      top: -14px;
      left: 8px;
      cursor: pointer;
      transition: all .2s;
      &:hover{
        background-color: #6d6d6d;
      }
    }
  }
</style>