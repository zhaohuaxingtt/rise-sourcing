<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 14:15:26
 * @LastEditTime: 2021-08-03 14:23:25
 * @LastEditors: 舒杰
 * @Description: SOURCING TABLE 封装
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\components\tableList.vue
-->
<template>
	<el-table class="table" :height="height" :data="tableData" :cell-class-name="cellClassName" v-loading="tableLoading"
		@selection-change="handleSelectionChange" :empty-text="$t('LK_ZANWUSHUJU')">
		<el-table-column v-if="selection" type="selection" align="center" width="56"></el-table-column>
		<el-table-column v-if="index" type="index" align="center" :label="indexLabel"></el-table-column>
		<template v-for="(item, $index) in tableTitle">
			<el-table-column :key="$index" align="center" :label="language(item.key,item.name)" :prop="item.props"
				:show-overflow-tooltip="item.tooltip" :width="item.width">
				<template v-if="$scopedSlots[item.props] || $slots[item.props]" v-slot="scope">
					<slot :name="item.props" :row="scope.row"></slot>
				</template>
			</el-table-column>
		</template>
	</el-table>
</template>

<script>
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
			selection: {
				type: Boolean,
				default: true
			},
			index: {
				type: Boolean,
				default: false
			},
			indexLabel: {
				type: String,
				default: '#'
			},
			height: {
				type: String
			},
			cellClassName: {
				type: Function
			}
		},
		methods: {
			handleSelectionChange(list) {
				this.$emit('handleSelectionChange', list)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
