<!--
* @author:shujie
* @Date: 2021-2-26 14:55:05
 * @LastEditors: YoHo
* @Description: In User Settings Edit
 -->
<template>
  <iPage v-loading="loading">
    <!-- 零件详情操作按钮 -->
    <div class="pageTitle flex-between-center-center">
      <span>{{partDetails.partNum || ''}}</span>
      <div class="btnList flex-align-center">
        <iButton v-if="!isDisabled" :disabled='tpInfoStuats()' @click="openDiologChangeItems" v-permission.auto='PARTSIGN_EDITORDETAIL_TRANSFERBUTTON|转派'>{{ language('LK_ZHUANPAI','转派') }}</iButton>
        <iButton v-if="!isDisabled" :disabled='tpInfoStuats()' @click="save" v-permission.auto="PARTSIGN_EDITORDETAIL_SIGNBUTTON|签收">{{ language('LK_QIANSHOU','签收') }}</iButton>
        <iButton v-if="!isDisabled" :disabled='tpInfoStuats()' @click="openDiologBack" v-permission.auto="PARTSIGN_EDITORDETAIL_BACKBUTTON|退回">{{ language('LK_TUIHUI','退回') }}</iButton>
        <!-- <iButton @click="back" v-permission.auto="PARTSIGN_EDITORDETAIL_RETURN|返回">{{ language('LK_FANHUI','返回') }}</iButton> -->
        <!-- <logButton class="margin-left20" @click="log"  v-permission.auto="PARTSIGN_EDITORDETAIL_LOGBUTTON|日志"/> -->
        <iLoger v-if="partDetails" :config="{module_obj_ae: '新件信息单', bizId_obj_ae: 'bizId_obj_ae', queryParams:['bizId_obj_ae']}" :bizId_obj_ae="logBizId" credentials isPage isUser class="margin-left20" optionDicKey="LOG_OPERATION_TYPES" optionDicKey2="新件信息单详情页" @onTypeChange="onTypeChange" v-permission.auto="PARTSIGN_EDITORDETAIL_LOGBUTTON|日志" />
        <span>
          <icon symbol name="icondatabaseweixuanzhong"></icon>
        </span>
      </div>
    </div>
    <!-- 零件详情内容 -->
    <iCard class="partsDetail" v-permission.auto="PARTSIGN_EDITORDETAIL_ALLTXT|新建信息单详情-零件详情内容">
      <partInfo icons :title="partTitle" :data="partDetails"></partInfo>
    </iCard>
    <!-- 零件详情tab页 -->
    <div class="iTabs" v-if="partDetails">
      <iTabs-list type="card" class="margin-top20" value="2">
        <el-tab-pane lazy :label="language('LK_XINXIDANXIANGQING','信息单详情')" name="1" v-permission.auto="PARTSIGN_EDITORDETAIL_INFORMATIONSHEETDETAILS|新建信息单详情-信息单详情Tab">
          <iCard>
            <partInfo :title="item" :data="partDetails" v-for="(item,index) in partDetailTitle" :key="index"></partInfo>
          </iCard>
        </el-tab-pane>
        <el-tab-pane lazy :label="language('LK_XUNJIAZILIAO','询价资料')" name="2" v-permission.auto="PARTSIGN_EDITORDETAIL_INQUIRYINFORMATION|新建信息单详情-询价资料Tab">
          <enquiryUnconfirmed ref="enquiryUnconfirmed" class="enquiryUnconfirmed" :data="partDetails" :disabled="isDisabled" @updateVersion="updateEnquiryVersion" />
          <enquiry ref="enquiry" class="enquiry" :data="partDetails" :disabled="isDisabled" />
        </el-tab-pane>
        <el-tab-pane lazy :label="language('LK_MEICHEYONGLIANG','每车用量')" name="3" v-permission.auto="PARTSIGN_EDITORDETAIL_USAGEPERVEHICLE|新建信息单详情-每车用量Tab">
          <volumeUnconfirmed ref="volumeUnconfirmed" class="volumeUnconfirmed" :data="partDetails" :disabled="isDisabled" @updateVersion="updateVolumeVersion" />
          <volume ref="volume" class="volume" :data="partDetails" :disabled="isDisabled" />
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
import { iPage, iButton, iCard, iTabsList, icon, iMessage ,iMessageBox} from "rise";
import partInfo from "./components/partInfo";
import enquiry from "./components/enquiry/enquiry";
import enquiryUnconfirmed from "./components/enquiry/unconfirmed";
import volume from "./components/volume/volume";
import volumeUnconfirmed from "./components/volume/unconfirmed";
import backItems from "../home/components/backItems";
import changeItems from "../home/components/changeItems";
import { partDetailTitle, partTitle } from "./components/data";
// import { getPartInfo } from "@/api/partsign/editordetail";
import { getTabelData, patchRecords } from "@/api/partsign/home";
// import logButton from '@/components/logButton'
import local from "@/utils/localstorage";
import { TP_INFO_STATUS } from "@/views/partsign/home/components/data"
import iLoger from 'rise/web/components/iLoger'
import { searchBuyerInfo } from "@/api/partsign/editordetail"

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
    volumeUnconfirmed,
    // logButton,
    enquiryUnconfirmed,
    iLoger
  },
  data() {
    return {
      partDetailTitle: partDetailTitle, //顶部零件数据
      partTitle: partTitle, //tab页零件详情数据
      diologChangeItems: false, //转派弹窗
      diologBack: false, //退回弹窗
      partDetails: null, //零件信息单详情
      backmark:'',
      logFiltType: '',
      loading: false
    };
  },
  computed: {
    // 页面是否处于预览模式
    isDisabled() {
      return this.$route.meta.isPreview
    },
    // 日志组件bizId
    logBizId() {
      const logType = ['拒绝每车用量','确认每车用量','拒绝询价资料','确认询价资料']
      // return logType.includes(this.logFiltType) ? this.partDetails.purchasingRequirementId : this.partDetails.tpPartID
      return this.partDetails.purchasingRequirementId
    }
  },
  created() {
    this.getPartInfo();
    // this.searchBuyerInfo()
  },
  methods: {
    onTypeChange(type) {
      this.logFiltType = type
    },
    //如果当前状态的信息单是已经签收的，则签收和退回需要变成灰色
    tpInfoStuats(){
      if(this.partDetails.status == "已签收" || this.partDetails.status == "已更新" || this.partDetails.status == "已退回"){
        return true
      } else {
        return false  
      }
      
    },
    getPartInfo() {
      // this.partDetails = JSON.parse(localStorage.getItem('tpPartInfoVO')) || {};
      // console.log(this.partDetails, '***********');
      this.loading = true
      getTabelData({
        tpId: this.$route.query.tpPartID
      })
      .then(res => {
        if (res.code == 200 && res.data.tpRecordsSenarioResult) {
          this.partDetails = Array.isArray(res.data.tpRecordsSenarioResult.tpRecordList) ? (res.data.tpRecordsSenarioResult.tpRecordList[0].tpPartInfoVO || {}) : {}
          this.searchBuyerInfo()
        } else {
          this.partDetails = {}
        }
      })
      .finally(() => this.loading = false)
    },
    //签收
    save() {
       if (	this.partDetails.status == 1) return iMessage.warn(this.language('LK_NINXUANZHONGDEDANJUZHONGCUNZAIYIQIANSHOUDEXINXIDANBUNENGPILIANGQIANSHOU','抱歉，您选中的单据中存在已签收的信息单，不能批量签收！'));
      iMessageBox(
        this.language('LK_NINSHIFOUQUERENDUIXINJIANXINXIDANJINHANGQIANSHOU','您是否确认对新件信息单进行签收？'), // 暂时处理
        this.language('LK_WENXINTISHI','温馨提示'), 
        { confirmButtonText: this.language('LK_QUEDING','确定'), cancelButtonText: this.language('LK_QUXIAO','取 消') }
      ).then(res=>{
        this.patchRecords(TP_INFO_STATUS.ACCEPTED) // 签收
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
      this.patchRecords(TP_INFO_STATUS.REFUSED) // 退回
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
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getPartInfo()
          // this.partDetails.status = type == TP_INFO_STATUS.ACCEPTED ? this.language('LK_YIQIANSHOU','已签收') : this.language('LK_YITUIHUI','已退回')
          // local.set(
          //   "tpPartInfoVO",
          //   JSON.stringify(this.partDetails)
          // );
        }else{
          iMessage.error(res.desZh)
        }
      })
    },
    //转派
    patchRecordsForTranslate(val){
      patchRecords({transferTpInfoGroup:{
        tpIds:[this.partDetails.tpPartID],
        userId:val.id
      }}).then(res=>{
        if(res.code == 200){
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getPartInfo()
        }else{
          iMessage.error(res.desZh)
        }
      })
    },
    log() {
      window.open(`/#/log?recordId=${ this.partDetails.tpPartID }`, '_blank')
    },
    updateVolumeVersion() {
      this.$refs.volumeUnconfirmed.getPerCarDosageVersion()
      this.$refs.volume.getVolume()
    },
    updateEnquiryVersion() {
      this.$refs.enquiryUnconfirmed.getAttachmentVersion()
      this.$refs.enquiry.getEnquiry()
    },
    // 更新询价采购员
    searchBuyerInfo() {
      searchBuyerInfo({
        tpPartID: this.partDetails.tpPartID
      })
      .then(res => {
        if (res.code == 200) {
          this.$set(this.partDetails, "stuffName", res.data.nameZh)
          // localStorage.setItem("tpPartInfoVO", JSON.stringify(this.partDetails))
          // this.getPartInfo()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
    }
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
        color: #67C23A;
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

.volumeUnconfirmed + .volume,
.enquiryUnconfirmed + .enquiry {
	margin-top: 30px;
}
</style>
