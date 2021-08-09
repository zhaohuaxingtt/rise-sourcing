<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-08-09 10:27:58
 * @LastEditors: 舒杰
 * @Description: 行业报告
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\externalSupplyMarketAnalysis\industryReport\index.vue
-->
<template>
	<iCard :title='language("HANGYEBAOGAO","行业报告")' class="margin-top20">
		<template slot="header-control">
			<div v-if="isEdit"> 
				<iButton @click="unEdit">{{ language("QUXIAO", "取消") }}</iButton>
				<iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
			</div>
			<div v-else>
				<iButton @click="edit">{{ language("BIANJI", "编辑") }}</iButton>
				<el-upload
				class="upload"
				:show-file-list="false"
				name="multipartFile"
				with-credentials
				:on-success="handleAvatarSuccess"
				:http-request="myUpload"
				accept=".pdf">	
				<iButton :loading="uploadButtonLoading">{{ language("SHUANGCHUAN", "上传") }}</iButton>
			</el-upload>
				<iButton>{{ language("XIAZAI", "下载") }}</iButton>
				<iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
			</div>
      </template>
		<tableList 
			:tableData="tableListData"
			:tableTitle="tableTitle"
			:tableLoading="tableLoading"
			index
			@handleSelectionChange="handleSelectionChange">
			<template #onlineWeb="scope">
				<iInput v-model="scope.row.onlineWeb" v-if="isEdit"></iInput>	
				<span class="openPage" @click="openPdf(scope.row.downloadUrl)" v-else>{{scope.row.onlineWeb}}</span>
			</template>
			<template #openFile="scope">
				<span class="openPage" @click="openPdf(scope.row.downloadUrl)">{{ language("YULAN","预览") }}</span>
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
	import {iCard,iPagination,iButton,iMessage,iInput} from 'rise';
	import tableList from '@/views/partsrfq/externalAccessToAnalysisTools/components/tableList.vue';
	import {tableTitle} from './data';
	import {pageMixins} from '@/utils/pageMixins';
	import {getReport,saveReport,uploadReport} from "@/api/categoryManagementAssistant/externalSupplyMarketAnalysis/industryReport";
	import {downloadFile} from '@/api/file';
	import {uploadFile} from '@/api/file/upload';
	import resultMessageMixin from '@/utils/resultMessageMixin';
	export default{
		mixins: [pageMixins,resultMessageMixin],
		components:{
			iCard,tableList,iPagination,iButton,iInput
		},
		computed:{
		},
		data() {
			return {
				tableListData:[],
				tableTitle,
				tableLoading:false,
				selectData:[],
				isEdit:false,// 是否编辑
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
					categoryCodeList:["1"],
					pageNo:this.page.currPage,
					pageSize:this.page.pageSize,
				}
				getReport(data).then(res=>{
					if (res.data) {
						this.page.currPage = res.pageNum;
						this.page.totalCount = res.total;
						this.tableLoading=false
						this.tableListData=res.data
					}
				})
			},
			// 编辑
			edit(){
				this.isEdit=true
			},
			// 取消编辑
			unEdit(){
				this.isEdit=false
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
			//上传
			async myUpload(content) {
				const loading = this.$loading({
					lock: true,
				});
				const formData = new FormData();
				formData.append('file', content.file);
				formData.append('categoryCode', '');
				const res = await uploadReport(formData);
				// const result=await saveReport({
				// 	fileName:res.data[0].fileName,
				// 	fileUrl:res.data[0].filePath,
				// 	categoryCode:""
				// })
				loading.close()
				this.resultMessage(res,()=>{
					this.getTableList()
				})
			},
			// 保存
			save(){
				let data={
					reportList:this.tableListData
				}
				saveReport(data).then(res=>{
					this.resultMessage(res,()=>{
						this.isEdit=false
						this.getTableList()
				})
				})
			},
			// 返回
			back(){
				this.$router.go(-1)
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
	.upload{
		display: inline-block;
		margin:0 15px;
	}
</style>
