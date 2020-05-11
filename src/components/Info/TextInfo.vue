<template>
  <div id="showShadow" class="font-contain">
    <div class="font-main">
      <div class="scroll-box" @click="gifinputBlur">
        <div class="info-title">
          文字属性
        </div>
        <div class="font-box">
          <input type="text" placeholder="输入想要写的文字" v-model="text" id="inputText" autocomplete="off" />
          <div class="font-title">
            颜色
            <div class="fr color-picker-box">
              <ColorPicker @change.native="changeColorFn" :color="textColor" />
            </div>
          </div>
          
          <div class="color-select-box">
            <!-- <ColorSelecter @change.native="changeColorFn" :color="textColor" name="textColor"  /> -->
            <ColorSelecter @change.native="changeColorFn" v-model="textColor" name="textColor"  />
          </div>
          <!-- <ul class="color-box flex">
            <li v-for="item in colors" :key="item.value">
              <input v-model="textColor" :id="item.value" class="check-color" type="radio"
                name="color" :value="item.value">
              <label :for="item.value" :class="{white: item.value == '#ffffff'}"
                :style="{'background-color': item.value}" @click="checkColor(item.value)"></label>
            </li>
          </ul> -->
          <div class="font-title">
            字体
          </div>
          <div class="flex">
            <span v-for="family in getFamilies" @click="checkFamily(family)" :class="{'active': curFamily == family.t}"
              :style="{'font-family':family.t}" :key="family.value" class="btn">{{family.t}}</span>
          </div>
          <div class="font-title">
            动效
          </div>
          <div class="flex">
            <em v-for="ani in animations" @click="checkAni(ani)" :class="{'active': curAni == ani.value}"
              :key="ani.value" class="btn"><span :data-ani="ani.ani_class">{{ani.name}}</span></em>
          </div>
        </div>
      </div>
    </div>
    <!-- <div ref="shadow" class="del-box">
      <span @click="delFont" class="iconfont icondel" title="删除"></span>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ColorSelecter from '_c/customCom/ColorSelecter'
