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
            <label>版本号：</label>
            <iSelect
                v-show="!pageEdit"
                placeholder="请选择"
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
      <iCard v-loading="tableLoading">
        <!------------------------------------------------------------------------>
        <!--                  table模块，向外入参表格数据，表头                    --->
        <!------------------------------------------------------------------------>
        <div class="header margin-bottom20">
          <div></div>
          <div>
            <iButton v-show="!pageEdit" @click="pageEdit = true"
                     :disabled="versionList[0] && form['search.version'] != versionList[0].id">编辑
            </iButton>
            <iButton v-show="pageEdit" @click="addRow">添加行</iButton>
            <iButton v-show="pageEdit" @click="deleteIRow">删除行</iButton>
            <iButton v-show="pageEdit" @click="referenceModelShow = true">参考车型</iButton>
            <iButton v-show="pageEdit" @click="saveRow">保存</iButton>
            <iButton v-show="pageEdit" @click="saveAsRow">保存为新版本</iButton>
            <!--            <iButton @click="saveRow">下载投资清单</iButton>-->
            <iButton v-show="pageEdit" @click="conversionRatioShow = true">按比例折算</iButton>
          </div>
        </div>
        <div>
          <tablelist
              :tableData="tableListData"
              :tableTitle="tableTitle"
              @handleSelectionChange="handleSelectionChange"
              @openPage="openPage"
              :activeItems="'partNum'"
          >
            <template #refCartypeName="scope">
              <a :href="scope.row.refCartypeName">{{ scope.row.refCartypeName }}</a>
            </template>
            <template #refMoldAmount="scope">
              <a :href="scope.row.refMoldAmount">{{ scope.row.refMoldAmount }}</a>
            </template>
            <template #budgetAmount="scope">
              <iInput v-model="scope.row.budgetAmount" v-if="pageEdit"
                      @input="changeBudgetAmount(scope.row.budgetAmount)" maxlength="20"></iInput>
              <div v-if="!pageEdit">{{ scope.row.budgetAmount }}</div>
            </template>
            <template #moldProperties="scope">
              <iSelect
                  v-show="pageEdit"
                  placeholder="请选择"
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
                  placeholder="请选择"
                  v-model="scope.row.commodity"
                  filterable
              >
                <el-option
                    :value="item.commodityName"
                    :label="item.commodityName"
                    v-for="(item, index) in DeptPullDown"
                    :key="index"
                ></el-option>
              </iSelect>
              <div v-if="!pageEdit">{{ scope.row.commodity }}</div>
            </template>
            <template #linie="scope">
              <iSelect
                  v-show="pageEdit"
                  placeholder="请选择"
                  v-model="scope.row.linieArr"
                  collapse-tags
                  multiple
                  filterable
              >
                <el-option
                    :value="item.linieID"
                    :label="item.linieName"
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
                  placeholder="请选择"
                  v-model="scope.row.sourcingType"
                  filterable
                  @change="changeCarTypeProject"
              >
                <el-option :value="1" label="Common"></el-option>
                <el-option :value="2" label="JV"></el-option>
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
              <iInput v-model="form['search.aekoPercent']" @input="changePerent" :disabled="!pageEdit"></iInput>
              % of Sub-Total
            </div>
            <div>
              <h4>AEKO金额:</h4>
              <iInput v-model="form['search.AEKOMoney']" disabled></iInput>
            </div>
            <div>
              <h4>综合偏差:</h4>
              <iInput v-model="form['search.contingencyPercent']" @input="changePerent"
                      :disabled="isLocked || !pageEdit"></iInput>
              % of Sub-Total
            </div>
            <div>
              <h4>综合偏差金额:</h4>
              <iInput v-model="form['search.contingencyAmount']" disabled></iInput>
            </div>
            <div>
              <h4>总预算:</h4>
              <iInput v-model="form['search.totalBudget']" :disabled="isLocked || !pageEdit" @input="changeTotalBudget">
                <div slot="suffix" @click="isLocked = !isLocked">
                  <icon symbol name="iconzongyusuansuoding" class="icon" v-if="isLocked"/>
                  <icon symbol name="iconzongyusuanweisuoding" class="icon" v-if="!isLocked"/>
                </div>
              </iInput>
            </div>
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
    </div>

    <addRow
        v-model="addRowShow"
        :carTypeProId="form['search.carTypeProject']"
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
        @updateTable="saveReference"
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
} from "@/components";
import {Popover} from "element-ui"
import {pageMixins} from "@/utils/pageMixins";
import {investmentListEntities, form} from "./components/data";
import tablelist from "./components/tablelist";
import addRow from "./components/addRow";
import referenceModel from "./components/referenceModel";
import conversionRatio from "./components/conversionRatio";
import saveAs from "./components/saveAs";
import {
  getCartypePulldown,
  saveCustomCart,
} from "@/api/priceorder/stocksheet/edit";
import {
  getInvestmentVerisionList,
  getInvestmentData,
  getDepartmentsList,
  findInvestmentList,
  getModelProtitesPullDown,
  investmentDelete,
  relationMainCarType,
  investmentUpdate, proDeptPullDown, liniePullDownByDept
} from "@/api/priceorder/stocksheet/investmentList";
import {insertRfq} from "@/api/partsrfq/home";
import filters from "@/utils/filters";
import echarts from "@/utils/echarts";
import {cloneDeep} from 'lodash'

