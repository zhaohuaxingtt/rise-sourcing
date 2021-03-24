<template>
	<iDialog class="dialog" title="申请财务目标价" :visible.sync="applyPriceShow">
		<div class="btn">
			<iButton v-if="againApply" @click="save">重新申请</iButton>
			<iButton v-else @click="save">申请</iButton>
		</div>
		
		<iFormGroup row="2" icon inline>
			<iFormItem label="申请类型" name="test">
				<el-radio-group v-model="targetprice.cfTargetPriceDetail.applyType">
					<el-radio label="1">LC</el-radio>
					<el-radio label="2">SDK</el-radio>
					<el-radio label="3">CKD_LANDED</el-radio>
				</el-radio-group>
				<span class="start">*</span>
			</iFormItem>
			<iFormItem label="期望目标价" name="test">
				<iText>
					{{targetprice.cfTargetPriceDetail.lcPrice}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="2" icon inline>
			<iFormItem label="申请原因" name="test">
				<iInput type="textarea" rows="6" resize="none" v-model="targetprice.cfTargetPriceDetail.applyReason">
				</iInput>
			</iFormItem>
			<iFormItem label="申请备注" name="test">
				<iInput type="textarea" rows="6" resize="none" v-model="targetprice.cfTargetPriceDetail.applyMemo">
				</iInput>
			</iFormItem>
		</iFormGroup>
			<tablelist  v-if="againApply" :tableData='tableListData' :tableTitle='targeTitle' :loading='tableLoading'
				@handleSelectionChange='handleSelectionChange'></tablelist>
	</iDialog>
</template>

<script>
	import {
		iFormGroup,
		iFormItem,
		iInput,
		iText,
		iDialog,
		iButton
	} from "@/components";
	import tablelist from '@/views/partsprocure/editordetail/components/targetPrice/components/tablelist'
	import {
		targeTitle,
		targetPriceDetail
	} from '@/views/partsprocure/editordetail/components/targetPrice/components/data';
	import {
		changeProcure
	} from '@/api/partsprocure/home'
	export default {
		components: {
			iFormGroup,
			iFormItem,
			iInput,
			iText,
			tablelist,
			iDialog,
			iButton
		},
		props: {
			targetprice: {
				type: Object,
				default: () => {
					return targetPriceDetail
				}
			},
			handleSelectArr:{
				type:Object,
				default:()=>{
					return {}
				}
			}
		},
		data() {
			return {
				applyPriceShow: false,
				againApply:false,//是否重新申请目标价
				tableLoading: false,
				selectTableData: [],
				tableListData: [],
				targeTitle: targeTitle
			}
		},
		methods: {
			// 申请财务目标价
			save() {
				let targetprice = {
					// operator: this.handleSelectArr.operator,
					purchaseProjectIds: this.handleSelectArr.purchasePrjectId,
					cfTargetPriceDetail: this.targetprice.cfTargetPriceDetail,
				};
				changeProcure({
					targetprice,
				}).then((res) => {
					this.applyPriceShow = false
					this.$emit("refresh")
				});
			},
			show() {
				this.againApply=false
				this.applyPriceShow = true
			},
			againShow(){
				this.tableListData=[this.targetprice.cfTargetPriceDetail]
				this.againApply=true
				this.applyPriceShow = true
			},
			handleSelectionChange(e) {
				this.$emit('targetHand',e)
			}
		}
	}
</script>

<style scoped lang="scss">
	.dialog {
		@mixin pdtb($top: 0, $bottom: 0) {
			padding-top: $top;
			padding-bottom: $bottom;
		}

		::v-deep .el-dialog {
			width: 1745px !important;
			position: absolute;
			margin: 0 !important;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			overflow-x: hidden;

			.body {
				height: 580px;
			}

			.el-dialog__header {
				@include pdtb(30px, 30px);
			}

			.el-dialog__body {
				@include pdtb(6px, 0);
			}

			.pagination {
				margin-top: 0;
			}

			.el-dialog__footer {
				@include pdtb(28px, 28px);
			}
		}
	}
	.btn{
		position: absolute;
		right: 80px;
		top: 24px;
	}
</style>
