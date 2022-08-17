<template>
	<iPage class="partsprocureHome">
		<div>
			<div class="pageTitle flex-between-center-center margin-botttom20">
				<span>
					{{
						baseinfodata.riseCode
							? `RiSE编号:  ${baseinfodata.riseCode}`
							: $t('LK_XIANJIANCAIGOUSHENQING')
					}}
				</span>
				<div class="btnList flex-align-center">
					<iButton @click="sendToLine" v-if="canEditable">
						{{ $t('推送采购员') }}
					</iButton>
					<iButton @click="exitEditor" v-if="canEdit && canEditable">
						{{ $t('LK_TUICHUBIANJI') }}
					</iButton>
					<iButton @click="handleSave" v-if="canEdit && canEditable">
						{{ $t('LK_BAOCUN') }}
					</iButton>
					<iButton
						@click="handleEdit"
						v-if="!canEdit && isLatest && canEditable"
					>
						{{ $t('LK_BIANJI') }}
					</iButton>
					<!--<iButton @click="createOrder" v-if="!canEdit">{{ $t('创建订单') }}</iButton>-->
					<logButton class="margin-left20" @click="lookLog" />
				</div>
			</div>
			<!--------------------------------------基础信息部分------------------------------------------>
			<div class="margin-bottom20">
				<iCard class="card" collapse>
					<iFormGroup row="1" inline>
						<div class="row">
							<div class="col">
								<iFormItem
									:label="$t('MODEL-ORDER.LK_CAIGOUSHENQINGLEIXING') + ':'"
									name="test"
								>
									<iSelect
										:placeholder="$t('LK_QINGXUANZE')"
										v-model="baseinfodata.subType"
										:disabled="$route.query.code"
										v-if="canEdit && canEditable"
									>
										<el-option
											v-for="(item, index) in addType"
											:key="index"
											:value="item.label"
											:label="$t(item.key)"
										></el-option>
									</iSelect>
									<iText v-else>{{ getSubType(baseinfodata.subType) }}</iText>
									<!--<iText v-else>{{ applicationTypeKey ? $t(applicationTypeKey) : $t('LK_GONGXUWEIWAICAIGOUSHENQING') }}</iText>-->
								</iFormItem>
								<iFormItem :label="$t('申请人') + ':'" name="test">
									<iText>{{ baseinfodata.applyBy }}</iText>
								</iFormItem>
							</div>
							<div class="col">
								<iFormItem :label="$t('推荐采购员') + ':'" name="test" :require="true">
									<span slot="label">
										<span style="color: red">*</span>
										{{$t('推荐采购员') + ':'}}
									</span>
									<iSelect
										:placeholder="$t('LK_QINGXUANZE')"
										v-model="baseinfodata.ownerId"
										v-if="canEdit && canEditable"
									>
										<el-option
											v-for="(item, index) in lineOptiondata"
											:key="index"
											:value="item.linieID"
											:label="$t(item.linieName)"
										></el-option>
									</iSelect>
									<iText v-else> {{ getLiner(baseinfodata.ownerId) }}</iText>
								</iFormItem>
								<iFormItem :label="$t('申请部门') + ':'" name="test">
									<iText> {{ baseinfodata.applyDeptNo }}</iText>
								</iFormItem>
							</div>
							<div class="col">
								<div class="row">
									<iFormItem name="test" class="demo-dynamic">
										<span slot="label">
											{{ $t('零件编号前缀') + ':' }}
											<el-tooltip
												effect="light"
												popper-class="custom-card-tooltip"
												:content="
													$t(
														'零件编号前缀定义：项目类型(默认为MBCP, 四位)+年度项目编号(5位), 例如: MBCP16001'
													)
												"
												placement="top"
											>
												<i
													class="el-icon-warning-outline yellow iconSuffix"
												></i>
											</el-tooltip>
										</span>
										<iInput
											v-if="canEdit && canEditable"
											v-model="baseinfodata.partPrefix"
										/>
										<iText v-else> {{ baseinfodata.partPrefix }} </iText>
									</iFormItem>
								</div>
								<iFormItem :label="$t('备注') + ':'" name="test">
									<iInput
										v-model="baseinfodata.remark"
										:disabled="!canEdit"
										class="width500"
									></iInput>
								</iFormItem>
							</div>
							<div class="col">
								<iFormItem :label="$t('状态') + ':'" name="test">
									<iText> {{ getStatus(baseinfodata.status) }} </iText>
								</iFormItem>
								<iFormItem name="test"> </iFormItem>
							</div>
						</div>
					</iFormGroup>
				</iCard>
			</div>
			<!-- 列表部分 -->
			<iCard class="margin-top20 margin-bottom20">
				<div class="table-top">
					<iFormGroup row="5" inline :rules="rules"> </iFormGroup>
					<div>
						<iButton @click="insertItem" v-if="canEdit && canEditable">
							{{ $t('LK_XINZHENGXIANGCI') }}
						</iButton>
						<iButton @click="deleteItem" v-if="canEdit && canEditable">
							{{ $t('LK_SHANCHUXIANGCI') }}
						</iButton>
						<upload-button
							@uploadedCallback="uploadAttachments"
							v-if="canEdit && canEditable"
							:upload-button-loading="uploadAttachmentsButtonLoading"
							:data-info="baseinfodata"
							class="margin-left8"
						/>
						<iButton @click="exportExcel" style="margin-left: 8px">
							{{ $t('LK_DAOCHU') }}
						</iButton>
						<!-- <buttonDownload :downloadMethod="exportExcel" /> -->
					</div>
				</div>
				<tablelist
					:tableData="tableListData"
					:tableTitle="tableTitle"
					:tableLoading="tableLoading"
					:baseinfodata="baseinfodata"
					:fromGroup="fromGroup"
					:splitPurchList="splitPurchList"
					:canEdit="canEdit && canEditable"
					:addressList="addressList"
					@normalPrQuantityYears="normalPrQuantityYears"
					@handleSelectionChange="handleSelectionChange"
					open-page-props="id"
					:index="true"
					icon-props="recordId"
				>
				</tablelist>
				<!------------------------------------------------------------------------>
				<!--                  表格分页                                          --->
				<!------------------------------------------------------------------------>
				<!-- <iPagination
					v-update
					@size-change="handleSizeChange($event, getTableList)"
					@current-change="handleCurrentChange($event, getTableList)"
					background
					:current-page="page.currPage"
					:page-sizes="page.pageSizes"
					:page-size="page.pageSize"
					:layout="page.layout"
					:total="page.totalCount"
				/> -->
			</iCard>
		</div>

		<!--日志-->
		<iUserLog
			:show.sync="logDialogVisible"
			:bizId="baseinfodata.riseCode || 0"
			menuId=""
			is-page
		/>
	</iPage>
