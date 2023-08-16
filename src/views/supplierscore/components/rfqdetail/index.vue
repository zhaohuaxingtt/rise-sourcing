<!--
 * @Author: your name
 * @Date: 2021-06-22 10:45:39
 * @LastEditTime: 2022-02-21 11:36:15
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\index.vue
-->
<template>
  <iPage class="rfqdetail">
    <div class="header">
      <div class="title">{{ language("RFQBIANHAO", "RFQ编号") }}: {{ rfqId }}</div>
      <div>
        <iButton v-if="showSQE" @click="openDialog">{{language('选择SQE评分股')}}</iButton>
        <iLoger :config="{ bizId_obj_ae: 'rfqId', module_obj_ae:'供应商评分', queryParams:['bizId_obj_ae']}" isPage :isUser="true" class="margin-left25" />
      </div>
    </div>
    <infos class="margin-top30" :rfqInfo="rfqInfo" :showSQE="showSQE" />
    <iTabsList class="margin-top20" type="card" v-model="currentTab" @tab-click="tabChange">
      <el-tab-pane lazy v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="language(tab.key, tab.label)" :name="tab.name" v-permission.dynamic.auto="tab.permissionKey">
        <component :ref="tab.name" :is="component" :rfqInfo="rfqInfo" :showSQE="showSQE" :rfqId="rfqId" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :disabled="disabled" @updateRfq="updateRfq" />
      </el-tab-pane>
    </iTabsList>
    <transferSQEDeptDialog
        ref="forwardDialog"
        :visible.sync="forwardDialogVisible"
        @getData="getRfqDetailByCurrentDept"
        :rows="[rfqInfo]"
      />
  </iPage>
</template>

<script>
import { iPage, iButton, iTabsList, iMessage } from "rise"
import logButton from "@/components/logButton"
import infos from "./components/infos"
import partList from "./components/partList"
import supplierScore from "./components/supplierScore"
import inquiryAttachment from "./components/inquiryAttachment"
import transferSQEDeptDialog from "../transferSQEDeptDialog"
import { getRfqDetailByCurrentDept } from "@/api/supplierscore"

import iLoger from 'rise/web/components/iLoger'

export default {
  components: {
    iPage,
    iButton,
    iTabsList,
    logButton,
    infos,
    partList,
    supplierScore,
    inquiryAttachment,
    transferSQEDeptDialog,
    iLoger
  },
  data() {
    return {
      rfqId: "",
      currentTab: "partList",
      tabs: [
        { label: "零件清单", name: "partList", key: "LK_LINGJIANQINGDAN", components: [ "partList" ], permissionKey: "SUPPLIERSCORE_RFQDETAIL_TAB_PARTLIST|零件清单" },
        { label: "供应商评分", name: "supplierScore", key: "LK_GONGYINGSHANGPINGFEN", components: [ "supplierScore" ], permissionKey: "SUPPLIERSCORE_RFQDETAIL_TAB_SUPPLIERSCORE|供应商评分" },
        { label: "询价附件", name: "inquiryAttachment", key: "LK_XUNJIAFUJIAN", components: [ "inquiryAttachment" ], permissionKey: "SUPPLIERSCORE_RFQDETAIL_TAB_INQUIRYATTACHMENT|询价附件" }
      ],
      rfqInfo: {},
      forwardDialogVisible: false
    }
  },
  computed:{
    showSQE(){
      return this.rfqInfo.showSQE || true
    }
  },
  provide() {
    return {
      getRfqDetailByCurrentDept: this.getRfqDetailByCurrentDept,
    };
  },
  created() {
    this.rfqId = this.$route.query.rfqId
    this.currentTab = this.$route.query.currentTab
    this.getRfqDetailByCurrentDept()
  },
  mounted() {
    const component = this.$refs[this.currentTab][0]
    if (typeof component.init === "function") component.init()
  },
  methods: {
    getRfqDetailByCurrentDept(type) {
      this.loading = true
      getRfqDetailByCurrentDept({
        rfqId: this.rfqId
      })
      .then(res => {
        if (res.code == 200) {
          this.rfqInfo = res.data || {}

          if (type !== "update") {
            const component = this.$refs[this.currentTab][0]
            if (typeof component.init === "function") component.init()
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    // 页签切换
    tabChange() {
      this.$nextTick(() => {
        const component = this.$refs[this.currentTab][0]
        if (typeof component.init === "function") component.init()
      })
    },
    // 更新RFQ信息
    updateRfq() {
      this.getRfqDetailByCurrentDept("update")
    },
    // 选择SQE评分股
    openDialog() {
      this.forwardDialogVisible = true
    },
    // 
    confirmForward(){
      this.forwardDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.rfqdetail {
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }
    
  ::v-deep .myLogIcon {
    width: 21px;
    height: 21px;
    vertical-align: middle;
  }
    .control {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      height: 30px;
    }
  }
}
</style>