<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: 总览
-->
<template>
  <iCard id="allContainer" :title="language('PILIANGGONGYINGSHANGGONGCHANGZONGLAN','批量供应商工厂总览')" :defalutCollVal="$route.path==='/sourceinquirypoint/sourcing/partsrfq/assistant'?false:true" collapse>
    <div class="center">
      <div v-if="$route.path==='/sourcing/categoryManagementAssistant/internalDemandAnalysis/bulkSupplierPandect'" class="tip">
        <el-popover trigger="hover" placement="top-start" width="400" :content="language('TLJJGLJCLGYSGHBLCXCL','Turnover=零件价格*零件产量*供应商供货比例*车型产量')">
          <icon slot="reference" style="font-size:1.375rem" name="iconxinxitishi" tip="" symbol></icon>
        </el-popover>
      </div>
      <div class="title-btn" v-if="$route.path==='/sourcing/categoryManagementAssistant/internalDemandAnalysis/bulkSupplierPandect'">
        <iButton :loading="saveButtonLoading" @click="handleSave">{{language("BAOCUN","保存")}}</iButton>
        <iButton @click="handleBack">{{language("FANHUI","返回")}}</iButton>
      </div>
      <supplierCard :supplierDataList="supplierDataList" class="card-right" />
      <map1 :mapListData="mapListData" />
      <theMapIcon :mapListData="mapListData" />
    </div>
  </iCard>
</template>

<script>
import { iCard, icon, iButton } from "rise";
import map1 from "./map.vue";
import theMapIcon from "./theMapIcon.vue";
import { overviewBatchSupplierMap,saveOverviewSupplierBatchReport } from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";
import supplierCard from "./supplierCard.vue";
import { downloadPdfMixins } from '@/utils/pdf';
import resultMessageMixin from '@/utils/resultMessageMixin';
export default {
  mixins: [resultMessageMixin, downloadPdfMixins],
  components: { iCard, icon, iButton, map1, supplierCard, theMapIcon },
  data() {
    return {
      saveButtonLoading: false,
      mapListData: {},
      supplierDataList: [],
    }
  },
  watch: {
    '$store.state.rfq.categoryName'(data) {
      this.getMapList()
    }
  },
  created() {
    this.getMapList()
  },
  mounted() {
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    async handleSave() {
      this.saveButtonLoading = true;
      const resFile = await this.getDownloadFileAndExportPdf({
        domId: 'allContainer',
        pdfName: this.language('PINLEIGUANLIZHUSHOU', '品类管理助手') + '-' + this.language('PILIANGGONGYINGSHANGGONGCHANGZONGLAN', '批量供应商工厂总览') + '-' + this.$store.state.rfq.categoryName + '-' + window.moment().format('YYYY-MM-DD') + '|',
      });
      let params = {
        categoryCode: this.$store.state.rfq.categoryCode,
        reportFileName: resFile.downloadName,
        reportName: resFile.downloadName,
        reportUrl: resFile.downloadUrl
      }
      const res = await saveOverviewSupplierBatchReport(params)
      this.resultMessage(res);
      this.saveButtonLoading = false;
    },
    async getMapList() {
      const pms = {
        rfqId: '',
        categoryCode: ''
      }
      if (this.$route.path === '/sourceinquirypoint/sourcing/partsrfq/assistant') {
        pms.rfqId = this.$route.query.id
      } else {
        pms.categoryCode = this.$store.state.rfq.categoryCode
      }
      const res = await overviewBatchSupplierMap(pms)
      this.mapListData = res.data
      this.supplierDataList = res.data.supplierDataList || []
    }
  }
}
</script>

<style lang='scss' scoped>
.center {
  position: relative;
  width: 100%;
  .card-right {
    position: absolute;
    right: 0;
    z-index: 2;
  }
}
.el-button {
  display: flex;
  justify-content: center;
}
.title-btn {
  position: absolute;
  top: -3.625rem;
  right: 0;
  display: flex;
  justify-content: space-between;
}
.tip {
  position: absolute;
  top: -3.2rem;
  left: 11rem;
}
</style>