</template>

<script>
import {
	iPage,
	iButton,
	iCard,
	iMessage,
	iFormGroup,
	iFormItem,
	iSelect,
	iText,
	iUserLog,
	iInput,
} from 'rise'
import { newTableTitle, addType, statusList } from '../components/data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import tablelist from './components/tablelist'
import logButton from '../components/logButton'
import { purchaseFactory } from '@/api/partsprocure/editordetail'
import { dictkey, sendLinie, liniePullDownByDept } from '@/api/outsouringorder'
import {
	inventoryLocation,
	saveOrUpdate,
	findNormalPrById,
	deleteNormalPr,
	applyExport,
	applyImport,
} from '@/api/ws2/purchaserequest'
import { cloneDeep } from 'lodash'
import uploadButton from './components/uploadButton'
import { exportExcel } from '@/utils/filedowLoad'
import buttonDownload from '@/components/buttonDownload'
export default {
	mixins: [pageMixins, filters],
	components: {
		iPage,
		iButton,
		iCard,
		tablelist,
		logButton,
		iFormGroup,
		iFormItem,
		iSelect,
		iText,
		uploadButton,
		iUserLog,
		iInput,
		buttonDownload,
	},
	data() {
		return {
			// applicationTypeKey: '',
			// applicationTypeVal: '',
			tableListData: [], //table数据
			tableLoading: false,
			tableTitle: newTableTitle,
			tab: 'source',
			splitPurchList: [], //采购工厂
			itemNum: 10,
			fromGroup: {},
			selectTableData: [],
			addressList: [], //库存地点
			canEdit: false,
			addType: addType,
			statusList: statusList,
			fromItem: false, //是否从项次点击进入
			// fromDetail: false,
			uploadAttachmentsButtonLoading: false,
			baseinfodata: {
				type: 'GPR',
				applyBy: this.$store.state.permission.userInfo?.nameZh,
				subType: 'ZN_ONE',
				status: '-2',
				ownerId: '',
				partPrefix: '',
				remark: '',
				applyDeptNo: this.$store.state.permission.userInfo?.deptDTO.deptNum,
				currency: 'RMB',
			},
			logDialogVisible: false,
			isLatest: true,
			lineOptiondata: [],
		}
	},
	created() {
		if (this.$route.query.item) {
			this.fromItem = true
		}
		if (this.$route.query.code) {
			this.canEdit = false
			this.baseinfodata.riseCode = this.$route.query.code
			this.getTableHaderInfo()
		}
		if (this.$route.query.isLatest === 'false') {
			this.isLatest = false
		}
		// 新建的
		if (!this.$route.query.item && !this.$route.query.code) {
			this.canEdit = true
		}
		this.purchaseFactory()
		this.getProcureGroup()
		this.getLineInfo()
	},
	computed: {
		// 工序委外是否可以编辑
		canEditable() {
			return ['-1', '-2'].includes(this.baseinfodata.status)
		},
	},
	methods: {
		// 获取采购申请类型
		getSubType(val) {
			if (val == '' || val == null || this.addType.length == 0) return ''
			return this.addType.find((l) => l.label == val).key
		},
		// 获取推荐采购员
		getLiner(key) {
			if (
				key == '' ||
				key == undefined ||
				key == null ||
				this.lineOptiondata.length == 0
			)
				return ''
			return this.lineOptiondata.find((j) => j.linieID == key).linieName
		},
		// 获取采购申请单状态
		getStatus(status) {
			if (status == '' || status == undefined || this.statusList.length <= 0)
				return ''
			return this.statusList.find((k) => k.key == status).label
		},
		// 获取推荐采购员
		getLineInfo() {
			liniePullDownByDept({
				deptId: this.$store.state.permission.userInfo?.deptDTO.id,
			})
				.then((res) => {
					if (res.data instanceof Array && res.data.length > 0) {
						this.lineOptiondata = res.data
					}
				})
				.catch((err) => {
					this.lineOptiondata = []
				})
		},
		//获取采购工厂列表
		purchaseFactory() {
			purchaseFactory({ firstId: this.firstId, isSparePart: false })
				.then((res) => {
					if (res.data) {
						this.splitPurchList = res.data
					}
				})
				.catch((err) => {})
		},
		//项次数量信息
		normalPrQuantityYears(data) {
			// this.baseinfodata.normalPrQuantityYears = data
		},
		//保存
		handleSave() {
			if (this.tableListData.length == 0) {
				return iMessage.warn('请添加数据')
			}

			// 零件前缀没有，并且零件号为空
			if (
				this.tableListData.find((e) => !e.partNum) &&
				!this.baseinfodata.partPrefix
			) {
				return iMessage.warn('请输入零件号')
			}
			if (
				this.tableListData.find(
					(e) => !e.type || !e.unitCode || !e.procureFactory || !e.deliveryDate
				)
			) {
				return iMessage.warn('请输入必填项')
			}
			// 一次性
			if(this.baseinfodata.subType == 'ZN_ONE'){
				if (!this.tableListData.find((e) => e.quantity>0)) {
					return iMessage.warn('类型“工序委外一次性”，数量必须大于0')
				}
			// 框架
			}else{
				let flag = false
				// 至少有一条数据不为空
				this.tableListData.forEach(item=>{
					flag = flag || !item.normalPrQuantityYears.find((e)=> e.quantity>0 )
				})
				if (flag) {
					return iMessage.warn('类型“工序委外框架”，五年计划数量必须大于0')
				}
			}
			const query = this.tableListData.map((item) => {
				return {
					...this.baseinfodata,
					...item,
					quantity: item.quantity,
				}
			})
			saveOrUpdate(query)
				.then((res) => {
					if (
						+res.code === 200 &&
						!this.$route.query.item &&
						!this.$route.query.code
					) {
						this.baseinfodata.riseCode = res.data[0].riseCode

						iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
						this.$nextTick(() => {
							this.$router.replace({
								path: '/partsign/outsouringorder/addoutsourcing/details',
								query: {
									code: this.baseinfodata.riseCode,
									subType: this.baseinfodata.subType,
								},
							})
						})
					} else if (+res.code === 200 && this.$route.query.code) {
						this.baseinfodata.riseCode = res.data[0].riseCode
						this.canEdit = false
						this.getTableHaderInfo()
						iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
					} else {
						this.canEdit = true
						return iMessage.error(
							`${this.$i18n.locale === 'zh' ? res.desZh : res.desEn}`
						)
					}
				})
				.catch((err) => {})
		},
		//编辑
		handleEdit() {
			this.canEdit = true
		},
		//退出编辑
		exitEditor() {
			this.canEdit = false
			// this.getTableList()
		},
		// 发送给采购员
		sendToLine() {
			if (!this.baseinfodata.ownerId) {
				return iMessage.warn('请选择需要推荐的采购员')
			}
			if (this.tableListData.length <= 0) {
				return iMessage.warn('没有需要推送给采购员数据')
			}

			// 零件前缀没有，并且零件号为空
			if (
				this.tableListData.find((e) => !e.partNum) &&
				!this.baseinfodata.partPrefix
			) {
				return iMessage.warn('请输入零件号')
			}
			if (
				this.tableListData.find(
					(e) => !e.type || !e.unitCode || !e.procureFactory || !e.deliveryDate
				)
			) {
				return iMessage.warn('请输入必填项')
			}
			if (this.tableListData.find((e) => !e.quantity)) {
				return iMessage.warn('类型“工序委外一次性”，数量必须大于0')
			}
			sendLinie({
				deptName: this.baseinfodata.deptName,
				deptNum: this.baseinfodata.deptNum,
				normalPrList: this.tableListData.map((l) => {
					return {
						id: l.id,
						purchasingRequirementId: l.purchasingRequirementId,
						riseCode: l.riseCode,
						sapCode: l.sapCode,
						sapItem: l.sapItem,
						subType: l.subType,
						type: l.type,
					}
				}),
				ownerId: this.baseinfodata.ownerId,
				riseCodes: this.baseinfodata.riseCode,
			}).then((res) => {
				if (res.result) {
					iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
					this.getTableHaderInfo()
				}
			})
		},
		// 新增項次
		insertItem() {
			if (this.tableListData.length > 0) {
				const {
					partType,
					partNum,
					quantity,
					procureFactory,
					deliveryDate,
					unitCode,
					normalPrQuantityYears = [],
				} = this.tableListData[this.tableListData.length - 1]

				const itemQuantity =
					this.baseinfodata.subType === 'ZN_ONE'
						? quantity
						: normalPrQuantityYears.length
				console.log({
					partType,
					partNum,
					procureFactory,
					deliveryDate,
					unitCode,
					itemQuantity,
				})
				if (
					!partType ||
					!partNum ||
					!procureFactory ||
					!deliveryDate ||
					!unitCode ||
					!itemQuantity
				) {
					return iMessage.warn('请输入上一条数据必填项')
				}
			}
			this.tableListData.push({
				riseCode: this.$route.query.code || '',
				sapItem: this.itemNum,
				partType: this.fromGroup.PART_TYPE[0].code,
				account: '',
				partNum: '',
				quantity: '',
				unitCode: '',
				supplierNameZh: '',
				factoryName: '',
				tmFactoryId: '',
				procureFactory: '',
				procureOrg: '',
				deliveryDate: '',
				storageLocationCode: '',
				requestTraceNo: '',
				// subType: this.applicationTypeVal,
				subType: this.baseinfodata.subType,
				type: 'GPR',
				supplierSapCode: '11138',
				tmSupplierId: '50001031',
				normalPrQuantityYears: [],
			})
			this.itemNum += 10
			// this.getTableList()
		},

		// 删除项次
		deleteItem() {
			// let result = []
			// let deleteList = []
			if (this.selectTableData.length == 0) {
				return iMessage.warn('请先选择数据')
			}
			const remainingItems = this.tableListData.filter(
				(e) => !this.selectTableData.includes(e)
			)
			const itemIds = this.selectTableData.map((e) => e.purchasingRequirementId) // 所有已选中项的ID
			const existItemIds = itemIds.filter((e) => e) // 数据库在已存在的ID
			if (!existItemIds.length) {
				this.tableListData = remainingItems
			} else {
				deleteNormalPr(existItemIds).then(() => {
					this.tableListData = remainingItems
				})
			}
			// }
			// this.tableListData.forEach((tableItem) => {
			// 	let canAdd = true
			// 	this.selectTableData.forEach((selectItem) => {
			// 		if (selectItem.sapItem == tableItem.sapItem) {
			// 			canAdd = false
			// 		}
			// 		if (selectItem.riseCode) {
			// 			deleteList.push(selectItem.purchasingRequirementId)
			// 		}
			// 	})
			// 	if (canAdd) {
			// 		result.push(tableItem)
			// 	}
			// })
			// deleteList = Array.from(new Set(deleteList))
			// if (deleteList.length > 0) {
			// 	deleteNormalPr(deleteList)
			// 		.then((res) => {})
			// 		.catch((err) => {})
			// }
			// this.tableListData = result
			// if (
			// 	this.tableListData.length < this.page.currPage * 10 &&
			// 	this.tableListData.length > 10
			// ) {
			// 	this.page.currPage -= 1
			// }
			// this.getTableList()
		},
		//字典
		getProcureGroup() {
			dictkey().then((res) => {
				if (res.data) {
					this.fromGroup = res.data
				}
			})
		},
		// 獲取選項數據
		handleSelectionChange(val) {
			this.selectTableData = val
		},
		//导出
		exportExcel() {
			applyExport(this.baseinfodata.riseCode)
				.then((res) => {
					console.log('EXPORT EXCEL:', res)
					exportExcel(res.data, `工序委外${this.baseinfodata.riseCode}`)
				})
				.catch((err) => {
					console.log('exportExcel err', err)
					iMessage.error(err.desZh || '导出失败')
				})
		},

		// 获取头部信息
		getTableHaderInfo() {
			let params = {
				riseCode: this.baseinfodata.riseCode,
			}
			findNormalPrById(params).then((res) => {
				if (res.data) {
					this.baseinfodata = { ...res.data[0] }
					this.tableListData = res.data.map(item=>{
						item.storageLocation = item.storageLocationCode&&(item.storageLocationCode+'-'+item.storageLocationDesc)||''
						return item
					})
				}
			})
		},
		// 导入回调函数
		async uploadAttachments(formData) {
			this.uploadAttachmentsButtonLoading = true
			const msg = await applyImport(formData)
			if (+msg?.code === 200) {
				this.uploadAttachmentsButtonLoading = false
				this.canEdit = false
				this.tableListData = []
				if (this.baseinfodata.riseCode) {
					// this.getTableListFn()
				} else {
					this.tableListData = msg.data
					// this.getTableList()
				}
				if (msg.desZh == null || msg.desZh == '') {
					return iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
				} else {
					return this.$message({
						dangerouslyUseHTMLString: true,
						message:
							this.$i18n.locale === 'zh'
								? msg.desZh.replace(/\n|\r\n/g, ' <br/> ')
								: msg.desEn.replace(/\n|\r\n/g, ' <br/> '),
						type: 'error',
					})
				}
			} else {
				this.uploadAttachmentsButtonLoading = false
				return iMessage.error(
					msg.desZh == null
						? '导入失败'
						: this.$i18n.locale === 'zh'
						? msg.desZh
						: msg.desEn
				)
			}
		},
		//查看日志
		lookLog() {
			this.logDialogVisible = true
		},
	},
}
</script>

