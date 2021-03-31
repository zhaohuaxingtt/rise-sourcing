<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 10:09:36
 * @LastEditTime: 2021-03-27 13:41:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\editordetail\index.vue
-->
<template>
	<iPage class="partsprocureEditordetail" v-permission="PARTSPROCURE_EDITORDETAIL_INDEXPAGE">
		<!-- 零件状态：
			1：无采购项目编号 
			2：未加入RFQ
			3：已加入RFQ  
			4：已申请定点
			5：已冻结
			6：已定点
			7：已结束 
			8：已取消  -->
		<!-- 零件采购项目状态： 
			CLOSED("10", "关闭"),
			END("11", "结束"),
			CANCEL("14", "已取消"),
			START("15", "已启动"),
			NOT_START("16", "未启动"); -->
		<div class="margin-bottom20 clearFloat">
			<span class="font18 font-weight">{{ $t('LK_LINGJIANCAIGOUXIANGMU') }}</span>
			<div class="floatright">
				<iButton @click="start" v-permission="PARTSPROCURE_EDITORDETAIL_STARTUP" v-if="detailData.status=='14'">{{ $t('LK_QIDONGXIANGMU') }}</iButton>
				<iButton @click="creatFs" v-permission="PARTSPROCURE_EDITORDETAIL_GENERATEFSGSNR">{{ $t('LK_SHENGCHENGFS_GSNR') }}</iButton>
				<iButton @click="openDiologBack" v-permission="PARTSPROCURE_EDITORDETAIL_CANCELITEMS">{{ $t('LK_QUXIAOLINGJIANCAIGOUXIANGMU') }}</iButton>
				<iButton @click="splitPurch" v-permission="PARTSPROCURE_EDITORDETAIL_SPLITFACTORY">{{ $t('LK_QIDONGXIANGMU') }}</iButton>
				<iButton @click="openDiologClose" v-permission="PARTSPROCURE_EDITORDETAIL_ENDPROJECT" v-if="detailData.status=='15'">{{ $t('LK_JIESHUXIANGMU') }}</iButton>
				<iButton @click="save" v-permission="PARTSPROCURE_EDITORDETAIL_BASICINFOSAVE">{{ $t('LK_BAOCUN') }}</iButton>
				<iButton @click="back" v-permission="PARTSPROCURE_EDITORDETAIL_RETURN">{{ $t('LK_FANHUI') }}</iButton>
				<logButton class="margin-left20" @click="log" v-permission="PARTSPROCURE_EDITORDETAIL_LOG"/>
				<span>
					<icon symbol name="icondatabaseweixuanzhong"></icon>
				</span>
			</div>
		</div>

		<!------------------------------------------------------------------------>
		<!--                  基本信息区域                                       --->
		<!------------------------------------------------------------------------>
		<iCard class="card" title="基础信息" collapse>
			<iFormGroup row="1" inline :rules="rules">
				<div class="row">
					<div class="col">
						<iFormItem :label="$t('LK_LINGJIANHAO')+':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTNUMBER">
								{{ detailData.partNum }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_LINGJIANMINGZHONG')+':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTNAMEZH">
								{{ detailData.partNameZh }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_LINGJIANXIANGMULEIXING')+':'" name="test">
							<iSelect v-model="detailData.partPrejectType"
								v-permission="PARTSPROCURE_EDITORDETAIL_EVENTITEMTYPE">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('part_preject_type')" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="$t('LK_CAIGOUGONGCHANG')+':'" name="test">
							<iSelect v-model="detailData.procureFactory"
								v-permission="PARTSPROCURE_EDITORDETAIL_PURCHASINGFACTORY">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('procure_factory')" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
						<iFormItem label="Common Sourcing：" name="test">
							<iSelect v-model="detailData.commonSourcing"
								v-permission="PARTSPROCURE_EDITORDETAIL_COMMONSOURCING">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('is_common_sourcing')" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="$t('LK_ZHIFUTIAOKUAN')+':'" name="test" v-if="detailData.partType=='BD'">
							<iSelect v-model="detailData.payClause"
								v-permission="PARTSPROCURE_EDITORDETAIL_NUMBEROFPAYMENT">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('pay_clause')" :key="index"></el-option>
							</iSelect>
						</iFormItem>
					</div>
					<div class="col">
						<iFormItem label="FSNR/GSNR/SPNR：" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_FSNRGSNRSPNR">
								{{ detailData.fsnrGsnrNum }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_LINGJIANMINGCHENGDE')+':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTNUMBERGER">
								{{ detailData.partNameDe }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_LINGJIANLEIXING')+':'" name="test">
							<iSelect v-model="detailData.partType" v-permission="PARTSPROCURE_EDITORDETAIL_PARTTYPE">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('part_type')" :key="index"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="$t('LK_DANWEI')+':'" name="test">
							<iSelect v-model="detailData.unit" v-permission="PARTSPROCURE_EDITORDETAIL_UNIT">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('unit')" :key="index"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="$t('LK_MTZLINGJIAN')+':'" name="test">
							<iSelect v-model="detailData.mtz" v-permission="PARTSPROCURE_EDITORDETAIL_MTZPARTS">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('mtz')" :key="index"></el-option>
							</iSelect>
						</iFormItem>
					</div>
					<div class="col">
						<iFormItem :label="$t('LK_XUNJIACAIGOUYUAN')+':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_INQUIRYBUYER">
								{{ detailData.buyerName }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_LINIEBUMEN')+':'" name="test">
							<iSelect v-model="detailData.linieDept" v-permission="PARTSPROCURE_EDITORDETAIL_LINEDEPARTMENT" :disabled="!detailData.categoryCode" @click="tips">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('linie_dept')" :key="index"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem label="LINIE：" name="test">
							<iSelect v-model="detailData.linieName" v-permission="PARTSPROCURE_EDITORDETAIL_LINE" :disabled="!detailData.categoryCode">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('linie_name')" :key="index"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem label="CF控制员：" name="test">
							<iSelect v-model="detailData.cfController"
								v-permission="PARTSPROCURE_EDITORDETAIL_CFCONTROLLER">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('cf_controller')" :key="index"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="$t('LK_HUOBI')+':'" name="test" v-if="detailData.partType=='BD'">
							<iSelect v-model="detailData.currencyId" v-permission="PARTSPROCURE_EDITORDETAIL_CURRENCY">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('currency_id')" :key="index"></el-option>
							</iSelect>
						</iFormItem>
					</div>
					<div class="col">
						<iFormItem :label="$t('LK_QIANSHOURIQI')+':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_DATEOFRECEIPT">
								{{ detailData.signDate }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_SOPRIQI')+':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_SOPDATE">
								{{ detailData.sopDate }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_LINGJIANZHUANGTAI')+':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTSTATUS">
								{{ detailData.partStatus }}
							</iText>
						</iFormItem>
						<iFormItem label="BMG：" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_BMG">
								{{ detailData.bmg }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_CAIGOUTIAOKUAN')+':'" name="test" v-if="detailData.partType=='BD'">
							<iSelect v-model="detailData.purchaseClause"
								v-permission="PARTSPROCURE_EDITORDETAIL_PURCHASETERMS">
								<el-option :value="item.value" :label="item.label"
									v-for="(item, index) in getGroupList('purchase_clause')" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>

					</div>
				</div>
			</iFormGroup>
		</iCard>
		<iTabsList class="margin-top20" type="border-card">
			<el-tab-pane :label="$t('LK_CAILIAOZUXINXI')" v-permission="PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFORMATION">
				<materialGroupInfo :params="infoItem" />
			</el-tab-pane>
			<el-tab-pane :label="$t('LK_LINGJIANCHANLIANGJIHUA')" v-permission="PARTSPROCURE_EDITORDETAIL_PARTSPRODUCTIONPLAN">
				<outputPlan ref="outputPlan" :params="infoItem" />
				<outputRecord ref="outputRecord" class="margin-top20" :params="infoItem" @updateOutput="updateOutput" />
				<volume ref="volume" class="margin-top20" :params="infoItem" />
			</el-tab-pane>
			<el-tab-pane label="图纸和TP详情页" v-permission="PARTSPROCURE_EDITORDETAIL_DRAWINGSANDTPDETAILSPAGE">
				<drawing :params="infoItem" />
				<sheet class="margin-top20" :params="infoItem" />
			</el-tab-pane>
			<el-tab-pane :label="$t('LK_WULIUYAOQIU')" v-permission="PARTSPROCURE_EDITORDETAIL_LOGISTICSREQUIREMENTS">
				<logistics :infoItem="infoItem"></logistics>
			</el-tab-pane>
			<el-tab-pane :label="$t('LK_SHENQINGMUBIAOJIA')" v-permission="PARTSPROCURE_EDITORDETAIL_APPLYFORTARGETPRICE">
				<targePrice :purchaseProjectId="purchasePrjectId"></targePrice>
			</el-tab-pane>
			<el-tab-pane :label="$t('LK_BEIZHUXINXI')" v-permission="PARTSPROCURE_EDITORDETAIL_REMARKSINFORMATION">
				<remarks :detailData="detailData"></remarks>
			</el-tab-pane>
		</iTabsList>
		<backItems v-model="diologBack" @sure="cancel" :title="$t('LK_QUXIAOLINGJIANCAIGOUXIANGMU')"></backItems>
		<!-- 结束项目 -->
		<backItems v-model="diologClose" @sure="cancel" :title="$t('LK_JIESHUXIANGMU')"></backItems>
		<splitFactory :splitPurchBoolean="splitPurchBoolean" :purchaseProjectId="purchasePrjectId" :update='updateTabs'
			:close='splitPurch'></splitFactory>
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
		iMessage
	} from "@/components";
	import logistics from "./components/logistics";
	import targePrice from "./components/targetPrice";
	import materialGroupInfo from "./components/materialGroupInfo";
	import outputPlan from "./components/outputPlan/outputPlan";
	import outputRecord from "./components/outputPlan/outputRecord";
	import volume from "./components/outputPlan/volume";
	import drawing from "./components/drawingSheet/drawing";
	import sheet from "./components/drawingSheet/sheet";
	import remarks from "./components/remarks";
	import backItems from "@/views/partsign/home/components/backItems";
	import logButton from "@/views/partsign/editordetail/components/logButton";
	import {
		getTabelData,
		changeProcure,getProcureGroup
	} from "@/api/partsprocure/home";
	import {
		detailData
	} from "./components/data";
	import splitFactory from "./components/splitFactory";
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
			volume,
			drawing,
			sheet,
			remarks,
			logButton,
			backItems,
			splitFactory,
		},
		data() {
			return {
				infoItem: {},
				detailData: detailData, //顶部详情数据
				targetprice: {}, //申请目标价数据
				fromGroup: [], //上方筛选列表
				diologBack: false, //取消零件采购
				diologClose: false, //结束项目
				splitPurchBoolean: false,
				purchasePrjectId: "",
			};
		},
		created() {
			this.infoItem = JSON.parse(this.$route.query.item);
			this.purchasePrjectId = this.infoItem.purchasePrjectId;
			this.getDatail();
			this.getProcureGroup();
		},
		methods: {
			splitPurch() {
				this.splitPurchBoolean = !this.splitPurchBoolean;
			},
			//---------------------------------------------------
			// 获取详情数据
			getDatail() {
				let data = {
					"detailBaseReq.purchaseProjectId": this.purchasePrjectId,
				};
				getTabelData(data).then((res) => {
					this.detailData = res.data.detailData;
					if (res.data.targetprice) {
						this.targetprice = res.data.targetprice;
					}
				});
			},
			getProcureGroup() {
				let types=["part_status","cartype_project_zh","cartype_category","part_preject_type","procure_factory"]
				getProcureGroup({types}).then((res) => {
					this.fromGroup = res.data;
				});	
			},
			// 查询fliter数据
			getGroupList(key) {
				if (this.fromGroup.length > 0) {
					let obj = this.fromGroup.find((items) => items.name == key);
					if (!obj) return [];
					return obj.infoList;
				}
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
					if (res.data) {
						iMessage.success("操作成功")
						this.getDatail();
					} else {
						iMessage.error(res.desZh)
					}
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
					if (res.data) {
						this.getDatail();
						iMessage.success("操作成功")
					} else {
						iMessage.error(res.desZh)
					}
				});
			},
			//修改详情。
			save(val) {
				let detailData = {}
				for (let i in this.detailData) {
					if (i != "csfMemo" && i != "linieMemo" && i != "cs1Memo" && i != "csfMeetMemo" && i !=
						"linieMeetMemo" && i != "cs1MeetMemo") {
						detailData[i] = this.detailData[i]
					}
				}
				changeProcure({
						detailData,
					})
					.then((res) => {
						if (res.data) {
							iMessage.success("保存成功")
							this.getDatail();
						} else {
							iMessage.error(res.desZh)
						}
					})
			},
			// 生成fs号
			creatFs() {
				let fs = {
					purchaseProjectIds: [this.infoItem.purchasePrjectId],
				};
				changeProcure({
					fs,
				}).then((res) => {
					if (res.data) {
						this.getDatail();
					} else {
						iMessage.error(res.desZh)
					}
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
						if (res.data) {
							iMessage.success("操作成功")
							this.getDatail();
						} else {
							iMessage.error(res.desZh)
						}
						this.diologBack = false;
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
			// 更新页签
			updateTabs() {
				this.$refs.outputPlan.getData();
				this.$refs.outputRecord.getData();
			},
			// 下拉框逻辑提示
			tips(){
				iMessage.warn("请先设置材料组信息")
			}
		},
	};
</script>
<style lang="scss" scoped>
	.partsprocureEditordetail {
		.card {
			::v-deep .cardHeader {
				.title {
					color: #131523;
					font-weight: bold;
				}
			}
		}
	}

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
