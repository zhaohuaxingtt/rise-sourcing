<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-08-26 17:00:31
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
				<iButton :loading="uploadButtonLoading">{{ language("SHANGCHUAN", "上传") }}</iButton>
			</el-upload>
				<iButton @click="down">{{ language("XIAZAI", "下载") }}</iButton>
				<iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
			</div>
      </template>
		<tableList 
			:tableData="tableListData"
			:tableTitle="tableTitle"
			:tableLoading="tableLoading"
			index
			@handleSelectionChange="handleSelectionChange">
			<template #reportName="scope">
				<iInput v-model="scope.row.reportName" v-if="isEdit"></iInput>	
				<span v-else>{{scope.row.reportName}}</span>
			</template>
			<template #onlineWeb="scope">
				<iInput v-model="scope.row.onlineWeb" v-if="isEdit"></iInput>	
				<span class="openPage" @click="openPdf(scope.row.onlineWeb)" v-else>{{scope.row.onlineWeb}}</span>
			</template>
			<template #openFile="scope">
				<span class="openPage" @click="openPdf(scope.row.fileUrl)">{{ language("YULAN","预览") }}</span>
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
				categoryCode:"",
				cloneTableListData:[]
			}
		},
		created() {
			this.categoryCode=this.$store.state.rfq.categoryCode
			this.getTableList()
		},
		watch: {
			'$store.state.rfq.categoryCode'(newVal){
				this.categoryCode=this.$store.state.rfq.categoryCode
				this.getTableList()
			}
		},
		methods:{
			handleSelectionChange(list){
				this.selectData=list
			},
			getTableList(){
				this.tableLoading=true
				let data={
					categoryCodeList:[this.categoryCode],
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
				this.cloneTableListData=window._.cloneDeep(this.tableListData)
				this.isEdit=true
			},
			// 取消编辑
			unEdit(){
				this.isEdit=false
				this.tableListData=this.cloneTableListData
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
					fileName.push(item.downName)
				})
				const req = {
					applicationName: 'rise',
					fileList: [fileName],
				}
				downloadFile(req)
			},
			//上传
			async myUpload(content) {
				const formData = new FormData();
				formData.append('file', content.file);
				formData.append('categoryCode', this.categoryCode);
				formData.append('userId ', this.$store.state.permission.userInfo.id);
				const res = await uploadReport(formData);
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
