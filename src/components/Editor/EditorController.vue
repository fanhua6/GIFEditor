<template>
  <div class="editor-controller">
    <div class="play-info">
      <span class="index">{{getPlayIndex + 1}}</span>
      <span class="separator">/</span>
      <span class="total">{{getFrameNumber}}</span>
    </div>
    <div class="line"></div>
    <EditorPlayer />
    <div class="line"></div>
    <EditorExportPng />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditorPlayer from './EditorPlayer'
import EditorExportPng from './EditorExportPng'

export default {
  name: 'EditorController',
  computed: {
    ...mapGetters('gifInfo',[
      'getFrameNumber'
    ]),
    ...mapGetters('editorPlay',[
      'getPlayIndex'
    ])
  },
  components: {
    EditorPlayer,
    EditorExportPng
  }
}
</script>

<style lang="scss" scoped>
  .editor-controller{
    // width: 252px;
    height: 30px;
    line-height: 30px;
    background-color: #999;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    transform: translateX( -50% );
    top: -46px;
    display: flex;
    padding: 0 20px;
    .play-info{
      min-width: 80px;
      text-align: center;
      color: #fff;
      .separator{
        margin: 0 10px;
      }
    }
    .line{
      width: 1px;
      height: 16px;
      background-color: #878787;
      margin: 7px 10px 0;
    }
  }
</style>