import ColorPicker from '_c/customCom/ColorPicker'

  export default {
    name: 'TextInfo',
    data() {
      return {
        curFamily: '',
        curAni: '',
        text: '',
        textColor: '#ffffff',
        colors: [
          {
            value: '#ffffff',
          }, {
            value: '#000000',
          }, {
            value: '#ff2880',
          }, {
            value: '#ff053c',
          }, {
            value: '#c91e33',
          }, {
            value: '#ff653e',
          }, {
            value: '#ffd503',
          }, {
            value: '#a9ff04',
          }, {
            value: '#688c6d',
          }, {
            value: '#02881f',
          }, {
            value: '#4fb5ff',
          }, {
            value: '#1279e1',
          }, {
            value: '#e2d2ff',
          }, {
            value: '#8d71ff',
          }, 
        ],
        families: [
          {
            value: '思源黑体',
            name: '思源黑体'
          }, {
            value: '站酷文艺',
            name: '站酷文艺'
          }, {
            value: '庞门正道',
            name: '庞门正道'
          }, 
        ],
        animations: [
          {
            value: 'none',
            name: '无动效'
          },
          {
            ani_class: 'zoomInOut',
            value: 'zoomInOut',
            name: '放大缩小'
          },
          {
            ani_class: 'flash',
            value: 'flash',
            name: '突然闪现'
          },
          {
            ani_class: 'shakeUpDown',
            value: 'shakeUpDown',
            name: '上下抖动'
          },
        ]
      }
    },
    components: {
      ColorSelecter,
      ColorPicker
    },
    computed: {
      ...mapGetters('editor', [
        'getCanvas',
        'getActiveObj',
        'getAnimateObj'
      ]),
      ...mapGetters('textInfo',[
        'getText',
        'getFamilies'
      ])
    },
    mounted(){
      this.text = this.getActiveObj.text
      this.textColor = this.getActiveObj.fill
      this.curFamily = this.getActiveObj.fontFamily
      this.curAni = this.getActiveObj.animateType || 'none'
      
      // window.onresize = this.showShadow;

      // setTimeout(this.showShadow(), 100)
    },
    watch: {
      text () {
        this.changeText()
      },
      getActiveObj (n) {
        if(n){
          this.text = n.text
          this.textColor = n.fill
          this.curFamily = n.fontFamily
          this.curAni = n.animateType || 'none'
        }
      },
      getText (n) {
        this.text = n
      }
    },
    methods: {
      gifinputBlur () {
        this.getActiveObj.exitEditing()
      },
      changeColorFn (e) {
        this.textColor = e.target.value
        this.checkColor(e.target.value)
      },
      checkColor(value) {
        this.textColor = value
        this.$store.commit('textInfo/setTextColor', value)
        this.getActiveObj.set({fill: value})
        this.getCanvas.renderAll()
        this.checkHasText()
      },
      checkFamily(item) {
        this.curFamily = item.t;
        this.$store.commit('textInfo/setTextFamily', item.t)
        this.getActiveObj.set({fontFamily: item.t})
        this.getCanvas.renderAll()
        this.checkHasText()
      },
      checkAni(item) {
        this.curAni = item.value;
        this.checkHasText()
        if(this.getActiveObj.animateType != item.value){
          this.getActiveObj.animateType = item.value
          if(item.value == 'none'){
            this.getActiveObj.set({ opacity: 1 })
            this.getCanvas.renderAll()
            if(this.getAnimateObj[this.getActiveObj.id]){
              this.$store.commit('editor/deleteAnimateObj', this.getActiveObj.id)
            }
          }else{
            // this.$store.commit('editorPlay/setPlayType', 'pause')
            this.getActiveObj.animateType = item.value
            this.$store.commit('editor/addAnimateObj', this.getActiveObj)
          }
        }
      },
      delFont(){
        if(this.getAnimateObj[this.getActiveObj.id]){
          this.$store.commit('editor/deleteAnimateObj', this.getActiveObj.id)
        }
        this.getActiveObj.set({text:''})
        this.getCanvas.discardActiveObject()
        this.getCanvas.renderAll()
      },
      // showShadow(){
      //   // let h = this.$refs.showShadow.offsetHeight;
      //   let h = document.getElementById('showShadow').offsetHeight
      //   if(h < 670){
      //     this.$refs.shadow.style.boxShadow =  '0 0 10px 0 rgba(0,0,0,.08)';
      //   }else{
      //     this.$refs.shadow.style.boxShadow =  'unset';
      //   }
      // },
      changeText () {
        this.getActiveObj.set({text: this.text})
        this.getCanvas.renderAll()
      },
      checkHasText () {
        let dom = document.getElementById('inputText')
        if(!this.text) {
          dom.classList.add('notTextAni')
          setTimeout(() => {
            dom.classList.remove('notTextAni')
          }, 300)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  span{display: inline-block;}
  em{font-style: normal;}
  .flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .btn{
      margin-right: 4px;
      font-size: 14px;
      &:nth-child(3n){
        margin-right: 0;
      }
    }
  }

  .color-box {
    height: 90px;
    padding: 10px 0;
    margin-right: -22px;

    &>li {
      width: 42px;
    }
  }

  .btn {
    width: 89px;
    height: 30px;
    line-height: 30px;
    margin: 10px 0;
    padding: 0;
    border-radius: 2px;
    color: #000;
    text-align: center;
    
    &.active {
      border-color: #4fb5ff;
      background-color: #4fb5ff;
      color: #fff;
    }
  }

  .check-color {
    position: absolute;
    opacity: 0;

    &+label {
      background: red;
      position: relative;
      display: inline-block;
      width: 22px;
      height: 22px;
      margin-top: 10px;
      border-radius: 50%;
      cursor: pointer;
    }

    &:checked+label:before {
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-radius: 50%;
      border: 2px solid #fff;
    }

    &+label.white {
      border: 1px solid #e7e7e7;
    }

    &:checked+label.white {
      border-width: 2px;
    }

    &:checked+label.white:before {
      width: 12px;
      height: 12px;
      border: 1px solid #e7e7e7;
    }
  }

  .font-box input[type="text"] {
    width: 100%;
    height: 36px;
    padding: 0 10px;
    margin-bottom: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    font-size: 14px;
    box-sizing: border-box;

    &:focus {
      border-color: #4fb5ff;
    }
  }

  .font-box {
    width: 100%;
  }

  .font-title {
    height: 52px;
    line-height: 52px;
    color: #000;
  }

  .font-main,
  .font-contain {
    height: 100%;
    position: relative;
  }

  .font-main {
    overflow-y: auto;
    padding: 20px;
  }
  .del-box {
    position: absolute;
    width: 100%;
    height: 118px;
    bottom: 0;
    left: 0;
    background: #fff;
    line-height: 118px;
    text-align: center;
    
  }

  .icondel {
    display: inline-block;
    width: 45px;
    height: 45px;
    line-height: 44px;
    border: 1px solid rgb(229, 229, 229);
    border-radius: 50%;
    font-size: 32px;
    color: #4d4d4d;
    text-align: center;
    cursor: pointer;

    &:hover {
      border-color: rgb(79, 181, 255);
      color: rgb(79, 181, 255);
    }
  }
  
  [data-ani="zoomInOut"]:hover{
    animation: zoomInOut .5s infinite linear;
  }
  [data-ani="flash"]:hover{
    animation: flash .5s infinite linear;
  }
  [data-ani="shakeUpDown"]:hover{
    animation: shakeUpDown .5s infinite linear;
  }
  .notTextAni {
    animation: notTextAni .3s ease;
  }
  @keyframes zoomInOut{
    0%{
      transform: scale(1);
    }
    50%{
      transform: scale(1.1);
    }
    100%{
      transform: scale(1);
    }
  }
  @keyframes flash{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes shakeUpDown{
    0%{
      transform: translateY(0);
    }
    25%{
      transform: translateY(5px);
    }
    50%{
      transform: translateY(0);
    }
    75%{
      transform: translateY(-5px);
    }
    100%{
      transform: translateY(0);
    }
  }
  @keyframes notTextAni {
    0% {
      transform: translateX(0);
    }
    15% {
      transform: translateX(-16px);
    }
    30% {
      transform: translateX(14px);
    }
    45% {
      transform: translateX(-12px);
    }
    60% {
      transform: translateX(10px);
    }
    75% {
      transform: translateX(-8px);
    }
    90% {
      transform: translateX(6px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>