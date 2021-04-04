<!--
* @author:shujie
* @Date: 2021-2-26 14:55:05
 * @LastEditors: Please set LastEditors
* @Description: In User Settings Edit
 -->
<template>
  <iPage v-permission="PARTSIGN_EDITORDETAIL_INDEXPAGE">
    <!-- 零件详情操作按钮 -->
    <div class="pageTitle flex-between-center-center">
      <span>{{partDetails.partNum || ''}}</span>
      <div class="btnList flex-align-center">
        <iButton :disabled='tpInfoStuats()' @click="openDiologChangeItems" v-permission='PARTSIGN_EDITORDETAIL_TRANSFERBUTTON'>{{ $t('LK_ZHUANPAI') }}</iButton>
        <iButton :disabled='tpInfoStuats()' @click="save" v-permission="PARTSIGN_EDITORDETAIL_SIGNBUTTON">{{ $t('LK_QIANSHOU') }}</iButton>
        <iButton :disabled='tpInfoStuats()' @click="openDiologBack" v-permission="PARTSIGN_EDITORDETAIL_BACKBUTTON">{{ $t('LK_TUIHUI') }}</iButton>
        <iButton @click="back" v-permission="PARTSIGN_EDITORDETAIL_RETURN">{{ $t('LK_FANHUI') }}</iButton>
        <logButton class="margin-left20" @click="log"  v-permission="PARTSIGN_EDITORDETAIL_LOGBUTTON"/>
        <span>
          <icon symbol name="icondatabaseweixuanzhong"></icon>
        </span>
      </div>
    </div>
    <!-- 零件详情内容 -->
    <iCard class="partsDetail" v-permission="PARTSIGN_EDITORDETAIL_ALLTXT">
      <partInfo icons :title="partTitle" :data="partDetails"></partInfo>
    </iCard>
    <!-- 零件详情tab页 -->
    <div class="iTabs">
      <iTabs-list type="border-card">
        <el-tab-pane :label="$t('LK_XINXIDANXIANGQING')" v-permission="PARTSIGN_EDITORDETAIL_INFORMATIONSHEETDETAILS">
          <iCard>
            <partInfo :title="item" :data="partDetails" v-for="(item,index) in partDetailTitle" :key="index"></partInfo>
          </iCard>
        </el-tab-pane>
        <el-tab-pane :label="$t('LK_XUNJIAZILIAO')" v-permission="PARTSIGN_EDITORDETAIL_INQUIRYINFORMATION">
          <enquiry :data="partDetails" />
        </el-tab-pane>
        <el-tab-pane :label="$t('LK_MEICHEYONGLIANG')" v-permission="PARTSIGN_EDITORDETAIL_USAGEPERVEHICLE">
          <unconfirmed ref="unconfirmed" class="unconfirmed" :data="partDetails" @updateVersion="updateVersion" />
          <volume ref="volume" class="volume" :data="partDetails" />
        </el-tab-pane>
      </iTabs-list>
    </div>
    <!-- 转派弹出框 -->
    <changeItems
      v-model="diologChangeItems"
      @sure="sureChangeItems"
    ></changeItems>
    <!-- 退回弹出框 -->
    <backItems v-model="diologBack" @sure="sureBackmark"></backItems>
  </iPage>
</template>
<script>
import { iPage, iButton, iCard, iTabsList, icon, iMessage ,iMessageBox} from "@/components";
import partInfo from "./components/partInfo";
import enquiry from "./components/enquiry";
import volume from "./components/volume/volume";
import unconfirmed from "./components/volume/unconfirmed";
import backItems from "../home/components/backItems";
import changeItems from "../home/components/changeItems";
import { partDetailTitle, partTitle } from "./components/data";
// import { getPartInfo } from "@/api/partsign/editordetail";
import {patchRecords} from "@/api/partsign/home";
import logButton from '@/views/partsign/editordetail/components/logButton'
import local from "@/utils/localstorage";
export default {
  components: {
    iPage,
    iButton,
    iCard,
    iTabsList,
    icon,
    partInfo,
    enquiry,
    volume,
    backItems,
    changeItems,
    unconfirmed,
    logButton
  },
  data() {
    return {
      partDetailTitle: partDetailTitle, //顶部零件数据
      partTitle: partTitle, //tab页零件详情数据
      diologChangeItems: false, //转派弹窗
      diologBack: false, //退回弹窗
      partDetails: {}, //零件信息单详情
      backmark:''
    };
  },
  created() {
    this.getPartInfo();
  },
  methods: {
    //如果当前状态的信息单是已经签收的，则签收和退回需要变成灰色
    tpInfoStuats(){
      if(this.partDetails.status == "已签收"){
        return true
      } else {
        return false  
      }
      
    },
    getPartInfo() {
		  this.partDetails = JSON.parse(localStorage.getItem('tpPartInfoVO')) || {};
    },
    //签收
    save() {
       if (	this.partDetails.status == 1) return iMessage.warn(this.$t('LK_NINXUANZHONGDEDANJUZHONGCUNZAIYIQIANSHOUDEXINXIDANBUNENGPILIANGQIANSHOU'));
      iMessageBox(
        this.$t('LK_NINSHIFOUQUERENDUIXINJIANXINXIDANJINHANGQIANSHOU'), // 暂时处理
        this.$t('LK_WENXINTISHI'), 
        { confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') }
      ).then(res=>{
        this.patchRecords(2)
      })
    },
    //退回
    openDiologBack() {
      this.diologBack = true;
    },
    //转派
    openDiologChangeItems() {
      this.diologChangeItems = true;
    },
    // 确定退回
    sureBackmark(val) {
      this.backMark = val
      this.diologBack = false;
      this.patchRecords(3)
    },
    // 确定转派
    sureChangeItems(val) {
      this.diologChangeItems = false;
      this.patchRecordsForTranslate(val)
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    //签收退回
    patchRecords(type){
      patchRecords({signTpInfoGroup:{
        isCSFAccepted:type,
        tpIds:[this.partDetails.tpPartID],
        csFReceiveMemo:this.backMark
      }}).then(res=>{
        if(res.code == 200){
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
          this.partDetails.status = type == 2 ? this.$t('LK_YIQIANSHOU') : this.$('LK_YITUIHUI')
          local.set(
            "tpPartInfoVO",
            JSON.stringify(this.partDetails)
          );
        }else{
          iMessage.error(res.desZh)
        }
      })
    },
    //转派
    patchRecordsForTranslate(id){
      patchRecords({transferTpInfoGroup:{
        tpIds:[this.partDetails.tpPartID],
        userId:id
      }}).then(res=>{
        if(res.code == 200){
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
        }else{
          iMessage.error(res.desZh)
        }
      })
    },
    log() {
      window.open(`/#/log?recordId=${ this.partDetails.tpPartID }`, '_blank')
    },
    updateVersion() {
      this.$refs.unconfirmed.getPerCarDosageVersion()
      this.$refs.volume.getVolume()
    },
  },
};
</script>
<style lang="scss" scoped>
.pageTitle {
  > span {
    font-size: 20px;
    font-weight: bold;
  }

  .btnList {
    > span {
      font-size: 20px;
      margin-left: 20px;

      // opacity: 0.5;
      .log {
        font-size: 16px;
        color: #1660f1;
        margin-left: 5px;
      }
    }
  }
}

.partsDetail {
  margin-top: 23px;
  z-index: 10;
}

.iTabs {
  margin-top: 15px;
}

.unconfirmed + .volume {
	margin-top: 30px;
}
</style>
