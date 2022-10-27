<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 10:09:36
 * @LastEditTime: 2022-04-27 11:55:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsprocure\editordetail\index.vue
-->
<template>
  <iPage
    class="partsprocureEditordetail"
    v-permission.auto="
      PARTSPROCURE_EDITORDETAIL_INDEXPAGE | 零件采购项目管理详情页
    "
  >
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
      <span class="font18 font-weight">{{
        language("LK_LINGJIANCAIGOUXIANGMU", "零件采购项目")
      }}</span>
      <template v-if="infoItem.code && iSDisposablePurchase">
        <span class="font16 font-weight margin-left20"
          >{{ language("LK_LCAIGOUSHENQING", "采购申请") }}:</span
        >
        <span class="openLinkText cursor" @click="openCode">{{
          infoItem.code
        }}</span>
      </template>
      <div class="floatright">
        <span v-if="!disabled">
          <!-- 供应商创建定点申请单 -->
          <createNomiappBtn
            v-permission.auto="
              PARTSPROCURE_EDITORDETAIL_CREATENOMIAPPLICATION | 生成定点申请单
            "
            :datalist="[detailData]"
            v-if="createdNomiOnlyPartShow"
          ></createNomiappBtn>
          <!-------------------零件总成件的自动生成定点申请单--------------------->
          <createNomiappBtnAccs
            v-permission.auto="
              PARTSPROCURE_EDITORDETAIL_ZC_CREATENOMIAPPLICATION |
                (总成件 - 生成定点申请按钮)
            "
            v-if="createdNomiappAsscShow"
          ></createNomiappBtnAccs>
          <!-------------------------------------------------------------------------------->
          <!---维护现供供应商逻辑：1，只有当零件采购项目类型为[GS零件]或[GS common sourcing]时才---->
          <!---出现此按钮。------------------------------------------------------------------->
          <iButton
            v-permission.auto="
              PARTSPROCURE_EDITORDETAIL_WHXGGYS | 维护现供供应商
            "
            v-if="currentSupplierButton"
            @click="openCurentSupplierDialog"
            >{{ language("WEIHUXIANGGYS", "维护现供供应商") }}</iButton
          >
          <iButton
            @click="start"
            v-permission.auto="PARTSPROCURE_EDITORDETAIL_STARTUP | 启动项目"
            v-if="
              detailData.status ==
                getEnumValue('PURCHASE_PROJECT_STATE_ENUM.END') ||
              detailData.status ==
                getEnumValue('PURCHASE_PROJECT_STATE_ENUM.CANCEL')
            "
            >{{ language("LK_QIDONGXIANGMU", "启动项目") }}</iButton
          >
          <creatFsGsNr
            :projectItems="[detailData]"
            @refresh="getDatailFn"
            v-permission.auto="
              PARTSPROCURE_EDITORDETAIL_CREATEPARTSFSNRNUMBER |
                生成零件采购项目号
            "
          ></creatFsGsNr>
          <cancelProject
            :backItems="[detailData]"
            @refresh="getDatailFn"
            v-permission.auto="
              PARTSPROCURE_EDITORDETAIL_CANCELPARTSFSNRNUMBER | 取消零件采购项目
            "
          ></cancelProject>
          <!-- <iButton @click="splitPurchFn" v-permission="PARTSPROCURE_EDITORDETAIL_SPLITFACTORY">
						{{ language("LK_CHAIFENCAIGOUGONGCHANG",'拆分采购工厂') }}
					</iButton> -->
          <iButton
            @click="openDiologClose"
            v-permission.auto="PARTSPROCURE_EDITORDETAIL_ENDPROJECT | 结束项目"
            v-if="
              detailData.status !=
              getEnumValue('PURCHASE_PROJECT_STATE_ENUM.END')
            "
            >{{ language("LK_JIESHUXIANGMU", "结束项目") }}</iButton
          >
          <iButton
            :disabled="dictLoading || carTypeSopListLoading"
            :loading="saveLoading"
            @click="saveFn"
            v-permission.auto="
              PARTSPROCURE_EDITORDETAIL_BASICINFOSAVE | 保存零件采购项目按钮
            "
            >{{ language("LK_BAOCUN", "保存") }}
          </iButton>
          <!-- <iButton @click="back">{{ language("LK_FANHUI",'返回') }}</iButton> -->
        </span>
        <!-- <logButton class="margin-left20" @click="log" v-permission.auto="PARTSPROCURE_EDITORDETAIL_LOG|log" /> -->
        <iLoger
          :config="{
            module_obj_ae: '零件采购项目',
            bizId_obj_ae: 'projectId',
            queryParams: ['bizId_obj_ae'],
          }"
          isPage
          isUser
          class="margin-left20"
          optionDicKey="LOG_OPERATION_TYPES"
          optionDicKey2="零件采购项目详情页"
          v-permission.auto="PARTSPROCURE_EDITORDETAIL_LOG | log"
        />
        <span>
          <icon
            symbol
            name="icondatabaseweixuanzhong"
            style="font-size: 14px; margin-left: 10px"
          ></icon>
        </span>
      </div>
    </div>

    <!------------------------------------------------------------------------>
    <!--                  基本信息区域                                       --->
    <!------------------------------------------------------------------------>
    <iCard
      class="card"
      :title="language('LK_JICHUXINXI', '基础信息')"
      collapse
      v-loading="detailLoading"
    >
      <iFormGroup row="1" inline :rules="rules">
        <div class="row">
          <div class="col">
            <iFormItem
              v-permission.auto="PARTSPROCURE_EDITORDETAIL_PARTNUMBER | 零件号"
              :label="language('LK_LINGJIANHAO', '零件号') + ':'"
              name="test"
            >
              <iText>
                {{ detailData.partNum }}
              </iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_PARTNAMEZH | 零件名中
              "
              :label="language('LK_LINGJIANMINGZHONG', '零件名（中）') + ':'"
              name="test"
            >
              <iText>
                {{ detailData.partNameZh }}
              </iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_PARTNUMBERGER | 零件名称德
              "
              :label="
                language('LK_LINGJIANMINGCHENGDE', '零件名称（德）') + ':'
              "
              name="test"
            >
              <iText>
                {{ detailData.partNameDe }}
              </iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="PARTSPROCURE_EDITORDETAIL_PARTTYPE | 零件类型"
              :label="language('LK_LINGJIANLEIXING', '零件类型') + ':'"
              name="test"
            >
              <iSelect v-model="detailData.partType" v-if="!disabled">
                <el-option
                  :value="item.code"
                  :label="item.name"
                  v-for="(item, index) in fromGroup.PART_TYPE"
                  :key="index"
                ></el-option>
              </iSelect>
              <iText v-else>{{
                getName(detailData.partType, "code", fromGroup.PART_TYPE)
              }}</iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="PARTSPROCURE_EDITORDETAIL_UNIT | 价格单位"
              :label="language('LK_DANWEI', '价格单位') + ':'"
              name="test"
            >
              <iSelect v-model="detailData.unit" v-if="!disabled">
                <el-option
                  :value="item.code"
                  :label="item.name"
                  v-for="(item, index) in fromGroup.UNIT"
                  :key="index"
                ></el-option>
              </iSelect>
              <iText v-else>{{
                getName(detailData.unit, "code", fromGroup.UNIT)
              }}</iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="PARTSPROCURE_EDITORDETAIL_BMG | BMG"
              label="BMG："
              name="test"
            >
              <iText>
                {{ fillterss(detailData.isBmg) }}
              </iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="PARTSPROCURE_EDITORDETAIL_CURRENCYCODE | 货币"
              v-if="
                [partProjTypes.DBLINGJIAN].includes(detailData.partProjectType)
              "
              :label="language('LK_HUOBI', '货币') + ':'"
              name="test"
            >
              <iSelect v-model="detailData.currencyCode" v-if="!disabled">
                <el-option
                  :value="item.code"
                  :label="item.name"
                  v-for="(item, index) in fromGroup.CURRENCY_TYPE"
                  :key="index"
                >
                </el-option>
              </iSelect>
              <iText v-else>{{
                getName(
                  detailData.currencyCode,
                  "code",
                  fromGroup.CURRENCY_TYPE
                )
              }}</iText>
            </iFormItem>
            <!-- <iFormItem v-permission="PARTSPROCURE_EDITORDETAIL_EVENTITEMTYPE" :label="language('LK_LINGJIANXIANGMULEIXING','零件项目类型') + ':'" name="test">
							<iSelect
								v-model="detailData.partProjectType"
								@change="onPartProjectTypeChange">
								<el-option :value="item.code" :label="item.name"
									v-for="(item, index) in filterProjectList(partProjectTypeArray,detailData.partProjectType)" :key="index">
								</el-option>
							</iSelect>
						</iFormItem> -->
            <!--来源为新件信息单的零件采购项目，不可修改车型项目。前端车型项目下拉框应该置为不可修改的状态 --->

            <!-- <iFormItem :label="language('LK_CAIGOUTIAOKUAN','采购条款') + ':'" name="test"
							v-show="detailData.partProjectType == '46'">
							<iSelect v-model="detailData.purchaseClause"
								v-permission="PARTSPROCURE_EDITORDETAIL_PURCHASETERMS">
								<el-option :value="item.code" :label="item.name" v-for="(item, index) in fromGroup.PURCHASE_RULE" :key="index">
								</el-option>
							</iSelect>
						</iFormItem> -->
            <!------------------------零件采购项目类型为一次性采购/DB一次性采购类型时与是否DB件联动--------------------------------------->
            <iFormItem
              v-permission.auto="PARTSPROCURE_EDITORDETAIL_ISDB | 是否DB件"
              v-if="
                [
                  partProjTypes.YICIXINGCAIGOU,
                  partProjTypes.DBYICHIXINGCAIGOU,
                ].includes(detailData.partProjectType)
              "
              :label="language('SHIFOUDBJIAN', '是否DB件') + ':'"
              name="test"
            >
              <iSelect
                v-model="detailData.isDb"
                @change="onIsDBChange"
                v-if="!disabled"
              >
                <el-option
                  :value="true"
                  :label="language('YES', '是')"
                ></el-option>
                <el-option
                  :value="false"
                  :label="language('NO', '否')"
                ></el-option>
              </iSelect>
              <iText v-else>{{ detailData.isDb ? "是" : "否" }}</iText>
            </iFormItem>
            <!-----------------------采购项目为仅零件号变更-------------------------------------->
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_OLDFSGSNUMBER | (原FS / GS号)
              "
              v-if="
                partProjTypes.JINLINGJIANHAOGENGGAI ==
                detailData.partProjectType
              "
              :label="language('YUANFSGSHAO', '原FS/GS号') + ':'"
            >
              <iInput
                class="removeInputDisabelColor"
                v-if="!disabled"
                disabled
                search
                v-model="detailData.oldFsnrGsnrNum"
              >
                <i
                  class="el-icon-search el-input__icon cursor"
                  slot="suffix"
                  @click="openDiologOldParts"
                ></i
              ></iInput>
              <iText v-else>{{ detailData.oldFsnrGsnrNum }}</iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_EVENTITEMTYPE | 零件项目类型
              "
              :label="
                language('LK_LINGJIANXIANGMULEIXING', '零件项目类型') + ':'
              "
              name="test"
            >
              <iSelect
                ref="partProjectTypeSelect"
                v-if="!disabled && canChange"
                v-model="detailData.partProjectType"
                @change="onPartProjectTypeChange"
              >
                <el-option
                  :value="item.code"
                  :label="item.name"
                  v-for="(item, index) in dataFlow(
                    getPartProjectTypeOptions(),
                    manualCreateCapacityPartProjectTypeOptionsRule
                  )"
                  :key="index"
                >
                </el-option>
              </iSelect>
              <iText v-else>{{
                getName(
                  detailData.partProjectType,
                  "code",
                  partProjectTypeArray
                )
              }}</iText>
            </iFormItem>

            <iFormItem
              label="FSNR/GSNR/SPNR："
              name="test"
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_FSNRGSNRSPNR | (FSNR / GSNR / SPNR)
              "
            >
              <iText>
                {{ detailData.fsnrGsnrNum }}
              </iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_PARTSTATUS | 零件项目类型描述
              "
              :label="
                language(
                  'partsprocure.PARTSPROCUREPARTSTATUSNAME',
                  '零件项目类型'
                ) + ':'
              "
              name="test"
            >
              <iText>
                {{ detailData.statusDesc }}
              </iText>
            </iFormItem>

            <iFormItem
              v-permission.auto="PARTSPROCURE_EDITORDETAIL_CARTYPEZH | 车型项目"
              :label="language('LK_CHEXINGXIANGMU', '车型项目') + ':'"
              name="test "
              slot=""
              v-if="!isCarType"
            >
              <iSelect
                key="carTypeProjectNum"
                ref="carTypeProjectNum"
                v-model="detailData.carTypeProjectNum"
                filterable
                v-if="!disabled && detailData.partProjectSource != 1 && !isGXWW"
                @change="handleChangeByCarTypeProject"
              >
                <!-- :disabled='carTypeCanselect()'  -->
                <el-option
                  :value="item.code"
                  :label="item.name"
                  v-for="(item, index) in fromGroup.CAR_TYPE_PRO"
                  :key="index"
                >
                </el-option>
              </iSelect>
              <iText v-else>{{
                getName(
                  detailData.carTypeProjectNum,
                  "code",
                  fromGroup.CAR_TYPE_PRO
                )
              }}</iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="PARTSPROCURE_EDITORDETAIL_CARTYPE | 车型"
              :label="language('LK_CHEXING', '车型') + ':'"
              name="test"
              v-if="isCarType"
            >
              <iSelect
                key="carTypeModel"
                ref="carTypeModelSelect"
                :filterable="true"
                v-model="detailData.carTypeModel"
                @change="updateCar"
                multiple
                collapse-tags
                v-if="!disabled"
                @visible-change="handleVisibleChangeByCarTypeModel"
              >
                <!-- :disabled='carTypeCanselect()'  -->
                <el-option
                  :value="item.id"
                  :label="item.name"
                  v-for="item in fromGroup.CAR_TYPE"
                  :key="item.id"
                >
                </el-option>
              </iSelect>
              <iText v-else>{{
                detailData.cartypes.map((item) => item.name).join(",")
              }}</iText>
            </iFormItem>
            <!--如果选择后的采购工厂不在主数据中该车型项目对应的采购工厂范围内？，则提示”您所选的采购工厂与主数据中该车型项目对应的采购工厂不一致，请确认是否修改“；选择”确认“保持修改后的值，选择”取消“恢复到修改前的值。”保存“后生效。--->
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_PURCHASINGFACTORY | 采购工厂
              "
              :label="language('LK_CAIGOUGONGCHANG', '采购工厂') + ':'"
              name="test"
            >
              <iSelect
                ref="procureFactorySelect"
                v-model="detailData.procureFactory"
                :disabled="
                  (procureFactoryCanselect() ||
                    detailData.partProjectSource == 5 ||
                    detailData.partProjectSource == 1) &&
                  isBlankProcureFactory
                "
                @change="handleChangeByProcureFactory"
                v-if="!disabled"
              >
                <el-option
                  :value="item.code"
                  :label="item.name"
                  v-for="(item, index) in fromGroup.PURCHASE_FACTORY"
                  :key="index"
                >
                </el-option>
              </iSelect>
              <iText v-else>{{
                getName(
                  detailData.procureFactoryName,
                  "code",
                  fromGroup.PURCHASE_FACTORY
                )
              }}</iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="PARTSPROCURE_EDITORDETAIL_SOPDATE | SOP日期"
              :label="language('LK_SOPRIQI', 'SOP日期') + ':'"
              name="test"
            >
              <!----------------------------------------------------------------------------------------------->
              <!---------------sop时间如果是GS零件的时候，是可以手动选择的------------------------------------------>
              <!---------------2022/02/15 取消零件来源为手工(code: 2)的才能编辑的限制----------------------------------------->
              <!---------------有自带sop日期的车型项目，不可编辑，没有则可以----------------------------------------->
              <iDatePicker
                v-if="!getSopDateDisabled() && !disabled"
                v-model="detailData.sopDate"
                type="date"
              ></iDatePicker>
              <iText v-else>
                {{
                  detailData.sopDate
                    ? formatDate(detailData.sopDate)
                    : detailData.sopDate
                }}
              </iText>
            </iFormItem>
            <!-- <iFormItem :label="language('LK_ZHIFUTIAOKUAN','支付条款') + ':'" name="test"
							v-show="detailData.partProjectType == '46'">
							<iSelect v-model="detailData.payClause"
								v-permission="PARTSPROCURE_EDITORDETAIL_NUMBEROFPAYMENT">
								<el-option :value="item.code" :label="item.name"
									v-for="(item, index) in fromGroup.PAYMENT_RULE" :key="index"></el-option>
							</iSelect>
						</iFormItem> -->
            <!------------------------零件采购项目类型为DB类型时--------------------------------------->
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_ISDBCURRENCYCODE | DB类型的货币
              "
              v-if="
                ([
                  partProjTypes.DBYICHIXINGCAIGOU,
                  partProjTypes.YICIXINGCAIGOU,
                ].includes(detailData.partProjectType) &&
                  detailData.isDb) ||
                originPartIsDb
              "
              :label="language('LK_HUOBI', '货币') + ':'"
              name="test"
            >
              <iSelect
                v-model="detailData.currencyCode"
                v-if="
                  !disabled &&
                  detailData.partProjectType !=
                    partProjTypes.JINLINGJIANHAOGENGGAI
                "
              >
                <el-option
                  :value="item.code"
                  :label="item.name"
                  v-for="(item, index) in fromGroup.CURRENCY_TYPE"
                  :key="index"
                >
                </el-option>
              </iSelect>
              <iText v-else>{{
                getName(
                  detailData.currencyCode,
                  "code",
                  fromGroup.CURRENCY_TYPE
                )
              }}</iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_INQUIRYBUYER | 询价采购员
              "
              :label="language('LK_XUNJIACAIGOUYUAN', '询价采购员') + ':'"
              name="test"
            >
              <iText>
                {{ detailData.buyerName }}
              </iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_LINEDEPARTMENT | LINIE部门
              "
              :label="language('LK_LINIEBUMEN', 'LINIE部门') + ':'"
              name="test"
            >
              <!-- detailData. -->
              <iSelect
                @change="changeUserDept"
                v-model="linieDept"
                v-if="
                  !disabled &&
                  detailData.status !=
                    getEnumValue('PURCHASE_PROJECT_STATE_ENUM.HAS_RFQ')
                "
              >
                <!-- 改成取值deptNum, deptNum为部门code -->
                <el-option
                  :value="item.deptNum"
                  :label="item.deptNum"
                  v-for="(item, index) in fromGroup.LINIE_DEPT"
                  :key="index"
                ></el-option>
              </iSelect>
              <iText v-else>{{ linieDept }}</iText>
              <!-- <iText v-else>{{ Array.isArray(fromGroup.LINIE_DEPT) && fromGroup.LINIE_DEPT.find(item => item.code === detailData.linieDept) ? getName(detailData.linieDept, "code", fromGroup.LINIE_DEPT) : detailData.linieDeptName }}</iText> -->
            </iFormItem>
            <iFormItem
              v-permission.auto="PARTSPROCURE_EDITORDETAIL_LINE | LINIE"
              label="LINIE："
              name="test"
            >
              <!-- :disabled="!detailData.categoryCode" -->
              <iSelect
                ref="linieSelect"
                v-model="detailData.linieId"
                filterable
                placeholder="请先选择LINIE部门"
                v-if="
                  !disabled &&
                  detailData.status !=
                    getEnumValue('PURCHASE_PROJECT_STATE_ENUM.HAS_RFQ')
                "
                @change="handleChangeByLinie"
              >
                <el-option
                  :value="item.code"
                  :label="item.name"
                  v-for="item in fromGroup.LINIE"
                  :key="item.name"
                ></el-option>
              </iSelect>
              <!-- <iText v-else>{{ getName(detailData.linieId, "code", fromGroup.LINIE) }}</iText> -->
              <iText v-else>{{ detailData.linieName }}</iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_CFCONTROLLER | CF控制员
              "
              :label="language('LK_CFKONGZHIYUAN', 'CF控制员') + ':'"
              name="cfczy"
            >
              <iSelect
                ref="cfControllerSelect"
                v-model="detailData.cfController"
                v-if="!disabled"
                @change="handleChangeByCfController"
              >
                <el-option
                  :value="item.id"
                  :label="item.name"
                  v-for="item in fromGroup.CF_CONTROL"
                  :key="item.name"
                ></el-option>
              </iSelect>
              <iText v-else>{{ detailData.cfControllerName }}</iText>
            </iFormItem>
            <iFormItem
              name="test"
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_COMMINSOURCING | CommonSourcing
              "
            >
              <template slot="label">
                <span>Common Sourcing:</span>
                <span>
                  <el-tooltip effect="light">
                    <icon name="iconxinxitishi" symbol />
                    <template slot="content">
                      <p>
                        {{ detailData.modelNameZh }} :
                        {{ detailData.carTypeSourcingType }}
                      </p>
                      <p>
                        {{ detailData.partNum }} :
                        {{ detailData.partSourcingType }}
                      </p>
                    </template>
                  </el-tooltip>
                </span>
              </template>
              <!--------预设值会有一个联动，如果 为是  零件采购项目类型是fs commonsourcing  如果是否，则是fs零件 ps:和设计刘洋沟通前端不做联动，仅仅在数据初始化时做---------->
              <!--------预设置联动第二版：如果零件采购项目为FS common sourcing，但是否common sourcing选择否，则在保存/生成FS号时提示采购员：“[零件采购项目]与[是否common sourcing]不统一，请确认是否继续”---->
              <!--------选择联动：如果当前的零件采购项目为fs零件，和gs零件，如果选项为【是】需要反向设置当前采购项目类型为当前项对应的COMMONSOURCING 零件”---->
              <iSelect
                v-model="detailData.isCommonSourcing"
                v-if="!disabled"
                :disabled="canSelectCommonSourcing"
                @change="changeCommonSourcing"
              >
                <el-option :value="true" label="是"></el-option>
                <el-option :value="false" label="否"></el-option>
              </iSelect>
              <iText v-else>{{
                detailData.isCommonSourcing ? "是" : "否"
              }}</iText>
            </iFormItem>
            <!----------------------零件采购项目类型为DB零件时----------------------------------->
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_BASIC_ISDBPUECHASECLAUSE | DB零件的采购条款
              "
              v-if="
                [partProjTypes.DBLINGJIAN].includes(
                  detailData.partProjectType
                ) ||
                ([
                  partProjTypes.DBYICHIXINGCAIGOU,
                  partProjTypes.YICIXINGCAIGOU,
                ].includes(detailData.partProjectType) &&
                  detailData.isDb) ||
                [partProjTypes.DBLINGJIAN].includes(
                  detailData.oldPartProjectType
                )
              "
              :label="language('CAIGOUTIAOKUAN', '采购条款') + ':'"
              name="test"
            >
              <iSelect
                v-model="detailData.purchaseClause"
                v-if="
                  !disabled &&
                  detailData.partProjectType !=
                    partProjTypes.JINLINGJIANHAOGENGGAI
                "
              >
                <el-option
                  :value="item.code"
                  :label="item.name"
                  v-for="(item, index) in fromGroup.TERMS_PURCHASE"
                  :key="index"
                >
                </el-option>
              </iSelect>
              <iText v-else>{{
                getName(
                  detailData.purchaseClause,
                  "code",
                  fromGroup.TERMS_PURCHASE
                )
              }}</iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_BASIC_HEVAYITEMLIST | HeavyItemList
              "
              label="Heavy Item List:"
              name=""
            >
              <iText>
                {{ detailData.heavyItem || "否" }}
              </iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_LINGJIANCHENGBENFENXIYUAN |
                  零件成本分析员
              "
              :label="
                language('LINGJIANCHENGBENFENXIYUAN', '零件成本分析员') + ':'
              "
              name=""
            >
              <!-- <iSelect class="multipleSelect" v-model="detailData.c" multiple collapse-tags>
								<el-option :value="item.code" :label="item.name" v-for="item in fromGroup.CF_CONTROL" :key="item.name"></el-option>
							</iSelect> -->
              <iText>
                {{ detailData.partCostUserName }}
              </iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_MOJUCHENGBENFENXIYUAN | 模具成本分析员
              "
              :label="language('MUJUCHENGBENFENXIYUAN', '模具成本分析员') + ':'"
              name=""
            >
              <!-- <iSelect class="multipleSelect" v-model="detailData.d" multiple collapse-tags>
								<el-option :value="item.code" :label="item.name" v-for="item in fromGroup.CF_CONTROL" :key="item.name"></el-option>
							</iSelect> -->
              <iText>
                {{ detailData.mouldCostUserName }}
              </iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="PARTSPROCURE_EDITORDETAIL_MTZPARTS | MTZ零件"
              :label="language('LK_MTZLINGJIAN', 'MTZ零件') + ':'"
              name="test"
            >
              <iSelect v-model="detailData.mtz" v-if="!disabled">
                <el-option :value="true" label="是"></el-option>
                <el-option :value="false" label="否"></el-option>
              </iSelect>
              <iText v-else>{{ detailData.mtz ? "是" : "否" }}</iText>
            </iFormItem>
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_DATEOFRECEIPT | 签收日期
              "
              :label="language('LK_QIANSHOURIQI', '签收日期') + ':'"
              name="test"
            >
              <iText>
                {{ detailData.signDate }}
              </iText>
            </iFormItem>
            <!----------------------零件采购项目类型为DB零件时----------------------------------->
            <iFormItem
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_ISDBPAYCLAUSE | DB零件的支付条款
              "
              v-if="
                [partProjTypes.DBLINGJIAN].includes(
                  detailData.partProjectType
                ) ||
                ([
                  partProjTypes.DBYICHIXINGCAIGOU,
                  partProjTypes.YICIXINGCAIGOU,
                ].includes(detailData.partProjectType) &&
                  detailData.isDb) ||
                [partProjTypes.DBLINGJIAN].includes(
                  detailData.oldPartProjectType
                )
              "
              :label="language('ZHIFUTIAOKUAN', '支付条款') + ':'"
              name="test"
            >
              <iSelect
                v-model="detailData.payClause"
                v-if="
                  !disabled &&
                  detailData.partProjectType !=
                    partProjTypes.JINLINGJIANHAOGENGGAI
                "
              >
                <el-option
                  :value="item.code"
                  :label="item.name"
                  v-for="(item, index) in fromGroup.TERMS_PAYMENT"
                  :key="index"
                >
                </el-option>
              </iSelect>
              <iText v-else>{{
                getName(detailData.payClause, "code", fromGroup.TERMS_PAYMENT)
              }}</iText>
            </iFormItem>

            <!---------------钢材批量采购及钢材一次性采购显示字段---------------------------------------------->
            <template
              v-permission.auto="
                PARTSPROCURE_EDITORDETAIL_ULTIMATELYUSER | 最终用户
              "
              v-if="
                [
                  partProjTypes.GANGCAIYICIXINGCAIGOU,
                  partProjTypes.GANGCAIPILIANGCAIGOU,
                ].includes(detailData.partProjectType)
              "
            >
              <iFormItem
                :label="language('ZUIZHONGYONGHU', '最终用户') + ':'"
                name="test"
              >
                <iText>
                  {{ detailData.endUser }}
                </iText>
              </iFormItem>
              <iFormItem
                v-permission.auto="
                  PARTSPROCURE_EDITORDETAIL_MATERIALSUPPLIER | 材料供应商
                "
                :label="language('CAILIAOGONGYINGSHANG', '材料供应商') + ':'"
                name="test"
              >
                <iText>
                  {{ detailData.materialSupplierName }}
                </iText>
              </iFormItem>
              <iFormItem
                v-permission.auto="
                  PARTSPROCURE_EDITORDETAIL_STARTANDENDDATE | 有效起始期
                "
                :label="language('YOUXIAOQISHIQI', '有效起始期') + ':'"
                name="test"
              >
                <iText>
                  {{ detailData.startDate }}
                </iText>
              </iFormItem>
            </template>
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
    <iTabsList class="margin-top20" type="card" v-if="infoItem.id">
      <!-------------------------已定点时显示定点信息tab-  ----------------------------------------->
      <el-tab-pane
        v-if="
          detailData.status ==
          getEnumValue('PURCHASE_PROJECT_STATE_ENUM.DESIGNATED')
        "
        v-permission.auto="PARTSPROCURE_EDITORDETAIL_DINGDIANXINXI | 定点信息"
        lazy
        :label="language('LK_DINGDIANXINXI', '定点信息')"
      >
        <designateInfo :params="infoItem" />
      </el-tab-pane>
      <el-tab-pane
        v-if="!isSteelPurchase"
        lazy
        :label="language('LK_CAILIAOZUXINXI', '材料组信息')"
        v-permission.auto="
          PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFORMATION | 材料组信息
        "
      >
        <materialGroupInfo
          ref="materialGroupInfo"
          :params="infoItem"
          :detailData="detailData"
        />
      </el-tab-pane>
      <el-tab-pane
        v-if="!isSteelPurchase"
        lazy
        :label="language('LK_LINGJIANCHANLIANGJIHUA', '零件产量计划')"
        v-permission.auto="
          PARTSPROCURE_EDITORDETAIL_PARTSPRODUCTIONPLAN | 零件产量计划
        "
      >
        <outputPlan
          ref="outputPlan"
          :params="infoItem"
          @updateStartYear="updateStartYear"
          v-permission.auto="
            PARTSPROCURE_EDITORDETAIL_XUNJIACHANLIANJIHUA | 询价产量计划
          "
        />
        <outputRecord
          v-permission.auto="
            PARTSPROCURE_EDITORDETAIL_LINGJIANCHANLIANGJILU | 零件产量记录
          "
          ref="outputRecord"
          class="margin-top20"
          :params="infoItem"
          @updateOutput="updateOutput"
        />
        <volume
          ref="volume"
          class="margin-top20"
          :params="infoItem"
          :isSameGroupPartProjectType="isSameGroupPartProjectType"
          :disabled="
            disabled ||
            !(
              detailData.status ==
                getEnumValue('PURCHASE_PROJECT_STATE_ENUM.HAS_RFQ') ||
              detailData.status ==
                getEnumValue('PURCHASE_PROJECT_STATE_ENUM.NO_RFQ') ||
              detailData.status ==
                getEnumValue('PURCHASE_PROJECT_STATE_ENUM.NO_PROJECT_NUM') ||
              detailData.status ==
                getEnumValue('PURCHASE_PROJECT_STATE_ENUM.APPLICATION_DESIGNAT')
            )
          "
          v-permission.auto="
            PARTSPROCURE_EDITORDETAIL_LINGJIANMEICHEYONGLIANG | 零件每车用量
          "
          @updateStartYear="updateTabs"
          :sourcePartProjectType="sourcePartProjectType"
        />
      </el-tab-pane>
      <el-tab-pane
        v-if="!isSteelPurchase"
        lazy
        :label="language('LK_TUZHIHETPDANXIANGQING', '图纸和信息单详情')"
        v-permission.auto="
          PARTSPROCURE_EDITORDETAIL_DRAWINGSANDTPDETAILSPAGE | 图纸和信息单详情
        "
      >
        <drawing :params="infoItem" />
        <sheet class="margin-top20" :params="infoItem" />
      </el-tab-pane>
      <el-tab-pane
        v-if="!isSteelPurchase"
        lazy
        :label="language('LK_WULIUYAOQIU', '物流要求')"
        v-permission.auto="
          PARTSPROCURE_EDITORDETAIL_LOGISTICSREQUIREMENTS | 物流要求
        "
      >
        <logistics :infoItem="infoItem"></logistics>
      </el-tab-pane>
      <el-tab-pane
        v-if="!isSteelPurchase"
        lazy
        :label="language('LK_SHENQINGMUBIAOJIA', '申请目标价')"
        v-permission.auto="
          PARTSPROCURE_EDITORDETAIL_APPLYFORTARGETPRICE | 申请目标价
        "
      >
        <targePrice
          :purchaseProjectId="purchaseProjectId"
          :fsnrGsnrNum="fsnrGsnrNum"
          :partProjectType="detailData.partProjectType || partProjectType"
          :params="infoItem"
        ></targePrice>
      </el-tab-pane>
      <el-tab-pane
        lazy
        :label="language('LK_BEIZHUXINXI', '备注信息')"
        v-permission.auto="
          PARTSPROCURE_EDITORDETAIL_REMARKSINFORMATION | 备注信息
        "
      >
        <remarks></remarks>
      </el-tab-pane>
    </iTabsList>
    <!-- 结束项目 -->
    <backItems
      v-model="diologClose"
      @sure="close"
      :title="language('LK_JIESHUXIANGMU', '结束项目')"
    ></backItems>
    <!--  -->
    <splitFactory
      v-if="splitPurch.splitPurchBoolean"
      ref="purchaseFactory"
      :splitPurchBoolean="splitPurch"
      :purchaseProjectId="purchaseProjectId"
      :firstId="firstId"
      :update="updateTabs"
    >
    </splitFactory>
    <!---------------------------------------------------------------->
    <!----------------------------现供供应商维护模块--------------------->
    <!---------------------------------------------------------------->
    <currentSupplier
      :dialogVisible="curentSupplierDialog"
      :sopDate="sopDate"
    ></currentSupplier>
    <!-----------------------选择原fs号--------------------------------->
    <selectOldpartsNumber
      :diolog="selectOldParts"
      v-model="selectOldParts.selectData"
    ></selectOldpartsNumber>
    <!---------------------- 采购申请弹框 -------------------------------->
    <purchaseApply
      :visibleDiolog.sync="dialogVisibleCode"
      :item="itemPurchase"
    ></purchaseApply>
  </iPage>
