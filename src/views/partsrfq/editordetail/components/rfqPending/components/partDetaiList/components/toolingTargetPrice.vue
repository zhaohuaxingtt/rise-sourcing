<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-11-15 19:58:57
 * @LastEditTime: 2022-01-07 22:58:17
 * @LastEditors: YoHo
-->
<template>
  <iDialog  :visible.sync="visible" class="toolingTargetPrice">
    <template slot="title">
      <div class="el-dialog__title">
        <span class="font18 font-weight">{{language('XIUGAIJILU','修改记录')}}</span>
      </div>
    </template>
    <tablelist v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_TABLE|申请财务目标价-表格" :tableData='tableListData' :tableTitle='targeTitle' :tableLoading='loading' :selection="false"></tablelist>
    <iPagination
      class="pagination"
      v-update
      @size-change="handleSizeChange($event, getTargetPrice)"
      @current-change="handleCurrentChange($event, getTargetPrice)"
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
import tablelist from "@/views/partsign/editordetail/components/tableList"
import { getCfTargetApplyHistory } from "@/api/financialTargetPrice/index"
import { pageMixins } from "@/utils/pageMixins"

export default {
  components: { iFormGroup, iFormItem, iText, iPagination, tablelist, iDialog },
  mixins: [ pageMixins ],
  props: {
    rfqId: {
      type: String,
    },
    visible: {type: Boolean }
  },
  data() {
    return {
      tableLoading: false,
      targeTitle:[{
	props: 'applyDate',
	name: '申请日期',
	key:'LK_SHENQINGRIQI',
  width:200
},
{
	props: 'applyType',
	name: '申请类型',
	key:'LK_SHENQINGLEIXING'
},
{
	props: 'priceAnaName',
	name: 'CF负责人',
	key:'LK_CFFUZEREN'
},
{
	props: 'applyCategoryDesc',
	name: '申请类别',
	key:'LK_SHENQINGLEIBIE'
},
{
	props: 'expTargetpri',
	name: '期望目标价',
	key:'LK_QIWANGMUBIAOJIA'
},
{
	props: 'applyStatusDesc',
	name: '申请状态',
	key:'LK_SHENQINGZHUANGTAI'
},
{
	props: 'approveStatusDesc',
	name: '审批状态',
	key:'SHENPIZHUANGTAI'
},
],
      tableListData: []
    }
  },
  watch:{
     visible(nv) {
      this.$emit("update:visible", nv)
      if(nv){
        this.getTargetPrice()
      }
    },
  },
  created() {
    
  },
  methods: {
			getTargetPrice() {
        this.loading = true
				getCfTargetApplyHistory({
					rfqId: this.$route.query.id,
					pageNo: this.page.currPage,
					pageSize: this.page.pageSize
				})
				.then(res => {
					if (res.code == 200) {
						this.page.totalCount = Number(res.total),
						this.tableListData = res.data || []
					} else {
						iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
					}
          this.loading = false
				})
				.catch(() => {
          this.loading = false})
			},
  }
}
</script>

<style lang="scss" scoped>
.pagination{
  padding-bottom: 20px;
}
</style>