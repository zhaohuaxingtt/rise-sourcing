<!--
 * @Author: your name
 * @Date: 2021-07-26 16:45:48
 * @LastEditTime: 2022-01-24 12:36:33
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\detail\index.vue
-->
<template>
  <iPage class="aekodetail">
    <div class="header flex-between-center margin-bottom20">
      <h2>AEKO号：{{ aekoInfo.aekoCode }}</h2>
      <div>
        <iButton v-if="fromStance" v-permission.auto="AEKO_DETAIL_BUTTON_SHENPIDANYULAN|审批单预览" @click="goToApprovalform">{{language('SHENPIDANYUANLIAN','审批单预览')}}</iButton>
        <iButton v-permission.auto="AEKO_DETAIL_BUTTON_AEKOXIANGQING|AEKO详情" @click="goToDetail">{{language('LK_AEKO_BUTTON_DETAIL','AEKO详情')}}</iButton>
        <template v-if="!fromCheck">
          <switchPost />
          <!-- <logButton @click="openLog" class="margin-left20" />
          <iLog :show.sync="showDialog" :bizId="bizId"></iLog> -->
          <iLoger ref="log" :config="{module_obj_ae: module, bizId_obj_ae: aekoInfo.requirementAekoId, menuName_obj_ae:$store.getters.getLogMenu, queryParams:[]}" :credentials="true" isPage :isUser="true" class="margin-left25" />
        </template>
        
      </div>
    </div>
    <page-content ref="pageContent" @setAekoInfo="setAekoInfo"></page-content>
  </iPage>
</template>

<script>
import { 
  iPage, 
  iButton,
  iMessage
 } from "rise"
import logButton from "@/components/logButton"
import switchPost from '@/components/switchPost'
import pageContent from "./components"
import { roleMixins } from "@/utils/roleMixins";
import iLog from "../log";
import iLoger from 'rise/web/components/iLoger'

export default {
  mixins:[roleMixins],
  components: { 
    iPage, 
    iButton,
    logButton,
    pageContent,
    iLog,
    switchPost,
    iLoger
  },
  created() {
    const roleList = this.roleList;
    this.isLinie = roleList.includes('LINIE') || roleList.includes('ZYCGY'); // 专业采购员
    this.aekoInfo = {
      requirementAekoId: this.$route.query.requirementAekoId
    }
    const {query} = this.$route;
    const {from=''} = query;
    if(from == 'check') this.fromCheck = true;
    if(from == 'stance') this.fromStance = true;
  },
  data() {
    return {
      aekoInfo: {},
      showDialog: false,
      bizId: '',
      isLinie: false,
      fromCheck:false,
      fromStance:false,
    }
  },
  methods: {
    // 修改aekoInfo
    setAekoInfo(val){
      this.$set(this,'aekoInfo',val)
    },

    // 跳转到描述页
    goToDetail(){
       const { aekoInfo } = this;
       const {requirementAekoId,aekoCode} = aekoInfo;
        const routeData = this.$router.resolve({
          path: '/aeko/describe',
          query: {
            requirementAekoId,
            aekoCode,
          },
        })
        window.open(routeData.href, '_blank')
    },
    // 跳转到审批单预览
    goToApprovalform(){
       const { aekoInfo } = this;
       let transmitObj = {
            option: 4,
            aekoApprovalDetails: {
              linieId: this.userInfo.id,
              aekoNum: aekoInfo.aekoCode,
              requirementAekoId: aekoInfo.requirementAekoId,
              aekoManageId: aekoInfo.aekoManageId,
              workFlowDTOS:[]
            }
       }
      let routeData = this.$router.resolve({
        path: `/aeko/AEKOApprovalDetails`,
        query: {
          from:'aekodetail',
          requirementAekoId: aekoInfo.requirementAekoId,
          aekoManageId: aekoInfo.aekoManageId,
          transmitObj: window.btoa(unescape(encodeURIComponent(JSON.stringify(transmitObj))))
        }
      })
      window.open(routeData.href, '_blank')
    },
    // 打开日志
    openLog(){
      this.bizId = this.aekoInfo.requirementAekoId
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.aekodetail {
  .basic-form{
    ::v-deep.el-form-item__content {
      margin-left: 0!important;
    }
  }
  .aekodetail-tabs {
    ::v-deep.el-tabs__item {
      position: relative;
      .icon-alarm {
        display: block;
        position: absolute;
        right: 1px;
        top: 1px;
      }
    }
  }
}
</style>