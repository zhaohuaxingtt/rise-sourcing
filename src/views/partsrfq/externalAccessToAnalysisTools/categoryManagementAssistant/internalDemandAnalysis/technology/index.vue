<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-08-03 16:02:53
 * @LastEditors: 舒杰
 * @Description: 技术路线
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\technology\index.vue
-->
<template>
	<iCard :title='language("JISHULUXIAN","技术路线")' class="margin-top20">
		<template slot="header-control">
			<iButton>{{ language("XIAZAI", "下载") }}</iButton>
			<iButton>{{ language("SHUANGCHUAN", "上传") }}</iButton>
			<iButton @click="deleted">{{ language("SHANCHU", "删除") }}</iButton>
			<iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
		</template>
		<tableList 
			:tableData="tableListData"
			:tableTitle="tableTitle"
			:tableLoading="tableLoading"
			index
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
	</iCard>
</template>

<script>
	import {iCard,iPagination,iButton,iMessage,iMessageBox} from 'rise';
	import tableList from '@/views/partsrfq/externalAccessToAnalysisTools/components/tableList.vue';
	import {specialToolsTitle} from './data';
	import {pageMixins} from '@/utils/pageMixins';
	import {reportList} from "@/api/partsrfq/reportList";
	import {downloadFile} from '@/api/file';
	export default{
		mixins: [pageMixins],
		components:{
			iCard,tableList,iPagination,iButton,
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
			//删除
			deleted(){
				iMessageBox(this.language('QRSCXZWJ','确认删除选中文件'),this.language('TISHI','提示')).then(()=>{
					
				}).catch(()=>{

				})
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
