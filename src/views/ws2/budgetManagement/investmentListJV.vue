<!--
 * @Author: yz
 * @Date: 2021-04-26 09:50:42
 * @Description: 投资清单。
-->
<template>
  <div class="investmentList" v-permission="TOOLING_BUDGET_INVESTMENT">
    <div>
      <!------------------------------------------------------------------------>
      <!--                  search 搜索模块                                   --->
      <!------------------------------------------------------------------------>
      <iCard v-loading="headerLoading" class="margin-bottom20 headerIcard" style="margin-top: 20px">
        <img class="editIcon" src="../../../assets/images/editCar.png" alt="">
        <div class="infoIcard">
          <div class="search">
            <Popover
                :content="$t('LK_CHUANGJIANSHIJIAN') + ':' + createDate"
                placement="top-start"
                trigger="hover">
              <label slot="reference">{{ $t('LK_BANBENHAO2') }}:</label>
            </Popover>
            <iSelect
                v-show="!pageEdit"
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form['search.version']"
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
            <span v-show="pageEdit" class="infoIcardValue">{{ versionName }}</span>
          </div>
          <div>
            <label>{{ $t('LK_CHEXINMINGCENG') }}:</label>
            <Popover
                class="infoIcardValue"
                :content="form['search.carTypeName']"
                placement="top-start"
                trigger="hover">
              <span slot="reference">{{ form['search.carTypeName'] }}</span>
            </Popover>
          </div>
          <div class="search" v-show="(params.sourceStatus == 2) && pageEdit">
            <label>{{ $t('LK_GUANLIANCHEXIN') }}:</label>
            <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form['search.relatedCarType']"
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
            <Popover
                placement="top-start"
                trigger="hover">
              <div class="popoverDiv">
                <p>{{ $t('生产工厂') }}</p>
              </div>
              <label slot="reference">{{ $t('生产工厂') }}:</label>
            </Popover>
            <!--            <label :title="$t('LK_CAIGOUGONGCHANG')">{{ $t('LK_CAIGOUGONGCHANG') }}:</label>-->
            <span class="infoIcardValue">{{ form['search.purchasingFactory'] }}</span>
          </div>
          <div v-show="params.sourceStatus == 1">
            <label :title="$t('SOP')">SOP：</label>
            <span class="infoIcardValue">{{ form['search.sopDate'] }}</span>
          </div>
          <div class="search">
            <Popover
                placement="top-start"
                trigger="hover">
              <div class="popoverDiv">
                <p>{{ $t('LK_PIZHUNTOUZHI') }}</p>
              </div>
              <label slot="reference">{{ $t('LK_PIZHUNTOUZHI') }}:</label>
            </Popover>
            <!--            <label :title="$t('LK_PIZHUNTOUZHI')">{{ $t('LK_PIZHUNTOUZHI') }}:</label>-->
            <span v-show="!pageEdit" class="infoIcardValue">{{ form['search.approvalInvestment'] }}</span>
            <iInput v-show="pageEdit" v-model="form['search.approvalInvestment']"></iInput>
          </div>
        </div>
        <div id="chart1"></div>
        <div id="chart2"></div>
        <div id="chart3"></div>
        <div class="legend">
          <div>{{ $t('LK_FEIAEKO') }}</div>
          <div>AEKO</div>
          <div>Contingency</div>
          <div>{{ $t("LK_DANWEI") }}: {{ $t("LK_BAIWANYUAN") }}</div>
        </div>
      </iCard>
      <iCard v-loading="tableLoading">
        <!------------------------------------------------------------------------>
        <!--                  table模块，向外入参表格数据，表头                    --->
        <!------------------------------------------------------------------------>
        <div class="header margin-bottom20">
          <div class="search">
            {{ $t('LK_ZHUANYEKESHI') }}:
            <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form['search.DeptSelect']"
                filterable
                @change="findInvestmentList"
            >
              <el-option
                  :value="item.deptId"
                  :label="item.commodity"
                  v-for="(item, index) in DeptPullDown2"
                  :key="index"
              ></el-option>
            </iSelect>
          </div>
          <div>
            <iButton v-show="pageEdit" @click="pageEdit = false"
                     :disabled="versionList[0] && form['search.version'] != versionList[0].id">{{ $t('退出编辑') }}
            </iButton>
            <iButton v-show="pageEdit" @click="saveRow">{{ $t('LK_BAOCUN') }}</iButton>
            <iButton v-show="pageEdit" @click="saveAsRow">{{ $t('LK_BAOCUNWEIXINBANBEN') }}</iButton>
            <iButton v-show="!pageEdit" @click="pageEdit = true"
                     :disabled="versionList[0] && form['search.version'] != versionList[0].id">{{ $t('LK_BIANJI') }}
            </iButton>
            <iButton v-show="pageEdit" @click="addRow">{{ $t('LK_TIANJIAHANG') }}</iButton>
            <iButton v-show="pageEdit" @click="deleteIRow">{{ $t('LK_SHANCHUHANG') }}</iButton>
            <iButton v-show="pageEdit" @click="referenceModelShow = true">{{ $t('LK_CANKAOCHEXIN') }}</iButton>
            <iButton @click="downloadList">下载投资清单</iButton>
            <iButton v-show="pageEdit" @click="conversionRatioShow = true">{{ $t('LK_ANBILIZHESUAN') }}</iButton>
            <iButton @click="toJV">{{ $t('查看Common预算') }}</iButton>
          </div>
        </div>
        <div>
          <!--          630-->
          <iTableList
              :tableData="tableListData"
              :tableTitle="tableTitle"
              :filterTable="false"
              :titlePopover="false"
              @handleSelectionChange="handleSelectionChange"
          >
            <template #refCartypeName="scope">
              <div class="linkStyle" v-if="scope.row.refCartypeProId">
                <span @click="clickRefCartypeName(scope.row)">{{ scope.row.refCartypeName }}</span>
              </div>
              <div v-else>
                <span @click="clickRefCartypeName(scope.row)" style="color: #1663f6; cursor: pointer;">-</span>
              </div>
            </template>
            <template #refMoldAmount="scope">
              <div v-if="scope.row.refCartypeProId"><span>{{ getTousandNum(Number(scope.row.refMoldAmount).toFixed(2)) }}</span></div>
              <div v-else>-</div>
            </template>
            <template #budgetAmount="scope">
              <iInput v-model="scope.row.budgetAmount" v-if="pageEdit" :placeholder="$t('LK_QINGSHURU')"
                      @input="changeBudgetAmount(scope.row.budgetAmount)" maxlength="20"></iInput>
              <div v-if="!pageEdit">{{ getTousandNum(Number(scope.row.budgetAmount).toFixed(2)) }}</div>
            </template>
            <template #moldProperties="scope">
              <iSelect
                  v-show="pageEdit"
                  :placeholder="$t('LK_QINGXUANZE')"
                  v-model="scope.row.moldProperties"
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
            <template #commodity="scope">
              <iSelect
                  v-show="pageEdit"
                  :placeholder="$t('LK_QINGXUANZE')"
                  v-model="scope.row.commodity"
                  filterable
              >
                <el-option
                    :value="item.commodity"
                    :label="item.commodity"
                    v-for="(item, index) in DeptPullDown"
                    :key="index"
                ></el-option>
              </iSelect>
              <div v-if="!pageEdit">{{ scope.row.commodity }}</div>
            </template>
            <template #linie="scope">
              <iSelect
                  class="multipleSelect"
                  v-show="pageEdit"
                  :placeholder="$t('LK_QINGXUANZE')"
                  v-model="scope.row.linieArr"
                  collapse-tags
                  multiple
                  filterable
              >
                <el-option
                    :value="item.linieID"
                    :label="$i18n.locale == 'zh' ? item.linieName : item.linieNameEn"
                    v-for="(item, index) in liniePullDown"
                    :key="index"
                ></el-option>
              </iSelect>
              <Popover
                  v-if="!pageEdit"
                  placement="top-start"
                  :content="scope.row.linieName"
                  trigger="hover">
                <div slot="reference" class="ellipsisDiv">{{ scope.row.linieName }}</div>
              </Popover>
            </template>
            <template #sourcingType="scope">
              <div v-if="!pageEdit">{{ scope.row.sourcingType == 1 ? 'Common' : 'JV' }}</div>
              <iSelect
                  v-show="pageEdit"
                  :placeholder="$t('LK_QINGXUANZE')"
                  v-model="scope.row.sourcingType"
                  filterable
                  @change="changeCarTypeProject"
              >
                <el-option :value="1" label="Common"></el-option>
                <el-option :value="2" label="JV"></el-option>
              </iSelect>
            </template>
            <template #remarks="scope">
              <iInput v-model="scope.row.remarks" :placeholder="$t('LK_QINGSHURU')" v-if="pageEdit"></iInput>
              <div v-if="!pageEdit">{{ scope.row.remarks }}</div>
            </template>
            <template #applyAmount="scope">
              <div class="linkStyle">
                <span @click="clickMoney(scope.row)">{{ getTousandNum(Number(scope.row.applyAmount).toFixed(2)) }}</span>
              </div>
            </template>
            <template #nomiAmount="scope">
              <div class="linkStyle">
                <span @click="clickNomiAmountDetail(scope.row)">{{ getTousandNum(Number(scope.row.nomiAmount).toFixed(2)) }}</span>
              </div>
            </template>
            <template #baAmount="scope">
              <div class="linkStyle">
                <span @click="clickBaAmountDetail(scope.row)">{{ getTousandNum(Number(scope.row.baAmount).toFixed(2)) }}</span>
              </div>
            </template>
            <template #bmAmount="scope">
              <div class="linkStyle">
                <span @click="clickBmAmountDetail(scope.row)">{{ getTousandNum(Number(scope.row.bmAmount).toFixed(2)) }}</span>
              </div>
            </template>
          </iTableList>
          <div class="buttomInput">
            <div>
              <h4>SUB-TOTAL:</h4>
              <iInput v-model="form['search.SUBTOTA']" disabled></iInput>
            </div>
            <div>
              <h4>AEKO:</h4>
              <iInput v-model="form['search.aekoPercent']" @input="changePerent" :disabled="!pageEdit"></iInput>
              % of Sub-Total
            </div>
            <div>
              <h4>{{ $t('LK_AEKOJINE') }}:</h4>
              <iInput v-model="form['search.AEKOMoney']" disabled></iInput>
            </div>
            <div>
              <h4>{{ $t('LK_ZONGHEPIANCHA') }}:</h4>
              <iInput v-model="form['search.contingencyPercent']" @input="changePerent"
                      :disabled="isLocked || !pageEdit"></iInput>
              % of Sub-Total
            </div>
            <div>
              <h4>{{ $t('LK_ZHONGHEPIANCHAJINE') }}:</h4>
              <iInput v-model="form['search.contingencyAmount']" disabled></iInput>
            </div>
            <div>
              <h4>{{ $t('LK_ZONGYUSUAN') }}:</h4>
              <iInput v-model="form['search.totalBudget']" :disabled="isLocked || !pageEdit" @input="changeTotalBudget">
                <div slot="suffix" @click="isLocked = !isLocked">
                  <icon symbol name="iconzongyusuansuoding" class="icon" v-if="isLocked"/>
                  <icon symbol name="iconzongyusuanweisuoding" class="icon" v-if="!isLocked"/>
                </div>
              </iInput>
            </div>
          </div>
        </div>
      </iCard>
      <!------------------------------------------------------------------------>
      <!--                  转派弹出框                                         --->
      <!------------------------------------------------------------------------>
    </div>

    <addRow
        v-model="addRowShow"
        :carTypeProId="$store.state.mouldManagement.budgetManagement.carTypeProject"
        :isInvestmentList="true"
        :version="form['search.version']"
        :sourceStatus="params.sourceStatus"
        :sourcePage="2"
        @updateTable="findInvestmentList"
    ></addRow>
    <referenceModel
        v-model="referenceModelShow"
        :carTypeProId="$store.state.mouldManagement.budgetManagement.carTypeProject"
        :sourceStatus="$store.state.mouldManagement.budgetManagement.sourceStatus"
        :carType="this.fromGroup"
        :listVerisonId="form['search.version']"
        @updateTable="findInvestmentList"
    ></referenceModel>
    <conversionRatio
        v-model="conversionRatioShow"
        @conversionSave="conversionSave"
    ></conversionRatio>
    <saveAs
        v-model="saveAsShow"
        :saveParams="saveParams"
        @refresh="getInvestmentVerisionList"
    ></saveAs>
    <confirmAssociatedCarline
        v-model="confirmAssociatedCarlineShow"
        :associatedCarlineParams="associatedCarlineParams"
        @confirm="confirmAssociatedCarlineChange"
        @notConfirm="form['search.relatedCarType'] = ''"
    ></confirmAssociatedCarline>
    <referenceCarProject
        v-model="referenceCarProjectShow"
        :referenceCarProjectParams="referenceCarProjectParams"
        @refresh="getInvestmentVerisionList"
    ></referenceCarProject>
    <moneyComponent
        v-model="moneyComponentShow"
        :moneyComponentParams="moneyComponentParams"
        @refresh="getInvestmentVerisionList"
    ></moneyComponent>
    <nomiAmountDetail
        v-model="nomiAmountDetailShow"
        :moneyComponentParams="nomiAmountDetailParams"
        @refresh="getInvestmentVerisionList"
    ></nomiAmountDetail>
    <baAmountDetail
        v-model="baAmountDetailShow"
        :moneyComponentParams="baAmountDetailParams"
        @refresh="getInvestmentVerisionList"
    ></baAmountDetail>
    <bmAmountDetail
        v-model="bmAmountDetailShow"
        :moneyComponentParams="bmAmountDetailParams"
        @refresh="getInvestmentVerisionList"
    ></bmAmountDetail>
  </div>
