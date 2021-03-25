<template>
  <iCard class="outputPlan" title="零件产量计划" tabCard>
    <div class="body">
      <tablelist
        class="table"
        index
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading" />
      <iPagination
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, getUsage)"
        @current-change="handleCurrentChange($event, getUsage)"
        background
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iPagination } from '@/components'
import tablelist from '@/views/partsign/home/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle } from './data'
import {getAllTable} from "@/api/partsprocure/home";
export default {
  components: { iCard, tablelist, iPagination },
  mixins: [ pageMixins ],
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
	  purchaseProjectIds:[]
    }
  },
  created() {
  	this.purchaseProjectIds = this.$route.query.ids;
	this.getData()
  },
  methods: {
	  // 获取批量数据
	  getData() {
	  	getAllTable(this.getIds(this.purchaseProjectIds)).then((res) => {
	  			this.tableListData = res.data.partOutPutPlanBatchs;
	  		})
	  },
	  // 组装请求ids\
	  getIds(arr){
	  	let url = ''
	  	for (let i = 0; i < arr.length; i++) {
	  		url += 'partOutputPlanByBatchFacadeDTO.purchaseProjectIds='+arr[i]+(i == arr.length-1?'':"&")
	  	}
	  	return url
	  }
  }
}
</script>

<style lang="scss" scoped>
.outputPlan {}
</style>