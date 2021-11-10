<template>
  <div class="toolingTargetPrice">
    <div class="header flex-between-center-center">
			<span class="title">{{ language('SHENQINGTOUZIMUBIAOJIA','投资目标价') }}</span>
		</div>
		<iFormGroup row="3" icon inline>
			<iFormItem :label="language('TOUZIMUBIAOJIA', '投资目标价')" name="test">
				<iText>{{ targetPrice }}</iText>
			</iFormItem>
		</iFormGroup>
		<div class="header flex-between-center-center">
			<span class="title">{{ language('XIUGAIJILU','修改记录') }}</span>
		</div>
    <tableList lang :selection="false" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" />
    <iPagination
      class="pagination margin-top30"
      v-update
      @size-change="handleSizeChange($event, searchToolingTargetPriceInfo)"
      @current-change="handleCurrentChange($event, searchToolingTargetPriceInfo)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount" />
  </div>
</template>

<script>
import { iFormGroup, iFormItem, iText, iPagination } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { moduleTargePriceTableTitle as tableTitle } from "./data"
import { searchToolingTargetPriceInfo } from "@/api/financialTargetPrice/index"
import { pageMixins } from "@/utils/pageMixins"

export default {
  components: { iFormGroup, iFormItem, iText, iPagination, tableList },
  mixins: [ pageMixins ],
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: false,
      targetPrice: "0.00",
      tableTitle,
      tableListData: []
    }
  },
  created() {
    this.searchToolingTargetPriceInfo()
  },
  methods: {
    searchToolingTargetPriceInfo() {
      this.loading = true

				searchToolingTargetPriceInfo({
					current: this.page.currPage,
					size: this.page.pageSize,
					rfqId: this.params.rfqId,
					fsNum: this.params.fsnrGsnrNum,
					partNum: this.params.partNum
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
.toolingTargetPrice {
  .header {
		margin-bottom: 20px;

		.title {
			font-size: 18px;
			font-weight: bold;
			color: #001847;
		}
	}
}
</style>