</template>
<script>
import {
  iButton,
  iCard,
  iMessage,
  icon,
  iInput,
  iSelect,
} from "rise";
import {
  iTableList
} from '@/components'
import {Popover} from "element-ui"
import {pageMixins} from "@/utils/pageMixins";
import {tableHeight} from "@/utils/tableHeight";
import {investmentListJV, form} from "./components/data";
import addRow from "./components/addRow";
import referenceModel from "./components/referenceModel";
import conversionRatio from "./components/conversionRatio";
import confirmAssociatedCarline from "./components/confirmAssociatedCarline";
import saveAs from "./components/saveAs";
import referenceCarProject from "./components/referenceCarProject";
import moneyComponent from "./components/applyAmountDetail";
import nomiAmountDetail from "./components/nomiAmountDetail";
import baAmountDetail from "./components/baAmountDetail";
import bmAmountDetail from "./components/bmAmountDetail";
import {
  getCartypePulldown,
  saveCustomCart,
} from "@/api/ws2/budgetManagement/edit";
import {
  getInvestmentVerisionList,
  getInvestmentData,
  getDepartmentsList,
  findInvestmentList,
  getModelProtitesPullDown,
  investmentDelete,
  relationMainCarType,
  investmentUpdate,
  proDeptPullDown,
  liniePullDownByDept,
  exportInvestmentList
} from "@/api/ws2/budgetManagement/investmentList";
import echarts from "@/utils/echarts";
import {cloneDeep} from 'lodash'
import {getTousandNum, delcommafy} from "@/utils/tool";

