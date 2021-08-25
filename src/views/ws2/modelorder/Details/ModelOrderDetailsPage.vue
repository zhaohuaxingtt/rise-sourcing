<template>
  <i-page class='orderClassBox'>
    <div class='pageTitle flex-between-center-center margin-botttom20'>
      <span>{{ titleComputed }}</span>
      <div class='btnList flex-align-center'>
        <!---日志-->
        <LogButton class='margin-left10' @click='lookLog'/>
        <LedgerIconComponent/>
      </div>
    </div>
    <div class='line-top margin-top10'></div>
    <div class='flex-between-center-center  margin-top20'>
      <el-radio-group v-model='selectItem' @change='onItemSelfunction'>
        <el-radio-button label='MODEL_ORDER'>{{ $t('MODEL-ORDER.LK_DINGDAN') }}</el-radio-button>
        <el-radio-button label='MODEL_CONTRACT' :disabled='!bottomIsShow'>{{
            $t('MODEL-ORDER.LK_HETONG')
          }}
        </el-radio-button>
      </el-radio-group>

      <div class='btnList flex-align-center'>
        <!--下一步-->
        <i-button v-if='nextStepShow' @click='nextStep'>{{ $t('LK_XIAYIBU') }}</i-button>
        <!--清空-->
        <i-button v-if='nextStepShow' @click='clearForm'>{{ $t('MODEL-ORDER.LK_QINGKONG') }}</i-button>
        <!--保存-->
        <i-button v-if='saveOrderShow' @click='saveOrder'>{{ $t('LK_BAOCUN') }}</i-button>
        <!--编辑-->
        <i-button v-if='editOrderbtnShow' @click='editOrder'>{{ $t('LK_BIANJI') }}</i-button>
        <!--提交订单-->
        <i-button v-if='submitOrderbtnShow' @click='submitOrder'>{{ $t('LK_TIJIAO') }}</i-button>
        <!--版本升级-->
        <i-button v-if='versionUpgradeShow' @click='versionUpgrade'>{{ $t('MODEL-ORDER.LK_BANBENSHNGJI') }}</i-button>
      </div>
    </div>
    <ModelOrderDetailsTopComponents :order-details="orderDetails" :id="id" :option="option" :is-edit="isEdit"/>
  </i-page>
</template>

<script>
import {iButton, iPage, iLog} from 'rise'
import LogButton from "../../budgetManagement/components/logButton";
import LedgerIconComponent from "./components/LedgerIconComponent";
import ModelOrderDetailsTopComponents from "./components/ModelOrderDetailsTopComponents";

export default {
  name: "ModelOrderDetailsPage",
  components: {
    ModelOrderDetailsTopComponents,
    LedgerIconComponent,
    LogButton,
    iButton, iPage, iLog,
  },
  props: ['option', 'id'],
  computed: {
//title显示控制
    titleComputed: function () {
      if (this.option == 0 && this.id == -1) {
        return '新建订单'
      } else {
        if (null == this.orderDetails || this.orderDetails == undefined) return ''
        return this.$t('MODEL-ORDER.LK_RISEDINGDANHAO') + `:${this.orderDetails.contractCode}`
      }
    },
    //创建模式按钮显示
    nextStepShow: function () {
      return this.option == 0 && this.id == -1
    },
    //保存按钮显示
    saveOrderShow: function () {
      let val = this.orderDetails.state ?? 'draft'
      if (val == 'history') return false
      return this.containPurchaseGroup && this.isEdit && this.id !== -1
    },
    //编辑  提交按钮显示
    editOrderbtnShow: function () {
      let val = this.orderDetails.state ?? 'draft'
      if (val == 'history') return false
      if (val == 'formal') {
        return this.containPurchaseGroup && this.orderDetails.isLatest && this.isEdit === false && (this.id != -1 || this.option == 1)
      }
      return this.containPurchaseGroup && this.isEdit === false && (this.id != -1 || this.option == 1)
    },
    //提交按钮显示
    submitOrderbtnShow: function () {
      let val = this.orderDetails.state ?? 'draft'
      if (val == 'history' || val == 'formal') return false
      return this.containPurchaseGroup && this.isEdit === false && (this.id != -1 || this.option == 1)
    },
    //版本升级按钮显示
    versionUpgradeShow: function () {
      let val = this.orderDetails.state ?? 'draft'
      if (val == 'history') return false
      if (val == 'formal') {
        return this.orderDetails.isLatest && this.option == 1 && !this.isEdit
      }
      return val == 'formal' && this.option == 1 && !this.isEdit
    },
    //判断该订单采购组与当前用户所在采购组是否一致
    containPurchaseGroup: function () {
      return this.btnMenuShow
    },
    bottomIsShow() {
      return this.orderDetails != null && this.orderDetails != undefined && this.orderDetails.id != null && this.orderDetails.id != undefined
    }

  },
  data() {
    return {
      selectItem: 'MODEL_ORDER',
      btnMenuShow: false,
      isEdit: false, //编辑状态控制
      orderDetails: {
        departmentCode: this.$store.state.permission.userInfo.deptDTO.deptNum,//部门code
        nameZh: this.$store.state.permission.userInfo.deptDTO.nameZh,//部门名字
        departmentName: this.$store.state.permission.userInfo.deptDTO.nameZh,//部门名字
        version: '1',//版本
        currency: 'RMB',//货币
        paymentCode: '0001',//支付条件
        buyerName: this.$store.state.permission.userInfo.nameZh,//采购员
        buyerId: this.$store.state.permission.userInfo.id,//采购员ID
        buyerCode: this.$store.state.permission.userInfo.userNum,//采购员编号
        state: 'draft',//订单状态
        companyCode: '',//公司代码
        procureOrganization: '1000',//采购组织
        orderDate: new Date().toLocaleDateString().replace(/\//g, '-'),
        contractType: 'NB',
        isSteel: 0,//是否钢材合同 1-是 0-否
        procureGroup: '',
        type: 'DB'//订单类型45，43/steel钢材/db
      },
    }
  },
  methods: {
    lookLog() {

    },
    onItemSelfunction(val) {

    },
    nextStep() {

    },
    clearForm() {

    },
    saveOrder() {

    },
    editOrder() {

    },
    submitOrder() {

    },
    versionUpgrade() {

    }
  }
}
</script>

<style scoped lang="scss">
.orderClassBox {
  position: relative;

  .pageTitle {
    > span {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .btnList {
    > span {
      font-size: 20px;
      margin-left: 20px;
    }

    .log {
      font-size: 16px;
      color: #1660f1;
      margin-left: 5px;
    }


  }
}

.line-top {
  border-top: solid #969896 0.5px;
}
</style>