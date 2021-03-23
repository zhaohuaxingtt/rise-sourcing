<template>
	<iCard>
		<!-- 价格明细 -->
		<div class="header flex-between-center-center">
			<span class="title">价格明细</span>
			<div class="control">
				<iButton>保存</iButton>
			</div>
		</div>
		<iFormGroup row="3" icon inline>
			<iFormItem label="LC_B" name="test">
				<iText>
					{{targetprice.lcBPrice}}
				</iText>
			</iFormItem>
			<iFormItem label="SKD_B" name="test">
				<iText>
					{{targetprice.skdBPrice}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="3" icon inline>
			<iFormItem label="LC_A" name="test">
				<iText>
					{{targetprice.lcAPrice}}
				</iText>
			</iFormItem>
			<iFormItem label="SKD_A" name="test">
				<iText>
					{{targetprice.skdAPrice}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="3" icon inline>
			<iFormItem label="CKD Duty(%)" name="test">
				<iInput v-model="targetprice.ckdDuty"></iInput>
			</iFormItem>
			<iFormItem label="CKD EX_Work" name="test">
				<iInput v-model="targetprice.ckdExwork"></iInput>
			</iFormItem>
			<iFormItem label="CKDLANDEN" name="test">
				<iInput v-model="targetprice.ckdLanded"></iInput>
			</iFormItem>
		</iFormGroup>
		<div class="line"></div>
		<!-- 申请财务目标价 -->
		<div class="header flex-between-center-center">
			<span class="title">申请财务目标价</span>
			<div class="control">
				<iButton>申请</iButton>
			</div>
		</div>
		<iFormGroup row="2" icon inline>
			<iFormItem label="申请类型" name="test">
				<el-radio-group v-model="tableListData.applyType">
					<el-radio label="1">LC</el-radio>
					<el-radio label="2">SDK</el-radio>
					<el-radio label="3">CKD_LANDED</el-radio>
				</el-radio-group>
				<span class="start">*</span>
			</iFormItem>
			<iFormItem label="期望目标价" name="test">
				<iText>
					{{tableListData.lcPrice}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="2" icon inline>
			<iFormItem label="申请原因" name="test">
				<iInput type="textarea" rows="6" resize="none" v-model="tableListData.applyReason"></iInput>
			</iFormItem>
			<iFormItem label="申请备注" name="test">
				<iInput type="textarea" rows="6" resize="none" v-model="tableListData.applyMemo"></iInput>
			</iFormItem>
		</iFormGroup>
		<tablelist :tableData='tableListData' :tableTitle='targeTitle' :loading='tableLoading' @handleSelectionChange='handleSelectionChange'></tablelist>
		<div class="line"></div>
		<!-- 申请RW价 -->
		<div class="header flex-between-center-center">
			<span class="title">申请RW价</span>
			<div class="control">
				<iButton>申请</iButton>
			</div>
		</div>
		<iFormGroup row="2" icon inline>
			<iFormItem label="最新RW价" name="test">
				<iText>
				</iText>
			</iFormItem>
			<iFormItem label="最新返回日期" name="test">
				<iText>
				</iText>
			</iFormItem>
			<iFormItem label="最新申请状态" name="test">
				<iText>
				</iText>
			</iFormItem>
			<iFormItem label="最新申请日期" name="test">
				<iText>
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="1" icon inline>
			<iFormItem label="申请备注" name="test">
				<iInput type="textarea" rows="6" resize="none" v-model="reasons"></iInput>
			</iFormItem>
		</iFormGroup>
		<tablelist :tableData='tableListData' :tableTitle='rwTitle' :loading='tableLoading' @handleSelectionChange='handleSelectionChange'></tablelist>
	</iCard>
</template>

<script>
	import {
		iCard,
		iFormGroup,
		iFormItem,
		iText,
		iButton,
		iInput,
	} from "@/components";
	import tablelist from "./components/tablelist";
	import targetprice from '../data'
	import {
		rwTitle,
		targeTitle
	} from './components/data';
	import {
		getTabelData
	} from '@/api/partsprocure/home'
	export default {
		components: {
			iCard,
			iFormGroup,
			iFormItem,
			iText,
			iButton,
			iInput,
			tablelist
		},
		props:{
			targetprice:{
				type:Object,
				default:()=>{
					return targetprice
				}
			}
		},
		data() {
			return {
				// radio: 1,
				// reasons: "", //申请原因
				// remarks: "", //申请备注
				tableLoading: false,
				selectTableData: [],
				tableListData: [],
				rwTitle: rwTitle,
				targeTitle:targeTitle
			}
		},
		created() {
			this.getTableListFn();
		},
		methods: {
			getTableListFn() {
				this.tableLoading = true
				getTabelData().then(res => {
					this.tableListData = res.data;
					this.tableLoading = false
				}).catch(() => this.tableLoading = false)
			},
			//表格选中值集
			handleSelectionChange(val) {
				this.selectTableData = val
			},
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.header {
		margin-bottom: 20px;

		.title {
			font-size: 18px;
			font-weight: bold;
			color: #001847;
		}

	}

	.line {
		height: 1px;
		background-color: #CDDAF0;
		margin-top: 30px;
		margin-bottom: 36px;
	}
	.start{
		font-size: 30px;
		position: absolute;
		left: -90px;
		top: 4px;
		color: red;
	}
</style>
