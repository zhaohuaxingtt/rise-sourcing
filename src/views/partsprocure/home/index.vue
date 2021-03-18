<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 09:50:42
 * @LastEditTime: 2021-03-15 14:54:00
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目建立首页。
 * @FilePath: \rise\src\views\partsprocure\home\index.vue
-->
<template>
	<iPage>
		<div class="margin-bottom20">
			<iNav-mvp @change="change" right></iNav-mvp>
		</div>
		<!------------------------------------------------------------------------>
		<!--                  search 搜索模块                                   --->
		<!------------------------------------------------------------------------>
		<iSearch class="margin-bottom20" @sure="sure" @reset="reset">
			<el-form>
				<el-form-item label="零件号">
					<iInput placeholder='请输入零件号,多个逗号分隔' v-model="form['search.partNum']"></iInput>
				</el-form-item>
				<el-form-item label="零件名（中）">
					<iInput placeholder='请输入零件名（中）' v-model="form['search.partNameZh']"></iInput>
				</el-form-item>
				<el-form-item label="FSNR/GSNR/SPNR">
					<iInput placeholder='请输入FSNR/GSNR/SPNR' v-model="form['search.fsnrGsnrNum']"></iInput>
				</el-form-item>
				<el-form-item label="询价采购员">
					<iSelect placeholder='请选择询价采购员' v-model="form['search.buyerName']">
						<!-- <el-option :value="items.value" :label="items.label" v-for="(items,index) in fromGroup.tpInfoType" :key="index"></el-option> -->
					</iSelect>
				</el-form-item>
				<el-form-item label="LINIE">
					<iInput placeholder='请填写LINIE' v-model="form['search.linieName']"></iInput>
				</el-form-item>
				<el-form-item label="零件状态">
					<iSelect placeholder='请选择零件状态' v-model="form['search.partStatus']"></iSelect>
				</el-form-item>
				<!-- 	<el-form-item label="信息单状态">
					<iSelect placeholder='请选择信息单状态' v-model="form['']"></iSelect>
				</el-form-item> -->
				<el-form-item label="车型大类">
					<iSelect placeholder='请选择车型' v-model="form['search.cartypeCategory']"></iSelect>
				</el-form-item>
				<el-form-item label="车型项目">
					<iSelect placeholder='请选择车型项目' v-model="form['search.cartypeProjectZh']"></iSelect>
				</el-form-item>
				<el-form-item label="零件项目类型">
					<iSelect placeholder='请选择零件项目类型' v-model="form['search.partPrejectType']"></iSelect>
				</el-form-item>
				<el-form-item label="采购工厂">
					<iSelect placeholder='请选择采购工厂' v-model="form['search.procureFactory']"></iSelect>
				</el-form-item>
			</el-form>
		</iSearch>
		<iCard>
			<!------------------------------------------------------------------------>
			<!--                  table模块，向外入参表格数据，表头                    --->
			<!------------------------------------------------------------------------>
			<div class="margin-bottom20 clearFloat">
				<span class="font18 font-weight">新建采购项目</span>
				<div class="floatright">
					<iButton @click="creatFs">生成Fs/GsNr</iButton>
					<iButton @click="openDiologBack">取消零件采购</iButton>
					<iButton @click="openBatchmiantain">批量维护</iButton>
					<iButton>启动询价</iButton>
					<iButton @click="openDiologChangeItems">转派</iButton>
				</div>
			</div>
			<tablelist :tableData='tableListData' :tableTitle='tableTitle' :tableLoading='tableLoading'
				@handleSelectionChange='handleSelectionChange' @openPage='openPage' :activeItems='"partNum"'>
			</tablelist>
			<!------------------------------------------------------------------------>
			<!--                  表格分页                                          --->
			<!------------------------------------------------------------------------>
			<iPagination @size-change="handleSizeChange($event,getTableListFn)"
				@current-change="handleCurrentChange($event,getTableListFn)" background :page-sizes="page.pageSizes"
				:page-size="page.pageSize" :layout="page.layout" :total="page.totalCount" />
		</iCard>
		<!------------------------------------------------------------------------>
		<!--                  转派弹出框                                         --->
		<!------------------------------------------------------------------------>
		<changeItems v-model="diologChangeItems" @sure='sureChangeItems' title='零件采购项目转派'></changeItems>
		<backItems v-model="diologBack" @sure="cancel"></backItems>
	</iPage>
