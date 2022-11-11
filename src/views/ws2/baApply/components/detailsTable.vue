<!--
 * @Author: your name
 * @Date: 2021-07-12 20:18:28
 * @LastEditTime: 2021-11-06 12:36:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\views\ws2\baApply\components\detailsTable.vue
-->
<template>
	<div>
		<div class="page-head">
			<iButton @click="takeChange(false)">{{
				$t('SHIXIAO')
			}}</iButton>
			<iButton @click="takeChange(true)">{{
				$t('SHENGXIAO')
			}}</iButton>
			<iButton @click="applyBA" :loading="applyLoading">{{
				$t('LK_APPLYBANUMBER')
			}}</iButton>
		</div>

		<iTableList
			:tableData="tableListData"
			:tableTitle="tableTitle"
			:tableLoading="tableLoading"
			@handleSelectionChange="handleSelectionChange"
			:activeItems="'partNum'"
		>
			<template #baNum="scope">
				<div>{{ scope.row.baNum === '' ? '无' : scope.row.baNum }}</div>
			</template>
			<template #rsNum="scope">
				<a v-if="scope.row.dataType == 1" @click="openViewPdf(scope.row)" class="detailed">{{
					scope.row.rsNum
				}}</a>
				<a class="detailed" v-else @click="openViewAeko(scope.row)">{{scope.row.rsNum}}</a>
			</template>
			<template #sourceType="scope">
				<span>{{scope.row.sourceType==1?"定点":scope.row.sourceType==3?"AEKO增值":scope.row.sourceType==2?"AEKO减值":""}}</span>
			</template>
			
		</iTableList>

		<!-- 申请BA单弹窗 -->
		<ApplyPopup
			ref="ApplyPopup"
			:visible="visible"
			@changeLayer="changeLayer"
			@confirm="layerConfirm"
		>
			<span slot="nameArry" class="span-color">
				{{ nameList }}
			</span>

			<template slot="table">
				<template v-for="(item, index) in tableLayerListData.listDate">
					<iTableList
						:getSummaries="getSummaries"
						:tableData="item"
						:tableTitle="tableLayerTitle"
						:tableLoading="tableLayerLoading"
						:selection="false"
						:show-summary="true"
						:key="index"
						style="margin-bottom: 36px"
						class="baApply-table"
					>
						<template #locationFactoryName="scope">
							<div v-if="scope.row.locationFactoryName">
								{{ scope.row.locationFactoryName }}
							</div>
							<div v-else></div>
						</template>
						<template #deptName="scope">
							<div v-if="scope.row.deptName">{{ scope.row.deptName }}</div>
							<div v-else></div>
						</template>
						<template #amount="scope">
							<iInput
								:placeholder="$t('LK_QINGSHURU')"
								v-model="scope.row.amount"
								v-if="scope.row.dataType == 'Aeko'"
								maxlength="20"
							></iInput>
							<div v-else>{{ $postThousandth(scope.row.amount) }}</div>
						</template>
					</iTableList>
				</template>
			</template>
			<template slot="historyTable">
				<div class="hTitle">{{$t("历史申请记录")}}</div>
				<iTableList
					:tableData="tableLayerListData.historyList"
					:tableTitle="historyTitleList"
					:tableLoading="tableLayerLoading"
					:selection="false"
					:key="index"
					style="margin-bottom: 36px"
					class="baApply-table"
				>
					<template #locationFactoryName="scope">
						<div v-if="scope.row.locationFactoryName">
							{{ scope.row.locationFactoryName }}
						</div>
						<div v-else></div>
					</template>
					<template #deptName="scope">
						<div v-if="scope.row.deptName">{{ scope.row.deptName }}</div>
						<div v-else></div>
					</template>
					<template #amount="scope">
						<div>{{ $postThousandth(scope.row.amount) }}</div>
					</template>
				</iTableList>
			</template>
			
		</ApplyPopup>
	</div>
</template>

<script>
import { tableHeight } from '@/utils/tableHeight'
import { detailsTableHead, layerTableHead1, layerTableHead2,historyTitle1,historyTitle2 } from './data'
import { iButton, iMessage, iInput } from 'rise'
import {
	getDetail,
	baConfirm,
	downloadExport,
} from '@/api/ws2/baApply/baCommodityApply'
import ApplyPopup from './applyPopup'
import store from '@/store'
import { iTableList } from '@/components'
import { 
  updatePartsApply
} from "@/api/ws2/baApply";


