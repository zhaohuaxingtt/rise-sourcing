<!--
 * @Author: yuszhou
 * @Date: 2021-02-22 16:47:54
 * @LastEditTime: 2021-04-19 17:09:46
 * @LastEditors: Please set LastEditors
 * @Description: 界面左边的按钮切换菜单栏。
 * @FilePath: \rise\src\layout\components\leftLayout.vue
-->
<template>
<div>
  <div class="leftLayout">
    <div class="content">
      <img class="logo" src="../../../src/assets/images/rise.png" alt="">
      <div :class="iconChangeClass" class="centerBtn">
        <span @click="active(items)" v-for='(items,index) in iconDataList' :key='index' :class="{transparent:items.active}">
          <icon symbol :name='items.active?items.acIcon:items.icon'></icon>
        </span>
      </div>
      <div class="btn-button">
        <img src="../../../src/assets/images/leftContent.png" alt="">
      </div>
    </div>
  </div>
  <div class="leftLayout menuLayout">
    <icon symbol name='iconcaidanzhankai' :class="{menu:true,hiddenMenu:hiddenMenu,delay:!hiddenMenu}" @click.native="hiddenMenu=!hiddenMenu"></icon>
    <div :class="{meunContent:true,showMenuContent:hiddenMenu,delay:hiddenMenu}">
      <div class="meunTopContent">
        <span>Workbench</span>
        <icon symbol name='iconcaidanshouqi' :class="{menu:true,hiddenMenu:hiddenMenu}" @click.native="hiddenMenu=!hiddenMenu"></icon>
      </div>
      <slot name="menu"></slot>
    </div>
  </div>
</div>
</template>
<script>
import {icon} from 'rise'
import {iconData} from './data'
export default{
  components:{icon},
  data(){
    return {
      iconDataList:iconData,
      iconChangeClass:'',
      hiddenMenu:false
    }
  },
  provide(){
    return this
  },
  methods:{
    active(key){
      //this.$router.push({ path: key.path });
      this.iconChangeClass = '';
      if( key.key == 'first') this.iconChangeClass = 'type-first';
      if( key.key == 'tow') this.iconChangeClass = 'type-tow';
      if( key.key == 'three') this.iconChangeClass = 'type-last';
      if(key.key == 'tow'){
        this.hiddenMenu = !this.hiddenMenu
        console.log('dd');
      }
      this.iconDataList.forEach(items=>{
        if (items.key == key.key) {
          if(items.key == 'five' || items.key == 'four'){
            items.active = false
          }
          else{
            items.active = true
          }
        } else {items.active = false}
      })
    },
    hideMeun(){
      this.hiddenMenu = !this.hiddenMenu
    },
    clickhfalseMenu(){
      this.hiddenMenu =false
    },
  }
}
</script>
<style lang='scss' scoped>
  .delay{
    transition-delay: 0.4s!important;
  }
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
    z-index: 999;
    padding-top: 11px;
    padding-bottom: 30px;
    .menu{
      position: absolute;
      top: 10px;
      font-size: 38px;
      left: 91px;
      cursor: pointer;
      transition: all 0.3s;
      opacity: 1;
      transform: translateX(0px);
      border-radius: 0px;
    }
    .hiddenMenu{  
      opacity: 0;
      transform: translateX(-30px);
    } 
  .type-first{
    span{
      &:nth-child(3){
        border-top-right-radius: 15px;
      }
      &:nth-child(1){
        border-bottom-right-radius: 15px;
      }
    }
  }
  .type-tow{
    span{
      &:nth-child(2){
        border-bottom-right-radius: 15px;
      }
      &:nth-child(4){
        border-top-right-radius: 15px;
      }
    }
  }
  .type-last{
    span{
      &:nth-child(3){
        border-bottom-right-radius: 15px;
      }
      &:nth-child(5){
        border-top-right-radius: 15px;
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
        height: 90px;
        width: 100%;
        display: inline-block;
        text-align: center;
        line-height: 90px;
        background-color:$color-white;
        font-size: 32px;
        cursor: pointer;
        transition: all 0.2s;
        color:#001847;
        &:nth-child(1),&:nth-child(5){
          cursor: default;
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
      height: 32px;
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
  .menuLayout{
    z-index: 998!important;
    .meunContent{
      position: absolute;
      left: 0px;
      top: 0px;
      height: 100%;
      width: 386px;
      background: #EEF2FB;
      box-shadow: 0px 0px 20px rgba(95, 98, 111, 0.16);
      transform: translateX(-368px);
      transition: all 0.4s;
      opacity: 0.5;
       .meunTopContent{
        height: 60px;
        padding-left: 40px;
        line-height: 60px;
        position: relative;
        overflow: hidden;
        span{
          font-size: 24px;
          font-weight: bold;
          color: #001847;
        }
        .menu{
            position: absolute;
            top: 10px;
            right: -10px;
            left: inherit;
            font-size: 38px;
            cursor: pointer;
            transition:all 0.3s;
            transform: translateX(30px);
            opacity: 0;
        }
        .hiddenMenu{
          transform: translateX(0px);
          opacity: 1;
        }
      }
    }
    .showMenuContent{
      transform: translateX(101px);
      opacity: 1;
    }
  }
</style>