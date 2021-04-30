<!--
 * @Author: yz
 * @Date: 2021-04-26 09:50:42
 * @Description: 投资清单。
-->
<template>
  <div class="investmentList">
    <div>
      <!------------------------------------------------------------------------>
      <!--                  search 搜索模块                                   --->
      <!------------------------------------------------------------------------>
      <iCard v-loading="headerLoading" class="margin-bottom20 headerIcard" style="margin-top: 20px">
        <img class="editIcon" src="../../../assets/images/editCar.png" alt="">
        <div class="infoIcard">
          <div class="search">
            <label>版本号：</label>
            <iSelect
                v-show="!pageEdit"
                placeholder="请选择"
                v-model="form['search.version']"
                v-permission="PARTSPROCURE_PARTSTATUS"
                filterable
                @change="changeVersion"
            >
              <el-option
                  :value="item.id"
                  :label="item.version"
                  v-for="(item, index) in versionList"
                  :key="index"
              ></el-option>
            </iSelect>
            <span v-show="pageEdit">{{ versionName }}</span>
          </div>
          <div>
            <label>车型名称：</label>
            <span>{{ form['search.carTypeName'] }}</span>
          </div>
          <div class="search" v-show="(params.sourceStatus == 2) && pageEdit">
            <label>关联车型：</label>
            <iSelect
                placeholder="请选择"
                v-model="form['search.relatedCarType']"
                v-permission="PARTSPROCURE_PARTSTATUS"
                filterable
                @change="relationMainCarType"
            >
              <el-option
                  :value="item.id"
                  :label="item.carTypeProjectName"
                  v-for="(item, index) in mainCarTypeList"
                  :key="index"
              ></el-option>
            </iSelect>
            <!--            <span>V-PSK88</span>-->
          </div>
          <div v-show="params.sourceStatus == 1">
            <label>采购工厂：</label>
            <span>{{ form['search.purchasingFactory'] }}</span>
          </div>
          <div v-show="params.sourceStatus == 1">
            <label>SOP：</label>
            <span>{{ form['search.sopDate'] }}</span>
          </div>
          <div class="search">
            <label>批准投资：</label>
            <span v-show="!pageEdit">{{ form['search.approvalInvestment'] }}</span>
            <iInput v-show="pageEdit" v-model="form['search.approvalInvestment']"></iInput>
          </div>
        </div>
        <div id="chart1" style="width: 200px; height: 200px"></div>
        <div class="legend">
          <div>非AEKO</div>
          <div>AEKO</div>
          <div>Contingency</div>
          <div>单位：百万元</div>
        </div>
      </iCard>
      <iCard v-loading="contentLoading">
        <!------------------------------------------------------------------------>
        <!--                  table模块，向外入参表格数据，表头                    --->
        <!------------------------------------------------------------------------>
        <div class="header margin-bottom20">
          <!--          <div class="search">-->
          <!--            <label>专业科室：</label>-->
          <!--            <iSelect-->
          <!--                placeholder="请选择"-->
          <!--                v-model="form['search.professionalDepartments']"-->
          <!--                v-permission="PARTSPROCURE_PARTSTATUS"-->
          <!--                filterable-->
          <!--                @change="findInvestmentList"-->
          <!--            >-->
          <!--              <el-option-->
          <!--                  :value="item.commodity"-->
          <!--                  :label="item.commodityName"-->
          <!--                  v-for="(item, index) in commodityList"-->
          <!--                  :key="index"-->
          <!--              ></el-option>-->
          <!--            </iSelect>-->
          <!--          </div>-->
          <div></div>
          <div>
            <iButton v-show="!pageEdit" @click="pageEdit = true">编辑</iButton>
            <iButton v-show="pageEdit" @click="addRow">添加行</iButton>
            <iButton v-show="pageEdit" @click="deleteIRow">删除行</iButton>
            <!--            <iButton v-show="pageEdit" @click="referenceModelShow = true">参考车型</iButton>-->
            <iButton v-show="pageEdit" @click="saveRow">保存</iButton>
            <iButton v-show="pageEdit" @click="saveAsRow">保存为新版本</iButton>
            <!--            <iButton @click="saveRow">下载投资清单</iButton>-->
            <iButton v-show="pageEdit" @click="conversionRatioShow = true">按比例折算</iButton>
          </div>
        </div>
        <tablelist
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="tableLoading"
            @handleSelectionChange="handleSelectionChange"
            @openPage="openPage"
            :activeItems="'partNum'"
        >
          <template #refCartypeProId="scope">
            <a :href="scope.row.refCartypeProId">{{ scope.row.refCartypeProId }}</a>
          </template>
          <template #budgetAmount="scope">
            <iInput v-model="scope.row.budgetAmount" v-if="pageEdit"></iInput>
            <div v-if="!pageEdit">{{ scope.row.budgetAmount }}</div>
          </template>
          <template #moldProperties="scope">
            <iSelect
                v-show="pageEdit"
                placeholder="请选择"
                v-model="scope.row.moldProperties"
                v-permission="PARTSPROCURE_PARTSTATUS"
                filterable
                @change="changeCarTypeProject"
            >
              <el-option
                  :value="item.modelProtitesName"
                  :label="item.modelProtitesName"
                  v-for="(item, index) in modelProtitesList"
                  :key="index"
              ></el-option>
            </iSelect>
            <div v-if="!pageEdit">{{ scope.row.moldProperties }}</div>
          </template>
          <template #sourcingType="scope">
            <div v-if="!pageEdit">{{ scope.row.sourcingType == 1 ? 'Y' : 'N' }}</div>
            <iSelect
                v-show="pageEdit"
                placeholder="请选择"
                v-model="scope.row.sourcingType"
                v-permission="PARTSPROCURE_PARTSTATUS"
                filterable
                @change="changeCarTypeProject"
            >
              <el-option :value="1" label="Y"></el-option>
              <el-option :value="2" label="N"></el-option>
            </iSelect>
          </template>
          <template #remarks="scope">
            <iInput v-model="scope.row.remarks" v-if="pageEdit"></iInput>
            <div v-if="!pageEdit">{{ scope.row.remarks }}</div>
          </template>
        </tablelist>
        <div class="buttomInput">
          <div>
            <h4>SUB-TOTAL:</h4>
            <iInput v-model="form['search.SUBTOTA']" disabled></iInput>
          </div>
          <div>
            <h4>AEKO:</h4>
            <iInput v-model="aekoPercent"></iInput>% of Sub-Total
          </div>
          <div>
            <h4>AEKO金额:</h4>
            <iInput v-model="AEKOMoney"></iInput>
          </div>
          <div>
            <h4>综合偏差:</h4>
            <iInput v-model="form['search.contingencyPercent']"></iInput>% of Sub-Total
          </div>
          <div>
            <h4>综合偏差金额:</h4>
            <iInput v-model="form['search.contingencyAmount']"></iInput>
          </div>
          <div>
            <h4>总预算:</h4>
            <iInput v-model="form['search.totalBudget']"></iInput>
          </div>
          <div>
            <iInput v-model="aekoPercent"></iInput>
          </div>
          <div>
            <iInput v-model="AEKOMoney"></iInput>
          </div>
        </div>
        <!------------------------------------------------------------------------>
        <!--                  表格分页                                          --->
        <!------------------------------------------------------------------------>
        <!--        <iPagination-->
        <!--            v-update-->
        <!--            @size-change="handleSizeChange($event, getTableListFn)"-->
        <!--            @current-change="handleCurrentChange($event, getTableListFn)"-->
        <!--            background-->
        <!--            :current-page="page.currPage"-->
        <!--            :page-sizes="page.pageSizes"-->
        <!--            :page-size="page.pageSize"-->
        <!--            :layout="page.layout"-->
        <!--            :total="page.totalCount"-->
        <!--        />-->
      </iCard>
      <!------------------------------------------------------------------------>
      <!--                  转派弹出框                                         --->
      <!------------------------------------------------------------------------>
      <changeItems
          v-model="diologChangeItems"
          @sure="sureChangeItems"
          :title="$t('LK_LINGJIANCAIGOUXIANGMUZHUANPAI')"
      ></changeItems>
      <backItems
          v-model="diologBack"
          @sure="cancel"
          :title="$t('LK_QUXIAOLINGJIANCAIGOUXIANGMU')"
      ></backItems>
    </div>

    <addRow
        v-model="addRowShow"
        :carTypeProId="form['search.carTypeProject']"
        :isInvestmentList="true"
        :version="form['search.version']"
        :sourceStatus="params.sourceStatus"
        @updateTable="findInvestmentList"
    ></addRow>
    <referenceModel
        v-model="referenceModelShow"
        :carTypeProId="form['search.carTypeProject']"
        :sourceStatus="params.sourceStatus"
        :carType="this.fromGroup"
        @updateTable="findInvestmentList"
    ></referenceModel>
    <conversionRatio
        v-model="conversionRatioShow"
        @conversionSave="conversionSave"
    ></conversionRatio>
    <saveAs
        v-model="saveAsShow"
        :saveParams="saveParams"
    ></saveAs>
  </div>
