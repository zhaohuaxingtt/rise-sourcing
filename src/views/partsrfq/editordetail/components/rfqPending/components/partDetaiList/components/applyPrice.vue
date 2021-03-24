<template>
	<iDialog class="dialog" title="申请财务目标价" :visible.sync="applyPriceShow">
		<iFormGroup row="2" icon inline>
			<iFormItem label="申请类型" name="test">
				<el-radio-group v-model="radio">
					<el-radio label="1">radio</el-radio>
					<el-radio label="2">radiother</el-radio>
					<el-radio label="3">radiother</el-radio>
				</el-radio-group>
			</iFormItem>
			<iFormItem label="期望目标价" name="test">
				<iText>
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="2" icon inline>
			<iFormItem label="申请原因" name="test">
				<iInput type="textarea" rows="6" resize="none" v-model="reasons"></iInput>
			</iFormItem>
			<iFormItem label="申请备注" name="test">
				<iInput type="textarea" rows="6" resize="none" v-model="remarks"></iInput>
			</iFormItem>
		</iFormGroup>
		<tablelist v-if="againApply" :tableData='targeTableListData' :tableTitle='targeTitle' :loading='targeTableLoading'
			@handleSelectionChange='targetHandleSelectionChange'></tablelist>
	</iDialog>
</template>

<script>
	import {
		iFormGroup,
		iFormItem,
		iInput,
		iText,
		iDialog
	} from "@/components";
	import tablelist from '@/views/partsprocure/editordetail/components/targetPrice/components/tablelist'
	import {
		rwTitle,
		targeTitle
	} from '@/views/partsprocure/editordetail/components/targetPrice/components/data';
	export default {
		components: {
			iFormGroup,
			iFormItem,
			iInput,
			iText,
			tablelist,
			iDialog
		},
		data() {
			return {
				applyPriceShow: false,
				againApply:false,//是否重新申请目标价
				reasons: "", //申请原因
				remarks: "", //申请备注
				targeTableListData: [],
				rwTitle: rwTitle,
				targeTitle: targeTitle,
				targeTableLoading: false,
				radio: 1,
			}
		},
		methods: {
			show() {
				this.againApply=false
				this.applyPriceShow = true
			},
			againShow(){
				this.againApply=true
				this.applyPriceShow = true
			},
			targetHandleSelectionChange(e) {
				console.log(e)
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
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
</style>
