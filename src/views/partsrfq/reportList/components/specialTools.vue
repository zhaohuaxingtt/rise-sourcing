<!--
 * @Author: 舒杰
 * @Date: 2021-07-06 13:40:04
 * @LastEditTime: 2021-07-28 15:17:48
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\reportList\components\specialTools.vue
-->
<!--
 * @author: shujie
 * @createTime: 2021-6-16 4:08:35 
 * @Description:谈判助手-报告清单首页-专项分析工具
 -->
<template>
	<iCard :title="$t('TPZS.ZXFXGJ')" collapse class="margin-top20">
		<tableList 
			:tableData="tableListData"
			:tableTitle="tableTitle"
			:tableLoading="tableLoading"
			index
			@handleSelectionChange="handleSelectionChange">
			<template #name="scope">
				<span class="openPage" @click="openPdf(scope.row.downloadUrl)">{{scope.row.name}}</span>
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
	import {iCard,iPagination} from 'rise';
	import tableList from './tableList';
	import {specialToolsTitle} from './data';
	import {pageMixins} from '@/utils/pageMixins';
	import {reportList} from "@/api/partsrfq/reportList"
	export default{
		mixins: [pageMixins],
		components:{
			iCard,tableList,iPagination
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
			// 搜索
			search(){
				this.page.currPage=1
				this.getTableList()
			},
			openPdf(url){
				window.open(url)
			}
		}
	}
</script>

<style lang="scss">
</style>
