<!--
 * @Author: 创建定点申请按钮
 * @Date: 2021-08-04 12:07:53
 * @LastEditTime: 2021-08-11 10:00:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\createNomiappBtn\index.vue
-->
<template>
<div class="inline margin-right10">
  <iButton @click="handleCreateNomiApplication">{{ language('LK_SHENGCHENGDINGDIANSHENQING',"生成定点申请单") }}</iButton>
  <iDialog title="自动定点进度追踪" :visible.sync="messageShow">
    <ul class="ulContent">
      <li>
        <div>
          <span class="name">FS21-000232</span>
          <el-progress :percentage="50"></el-progress>
        </div>
        <div>1:正在为您创建定点申请</div>
      </li>
      <li>
        <div>
          <span class="name">FS21-000232</span>
          <el-progress :percentage="99"></el-progress>
        </div>
        <div>5:正在为您打包中</div>
      </li>
    </ul>
  </iDialog>
</div>
</template>
<script>
import {iButton,iDialog} from 'rise'
import soket from '@/utils/socket'
import {autonomi} from '@/api/partsprocure/editordetail'
import store from "@/store";
export default{
  components:{iButton,iDialog},
  props:{datalist:{
    type:Array,
    default:()=>[]
  }},
  data(){
    return {
      soket:'',
      messageDataList:[],
      messageShow:false
    }
  },
  methods:{
    handleCreateNomiApplication(){
      this.messageShow = true
      this.messageDataList = []
      this.closeWebSoket()
      this.showWebsoket()
    },
    closeWebSoket(){
      if(this.soket) this.soket.close()
    },
    showWebsoket(){
       this.soket = new soket({baseUrl:'ws://10.160.140.210:18025',url:`/sourcing/websocket/${store.state.permission.userInfo.userName}`}).then(res=>{
         this.messageDataList = res.data
       }).catch(err=>{
         console.warn(err)
       })
    },
    autonomiFn(){
      autonomi(this.translatePropsForServers(this.datalist)).then(res=>{}).catch(err=>{

      })
    },
    translatePropsForServers(parmars){
      if(!Array.isArray(parmars)) return console.error('parmars datalist must be a array')

      return {autoKeyDTOS:parmars}
    }
  }
}
</script>
<style lang='scss' scoped>
.ulContent{
  padding-bottom: 30px;
  li{
    padding: 20px 0px 20px 0px;
    border-bottom: 1px solid #f5f7fa;
    &:last-child{
      border-bottom: none;
    }
    .name{
      font-size: 18px;
    }
  }
  ::v-deep.el-progress-bar__inner{
    position: relative;
    overflow: hidden;
    &::before{
      position: absolute;
      top: 0px;
      left: 0px;
      content: '';
      height: 100%;
      box-shadow: 0px 0px 60px 40px rgb(255,255,255);
      animation: moveRight 3s infinite;
    }
  }
}
@keyframes moveRight{
  from{
    left: 0px;
    opacity: 1;
  }
  to{
    left: 100%;
    opacity: 0.4;
  }
}
</style>