</template>
<script>
import {
  iPage,
  iButton,
  iCard,
  iMessage,
  iPagination,
  iSearch,
  icon,
  iInput,
  iSelect,
} from "@/components";
import logButton from "./components/logButton";
import {pageMixins} from "@/utils/pageMixins";
import backItems from "@/views/partsign/home/components/backItems";
import {investmentListEntities, form} from "./components/data";
import tablelist from "./components/tablelist";
import addRow from "./components/addRow";
import referenceModel from "./components/referenceModel";
import conversionRatio from "./components/conversionRatio";
import saveAs from "./components/saveAs";
import {
  getTabelData,
  changeProcure,
} from "@/api/partsprocure/home";
import {
  findInvestmentBuild,
  getCartypePulldown,
  findProjectTypeDetailPulldown,
  findProjectDetailById,
  saveCustomCart,
  GetOtherCarTypeAlternative,
  updateBuildInvestment,
  ConfirmCustomerCarTypeSelect
} from "@/api/priceorder/stocksheet/edit";
import {
  getInvestmentVerisionList,
  getInvestmentData,
  getDepartmentsList,
  findInvestmentList,
  getModelProtitesPullDown,
  investmentDelete,
  relationMainCarType,
  investmentUpdate
} from "@/api/priceorder/stocksheet/investmentList";
import {insertRfq} from "@/api/partsrfq/home";
import changeItems from "../../partsign/home/components/changeItems";
import filters from "@/utils/filters";
import echarts from "@/utils/echarts";

