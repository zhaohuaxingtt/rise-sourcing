<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-08-13 10:40:47
 * @LastEditors: 舒杰
 * @Description: 定点历史记录
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\historyPoint\index.vue
-->
<template>
	<iCard :title='language("DINGDIANLISHIJILV","定点历史记录")' class="margin-top20" id="historyPoint">
		<template slot="header-control">
			<iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
		</template>
		<div class="flex-between-center">
			<iNavMvp lev="3" :list="tabList" @change="change" lang></iNavMvp>
			<div class="flex-align-center">
				<iSelect class="margin-right10" :placeholder='language("QXZGYSMC", "请选择供应商名称")' v-if="value==2" v-model="searchCriteria.supplierId">
					<el-option :value="item.supplierId" :label="item.shortNameZh" v-for="(item,index) in supplierData" :key="index"></el-option>
				</iSelect>
				<iSelect class="margin-right10" :placeholder='language("QXZDDSJ", "请选择定点时间")' v-model="searchCriteria.latestYear">
					<el-option :value="item.code" :label="item.name" v-for="(item,index) in dictData.NOMI_TIME" :key="index"></el-option>
				</iSelect>
				<iButton @click="search">{{ language("QUEREN", "确认") }}</iButton>
				<iButton @click="reset">{{ language("CHONGZHI", "重置") }}</iButton>
				<iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
				<iButton @click="exportTemplate">{{ language("DAOCHU", "导出") }}</iButton>
			</div>
		</div>
		<pointTable v-if="value==1" ref="pointTable" :searchCriteria="searchCriteria"></pointTable>
		<supplierTable v-else ref="supplierTable" :searchCriteria="searchCriteria"></supplierTable>
	</iCard>
</template>

<script>
	import {iCard,iButton,iNavMvp,iSelect,iMessage} from 'rise';
	import {tabList} from "./data";
	import pointTable from './pointTable';
	import supplierTable from './supplierTable';
	import resultMessageMixin from '@/utils/resultMessageMixin';
	import { excelExport } from '@/utils/filedowLoad';
	import { selectDictByKeys } from "@/api/dictionary";
	import {nomiSupplier,nomiSave,nomiHistoryParamInit} from "@/api/categoryManagementAssistant/internalDemandAnalysis/historyPoint.js"
	import {downloadPdfMixins} from '@/utils/pdf';
	export default{
		mixins: [resultMessageMixin,downloadPdfMixins],
		components:{
			iCard,iButton,iNavMvp,iSelect,pointTable,supplierTable
		},
		data() {
			return {
				tabList,
				value:1,
				dictData:{//字典數據
					NOMI_TIME:[]
				},
				supplierData:[],//供应商筛选数据
				searchCriteria:{
					categoryCode:"",
					latestYear:"",
					supplierId:"",
				},
			}
		},
		created() {
			this.searchCriteria.categoryCode=this.$store.state.rfq.categoryCode
			this.getDict()
			this.getNomiSupplier()
			this.getNomiHistoryParamInit()
		},
		methods:{
			// 返回
			back(){
				this.$router.go(-1)
			},
			// tab切换
			change(item){
				this.value=item.value
			},
			// 搜索
			search(){
				let ref=this.value==1?'pointTable':'supplierTable'
				this.$refs[ref].getTableList()
			},
			// 重置
			reset(){
				if(this.value==1){
					this.searchCriteria.latestYear=""
				}else{
					this.searchCriteria.latestYear=""
					this.searchCriteria.supplierId=""
				}
				this.search()
			},
			// 保存
			async save(){
				const resFile = await this.getDownloadFileAndExportPdf({
					domId: 'historyPoint',
					pdfName: 'historyPoint_PFD',
				});
				let params={
					categoryCode:this.searchCriteria.categoryCode,
					id:"",
					reportFileName: resFile.downloadName,
					reportName: resFile.downloadName,
					reportUrl: resFile.downloadUrl,
					// schemeName:"",
				}
				nomiSave(params).then(res=>{
					
				})
			},
			//导出
			exportTemplate() {
				let tableData=this.value==1?this.$refs.pointTable.tableListData:this.$refs.supplierTable.tableListData
				excelExport(tableData, this.$refs.pointTable.tableTitle)
			},
			// 查询字典
			getDict() {
				selectDictByKeys([{ keys: "NOMI_TIME" }]).then(res=>{
					this.dictData=res.data
				})
			},
			// 查询 供应商数据
			getNomiSupplier(){
				nomiSupplier(this.searchCriteria.categoryCode).then(res=>{
					if(res.data){
						this.supplierData=res.data
					}
				})
			},
			// 查询参数
			// getNomiHistoryParamInit(){
			// 	nomiHistoryParamInit({categoryCode:this.searchCriteria.categoryCode}).then(res=>{
			// 		if(res.data){
			// 			this.id=res.data.id
			// 			this.searchCriteria.categoryCode
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
</style>
