<!--
 * @Author: 创建定点申请按钮
 * @Date: 2021-08-04 12:07:53
 * @LastEditTime: 2021-10-26 21:21:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\createNomiappBtn\index.vue
-->
<template>
<div class="inline margin-right10" v-permission.auto='PARTSPROCURE_EDITORDETAIL_CREATEDDSQD|创建定点申请按钮'>
  <iButton @click="handleCreateNomiApplication" :loading='loading'>{{ language('LK_SHENGCHENGDINGDIANSHENQING',"生成定点申请单") }}</iButton>
  <iDialog title="自动定点进度追踪" :visible.sync="messageShow">
    <ul class="ulContent">
      <li v-for="(items,index) in messageDataList" :key="index">
        <div>
          <span class="name">{{items.titleName}}</span>
          <el-progress :percentage="items.step/6"></el-progress>
        </div>
        <div>{{items.step}}:{{items.message}}</div>
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
      if(this.datalist.find(items=> items.oldFsnrGsnrNum === null)) return iMessage.warn(this.language('NINGHAIWEIGUANLYUANLJ','您还未关联原零件，请关联后重试！'))
      if(this.datalist.find(items=>typeof items.oldFsnrGsnrNum === "object")) return iMessage.warn(this.language('QINGXIANBAOCDANGQIAN','请先保存当前修改后再试！'))
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
        if(res){
          const jsonData = JSON.parse(res.data)
          if(this.messageDataList.find(i=>i.titleId == jsonData.titleId)){
            this.messageDataList.splice(this.messageDataList.findIndex(i=>i == jsonData.titleId),1,jsonData)
          }else{
            this.messageDataList.push(jsonData)
          }
          }
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
          this.openNomiPage(res.data)
          this.closeWebSoket()
        }else{
           this.messageShow = false
           this.loading = false
           iMessage.warn(res.desZh)
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
      const routeData = this.$router.resolve({
        path:'/designate/decisiondata/title',
        query:{
          desinateId:items.nominateId || '',
          designateType:items.nominateProcessType || '',
          partProjType:items.partProjectType || ''
        }
      })
      window.open(routeData.href, '_blank')
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