import creatFs from "./components/creatFs";

export default {
  props: {
    params: {
      type: Object, default: () => {
      }
    }
  },
  mixins: [pageMixins, filters],
  components: {
    iPage,
    iButton,
    iCard,
    tablelist,
    changeItems,
    iPagination,
    iSearch,
    iInput,
    iSelect,
    backItems,
    logButton,
    icon,
    addRow,
    referenceModel,
    conversionRatio,
    saveAs,
  },
  data() {
    return {
      aekoPercent: '',
      AEKOMoney: '',
      contingencyPercent: '',
      contingencyAmount: '',
      totalBudget: '',
      aaa: '',
      bbb: '',
      headerLoading: false,
      contentLoading: false,

      pageEdit: false,

      carType: '',
      addRowShow: false,
      referenceModelShow: false,
      conversionRatioShow: false,
      saveAsShow: false,
      modelProtitesList: [],
      modelCategoryList: [],
      fixedPointTypeList: [],
      projectTypeList: [],
      versionList: [],
      commodityList: [],
      mainCarTypeList: [],
      carTypeProjectDisabled: false,
      addCarTypeProject: '',
      isAdd: '',
      saveParams: {
        investmentListEntities: [],
        aekoAmount: '',
        aekoPercent: '',
        contingencyAmount: '',
        contingencyPercent: '',
        investmentVersionId: '',
        totalBudget: '',
        approveInvestment: '',
        versionId: '',
        version: '',
      },

      versionName: '',
      tableListData: [],
      tableLoading: false,
      tableTitle: investmentListEntities,
      selectTableData: [],
      diologChangeItems: false,
      form: form,
      fromGroup: [],
      diologBack: false, //退回
      startLoding: false,
      addCarTypeLoading: false,
      tab: "source",
      value1: new Date().getTime(),
      tabtitle: [
        {name: "车型项目概览", index: 0, key: "LK_GAILIAN"},
        {name: "预算管理", active: true, key: "LK_CAIGOUSHENQING"},
        {name: "预算审批", active: false, key: "LK_CAIGOUDINGDAN"},
        {name: "BA申请", active: false, key: "LK_DINGJIAGUANLI"},
        {name: "BM申请", active: false, key: "LK_JIAGEZHUISU"},
        {name: "投资报告", active: false, key: "LK_HETONGCHAXUN"},
      ],
    };
  },
  computed: {
    projectIds() {
      return this.getPurchasePrjectId();
    },
  },
  created() {
    // this.isAdd = this.$route.query.id == 'add' ? true : false
    // this.getInvestmentData()
    this.getInvestmentVerisionList()
    // this.getDepartmentsList() 专业科室
    this.getModelProtitesPullDown()
    console.log(this.params)

  },
  mounted() {
  },
  methods: {
    conversionSave(val) {
      let conversionVal = val / 100
      this.tableListData = this.tableListData.map(item => item.budgetAmount * conversionVal)
      this.form['search.SUBTOTA'] = form['search.SUBTOTA'] * conversionVal
      this.form['search.AEKOMoney'] = form['search.AEKOMoney'] * conversionVal
      this.form['search.contingencyAmount'] = form['search.contingencyAmount'] * conversionVal
      this.form['search.totalBudget'] = this.form['search.AEKOMoney'] + this.form['search.contingencyAmount']
    },
    changeVersion(val) {
      if (val) {
        this.versionName = this.versionList.find(item => item.id == val).version
      } else {
        this.versionName = ''
      }
    },
    relationMainCarType(val) {
      relationMainCarType({
        mainId: val,
        localId: 'mainId',
      }).then((res) => {
        if (Number(res.code) === 0) {
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
        }
        // this.tableLoading = false
      }).catch(() => {
        // this.tableLoading = false
      });
    },
    getModelProtitesPullDown() {
      getModelProtitesPullDown().then((res) => {
        if (Number(res.code) === 0) {
          this.modelProtitesList = res.data
        } else {
          iMessage.error(res.desZh);
        }
        // this.tableLoading = false
      }).catch(() => {
        // this.tableLoading = false
      });
    },
    getDepartmentsList() {
      getDepartmentsList().then((res) => {
        if (Number(res.code) === 0) {
          this.commodityList = res.data
        } else {
          iMessage.error(res.desZh);
        }
        // this.tableLoading = false
      }).catch(() => {
        // this.tableLoading = false
      });
    },
    findInvestmentList() {
      this.tableLoading = true
      findInvestmentList({
        // commodity: this.form['search.professionalDepartments'],
        listVerisonId: this.form['search.version'],
      }).then((res) => {
        if (Number(res.code) === 0) {
          this.tableListData = res.data.investmentListEntities
          this.form['search.aekoPercent'] = res.data.aekoPercent
          this.form['search.AEKOMoney'] = res.data.aekoAmount
          this.form['search.contingencyAmount'] = res.data.contingencyPercent
          this.form['search.contingencyPercent'] = res.data.contingencyAmount
          this.form['search.totalBudget'] = res.data.totalBudget
        } else {
          iMessage.error(res.desZh);
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      });
    },
    getInvestmentData() {
      this.headerLoading = true
      getInvestmentData({
        investmentVersionId: this.form['search.version'],
        carTypeId: this.params.id,
        carType: this.params.sourceStatus
      }).then((res) => {
        if (Number(res.code) === 0) {
          this.form['search.carTypeName'] = res.data.carTypeName
          this.form['search.sopDate'] = res.data.sopDate
          this.form['search.purchasingFactory'] = res.data.purchasingFactory ? res.data.purchasingFactory.join('') : ''
          this.form['search.approvalInvestment'] = Number(res.data.approvalInvestment) ? Number(res.data.approvalInvestment).toFixed(2) : 0
          this.mainCarTypeList = res.data.mainCarTypeList
          this.form['search.relatedCarType'] = res.data.mainCarTypeList[0] ? res.data.mainCarTypeList[0].id : ''
          this.saveParams.version = res.data.defaultVersion

          let contingency = Number(res.data.contingency) ? Number(res.data.contingency).toFixed(0) : 0
          let aekoValue = Number(res.data.aekoValue) ? Number(res.data.aekoValue).toFixed(0) : 0
          let notAekoValue = Number(res.data.notAekoValue) ? Number(res.data.notAekoValue).toFixed(0) : 0
          let totalValue = Number(res.data.notAekoValue) ? Number(res.data.totalValue).toFixed(0) : 0
          this.form['search.SUBTOTA'] = Number(res.data.subTotal) ? Number(res.data.subTotal).toFixed(0) : 0
          this.findInvestmentList()

          this.$nextTick(() => {
            const chart1 = echarts().init(document.getElementById("chart1"));
            let option1 = {
              tooltip: {
                formatter: function (params) {//这里就是控制显示的样式
                  console.log(params)
                  if (params.seriesIndex == 0) {
                    return Number((contingency / totalValue) * 100).toFixed(2) + '%'
                  } else if (params.seriesIndex == 1) {
                    return Number((aekoValue / totalValue) * 100).toFixed(2) + '%'
                  } else if (params.seriesIndex == 2) {
                    return Number((notAekoValue / totalValue) * 100).toFixed(2) + '%'
                  }
                },
              },
              grid: {
                left: '0%',
                right: '0',
                bottom: '0%',
                top: '12%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: ['总预算'],
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,

                },
              },
              yAxis: {
                type: 'value',
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisLine: {
                  show: false
                },

              },
              series: [
                {
                  name: 'Contingency',
                  type: 'bar',
                  stack: 'total',
                  color: '#55C2D0',
                  barWidth: 40,
                  label: {
                    show: true,
                    textStyle: {
                      color: '#ffffff'
                    }
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: [contingency]
                },
                {
                  name: 'AEKO',
                  type: 'bar',
                  stack: 'total',
                  color: '#FFB04D',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#ffffff'
                    }
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: [aekoValue]
                },
                {
                  name: '非AEKO',
                  type: 'bar',
                  stack: 'total',
                  color: '#B3D0FF',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#ffffff'
                    }
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: [notAekoValue],
                  itemStyle: {
                    normal: {
                      barBorderRadius: [5, 5, 0, 0],
                    }
                  }
                },
                {
                  name: 'Mail Ad',
                  type: 'bar',
                  stack: 'total',
                  color: '#B3D0FF',
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#485465'
                    }
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: [0]
                },

              ]
            };
            option1.series[option1.series.length - 1].label.formatter = totalValue
            chart1.setOption(option1);
          })

        } else {
          iMessage.error(res.desZh);
        }
        this.headerLoading = false
      }).catch(() => {
        this.headerLoading = false
      });
    },
    getInvestmentVerisionList() {
      this.headerLoading = true
      getInvestmentVerisionList({
        id: this.params.id,
        sourceType: this.params.sourceStatus
      }).then((res) => {
        if (Number(res.code) === 0) {
          this.versionList = res.data
          this.form['search.version'] = this.versionList[0].id
          this.versionName = this.versionList[0].version
          this.getInvestmentData()
        } else {
          iMessage.error(res.desZh);
        }
        // this.tableLoading = false
      }).catch(() => {
        // this.tableLoading = false
      });
    },
    handleAddCarTypeProject() {
      this.tableLoading = true
      saveCustomCart({cartypeProjectName: this.addCarTypeProject}).then((res) => {
        if (Number(res.code) === 0) {
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      });
    },
    addRow() {
      this.addRowShow = true
    },
    deleteIRow() {
      if (this.selectTableData.length == 0) {
        iMessage.warn('请先勾选');
        return
      }
      this.tableLoading = true
      investmentDelete(this.selectTableData).then((res) => {
        if (Number(res.code) === 0) {
          this.findInvestmentList()
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
          // this.tableLoading = false
        }
      }).catch(() => {
        // this.tableLoading = false
      });
    },
    saveRow() {
      this.tableLoading = true
      investmentUpdate({
        investmentListEntities: this.tableListData,
        aekoAmount: this.form['search.AEKOMoney'],
        aekoPercent: this.form['search.aekoPercent'],
        contingencyAmount: this.form['search.contingencyAmount'],
        contingencyPercent: this.form['search.contingencyPercent'],
        investmentVersionId: this.form['search.version'],
        totalBudget: this.form['search.totalBudget'],
        approveInvestment: this.form['search.approvalInvestment'],
      }).then((res) => {
        if (Number(res.code) === 0) {
          this.findInvestmentList()
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
          this.tableLoading = false
        }
      }).catch(() => {
        this.tableLoading = false
      });
    },
    saveAsRow() {
      this.saveParams.investmentListEntities = this.tableListData
      this.saveParams.aekoAmount = this.form['search.AEKOMoney']
      this.saveParams.aekoPercent = this.form['search.aekoPercent']
      this.saveParams.contingencyAmount = this.form['search.contingencyAmount']
      this.saveParams.contingencyPercent = this.form['search.contingencyPercent']
      this.saveParams.investmentVersionId = this.form['search.version']
      this.saveParams.totalBudget = this.form['search.totalBudget']
      this.saveParams.approveInvestment = this.form['search.approvalInvestment']
      this.saveParams.versionId = this.form['search.version']
      this.saveAsShow = true
    },
    // 跳转详情
    openPage(item) {
      this.$router.push({
        path: "/partsprocure/editordetail",
        query: {
          item: JSON.stringify(item),
        },
      });
    },
    //获取上方group信息
    // part_status --零件状态
    // cartype_category --车型类型
    // cartype_project_zh --车型项目
    // part_preject_type --零件项目类型
    // procure_factory   --采购工厂
    // purchase_clause   --采购条款
    // part_type         --零件类型
    // unit              --单位
    // pay_clause        --支付条款
    // currency_id       --币种
    // linie_dept        --Linie部门A
    // linie_name        --Line
    // cf_controller     --Cf控制员
    // is_common_sourcing--Sourcing
    // buyer_name        --询价采购员

    //转派
    openDiologChangeItems() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
            this.$t(
                "LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDELINGJIANCAIGOUXIANGMU"
            )
        );
      this.diologChangeItems = true;
    },
    //确认转派弹窗值。
    sureChangeItems(val) {
      let transfer = {
        buyerName: val.nameZh,
        buyerId: val.id,
        purchaseProjectIds: this.getPurchasePrjectId(),
      };
      changeProcure({
        transfer,
      })
          .then((res) => {
            this.diologChangeItems = false;
            if (res.data) {
              iMessage.success(this.$t("LK_ZHUANPAICHENGGONG"));
              this.getTableListFn();
            } else {
              iMessage.error(res.desZh);
            }
          })
          .catch(() => {
            this.diologChangeItems = false;
          });
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    // 获取零件采购项目相关信息
    getTableListFn() {
      this.tableLoading = true;
      this.form["search.size"] = this.page.pageSize;
      this.form["search.current"] = this.page.currPage;
      let params = {
        cartypeProId: this.form['search.carTypeProject'],
        materialName: this.form['search.materialName'],
        partNum: this.form['search.partNum'],
        current: this.page.currPage,
        size: this.page.pageSize
      }
      findInvestmentBuild(params)
          .then((res) => {
            if (res.data) {
              this.page.currPage = res.pageNum;
              this.page.pageSize = res.pageSize;
              this.page.totalCount = res.total;
              this.tableListData = res.data;
            }
            this.tableLoading = false;
          })
          .catch(() => (this.tableLoading = false));
    },


    //退回
    openDiologBack() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
            this.$t(
                "LK_NINDANGQIANHAIWEIXUANZENINXUYAOQUXIAODELINGJIANCAIGOUXIANGMU"
            )
        );
      this.diologBack = true;
    },
    // 取消零件采购
    cancel(backmark) {
      let cancel = {
        cancelRemark: backmark,
        purchaseProjectIds: this.getPurchasePrjectId(),
      };
      changeProcure({
        cancel,
      })
          .then((res) => {
            if (res.data) {
              iMessage.success(this.$t("LK_CAOZUOCHENGGONG"));
              this.getTableListFn();
            } else {
              iMessage.error(res.desZh);
            }
            this.diologBack = false;
          })
          .catch(() => {
            this.diologBack = false;
          });
    },
    /*********************************************************************
     *                          启动询价模块
     *********************************************************************/
    validateStart() {
      return new Promise((r) => {
        if (this.selectTableData.length == 0) {
          r(false);
          iMessage.warn(
              this.$t(
                  "LK_NINDANGQIANHAIWEIXUANZEXUYAOQIDONGXUNJIADECAIGOUXIANGMU"
              )
          );
          return;
        }
        if (this.selectTableData.find((items) => items.fsnrGsnrNum == "")) {
          r(false);
          iMessage.warn(
              this.$t(
                  "LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININQIDONGXUNJIA"
              )
          );
          return;
        }
        r(true);
      });
    },
    async start() {
      if (!(await this.validateStart())) return;
      this.startLoding = true;
      insertRfq({
        rfqPartDTOList: this.selectTableData,
      })
          .then((res) => {
            this.startLoding = false;
            if (res.data && res.data.rfqId) {
              this.$router.push({
                path: "/partsrfq/editordetail",
                query: {
                  id: res.data.rfqId,
                },
              });
            } else {
              iMessage.warn(res.desZh);
            }
          })
          .catch((err) => {
            this.startLoding = false;
          });
    },
    /*********************************************************************
     *                          end
     *********************************************************************/
    // 获取选中零件号ID
    getPurchasePrjectId() {
      let purchasePrjectId = [];
      this.selectTableData.map((res) => {
        purchasePrjectId.push(res.purchasePrjectId);
      });
      return purchasePrjectId;
    },
    // 查询fliter数据
    getGroupList(key) {
      if (this.fromGroup.length > 0) {
        let obj = this.fromGroup.find((items) => items.type == key);
        if (!obj) return [];
        return obj.list;
      }
    },
    // 跳转批量维护
    openBatchmiantain() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
            this.$t(
                "LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGPILIANGWEIHUDEXIANGMU"
            )
        );
      this.$router.push({
        path: "/partsprocure/batchmiantain",
        query: {
          ids: this.getPurchasePrjectId(),
        },
      });
    },
  },
  watch:{
    aekoPercent(val){
      this.AEKOMoney = (val * this.form['search.SUBTOTA'] * 0.01).toFixed(2)
    },
    AEKOMoney(val){
      this.aekoPercent = (val * 100 / this.form['search.SUBTOTA']).toFixed(0)
    },
  }
};
</script>
<style lang="scss" scoped>
.input-with-select {
  width: 200px;
}

