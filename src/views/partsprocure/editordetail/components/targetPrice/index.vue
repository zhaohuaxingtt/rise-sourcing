<template>
	<iCard>
		<!-- 价格明细 -->
		<div class="header flex-between-center-center">
			<span class="title">{{ $t('LK_JIAGEMINGXI') }}</span>
			<div class="control">
				<iButton  @click="save" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SAVE">{{ $t('LK_BAOCUN') }}</iButton>
			</div>
		</div>
		<iFormGroup row="3" icon inline>
			<iFormItem label="LC_B" name="test" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_LC_B">
				<iText>
					{{targetprice.cfTargetPriceDetail.lcBPrice}}
				</iText>
			</iFormItem>
			<iFormItem label="SKD_B" name="test" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SKD_B">
				<iText>
					{{targetprice.cfTargetPriceDetail.skdBPrice}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="3" icon inline>
			<iFormItem label="LC_A" name="test" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_LC_A">
				<iText>
					{{targetprice.cfTargetPriceDetail.lcAPrice}}
				</iText>
			</iFormItem>
			<iFormItem label="SKD_A" name="test" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SKD_A">
				<iText>
					{{targetprice.cfTargetPriceDetail.skdAPrice}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="3" icon inline>
			<iFormItem label="CKD Duty(%)" name="test">
				<iInput v-model="targetprice.cfTargetPriceDetail.ckdDuty" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="3" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_CKD_Duty"></iInput>
			</iFormItem>
			<iFormItem label="CKD EX_Work" name="test">
				<iInput v-model="targetprice.cfTargetPriceDetail.ckdExwork" onkeyup="value=value.replace(/[^\d]/g,'')"  maxlength="15" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_CKD_EX"></iInput>
			</iFormItem>
			<iFormItem label="CKD LANDED" name="test">
				<iInput v-model="targetprice.cfTargetPriceDetail.ckdLanded" onkeyup="value=value.replace(/[^\d]/g,'')"  maxlength="15" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_CKD_LANDED"></iInput>
			</iFormItem>
		</iFormGroup>
		<div class="line"></div>
		<!-- 申请财务目标价 -->
		<div class="header flex-between-center-center">
			<span class="title">{{ $t('LK_SHENQINGCAIWUMUBIAOJIA') }}</span>
			<div class="control">
				<iButton @click="save" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_APPLY">申请</iButton>
			</div>
		</div>
		<iFormGroup row="2" icon inline>
			<iFormItem :label="$t('LK_SHENQINGLEIXING')" name="test" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SQLX">
				<el-radio-group v-model="targetprice.cfTargetPriceDetail.applyType">
					<el-radio label="LC">LC</el-radio>
					<el-radio label="SKD">SKD</el-radio>
					<el-radio label="CKD_LANDED">CKD_LANDED</el-radio>
				</el-radio-group>
				<!-- <span class="start">*</span> -->
			</iFormItem>
			<iFormItem :label="$t('LK_QIWANGMUBIAOJIA')" name="test"  v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_QWMBJ">
				<iInput v-model="targetprice.cfTargetPriceDetail.lcPrice" onkeyup="value=value.replace(/[^\d]/g,'')"  maxlength="20"></iInput>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="2" icon inline>
			<iFormItem :label="$t('LK_SHENQINGYUANYIN')" name="test" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SQYY">
				<iInput type="textarea" rows="6" resize="none" maxlength="500" v-model="targetprice.cfTargetPriceDetail.applyReason">
				</iInput>
			</iFormItem>
			<iFormItem :label="$t('LK_SHENQINGBEIZHU')" name="test" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SQBZ">
				<iInput type="textarea" rows="6" resize="none" maxlength="1000" v-model="targetprice.cfTargetPriceDetail.applyMemo">
				</iInput>
			</iFormItem>
		</iFormGroup>
		<tablelist :tableData='tableListData' :tableTitle='targeTitle' :loading='tableLoading'
			@handleSelectionChange='handleSelectionChange'></tablelist>
		<div class="line"></div>
		<!-- 申请RW价 -->
		<div class="header flex-between-center-center">
			<span class="title">{{ $t('LK_SHENQINGRWJIA') }}</span>
			<div class="control">
				<iButton @click="targeRw" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_RWAPPLY">申请</iButton>
			</div>
		</div>
		<iFormGroup row="2" icon inline v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_APPLYRWTXT">
			<iFormItem :label="$t('LK_ZUIXINRWJIA')" name="test">
				<iText>
					{{targetprice.rwApplication.price}}
				</iText>
			</iFormItem>
			<iFormItem :label="$t('LK_ZUIXINFANHUIRIQI')" name="test">
				<iText>
					{{targetprice.rwApplication.responseDate}}
				</iText>
			</iFormItem>
			<iFormItem :label="$t('LK_ZUIXINSHENQINGZHUANGTAI')" name="test">
				<iText>
					{{targetprice.rwApplication.applyStatus}}
				</iText>
			</iFormItem>
			<iFormItem :label="$t('LK_ZUIXINSHENQINGRIQI')" name="test">
				<iText>
					{{targetprice.rwApplication.applyDate}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="1" icon inline>
			<iFormItem :label="$t('LK_SHENQINGBEIZHU')" name="test">
				<iInput type="textarea" rows="6" resize="none" maxlength="1000" v-model="targetprice.rwApplication.memo" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_RWAPPLYREMARK"></iInput>
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
		iMessage
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
				targetprice:targetPriceDetail,
				cfTableData:[],//cf表格数据
				rwTableData:[],//RW表格数据
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
					let price=res.data.targetprice
					if (price.cfTargetPriceDetail) {
						this.targetprice.cfTargetPriceDetail=price.cfTargetPriceDetail
						this.tableListData=[price.cfTargetPriceDetail]
					}
					if (price.rwApplication) {
						this.targetprice.rwApplication=price.rwApplication
						this.targeRwData=[price.rwApplication]
					}
				});
			},
			//表格选中值集
			handleSelectionChange(val) {
				// this.selectTableData = val
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
					if (res.data) {
						iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
						this.targePriceDetail()
					}else{
						iMessage.error(res.desZh)
					}
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
