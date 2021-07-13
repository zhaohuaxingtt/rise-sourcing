<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 10:09:36
 * @LastEditTime: 2021-07-12 17:52:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\index.vue
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
			<span class="font18 font-weight">{{language("LK_LINGJIANCAIGOUXIANGMU",'零件采购项目')}}</span>
			<div class="floatright">
				<iButton v-if="isAssembly" @click="handleCreateNomiApplication">{{ language('LK_SHENGCHENGDINGDIANSHENQING',"生成定点申请单") }}</iButton>
				<!-------------------------------------------------------------------------------->
				<!---维护现供供应商逻辑：1，只有当零件采购项目类型为[GS零件]或[GS common sourcing]时才---->
				<!---出现此按钮。------------------------------------------------------------------->
				<iButton v-if='currentSupplierButton' @click="curentSupplierDialog.show = true">{{language('WEIHUXIANGGYS','维护现供供应商')}}</iButton>	
				<iButton @click="start" v-permission="PARTSPROCURE_EDITORDETAIL_STARTUP"
					v-if="detailData.status == '16'">{{ language("LK_QIDONGXIANGMU",'启动项目') }}</iButton>
				<iButton @click="creatFs" v-permission="PARTSPROCURE_EDITORDETAIL_GENERATEFSGSNR">
					{{ language("LK_SHENGCHENGFS_GSNR",'生成FS/GS/SP NO.') }}
				</iButton>
				<iButton @click="openDiologBack" v-permission="PARTSPROCURE_EDITORDETAIL_CANCELITEMS">
					{{ language("LK_QUXIAOLINGJIANCAIGOUXIANGMU",'取消零件采购项目') }}
				</iButton>
				<iButton @click="splitPurchFn" v-permission="PARTSPROCURE_EDITORDETAIL_SPLITFACTORY">
					{{ language("LK_CHAIFENCAIGOUGONGCHANG",'拆分采购工厂') }}
				</iButton>
				<iButton @click="openDiologClose" v-permission="PARTSPROCURE_EDITORDETAIL_ENDPROJECT"
					v-if="detailData.status != '16'">{{ language("LK_JIESHUXIANGMU",'结束项目') }}</iButton>
				<iButton @click="saveFn" v-permission="PARTSPROCURE_EDITORDETAIL_BASICINFOSAVE">{{ language("LK_BAOCUN",'保存') }}
				</iButton>
				<iButton @click="back" v-permission="PARTSPROCURE_EDITORDETAIL_RETURN">{{ language("LK_FANHUI",'返回') }}</iButton>
				<logButton class="margin-left20" @click="log" v-permission="PARTSPROCURE_EDITORDETAIL_LOG" />
				<span>
					<icon symbol name="icondatabaseweixuanzhong"></icon>
				</span>
			</div>
		</div>

		<!------------------------------------------------------------------------>
		<!--                  基本信息区域                                       --->
		<!------------------------------------------------------------------------>
		<iCard class="card" :title="language('LK_JICHUXINXI','基础信息')" collapse>
			<iFormGroup row="1" inline :rules="rules">
				<div class="row">
					<div class="col">
						<iFormItem :label="language('LK_LINGJIANHAO','零件号') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTNUMBER">
								{{ detailData.partNum }}
							</iText>
						</iFormItem>
						<iFormItem :label="language('LK_LINGJIANMINGZHONG','零件名（中）') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTNAMEZH">
								{{ detailData.partNameZh }}
							</iText>
						</iFormItem>
						<iFormItem :label="language('LK_LINGJIANMINGCHENGDE','零件名称（德）') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTNUMBERGER">
								{{ detailData.partNameDe }}
							</iText>
						</iFormItem>
						<iFormItem :label="language('LK_LINGJIANXIANGMULEIXING','零件项目类型') + ':'" name="test">
							<iSelect
								v-model="detailData.partProjectType"
								v-permission="PARTSPROCURE_EDITORDETAIL_EVENTITEMTYPE"
								@change="onPartProjectTypeChange">
								<el-option :value="item.code" :label="item.name"
									v-for="(item, index) in fromGroup.PART_PROJECT_TYPE" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
						<!--来源为新件信息单的零件采购项目，不可修改车型项目。前端车型项目下拉框应该置为不可修改的状态 --->
						<iFormItem :label="language('LK_CHEXINGXIANGMU','车型项目') + ':'" name="test">
							<iSelect :disabled='carTypeCanselect()' v-model="detailData.cartypeProjectZh" v-permission="PARTSPROCURE_EDITORDETAIL_CARTYPEZH">
								<el-option :value="item.code" :label="item.name"
									v-for="(item, index) in fromGroup.CAR_TYPE_PRO" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
						<!-- <iFormItem :label="language('LK_CAIGOUTIAOKUAN','采购条款') + ':'" name="test"
							v-show="detailData.partProjectType == '46'">
							<iSelect v-model="detailData.purchaseClause"
								v-permission="PARTSPROCURE_EDITORDETAIL_PURCHASETERMS">
								<el-option :value="item.code" :label="item.name" v-for="(item, index) in fromGroup.PURCHASE_RULE" :key="index">
								</el-option>
							</iSelect>
						</iFormItem> -->
						<!------------------------零件采购项目类型为一次性采购/DB一次性采购类型时与是否DB件联动--------------------------------------->
						<iFormItem v-if="['PT06', 'PT19'].includes(detailData.partProjectType)" :label="language('SHIFOUDBJIAN','是否DB件') + ':'" name="test">
							<iSelect v-model="detailData.isDB" @change="onIsDBChange">
								<el-option :value="1" :label="language('YES', '是')"></el-option>
								<el-option :value="0" :label="language('NO', '否')"></el-option>
							</iSelect>
						</iFormItem>
						<!------------------------零件采购项目类型为DB类型时--------------------------------------->
						<iFormItem v-if="['PT04'].includes(detailData.partProjectType) || (['PT19', 'PT06'].includes(detailData.partProjectType) && detailData.isDB)" :label="language('LK_HUOBI','货币') + ':'" name="test">
							<iSelect v-model="detailData.currencyCode" >
								<el-option :value="item.code" :label="item.name"
									v-for="(item, index) in fromGroup.CURRENCY_TYPE" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
						<!----------------------零件采购项目类型为DB零件时----------------------------------->
						<iFormItem v-if="['PT04'].includes(detailData.partProjectType) || (['PT19', 'PT06'].includes(detailData.partProjectType) && detailData.isDB)" :label="language('ZHIFUTIAOKUAN', '支付条款') + ':'" name="test">
							<iSelect v-model="detailData.payClause" >
								<el-option :value="item.code" :label="item.name"
									v-for="(item, index) in fromGroup.TERMS_PAYMENT" :key="index">
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
						
						<iFormItem :label="language('LK_LINGJIANLEIXING','零件类型') + ':'" name="test">
							<iSelect v-model="detailData.partType" v-permission="PARTSPROCURE_EDITORDETAIL_PARTTYPE">
								<el-option :value="item.code" :label="item.name"
									v-for="(item, index) in fromGroup.PART_TYPE" :key="index"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="language('LK_DANWEI','价格单位') + ':'" name="test">
							<iSelect v-model="detailData.unit" v-permission="PARTSPROCURE_EDITORDETAIL_UNIT">
								<el-option :value="item.code" :label="item.name" v-for="(item, index) in fromGroup.UNIT"
									:key="index"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="language('LK_MTZLINGJIAN','MTZ零件') + ':'" name="test">
							<iSelect v-model="detailData.mtz" v-permission="PARTSPROCURE_EDITORDETAIL_MTZPARTS">
								<el-option :value="true" label="是"></el-option>
								<el-option :value="false" label="否"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem label="Heavy Item List:" name="">
							<iText>
								{{ detailData.heavyItem || "否" }}
							</iText>
						</iFormItem>
						<!--如果选择后的采购工厂不在主数据中该车型项目对应的采购工厂范围内？，则提示”您所选的采购工厂与主数据中该车型项目对应的采购工厂不一致，请确认是否修改“；选择”确认“保持修改后的值，选择”取消“恢复到修改前的值。”保存“后生效。--->
						<iFormItem :label="language('LK_CAIGOUGONGCHANG','采购工厂') + ':'" name="test">
							<iSelect v-model="detailData.procureFactory"
								@change="checkFactory()"
								v-permission="PARTSPROCURE_EDITORDETAIL_PURCHASINGFACTORY">
								<el-option :value="item.code" :label="item.name"
									v-for="(item, index) in fromGroup.PURCHASE_FACTORY" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
						<!-- <iFormItem :label="language('LK_ZHIFUTIAOKUAN','支付条款') + ':'" name="test"
							v-show="detailData.partProjectType == '46'">
							<iSelect v-model="detailData.payClause"
								v-permission="PARTSPROCURE_EDITORDETAIL_NUMBEROFPAYMENT">
								<el-option :value="item.code" :label="item.name"
									v-for="(item, index) in fromGroup.PAYMENT_RULE" :key="index"></el-option>
							</iSelect>
						</iFormItem> -->
						<!----------------------零件采购项目类型为DB零件时----------------------------------->
						<iFormItem v-if="['PT04'].includes(detailData.partProjectType) || (['PT19', 'PT06'].includes(detailData.partProjectType) && detailData.isDB)" :label="language('CAIGOUTIAOKUAN','采购条款') + ':'" name="test">
							<iSelect v-model="detailData.purchaseClause" >
								<el-option :value="item.code" :label="item.name"
									v-for="(item, index) in fromGroup.TERMS_PURCHASE" :key="index">
								</el-option>
							</iSelect>
						</iFormItem>
					</div>
					<div class="col">
						<iFormItem :label="language('LK_XUNJIACAIGOUYUAN','询价采购员') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_INQUIRYBUYER">
								{{ detailData.buyerName }}
							</iText>
						</iFormItem>
						<iFormItem :label="language('LK_LINIEBUMEN','LINIE部门') + ':'" name="test">
							<iSelect v-model="detailData.linieDept"
								v-permission="PARTSPROCURE_EDITORDETAIL_LINEDEPARTMENT">
								<el-option :value="item.code" :label="item.name"
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
						<iFormItem :label="language('LK_CFKONGZHIYUAN','CF控制员') + ':'" name='cfczy'>
							<iSelect v-model="detailData.cfController" v-permission="PARTSPROCURE_EDITORDETAIL_CFCONTROLLER">
								<el-option :value="item.id" :label="item.name" v-for="item in fromGroup.CF_CONTROL" :key="item.name"></el-option>
							</iSelect>
						</iFormItem>
						<iFormItem :label="language('LINGJIANCHENGBENFENXIYUAN', '零件成本分析员') + ':'" name=''>
							<!-- <iSelect class="multipleSelect" v-model="detailData.c" multiple collapse-tags>
								<el-option :value="item.code" :label="item.name" v-for="item in fromGroup.CF_CONTROL" :key="item.name"></el-option>
							</iSelect> -->
							<iText>
								{{ detailData.partCostUserName }}
							</iText>
						</iFormItem>
						<iFormItem :label="language('MUJUCHENGBENFENXIYUAN', '模具成本分析员') + ':'" name=''>
							<!-- <iSelect class="multipleSelect" v-model="detailData.d" multiple collapse-tags>
								<el-option :value="item.code" :label="item.name" v-for="item in fromGroup.CF_CONTROL" :key="item.name"></el-option>
							</iSelect> -->
							<iText>
								{{ detailData.mouldCostUserName }}
							</iText>
						</iFormItem>
						<iFormItem name="test">
							<template slot="label">
								<span>Common Sourcing:</span>
								<span>
									<el-tooltip effect="light">
										<icon name='iconxinxitishi' symbol/>
										<template slot="content">
											<p>{{detailData.modelNameZh}} : {{detailData.carTypeSourcingType}}</p>
											<p>{{detailData.partNum}} : {{detailData.partSourcingType}}</p>
										</template>
									</el-tooltip>
								</span>	
							</template>
							<!--------预设值会有一个联动，如果 为是  零件采购项目类型是fs commonsourcing  如果是否，则是fs零件 ps:和设计刘洋沟通前端不做联动，仅仅在数据初始化时做----------> 
							<!--------预设置联动第二版：如果零件采购项目为FS common sourcing，但是否common sourcing选择否，则在保存/生成FS号时提示采购员：“[零件采购项目]与[是否common sourcing]不统一，请确认是否继续”---->
							<iSelect v-model="detailData.isCommonSourcing"
								v-permission="PARTSPROCURE_EDITORDETAIL_COMMONSOURCING">
								<el-option :value="true" label="是"></el-option>
								<el-option :value="false" label="否"></el-option>
							</iSelect>
						</iFormItem>
					</div>
					<div class="col">
						<iFormItem :label="language('LK_QIANSHOURIQI','签收日期') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_DATEOFRECEIPT">
								{{ detailData.signDate }}
							</iText>
						</iFormItem>
						<iFormItem :label="language('LK_SOPRIQI','SOP日期') + ':'" name="test">
							<!----------------------------------------------------------------------------------------------->
							<!---------------sop时间如果是GS零件的时候，是可以手动选择的------------------------------------------>
							<!----------------------------------------------------------------------------------------------->
							<iDatePicker v-if='currentSupplierButton' v-model='detailData.sopDate' type="date"></iDatePicker>
							<iText v-else v-permission="PARTSPROCURE_EDITORDETAIL_SOPDATE">
								{{ detailData.sopDate }}
							</iText>
						</iFormItem>
						<iFormItem :label="language('partsprocure.PARTSPROCUREPARTSTATUSNAME','零件采购项目状态') + ':'" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_PARTSTATUS">
								{{ detailData.statusName }}
							</iText>
						</iFormItem>
						<iFormItem label="BMG：" name="test">
							<iText v-permission="PARTSPROCURE_EDITORDETAIL_BMG">
								{{ fillterss(detailData.bmg) }}
							</iText>
						</iFormItem>
						<!-- <iFormItem :label="language('LK_HUOBI','货币') + ':'" name="test"
							v-show="detailData.partProjectType == '46'">
							<iSelect v-model="detailData.currencyId" v-permission="PARTSPROCURE_EDITORDETAIL_CURRENCY">
								<el-option :value="item.code" :label="item.name"
									v-for="(item, index) in fromGroup.CURRENCY_TYPE" :key="index"></el-option>
							</iSelect>
						</iFormItem> -->
					</div>
				</div>
			</iFormGroup>
		</iCard>
		<iTabsList  class="margin-top20" type='card'>
			<!-------------------------已定点时显示定点信息tab-  ----------------------------------------->
			<el-tab-pane :label="language('LK_DINGDIANXINXI','定点信息')" v-if="detailData.status == '15'">
				<designateInfo :params="infoItem" />
			</el-tab-pane>
			<el-tab-pane :label="language('LK_CAILIAOZUXINXI','材料组信息')"
				v-permission="PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFORMATION">
				<materialGroupInfo :params="infoItem" />
			</el-tab-pane>
			<el-tab-pane :label="language('LK_LINGJIANCHANLIANGJIHUA','零件产量计划')"
				v-permission="PARTSPROCURE_EDITORDETAIL_PARTSPRODUCTIONPLAN">
				<outputPlan ref="outputPlan" :params="infoItem" @updateStartYear="updateStartYear" />
				<outputRecord ref="outputRecord" class="margin-top20" :params="infoItem" @updateOutput="updateOutput" />
				<volume ref="volume" class="margin-top20" :params="infoItem" />
			</el-tab-pane>
			<el-tab-pane :label="language('LK_TUZHIHETPDANXIANGQING','图纸和信息单详情')"
				v-permission="PARTSPROCURE_EDITORDETAIL_DRAWINGSANDTPDETAILSPAGE">
				<drawing :params="infoItem" />
				<sheet class="margin-top20" :params="infoItem" />
			</el-tab-pane>
			<el-tab-pane :label="language('LK_WULIUYAOQIU','物流要求')" v-permission="PARTSPROCURE_EDITORDETAIL_LOGISTICSREQUIREMENTS">
				<logistics :infoItem="infoItem"></logistics>
			</el-tab-pane>
			<el-tab-pane :label="language('LK_SHENQINGMUBIAOJIA','申请目标价')"
				v-permission="PARTSPROCURE_EDITORDETAIL_APPLYFORTARGETPRICE">
				<targePrice :purchaseProjectId="purchasePrjectId" :fsnrGsnrNum="fsnrGsnrNum" :partProjectType="partProjectType"></targePrice>
			</el-tab-pane>
			<el-tab-pane :label="language('LK_BEIZHUXINXI','备注信息')" v-permission="PARTSPROCURE_EDITORDETAIL_REMARKSINFORMATION">
				<remarks :detailData="detailData"></remarks>
			</el-tab-pane>
		</iTabsList>
		<!-- 取消零件采购 -->
		<backItems v-model="diologBack" @sure="cancel" :title="language('LK_QUXIAOLINGJIANCAIGOUXIANGMU','取消零件采购项目')"></backItems>
		<!-- 结束项目 -->
		<backItems v-model="diologClose" @sure="close" :title="language('LK_JIESHUXIANGMU','结束项目')"></backItems>
		<!--  -->
		<splitFactory v-if='splitPurch.splitPurchBoolean' ref='purchaseFactory' :splitPurchBoolean="splitPurch" :purchaseProjectId="purchasePrjectId" :firstId='firstId' :update="updateTabs">
		</splitFactory>
		<!---------------------------------------------------------------->
		<!----------------------------现供供应商维护模块--------------------->
		<!---------------------------------------------------------------->
		<currentSupplier :dialogVisible='curentSupplierDialog'></currentSupplier>
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
		iDatePicker,
		icon,
		iMessageBox
	} from "rise";
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
	import logButton from "@/components/logButton";
	import currentSupplier from './components/currentSupplier'
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
import designateInfo from './components/designateInfo'
import { getDictByCode } from '@/api/dictionary'
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
			designateInfo,
			currentSupplier,
			iDatePicker,
			icon
		},
		provide:function(){
			return {detailData:this.getDetailData}
		},
		computed: {
			/**
				* @description: 现供供应商按钮逻辑。
				* @param {*}
				* @return {*}
				*/
			currentSupplierButton:function(){
				return (this.detailData.partProjectType == "PT11" || this.detailData.partProjectType == "PT10") && this.detailData.fsnrGsnrNum
			},
			isAssembly() {
				return this.detailData.partType === "A"
			}
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
				createNomiApplicationLoading: false,
				curentSupplierDialog:{show:false},
				fsnrGsnrNum: '',
				partProjectType: ''
			};
		},
		created() {
			this.infoItem = JSON.parse(this.$route.query.item);
			this.purchasePrjectId = this.infoItem.purchasePrjectId;
			this.fsnrGsnrNum = this.infoItem.fsnrGsnrNum;
			this.partProjectType = this.infoItem.partProjectType;
			this.getDatail();
			this.getProcureGroup();
			this.getDicts()
		},
		methods: {
			getDetailData(){
				return this.detailData
			},
			getDict(type) {
				getDictByCode(type).then(res => {
					if (res?.result) {
						this.fromGroup = {
							...this.fromGroup,
							[type]: res.data[0]?.subDictResultVo || []
						}
					}
				})
			},
			getDicts() {
				// 支付条款
				this.getDict('TERMS_PAYMENT')
				//采购条款
				this.getDict('TERMS_PURCHASE')
				// 审批状态CF_APPROVE_STATUS
				this.getDict('PP_CSTMGMT_CURRENCY')
			},
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
						iMessageBox(this.language('LK_FACTORYNOTSAME','您所选的采购工厂与主数据中该车型项目对应的采购工厂不一致，请确认是否修改'),this.language('LK_WENXINTISHI','温馨提示')).then(res=>{
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
						this.fromGroup = {
							...this.fromGroup,
							...res.data
						}
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
						iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
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
						iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
					} else {
						iMessage.error(res.desZh);
					}
				});
			},
			saveFn(){
				this.fsProjectTypeAnIscommonSroucing(this.save)
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
				const factoryItems = this.fromGroup.PURCHASE_FACTORY.find(items=>items.code == this.detailData.procureFactory)
				detailData['cfController'] = this.detailData.cfController
				const cfController = this.fromGroup.CF_CONTROL.find(items=>items.id == this.detailData.cfController)
				detailData['cfControllerZh'] = cfController ? cfController.name : ""
				detailData['linieUserId'] = this.detailData.linieUserId
				const linie = this.fromGroup.LINIE.find(items=>items.id == this.detailData.linieUserId)
				detailData['linieName'] = linie ? linie.name : ""
				detailData['cartypeProjectNum'] = detailData.cartypeProjectZh?detailData.cartypeProjectZh:''
				detailData['procureFactoryName'] = factoryItems ? factoryItems.name:''
				return new Promise((resolve, reject) => {
					changeProcure({
						detailData,
					}).then((res) => {
						if (res.data) {
							if(res.data.procureFactoryIds.length <= 1 ){
								iMessage.success(this.language('LK_YIBAOCUN','已保存'));
								this.getDatail();
							}else{
								iMessage.success(this.language('LK_YIBAOCUN','已保存'));
								this.getDatail();
								// iMessageBox(this.$t('LK_AREYOUSPLITE'),this.$t('LK_WENXINTISHI')).then(res=>{
								// 	//如果这条ID存在 则默认查询出来的采购工厂将会为第一条
								// 	this.firstId = this.detailData.procureFactory
								// 	this.splitPurchFn()
								// })
							}

							resolve(res)
						} else {
							iMessage.error(res.desZh);
							reject(res)
						}
					});
				})
			},
			// 生成fs号
			creatFs() {
				this.fsProjectTypeAnIscommonSroucing(this.sendRequsetToCreateFS)
			},
			sendRequsetToCreateFS(){
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
							iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
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
			/**
				* @description: 限制保存和提交的零件类型和是否commonsourcing是否匹配
				* @param {*}
				* @return {*}
				*/
			fsProjectTypeAnIscommonSroucing(callBack){
				if((!this.detailData.isCommonSourcing) && this.detailData.partProjectType == "PT09"){
					iMessageBox(this.language('SPIRNT11COMMONSS','当前零件采购项目类型与commonSourcing为[否]不统一，是否继续？')).then(res=>{
						callBack()
					})
				}else{
					callBack()
				}
			},
			/**
			* @description: 零件项目类型 db一次性采购、一次性采购与是否DB件联动
			* @param {*}
			* @return {*}
			*/
			onIsDBChange(data) {
				this.detailData.partProjectType = data ? 'PT19' : 'PT06'
				this.detailData.partProjectType === 'PT19' && (this.detailData.isDB = 1)
			},
			/**
			* @description: 零件项目类型,当类型为db一次性采购，isDB默认选是
			* @param {*}
			* @return {*}
			*/
			onPartProjectTypeChange(data) {
				console.log(data)
				this.detailData.isDB = data === 'PT19' ? 1: 0
			}
		}
}
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

	.multipleSelect {
		::v-deep .el-tag + .el-tag:last-of-type {
			// text-overflow: ellipsis;
			// white-space: nowrap;
			// max-width: 38px;
			// overflow: hidden;
			// display: block;
			// float: left;
			max-width: 38px;
		}
	}
</style>