</template>
<script>
	import {
		iPage,
		iButton,
		iCard,
		iMessage,
		iPagination,
		iNavMvp,
		iSearch,
		iInput,
		iSelect
	} from '@/components'
	import {
		pageMixins
	} from '@/utils/pageMixins'
	import backItems from "@/views/partsign/home/components/backItems";
	import {
		tableTitle,
		form,
		fromGroup
	} from './component/data'
	import tablelist from '../../partsign/home/components/tableList'
	import {
		getTabelData,
		changeProcure
	} from '@/api/partsprocure/home'
	import changeItems from '../../partsign/home/components/changeItems'
	export default {
		mixins: [pageMixins],
		components: {
			iPage,
			iButton,
			iCard,
			tablelist,
			changeItems,
			iPagination,
			iNavMvp,
			iSearch,
			iInput,
			iSelect,
			backItems
		},
		data() {
			return {
				tableListData: [],
				tableLoading: false,
				tableTitle: tableTitle,
				selectTableData: [],
				diologChangeItems: false,
				form: form,
				fromGroup: fromGroup,
				diologBack: false, //退回
			}
		},
		created() {
			this.getTableListFn();
		},
		computed: {},
		methods: {
			openPage() {
				this.$router.push({
					path: '/partsprocure/editordetail'
				})
			},
			//转派
			openDiologChangeItems() {
				if (this.selectTableData.length == 0) return iMessage.warn('抱歉，您当前还未选择您需要转派的零件采购项目！')
				this.diologChangeItems = true;
			},
			//确认转派弹窗值。
			sureChangeItems(val) {
				let transfer = {
					buyerName: JSON.parse(val).label,
					purchaseProjectIds: this.getPurchasePrjectId()
				}
				changeProcure({
					transfer
				}).then(res => {
					this.diologChangeItems = false;
					this.getTableListFn()
				}).catch(() => {
					this.diologChangeItems = false;
				})
			},
			//表格选中值集
			handleSelectionChange(val) {
				this.selectTableData = val
			},
			// 获取零件采购项目相关信息
			getTableListFn() {
				this.tableLoading = true
				this.form['search.size'] = this.page.pageSize
				this.form['search.current'] = this.page.currPage
				getTabelData(this.form).then(res => {
					this.tableLoading = false
					this.page.currPage = res.data.pageData.pageNum
					this.page.pageSize = res.data.pageData.pageSize
					this.page.totalCount = res.data.pageData.total
					this.tableListData = res.data.pageData.data
				}).catch(() => this.tableLoading = false)
			},
			// 查询
			sure() {
				this.getTableListFn()
			},
			// 重置搜索条件
			reset() {
				for (let i in this.form) {
					this.form[i] = ""
				}
				this.getTableListFn()
			},
			//退回
			openDiologBack() {
				if (this.selectTableData.length == 0) return iMessage.warn('抱歉，您当前还未选择您需要取消的零件采购项目！')
				this.diologBack = true;
			},
			// 取消零件采购
			cancel(backmark) {
				let cancel = {
					cancelRemark: backmark,
					purchaseProjectIds: this.getPurchasePrjectId()
				}
				changeProcure({
					cancel
				}).then(res => {
					this.diologBack = false
					this.getTableListFn()
				}).catch(() => {
					this.diologBack = false
				})
			},
			// 生成fs号
			creatFs() {
				if (this.selectTableData.length == 0) return iMessage.warn('抱歉，您当前还未选择您需要生成FS号的零件采购项目！')
				let fs = {
					purchaseProjectIds: this.getPurchasePrjectId()
				}
				changeProcure({
					fs
				}).then(res => {
					this.getTableListFn()
				})
			},
			// 获取选中零件号ID
			getPurchasePrjectId() {
				let purchasePrjectId = []
				this.selectTableData.map(res => {
					purchasePrjectId.push(res.purchasePrjectId)
				})
				return purchasePrjectId
			},
			openBatchmiantain() {
				this.$router.push({
					path: '/partsprocure/batchmiantain'
				})
			}
		}
	}
</script>
<style lang='scss' scoped>
	.checkBox {
		position: relative;
		top: 30px;
		left: -70px;
	}
</style>
