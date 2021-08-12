<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-08-10 15:30:14
 * @LastEditors: 舒杰
 * @Description: 按供应商查看
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\historyPoint\supplierTable.vue
-->
<template>
	<div class="margin-top30">
		<tableList 
			:tableData="tableListData"
			:tableTitle="tableTitle"
			:tableLoading="tableLoading"
			@handleSelectionChange="handleSelectionChange">
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
	import {iPagination,iMessage,iMessageBox} from 'rise';
	import tableList from './tableList';
	import {tableTitle} from './data';
	import {pageMixins} from '@/utils/pageMixins';
	import {technologyFile,technologyAdd,technologyDelete} from "@/api/categoryManagementAssistant/internalDemandAnalysis/technology";
	import {downloadFile} from '@/api/file';
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
		computed:{
		},
		data() {
			return {
				tableListData:[],
				tableTitle,
				tableLoading:false,
				selectData:[],
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
					categoryCode:"",
					pageNo:this.page.currPage,
					pageSize:this.page.pageSize
				}
				technologyFile(data).then(res=>{
					if (res.data) {
						this.page.currPage = res.pageNum;
						this.page.totalCount = res.total;
						this.tableLoading=false
						this.tableListData=res.data
					}
				})
			},
			//删除
			deleted(){
				if(this.selectData.length>0){
					iMessageBox(this.language('QRSCXZWJ','确认删除选中文件'),this.language('TISHI','提示')).then(()=>{
						let idList=this.selectData.map(res=>{
							return res.id
						})
						technologyDelete({idList:idList}).then(res=>{
							this.resultMessage(res,()=>{
								this.getTableList()
							})
						})
					}).catch(()=>{

					})
				}
			},
			openPdf(url){
				window.open(url)
			},
			// 文件下载
			down(){
				if (this.selectData.length==0) {
					iMessage.error(this.$t('TPZS.CANNOTSELECT'))
					return
				}
				let fileName=[]
				this.selectData.map(item=>{
					fileName.push(item.downloadName)
				})
				const req = {
					applicationName: 'rise',
					fileList: [fileName],
				}
				downloadFile(req)
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
