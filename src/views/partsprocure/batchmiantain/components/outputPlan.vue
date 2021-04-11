<template>
	<iCard class="outputPlan" :title="$t('LK_LINGJIANCHANLIANGJIHUA')" tabCard>
		<div class="body">
			<tablelist class="table" index :tableData="tableListData" :tableTitle="tableTitle"
				:tableLoading="loading" @handleSelectionChange="handleSelectionChange" activeItems="partNum" @openPage="openPage"/>
	<!-- 		<iPagination class="pagination margin-top30" @size-change="handleSizeChange($event, getUsage)"
				@current-change="handleCurrentChange($event, getUsage)" background :current-page="page.currPage"
				:page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout"
				:total="page.totalCount" v-update /> -->
		</div>
	</iCard>
</template>

<script>
	import {
		iCard,
		// iPagination
	} from '@/components'
	import tablelist from '@/views/partsign/home/components/tableList'
	import {
		pageMixins
	} from '@/utils/pageMixins'
	import {
		tableTitle
	} from './data'
	import {
		getAllTable
	} from "@/api/partsprocure/home";
	export default {
		components: {
			iCard,
			tablelist,
			// iPagination
		},
		mixins: [pageMixins],
		data() {
			return {
				loading: false,
				tableTitle,
				tableListData: [],
				purchaseProjectIds: []
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
					if (res.data.partOutPutPlanBatchs) {
						let  arr=res.data.partOutPutPlanBatchs
						arr.forEach(res => {
							res.outputPlanList.forEach((val, i) => {
								res['year' + i] = val.outPut
							})
							res.startYear = res.outputPlanList[0].year
						})
						this.tableListData = arr;
					}
				})
			},
			// 组装请求ids\
			getIds(arr) {
				let url = ''
				for (let i = 0; i < arr.length; i++) {
					url += 'partOutputPlanByBatchFacadeDTO.purchaseProjectIds=' + arr[i] + (i == arr.length - 1 ? '' : "&")
				}
				return url
			},
			handleSelectionChange(e){
				this.$emit('handleSelectionChange',e)
			},
			openPage(item){
				this.$router.push({
					path:"/partsprocure/outputplan",
					query:{
						purchaseProjectId:item.purchaseProjectId,
						purchasingRequirementId:item.purchasingRequirementId,
						partNum:item.partNum,
						purchasingRequirementObjectId:item.purchasingRequirementObjectId
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.outputPlan {}
</style>