export default {
	props: {
		tableListData: { type: Array, default: () => [] },
		tableLoading: { type: Boolean, default: false },
	},
	computed: {
		// nameList(){
		//   const ksy1 = store.state.permission.whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_TOTAL'];  //  是否有汇总页面权限
		//   const key = ksy1 ? 'baNum' : 'carTypeName';
		//   return this.selectTableData.map(item => item[key]).join('、');
		// }
	},
	data() {
		return {
			tableTitle: detailsTableHead,
			selectTableData: [],
			visible: false,
			tableLayerListData: {
				listDate:[],
				historyList:[],
			},
			tableLayerTitle: [],
			tableLayerLoading: false,
			applyLoading: false,
			nameList: '',
			historyTitleList:[],
		}
	},
	mixins: [tableHeight],
	components: {
		iTableList,
		iButton,
		ApplyPopup,
		iInput,
	},

	methods: {
		takeChange(val){//生效
			if(this.selectTableData.length<1){
				return iMessage.error(this.$t("LK_BAAPPLYTISP1"))
			}
			const t = this.selectTableData.filter(e=>e.moldStatus == 2 || e.moldStatus == 3)
			if(t.length>0){
				return iMessage.error(this.$t("勾选数据中存在模具预算状态为审批中或已审批，不能点击此按钮"))
			}

			const list = this.selectTableData.reduce((a,b)=>{
				if(a){
					return [...a,b.id]
				}
			},[])
			updatePartsApply({
				ids:list,
				type:val,
			}).then(res=>{
				if(res.result){
					iMessage.success('操作成功')
				}else{
					iMessage.error('操作失败')
				}

				this.$emit("refresh")
			})
		},
		openViewAeko(row){
			let routeData = this.$router.resolve({
				path: '/aeko/aekodetail',
				query: {
					from: "stance",
					requirementAekoId: row.requirementAekoId,
				},
			})
			window.open(routeData.href, '_blank')
		},
		//  预览RSpdf
		openViewPdf(scope) {
			const nomiType = scope.nomiType || '1'
			if (nomiType == '3') {
				let routeData = this.$router.resolve({
					path: '/tooling/investmentReport/rsDetails',
					query: {
						rsNum: scope.rsNum,
						pageType: 0,
					},
				})
				window.open(routeData.href, '_blank')
			} else {
				const roleList = this.$store.state.permission.userInfo.roleList
				const isFlag = roleList.some((item) =>
					['CWMJKZY', 'CWMJKZGZ', 'CWMJKZKZ'].includes(item.code)
				)
				console.log('roleListroleListroleList', roleList, isFlag)
				const url =
					process.env.VUE_APP_TOOLING +
					'/baCommodityApply' +
					'/exportRsFull/' +
					scope.rsNum +
					'?flag=' +
					!isFlag
				window.open(url)
			}
		},

		downloadExport(amount) {
			let carTypeName = this.selectTableData[0].carTypeName
			this.selectTableData[0].carTypeName = carTypeName.replace(/\//g, '%2F')
			downloadExport({
				aekoAmount: amount ? amount : 0,
				body: this.selectTableData,
			}).then((res) => {
				if (res.code === '0') {
					iMessage.success('操作成功')
				} else {
					iMessage.error('操作失败')
				}
			})
		},

		layerConfirm(val) {
			const param = {
				applyTitleName:val,
				baAccountType: this.$store.state.baApply.baAcountType,
				baPartsApplyDTOS: this.tableLayerListData.baPartsApplyDTOS,
				listDate: this.tableLayerListData.listDate,
			}
			baConfirm(param).then((res) => {
				const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
				if (res.data) {
					iMessage.success(result)
					this.visible = false
					const l = res.data.listDate[0].length - 1
					this.downloadExport(res.data.listDate[0][l].amount)
					this.$emit('handelConfirmSuccess')
				} else {
					iMessage.error(result)
				}
			})
		},

		changeLayer(visible) {
			this.visible = visible
		},

		getSummaries(param) {
			const { columns, data } = param
			const sums = []

			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = 'Total'
					return
				}
				if (column.property === 'amount') {
					console.log(column)
					//  只有金额字段才需要显示总价
					const values = data.map((item) => Number(item[column.property]))
					console.log('values', values)
					if (!values.every((value) => isNaN(value))) {
						const number = values.reduce((prev, curr) => {
							const value = Number(curr)
							if (!isNaN(value)) {
								return prev + curr
							} else {
								return prev
							}
						}, 0)
						sums[index] = this.$postThousandth(number);
					} else {
						sums[index] = 'N/A'
					}
				} else {
					sums[index] = ''
				}
			})
			return sums
		},

		//  申请BA单
		applyBA() {
			if (!this.selectTableData.length) {
				return iMessage.warn(this.$t('LK_BAAPPLYTISP1'))
			}
			const t = this.selectTableData.filter(e=>e.moldStatus == 5)
			if(t.length>0){
				return iMessage.error(this.$t("勾选数据中存在模具预算状态为失效，不能点击此按钮"))
			}
			
			const ksy1 =
				store.state.permission.whiteBtnList[
					'TOOLING_BUDGET_BAAPPLICATION_TOTAL'
				] //  是否有汇总页面权限
			const key = ksy1 ? 'carTypeName' : 'locationFactoryName'
			this.nameList = this.selectTableData.map((item) => item[key]).join('、')
			this.getDetail()
		},

		getDetail() {
			this.applyLoading = true
			getDetail(this.selectTableData).then((res) => {
				console.log('明细：', res)
				const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn

				if (res.data) {
					const ksy1 =
						store.state.permission.whiteBtnList[
							'TOOLING_BUDGET_BAAPPLICATION_TOTAL'
						] //  是否有汇总页面权限
					this.tableLayerTitle = ksy1 ? layerTableHead1 : layerTableHead2
					this.tableLayerListData = res.data

					this.historyTitleList = ksy1 ? historyTitle1 : historyTitle2
					this.visible = true
					this.$refs.ApplyPopup.applyTitleName = res.data.applyTitleName
					this.applyLoading = false
				} else {
					iMessage.error(result)
					this.applyLoading = false
				}
			}).catch(res=>{
				this.applyLoading = false
			})
		},

		handleSelectionChange(val) {
			this.selectTableData = val
		},
	},
}
</script>

<style lang="scss" scoped>
.baApply-table {
	::v-deep .el-input__inner {
		width: 120px !important;
	}

	::v-deep .el-table__footer-wrapper .is-center {
		color: #000 !important;
		font-weight: bold !important;
	}
}
.span-color {
	color: #1660f1;
}
.page-head {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 20px;
}
.detailed {
	color: #1663f6;
	text-decoration: underline;
	font-family: Arial;
	cursor: pointer;
}
.hTitle{
	margin-bottom: 20px;
    font-size: 15px;
    font-weight: bold;
}
</style>
