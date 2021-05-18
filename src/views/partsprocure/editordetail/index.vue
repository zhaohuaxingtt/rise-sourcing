<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 10:09:36
 * @LastEditTime: 2021-05-17 15:02:41
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
			NO_RFQ("11", "未加入RFQ"),
			HAS_RFQ("12", "已加入RFQ"),
			APPLICATION_DESIGNAT("13", "已申请定点"),
			FROZEN("14", "已冻结"),
			DESIGNATED("15", "已定点"),
			END("16", "已结束"),
			CANCEL("17", "已取消");
			; -->
		<div class="margin-bottom20 clearFloat">
			<span class="font18 font-weight">{{$t("LK_LINGJIANCAIGOUXIANGMU")}}</span>
			<div class="floatright">
				<iButton @click="start" v-permission="PARTSPROCURE_EDITORDETAIL_STARTUP"
					v-if="detailData.status == '16'">{{ $t("LK_QIDONGXIANGMU") }}</iButton>
				<iButton @click="creatFs" v-permission="PARTSPROCURE_EDITORDETAIL_GENERATEFSGSNR">
					{{ $t("LK_SHENGCHENGFS_GSNR") }}
				</iButton>
				<iButton @click="openDiologBack" v-permission="PARTSPROCURE_EDITORDETAIL_CANCELITEMS">
					{{ $t("LK_QUXIAOLINGJIANCAIGOUXIANGMU") }}
				</iButton>
				<iButton @click="splitPurchFn" v-permission="PARTSPROCURE_EDITORDETAIL_SPLITFACTORY">
					{{ $t("LK_CHAIFENCAIGOUGONGCHANG") }}
				</iButton>
				<iButton @click="openDiologClose" v-permission="PARTSPROCURE_EDITORDETAIL_ENDPROJECT"
					v-if="detailData.status != '16'">{{ $t("LK_JIESHUXIANGMU") }}</iButton>
				<iButton @click="save" v-permission="PARTSPROCURE_EDITORDETAIL_BASICINFOSAVE">{{ $t("LK_BAOCUN") }}
				</iButton>
				<iButton @click="back" v-permission="PARTSPROCURE_EDITORDETAIL_RETURN">{{ $t("LK_FANHUI") }}</iButton>
				<logButton class="margin-left20" @click="log" v-permission="PARTSPROCURE_EDITORDETAIL_LOG" />
				<span>
					<icon symbol name="icondatabaseweixuanzhong"></icon>
				</span>
			</div>
		</div>

		<!------------------------------------------------------------------------>
		<!--                  基本信息区域                                       --->
		<!------------------------------------------------------------------------>
		<iCard class="card" :title="$t('LK_JICHUXINXI')" collapse>
			<iFormGroup row="1" inline :rules="rules">
				<div class="row">
					<div class="col">
						<iFormItem :label="$t('LK_LINGJIANHAO') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTNUMBER">
								{{ detailData.partNum }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_LINGJIANMINGZHONG') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTNAMEZH">
								{{ detailData.partNameZh }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_LINGJIANMINGCHENGDE') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTNUMBERGER">
								{{ detailData.partNameDe }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_LINGJIANXIANGMULEIXING') + ':'" name="test">
							<iSelect v-model="detailData.partPrejectType"
								v-permission="PARTSPROCURE_EDITORDETAIL_EVENTITEMTYPE">
								<el-option :value="item.id" :label="item.name"
									v-for="(item, index) in fromGroup.PART_PROJECT_TYPE" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
						<!--来源为新件信息单的零件采购项目，不可修改车型项目。前端车型项目下拉框应该置为不可修改的状态 --->
						<iFormItem :label="$t('LK_CHEXINGXIANGMU') + ':'" name="test">
							<iSelect :disabled='carTypeCanselect()' v-model="detailData.cartypeProjectZh" v-permission="PARTSPROCURE_EDITORDETAIL_CARTYPEZH">
								<el-option :value="item.id" :label="item.name"
									v-for="(item, index) in fromGroup.CAR_TYPE_PRO" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="$t('LK_CAIGOUTIAOKUAN') + ':'" name="test"
							v-show="detailData.partPrejectType == '46'">
							<iSelect v-model="detailData.purchaseClause"
								v-permission="PARTSPROCURE_EDITORDETAIL_PURCHASETERMS">
								<el-option :value="item.id" :label="item.name" v-for="(item, index) in fromGroup.PURCHASE_RULE" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
					</div>
					<div class="col">
						<iFormItem label="FSNR/GSNR/SPNR：" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_FSNRGSNRSPNR">
								{{ detailData.fsnrGsnrNum }}
							</iText>
						</iFormItem>
						
						<iFormItem :label="$t('LK_LINGJIANLEIXING') + ':'" name="test">
							<iSelect v-model="detailData.partType" v-permission="PARTSPROCURE_EDITORDETAIL_PARTTYPE">
								<el-option :value="item.id" :label="item.name"
									v-for="(item, index) in fromGroup.PART_TYPE" :key="index"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="$t('LK_DANWEI') + ':'" name="test">
							<iSelect v-model="detailData.unit" v-permission="PARTSPROCURE_EDITORDETAIL_UNIT">
								<el-option :value="item.id" :label="item.name" v-for="(item, index) in fromGroup.UNIT"
									:key="index"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="$t('LK_MTZLINGJIAN') + ':'" name="test">
							<iSelect v-model="detailData.mtz" v-permission="PARTSPROCURE_EDITORDETAIL_MTZPARTS">
								<el-option :value="true" label="是"></el-option>
								<el-option :value="false" label="否"></el-option>
							</iSelect>
						</iFormItem>
						<!--如果选择后的采购工厂不在主数据中该车型项目对应的采购工厂范围内？，则提示”您所选的采购工厂与主数据中该车型项目对应的采购工厂不一致，请确认是否修改“；选择”确认“保持修改后的值，选择”取消“恢复到修改前的值。”保存“后生效。--->
						<iFormItem :label="$t('LK_CAIGOUGONGCHANG') + ':'" name="test">
							<iSelect v-model="detailData.procureFactory"
								@change="checkFactory()"
								v-permission="PARTSPROCURE_EDITORDETAIL_PURCHASINGFACTORY">
								<el-option :value="item.id" :label="item.name"
									v-for="(item, index) in fromGroup.PURCHASE_FACTORY" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="$t('LK_ZHIFUTIAOKUAN') + ':'" name="test"
							v-show="detailData.partPrejectType == '46'">
							<iSelect v-model="detailData.payClause"
								v-permission="PARTSPROCURE_EDITORDETAIL_NUMBEROFPAYMENT">
								<el-option :value="item.id" :label="item.name"
									v-for="(item, index) in fromGroup.PAYMENT_RULE" :key="index"></el-option>
							</iSelect>
						</iFormItem>
					</div>
					<div class="col">
						<iFormItem :label="$t('LK_XUNJIACAIGOUYUAN') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_INQUIRYBUYER">
								{{ detailData.buyerName }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_LINIEBUMEN') + ':'" name="test">
							<iSelect v-model="detailData.linieDept"
								v-permission="PARTSPROCURE_EDITORDETAIL_LINEDEPARTMENT">
								<el-option :value="item.id" :label="item.name"
									v-for="(item, index) in fromGroup.LINIE_DEPT" :key="index"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem label="LINIE：" name="test">
							<!-- :disabled="!detailData.categoryCode" -->
							<iSelect v-model="detailData.linieUserId" v-permission="PARTSPROCURE_EDITORDETAIL_LINE">
								<el-option :value="item.code" :label="item.name" v-for="item in fromGroup.LINIE"
									:key="item.name"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="$t('LK_CFKONGZHIYUAN') + ':'" name='cfczy'>
							<iSelect v-model="detailData.cfController" v-permission="PARTSPROCURE_EDITORDETAIL_CFCONTROLLER">
								<el-option :value="item.id" :label="item.name" v-for="item in fromGroup.CF_CONTROL" :key="item.name"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem label="Common Sourcing：" name="test">
							<!--------预设值会有一个联动，如果 为是  零件采购项目类型是fs commonsourcing  如果是否，则是fs零件 ps:和设计刘洋沟通前端不做联动，仅仅在数据初始化时做----------> 
							<iSelect v-model="detailData.isCommonSourcing"
								v-permission="PARTSPROCURE_EDITORDETAIL_COMMONSOURCING">
								<el-option :value="true" label="是"></el-option>
								<el-option :value="false" label="否"></el-option>
							</iSelect>
						</iFormItem>
					</div>
					<div class="col">
						<iFormItem :label="$t('LK_QIANSHOURIQI') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_DATEOFRECEIPT">
								{{ detailData.signDate }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_SOPRIQI') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_SOPDATE">
								{{ detailData.sopDate }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('partsprocure.PARTSPROCUREPARTSTATUSNAME') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTSTATUS">
								{{ detailData.statusName }}
							</iText>
						</iFormItem>
						<iFormItem label="BMG：" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_BMG">
								{{ fillterss(detailData.bmg) }}
							</iText>
						</iFormItem>
						<iFormItem :label="$t('LK_HUOBI') + ':'" name="test"
							v-show="detailData.partPrejectType == '46'">
							<iSelect v-model="detailData.currencyId" v-permission="PARTSPROCURE_EDITORDETAIL_CURRENCY">
								<el-option :value="item.id" :label="item.name"
									v-for="(item, index) in fromGroup.CURRENCY_TYPE" :key="index"></el-option>
							</iSelect>
						</iFormItem>
					</div>
				</div>
			</iFormGroup>
		</iCard>
		<iTabsList class="margin-top20" type="border-card">
			<el-tab-pane :label="$t('LK_CAILIAOZUXINXI')"
				v-permission="PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFORMATION">
				<materialGroupInfo :params="infoItem" />
			</el-tab-pane>
			<el-tab-pane :label="$t('LK_LINGJIANCHANLIANGJIHUA')"
				v-permission="PARTSPROCURE_EDITORDETAIL_PARTSPRODUCTIONPLAN">
				<outputPlan ref="outputPlan" :params="infoItem" @updateStartYear="updateStartYear" />
				<outputRecord ref="outputRecord" class="margin-top20" :params="infoItem" @updateOutput="updateOutput" />
				<volume ref="volume" class="margin-top20" :params="infoItem" />
			</el-tab-pane>
			<el-tab-pane :label="$t('LK_TUZHIHETPDANXIANGQING')"
				v-permission="PARTSPROCURE_EDITORDETAIL_DRAWINGSANDTPDETAILSPAGE">
				<drawing :params="infoItem" />
				<sheet class="margin-top20" :params="infoItem" />
			</el-tab-pane>
			<el-tab-pane :label="$t('LK_WULIUYAOQIU')" v-permission="PARTSPROCURE_EDITORDETAIL_LOGISTICSREQUIREMENTS">
				<logistics :infoItem="infoItem"></logistics>
			</el-tab-pane>
			<el-tab-pane :label="$t('LK_SHENQINGMUBIAOJIA')"
				v-permission="PARTSPROCURE_EDITORDETAIL_APPLYFORTARGETPRICE">
				<targePrice :purchaseProjectId="purchasePrjectId"></targePrice>
			</el-tab-pane>
			<el-tab-pane :label="$t('LK_BEIZHUXINXI')" v-permission="PARTSPROCURE_EDITORDETAIL_REMARKSINFORMATION">
				<remarks :detailData="detailData"></remarks>
			</el-tab-pane>
		</iTabsList>
		<!-- 取消零件采购 -->
		<backItems v-model="diologBack" @sure="cancel" :title="$t('LK_QUXIAOLINGJIANCAIGOUXIANGMU')"></backItems>
		<!-- 结束项目 -->
		<backItems v-model="diologClose" @sure="close" :title="$t('LK_JIESHUXIANGMU')"></backItems>
		<!--  -->
		<splitFactory v-if='splitPurch.splitPurchBoolean' ref='purchaseFactory' :splitPurchBoolean="splitPurch" :purchaseProjectId="purchasePrjectId" :firstId='firstId' :update="updateTabs">
		</splitFactory>
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
		iMessage,
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
		changeProcure,
		getProcureGroup,
	} from "@/api/partsprocure/home";
	import {
		dictkey,
		checkFactory
	} from "@/api/partsprocure/editordetail";
	import {
		detailData
	} from "./components/data";
	import splitFactory from "./components/splitFactory";
import { iMessageBox } from '../../../components';
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
				firstId:'',
				checkFactoryString:'',
				infoItem: {},
				detailData: detailData, //顶部详情数据
				targetprice: {}, //申请目标价数据
				fromGroup: [], //上方筛选列表
				diologBack: false, //取消零件采购
				diologClose: false, //结束项目
				splitPurch: {
					splitPurchBoolean: false,
				}, //拆分采购工厂
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
			fillterss(data){
				if(data){
					return '是'
				}else{
					return '否'
				}
			},
			checkFactory(){
				const parmars = {
					id:this.detailData.purchasePrjectId,
					factoryId:this.detailData.procureFactory
				}
				checkFactory(parmars).then(res=>{
					if(res.code == 200 && !res.data){
						iMessageBox(this.$t('LK_FACTORYNOTSAME'),this.$t('LK_WENXINTISHI')).then(res=>{
							this.checkFactoryString = this.detailData.procureFactory
						}).catch(err=>{
							this.detailData.procureFactory = this.checkFactoryString
						})
					}
				}).catch(err=>{
					iMessage.error(err.desZh);
				})
			},
			//判断采购项目来源，查看是否能选择车型项目
			carTypeCanselect(){
				if(this.detailData.partProjectSource == 1){
					return true
				}else {
					return false
				}
			},
			splitPurchFn() {
				this.splitPurch.splitPurchBoolean = true;
			},
			//---------------------------------------------------
			// 获取详情数据
			getDatail() {
				let data = {
					"detailBaseReq.purchaseProjectId": this.purchasePrjectId,
				};
				getTabelData(data).then((res) => {
					this.detailData = res.data.detailData;
					this.checkFactoryString = res.data.detailData.procureFactory
					if (res.data.targetprice) {
						this.targetprice = res.data.targetprice;

					}
				});
			},
			getProcureGroup() {
				dictkey().then((res) => {
					if (res.data) {
						this.fromGroup = res.data;
					}
				});
			},
			// 查询fliter数据
			getGroupList(key) {
				if (this.fromGroup.length > 0) {
					let obj = this.fromGroup.find((items) => items.type == key);
					if (!obj) return [];
					return obj.list;
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
						iMessage.success(this.$t('LK_CAOZUOCHENGGONG'));
						this.getDatail();
					} else {
						iMessage.error(res.desZh);
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
					purchaseProjectIds: [this.infoItem.purchasePrjectId],
				};
				changeProcure({
					close,
				}).then((res) => {
					this.diologClose = false;
					if (res.data) {
						this.getDatail();
						iMessage.success(this.$t('LK_CAOZUOCHENGGONG'));
					} else {
						iMessage.error(res.desZh);
					}
				});
			},
			//修改详情。
			save(val) {
				let detailData = {};
				for (let i in this.detailData) {
					if (
						i != "csfMemo" &&
						i != "linieMemo" &&
						i != "cs1Memo" &&
						i != "csfMeetMemo" &&
						i != "linieMeetMemo" &&
						i != "cs1MeetMemo"
					) {
						detailData[i] = this.detailData[i];
					}
				}
				detailData['cfController'] = this.detailData.cfController
				detailData['cfControllerZh'] = (this.fromGroup.CF_CONTROL.find(items=>items.id == this.detailData.cfController)).name || ''
				detailData['linieUserId'] = this.detailData.linieUserId
				detailData['linieName'] = (this.fromGroup.LINIE.find(items=>items.code == this.detailData.linieUserId)).name || ''
				changeProcure({
					detailData,
				}).then((res) => {
					if (res.data) {
						if(res.data.procureFactoryIds.length <= 1 ){
							iMessage.success(this.$t('LK_YIBAOCUN'));
							this.getDatail();
						}else{
							iMessage.success(this.$t('LK_YIBAOCUN'));
							this.getDatail();
							// iMessageBox(this.$t('LK_AREYOUSPLITE'),this.$t('LK_WENXINTISHI')).then(res=>{
							// 	//如果这条ID存在 则默认查询出来的采购工厂将会为第一条
							// 	this.firstId = this.detailData.procureFactory
							// 	this.splitPurchFn()
							// })
						}
					} else {
						iMessage.error(res.desZh);
					}
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
					if (res.data) {
						this.getDatail();
					} else {
						iMessage.error(res.desZh);
					}
				});
			},
			//取消零件采购输入框
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
							iMessage.success(this.$t('LK_CAOZUOCHENGGONG'));
							this.getDatail();
						} else {
							iMessage.error(res.desZh);
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
			tips() {},
			updateStartYear(startYear) {
				this.$refs.outputRecord.updateStartYear(startYear)
			},
			updateOutput(data) {
				this.$refs.outputPlan.updateOutput(data)
			},
		}
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
