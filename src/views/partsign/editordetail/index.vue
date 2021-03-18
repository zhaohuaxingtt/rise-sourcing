<!--
* @author:shujie
* @Date: 2021-2-26 14:55:05
 * @LastEditors: Please set LastEditors
* @Description: In User Settings Edit
 -->
<template>
  <iPage>
    <!-- 零件详情操作按钮 -->
    <div class="pageTitle flex-between-center-center">
      <span>3QG810005L</span>
      <div class="btnList flex-align-center">
        <iButton @click="openDiologChangeItems" v-permission='BTN_PARTSIGN_ZHUANPAI'>转派</iButton>
        <iButton @click="save">签收</iButton>
        <iButton @click="openDiologBack" disabled>退回</iButton>
        <iButton @click="back">返回</iButton>
        <span class="flex-align-center">
          <icon symbol name="iconrizhiwuzi"></icon>
          <span class="log">日志</span>
        </span>
        <span>
          <icon symbol name="icondatabaseweixuanzhong"></icon>
        </span>
      </div>
    </div>
    <!-- 零件详情内容 -->
    <iCard class="partsDetail">
      <partInfo icons :title="partTitle" :data="partDetails"></partInfo>
    </iCard>
    <!-- 零件详情tab页 -->
    <div class="iTabs">
      <iTabs-list type="border-card">
        <el-tab-pane label="信息单详情" >
          <iCard>
            <partInfo :title="item" :data="partDetails" v-for="(item,index) in partDetailTitle" :key="index"></partInfo>
          </iCard>
        </el-tab-pane>
        <el-tab-pane :label="$t('partsign.enquiry')">
          <enquiry :data="partDetails.partAttachmentList" />
        </el-tab-pane>
        <el-tab-pane :label="$t('partsign.volume')">
          <unconfirmed class="unconfirmed" :data="partDetails" />
          <volume class="volume" />
        </el-tab-pane>
        <!-- <el-tab-pane :label="$t('partsign.log')">
          <iCard class="card">
            <log />
          </iCard>
        </el-tab-pane> -->
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
import { iPage, iButton, iCard, iTabsList, icon, iMessage } from "@/components";
import partInfo from "./components/partInfo";
import enquiry from "./components/enquiry";
import volume from "./components/volume/volume";
import unconfirmed from "./components/volume/unconfirmed";
import backItems from "../home/components/backItems";
import changeItems from "../home/components/changeItems";
// import log from './components/log';
import { partDetailTitle, partTitle } from "./components/data";
// import { getPartInfo } from "@/api/partsign/editordetail";
import {qstuihui} from "@/api/partsign/home";
import {signTpInfo} from "../home/components/data"
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
    // log
  },
  data() {
    return {
      partDetailTitle: partDetailTitle, //顶部零件数据
      partTitle: partTitle, //tab页零件详情数据
      diologChangeItems: false, //转派弹窗
      diologBack: false, //退回弹窗
      partDetails: {}, //零件信息单详情
    };
  },
  created() {
    this.getPartInfo();
  },
  methods: {
    getPartInfo() {
		this.partDetails = JSON.parse(localStorage.getItem('tpPartInfoVO')) || {};
    },
    //签收
    save() {
		// 签收退回新建信息单入参
		let  data = {
			csFReceiveDate: "", //签收/退回时间
			csFReceiveDeptNum: "", //签收人/退回人部门
			csFReceiveMemo: "", //备注
			csFReceiveName: "", //签收人/退回人姓名
			csFReceiveNum: "", //签收人/退回人工号
			isCSFAccepted: "", //0：退回；1：签收；
			partSerialNum: "" //零件信息单流水号
		}
		qstuihui(data).then(res=>{
			iMessage.success("签收成功");
		}).catch(()=>{
			iMessage.error("签收失败");
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
      console.log("your message:", val);
      this.diologBack = false;
    },
    // 确定转派
    sureChangeItems(val) {
      console.log("your select data is", JSON.parse(val));
      this.diologChangeItems = false;
    },
    // 返回
    back() {
      this.$router.go(-1);
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
