<template>
  <div class="web-pic-list-box">
    <div class="fixed-box" ref="fixedBox" id="fixedBox">
      <div class="info-title">
        素材
      </div>
      <div class="web-pic-type">
        <span class="btn"
          :class="{ active: item.id == getPicType }"
          @click="changePicType(item.id)"
          v-for="item in getPicTypes" :key="item.id">
          {{ item.t }}
        </span>
      </div>
    </div>

    <div class="web-pic-body" id="piclist" ref="picbox" :style="{ height: listH }">
      <div class="web-pic-list" @mousewheel="onmousewheelFn" ref="piclist">
        <div class="pic-item" 
          v-for="item in getPicListData" 
          @click="addWebPictureFn(item)"
          :key="item.id">
          <img :src="item.i" alt="">
          <div class="info">{{ item.t }}</div>
        </div>
        <div style="width: 100%; heigth: 10px;"></div>
      </div>

      <div class="web-pic-empty" v-if="!getPicListData.length">
        <div class="empty-img"></div>
        <div class="empty-info">暂无数据{{ getIsConnectWeb ? '' : '，网络异常' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'WebPictureListBox',
  data () {
    return {
      listH: '100px'
    }
  },
  computed: {
    ...mapGetters('webPictureListInfo', [
      'getPicTypes',
      'getPicType',
      'getPicListData',
      'getPicPageIndex',
      'getPicPageCount',
      'getIsConnectWeb'
    ]),
    ...mapGetters('webPictureInfo', [
      'getPictureCount'
    ])
  },
  mounted () {
    // console.log(this.$refs['fixedBox'].offsetHeight + 40)
    // console.log(this.getPicTypes)
    // console.log(document.body.clientHeight - 68 - this.$refs['fixedBox'].offsetHeight)
    setTimeout(() => {
      this.setListH()
    }, 200)

    window.addEventListener('resize', this.setListH)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setListH)
  },
  methods: {
    changePicType (id) {
      let page = {
        type: id,
        index: 1
      }
      // console.log(this.$refs['fixedBox'].offsetHeight)
      // console.log(document.body.clientHeight - 68 - this.$refs['fixedBox'].offsetHeight)
      this.$store.commit('webPictureListInfo/setPicType', id)
      this.$store.commit('webPictureListInfo/setPicPageIndex', 1)
      this.$store.dispatch('webPictureListInfo/getPictureList', page)
      this.$refs['picbox'].scrollTop = 0
    },
    onmousewheelFn (e) {
      if(this.getPicPageCount > this.getPicPageIndex) {
        if(this.$refs['picbox'].scrollTop > this.$refs['piclist'].offsetHeight - parseInt(this.listH) - 10) {
          let page = {
            type: this.getPicType,
            index: this.getPicPageIndex + 1
          }
          this.$store.commit('webPictureListInfo/setPicPageIndex', page.index)
          this.$store.dispatch('webPictureListInfo/getPictureList', page)
        }
      }
    },
    addWebPictureFn (obj) {
      if(this.getPictureCount == 10) {
        this.$store.commit('tips/setErrorText', '素材已超过10张，添加失败')
        this.$store.commit('tips/setIsShowError', true)
      }else{
        this.$store.dispatch('webPictureInfo/initAddPicture', obj)
      }
    },
    setListH () {
      let fixedBox = document.getElementById('fixedBox')
      if(fixedBox) {
        this.listH = document.body.clientHeight - 68 - fixedBox.offsetHeight + 'px'
      }else{
        console.log(123123, fixedBox)
        setTimeout(() => {
          fixedBox = document.getElementById('fixedBox')
          this.listH = document.body.clientHeight - 68 - fixedBox.offsetHeight + 'px'
        }, 200)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-scroll-box{
    overflow: hidden;
  }
  .web-pic-list-box{
    display: flex;
    flex-direction: column;
    .fixed-box{
      width: 296px;
      background-color: #fff;
      padding: 10px 16px;
      border-top: 1px solid #e5e5e5;
      .web-pic-type{
        display: flex;
        flex-wrap: wrap;
        .btn{
          width: 88px;
          height: 32px;
          line-height: 32px;
          display: block;
          padding: 0;
          text-align: center;
          border-radius: 3px;
          margin: 0 12px 10px 0;
          &:nth-child(3n){
            margin-right: 0;
          }
        }.active{
          color: #fff;
          background-color: #4fb5ff;
          border-color: #4fb5ff;
        }
      }
    }
    .web-pic-body{
      overflow-y: auto;
      // padding: 10px 0px 20px 16px;
      padding-left: 16px;
      .web-pic-type{}
      .web-pic-list{
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        .pic-item{
          width: 140px;
          height: 140px;
          border: 1px solid #eee;
          border-radius: 4px;
          margin: 10px 10px 0 0;
          position: relative;
          cursor: pointer;
          transition: all .2s;
          img{
            width: 120px;
            height: 120px;
            margin: 10px;
          }
          .info{
            position: absolute;
            bottom: 10px;
            left: 50%;
            display: inline-block;
            background-color: rgba(0,0,0,.7);
            color: #fff;
            padding: 3px 10px;
            border-radius: 3px;
            transform: translateX(-50%);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 80%;
            opacity: 0;
            transition: opacity .7s;
          }
        }:nth-child(2n){
          margin-right: 0;
        }:hover{
          background-color: #f4f4f4;
          .info{
            opacity: 1;
          }
        }
      }
      .web-pic-empty{
        
        .empty-img{
          width: 170px;
          height: 154px;
          background: url('../../assets/img/empty.png') no-repeat center;
          margin: 60px auto 10px;
        }
        .empty-info{
          text-align: center;
        }
      }
    }
  }
</style>