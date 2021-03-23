<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 10:09:36
 * @LastEditTime: 2021-03-23 15:40:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\editordetail\index.vue
-->
<template>
	<iPage>
		<!------------------------------------------------------------------------>
		<!--                  详情页头部保存区域                                  --->
		<!------------------------------------------------------------------------>
		<div class="margin-bottom20 clearFloat">
			<span class="font18 font-weight">零件采购项目</span>
			<div class="floatright">
				<iButton @click="start">启动项目</iButton>
				<iButton @click="creatFs">生成FS/GSNR</iButton>
				<iButton @click="openDiologBack">取消零件采购项目</iButton>
				<iButton @click="splitPurch">拆分采购工厂</iButton>
				<iButton @click="openDiologClose">结束项目</iButton>
				<iButton @click="save">保存</iButton>
				<iButton @click="back">返回</iButton>
				<logButton class="margin-left20" @click="log" />
				<span>
					<icon symbol name="icondatabaseweixuanzhong"></icon>
				</span>
			</div>
		</div>

		<!------------------------------------------------------------------------>
		<!--                  基本信息区域                                       --->
		<!------------------------------------------------------------------------>
		<iCard>
			<iFormGroup row="1" inline :rules="rules">
				<div class="row">
					<div class="col">
						<iFormItem label="零件号：" name="test">
							<iText>
								{{ detailData.detailData }}
							</iText>
						</iFormItem>
						<iFormItem label="零件名称（中）：" name="test">
							<iText>
								{{ detailData.partNameZh }}
							</iText>
						</iFormItem>
						<iFormItem label="零件项目类型：" name="test">
							<iSelect v-model="detailData.partPrejectType"> </iSelect>
						</iFormItem>
						<iFormItem label="采购工厂：" name="test">
							<iSelect v-model="detailData.procureFactory"></iSelect>
						</iFormItem>
						<iFormItem label="Common Sourcing：" name="test">
							<iSelect v-model="detailData.commonSourcing"></iSelect>
						</iFormItem>
					</div>
					<div class="col">
						<iFormItem label="FSNR/GSNR/SPNR：" name="test">
							<iText>
								{{ detailData.commonSourcing }}
							</iText>
						</iFormItem>
						<iFormItem label="零件名称（德）：" name="test">
							<iText>
								{{ detailData.partNameDe }}
							</iText>
						</iFormItem>
						<iFormItem label="零件类型：" name="test">
							<iSelect> </iSelect>
						</iFormItem>
						<iFormItem label="单位：" name="test">
							<iSelect v-model="detailData.unit"></iSelect>
						</iFormItem>
						<iFormItem label="MTZ零件：" name="test">
							<iSelect v-model="detailData.mtzPart"></iSelect>
						</iFormItem>
					</div>
					<div class="col">
						<iFormItem label="询价采购员：" name="test">
							<iText>
								{{ detailData.buyerName }}
							</iText>
						</iFormItem>
						<iFormItem label="LINIE部门：" name="test">
							<iSelect v-model="detailData.linieDept"></iSelect>
						</iFormItem>
						<iFormItem label="LINIE：" name="test">
							<iSelect v-model="detailData.linieName"></iSelect>
						</iFormItem>
						<iFormItem label="CF控制员：" name="test">
							<iSelect v-model="detailData.cfController"></iSelect>
						</iFormItem>
					</div>
					<div class="col">
						<iFormItem label="签收日期：" name="test">
							<iText>
								{{ detailData.signDate }}
							</iText>
						</iFormItem>
						<iFormItem label="SOP日期：" name="test">
							<iText>
								{{ detailData.sopDate }}
							</iText>
						</iFormItem>
						<iFormItem label="零件状态：" name="test">
							<iText>
								{{ detailData.partStatus }}
							</iText>
						</iFormItem>
						<iFormItem label="BMG：" name="test">
							<iText>
								{{ detailData.bmg }}
							</iText>
						</iFormItem>
					</div>
				</div>
			</iFormGroup>
		</iCard>
		<iTabsList class="margin-top20" type="border-card">
			<el-tab-pane label="材料组信息">
				<materialGroupInfo />
			</el-tab-pane>
			<el-tab-pane label="零件产量计划">
				<outputPlan />
				<outputRecord class="margin-top20" />
				<usage class="margin-top20" />
			</el-tab-pane>
			<el-tab-pane label="图纸和TP详情页">
				<drawing />
				<sheet class="margin-top20" />
			</el-tab-pane>
			<el-tab-pane label="物流要求">
				<logistics :infoItem="infoItem"></logistics>
			</el-tab-pane>
			<el-tab-pane label="申请目标价">
				<targePrice :targetprice="targetprice"></targePrice>
			</el-tab-pane>
			<el-tab-pane label="备注信息">
				<remarks :detailData="detailData"></remarks>
			</el-tab-pane>
		</iTabsList>
		<backItems v-model="diologBack" @sure="cancel" title="取消零件采购"></backItems>
		<!-- 结束项目 -->
		<backItems v-model="diologClose" @sure="cancel" title="结束项目"></backItems>
		<!------------------------------------------------------------------------>
		<!--                  拆分采购工厂                                       --->
		<!------------------------------------------------------------------------>
		<iDialog class="dialog" :visible.sync="splitPurchBoolean">
			<template slot="title"><span class="el-dialog__title">拆分采购工厂</span></template>
			<template>
				<el-table :height="height" :data="splitPurchList" v-loading="tableLoading"
					@selection-change="handleSelectionChange" width='500'>
					<el-table-column type="selection" width="50" align="center"></el-table-column>
					<template v-for="(items, index) in splitPurchTitle">
						<el-table-column :key="index" v-if="items.props == 'name'" :label="items.name"
							:prop="items.props" width="200"></el-table-column>
						<el-table-column v-else :key="index" :label="items.name" width="150">
							<template slot-scope="scope">
								<iInput v-model="scope.row[items.props]"></iInput>
							</template>
						</el-table-column>
					</template>
					<el-table-column></el-table-column>
				</el-table>
			</template>
		</iDialog>
	</iPage>
