<!--
 * @Author: 创建定点申请按钮
 * @Date: 2021-08-04 12:07:53
 * @LastEditTime: 2021-08-16 17:44:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\createNomiappBtn\index.vue
-->
<template>
<div class="inline margin-right10">
  <iButton @click="handleCreateNomiApplication" :loading='loading'>{{ language('LK_SHENGCHENGDINGDIANSHENQING',"生成定点申请单") }}</iButton>
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
import {iButton,iDialog,iMessage} from 'rise'
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
      soket: null,
      messageDataList:[],
      messageShow:false,
      loading:false
    }
  },
  methods:{
    handleCreateNomiApplication(){
      this.loading = true
      this.messageDataList = []
      this.closeWebSoket()
      this.showWebsoket()
      this.autonomiFn()
      setTimeout(() => {
        if(this.loading) this.messageShow = true
      }, 2000);
    },
    closeWebSoket(){
      try {
        this.soket.close()
      } catch (error) {
        // not error code
      }
    },
    showWebsoket(){
       this.soket = new soket({baseUrl:process.env.VUE_APP_WS1_SOKETEURL,url:`/sourcing/websocket/${store.state.permission.userInfo.id}`}).then(res=>{
         this.messageDataList = res.data
       }).catch(err=>{
         console.warn(err)
       })
    },
    autonomiFn(){
      autonomi(this.translatePropsForServers(this.datalist)).then(res=>{
        if(res.result){
          iMessage.success(res.desZh)
          this.messageShow = false
          this.loading = false
          this.openNomiPage()
          this.closeWebSoket()
        }else{
           this.messageShow = false
           iMessage.warn(res.desZh)
           this.loading = false
           this.closeWebSoket()
        }
      }).catch(err=>{
        this.loading = false
        this.messageShow = false
        iMessage.error(err.desZh)
        this.closeWebSoket()
      })
    },
    translatePropsForServers(parmars){
      if(!Array.isArray(parmars)) return console.error('parmars datalist must be a array')
      return {autoKeyDTOS:parmars.map(r=>{return {partNum:r.partNum,oldFsnrGsnrNum:r.oldFsnrGsnrNum,oldPurchasingProjectId:r.oldPurchasingProjectId,purchasingProjectId:r.id,userId:store.state.permission.userInfo.id}})}
    },
    openNomiPage(items){
      this.$router.push({
        url:'/designate/decisiondata/title',
        query:{
          desinateId:items.nominateId,
          designateType:items.nominateProcessType,
          partProjType:items.partProjectType
        }
      })
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