<style lang="scss" scoped>
.partsprocureHome {
	position: relative;

	.pageTitle {
		font-size: 20px;
		font-weight: bold;
		color: #001847;
	}
	.card {
		::v-deep .el-dropdownbtn {
			.canzhao {
				font-size: 16px;
			}
		}
		::v-deep .el-form {
			display: flex;
			align-items: center;
		}
		::v-deep .cardHeader {
			.title {
				color: #131523;
				font-weight: bold;
				font-size: 18px;
			}
		}
		.searchbar {
			position: absolute;
		}
	}
	.titlelist {
		margin-top: 20px;
		.ajia-list {
			display: flex;
			flex-direction: row;
			> ul {
				display: flex;
				flex-direction: row;
				> li {
					cursor: pointer;
					width: 122px;
					height: 25px;
					display: flex;
					align-items: center;
					justify-content: center;
					> span {
						font-size: 18px;
						font-family: Arial;
						font-weight: 400;
						line-height: 25px;
						color: #000000;
						opacity: 0.42;
					}
					&:not(:last-child) {
						height: 25px;
						border-right: 1px solid #909091;
					}
				}
				.active {
					> span {
						font-weight: bold;
						opacity: 1;
						color: #1660f1;
					}
				}
			}
		}
		.btnList {
			> button {
				font-size: 16px;
				font-family: Arial;
				font-weight: bold;
				line-height: 18px;
			}
		}
	}
	.top {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 50px;
		> span {
			width: 150px;
		}
		.select {
			width: 300px;
		}
	}

	.card-row {
		margin-top: 20px;
	}
	.margin-bottom20 {
		margin-top: 20px;
	}
	.btnList {
		> span {
			font-size: 20px;
			margin-left: 20px;

			// opacity: 0.5;
			.log {
				font-size: 16px;
				color: #1660f1;
				margin-left: 5px;
			}
		}
	}
	.tab {
		::v-deep .el-tabs__header {
			position: absolute;
			top: 20px;
			transform: translate(0, 5px);
			z-index: 1;

			.el-tabs__nav-wrap::after {
				background: transparent;
			}

			.el-tabs__active-bar {
				height: 3px;
				background: $color-blue;
				border-radius: 2px;
			}

			.el-tabs__item {
				font-size: 18px;
				color: #000000;
				opacity: 0.42;
				height: 35px;
				line-height: 35px;

				& + & {
					padding: 0 25px;
				}
			}

			.is-active {
				opacity: 1;
				font-weight: bold;
			}
		}
		.tabs {
			display: flex;
			flex-direction: column;
			cursor: pointer;
			height: 24px;
			line-height: 24px;
			> ul {
				display: flex;
				flex-direction: row;
				> li {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 110px;
					font-size: 20px;
					font-family: Arial;
					font-weight: 400;
					line-height: 23px;
					color: #727272;
					opacity: 1;
				}
				.active {
					font-size: 20px;
					font-family: Arial;
					font-weight: bold;
					line-height: 23px;
					color: #000000;
					border-radius: 2px;
					padding-bottom: 5px;
					border-bottom: 2px solid #1763f7;
				}
			}
		}
	}

	.table-top {
		display: flex;
		flex-direction: row;
		align-items: top;
		justify-content: space-between;
		height: 50px;
		> span {
			width: 150px;
		}

		::v-deep .itext {
			width: 250px;
		}
	}
	.width500 {
		width: 590px;
	}
	.row {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: space-between;

		.col {
			width: 395px;
			// border-right: 1px solid $color-border;
			margin-right: 10px;
			padding-right: 20px;
			display: flex;
			flex-direction: column;
			&:last-child {
				margin-right: 0px;
				border-right: none;
			}
		}

		.items {
			width: 300px;
		}
	}
}
</style>