</template>
<script>
import Vuex from "vuex";
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
  iMessageBox,
  iInput,
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
// import logButton from "@/components/logButton";
import currentSupplier from "./components/currentSupplier";
import {
  getProjectDetail,
  closeProcure,
  updateProcure,
  startProcure,
} from "@/api/partsprocure/home";
import {
  dictkey,
  checkFactory,
  purchasingLiline,
  purchasingDept,
  getCarTypeSop,
  purchaseFactory,
} from "@/api/partsprocure/editordetail";
import { getCartypeDict } from "@/api/partsrfq/home";
import {
  detailData,
  partsCommonSourcing,
  translateDataForService,
  getOptionField,
  partProjTypeCodeScenarioMap,
} from "./components/data";
import splitFactory from "./components/splitFactory";
import designateInfo from "./components/designateInfo";
import { selectDictByRootKeys } from "@/api/dictionary";
import { partProjTypes, partsType } from "@/config";
import { filterProjectList } from "@/utils";
import selectOldpartsNumber from "./components/selectOldpartsNumber";
import {
  cancelProject,
  creatFsGsNr,
  createNomiappBtn,
  createNomiappBtnAccs,
} from "@/components";
import { getNominateDisabled } from "rise/web/common";
import purchaseApply from "./components/purchaseApply";
import { getEnumValue } from "@/config";
import iLoger from "rise/web/components/iLoger";
import dayjs from "dayjs";
export default {
  components: {
    cancelProject,
    creatFsGsNr,
    createNomiappBtn,
    selectOldpartsNumber,
    iInput,
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
    iLoger,
    backItems,
    splitFactory,
    designateInfo,
    currentSupplier,
    iDatePicker,
    icon,
    createNomiappBtnAccs,
    purchaseApply,
  },
  provide: function () {
    return {
      detailData: this.getDetailData,
      getDisabled: this.getDisabled,
      getDatailFn: this.getDatailFn,
    };
  },
  computed: {
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
    /**
     * @description: 现供供应商按钮逻辑。
     * @param {*}
     * @return {*}
     */
    currentSupplierButton: function () {
      return (
        (this.detailData.partProjectType == partProjTypes.GSLINGJIAN ||
          this.detailData.partProjectType == partProjTypes.GSCOMMONSOURCING) &&
        this.detailData.fsnrGsnrNum
      );
    },
    createdNomiOnlyPartShow() {
      return (
        this.detailData.partProjectType == partProjTypes.JINLINGJIANHAOGENGGAI
      );
    },
    partProjectTypeArray() {
      return this.fromGroup.PART_PROJECT_TYPE || [];
      // return this.detailData.partProjectSource == 1 ? ((this.fromGroup.PART_PROJECT_TYPE || []).filter(item => ![this.partProjTypes.PEIJIAN, this.partProjTypes.FUJIAN].includes(item.code))) : (this.fromGroup.PART_PROJECT_TYPE || [])
    },

    // canChange: false,	// 是否可以修改零件项目类型
    canChange() {
      return (
        ["NO_NR", "NOT_IN_RFQ"].includes(this.detailData.status) &&
        this.detailData.partProjectType != partProjTypes.GONGXUWEIWAI &&
        this.detailData.partProjectType !=
          partProjTypes.GONGXUWEIWAIYICIXINGCAIGOU
      );
    },

    // 是否是工序委外类型
    isGXWW() {
      return (
        this.detailData.partProjectType == partProjTypes.GONGXUWEIWAI ||
        this.detailData.partProjectType ==
          partProjTypes.GONGXUWEIWAIYICIXINGCAIGOU
      );
    },

    /**
     * @description: 是否可以选择commonSourcing的逻辑。如果当前用户更改零件采购系项目类型为 fsCommonSourcing gsCommonSourcing fs零件 GS零件 FS总成件  其他零件不能选择
     * @param {*}
     * @return {*}
     */
    canSelectCommonSourcing() {
      const userSelectProjectCode = this.detailData.partProjectType;
      const choseState = !(
        userSelectProjectCode == this.partProjTypes.GSCOMMONSOURCING ||
        userSelectProjectCode == this.partProjTypes.FSCOMMONSOURCING ||
        userSelectProjectCode == this.partProjTypes.FSXIAOLINGJIAN ||
        userSelectProjectCode == this.partProjTypes.GSLINGJIAN ||
        userSelectProjectCode == this.partProjTypes.FSZONGCHENGJIAN
      );
      if (choseState) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.detailData.isCommonSourcing = false;
      }
      return choseState;
    },
    /**
     * @description: 零件采购项目总成件的显示逻辑。当【零件类型】为零件总成件的时候，才会显示当前按钮
     * @param {*}
     * @return {*}
     */
    createdNomiappAsscShow() {
      return this.detailData.partType == partsType.PARTSACCS;
    },

    linieDept: {
      get() {
        // if (Array.isArray(this.fromGroup.LINIE_DEPT) && !this.fromGroup.LINIE_DEPT.find(item => item.deptNum === this.detailData.linieDept)) {
        // 	return this.detailData.linieDeptName
        // }

        return this.detailData.linieDept;
      },
      set(nv) {
        this.detailData.linieDept = nv;
        this.detailData.linieDeptName = this.fromGroup.LINIE_DEPT.find(
          (item) => item.deptNum === nv
        ).name;
      },
    },
    originPartIsDb() {
      // 采购项目类型为仅零件号变更，且原零件号的采购项目类型为DB
      return (
        [this.partProjTypes.JINLINGJIANHAOGENGGAI].includes(
          this.detailData.partProjectType
        ) &&
        this.detailData.oldPartProjectType === this.partProjTypes.DBLINGJIAN
      );
    },
    // 是否是同类型的零件类型（GS/非GS）
    isSameGroupPartProjectType() {
      if (
        (this.isGs(this.sourcePartProjectType) &&
          this.isGs(this.detailData.partProjectType)) ||
        (!this.isGs(this.sourcePartProjectType) &&
          !this.isGs(this.detailData.partProjectType))
      ) {
        return true;
      }

      return false;
    },
    //是否是一次性采购或者DB一次性采购,工序委外
    iSDisposablePurchase() {
      if (
        this.sourcePartProjectType == "50001001" ||
        this.sourcePartProjectType == "50001000" ||
        this.sourcePartProjectType == partProjTypes.GONGXUWEIWAI ||
        this.sourcePartProjectType == partProjTypes.GONGXUWEIWAIYICIXINGCAIGOU
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 采购项目类型为钢材一次性、批量采购
    isSteelPurchase() {
      return (
        this.detailData.partProjectType ==
          this.partProjTypes.GANGCAIYICIXINGCAIGOU ||
        this.detailData.partProjectType ==
          this.partProjTypes.GANGCAIPILIANGCAIGOU
      );
    },
    // 组合采购工厂类型框的数据(code + options) 用于监控
    procureFactoryPack() {
      return {
        procureFactoryCode: this.detailData.procureFactory || "",
        procureFactoryOptions: this.fromGroup.PURCHASE_FACTORY || [],
      };
    },
    // 组合零件项目类型框的数据(code + options) 用于监控
    partProjectTypePack() {
      return {
        partProjectTypeCode: this.detailData.partProjectType,
        partProjectTypeOptions: this.partProjectTypeArray || [],
      };
    },
    // 组合Linie框的数据(code + options) 用于监控
    liniePack() {
      return {
        linieCode: this.detailData.linieId || "",
        linieOptions: this.fromGroup.LINIE || [],
      };
    },
    // 组合CF控制员框的数据(id + options) 用于监控
    cfControllerPack() {
      return {
        cfControllerId: this.detailData.cfController || "",
        cfControllerOptions: this.fromGroup.CF_CONTROL || [],
      };
    },
    // 判断后端是否有保存采购工厂
    isBlankProcureFactory() {
      return !!this.sourceProcureFactory;
    },
  },
  watch: {
    "selectOldParts.selectData": function (res) {
      this.detailData.oldFsnrGsnrNum = res.fsnrGsnrNum;
      this.detailData.oldPurchasingProjectId = res.partProjId;
    },
    procureFactoryPack(data) {
      if (
        this.$refs.procureFactorySelect &&
        this.$refs.procureFactorySelect.$el &&
        this.$refs.procureFactorySelect.$el.querySelector("input")
      ) {
        const inputDom =
          this.$refs.procureFactorySelect.$el.querySelector("input");

        if (data.procureFactoryCode) {
          inputDom.value = this.detailData.procureFactoryName || "";
          const current = data.procureFactoryOptions.find(
            (option) => option.code === data.procureFactoryCode
          );
          if (current) inputDom.value = current.name;
        } else {
          inputDom.value = "";
        }
      }
    },
    partProjectTypePack(data) {
      if (
        this.$refs.partProjectTypeSelect &&
        this.$refs.partProjectTypeSelect.$el &&
        this.$refs.partProjectTypeSelect.$el.querySelector("input")
      ) {
        const inputDom =
          this.$refs.partProjectTypeSelect.$el.querySelector("input");

        if (data.partProjectTypeCode) {
          inputDom.value = this.detailData.partProjectTypeDesc || "";
          const current = data.partProjectTypeOptions.find(
            (option) => option.code === data.partProjectTypeCode
          );
          if (current) inputDom.value = current.name;
        } else {
          inputDom.value = "";
        }
      }
    },
    liniePack(data) {
      if (
        this.$refs.linieSelect &&
        this.$refs.linieSelect.$el &&
        this.$refs.linieSelect.$el.querySelector("input")
      ) {
        const inputDom = this.$refs.linieSelect.$el.querySelector("input");

        if (data.linieCode) {
          inputDom.value = this.detailData.linieName || "";
          const current = data.linieOptions.find(
            (option) => option.code === data.linieCode
          );
          if (current) inputDom.value = current.name;
        } else {
          inputDom.value = "";
        }
      }
    },
    cfControllerPack(data) {
      if (
        this.$refs.cfControllerSelect &&
        this.$refs.cfControllerSelect.$el &&
        this.$refs.cfControllerSelect.$el.querySelector("input")
      ) {
        const inputDom =
          this.$refs.cfControllerSelect.$el.querySelector("input");

        if (data.cfControllerId) {
          inputDom.value = this.detailData.cfControllerName || "";
          const current = data.cfControllerOptions.find(
            (option) => option.id === data.cfControllerId
          );
          if (current) inputDom.value = current.name;
        } else {
          inputDom.value = "";
        }
      }
    },
  },
  data() {
    return {
      // 零件项目类型
      partProjTypes,
      firstId: "",
      infoItem: { id: null },
      detailData: detailData, //顶部详情数据
      sourceDetailData: {}, // 后端保存的详情数据
      targetprice: {}, //申请目标价数据
      fromGroup: {}, //上方筛选列表
      diologClose: false, //结束项目
      splitPurch: {
        splitPurchBoolean: false,
      }, //拆分采购工厂
      purchaseProjectId: "",
      curentSupplierDialog: { show: false },
      dialogVisibleCode: false,
      fsnrGsnrNum: "",
      partProjectType: "",
      selectOldParts: {
        show: false,
        selectData: [],
      },
      saveLoading: false,
      detailLoading: false,
      disabled: false,
      itemPurchase: {},
      isCarType: false,
      bakCarTypeSopTime: "",
      sourcePartProjectType: "", // 后端返回的partProjectType
      sourceProcureFactory: "",
      cacheCarTypeProject: {},
      sopDate: "",
      factoryCache: [],
      previousPartProjectType: "",
      defaultPartProjectTypeProcureFactoryCache: "", // 批量件类型的采购工厂缓存
      pFPartProjectTypeProcureFactoryCache: "", // 配附件类型的采购工厂缓存
      partProjectSourceScenarioCode: "",
    };
  },
  created() {
    this.getDicts();
    this.getProcureGroup();
    this.getCarTypeSopList();
    this.getDatailFn();
  },
  methods: {
    getEnumValue,
    /**
     * @description: 改变部门的时候，拿到最新的linie列表
     * @param {*}
     * @return {*}
     */
    changeUserDept() {
      this.clearLinie();
      const currentLinieDept = this.fromGroup["LINIE_DEPT"].find(
        (item) => item.deptNum === this.detailData.linieDept
      );

      this.getLinie(currentLinieDept.deptNum);
    },
    getLinie(id) {
      if (!id) return;

      purchasingLiline(id).then((r) => {
        if (r.code == 200) {
          this.fromGroup["LINIE"] = Array.isArray(r.data) ? r.data : [];
        }
      });
    },
    openDiologOldParts() {
      if (this.detailData.procureFactory == "")
        return iMessage.warn(
          this.language(
            "NINDANGQIANWEIXUANZE",
            "您当前还未选择采购工厂，请选择后重试！"
          )
        );
      this.selectOldParts.show = true;
    },
    filterProjectList(a, b) {
      return filterProjectList(a, b, this.detailData.partProjectSource == 1); // 新建信息单过来的数据强制释放
    },
    /**
     * @description: 是否是commonsourcing的change选择框。
     * @param {*} e
     * @return {*}
     */
    changeCommonSourcing(e) {
      const fsCommonSourcing = partsCommonSourcing.find(
        (i) => i.fs == this.detailData.partProjectType
      );
      if (e && fsCommonSourcing) {
        this.detailData.partProjectType = fsCommonSourcing.common;
      }
    },
    getDetailData() {
      return this.detailData;
    },
    getDict() {
      selectDictByRootKeys([
        { keys: "TERMS_PAYMENT" },
        { keys: "TERMS_PURCHASE" },
        { keys: "PP_CSTMGMT_CURRENCY" },
        // { keys: "CAR_TYPE_PRO" }
      ]).then((res) => {
        if (res.code == 200) {
          Object.keys(res.data || {}).forEach((key) => {
            this.fromGroup = Object.assign({}, this.fromGroup, {
              [key]: Array.isArray(res.data[key]) ? res.data[key] : [],
            });
          });
        }
      });
    },
    getDicts() {
      this.getDict();
      this.getCartypeDict();
    },
    fillterss(data) {
      if (data) {
        return "是";
      } else {
        return "否";
      }
    },
    //判断采购项目来源，查看是否能选择车型项目
    // carTypeCanselect(){
    // 	if(this.detailData.partProjectSource == 1){
    // 		return true
    // 	}else {
    // 		return false
    // 	}
    // },
    // 判断采购项目来源，查看是否能选择采购工厂
    procureFactoryCanselect() {
      return this.detailData.partProjectSource == 4;
    },
    splitPurchFn() {
      this.splitPurch.splitPurchBoolean = true;
    },
    //---------------------------------------------------
    // 获取详情数据
    getDatailFn() {
      this.detailLoading = true;
      this.defaultPartProjectTypeProcureFactoryCache = "";
      this.pFPartProjectTypeProcureFactoryCache = "";
      getProjectDetail(this.$route.query.projectId).then((res) => {
        if (
          [this.partProjTypes.PEIJIAN, this.partProjTypes.FUJIAN].includes(
            res.data.partProjectType
          )
        ) {
          this.purchaseFactory();
          this.pFPartProjectTypeProcureFactoryCache = res.data.procureFactory;
        } else {
          this.$set(this.fromGroup, "PURCHASE_FACTORY", this.factoryCache);
          this.defaultPartProjectTypeProcureFactoryCache =
            res.data.procureFactory;
        }

        if (this.$route.query.businessKey != res.data.partProjectType) {
          this.$router.replace({
            path: this.$router.history.current.path,
            query: {
              ...this.$route.query,
              businessKey: res.data.partProjectType,
            },
          });
        }

        this.detailLoading = false;
        this.detailData = res.data || {};
        this.getLinie(this.detailData.linieDept);
        this.sopDate = res.data.sopDate || "";
        this.sourceProcureFactory = res.data.procureFactory;
        this.sourceDetailData = Object.freeze(_.cloneDeep(this.detailData)); // 用于数据还原操作，调用获取详情接口才更新
        this.sourcePartProjectType = res.data.partProjectType;
        this.previousPartProjectType = res.data.partProjectType;

        this.executeScenario(); // 执行场景

        this.bakCarTypeSopTime = this.detailData && this.detailData.sopDate;
        if (this.detailData.cartypes) {
          this.$set(
            this.detailData,
            "carTypeModel",
            this.detailData.cartypes.map((val) => val.id)
          );
        }
        this.infoItem = res.data;
        this.purchaseProjectId = this.infoItem.id;
        this.fsnrGsnrNum = this.infoItem.fsnrGsnrNum;
        this.partProjectType = this.infoItem.partProjectType;
        this.infoItem.partProjectType == "1000003" ||
        this.infoItem.partProjectType == "50002001"
          ? (this.isCarType = true)
          : (this.isCarType = false);

        if (this.isCarType) {
          this.$nextTick(() => {
            const dom =
              this.$refs.carTypeModelSelect.$el.querySelector(
                ".el-select__input"
              );
            dom.style.display = "none";
          });
        }

        //-------------修改零件采购项目逻辑endding
        if (
          res.data.applicationStatus ||
          res.data.nominateProcessType ||
          res.data.isPriceConsistent
        ) {
          this.disabled = getNominateDisabled({
            applicationStatus: res.data.applicationStatus, // FREEZE
            designateType: res.data.nominateProcessType, // RECORD
            isPriceConsistent: res.data.isPriceConsistent, // null
          });
        } else {
          this.disabled = false;
        }

        if (res.data.targetprice) {
          this.targetprice = res.data.targetprice;
        }
        if (
          this.detailData.partProjectType !==
            this.partProjTypes.GANGCAIYICIXINGCAIGOU &&
          this.infoItem.id
        ) {
          try {
            this.$refs.materialGroupInfo.getMaterialGroup();
          } catch (error) {
            console.warn(
              "at first times the components will be to go mounted..."
            );
          }
        }
      });
    },
    //获取liline部门

    purchasingDept() {
      purchasingDept().then((r) => {
        if (r.code == 200) {
          this.fromGroup["LINIE_DEPT"] = Array.isArray(r.data) ? r.data : [];
        }
      });
    },
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict()
        .then((res) => {
          this.fromGroup["CAR_TYPE"] = res.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProcureGroup() {
      dictkey()
        .then((res) => {
          if (res.code == 200 && res.data) {
            const map = {};
            Object.keys(res.data || {}).forEach((key) => {
              // 容错
              if (key == "PURCHASE_FACTORY") this.factoryCache = res.data[key];
              if (
                key == "PURCHASE_FACTORY" &&
                this.detailData &&
                [
                  this.partProjTypes.PEIJIAN,
                  this.partProjTypes.FUJIAN,
                ].includes(this.detailData.partProjectType)
              )
                return;

              if (key !== "CAR_TYPE_PRO") {
                map[key] = Array.isArray(res.data[key]) ? res.data[key] : [];
              }
            });

            this.fromGroup = Object.assign({}, this.fromGroup, map);
            this.$forceUpdate();
            this.purchasingDept();
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh);
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
        remark: "",
        ids: [this.infoItem.id],
      };
      startProcure(start).then((res) => {
        if (res.data) {
          iMessage.success(this.language("LK_CAOZUOCHENGGONG", "操作成功"));
          this.getDatailFn();
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
        remark: backmark,
        ids: [this.infoItem.id],
      };
      closeProcure(close).then((res) => {
        this.diologClose = false;
        if (res.data) {
          this.getDatailFn();
          iMessage.success(this.language("LK_CAOZUOCHENGGONG", "操作成功"));
        } else {
          iMessage.error(res.desZh);
        }
      });
    },
    /**
     * @description: 限制保存和提交的零件类型和是否commonsourcing是否匹配
     * @param {*}
     * @return {*}
     */
    fsProjectTypeAnIscommonSroucing(callBack) {
      if (
        !this.detailData.isCommonSourcing &&
        (this.detailData.partProjectType == partProjTypes.FSCOMMONSOURCING ||
          this.detailData.partProjectType == partProjTypes.GSCOMMONSOURCING)
      ) {
        iMessageBox(
          this.language(
            "SPIRNT11COMMONSS",
            "当前零件采购项目类型与commonSourcing为[否]不统一，是否继续？"
          )
        ).then((res) => {
          callBack();
        });
      } else {
        callBack();
      }
    },
    // 选择车型项目的时候，需要带出对应车型的SOP时间
    handleChangeByCarTypeProject(code) {
      const currentCarTypeProject =
        (Array.isArray(this.fromGroup.CAR_TYPE_PRO) &&
          this.fromGroup.CAR_TYPE_PRO.find((item) => item.code === code)) ||
        {};
      this.$set(this.detailData, "carTypeProjectNum", code);
      this.$set(
        this.detailData,
        "carTypeProjectId",
        currentCarTypeProject.id || ""
      );
      this.$set(
        this.detailData,
        "carTypeProjectZh",
        currentCarTypeProject.name || ""
      );
      this.$set(
        this.detailData,
        "sopDate",
        currentCarTypeProject.sopDate || ""
      );
    },
    // 清除采购项目
    clearCarTypeProject() {
      this.$set(this.detailData, "carTypeProjectNum", "");
      this.$set(this.detailData, "carTypeProjectId", "");
      this.$set(this.detailData, "carTypeProjectZh", "");
    },
    // 缓存车型项目
    updateCacheCarTypeProject(data) {
      this.cacheCarTypeProject = {
        carTypeProjectNum: data.carTypeProjectNum,
        carTypeProjectId: data.carTypeProjectId,
        carTypeProjectZh: data.carTypeProjectZh,
      };
    },
    // 修改采购工厂
    handleChangeByProcureFactory(code) {
      const { detailData = {} } = this;
      console.log(detailData, "detailDatadetailDatadetailData");
      // 必传参数：partProjectTypeCode、factoryId
      //其他参数：当partProjectTypeCode是GS零件或者GS common sourcing时，传carTypeIds参数；当是partProjectTypeCode是其他类型时，传carTypeProjectNum
      const data = {
        // id: this.detailData.id,
        factoryId: code, // 该字段是code
        partProjectTypeCode: detailData.partProjectType,
      };
      if (
        detailData.partProjectType == partProjTypes["GSCOMMONSOURCING"] ||
        detailData.partProjectType == partProjTypes["GSLINGJIAN"]
      ) {
        data["carTypeIds"] = detailData.carTypeModel;
      } else {
        data["carTypeProjectNum"] = detailData.carTypeProjectNum;
      }
      //
      checkFactory(data)
        .then((res) => {
          if (res.code == 200) {
            if (res.data) {
              // 一致
              this.setProcureFactory(code);
            } else {
              const tips = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
              iMessageBox(
                // 不一致
                // this.language('LK_FACTORYNOTSAME', '您所选的采购工厂与主数据中该车型项目对应的采购工厂不一致，请确认是否修改'),
                tips,
                this.language("LK_WENXINTISHI", "温馨提示")
              )
                .then(() => {
                  this.setProcureFactory(code);
                })
                .catch(() => {
                  this.$set(
                    this.detailData,
                    "procureFactory",
                    this.sourceDetailData.procureFactory
                  );
                  this.$set(
                    this.detailData,
                    "procureFactoryId",
                    this.sourceDetailData.procureFactoryId
                  );
                  this.$set(
                    this.detailData,
                    "procureFactoryName",
                    this.sourceDetailData.procureFactoryName
                  );
                });
            }
          }
        })
        .catch((err) => iMessage.error(err.desZh));
    },
    // 设置采购工厂
    setProcureFactory(code) {
      const currentProcureFactory =
        (Array.isArray(this.fromGroup.PURCHASE_FACTORY) &&
          this.fromGroup.PURCHASE_FACTORY.find((item) => item.code == code)) ||
        {};
      this.$set(this.detailData, "procureFactory", code);
      this.$set(
        this.detailData,
        "procureFactoryId",
        currentProcureFactory.id || ""
      );
      this.$set(
        this.detailData,
        "procureFactoryName",
        currentProcureFactory.name || ""
      );
    },
    // 清除采购工厂
    clearProcureFactory() {
      this.$set(this.detailData, "procureFactory", "");
      this.$set(this.detailData, "procureFactoryId", "");
      this.$set(this.detailData, "procureFactoryName", "");
    },
    // 修改Linie
    handleChangeByLinie(code) {
      const currentLinie =
        (Array.isArray(this.fromGroup.LINIE) &&
          this.fromGroup.LINIE.find((item) => item.code == code)) ||
        {};
      this.$set(this.detailData, "linieId", code); // 该字段是code
      this.$set(this.detailData, "linieName", currentLinie.name || "");
    },
    // 清除Linie
    clearLinie() {
      this.$set(this.detailData, "linieId", "");
      this.$set(this.detailData, "linieName", "");
    },
    // 修改CF控制员
    handleChangeByCfController(id) {
      const currentCfController =
        (Array.isArray(this.fromGroup.CF_CONTROL) &&
          this.fromGroup.CF_CONTROL.find((item) => item.id == id)) ||
        {};
      this.$set(this.detailData, "cfControllerName", currentCfController.name);
      this.$set(this.detailData, "cfControllerPositionId", "");
    },
    saveFn() {
      this.fsProjectTypeAnIscommonSroucing(this.save);
      //刷新产量计划时间之前。得清空一下选择时间。
      this.setYearNull();
    },
    //修改详情。
    save(val) {
      this.saveLoading = true;
      let detailData = {};
      for (let i in this.detailData) {
        if (
          i != "csfMemo" &&
          i != "linieMemo" &&
          i != "cs1Memo" &&
          i != "csfMeetMemo" &&
          i != "linieMeetMemo" &&
          i != "cs1MeetMemo" &&
          i != "aekoManagerMemo"
        ) {
          detailData[i] = this.detailData[i];
        }
      }

      // 手动加一下cf控制员cfControllerName缺失问题
      this.checkCfController();

      detailData["oldProjectRelations"] = [
        Object.assign(
          {},
          translateDataForService(this.selectOldParts.selectData),
          { purchasingProjectId: this.detailData.id }
        ),
      ];
      if (detailData.carTypeModel != undefined) {
        let temData =
          (this.fromGroup.CAR_TYPE &&
            Array.isArray(this.fromGroup.CAR_TYPE) &&
            this.fromGroup["CAR_TYPE"].filter((item) => {
              return detailData.carTypeModel.indexOf(item.id) > -1;
            })) ||
          [];
        detailData["cartypes"] = temData;
      }

      return new Promise((resolve, reject) => {
        updateProcure(detailData)
          .then((res) => {
            this.saveLoading = false;
            if (res.data) {
              iMessage.success(this.language("LK_YIBAOCUN", "已保存"));
              this.getDatailFn();
              //刷新零件产量逻辑。1.如果当前零件是gs零件 则sop时间用户是可以自己选择的。一旦选择过后零件产量里面的开始时间。后端得重新默认一个
              //所以需要刷新一下零件产量页签
              this.updateTabs();
              //更新每车用量
              this.$refs.volume && this.$refs.volume.getData();
              resolve(res);
            } else {
              iMessage.error(res.desZh);
              reject(res);
            }
          })
          .finally(() => (this.saveLoading = false));
      });
    },
    // 返回
    back() {
      this.$router.go(-1);
    }, // 查看日志
    log() {
      window.open(`/#/log?recordId=${this.detailData.id}`, "_blank");
    },

    /**
     * @description: 更新零件产量计划页签。为sop时间更新过后做方法铺垫。
     * @param {*}
     * @return {*}
     */
    updateTabs() {
      this.$refs.outputPlan && this.$refs.outputPlan.getData();
      this.$refs.outputRecord && this.$refs.outputRecord.getData();
    },
    /**
     * @description: 清空当前时间，更改sop时间过后。需要置空产量计划的开始时间。将默认开始时间同步为sop时间（默认的动作后台已经判断）
     * @param {*}
     * @return {*}
     */
    setYearNull() {
      this.$refs.outputPlan &&
        typeof this.$refs.outputPlan.clearTime === "function" &&
        this.$refs.outputPlan.clearTime();
    },
    // 下拉框逻辑提示
    tips() {},
    updateStartYear(startYear) {
      this.$refs.outputRecord.updateStartYear(startYear);
    },
    updateOutput(data) {
      this.$refs.outputPlan.updateOutput(data);
    },
    /**
     * @description: 零件项目类型 db一次性采购、一次性采购与是否DB件联动
     * @param {*}
     * @return {*}
     */
    onIsDBChange(data) {
      this.detailData.partProjectType = data
        ? partProjTypes.DBYICHIXINGCAIGOU
        : partProjTypes.YICIXINGCAIGOU;
      this.detailData.partProjectType === partProjTypes.DBYICHIXINGCAIGOU &&
        this.detailData.isDb;
    },
    /**
     * @description: 零件项目类型,当类型为db一次性采购，isDB默认选是
     * @param {*}
     * @return {*}
     */
    onPartProjectTypeChange(data) {
      this.$set(this.detailData, "carTypeModel", []);
      this.$nextTick(() => {
        if (this.$refs.carTypeModelSelect)
          this.$refs.carTypeModelSelect.$el.querySelector("input").value = "";
        if (this.$refs.carTypeProjectNum)
          this.$refs.carTypeProjectNum.$el.querySelector("input").value = "";
      });

      // 手动加一下cf控制员cfControllerName缺失问题
      this.checkCfController();

      this.detailData.isDb = data === partProjTypes.DBYICHIXINGCAIGOU;
      data == "50002001" || data == "1000003"
        ? (this.isCarType = true)
        : (this.isCarType = false);

      if (this.isGs(data)) {
        this.updateCacheCarTypeProject({
          carTypeProjectNum:
            this.detailData.carTypeProjectNum ||
            this.cacheCarTypeProject.carTypeProjectNum,
          carTypeProjectId:
            this.detailData.carTypeProjectId ||
            this.cacheCarTypeProject.carTypeProjectId,
          carTypeProjectZh:
            this.detailData.carTypeProjectZh ||
            this.cacheCarTypeProject.carTypeProjectZh,
        });
        this.clearCarTypeProject();
      } else {
        this.$set(
          this.detailData,
          "carTypeProjectNum",
          this.detailData.carTypeProjectNum ||
            this.cacheCarTypeProject.carTypeProjectNum
        );
        this.$set(
          this.detailData,
          "carTypeProjectId",
          this.detailData.carTypeProjectId ||
            this.cacheCarTypeProject.carTypeProjectId
        );
        this.$set(
          this.detailData,
          "carTypeProjectZh",
          this.detailData.carTypeProjectZh ||
            this.cacheCarTypeProject.carTypeProjectZh
        );
        this.cacheCarTypeProject = {};
      }

      // GS => 非GS, 非GS => GS, 清空零件每车用量
      if (
        (this.isGs(this.sourcePartProjectType) && this.isGs(data)) ||
        (!this.isGs(this.sourcePartProjectType) && !this.isGs(data))
      ) {
        this.$refs.volume &&
          typeof this.$refs.volume.reduction === "function" &&
          this.$refs.volume.reduction();
      } else {
        this.$refs.volume &&
          typeof this.$refs.volume.clearAll === "function" &&
          this.$refs.volume.clearAll();
      }

      if (
        ![this.partProjTypes.PEIJIAN, this.partProjTypes.FUJIAN].includes(
          this.previousPartProjectType
        ) &&
        [this.partProjTypes.PEIJIAN, this.partProjTypes.FUJIAN].includes(data)
      ) {
        // 非配附件 => 配附件
        this.defaultPartProjectTypeProcureFactoryCache =
          this.detailData.procureFactory;
        this.purchaseFactory();
        this.clearProcureFactory();

        if (this.pFPartProjectTypeProcureFactoryCache) {
          this.setProcureFactory(this.pFPartProjectTypeProcureFactoryCache);
        }
      }

      if (
        [this.partProjTypes.PEIJIAN, this.partProjTypes.FUJIAN].includes(
          this.previousPartProjectType
        ) &&
        ![this.partProjTypes.PEIJIAN, this.partProjTypes.FUJIAN].includes(data)
      ) {
        // 配附件 => 非配附件
        this.pFPartProjectTypeProcureFactoryCache =
          this.detailData.procureFactory;
        this.$set(this.fromGroup, "PURCHASE_FACTORY", this.factoryCache);
        this.clearProcureFactory();

        if (this.defaultPartProjectTypeProcureFactoryCache) {
          this.setProcureFactory(
            this.defaultPartProjectTypeProcureFactoryCache
          );
        }
      }

      this.previousPartProjectType = data; // 重置为当前选择的采购项目类型
    },
    // 判断是否为GS类零件
    isGs(partProjectType) {
      return (
        partProjectType == partProjTypes.GSLINGJIAN ||
        partProjectType == partProjTypes.GSCOMMONSOURCING
      );
    },
    getName(value, code, options) {
      return getOptionField(value, code, options);
    },
    getDisabled() {
      return this.disabled;
    },
    openCode() {
      this.dialogVisibleCode = true;
      // let data = JSON.parse(this.$route.query.item)
      this.itemPurchase.riseCode = this.infoItem.code;
      this.itemPurchase.sapItem = this.infoItem.item;
    },
    // 获取车型项目sop
    getCarTypeSopList() {
      getCarTypeSop().then((res) => {
        if (res && res.code === "200") {
          this.fromGroup.CAR_TYPE_PRO = Array.isArray(res.data)
            ? res.data.map((item) => ({
                id: item.id,
                code: item.cartypeProCode,
                name: item.cartypeProName,
                sopDate: item.sop,
              }))
            : [];

          this.$forceUpdate();
        }
      });
    },
    formatDate(val, format = "YYYY-MM-DD") {
      return dayjs(val).format(format);
    },
    // 获取sop日期禁止编辑状态
    getSopDateDisabled() {
      if (Array.isArray(this.fromGroup.CAR_TYPE_PRO)) {
        const currentCarTypeProject =
          this.fromGroup.CAR_TYPE_PRO.find(
            (item) => item.code === this.detailData.carTypeProjectNum
          ) || {};
        return currentCarTypeProject.sopDate ? true : false;
      } else {
        return true;
      }
    },
    checkCfController() {
      const { detailData = {} } = this;
      if (detailData["cfController"] && !detailData["cfControllerName"]) {
        const currentCfController =
          (Array.isArray(this.fromGroup.CF_CONTROL) &&
            this.fromGroup.CF_CONTROL.find(
              (item) => item.id == detailData["cfController"]
            )) ||
          {};
        detailData["cfControllerName"] = currentCfController.name;
      }
    },
    handleVisibleChangeByCarTypeModel(status) {
      const inputDom =
        this.$refs.carTypeModelSelect.$el.querySelector(".el-select__input");
      const showDom =
        this.$refs.carTypeModelSelect.$el.querySelector(".el-input__inner");
      if (status) {
        this.$refs.carTypeModelSelect.focus();
        inputDom.style.display = "block";
        inputDom.focus();
      } else {
        this.$refs.carTypeModelSelect.blur();
        inputDom.style.display = "none";
        inputDom.blur();
        showDom.style.height = "auto";
      }
    },
    openCurentSupplierDialog() {
      if (this.sopDate !== this.detailData.sopDate) {
        iMessage.warn(
          this.language("SOPRIQICUNZAIGAIDONG", "SOP日期存在改动，请保存后再试")
        );
        return;
      }

      this.curentSupplierDialog.show = true;
    },
    purchaseFactory() {
      purchaseFactory({
        isSparePart: true,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$set(
              this.fromGroup,
              "PURCHASE_FACTORY",
              Array.isArray(res.data)
                ? res.data.map((item) => ({
                    id: item.id,
                    name: item.factoryName,
                    nameDe: item.factoryNameDe,
                    nameEn: item.factoryNameEn,
                    code: item.procureFactory,
                  }))
                : []
            );
          } else {
            this.$set(this.fromGroup, "PURCHASE_FACTORY", []);
          }
        })
        .catch(() => {
          this.$set(this.fromGroup, "PURCHASE_FACTORY", []);
        });
    },

    // 采购项目来源Code
    getPartProjectSourceScenarioCode() {
      if (this.sourcePartProjectType === partProjTypes.PEIJIAN) return "EPS"; // 零件来源：EPS

      if (
        [
          partProjTypes.FUJIAN, // 附件
          partProjTypes.GANGCAIYICIXINGCAIGOU, // 钢材一次性采购
          partProjTypes.GANGCAIPILIANGCAIGOU, // 钢材批量采购
        ].includes(this.sourcePartProjectType)
      )
        return "ExcelImport"; // 零件来源：Excel导入

      if (this.detailData.partProjectSource == 1) return "NewPro"; // 零件来源：NewPro

      if (this.detailData.partProjectSource == 2) return "ManualCreate"; // 零件来源：手工创建

      if (this.detailData.partProjectSource == 3) return "AEKO"; // 零件来源：AEKO

      if (
        this.detailData.partProjectSource == 4 ||
        this.detailData.partProjectSource == 5
      )
        return "PR"; // 零件来源：一次性采购
    },

    // 根据项目来源执行场景
    executeScenario() {
      this.partProjectSourceScenarioCode =
        this.getPartProjectSourceScenarioCode();

      if (!this.partProjectSourceScenarioCode) return;

      // ...
    },

    // 获取零件采购列表
    getPartProjectTypeOptions() {
      if (!this.partProjectSourceScenarioCode) return [];

      const keys =
        partProjTypeCodeScenarioMap[this.partProjectSourceScenarioCode];
      const codes = keys.map((key) => this.partProjTypes[key]);
      return this.partProjectTypeArray.filter((item) =>
        codes.includes(item.code)
      );
    },

    dataFlow() {
      const args = Array.apply(null, arguments);
      const items = args[0];
      const rules = args.slice(1);

      let result = items;
      rules.forEach((rule) => {
        if (typeof rule === "function") {
          result = rule(result);
        }
      });

      return result;
    },

    // 扩产能规则 仅适用于手工创建
    manualCreateCapacityPartProjectTypeOptionsRule(data) {
      if (this.partProjectSourceScenarioCode !== "ManualCreate") return data;

      const roleSet = new Set();
      const positionList = this.userInfo.positionList || [];
      positionList.forEach((position) => {
        if (Array.isArray(position.roleDTOList)) {
          position.roleDTOList.forEach((role) => roleSet.add(role.code));
        }
      });

      const roleList = Array.from(roleSet);
      roleList.push("KCNGLY", "absss");
      if (roleList.includes("KCNGLY")) {
        let keys = [];
        if (roleList.length === 1) {
          // 仅有扩产能采购员角色的情况
          keys = ["KUOCHANNENG"];
        } else {
          keys =
            partProjTypeCodeScenarioMap[
              this.partProjectSourceScenarioCode
            ].concat("KUOCHANNENG"); // 扩产能
        }

        const codes = keys.map((key) => this.partProjTypes[key]);
        return this.partProjectTypeArray.filter((item) =>
          codes.includes(item.code)
        );
      }

      return data;
    },
  },
};
</script>
<style lang="scss" scoped>
.openLinkText {
  color: $color-blue;
  text-decoration: underline;
  margin-left: 5px;
}
::v-deep.removeInputDisabelColor {
  .el-input__inner {
    background-color: white !important;
    cursor: pointer;
    .el-input__suffix {
      cursor: pointer !important;
    }
    .el-input__icon {
      cursor: pointer !important;
    }
  }
}
.el-icon-search {
  cursor: pointer;
}
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
