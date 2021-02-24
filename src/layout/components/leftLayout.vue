<!--
 * @Author: yuszhou
 * @Date: 2021-02-22 16:47:54
 * @LastEditTime: 2021-02-23 19:53:20
 * @LastEditors: Please set LastEditors
 * @Description: 界面左边的按钮切换菜单栏。
 * @FilePath: \rise\src\layout\components\leftLayout.vue
-->
<template>
<div class="leftLayout">
  <div class="content">
    <img class="logo" src="../../../src/assets/images/rise.png" alt="">
    <div :class="iconChangeClass" class="centerBtn">
      <span @click="active(items.key)" v-for='(items,index) in iconDataList' :key='index' :class="{transparent:items.active}">
        <icon :name='items.icon'></icon>
      </span>
    </div>
    <div class="btn-button">
      <img src="../../../src/assets/images/leftContent.png" alt="">
    </div>
  </div>
</div>
</template>
<script>
import {icon} from '@/components'
import {iconData} from './data'
export default{
  components:{icon},
  data(){
    return {
      iconDataList:iconData,
      iconChangeClass:'type-first'
    }
  },
  methods:{
    active(key){
      this.iconChangeClass = '';
      if( key == 'first') this.iconChangeClass = 'type-first';
      if( key == 'three') this.iconChangeClass = 'type-last';
      this.iconDataList.forEach(items=>{
        if (items.key == key){items.active = true} else {items.active = false}
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .leftLayout{
    width: 100px;
    background-color: $color-white;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;
    padding-top: 30px;
    padding-bottom: 30px;
    .type-first{
      span{
        &:nth-child(2){
          border-bottom-right-radius: 0px;
        }
        &:nth-child(3){
          border-top-right-radius: 0px;
        }
      }
    }
    .type-last{
      span{
       &:nth-child(2){
           border-top-right-radius: 0px;
        }
        &:nth-child(1){
           border-bottom-right-radius: 0px;
        }
      }
    }
    .centerBtn{
      background-color:#F1F5FF;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      span{
        height: 120px;
        width: 100%;
        display: inline-block;
        text-align: center;
        line-height: 120px;
        background-color:$color-white;
         border-bottom-right-radius: 15px;
         border-top-right-radius: 15px;
         font-size: 28px;
        cursor: pointer;
        transition: all 0.2s;
        color:#001847;
        &:nth-child(1){
          border-top-right-radius: 0px;
        }
        &:nth-child(3){
          border-bottom-right-radius: 0px;
        }
      }
      .transparent{
        background-color:transparent;
        height: 90px;
        line-height: 90px;
        svg{
          color:$color-blue;
        }
      }
    }
    .logo{
      width: 63px;
      height: 33px;
      display: block;
      margin: 0 auto;
      cursor: pointer;
    }
    .btn-button{
      width: 70px;
      height: 70px;
      background: #F1F5FF;
      margin: 0 auto;
      padding: 13px;
      border-radius: 15px;
      cursor: pointer;
      img{
        display: inline-block;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>