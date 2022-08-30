<template>
	<iDialog
		:title="$t('LK_ZHUANPAI')"
		:visible.sync="value"
		width="25%"
		@close="clearDiolog"
		class="point-dialog"
	>
		<el-form>
			<el-form-item :label="$t('LK_KESHI')">
				<iSelect
					:placeholder="$t('LK_QINGXUANZE')"
					v-model="department"
					@change="selDeptOnChange"
					value-key="deptId"
				>
					<!-- <el-option :value="{}" :label="$t('all')"/> -->
					<el-option
						:value="item"
						:label="item.commodity"
						v-for="(item, index) in deptList"
						:key="index"
					/>
				</iSelect>
			</el-form-item>
			<el-form-item :label="$t('LK_ZHUANYECAIGOUYUAN')">
				<iSelect
					:placeholder="$t('LK_QINGXUANZE')"
					v-model="buyer"
					value-key="linieID"
				>
					<el-option
						v-for="(items, index) in userList"
						:key="index"
						:value="items"
						:label="items.linieName"
					/>
				</iSelect>
			</el-form-item>
			<div class="comfirm-button">
				<div class="switch">
					<span>全部项次</span>
					<el-switch
						disabled
						class="margin-left10 zoom075"
						v-model="isAllItem"
						active-color="#1660F1"
						inactive-color="#cccccc"
					></el-switch>
				</div>
				<iButton @click="handleConfirm" :loading="transferLoading">{{
					$t('LK_QUEREN')
				}}</iButton>
			</div>
		</el-form>
	</iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iMessage } from 'rise'
import {
	getDepartmentsCombo,
	liniePullDownByDept,
} from '@/api/ws2/purchase/investmentList'
export default {
	components: {
		iDialog,
		iSelect,
		iButton,
	},
	props: {
		value: { type: Boolean, default: false },
		transferLoading: { type: Boolean, default: false },
	},
	// created() {
	//     this.getDeptList();
	//     this.selDeptOnChange();
	// },
	methods: {
		// 关闭弹窗
		clearDiolog() {
			this.department = {}
			this.buyer = {}
			this.$emit('input', false)
		},
		handleConfirm() {
			if (!this.buyer.linieID) {
				return iMessage.warn(
					this.$t('LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN')
				)
			}
			// this.$tools.sleepLoop(100);
			let data = {
				deptName: this.department.commodity,
				deptNum: this.department.commodity,
				ownerId: this.buyer.linieID,
				isAllItem: this.isAllItem
			}
			this.$emit('handleTransfer', data)
		},
		getDeptList() {
			getDepartmentsCombo()
				.then((res) => {
					if (+res.code === 0) {
						this.deptList = res.data
					}
				})
				.catch((err) => {})
		},
		//选中部分发生变化//获取部门用户
		selDeptOnChange() {
			this.buyer = {}
			let parmars = { deptId: this.department.deptId }
			liniePullDownByDept(parmars)
				.then((res) => {
					if (+res.code === 0) {
						this.userList = res.data
					}
				})
				.catch((err) => {})
		},
	},
	data() {
		return {
			department: {}, //科室
			buyer: {}, //前期采购员
			deptList: [],
			userList: [],
			isAllItem: true
		}
	},
	watch: {
		value: function (val) {
			if (val) {
				this.department = {}
				this.buyer = {}
				this.getDeptList()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.point-dialog {
	::v-deep .el-dialog__body {
		padding-bottom: 20px !important;
	}
}

.comfirm-button {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.switch{
		display: inline-flex;
		align-items: center;
		.zoom075{
			zoom:0.75
		}
	}
}
</style>