.checkBox {
  position: relative;
  top: 30px;
  left: -70px;
}

.search {
  ::v-deep .el-input, ::v-deep .el-select {
    width: 220px;
    margin-right: 30px;
  }
}

.investmentList {
  position: relative;

  .buttomInput {
    display: flex;
    justify-content: space-between;

    > div {
      display: flex;

      h4 {
        white-space: nowrap;
        margin-right: 5px;
      }

      .el-input {
        width: 100px;
      }
    }
  }

  .headerIcard ::v-deep .cardBody {
    padding: 18px 60px 22px 50px;
    display: flex;
    align-items: center;
    position: relative;

    .infoIcard {
      margin-left: 49px;

      div {
        font-size: 14px;
        margin-bottom: 10px;

        label {
          display: inline-block;
          min-width: 80px;
        }

        &:nth-of-type(1), &:nth-of-type(2) {
          label {
            font-weight: bold;
          }
        }
      }
    }

    .legend {
      font-size: 12px;
      font-weight: bold;
      position: absolute;
      right: 60px;
      top: 18px;

      div {
        display: inline-block;
        position: relative;
        margin-left: 60px;

        &::before {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #B3D0FF;
          position: absolute;
          left: -17px;
          top: 4px;
        }

        &:nth-of-type(2) {
          &::before {
            background-color: #FFB04D;
            top: 2px;
          }
        }

        &:nth-of-type(3) {
          &::before {
            background-color: #55C2D0;
            top: 2px;
          }
        }

        &:nth-of-type(4) {
          color: #485465;
          font-weight: 400;

          &::before {
            background-color: transparent;
          }
        }
      }
    }
  }

  //组件按钮间距
  ::v-deep .cardBody .iSearch-content .operation {
    width: auto;
    display: none;
  }

  ::v-deep .serch {
    margin-right: 0;
  }

  .searchSure {
    float: right;
    margin-top: 27px;
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

  .header {
    display: flex;
    justify-content: space-between;


  }

  .tabs {
    display: flex;

    > ul {
      display: flex;
      flex-direction: row;

      > li {
        max-width: 130px;
        color: #000000;
        line-height: 23px;
        font-size: 20px;
        font-weight: 400;
        opacity: 0.42;
        padding-bottom: 5px;
        margin-right: 50px;

        &.active {
          font-weight: bold;
          color: #000000;
          opacity: 1;
          border-bottom: 3px solid #1763F7;
        }
      }
    }

    > ul::after {
      width: 100%;
      height: 2px;
      border-bottom: 2px solid red;
    }
  }
}
</style>
