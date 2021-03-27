<template>
	<iCard>
		<!-- 价格明细 -->
		<div class="header flex-between-center-center">
			<span class="title">价格明细</span>
			<div class="control">
				<iButton  @click="save">保存</iButton>
			</div>
		</div>
		<iFormGroup row="3" icon inline>
			<iFormItem label="LC_B" name="test">
				<iText>
					{{targetprice.cfTargetPriceDetail.lcBPrice}}
				</iText>
			</iFormItem>
			<iFormItem label="SKD_B" name="test">
				<iText>
					{{targetprice.cfTargetPriceDetail.skdBPrice}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="3" icon inline>
			<iFormItem label="LC_A" name="test">
				<iText>
					{{targetprice.cfTargetPriceDetail.lcAPrice}}
				</iText>
			</iFormItem>
			<iFormItem label="SKD_A" name="test">
				<iText>
					{{targetprice.cfTargetPriceDetail.skdAPrice}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="3" icon inline>
			<iFormItem label="CKD Duty(%)" name="test">
				<iInput v-model="targetprice.cfTargetPriceDetail.ckdDuty"></iInput>
			</iFormItem>
			<iFormItem label="CKD EX_Work" name="test">
				<iInput v-model="targetprice.cfTargetPriceDetail.ckdExwork"></iInput>
			</iFormItem>
			<iFormItem label="CKDLANDEN" name="test">
				<iInput v-model="targetprice.cfTargetPriceDetail.ckdLanded"></iInput>
			</iFormItem>
		</iFormGroup>
		<div class="line"></div>
		<!-- 申请财务目标价 -->
		<div class="header flex-between-center-center">
			<span class="title">申请财务目标价</span>
			<div class="control">
				<iButton @click="save">申请</iButton>
			</div>
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
		<tablelist :tableData='tableListData' :tableTitle='targeTitle' :loading='tableLoading'
			@handleSelectionChange='handleSelectionChange'></tablelist>
		<div class="line"></div>
		<!-- 申请RW价 -->
		<div class="header flex-between-center-center">
			<span class="title">申请RW价</span>
			<div class="control">
				<iButton @click="targeRw">申请</iButton>
			</div>
		</div>
		<iFormGroup row="2" icon inline>
			<iFormItem label="最新RW价" name="test">
				<iText>
					{{targetprice.rwApplication.price}}
				</iText>
			</iFormItem>
			<iFormItem label="最新返回日期" name="test">
				<iText>
					{{targetprice.rwApplication.responseDate}}
				</iText>
			</iFormItem>
			<iFormItem label="最新申请状态" name="test">
				<iText>
					{{targetprice.rwApplication.applyStatus}}
				</iText>
			</iFormItem>
			<iFormItem label="最新申请日期" name="test">
				<iText>
					{{targetprice.rwApplication.applyDate}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="1" icon inline>
			<iFormItem label="申请备注" name="test">
				<iInput type="textarea" rows="6" resize="none" v-model="targetprice.rwApplication.memo"></iInput>
			</iFormItem>
		</iFormGroup>
		<tablelist :tableData='targeRwData' :tableTitle='rwTitle' :loading='tableLoading'
			@handleSelectionChange='handleSelectionChange'></tablelist>
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
	import {
		rwTitle,
		targeTitle,
		targetPriceDetail
	} from './components/data';
	import {
		getTabelData,
		changeProcure
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
		props: {
			purchaseProjectId: {
				type: String
			}
		},
		data() {
			return {
				tableLoading: false,
				selectTableData: [],
				tableListData: [],
				targeRwData:[],//rw记录
				rwTitle: rwTitle,
				targeTitle: targeTitle,
				targetprice:targetPriceDetail
			}
		},
		created() {
			this.targePriceDetail()
		},
		methods: {
			// 获取申请目标价数据
			targePriceDetail(){
				let data = {
					"cfTargetpriceReq.purchaseProjectId": this.purchaseProjectId,
				};
				getTabelData(data).then((res) => {
					this.detailData = res.data.targetprice;
					this.tableListData=[this.targetprice.cfTargetPriceDetail]
					this.targeRwData=[this.targetprice.rwApplication]
				});
			},
			
			//表格选中值集
			handleSelectionChange(val) {
				this.selectTableData = val
			},
			// 保存 ,申请财务目标价
			save() {
				let targetprice = {
					purchaseProjectId: this.purchaseProjectId,
					cfTargetPriceDetail: this.targetprice.cfTargetPriceDetail,
					rwApplication:null
				};
				changeProcure({
					targetprice,
				}).then((res) => {
					this.targePriceDetail()
				});
			},
			//申请RW目标价
			targeRw(){
				let targetprice = {
					// operator: this.targetprice.operator,
					purchaseProjectId: this.purchaseProjectId,
					rwApplication: this.targetprice.rwApplication,
					cfTargetPriceDetail:null
				};
				changeProcure({
					targetprice,
				}).then((res) => {
					this.targePriceDetail()
				});
			}
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

	.start {
		font-size: 30px;
		position: absolute;
		left: -90px;
		top: 4px;
		color: red;
	}
</style>
