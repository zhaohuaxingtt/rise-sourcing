<template>
	<iCard>
		<!-- 价格明细 -->
		<div class="header flex-between-center-center">
			<span class="title">{{ language('LK_JIAGEMINGXI','价格明细') }}</span>
			<div class="control">
				<iButton v-if="!disabled" @click="save('save')" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SAVE|保存">{{ language('LK_BAOCUN','保存') }}</iButton>
			</div>
		</div>
		<iFormGroup row="3" icon inline>
			<iFormItem label="LC_B" name="test" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_LC_B|lcBPrice">
				<iText>
					{{targetprice.cfTargetPriceDetail.lcBPrice}}
				</iText>
			</iFormItem>
			<iFormItem label="SKD_B" name="test" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SKD_B|skdBPrice">
				<iText>
					{{targetprice.cfTargetPriceDetail.skdBPrice}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="3" icon inline>
			<iFormItem label="LC_A" name="test" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_LC_A|lcAPrice">
				<iText>
					{{targetprice.cfTargetPriceDetail.lcAPrice}}
				</iText>
			</iFormItem>
			<iFormItem label="SKD_A" name="test" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SKD_A|skdAPrice">
				<iText>
					{{targetprice.cfTargetPriceDetail.skdAPrice}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="3" icon inline>
			<iFormItem label="CKD Duty(%)" name="test">
				<iInput v-if="!disabled" v-model="targetprice.cfTargetPriceDetail.ckdDuty" v-Int maxlength="3" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_CKD_Duty|ckdDuty"></iInput>
				<iText v-else>{{targetprice.cfTargetPriceDetail.ckdDuty}}</iText>
			</iFormItem>
			<iFormItem label="CKD EX_Work" name="test">
				<iInput v-if="!disabled" v-model="targetprice.cfTargetPriceDetail.ckdExwork" v-Int  maxlength="15" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_CKD_EX|ckdExwork"></iInput>
				<iText v-else>{{targetprice.cfTargetPriceDetail.ckdExwork}}</iText>
			</iFormItem>
			<iFormItem label="CKD LANDED" name="test">
				<iInput v-if="!disabled" v-model="targetprice.cfTargetPriceDetail.ckdLanded" v-Int maxlength="15" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_CKD_LANDED|ckdLanded"></iInput>
				<iText v-else>{{targetprice.cfTargetPriceDetail.ckdLanded}}</iText>
			</iFormItem>
		</iFormGroup>
		<div class="line"></div>
		<!-- 申请财务目标价 -->
		<div class="header flex-between-center-center">
			<span class="title">{{ language('LK_SHENQINGCAIWUMUBIAOJIA','申请财务目标价') }}</span>
			<div class="control">
				<iButton v-if="!disabled" @click="saveApply" :loading="applyLoading" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_APPLY|申请">{{ language('LK_SHENQING','申请') }}</iButton>
			</div>
		</div>
		<iFormGroup row="2" icon inline>
			<iFormItem :label="language('LK_SHENQINGLEIXING','申请类型')" name="test" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SQLX|申请类型">
				<el-radio-group v-model="targetprice.cfTargetPriceDetail.applyType" :disabled="disabled">
					<el-radio label="LC" size="small">LC</el-radio>
					<el-radio label="SKD" size="small">SKD</el-radio>
					<el-radio label="CKD LANDED" size="small">CKD LANDED</el-radio>
				</el-radio-group>
				<!-- <span class="start">*</span> -->
			</iFormItem>
			<iFormItem :label="language('LK_QIWANGMUBIAOJIA','期望目标价')" name="test"  v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_QWMBJ|期望目标价">
				<iInput v-if="!disabled" v-model="targetprice.cfTargetPriceDetail.expTargetpri" v-Int  maxlength="20"></iInput>
				<iText v-else>{{targetprice.cfTargetPriceDetail.expTargetpri}}</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="2" icon inline>
			<iFormItem :label="language('LK_SHENQINGYUANYIN','申请原因')" name="test" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SQYY|申请原因">
				<iInput :disabled="disabled" type="textarea" rows="6" resize="none" maxlength="500" v-model="targetprice.cfTargetPriceDetail.applyReason">
				</iInput>
			</iFormItem>
			<iFormItem :label="language('LK_SHENQINGBEIZHU','申请备注')" name="test" v-permission.auto="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_SQBZ|申请备注">
				<iInput :disabled="disabled" type="textarea" rows="6" resize="none" maxlength="1000" v-model="targetprice.cfTargetPriceDetail.memo">
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
		<!-- 进过与辉哥沟通，当前rw价功能做得很不完善，还不如屏蔽 -->
		<!-- <div class="line"></div> -->
		<!-- 申请RW价 -->
		<!-- <div class="header flex-between-center-center">
			<span class="title">{{ language('LK_SHENQINGRWJIA','申请RW价') }}</span>
			<div class="control">
				<iButton @click="targeRw" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_RWAPPLY">{{ language('LK_SHENQING','申请') }}</iButton>
			</div>
		</div>
		<iFormGroup row="2" icon inline v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_APPLYRWTXT">
			<iFormItem :label="language('LK_ZUIXINRWJIA','最新RW价')" name="test">
				<iText>
					{{targetprice.rwApplication.price}}
				</iText>
			</iFormItem>
			<iFormItem :label="language('LK_ZUIXINFANHUIRIQI','最新返回日期')" name="test">
				<iText>
					{{targetprice.rwApplication.responseDate}}
				</iText>
			</iFormItem>
			<iFormItem :label="language('LK_ZUIXINSHENQINGZHUANGTAI','最新申请状态')" name="test">
				<iText>
					{{targetprice.rwApplication.applyStatus}}
				</iText>
			</iFormItem>
			<iFormItem :label="language('LK_ZUIXINSHENQINGRIQI','最新申请日期')" name="test">
				<iText>
					{{targetprice.rwApplication.applyDate}}
				</iText>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="1" icon inline>
			<iFormItem :label="language('LK_SHENQINGBEIZHU','申请备注')" name="test">
				<iInput type="textarea" rows="6" resize="none" maxlength="1000" v-model="targetprice.rwApplication.memo" v-permission="PARTSPROCURE_EDITORDETAIL_TARGETPRICE_RWAPPLYREMARK"></iInput>
			</iFormItem>
		</iFormGroup>
		<tablelist :tableData='targeRwData' :tableTitle='rwTitle' :loading='tableLoading'
			@handleSelectionChange='handleSelectionChange'></tablelist> -->
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
		iPagination
	} from 'rise';
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
import {partProjTypes} from '@/config'
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
			iPagination
		},
		mixins: [ pageMixins ],
		inject: ['getDisabled'],
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
					console.log("val", val)
					if (val === partProjTypes.DBYICHIXINGCAIGOU || val === partProjTypes.DBLINGJIAN) {
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
		computed: {
			disabled() {
				return this.getDisabled()
			}
		},
		data() {
			return {
				// 零件项目类型
				partProjTypes,
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
					if (res?.data) {
						this.targetprice = {
							...this.targetprice,
							cfTargetPriceDetail: {
								...this.targetprice.cfTargetPriceDetail,
								...res.data,
								applyType: res.data.applyType ? res.data.applyType : this.targetprice.cfTargetPriceDetail.applyType
							}
						}
					} else {
						iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
					}
				})
			},
			getTargetPrice() {
				getCfTargetApplyHistory({
					fsNums: [this.fsnrGsnrNum],
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
					if (price?.rwApplication) {
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
						iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
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
						iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
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
					iMessage.warn(this.language('LK_QINGXUANZESHENQINGDECAIWUMUBIAOJIALEIXING','请选择申请的财务目标价类型'))
					return
				}
				this.applyLoading = true
				const params = {
					...this.targetprice.cfTargetPriceDetail,
					purchasingProjectId: [this.purchaseProjectId]
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
