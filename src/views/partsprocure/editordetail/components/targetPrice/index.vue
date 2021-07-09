<template>
	<iCard>
		<!-- 价格明细 -->
		<div class="header flex-between-center-center">
			<span class="title">{{ $t('LK_JIAGEMINGXI') }}</span>
			<div class="control">
				<iButton  @click="save('save')" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SAVE">{{ $t('LK_BAOCUN') }}</iButton>
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
				<iInput v-model="targetprice.cfTargetPriceDetail.ckdDuty" v-Int maxlength="3" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_CKD_Duty"></iInput>
			</iFormItem>
			<iFormItem label="CKD EX_Work" name="test">
				<iInput v-model="targetprice.cfTargetPriceDetail.ckdExwork" v-Int  maxlength="15" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_CKD_EX"></iInput>
			</iFormItem>
			<iFormItem label="CKD LANDED" name="test">
				<iInput v-model="targetprice.cfTargetPriceDetail.ckdLanded" v-Int maxlength="15" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_CKD_LANDED"></iInput>
			</iFormItem>
		</iFormGroup>
		<div class="line"></div>
		<!-- 申请财务目标价 -->
		<div class="header flex-between-center-center">
			<span class="title">{{ $t('LK_SHENQINGCAIWUMUBIAOJIA') }}</span>
			<div class="control">
				<iButton @click="saveApply" :loading="applyLoading" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_APPLY">{{ $t('LK_SHENQING') }}</iButton>
			</div>
		</div>
		<iFormGroup row="2" icon inline>
			<iFormItem :label="$t('LK_SHENQINGLEIXING')" name="test" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SQLX">
				<el-radio-group v-model="targetprice.cfTargetPriceDetail.applyType">
					<iRadio label="LC" size="small" border>LC</iRadio>
					<iRadio label="SKD" size="small" border>SKD</iRadio>
					<iRadio label="CKD LANDED" size="small" border>CKD LANDED</iRadio>
				</el-radio-group>
				<!-- <span class="start">*</span> -->
			</iFormItem>
			<iFormItem :label="$t('LK_QIWANGMUBIAOJIA')" name="test"  v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_QWMBJ">
				<iInput v-model="targetprice.cfTargetPriceDetail.expTargetpri" v-Int  maxlength="20"></iInput>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="2" icon inline>
			<iFormItem :label="$t('LK_SHENQINGYUANYIN')" name="test" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SQYY">
				<iInput type="textarea" rows="6" resize="none" maxlength="500" v-model="targetprice.cfTargetPriceDetail.applyReason">
				</iInput>
			</iFormItem>
			<iFormItem :label="$t('LK_SHENQINGBEIZHU')" name="test" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SQBZ">
				<iInput type="textarea" rows="6" resize="none" maxlength="1000" v-model="targetprice.cfTargetPriceDetail.memo">
				</iInput>
			</iFormItem>
		</iFormGroup>
		<tablelist :tableData='tableListData' :tableTitle='targeTitle' :loading='tableLoading'
			@handleSelectionChange='handleSelectionChange'></tablelist>
		<iPagination
        class="pagination margin-top30"
				v-update
        @size-change="handleSizeChange($event, getTargetPrice)"
        @current-change="handleCurrentChange($event, getTargetPrice)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
		<div class="line"></div>
		<!-- 申请RW价 -->
		<div class="header flex-between-center-center">
			<span class="title">{{ $t('LK_SHENQINGRWJIA') }}</span>
			<div class="control">
				<iButton @click="targeRw" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_RWAPPLY">{{ $t('LK_SHENQING') }}</iButton>
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
		iMessage,
		iRadio,
		iPagination
	} from "@/components";
	import tablelist from "./components/tablelist";
	import {
		rwTitle,
		targeTitle,
		targetPriceDetail
	} from './components/data';
	import {
		getTabelData,
		changeProcure,
		getTargetPrice
	} from '@/api/partsprocure/home'