export default {
  mixins: [pageMixins, tableHeight],
  props: {},
  components: {
    iButton,
    iCard,
    iTableList,
    iInput,
    iSelect,
    icon,
    addRow,
    referenceModel,
    conversionRatio,
    saveAs,
    referenceCarProject,
    confirmAssociatedCarline,
    moneyComponent,
    nomiAmountDetail,
    baAmountDetail,
    bmAmountDetail,
    Popover
  },
  data() {
    return {
      aekoPercent: '',
      AEKOMoney: '',
      contingencyPercent: '',
      contingencyAmount: '',
      totalBudget: '',
      headerLoading: false,
      contentLoading: false,
      isLocked: false,
      pageEdit: false,

      carType: '',
      params: {},
      referenceCarProjectParams: {},
      moneyComponentParams: {},
      nomiAmountDetailParams: {},
      baAmountDetailParams: {},
      bmAmountDetailParams: {},
      addRowShow: false,
      referenceModelShow: false,
      conversionRatioShow: false,
      saveAsShow: false,
      confirmAssociatedCarlineShow: false,
      referenceCarProjectShow: false,
      moneyComponentShow: false,
      nomiAmountDetailShow: false,
      baAmountDetailShow: false,
      bmAmountDetailShow: false,
      moneyComponentTitle: '',
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
      beginType: 1,
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
      associatedCarlineParams: {},
      versionName: '',
      createDate: '',
      tableListData: [],
      tableListDataClone: [],
      tableLoading: false,
      tableTitle: investmentListJV,
      selectTableData: [],
      form: form,
      clone: {},
      fromGroup: [],
      DeptPullDown: [],
      DeptPullDown2: [],
      liniePullDown: [],
      getTousandNum: getTousandNum,

    };
  },
  computed: {},
  created() {
    // this.isAdd = this.$route.query.id == 'add' ? true : false
    // this.getInvestmentData()
    this.params = this.$route.query
    this.form['search.DeptSelect'] = ''
    this.beginType = this.params.sourceStatus
    this.getModelProtitesPullDown()
    this.getInvestmentVerisionList()
    // this.getDepartmentsList() 专业科室
  },
  mounted() {
  },
  methods: {
    // saveReference() {
    //   this.tableListData = this.tableListData.map(item => {
    //     item.refCartypeName = '钢材'
    //     item.refMoldAmount = '100'
    //     return item
    //   })
    //   this.saveRow()
    // },
    changeBudgetAmount(val) {
      let total = 0
      this.tableListData.map(item => total += Number(item.budgetAmount))
      this.form['search.SUBTOTA'] = total.toFixed(2)
      this.changePerent()
    },
    changePerent() {
      if (this.isLocked) {
        this.form['search.AEKOMoney'] = (Number(this.form['search.aekoPercent']) * Number(this.form['search.SUBTOTA']) * 0.01).toFixed(2)
        this.form['search.contingencyAmount'] = (Number(this.form['search.totalBudget']) - Number(this.form['search.SUBTOTA']) - Number(this.form['search.AEKOMoney'])).toFixed(2)
        this.form['search.contingencyPercent'] = ((Number(this.form['search.contingencyAmount']) / Number(this.form['search.SUBTOTA'])) * 100).toFixed(2)
      } else {
        this.form['search.AEKOMoney'] = (Number(this.form['search.aekoPercent']) * Number(this.form['search.SUBTOTA']) * 0.01).toFixed(2)
        this.form['search.contingencyAmount'] = (Number(this.form['search.contingencyPercent']) * Number(this.form['search.SUBTOTA']) * 0.01).toFixed(2)
        this.form['search.totalBudget'] = (Number(this.form['search.AEKOMoney']) + Number(this.form['search.contingencyAmount']) + Number(this.form['search.SUBTOTA'])).toFixed(2)
      }
    },
    changeTotalBudget() {
      this.form['search.AEKOMoney'] = (Number(this.form['search.totalBudget']) - Number(this.form['search.SUBTOTA']) - Number(this.form['search.contingencyAmount'])).toFixed(2)
      this.form['search.aekoPercent'] = ((Number(this.form['search.AEKOMoney']) / Number(this.form['search.SUBTOTA'])) * 100).toFixed(2)
    },
    conversionSave(val) {
      let conversionVal = val / 100
      this.tableListData = cloneDeep(this.tableListDataClone).map(item => {
        item.budgetAmount = (Number(item.budgetAmount) * conversionVal).toFixed(2)
        return item
      })
      this.form['search.SUBTOTA'] = (Number(this.clone['search.SUBTOTA']) * conversionVal).toFixed(2)
      this.changePerent()
    },
    changeVersion(val) {
      if (val) {
        this.versionName = this.versionList.find(item => item.id == val).version
        this.createDate = this.versionList.find(item => item.id == val).createDate
        this.getInvestmentVerisionList(true)
      } else {
        this.versionName = ''
      }
    },
    confirmAssociatedCarlineChange() {
      this.params.sourceStatus = 1
      this.getInvestmentVerisionList()
    },
    relationMainCarType(val) {
      if (val) {
        this.confirmAssociatedCarlineShow = true
        this.associatedCarlineParams = {
          mainId: val,
          localId: this.params.id,
        }
      }
    },
    async getModelProtitesPullDown() {
      this.form['search.carTypeProject'] = ''
      this.form['search.materialName'] = ''
      this.form['search.partNum'] = ''
      this.loadingiSearch = true
      this.$store.commit('SET_budgetManagement', {
        carTypeProject: this.params.id,
        sourceStatus: this.params.sourceStatus
      });
      await Promise.all([getModelProtitesPullDown(), getCartypePulldown(), proDeptPullDown(), liniePullDownByDept({deptId: ''})]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn
        if (Number(res[0].code) === 0) {
          this.modelProtitesList = res[0].data
        } else {
          iMessage.error(result0);
        }
        if (res[1].data) {
          this.fromGroup = res[1].data;
        } else {
          iMessage.error(result1);
        }
        if (Number(res[2].code) === 0) {
          this.DeptPullDown = res[2].data
          this.DeptPullDown2 = cloneDeep(res[2].data)
          this.DeptPullDown2.unshift({deptId: '', commodity: 'ALL'})
        } else {
          iMessage.error(result2);
        }
        if (Number(res[3].code) === 0) {
          this.liniePullDown = res[3].data.map(item => {
            item.linieID = Number(item.linieID)
            return item
          })
        } else {
          iMessage.error(result3);
        }
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });

    },
    getDepartmentsList() {
      getDepartmentsList().then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.commodityList = res.data
        } else {
          iMessage.error(result);
        }
        // this.tableLoading = false
      }).catch(() => {
        // this.tableLoading = false
      });
    },
    findInvestmentList() {
      this.tableLoading = true
      let detpItem = this.DeptPullDown2.find(item => Number(item.deptId) === Number(this.form['search.DeptSelect']))
      findInvestmentList({
        commodity: detpItem ? detpItem.commodity : '',
        deptId: this.form['search.DeptSelect'],
        listVerisonId: this.form['search.version'],
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          let subTotal = 0
          res.data.investmentListEntities = res.data.investmentListEntities ? res.data.investmentListEntities : []
          this.tableListData = res.data.investmentListEntities.map((item, index) => {
            item.index = index
            item.budgetAmount = Number(item.budgetAmount).toFixed(2)
            let linieName = ''
            item.linieArr = item.linie ? (item.linie.split(',')).map(key => Number(key)) : []
            if (this.$i18n.locale == 'zh') {
              item.linieArr.map(a => {
                linieName += this.liniePullDown.find(b => b.linieID == a) ? (this.liniePullDown.find(b => b.linieID == a).linieName + '/') : ''
              })
            } else {
              item.linieArr.map(a => {
                linieName += this.liniePullDown.find(b => b.linieID == a) ? (this.liniePullDown.find(b => b.linieID == a).linieNameEn + '/') : ''
              })
            }
            // item.linieArr.map(a => {
            //   linieName += this.liniePullDown.find(b => b.linieID == a) ? (this.liniePullDown.find(b => b.linieID == a).linieName + '/') : ''
            // })
            subTotal += Number(item.budgetAmount)
            item.linieName = linieName.slice(0, linieName.length - 1)
            return item
          })
          this.tableListDataClone = cloneDeep(this.tableListData)
          this.form['search.SUBTOTA'] = subTotal.toFixed(2)
          this.clone['search.SUBTOTA'] = subTotal.toFixed(2)
          this.form['search.aekoPercent'] = Number(res.data.aekoPercent).toFixed(2)
          this.form['search.AEKOMoney'] = (Number(this.form['search.aekoPercent']) * Number(this.form['search.SUBTOTA']) * 0.01).toFixed(2)
          this.form['search.contingencyPercent'] = Number(res.data.contingencyPercent).toFixed(2)
          this.form['search.contingencyAmount'] = (Number(this.form['search.contingencyPercent']) * Number(this.form['search.SUBTOTA']) * 0.01).toFixed(2)
          this.form['search.totalBudget'] = (Number(this.form['search.SUBTOTA']) + Number(this.form['search.AEKOMoney']) + Number(this.form['search.contingencyAmount'])).toFixed(2)
          this.getInvestmentData()
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      });
    },
    getInvestmentData() {
      this.headerLoading = true
      let detpItem = this.DeptPullDown2.find(item => Number(item.deptId) === Number(this.form['search.DeptSelect']))
      getInvestmentData({
        commodity: detpItem ? detpItem.commodity : '',
        deptId: this.form['search.DeptSelect'],
        investmentVersionId: this.form['search.version'],
        carTypeId: this.params.id,
        carType: this.params.sourceStatus,
        nomiType: 'JV',
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.form['search.carTypeName'] = res.data.carTypeName
          this.form['search.sopDate'] = res.data.sopDate
          this.form['search.purchasingFactory'] = res.data.purchasingFactory ? res.data.purchasingFactory.join('') : ''
          this.form['search.approvalInvestment'] = Number(res.data.approvalInvestment) ? Number(res.data.approvalInvestment).toFixed(2) : 0
          this.mainCarTypeList = res.data.mainCarTypeList
          // this.form['search.relatedCarType'] = res.data.mainCarTypeList[0] ? res.data.mainCarTypeList[0].id : ''
          this.form['search.relatedCarType'] = ''
          this.saveParams.version = res.data.defaultVersion.slice(4)
          // this.form['search.SUBTOTA'] = Number(res.data.subTotal) ? Number(res.data.subTotal).toFixed(2) : 0
          // this.clone['search.SUBTOTA'] = Number(res.data.subTotal) ? Number(res.data.subTotal).toFixed(2) : 0

          let notAekoPriceDetail = res.data.notAekoPriceDetail
          let aekoPriceDetail = res.data.aekoPriceDetail
          let _this = this

          this.$nextTick(() => {
            const chart1 = echarts().init(document.getElementById("chart1"));
            const chart2 = echarts().init(document.getElementById("chart2"));
            const chart3 = echarts().init(document.getElementById("chart3"));
            let option1 = {
              tooltip: {
                formatter: function (params) {//这里就是控制显示的样式
                  if (params.seriesIndex == 0) {
                    return Number((_this.form['search.contingencyAmount'] / _this.form['search.totalBudget']) * 100).toFixed(2) + '%'
                  } else if (params.seriesIndex == 1) {
                    return Number((_this.form['search.AEKOMoney'] / _this.form['search.totalBudget']) * 100).toFixed(2) + '%'
                  } else if (params.seriesIndex == 2) {
                    return Number((_this.form['search.SUBTOTA'] / _this.form['search.totalBudget']) * 100).toFixed(2) + '%'
                  }
                },
                backgroundColor: '#ffffff',
                extraCssText: 'color: #1B1D21; box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.12);'
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
                data: [this.$t("LK_ZONGYUSUAN")],
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                },
                axisLabel: {
                  textStyle: {
                    color: '#485465',
                    fontSize: 10
                  },
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
                  name: 'contingency',
                  type: 'bar',
                  stack: 'total',
                  color: '#55C2D0',
                  barWidth: 40,
                  label: {
                    show: true,
                    textStyle: {
                      color: '#ffffff',
                      fontSize: 8
                    }
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: [this.form['search.contingencyAmount']]
                },
                {
                  name: 'aekoValue',
                  type: 'bar',
                  stack: 'total',
                  color: '#FFB04D',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#ffffff',
                      fontSize: 8
                    }
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: [this.form['search.AEKOMoney']]
                },
                {
                  name: 'notAekoValue',
                  type: 'bar',
                  stack: 'total',
                  color: '#B3D0FF',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#ffffff',
                      fontSize: 8
                    }
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: [this.form['search.SUBTOTA']],
                  itemStyle: {
                    normal: {
                      barBorderRadius: [5, 5, 0, 0],
                    }
                  }
                },
                {
                  name: '',
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
            let option2 = {
              tooltip: {
                show: false
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
                // data: ['非AEKO', '未申请', '已申请', '未定点', '已定点', '无BA', '有BA', '无BM', '有BM'],
                data: [
                  this.$t("LK_FEIAEKO"),
                  this.$t("LK_WEISHENQING"),
                  this.$t("LK_YISHENQING"),
                  this.$t("LK_WEIDINGDIAN"),
                  this.$t("定点节降"),
                  this.$t("LK_YIDINGDIAN"),
                  this.$t("LK_WUBA"),
                  this.$t("LK_YOUBA"),
                  this.$t("LK_WUBM"),
                  this.$t("LK_YOUBM"),
                ],
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#CDD4E2'
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: '#485465',
                    fontSize: 10
                  },
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
                  name: '辅助',
                  type: 'bar',
                  stack: 'total',
                  itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                  },
                  emphasis: {
                    itemStyle: {
                      barBorderColor: 'rgba(0,0,0,0)',
                      color: 'rgba(0,0,0,0)'
                    }
                  },
                  data: [
                    0,
                    notAekoPriceDetail.applyAmount,
                    0,
                    Number(notAekoPriceDetail.nomiAmount) + Number(notAekoPriceDetail.nomiJAmount),
                    notAekoPriceDetail.nomiAmount,
                    0,
                    notAekoPriceDetail.baAmount,
                    0,
                    notAekoPriceDetail.bmAmount]
                },
                {
                  name: '',
                  type: 'bar',
                  stack: 'total',
                  color: '#B3D0FF',
                  barWidth: '30',
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#485465',
                      fontSize: 12
                    }
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: [
                    notAekoPriceDetail.notAekoTotal,
                    notAekoPriceDetail.notApplyAmount,
                    notAekoPriceDetail.applyAmount,
                    notAekoPriceDetail.notNomiAmount,
                    notAekoPriceDetail.nomiJAmount,
                    notAekoPriceDetail.nomiAmount,
                    notAekoPriceDetail.notBaAmount,
                    notAekoPriceDetail.baAmount,
                    notAekoPriceDetail.notBmAmount,
                    notAekoPriceDetail.bmAmount
                  ],
                  itemStyle: {
                    normal: {
                        barBorderRadius: [5, 5, 0, 0],
                    }
                  }
                },
              ]
            }
            let option3 = {
              tooltip: {
                show: false
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
                // data: ['AEKO', '有BA', 'BA', '无BM', '有BM'],
                data: [
                  'AEKO',
                  this.$t("LK_WUBA"),
                  this.$t("LK_YOUBA"),
                  this.$t("LK_WUBM"),
                  this.$t("LK_YOUBM"),
                ],
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#CDD4E2'
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: '#485465',
                    fontSize: 10
                  },
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
                  name: '辅助',
                  type: 'bar',
                  stack: 'total',
                  itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                  },
                  emphasis: {
                    itemStyle: {
                      barBorderColor: 'rgba(0,0,0,0)',
                      color: 'rgba(0,0,0,0)'
                    }
                  },
                  data: [0, aekoPriceDetail.baAmount, 0, aekoPriceDetail.bmAmount, 0]
                },
                {
                  name: '',
                  type: 'bar',
                  stack: 'total',
                  color: '#FFB04D',
                  barWidth: '30',
                  barGap: '-100%',
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#485465',
                      fontSize: 12
                    }
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: [
                    aekoPriceDetail.aekoTotal,
                    aekoPriceDetail.notBaAmount,
                    aekoPriceDetail.baAmount,
                    aekoPriceDetail.notBmAmount,
                    aekoPriceDetail.bmAmount],
                  itemStyle: {
                    normal: {
                      barBorderRadius: [5, 5, 0, 0],
                    }
                  }
                },
              ]
            }
            option1.series[option1.series.length - 1].label.formatter = this.form['search.totalBudget']
            chart1.setOption(option1);
            chart2.setOption(option2);
            chart3.setOption(option3);
            chart1.on('click', function (params) {
              if (params.seriesName === "notAekoValue") {
                let option2Temp = cloneDeep(option2)
                option2Temp.series[1].barGap = '-100%'
                option2Temp.series.splice(1, 0, {
                  name: '阴影辅助',
                  data: [0],
                  type: 'bar',
                  barWidth: '30',
                  showBackground: true,
                  itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                  },
                  backgroundStyle: {
                    shadowColor: 'rgba(0, 0, 0, 1)',
                    shadowBlur: 20,
                    opacity: 1,
                    shadowOffsetY: 10,
                    shadowOffsetX: 10,
                  }
                })
                chart2.setOption(option2Temp, true)
                chart3.setOption(option3, true);
              } else if (params.seriesName === "aekoValue") {
                let option3Temp = cloneDeep(option3)
                option3Temp.series[1].barGap = '-100%'
                option3Temp.series.splice(1, 0, {
                  name: '阴影辅助',
                  data: [0],
                  type: 'bar',
                  barWidth: '30',
                  showBackground: true,
                  itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                  },
                  backgroundStyle: {
                    shadowColor: 'rgba(0, 0, 0, 1)',
                    shadowBlur: 20,
                    opacity: 1,
                    shadowOffsetY: 10,
                    shadowOffsetX: 10,
                  }
                })
                chart3.setOption(option3Temp, true)
                chart2.setOption(option2, true);
              }
            })
          })

        } else {
          iMessage.error(result);
        }
        this.headerLoading = false
      }).catch(() => {
        this.headerLoading = false
      });
    },
    getInvestmentVerisionList(isChange) {
      this.headerLoading = true
      getInvestmentVerisionList({
        id: this.params.id,
        // sourceType: this.params.sourceStatus,
        beginType: this.beginType,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.versionList = res.data
          if (!isChange) {
            this.form['search.version'] = this.versionList[0] ? this.versionList[0].id : ''
          }
          this.versionName = this.versionList[0] ? this.versionList[0].version : ''
          this.createDate = this.versionList[0] ? this.versionList[0].createDate : ''
          this.findInvestmentList()
        } else {
          iMessage.error(result);
        }
        // this.tableLoading = false
      }).catch(() => {
        // this.tableLoading = false
      });
    },
    handleAddCarTypeProject() {
      this.tableLoading = true
      saveCustomCart({cartypeProjectName: this.addCarTypeProject}).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      });
    },
    addRow() {
      this.addRowShow = true
    },
    clickRefCartypeName(row) {
      this.referenceCarProjectShow = true
      this.referenceCarProjectParams = {
        carTypeProId: row.refCartypeProId,
        categoryId: row.categoryId,
        sourceProjectId: this.params.id
      }
    },
    clickMoney(row) {
      this.moneyComponentShow = true
      this.moneyComponentParams = {
        tmCategoryId: row.categoryId,
        tmCartypeProId: this.params.id
      }
    },
    clickNomiAmountDetail(row) {
      this.nomiAmountDetailShow = true
      this.nomiAmountDetailParams = {
        tmCategoryId: row.categoryId,
        tmCartypeProId: this.params.id
      }
    },
    clickBaAmountDetail(row) {
      this.baAmountDetailShow = true
      this.baAmountDetailParams = {
        tmCategoryId: row.categoryId,
        tmCartypeProId: this.params.id
      }
    },
    clickBmAmountDetail(row) {
      this.bmAmountDetailShow = true
      this.bmAmountDetailParams = {
        tmCategoryId: row.categoryId,
        tmCartypeProId: this.params.id
      }
    },
    deleteIRow() {
      if (this.selectTableData.length == 0) {
        iMessage.warn('请先勾选');
        return
      }
      this.tableLoading = true
      investmentDelete(this.selectTableData, {investmentVersionId: this.form['search.version']}).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.getInvestmentVerisionList()
          // this.findInvestmentList()
          iMessage.success(result);
        } else {
          iMessage.error(result);
          // this.tableLoading = false
        }
      }).catch(() => {
        // this.tableLoading = false
      });
    },
    saveRow() {
      this.tableLoading = true
      investmentUpdate({
        investmentListEntities: this.tableListData.map(item => {
          item.linie = item.linieArr.join(',')
          return item
        }),
        aekoAmount: this.form['search.AEKOMoney'],
        aekoPercent: this.form['search.aekoPercent'],
        contingencyAmount: this.form['search.contingencyAmount'],
        contingencyPercent: this.form['search.contingencyPercent'],
        investmentVersionId: this.form['search.version'],
        totalBudget: this.form['search.totalBudget'],
        approveInvestment: this.form['search.approvalInvestment'],
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          // this.findInvestmentList()
          this.getInvestmentVerisionList()
          iMessage.success(result);
        } else {
          iMessage.error(result);
          this.tableLoading = false
        }
      }).catch(() => {
        this.tableLoading = false
      });
    },
    saveAsRow() {
      this.saveParams.investmentListEntities = this.tableListData.map(item => {
        item.linie = item.linieArr.join(',')
        return item
      })
      let detpItem = this.DeptPullDown2.find(item => Number(item.deptId) === Number(this.form['search.DeptSelect']))
      this.saveParams.aekoAmount = this.form['search.AEKOMoney']
      this.saveParams.aekoPercent = this.form['search.aekoPercent']
      this.saveParams.contingencyAmount = this.form['search.contingencyAmount']
      this.saveParams.contingencyPercent = this.form['search.contingencyPercent']
      this.saveParams.investmentVersionId = this.form['search.version']
      this.saveParams.totalBudget = this.form['search.totalBudget']
      this.saveParams.approveInvestment = this.form['search.approvalInvestment']
      this.saveParams.versionId = this.form['search.version']
      this.saveParams.commodity = detpItem ? detpItem.commodity : ''
      this.saveParams.deptId = this.form['search.DeptSelect']
      this.saveAsShow = true
    },
    downloadList() {
      this.tableLoading = true
      exportInvestmentList({
        listVerisonId: this.form['search.version'],
      }).then((res) => {
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      });
      // let url = process.env.VUE_APP_TOOLING  + '/investment' + '/exportInvestmentList?listVerisonId=' + this.form['search.version']
      // window.open(url)
    },

    toJV() {
      this.$router.push({
        path: '/tooling/budgetManagement/investmentListCommon',
        query: {
          id: this.params.id,
          sourceStatus: this.params.sourceStatus
        },
      })
    },


    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val;
    },

  },
  watch: {
    // aekoPercent(val){
    //   this.AEKOMoney = (val * this.form['search.SUBTOTA'] * 0.01).toFixed(2)
    // },
    // AEKOMoney(val){
    //   this.aekoPercent = (val * 100 / this.form['search.SUBTOTA']).toFixed(0)
    // },
  }
};
</script>
<style lang="scss" scoped>
.multipleSelect {
  ::v-deep .el-tag {
    max-width: calc(100% - 65px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

#chart1 {
  width: 200px;
  height: 200px;
  align-self: flex-end;
}

#chart2 {
  width: 640px;
  height: 180px;
  margin: 0 30px;
  align-self: flex-end;
}

#chart3 {
  width: 420px;
  height: 180px;
  align-self: flex-end;
}

.linkStyle {
  span {
    color: #1663F6;
    border-bottom: 1px solid #1663F6;
    cursor: pointer;
  }
}

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
    width: calc(100% - 80px);

    .el-input {
      width: 100%;
    }
  }
}

.ellipsisDiv {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.investmentList {
  position: relative;

  .buttomInput {
    display: flex;
    justify-content: space-between;
    margin-top: 44px;
    line-height: 35px;

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
    justify-content: space-between;
    align-items: center;
    position: relative;

    .infoIcard {
      margin-left: 49px;
      max-width: 200px;

      > div {
        display: flex;
        font-size: 14px;
        height: 35px;
        line-height: 35px;

        label {
          display: block;
          min-width: 80px;
          max-width: 80px;
          word-break: break-all;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &:nth-of-type(1), &:nth-of-type(2) {
          label {
            font-weight: bold;
          }
        }

        .infoIcardValue {
          max-width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
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
    //width: auto;
    //display: none;
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
