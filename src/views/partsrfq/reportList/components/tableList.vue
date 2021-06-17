<!--
 * @Author: your name
 * @Date: 2021-02-24 16:57:16
 * @LastEditTime: 2021-05-27 19:50:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\enquiry\components\tablelist.vue
-->
<template>
	<el-table class="table" :height="height" :data="tableData" :cell-class-name="cellClassName" v-loading="tableLoading"
		@selection-change="handleSelectionChange" :empty-text="$t('LK_ZANWUSHUJU')">
		<el-table-column v-if="selection" type="selection" align="center"></el-table-column>
		<el-table-column v-if="index" type="index" align="center" :label="indexLabel"></el-table-column>
		<template v-for="(item, $index) in tableTitle">
			<el-table-column :key="$index" align="center" :label="item.key?$t(item.key):item.name" :prop="item.props"
				:show-overflow-tooltip="item.tooltip" :width="item.width">
				<template v-if="$scopedSlots[item.props] || $slots[item.props]" v-slot="scope">
					<slot :name="item.props" :row="scope.row"></slot>
				</template>
			</el-table-column>
		</template>
	</el-table>
</template>

<script>
	import tablelist from '@/views/partsign/home/components/tableList'

	export default {
		props: {
			...tablelist.props,
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