import { iMessageBox } from '../../../../../components';
import { pageMixins } from '@/utils/pageMixins'
import { applyCFTarget, getCfTargetApplyHistory, getTargetPriceDd, savePriceDetail } from '@/api/financialTargetPrice/index'
import { cloneDeep } from 'lodash'
	export default {
		components: {
			iCard,
			iFormGroup,
			iFormItem,
			iText,
			iButton,
			iInput,
			tablelist,
			iRadio,
			iPagination
		},
		mixins: [ pageMixins ],
		props: {
			purchaseProjectId: {
				type: String
			},
			fsnrGsnrNum: {type: String},
			partProjectType: {type:String}
		},
		watch: {
			partProjectType: {
				handler(val) {
					if (val === 'PT19' || val === 'PT04') {
						this.targetprice = {
							...this.targetprice,
							cfTargetPriceDetail: {
								...this.targetprice.cfTargetPriceDetail,
								applyType: 'SKD'
							}
						}
					}
				},
				immediate: true
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
				applyLoading: false
			}
		},
		created() {
			this.getTargetPriceDetail()
			this.getTargetPrice()
			this.targePriceDetail()
		},
		methods: {
			getTargetPriceDetail() {
				getTargetPriceDd(this.purchaseProjectId).then(res => {
					if (res?.result) {
						this.targetprice = {
							...this.targetprice,
							cfTargetPriceDetail: {
								...this.targetprice.cfTargetPriceDetail,
								...res.data
							}
						}
					} else {
						iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
					}
				})
			},
			getTargetPrice() {
				getCfTargetApplyHistory({
					fsNum: this.fsnrGsnrNum,
					pageNo: this.page.currPage,
  				pageSize: this.page.pageSize
				})
				.then(res => {
					if (res.code == 200) {
						this.page = {
							...this.page,
							totalCount: Number(res.total),
							currPage: Number(res.pageNum),
							pageSize: Number(res.pageSize)
						}
						this.tableListData = res.data || []
					} else {
						iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
					}
				})
				.catch(() => {})
			},
			// 获取申请目标价数据
			targePriceDetail(){
				let data = {
					"cfTargetpriceReq.purchaseProjectId": this.purchaseProjectId,
				};
				getTabelData(data).then((res) => {
					let price=res.data.targetprice
					// if (price.cfTargetPriceDetail) {
					// 	this.targetprice.cfTargetPriceDetail=price.cfTargetPriceDetail
					// 	this.tableListData=JSON.parse(JSON.stringify([price.cfTargetPriceDetail]))  
					// }
					if (price.rwApplication) {
						this.targetprice.rwApplication=price.rwApplication
						this.targeRwData=JSON.parse(JSON.stringify([price.rwApplication]))
					}
				});
			},
			//表格选中值集
			handleSelectionChange(val) {
				// this.selectTableData = val
			},
			// 保存 ,申请财务目标价
			save(type) {
				let targetprice = {
					id: this.targetprice.cfTargetPriceDetail.applyId,
					purchasingProjectId: this.purchaseProjectId,
					ckdDuty: this.targetprice.cfTargetPriceDetail.ckdDuty,
					ckdExwork: this.targetprice.cfTargetPriceDetail.ckdExwork,
					ckdLanded: this.targetprice.cfTargetPriceDetail.ckdLanded
				};
				savePriceDetail(targetprice).then((res) => {
					if (res.result) {
						iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
						this.getTargetPriceDetail()
						this.targePriceDetail()
						this.getTargetPrice()
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
					if(res.code == 200){
						iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
						this.targePriceDetail()
					}else{
						iMessage.error(res.desZh)
					}
				}).catch(err=>{
					iMessage.error(err.desZh)
				});
			},
			saveApply() {
				if (!this.targetprice.cfTargetPriceDetail.applyType) {
					iMessage.warn(this.language('请选择申请的财务目标价类型'))
					return
				}
				this.applyLoading = true
				const params = {
					...this.targetprice.cfTargetPriceDetail,
					purchasingProjectId: this.purchaseProjectId
				}
				applyCFTarget(params).then((res) => {
					if (res?.result) {
						iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
						this.applyPriceShow = false
						this.getTargetPriceDetail()
						this.targePriceDetail()
						this.getTargetPrice()
					} else {
						iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
					}
				}).finally(() => {
					this.applyLoading = false
				})
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
