<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: Please set LastEditors
 * @Descripttion: 总览
-->
<template>
  <iCard id="bulkSupplierPandect"
         @handleTitle="addFile($event,8, '批量供应商工厂总览')"
         :title="$route.path==='/sourceinquirypoint/sourcing/partsrfq/assistant'?language('PILIANGGONGYINGSHANGGONGCHANGZONGLAN','批量供应商工厂总览')+`<span class='cursor' ><i style='color:#67C23A; font-weight: bold;font-size: 18px;' class='el-icon-shopping-cart-1'></i></span>`:language('PILIANGGONGYINGSHANGGONGCHANGZONGLAN','批量供应商工厂总览')"
         :defalutCollVal="$route.path==='/sourceinquirypoint/sourcing/partsrfq/assistant'?false:true"
         collapse>
    <div class="center"
         id="card8"
         v-loading="onDataLoading">
      <div class="tip">
        <el-popover trigger="hover"
                    placement="top-start"
                    width="400"
                    :content="$t('LK_GCLZDPLGYSGCDCGJEYJFBQK')">
          <icon slot="reference"
                style="font-size:1.375rem"
                name="iconxinxitishi"
                tip=""
                symbol></icon>
        </el-popover>
      </div>
      <div class="title-btn"
           v-if="$route.path==='/sourcing/categoryManagementAssistant/internalDemandAnalysis/bulkSupplierPandect'">
        <iButton :loading="saveButtonLoading"
                 @click="handleSave" v-permission="CATEGORY_ASSISTANT_PLGYSZL_SAVE">{{language("BAOCUN","保存")}}</iButton>
        <iButton @click="handleBack">{{language("FANHUI","返回")}}</iButton>
      </div>
      <supplierCard :supplierDataList="supplierDataList"
                    class="card-right" />
      <map1 :mapListData="mapListData" />
      <theMapIcon :mapListData="mapListData" />
    </div>
  </iCard>
</template>

<script>
import { iCard, icon, iButton } from "rise";
import map1 from "./map.vue";
import theMapIcon from "./theMapIcon.vue";
import { saveOverviewSupplierBatchReport, queryRfqSupplierList, queryRfqSupplierListByCategory } from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";
import supplierCard from "./supplierCard.vue";
import { downloadPdfMixins } from '@/utils/pdf';
import resultMessageMixin from '@/utils/resultMessageMixin';
import { icardData } from '../../data'
export default {
  mixins: [resultMessageMixin, downloadPdfMixins],
  components: { iCard, icon, iButton, map1, supplierCard, theMapIcon },
  props: {
    paramCategoryCode: String,
    paramCategoryName: String,
    rfqInfoData: { type: Object },
  },

  data () {
    return {
      cardShow: JSON.parse(JSON.stringify(icardData)),
      saveButtonLoading: false,
      mapListData: {},
      supplierDataList: [],
      categoryCode: "",
      categoryName: "",
      onDataLoading: false
    }
  },
  watch: {
    '$store.state.rfq.categoryCode' (data) {
      this.categoryCode = data
      this.getMapList()
    },
    paramCategoryCode: {
      handler (val) {
        console.log(val)
        if (val) {
          this.categoryCode = this.paramCategoryCode
          this.categoryName = this.paramCategoryName
        }
      },
      immediate: true
    },
    rfqInfoData (val) {
      this.rfqInfoData = val
    }
  },
  created () {
    if (this.paramCategoryCode) {
      this.categoryCode = this.paramCategoryCode
      this.categoryName = this.paramCategoryName
    } else {
      this.categoryCode = this.$store.state.rfq.categoryCode
      this.categoryName = this.$store.state.rfq.categoryName
    }
    this.getMapList()
  },
  mounted () {
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    async handleSave () {
      this.saveButtonLoading = true;
      const resFile = await this.getDownloadFileAndExportPdf({
        domId: '#bulkSupplierPandect',
        watermark: this.$store.state.permission.userInfo.deptDTO.nameEn + '-' + this.$store.state.permission.userInfo.userNum + '-' + this.$store.state.permission.userInfo.nameZh + "^" + window.moment().format('YYYY-MM-DD HH:mm:ss'),
        pdfName: this.language('PINLEIGUANLIZHUSHOU', '品类管理助手') + '-' + this.language('PILIANGGONGYINGSHANGGONGCHANGZONGLAN', '批量供应商工厂总览') + '-' + this.categoryName + '-' + window.moment().format('YYYY-MM-DD') + '|',
      });
      let params = {
        categoryCode: this.categoryCode,
        reportFileName: resFile.downloadName,
        reportName: resFile.downloadName,
        reportUrl: resFile.downloadUrl
      }
      const res = await saveOverviewSupplierBatchReport(params)
      this.resultMessage(res);
      this.saveButtonLoading = false;
    },
    async getMapList () {
      this.onDataLoading = true
      const pms = {
        rfqId: '',
        categoryCode: ''
      }
      var res;
      if (this.$route.path === '/sourceinquirypoint/sourcing/partsrfq/assistant') {
        pms.rfqId = this.$route.query.id
        res = await queryRfqSupplierList(pms)
      } else {
        pms.categoryCode = this.categoryCode
        res = await queryRfqSupplierListByCategory(pms)
      }
      this.mapListData = res.data
      this.supplierDataList = res.data.supplierList || []
      this.$nextTick(() => {
        this.onDataLoading = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.center {
  position: relative;
  width: 100%;
  .card-right {
    margin: 20px;
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
  top: -3.22rem;
  left: 13.3rem;
}
</style>