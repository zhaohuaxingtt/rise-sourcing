<!--
 * @Author: your name
 * @Date: 2021-04-12 23:48:38
 * @LastEditTime: 2021-10-27 15:40:37
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\batchmiantain\components\outputPlan.vue
-->
<template>
	<iCard class="outputPlan" :title="language('LK_LINGJIANCHANLIANGJIHUA','零件产量计划')" tabCard>
		<!-- 手工采购项目创建 -->
		<div class="btn-right">
			<batch-miantain-output-plan :planItems="selectTions"></batch-miantain-output-plan>
		</div>
		<div class="body">
			<tablelist ref='tabel' class="table" index :tableData="tableListData" :tableTitle="tableTitle"
				:tableLoading="loading" @handleSelectionChange="handleSelectionChange" activeItems="partNum" @openPage="openPage"/>
		</div>
	</iCard>
</template>

<script>
	import {iCard} from 'rise'
	import tablelist from '@/views/partsign/home/components/tableList'
	import {pageMixins} from '@/utils/pageMixins'
	import {tableTitle} from './data'
	import {getPartslistButch} from "@/api/partsprocure/home";
	import BatchMiantainOutputPlan from '../../home/components/batchMiantainOutputPlan.vue'
	export default {
		components: {iCard,tablelist,BatchMiantainOutputPlan},
		mixins: [pageMixins],
		data() {
			return {
				loading: false,
				tableTitle,
				tableListData: [],
				purchaseProjectIds: [],
				selectTions:[]
			}
		},
		created() {
			this.purchaseProjectIds = Array.isArray(this.$route.query.ids)?this.$route.query.ids:[this.$route.query.ids];
		},
		mounted(){
			this.getData()
		},
		methods: {
			// 获取批量数据
			getData() {
				getPartslistButch({purchaseProjectIds:this.purchaseProjectIds}).then((res) => {
					if (res.data) {
						let arr=res.data
						const categoryMap = {}
						arr.forEach(res => {
							res.outputPlanList.forEach((val, i) => {
								res['year' + i] = val.outPut
							})
							res.startYear = res.outputPlanList[0].year
							if (res.categoryId) {
								categoryMap[res.categoryId] = { categoryName: res.categoryName, categoryCode: res.categoryCode }
							}
						})
						this.tableListData = arr;
						this.$nextTick(()=>{
							this.$refs.tabel.defaultSelectAll()
						})
						this.$emit('updateCategoryGroup', Object.keys(categoryMap).map(key => ({ categoryId: key, categoryCode: categoryMap[key].categoryCode, categoryName: categoryMap[key].categoryName })))
					}
				})
			},
			handleSelectionChange(e){
				this.selectTions = e
				this.$emit('handleSelectionChange',e)
			},
			openPage(item){
				const openParts = this.$router.resolve({
					path:"/sourceinquirypoint/sourcing/partsprocure/outputplan",
					query:{
						id:item.purchaseProjectId,
						purchasingRequirementId:item.purchasingRequirementId,
						partNum:item.partNum,
						purchasingRequirementObjectId:item.purchasingRequirementObjectId
					}
				})
				window.open(openParts.href,'_blank')
			}
		}
	}
</script>
<style lang="scss" scoped>
.btn-right{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
 }
</style>
