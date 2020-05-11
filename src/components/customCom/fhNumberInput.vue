<template>
  <div class="fh-number-input">
    <input type="text" :id="id" v-model="newValue" @focus="inputFocus" @keydown="checkImportNumber" @keyup="checkImportValue" @blur="completionValue" autocomplete="off" />
    <div class="btn-box">
      <span class="btn-up" @click="upNumberFn"></span>
      <span class="btn-down" @click="downNumberFn"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fhNumberInput',
  data () {
    return {
      newValue: '',
      oldValue: '',
      initValue: '',
      isFocus: false
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 30
    }
  },
  created () {
    this.oldValue = this.value.toString()
    this.newValue = this.value.toString()
    this.initValue = this.value.toString()
  },
  watch: {
    value (n, o) {
      this.newValue = n.toString().indexOf(this.unit) == -1 && !this.isFocus ? n.toString() + this.unit : n.toString()
    }
  },
  methods: {
    inputFocus (e) {
      this.isFocus = true
      setTimeout(() => { e.target.select() }, 200)
    },
    checkImportNumber (e) {
      if(e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 39 && (e.keyCode < 48 || e.keyCode > 58) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    checkImportValue (e) {
      let v = e.target.value == '' ? '' : isNaN(parseInt(e.target.value)) ? '' : parseInt(e.target.value)
      if(v > this.max || v < this.min) {
        this.newValue = parseInt(this.oldValue)
        this.$emit('mychange', this.oldValue.toString())
      }else{
        this.oldValue = isNaN(parseInt(e.target.value)) ? this.oldValue : parseInt(e.target.value)
        this.newValue = v
        this.$emit('mychange', v.toString())
      }
    },
    completionValue () {
      this.isFocus = false
      let v = this.newValue == '' ? '' : isNaN(parseInt(this.newValue)) ? '' : parseInt(this.newValue)
      if(v > this.max || v < this.min) {
        this.newValue = parseInt(this.oldValue)
        this.$emit('mychange', this.oldValue.toString())
      }
      if (isNaN(parseInt(this.newValue)) || this.newValue == '') {
        this.newValue = this.oldValue.toString()
      }
      
      if(this.newValue && this.newValue.toString().indexOf(this.unit) == -1) {
        this.newValue =  parseInt(this.newValue) + this.unit
      }
      this.$emit('mychange', this.newValue)
    },
    upNumberFn () {
      if(this.newValue) {
        let v = parseInt(this.newValue)
        if(v < this.max){
          this.newValue = v + 1 + this.unit
          this.$emit('mychange', this.newValue)
          this.oldValue = this.newValue
        }
      }
    },
    downNumberFn () {
      if(this.newValue) {
        let v = parseInt(this.newValue)
        if(v > this.min){
          this.newValue = v - 1 + this.unit
          this.$emit('mychange', this.newValue)
          this.oldValue = this.newValue
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .fh-number-input{
    width: 70px;
    height: 34px;
    position: relative;
    input{
      width: 68px;
      height: 32px;
      border: 1px solid #e5e5e5;
      border-radius: 2px;
      outline: none;
      font-size: 14px;
      color: #000;
      text-indent: 10px;
      &:focus{
        border-color: #4fb5ff;
      }
      &:hover{
        border-color: #4fb5ff;
      }
      &::selection{
        background-color: #d0d0d0;
        background-size: 120%;
      }
    }
    .btn-box{
      width: 16px;
      height: 32px;
      position: absolute;
      top: 6px;
      right: 0;
      span{
        width: 7px;
        height: 7px;
        display: block;
        position: absolute;
        left: 2px;
        cursor: pointer;
        display: none;
        &:after{
          width: 0;
          height: 0;
          display:block;
          content:'';
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
        }
      }
      .btn-up{
        top: 4px;
        &:after{
          border-bottom: 7px solid #050505;
        }
      }
      .btn-down{
        bottom: 4px;
        &:after{
          border-top: 7px solid #050505;
        }
      }
    }
    &:hover .btn-box span{
      display: block;
    }
  }
</style>