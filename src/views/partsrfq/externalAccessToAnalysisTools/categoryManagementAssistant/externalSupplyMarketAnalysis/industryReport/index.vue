<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-08-02 11:08:23
 * @LastEditors: 舒杰
 * @Description: 行业报告
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\externalSupplyMarketAnalysis\industryReport\index.vue
-->
<template>
	<iCard :title='language("hangyebaogao","行业报告")' class="margin-top20">
		<template slot="header-control">
        <iButton>{{ language("bianji", "编辑") }}</iButton>
        <iButton>{{ language("shangchuan", "上传") }}</iButton>
        <iButton>{{ language("XIAZAI", "下载") }}</iButton>
        <iButton>{{ language("fanhui", "返回") }}</iButton>
      </template>
		<tableList 
			:tableData="tableListData"
			:tableTitle="tableTitle"
			:tableLoading="tableLoading"
			index
			@handleSelectionChange="handleSelectionChange">
			<template #toolType="scope">
				<span class="openPage" @click="openPdf(scope.row.downloadUrl)">{{scope.row.name}}</span>
			</template>
			<template #openFile="scope">
				<span class="openPage" @click="openPdf(scope.row.downloadUrl)">预览</span>
			</template>
			
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
	</iCard>
</template>

<script>
	import {iCard,iPagination,iButton} from 'rise';
	import tableList from '@/views/partsrfq/reportList/components/tableList.vue';
	import {specialToolsTitle} from './data';
	import {pageMixins} from '@/utils/pageMixins';
	import {reportList} from "@/api/partsrfq/reportList"
	export default{
		mixins: [pageMixins],
		components:{
			iCard,tableList,iPagination,iButton
		},
		props:{
			searchCriteria:{
				type:Object,
				default:()=>{}
			}
		},
		computed:{
		},
		data() {
			return {
				tableListData:[],
				tableTitle:specialToolsTitle,
				tableLoading:false,
				selectData:[]
			}
		},
		created() {
			this.getTableList()
		},
		methods:{
			handleSelectionChange(list){
				this.selectData=list
			},
			getTableList(){
				this.tableLoading=true
				let data={
					...this.searchCriteria,
					pageNo:this.page.currPage,
					pageSize:this.page.pageSize,
				}
				reportList(data).then(res=>{
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
			}
		}
	}
</script>

<style lang="scss">
	.openPage{
		color: $color-blue;
		font-size: 14px;
		text-decoration: underline;
		cursor: pointer;
		width: 100px;
		@include text_;
	}
</style>
