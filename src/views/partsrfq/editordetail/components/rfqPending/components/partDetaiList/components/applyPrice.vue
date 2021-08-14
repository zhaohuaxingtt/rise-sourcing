<template>
	<iDialog class="dialog" :title="language('LK_SHENQINGCAIWUMUBIAOJIA','申请财务目标价')" :visible.sync="applyPriceShow">
		<div class="btn">
			<iButton v-if="againApply" @click="save" :loading="saveLoading">{{ language('LK_ZHONGXINSHENQING','重新申请') }}</iButton>
			<iButton v-else @click="save" :loading="saveLoading">{{language('LK_SHENQING','申请')}}</iButton>
		</div>
		
		<iFormGroup row="2" icon inline>
			<iFormItem :label="language('LK_SHENQINGLEIXING','申请类型')" name="test">
				<el-radio-group v-model="targetprice.cfTargetPriceDetail.applyType">
					<el-radio label="LC">LC</el-radio>
					<el-radio label="SKD">SKD</el-radio>
					<el-radio label="CKD LANDED">CKD LANDED</el-radio>
				</el-radio-group>
				<span class="start">*</span>
			</iFormItem>
			<iFormItem :label="language('LK_QIWANGMUBIAOJIA','期望目标价')" name="test">
				<iInput :value="targetprice.cfTargetPriceDetail.expTargetpri" @input="handleInput($event, 'expTargetpri')"  maxlength="20"></iInput>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="2" icon inline>
			<iFormItem :label="language('LK_SHENQINGYUANYIN','申请原因')" name="test">
				<iInput type="textarea" rows="6" resize="none" v-model="targetprice.cfTargetPriceDetail.applyReason">
				</iInput>
			</iFormItem>
			<iFormItem :label="language('LK_SHENQINGBEIZHU','申请备注')" name="test">
				<iInput type="textarea" rows="6" resize="none" v-model="targetprice.cfTargetPriceDetail.memo">
				</iInput>
			</iFormItem>
		</iFormGroup>
			<tablelist  v-if="againApply" :tableData='tableListData' :tableTitle='targeTitle' v-loading='tableLoading'
				@handleSelectionChange='handleSelectionChange'></tablelist>
			<iPagination
				v-if="againApply"
        v-update
        @size-change="handleSizeChange($event, againShow)"
        @current-change="handleCurrentChange($event, againShow)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
				style="margin: 20px 0;"
    ></iPagination>
	</iDialog>
</template>

<script>
	import {
		iFormGroup,
		iFormItem,
		iInput,
		iDialog,
		iButton,
		iMessage,
		iPagination
	} from 'rise';
	import tablelist from '@/views/partsprocure/editordetail/components/targetPrice/components/tablelist'
	import {
		targeTitle,
		targetPriceDetail
	} from '@/views/partsprocure/editordetail/components/targetPrice/components/data';
	import { applyCFTarget, getCfTargetApplyHistory } from '@/api/financialTargetPrice/index'
	import {
  pageMixins
} from "@/utils/pageMixins";
	import {partProjTypes} from '@/config'
	export default {
		mixins: [pageMixins],
		components: {
			iFormGroup,
			iFormItem,
			iInput,
			tablelist,
			iDialog,
			iButton,
			iPagination
		},
		props: {
			handleSelectArr:{
				type:Object,
				default:()=>{
					return {}
				}
			}
		},
		watch: {
			applyPriceShow(val) {
				if (val) {
					if (this.handleSelectArr[0] && (this.handleSelectArr[0].partProjectType === partProjTypes.DBYICHIXINGCAIGOU || this.handleSelectArr[0].partProjectType === partProjTypes.DBLINGJIAN)) {
						this.targetprice = {
							...this.targetprice,
							cfTargetPriceDetail: {
								...this.targetprice.cfTargetPriceDetail,
								applyType: 'SKD'
							}
						}
					}
				}
			}
		},
		data() {
			return {
				// 零件项目类型
				partProjTypes,
				applyPriceShow: false,
				againApply:false,//是否重新申请目标价
				tableLoading: false,
				selectTableData: [],
				tableListData: [],
				targeTitle: targeTitle,
				targetprice:targetPriceDetail,
				saveLoading: false
			}
		},
		methods: {
			handleInput(val, key) {
				if (/^\d*\.?\d*$/.test(val)) {
          this.$set(this.targetprice.cfTargetPriceDetail, key, val)
        }
			},
			// 申请财务目标价
			save() {
				this.saveLoading = true
				const params = {
					...this.targetprice.cfTargetPriceDetail,
					purchasingProjectId: this.handleSelectArr[0].id
				}
				applyCFTarget(params).then((res) => {
					if (res?.result) {
						iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
						this.applyPriceShow = false
						this.$emit("refresh")
					} else {
						iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
					}
				}).finally(() => {
					this.saveLoading = false
				})
			},
			show() {
				this.againApply=false
				this.applyPriceShow = true
			},
			againShow(){
				this.againApply=true
				this.applyPriceShow = true
				this.tableLoading = true
				let data = {
					fsNum: this.handleSelectArr[0].fsnrGsnrNum,
					pageNo: this.page.currPage,
					pageSize: this.page.pageSize
				};
				getCfTargetApplyHistory(data).then((res) => {
					if (res?.result) {
						this.page = {
							...this.page,
							totalCount: Number(res.total),
							currPage: Number(res.pageNum),
							pageSize: Number(res.pageSize)
						}
						this.tableListData = res.data || []
					} else {
						iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
					}
				}).finally(() => {
					this.tableLoading = false
				})
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