export default {
  props: {
    params: {
      type: Object, default: () => {
      }
    }
  },
  mixins: [pageMixins, filters],
  components: {
    iButton,
    iCard,
    tablelist,
    iInput,
    iSelect,
    icon,
    addRow,
    referenceModel,
    conversionRatio,
    saveAs,
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

      versionName: '',
      tableListData: [],
      tableListDataClone: [],
      tableLoading: false,
      tableTitle: investmentListEntities,
      selectTableData: [],
      form: form,
      clone: {},
      fromGroup: [],
      DeptPullDown: [],
      liniePullDown: [],
    };
  },
  computed: {},
  created() {
    // this.isAdd = this.$route.query.id == 'add' ? true : false
    // this.getInvestmentData()
    this.beginType = this.params.sourceStatus
    this.getModelProtitesPullDown()
    this.getInvestmentVerisionList()
    // this.getDepartmentsList() 专业科室
  },
  mounted() {
  },
  methods: {
    saveReference() {
      this.tableListData = this.tableListData.map(item => {
        item.refCartypeName = '钢材'
        item.refMoldAmount = '100'
        return item
      })
      this.saveRow()
    },
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
        this.getInvestmentVerisionList(true)
      } else {
        this.versionName = ''
      }
    },
    relationMainCarType(val) {
      this.params.sourceStatus = 1
      relationMainCarType({
        mainId: val,
        localId: this.params.id,
      }).then((res) => {
        if (Number(res.code) === 0) {
          this.getInvestmentVerisionList()
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
        }
        // this.tableLoading = false
      }).catch(() => {
        // this.tableLoading = false
      });
    },
    // getModelProtitesPullDown() {
    //   getModelProtitesPullDown().then((res) => {
    //     if (Number(res.code) === 0) {
    //       this.modelProtitesList = res.data
    //     } else {
    //       iMessage.error(res.desZh);
    //     }
    //     // this.tableLoading = false
    //   }).catch(() => {
    //     // this.tableLoading = false
    //   });
    // },
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
        if (Number(res[0].code) === 0) {
          this.modelProtitesList = res[0].data
        } else {
          iMessage.error(res[0].desZh);
        }
        if (res[1].data) {
          this.fromGroup = res[1].data;
        } else {
          iMessage.error(res[1].desZh);
        }
        if (Number(res[2].code) === 0) {
          this.DeptPullDown = res[2].data
        } else {
          iMessage.error(res[2].desZh);
        }
        if (Number(res[3].code) === 0) {
          this.liniePullDown = res[3].data
        } else {
          iMessage.error(res[3].desZh);
        }
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
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
          res.data.investmentListEntities = res.data.investmentListEntities ? res.data.investmentListEntities : []
          this.tableListData = res.data.investmentListEntities.map(item => {
            item.budgetAmount = Number(item.budgetAmount).toFixed(2)
            let linieName = ''
            item.linieArr = item.linie ? (item.linie.split(',')).map(key => Number(key)) : []
            item.linieArr.map(a => {
              linieName += this.liniePullDown.find(b => b.linieID == a) ? (this.liniePullDown.find(b => b.linieID == a).linieName + '/') : ''
            })
            item.linieName = linieName.slice(0, linieName.length - 1)
            return item
          })
          this.tableListDataClone = cloneDeep(this.tableListData)
          this.form['search.aekoPercent'] = Number(res.data.aekoPercent).toFixed(2)
          this.form['search.AEKOMoney'] = Number(res.data.aekoAmount).toFixed(2)
          this.form['search.contingencyPercent'] = Number(res.data.contingencyPercent).toFixed(2)
          this.form['search.contingencyAmount'] = Number(res.data.contingencyAmount).toFixed(2)
          this.form['search.totalBudget'] = Number(res.data.totalBudget).toFixed(2)
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
          this.saveParams.version = res.data.defaultVersion.slice(4)

          let contingency = Number(res.data.contingency) ? Number(res.data.contingency).toFixed(0) : 0
          let aekoValue = Number(res.data.aekoValue) ? Number(res.data.aekoValue).toFixed(0) : 0
          let notAekoValue = Number(res.data.notAekoValue) ? Number(res.data.notAekoValue).toFixed(0) : 0
          let totalValue = Number(res.data.notAekoValue) ? Number(res.data.totalValue).toFixed(0) : 0
          this.form['search.SUBTOTA'] = Number(res.data.subTotal) ? Number(res.data.subTotal).toFixed(2) : 0
          this.clone['search.SUBTOTA'] = Number(res.data.subTotal) ? Number(res.data.subTotal).toFixed(2) : 0

          this.findInvestmentList()

          this.$nextTick(() => {
            const chart1 = echarts().init(document.getElementById("chart1"));
            let option1 = {
              tooltip: {
                formatter: function (params) {//这里就是控制显示的样式
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
    getInvestmentVerisionList(isChange) {
      this.headerLoading = true
      getInvestmentVerisionList({
        id: this.params.id,
        // sourceType: this.params.sourceStatus,
        beginType: this.beginType,
      }).then((res) => {
        if (Number(res.code) === 0) {
          this.versionList = res.data
          if (!isChange) {
            this.form['search.version'] = this.versionList[0] ? this.versionList[0].id : ''
          }
          this.versionName = this.versionList[0] ? this.versionList[0].version : ''
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
      investmentDelete(this.selectTableData, {investmentVersionId: this.form['search.version']}).then((res) => {
        if (Number(res.code) === 0) {
          this.getInvestmentVerisionList()
          // this.findInvestmentList()
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
        if (Number(res.code) === 0) {
          // this.findInvestmentList()
          this.getInvestmentVerisionList()
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
      this.saveParams.investmentListEntities = this.tableListData.map(item => {
        item.linie = item.linieArr.join(',')
        return item
      })
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
