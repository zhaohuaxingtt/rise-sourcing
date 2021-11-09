<!--
 * @Author: your name
 * @Date: 2021-02-24 16:57:16
 * @LastEditTime: 2021-07-12 18:09:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\targetPrice\components\tablelist.vue
-->
<template>
	<el-table class="table" :data="tableData" :empty-text="language('LK_ZANWUSHUJU','暂无数据')" v-loading="tableLoading" @selection-change="handleSelectionChange">
		<el-table-column type="selection" align="center" width="55"></el-table-column>
		<el-table-column type="index" align="center" label="#"></el-table-column>
		<template v-for="(item, index) in tableTitle">
			<el-table-column :key="index" align='center' :label="item.key ? language(item.key,item.name) : item.name" :prop="item.props">
				<template slot-scope="scope">
					<span>{{scope.row[item.props] ? scope.row[item.props].desc || scope.row[item.props] : ''}}</span>
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
		},
		methods: {
			handleSelectionChange(val) {
				this.$emit('handleSelectionChange', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.table {
		.operation {
			.link+.link {
				margin-left: 44px;
			}
		}
	}
</style>
