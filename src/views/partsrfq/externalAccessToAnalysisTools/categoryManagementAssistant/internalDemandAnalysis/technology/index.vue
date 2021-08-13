<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-08-13 11:16:35
 * @LastEditors: 舒杰
 * @Description: 技术路线
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\technology\index.vue
-->
<template>
	<iCard :title='language("JISHULUXIAN","技术路线")' class="margin-top20">
		<template slot="header-control">
			<iButton @click="down">{{ language("XIAZAI", "下载") }}</iButton>
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
	import {technologyFile,technologyAdd,technologyDelete} from "@/api/categoryManagementAssistant/internalDemandAnalysis/technology";
	import {downloadFile} from '@/api/file';
	import {uploadFile} from '@/api/file/upload';
	import resultMessageMixin from '@/utils/resultMessageMixin';
	export default{
		mixins: [pageMixins,resultMessageMixin],
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
				uploadButtonLoading:false,
				categoryCode:""
			}
		},
		created() {
			this.categoryCode=this.$store.state.rfq.categoryCode
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
			//上传
			async myUpload(content) {
				const loading = this.$loading({
					lock: true,
				});
				const formData = new FormData();
				formData.append('multipartFile', content.file);
				formData.append('applicationName', 'rise');
				const res = await uploadFile(formData);
				const result=await technologyAdd({
					fileName:res.data[0].fileName,
					fileUrl:res.data[0].filePath,
					categoryCode:""
				})
				loading.close()
				this.resultMessage(result,()=>{
					this.getTableList()
				})
			},
			// 文件下载
			down(){
				if (this.selectData.length==0) {
					iMessage.error(this.$t('TPZS.CANNOTSELECT'))
					return
				}
				let fileName=[]
				this.selectData.map(item=>{
					fileName.push(item.fileName)
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
	.upload{
		display: inline-block;
		margin:0 15px;
	}
</style>
