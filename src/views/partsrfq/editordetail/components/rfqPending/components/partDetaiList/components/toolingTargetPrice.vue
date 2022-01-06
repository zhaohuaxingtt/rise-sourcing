<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-11-15 19:58:57
 * @LastEditTime: 2022-01-06 10:37:25
 * @LastEditors: YoHo
-->
<template>
  <iDialog  :visible.sync="visible" class="toolingTargetPrice">
    <template slot="title">
      <div class="el-dialog__title">
        <span class="font18 font-weight">{{language('XIUGAIJILU','修改记录')}}</span>
      </div>
    </template>
    <tableList lang :selection="false" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" v-permission.auto="ARTSPROCURE_EDITORDETAIL_TARGETPRICE_TOOLINGTARGETPRICE_TABLE|申请目标价-投资目标价表格" />
    <iPagination
      class="pagination"
      v-update
      @size-change="handleSizeChange($event, searchToolingTargetPriceInfo)"
      @current-change="handleCurrentChange($event, searchToolingTargetPriceInfo)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount" />
  </iDialog>
</template>

<script>
import { iFormGroup, iFormItem, iText, iPagination, iDialog } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { searchToolingTargetPriceInfo } from "@/api/financialTargetPrice/index"
import { pageMixins } from "@/utils/pageMixins"

export default {
  components: { iFormGroup, iFormItem, iText, iPagination, tableList, iDialog },
  mixins: [ pageMixins ],
  props: {
    rfqId: {
      type: String,
    },
    visible: {type: Boolean }
  },
  data() {
    return {
      loading: false,
      targetPrice: "0.00",
      tableTitle:[
	{ props: "applicationDate", name: "申请日期", key: "SHENQINGRIQI" },
	{ props: "applicationType", name: "申请类型", key: "SHENQINGLEIXING" },
	{ props: "cfName", name: "CF负责人", key: "CFFUZEREN" },
	{ props: "expectedTargetPrice", name: "期望目标价", key: "QIWANGMUBIAOJIA" },
	{ props: 'targetPrice', name: '目标价', key: 'MUBIAOJIA' },
	{ props: "approvalStatus", name: "申请状态", key: "SHENQINGZHUANGTAI" },
	{ props: "remarks", name: "备注", key: "BEIZHU" },
],
      tableListData: []
    }
  },
  watch:{
     visible(nv) {
      this.$emit("update:visible", nv)
      if(nv){
        this.searchToolingTargetPriceInfo()
      }
    },
  },
  created() {
    
  },
  methods: {
    searchToolingTargetPriceInfo() {
      this.loading = true

				searchToolingTargetPriceInfo({
					current: this.page.currPage,
					size: this.page.pageSize,
					rfqId: this.rfqId,
					// fsNum: this.params.fsnrGsnrNum,
					// partNum: this.params.partNum
				})
				.then(res => {
					if (res.code == 200) {
            this.targetPrice = res.data.targetPrice
            console.log("res.data.page.records", res.data.page.records)

            this.tableListData = Array.isArray(res.data.page.records) ? res.data.page.records : []
            this.page.totalCount = res.data.page.total || 0
					} else {
						iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
					}
				})
				.finally(() => this.loading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination{
  padding-bottom: 20px;
}
</style>