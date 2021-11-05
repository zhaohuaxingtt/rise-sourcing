<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 14:15:26
 * @LastEditTime: 2021-09-16 14:26:32
 * @LastEditors: 舒杰
 * @Description: SOURCING TABLE 封装
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\historyPoint\tableList.vue
-->
<template>
	<el-table class="table" :height="height" :data="tableData" :cell-class-name="cellClassName" v-loading="tableLoading"
		@selection-change="handleSelectionChange" :empty-text="$t('LK_ZANWUSHUJU')">
		<el-table-column type="index" align="center" :label="indexLabel"></el-table-column>
		<template v-for="(item, $index) in tableTitle">
			
			<el-table-column v-if="item.key=='LINGJIANHAO'" :key="$index" align="center" :label="language(item.key,item.name)" :prop="item.props"
				:show-overflow-tooltip="item.tooltip" :width="item.width">
				<template slot="header">
					<p class="tableTitleSolt">
						<span>{{language(item.key,item.name)}}</span>
						<span>{{language(item.key2,item.name2)}}</span>
					</p>
				</template>
				<template slot-scope="scope">
					<p class="tableTitleSolt">
						<span>{{scope.row.partsId}}</span>
						<span>{{scope.row.partsNameZh}}</span>
					</p>
				</template>
			</el-table-column>

			<!-- <el-table-column v-else-if="item.key=='FSCODE'" :key="$index" align="center" :label="language(item.key,item.name)" :prop="item.props"
				:show-overflow-tooltip="item.tooltip" :width="item.width">
				<template slot="header">
					<p class="tableTitleSolt">
						<span>{{language(item.key,item.name)}}</span>
						<span>{{language(item.key2,item.name2)}}</span>
					</p>
				</template>
				<template slot-scope="scope">
					<p class="tableTitleSolt">
						<span>{{scope.row.fsnrGsnrNum}}</span>
						<span>{{scope.row.partProjectType}}</span>
					</p>
				</template>
			</el-table-column> -->

			<el-table-column v-else-if="item.key=='CLZMC'" :key="$index" align="center" :label="language(item.key,item.name)" :prop="item.props"
				:show-overflow-tooltip="item.tooltip" :width="item.width">
				<template slot="header">
					<p class="tableTitleSolt">
						<span>{{language(item.key,item.name)}}</span>
						<span>{{language(item.key2,item.name2)}}</span>
					</p>
				</template>
				<template slot-scope="scope">
					<p class="tableTitleSolt">
						<span>{{scope.row.categoryName}}</span>
						<span>{{scope.row.stuffName}}</span>
					</p>
				</template>
			</el-table-column>

			<el-table-column v-else-if="item.key=='DDJE'" :key="$index" align="center" :label="language(item.key,item.name)" :prop="item.props"
				:show-overflow-tooltip="item.tooltip" :width="item.width">
				<template slot-scope="scope">
					<span>{{getMoney(scope.row.nominatePrice)}}</span>
				</template>
			</el-table-column>

			<el-table-column v-else :key="$index" align="center" :label="language(item.key,item.name)" :prop="item.props"
				:show-overflow-tooltip="item.tooltip" :width="item.width">
			</el-table-column>
		</template>
	</el-table>
</template>

<script>
	import {getMoneyInfo} from './moneyComputation'
	export default {
		props: {
			tableLoading: {
				type: Boolean,
				default: false
			},
			tableData: {
				type: Array,
				default: () => ([])
			},
			tableTitle: {
				type: Array,
				default: () => ([])
			},
			loading: {
				type: Boolean,
				default: false
			},
			indexLabel:{
				type:String,
				default:'#'
			}
		},
		methods: {
			handleSelectionChange(list) {
				this.$emit('handleSelectionChange', list)
			},
			getMoney(num){
				return getMoneyInfo(parseFloat(num))
			}
		}
	}
</script>

<style lang="scss" scoped>
.tableTitleSolt{
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
