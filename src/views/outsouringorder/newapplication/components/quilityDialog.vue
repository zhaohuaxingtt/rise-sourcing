<template>
	<iDialog
		:visible.sync="value"
		width="40%"
		@close="clearDiolog"
		append-to-body
	>
		<div class="titlebar" slot="title">
			<span>{{ `数量-项次${detailInfo.sapItem}` }}</span>
			<iButton class="save" @click="saveSapItem">保存</iButton>
		</div>
		<div class="item-dialog clearFloat">
			<div v-if="canEdit" class="floatright margin-bottom20">
				<iButton @click="increatment">新增</iButton>
				<iButton @click="deleteItem">删除</iButton>
			</div>
			<tablePart
				ref="multipleTable"
				:lang="true"
				@handleSelectionChange="(row) => (selectRow = row)"
				:tableData="initData"
				:tableTitle="tbledColumns"
				:tableLoading="tableLoading"
				:selection="canEdit"
				class="aotoTableHeight margin-bottom20"
			>
				<template #year="scope">
					<el-date-picker
						v-if="canEdit"
						v-model="scope.row.year"
						type="year"
						placeholder="选择年"
					>
					</el-date-picker>
					<span v-else>{{ scope.row.year }}</span>
				</template>
				<template #quantity="scope">
					<iInput
						v-if="canEdit"
						v-model="scope.row.quantity"
						placeholder="请输入数量"
					/>
					<span v-else>{{ scope.row.quantity }}</span>
				</template>
			</tablePart>
		</div>
	</iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iMessage } from 'rise'
import tablePart from '@/components/iTableSort'

export default {
	components: {
		iDialog,
		iButton,
		iInput,
		tablePart,
	},
	props: {
		value: { type: Boolean, default: false },
		detailInfo: { type: Object, default: () => {} },
		canEdit: { type: Boolean, default: true, require: true },
		isItem: { type: Boolean, default: false },
	},
	data() {
		return {
			dialogVisible: false,
			tableLoading: false,
			tbledColumns: [
				{
					props: 'year',
					name: '年份',
					key: 'LK_NIANFEN',
					tooltip: true,
					align: 'center',
				},
				{
					props: 'quantity',
					name: '数量',
					key: 'LK_SHULIANG',
					tooltip: true,
					align: 'center',
				},
			],
			initData: [],
			selectRow: [],
		}
	},

	methods: {
		// 关闭弹窗
		clearDiolog() {
			this.$emit('input', false)
		},
		saveSapItem() {
			this.$emit('handleSaveDetail', this.initData)
		},
		openOrderPage() {
			this.$emit('openOrderPage', this.detailInfo)
		},

		// 新增项次
		increatment() {
			this.initData.unshift({
				year: '',
				quantity: '',
			})
		},

		// 删除项次
		deleteItem() {
			if (this.selectRow.lengt < 0) return iMessage.warn('请选择删除的项次')
			this.initData = this.initData.filter((i) => !i.selectedBorder)
		},
	},
	watch: {
		value: function (val) {
			if (val) {
				if (
					this.detailInfo.normalPrQuantityYears == null ||
					this.detailInfo.normalPrQuantityYears.length <= 0 ||
					this.detailInfo.normalPrQuantityYears == undefined
				) {
					const startYear = new Date().getFullYear()
					this.initData = [
						{
							year: startYear,
							quantity: 0,
						},
						{
							year: startYear + 1,
							quantity: 0,
						},
						{
							year: startYear + 2,
							quantity: 0,
						},
						{
							year: startYear + 3,
							quantity: 0,
						},
						{
							year: startYear + 4,
							quantity: 0,
						},
					]
				} else {
					this.initData = this.detailInfo.normalPrQuantityYears
				}
				this.initData.map((i) => {
					i.year = i.year.toString()
					return i
				})
				this.$forceUpdate()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.titlebar {
	> span {
		font-size: 18px;
		font-weight: bold;
	}
	.save {
		position: relative;
		top: 0;
		margin-left: 450px;
	}
}
.item-dialog {
	position: relative;
	margin-bottom: 20px;
	overflow: hidden;
	::v-deep .el-form-item__label {
		width: 150px;
	}

	::v-deep .el-form--inline .el-form-item {
		display: flex;
	}

	.save-btn {
		position: absolute;
		right: 60px;
		top: -60px;
	}
}

.order-link {
	color: $color-blue;
	cursor: pointer;
}

.openLinkText {
	color: $color-blue;
	cursor: pointer;
}
</style>
