<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-08-12 10:53:10
 * @LastEditors: 舒杰
 * @Description: 定点历史记录
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\historyPoint\index.vue
-->
<template>
	<iCard :title='language("DINGDIANLISHIJILV","定点历史记录")' class="margin-top20">
		<template slot="header-control">
			<iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
		</template>
		<div class="flex-between-center">
			<iNavMvp lev="3" :list="tabList" @change="change" lang></iNavMvp>
			<div class="flex-align-center">
				<iSelect class="margin-right10" :placeholder='language("QXZGYSMC", "请选择供应商名称")' v-if="value==2" v-model="searchCriteria.supplierId"></iSelect>
				<iSelect class="margin-right10" :placeholder='language("QXZDDSJ", "请选择定点时间")' v-model="searchCriteria.latestYear">
					<option value="" label="" v-for="(item,index) in dictData" :key="index"></option>
				</iSelect>
				<iButton @click="back">{{ language("QUEREN", "确认") }}</iButton>
				<iButton @click="back">{{ language("CHONGZHI", "重置") }}</iButton>
				<iButton @click="back">{{ language("BAOCUN", "保存") }}</iButton>
				<iButton @click="exportTemplate">{{ language("DAOCHU", "导出") }}</iButton>
			</div>
		</div>
		<pointTable v-if="value==1" ref="pointTable" :searchCriteria="searchCriteria"></pointTable>
		<supplierTable v-else ref="supplierTable" :searchCriteria="searchCriteria"></supplierTable>
	</iCard>
</template>

<script>
	import {iCard,iButton,iNavMvp,iSelect,iMessage,iMessageBox} from 'rise';
	import {tabList} from "./data";
	import pointTable from './pointTable';
	import supplierTable from './supplierTable';
	import resultMessageMixin from '@/utils/resultMessageMixin';
	import { excelExport } from '@/utils/filedowLoad';
	import { selectDictByKeys } from "@/api/dictionary";
	import {nomiSupplier,nomiSave,page} from "@/api/categoryManagementAssistant/internalDemandAnalysis/historyPoint.js"
	export default{
		mixins: [resultMessageMixin],
		components:{
			iCard,iButton,iNavMvp,iSelect,pointTable,supplierTable
		},
		data() {
			return {
				tabList,
				value:1,
				dictDate:{},//字典數據
				searchCriteria:{
					categoryCode:"",
					latestYear:"",
					supplierId:"",
				}
			}
		},
		created() {
			this.searchCriteria.categoryCode=this.$store.state.rfq.categoryCode
			this.getDict()
		},
		mounted () {
			this.$refs.pointTable.getTableList()
		},
		methods:{
			// 返回
			back(){
				this.$router.go(-1)
			},
			change(item){
				this.value=item.value
			},
			//导出
			exportTemplate() {
				let tableData=this.value==1?this.$refs.pointTable.tableListData:this.$refs.supplierTable.tableListData
				excelExport(tableData, this.$refs.pointTable.tableTitle)
			},
			getDict() {
				selectDictByKeys([{ keys: "NOMI_TIME" }]).then(res=>{
					this.dictDate=res.data
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
