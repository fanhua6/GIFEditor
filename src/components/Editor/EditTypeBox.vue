<template>
  <div class="edit-type-box" @click.stop @mousedown.stop>
    <div class="type-item" 
      :class="{ disabled: item.isdisabled }"  
      v-for="item in types" :key="item.types" 
      @click="changeEditType(item)"
      :title="item.hoverText"
      >
      <span class="iconfont" :class=" item.icon "></span>
      <span class="item-title">{{item.title}}</span>
      <!-- <div class="item-info">{{ item.hoverText }}</div> -->
    </div>
    <input type="file" name="picInput" id="picInput"
      ref="picInput" hidden @change="selectPicFn"
       accept="image/jpg, image/png, image/webp,  image/bmp,  image/jpeg"
      >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EditTypeBox',
  data () {
    return {
      types: [
        { type: 'textbox', icon: 'icontext', title: '文字', isdisabled: false, hoverText: '添加文字' },
        // { type: 'circle', icon: 'iconcircular', title: '圆形', isdisabled: true, hoverText: '即将开放敬请期待' },
        // { type: 'rect', icon: 'iconrectangle', title: '矩形', isdisabled: true, hoverText: '即将开放敬请期待' },
        { type: 'rect', icon: 'iconrectangle', title: '矩形', isdisabled: false, hoverText: '添加矩形' },
        { type: 'circle', icon: 'iconcircular', title: '圆形', isdisabled: false, hoverText: '添加圆形' },
        // { type: 'picture', icon: 'iconGraphical', title: '贴图', isdisabled: true, hoverText: '即将开放敬请期待' },
        { type: 'image', icon: 'iconGraphical', title: '贴图', isdisabled: false, hoverText: '添加贴图' },
        { type: 'webpicbox', icon: 'iconsucai', title: '素材', isdisabled: false, hoverText: '添加素材' },
      ]
    }
  },
  computed: {
    ...mapGetters('editor', [
      'getCanvas'
    ]),
    ...mapGetters('pictureInfo', [
      'getPictureCount'
    ])
  },
  methods: {
    changeEditType (item) {
      if(!item.isdisabled){
        this.getCanvas.discardActiveObject()
        this.getCanvas.renderAll()
        this.$store.commit('editor/setInitDrawing', false)
        switch (item.type) {
          case 'textbox':
            this.addTextFn()
            this.$store.commit('info/setInfoType', item.type)
          break
          case 'rect':
            this.$store.dispatch('rectInfo/initRectOptions')
            this.$store.commit('info/setInfoType', item.type)
            this.$store.commit('editor/setInitDrawing', true)
            this.$store.dispatch('rectInfo/initDrawingRect')
          break
          case 'circle':
            this.$store.dispatch('circleInfo/initRectOptions')
            this.$store.commit('info/setInfoType', item.type)
            this.$store.commit('editor/setInitDrawing', true)
            this.$store.dispatch('circleInfo/initDrawingCircle')
          break
          case 'image':
            if(this.getPictureCount == 10){
              this.$store.commit('tips/setErrorText', '贴图已超过10张，添加失败')
              this.$store.commit('tips/setIsShowError', true)
            }else{
              this.$store.commit('info/setInfoType', 'gif')
              this.$store.commit('pictureInfo/setIsReplacePicture', false)
              this.$refs['picInput'].value = ''
              this.$refs['picInput'].click()
            }
          break
          case 'webpicbox':
            if(this.getPictureCount == 10){
              this.$store.commit('tips/setErrorText', '贴图已超过10张，添加失败')
              this.$store.commit('tips/setIsShowError', true)
            }else{
              this.$store.commit('info/setInfoType', 'gif')
              this.$store.commit('info/setInfoType', item.type)
            }
          break
        }
      }
    },
    addTextFn () {
      this.$store.dispatch('textInfo/addText')
      // this.$store.commit('info/setInfoType', 'textbox')
      setTimeout(() => {
        document.getElementById('inputText').value = ''
        document.getElementById('inputText').focus()
      }, 50)
    },
    selectPicFn (e) {
      if(e.target.files.length) {
        this.$store.dispatch('pictureInfo/initAddPicture', e.target.files)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-type-box{
    width: 60px;
    padding: 20px 0;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    border-radius: 0 8px 8px 0;
    text-align: center;
    .type-item{
      margin: 15px 0;
      cursor: pointer;
      position: relative;
      .iconfont{
        display: block;
        font-size: 18px;
        color: #000;
      }
      .item-title{
        line-height: 30px;
        font-size: 12px;
        color: #999;
      }
      .item-info{
        width: 80px;
        line-height: 24px;
        position: absolute;
        left: 10px;
        top: 26px;
        background-color: #4c4c4c;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        cursor: default;
        display: none;
      }
    }:hover{
      color: #4fb5ff;
      .iconfont, .item-title{
        color: #4fb5ff;
      }
    }.disabled{
      color: #999;
      cursor: not-allowed;
      .iconfont, .item-title{
        color: #999;
      }
      .item-info{
        width: 130px;
      }
    }:hover{
      .item-info{
        display: block;
      }
    }
  }
</style>