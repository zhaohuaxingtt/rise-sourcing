<!--
* @author:shujie
* @Date: 2021-2-25 11:42:11
 * @LastEditors: Please set LastEditors
* @Description: 待办事项-零件清单
 -->
<template>
	<iCard>
		<div class="header flex-align-center">
			<iButton>删除</iButton>
			<iButton @click="showApplyPrice">新申请财务目标价</iButton>
			<iButton @click="againApply">再新申请财务目标价</iButton>
		</div>
		<tableList :tableData="confirmTableListData" :tableTitle="tableTitle" :tableLoading="confirmTableLoading"
			@handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
		<iPagination @size-change="handleSizeChange($event, getTableList)"
			@current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
			:page-size="page.pageSize" :layout="page.layout" :total="page.totalCount"></iPagination>
		<di class="addFs flex-align-center">
			<iButton @click="addFsList">添加</iButton>
		</di>
		<partsTable  :rfqId="rfqId"></partsTable>
		<!-- 新申请财务目标价 -->
		<applyPrice ref="applyPrice"></applyPrice>
	</iCard>
</template>

<script>
	import {
		iButton,
		iCard,
		iPagination,
	} from "@/components";
	import tableList from "@/views/partsign/home/components/tableList";
	import {
		tableTitle,
		form
	} from "@/views/partsprocure/home/components/data";
	import {
		getTabelData
	} from '@/api/partsprocure/home';
	import {
		pageMixins
	} from "@/utils/pageMixins";
	import applyPrice from "./components/applyPrice";
	import partsTable from './components/partsTable'
	export default {
		mixins: [pageMixins],
		components: {
			iButton,
			iCard,
			tableList,
			iPagination,
			applyPrice,
			partsTable
		},
		created() {
			// this.getConfirmTableList();
			this.rfqId = this.$route.query.id
			this.getTableList();
		},
		data() {
			return {
				tableTitle,
				tableListData: [],
				confirmTableListData: [], //已确认的零件列表
				tableLoading: false,
				confirmTableLoading: false,
				handleSelectArr: [], //选中添加零件清单数据
				applyPriceShow: false, //显示财务申请价
				parmarsHasRfq: JSON.parse(JSON.stringify(form)),
				// parmarsNotHasRfq: JSON.parse(JSON.stringify(form)),
				rfqId: "",
			};
		},
		methods: {
			// 已确认零件
			confirmHandleSelectionChange(e) {},
			// 待选零件
			handleSelectionChange(e) {
				this.handleSelectArr = e;
			},
			openPage() {
				console.log(1);
			},
			// 添加FS零件列表
			addFsList() {
				this.confirmTableListData = this.confirmTableListData.concat(
					this.handleSelectArr
				);
			},
			//获取表格数据
			getTableList() {
				this.confirmTableLoading = true
				this.parmarsHasRfq['search.size'] = this.page.pageSize
				this.parmarsHasRfq['search.current'] = this.page.currPage
				this.parmarsHasRfq['search.rfqId'] = this.rfqId
				this.parmarsHasRfq['search.partStatus'] = '12'
				getTabelData(this.form).then(res => {
					this.confirmTableLoading = false
					this.page.currPage = res.data.pageData.pageNum
					this.page.pageSize = res.data.pageData.pageSize
					this.page.totalCount = res.data.pageData.total
					this.confirmTableListData = res.data.pageData.data
				}).catch(() => this.confirmTableLoading = false)
				// this.parmarsNotHasRfq['search.size'] = this.page.pageSize
				// this.parmarsNotHasRfq['search.current'] = this.page.currPage
				// this.parmarsNotHasRfq['search.rfqId'] = this.rfqId
				// this.parmarsNotHasRfq['search.partStatus'] = '12'
				// getTabelData(this.form).then(res => {
				// 	this.tableLoading = false
				// 	this.page.currPage = res.data.pageData.pageNum
				// 	this.page.pageSize = res.data.pageData.pageSize
				// 	this.page.totalCount = res.data.pageData.total
				// 	this.tableListData = res.data.pageData.data
				// }).catch(() => this.tableLoading = false)
			},
			// 获取已确认表格数据
			getConfirmTableList() {},
			// 新申请财务目标价
			showApplyPrice() {
				this.$refs.applyPrice.show()
			},
			// 再次申请财务目标价
			againApply() {
				this.$refs.applyPrice.againShow()
			}
		},
	};
</script>

<style lang="scss" scoped>
	.header {
		justify-content: flex-end;
		margin-bottom: 20px;
	}

	.addFs {
		height: 85px;
		justify-content: flex-end;
	}
</style>