</template>
<script>
	import {
		iPage,
		iFormGroup,
		iFormItem,
		iCard,
		iText,
		iSelect,
		iButton,
		iTabsList,
		iDialog,
	} from "@/components";
	import logistics from "./components/logistics";
	import targePrice from "./components/targetPrice";
	import materialGroupInfo from "./components/materialGroupInfo";
	import outputPlan from "./components/outputPlan/outputPlan";
	import outputRecord from "./components/outputPlan/outputRecord";
	import usage from "./components/outputPlan/usage";
	import drawing from "./components/drawingSheet/drawing";
	import sheet from "./components/drawingSheet/sheet";
	import remarks from "./components/remarks";
	import backItems from "@/views/partsign/home/components/backItems";
	import {
		getPageGroup
	} from "@/api/partsign/home";
	import logButton from "@/views/partsign/editordetail/components/logButton";
	import {
		getTabelData,
		changeProcure
	} from "@/api/partsprocure/home";
	import {
		detailData,
		splitPurchTitle
	} from "./components/data";
	export default {
		components: {
			iPage,
			iFormGroup,
			iFormItem,
			iCard,
			iText,
			iSelect,
			iButton,
			iTabsList,
			logistics,
			targePrice,
			materialGroupInfo,
			outputPlan,
			outputRecord,
			usage,
			drawing,
			sheet,
			remarks,
			logButton,
			backItems,
			iDialog,
		},
		data() {
			return {
				infoItem: {},
				detailData: detailData, //顶部详情数据
				targetprice: {}, //申请目标价数据
				fromGroup: {}, //上方筛选列表
				diologBack: false, //取消零件采购
				diologClose: false, //结束项目
				splitPurchBoolean: false,
				splitPurchList: [],
				selectSplitPurchList: [],
				splitPurchTitle: splitPurchTitle,
			};
		},
		created() {
			this.infoItem = JSON.parse(this.$route.query.item);
			this.getDatail();
			// this.getPageGroup()
		},
		methods: {
			// ----------打开拆分采购工厂模块-----------------------
			handleSelectionChange(val) {
				this.selectSplitPurchList = val;
			},
			splitPurch() {
				this.splitPurchBoolean = !this.splitPurchBoolean;
			},
			//---------------------------------------------------
			// 获取详情数据
			getDatail() {
				let data = {
					"detailBaseReq.partNum": this.infoItem.partNum,
				};
				getTabelData(data).then((res) => {
					this.detailData = res.data.detailData;
					this.targetprice = res.data.targetprice
				});
			},
			//获取上方group信息
			getPageGroup() {
				getPageGroup(1).then((res) => {
					this.fromGroup = res.data.groupStatSenarioResult.groupStatInfoList;
				});
			},
			// 启动项目
			start() {
				let start = {
					operator: "112",
					purchaseProjectIds: [this.infoItem.purchasePrjectId],
				};
				changeProcure({
					start,
				}).then((res) => {
					this.getDatail();
				});
			},
			//退回
			openDiologClose() {
				this.diologClose = true;
			},
			// 结束项目
			close(backmark) {
				let close = {
					closeRemark: backmark,
					operator: "112",
					purchaseProjectIds: [this.infoItem.purchasePrjectId],
				};
				changeProcure({
					close,
				}).then((res) => {
					this.getDatail();
				});
			},
			//修改详情。
			save(val) {
				let baseInfo = this.detailData;
				changeProcure({
						baseInfo,
					})
					.then((res) => {
						this.diologChangeItems = false;
						this.getDatail();
					})
					.catch(() => {
						this.diologChangeItems = false;
					});
			},
			// 生成fs号
			creatFs() {
				let fs = {
					purchaseProjectIds: [this.infoItem.purchasePrjectId],
				};
				changeProcure({
					fs,
				}).then((res) => {
					this.getDatail();
				});
			},
			//退回
			openDiologBack() {
				this.diologBack = true;
			},
			// 取消零件采购
			cancel(backmark) {
				let cancel = {
					cancelRemark: backmark,
					purchaseProjectIds: [this.infoItem.purchasePrjectId],
				};
				changeProcure({
						cancel,
					})
					.then((res) => {
						this.diologBack = false;
						this.getDatail();
					})
					.catch(() => {
						this.diologBack = false;
					});
			},
			// 返回
			back() {
				this.$router.go(-1);
			}, // 查看日志
			log() {
				window.open(
					`/#/log?recordId=${this.detailData.purchasePrjectId}`,
					"_blank"
				);
			},
		},
	};
</script>
<style lang="scss" scoped>
	.row {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: space-between;

		.col {
			width: 395px;
			border-right: 1px solid $color-border;
			margin-right: 10px;
			padding-right: 20px;

			&:last-child {
				margin-right: 0px;
				border-right: none;
			}
		}

		.items {
			width: 300px;
		}
	}
</style>
