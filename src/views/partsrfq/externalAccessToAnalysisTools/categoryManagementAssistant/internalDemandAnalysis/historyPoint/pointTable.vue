<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-08-12 17:44:31
 * @LastEditors: 舒杰
 * @Description: 按定点记录查看
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\historyPoint\pointTable.vue
-->
<template>
	<div class="margin-top30">
		<tableList 
			:tableData="tableListData"
			:tableTitle="tableTitle"
			:tableLoading="tableLoading">
		</tableList>
		<iPagination
			v-update
			@size-change="handleSizeChange($event, getTableList)"
			@current-change="handleCurrentChange($event, getTableList)"
			background
			:page-sizes="page.pageSizes"
			:page-size="page.pageSize"
			:layout="page.layout"
			:current-page='page.currPage'
			:total="page.totalCount"/>
	</div>
</template>

<script>
	import {iPagination} from 'rise';
	import tableList from './tableList';
	import {tableTitle} from './data';
	import {pageMixins} from '@/utils/pageMixins';
	import {page} from "@/api/categoryManagementAssistant/internalDemandAnalysis/historyPoint.js"
	import resultMessageMixin from '@/utils/resultMessageMixin';
	export default{
		mixins: [pageMixins,resultMessageMixin],
		components:{
			tableList,iPagination,
		},
		props:{
			searchCriteria:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				tableListData:[],
				tableTitle,
				tableLoading:false,
			}
		},
		mounted () {
			this.getTableList()
		},
		methods:{
			getTableList(){
				this.tableLoading=true
				let data={
					latestYear:this.searchCriteria.latestYear,
					categoryCode:this.searchCriteria.categoryCode,
					pageNo:this.page.currPage,
					pageSize:this.page.pageSize
				}
				page(data).then(res=>{
					if (res.data) {
						this.page.currPage = res.pageNum;
						this.page.totalCount = res.total;
						this.tableLoading=false
						this.tableListData=res.data
					}
				})
			},
			openPdf(url){
				window.open(url)
			},
			// 返回
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss">
</style>
