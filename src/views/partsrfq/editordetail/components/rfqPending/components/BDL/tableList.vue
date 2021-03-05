<!--
* @author:shujie
* @Date: 2021-3-5 10:56:32
* @LastEditors: shujie
* @Description: BDL表格
 -->
<template>
	<el-table class="table" :data="tableData" v-loading="tableLoading" @selection-change="handleSelectionChange">
		<el-table-column type="selection" align="center"></el-table-column>
		<el-table-column type="index" align="center" label="#"></el-table-column>
		<template v-for="(item,index) in tableTitle">
			<el-table-column :key="index" align='center' v-if='item.props == "b"' :prop="item.props" :label="item.name">
				<template slot-scope="row">
					<span class="openLinkText cursor" @click="openPage">{{row.row.b}}</span>
				</template>
			</el-table-column>

			<el-table-column :key="index" align='center' v-if='item.props == "c"' :prop="item.props" :label="item.name">
				<template>
					<iSelect></iSelect>
				</template>
			</el-table-column>


			<el-table-column :key="index" align='center' v-else-if='item.props == "i"' :prop="item.props" :label="item.name">
				<template>
					<span class="cursor look">
						<icon name="icondatabaseweixuanzhong"></icon>
					</span>
				</template>
			</el-table-column>

			<el-table-column v-else :key="index" align="center" :label="item.name" :prop="item.props">
			</el-table-column>
		</template>
	</el-table>
</template>

<script>
	import tablelist from '@/views/partsign/home/components/tableList'
	import {
		iSelect,
		icon
	} from "@/components"
	export default {
		components: {
			iSelect,
			icon
		},
		props: {
			...tablelist.props,
			tableData: {
				type: Array,
				default: () => ([])
			}
		},
		methods: {
			handleSelectionChange(val) {
				this.$emit('handleSelectionChange', val)
			},
			openPage() {
				this.$emit('openPage')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.openLinkText {
		color: $color-blue;
	}

	.operation {}

	.look {
		font-size: 28px;
	}

	.el-select {
		margin: 2px 0;
	}

	::v-deep .el-table__row .el-input {
		height: 35px !important;

		.el-input__inner {
			height: 35px !important;
		}
	}
</style>
