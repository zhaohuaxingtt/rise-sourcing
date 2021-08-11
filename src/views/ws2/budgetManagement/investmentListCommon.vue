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
        <div id="chart4"></div>
        <div class="legend">
          <div>Commom Sourcing</div>
          <div>JV Sourcing</div>
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
          <div></div>
          <div>
            <iButton @click="clearAll">{{ $t('全部清零') }}</iButton>
            <iButton @click="saveCommon">{{ $t('LK_BAOCUN') }}</iButton>
            <iButton @click="toJV">{{ $t('查看JV预算') }}</iButton>
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
             <template #budgetAmount="scope">
              <iInput v-if="Number(scope.row.dataSource) === 1" v-model="scope.row.budgetAmount" :placeholder="$t('LK_QINGSHURU')"></iInput>
              <div v-else>{{ getTousandNum(scope.row.budgetAmount) }}</div>
            </template>
            <template #dataSource="scope">
              <div>{{ Number(scope.row.dataSource) === 1 ? 'JV预算' : 'CommonSourcing预算' }}</div>
            </template>
            <template #refMoldAmount="scope">
              <div>{{ getTousandNum(scope.row.refMoldAmount) }}</div>
            </template>
          </iTableList>
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
    <confirmAssociatedCarline
        v-model="confirmAssociatedCarlineShow"
        :associatedCarlineParams="associatedCarlineParams"
        @confirm="confirmAssociatedCarlineChange"
        @notConfirm="form['search.relatedCarType'] = ''"
    ></confirmAssociatedCarline>
  </div>
</template>
<script>
import {
  iButton,
  iCard,
  iMessage,
  iInput,
  iSelect,
} from "rise";
import {
  iTableList
} from '@/components'
import {Popover} from "element-ui"
import {pageMixins} from "@/utils/pageMixins";
import {tableHeight} from "@/utils/tableHeight";
import {investmentListCommon, form} from "./components/data";
import confirmAssociatedCarline from "./components/confirmAssociatedCarline";
import {
  getCartypePulldown,
  saveCustomCart,
} from "@/api/ws2/budgetManagement/edit";
import {
  getInvestmentVerisionList,
  getInvestmentData,
  getModelProtitesPullDown,
   proDeptPullDown,
  liniePullDownByDept,
  getCarTypeBudget,
  budgetMerge,
  commonSave,
} from "@/api/ws2/budgetManagement/investmentList";
import echarts from "@/utils/echarts";
import {cloneDeep} from 'lodash'
 import {getTousandNum} from "@/utils/tool";

export default {
  mixins: [pageMixins, tableHeight],
  props: {},
  components: {
    iButton,
    iCard,
    iTableList,
    iInput,
    iSelect,
     confirmAssociatedCarline,
    Popover
  },
  data() {
    return {
       headerLoading: false,
      contentLoading: false,
      pageEdit: false,

      carType: '',
      params: {},
      confirmAssociatedCarlineShow: false,
      modelProtitesList: [],
      versionList: [],
      mainCarTypeList: [],
      isAdd: '',
      beginType: 1,
      associatedCarlineParams: {},
      versionName: '',
      createDate: '',
      tableListData: [],
      tableListDataClone: [],
      tableLoading: false,
      tableTitle: investmentListCommon,
      selectTableData: [],
      form: form,
      clone: {},
      fromGroup: [],
      DeptPullDown: [],
      liniePullDown: [],
      carTypeBudget: '',
      getTousandNum: getTousandNum
    };
  },
  computed: {},
  created() {
    // this.isAdd = this.$route.query.id == 'add' ? true : false
    // this.getInvestmentData()
    this.params = this.$route.query
    this.beginType = this.params.sourceStatus
    this.getModelProtitesPullDown()
  },
  mounted() {
  },
  methods: {
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
      await Promise.all([getModelProtitesPullDown(), getCartypePulldown(), proDeptPullDown(), liniePullDownByDept({deptId: ''}), getCarTypeBudget(this.params.id)]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn
        const result4 = this.$i18n.locale === 'zh' ? res[4].desZh : res[4].desEn
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
        if (Number(res[4].code) === 0) {
          this.carTypeBudget = res[4].data.carTypeBudget
        } else {
          iMessage.error(result4);
        }
        this.getInvestmentVerisionList()
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });

    },
    findInvestmentList() {
      this.tableLoading = true
      budgetMerge(this.params.id).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          let tableListData = []
          res.data.map((a, index) => {
            a.map(b => {
              b.index = index
              return b
            })
            tableListData = tableListData.concat(a)
          })
          this.tableListData = tableListData.map(item => {
            item.budgetAmount = Number(item.budgetAmount).toFixed(2)
            item.refMoldAmount = Number(item.refMoldAmount).toFixed(2)
            return item
          })
          this.tableListDataClone = cloneDeep(this.tableListData)
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      });
    },
    getInvestmentData() {
      let _this = this
      this.headerLoading = true
      getInvestmentData({
        investmentVersionId: this.form['search.version'],
        carTypeId: this.params.id,
        carType: this.params.sourceStatus,
        nomiType: 'Common',
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
          let contingency = Number(res.data.contingency) ? Number(res.data.contingency).toFixed(2) : 0
          let aekoValue = Number(res.data.aekoValue) ? Number(res.data.aekoValue).toFixed(2) : 0
          let notAekoValue = Number(res.data.notAekoValue) ? Number(res.data.notAekoValue).toFixed(2) : 0
          let totalValue = Number(res.data.notAekoValue) ? Number(res.data.totalValue).toFixed(2) : 0
          this.form['search.SUBTOTA'] = Number(res.data.subTotal) ? Number(res.data.subTotal).toFixed(2) : 0
          this.clone['search.SUBTOTA'] = Number(res.data.subTotal) ? Number(res.data.subTotal).toFixed(2) : 0

          let notAekoPriceDetail = res.data.notAekoPriceDetail
          let aekoPriceDetail = res.data.aekoPriceDetail
           this.findInvestmentList()
           this.$nextTick(() => {
            const chart1 = echarts().init(document.getElementById("chart1"));
            const chart2 = echarts().init(document.getElementById("chart2"));
            const chart3 = echarts().init(document.getElementById("chart3"));
            const chart4 = echarts().init(document.getElementById("chart4"));
            let option1 = {
              // tooltip: {
                // formatter: function (params) {//这里就是控制显示的样式
                //   if (params.dataIndex == 0) {
                //     return 'JV Sourcing'
                //   } else if (params.dataIndex == 1) {
                //     return 'Commom Sourcing'
                //   }
                // },
                // backgroundColor: '#ffffff',
                // extraCssText: 'color: #1B1D21; box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.12);'
              // },
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
                  name: 'aekoValue',
                  type: 'bar',
                  stack: 'total',
                  color: '#73A1F6',
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
                  data: [totalValue]
                },
                {
                  name: 'contingency',
                  type: 'bar',
                  stack: 'total',
                  color: '#2662F3',
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
                  itemStyle: {
                    normal: {
                      barBorderRadius: [5, 5, 0, 0],
                    }
                  },
                  data: [this.carTypeBudget]
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
                formatter: function (params) {//这里就是控制显示的样式
                  if (params.seriesIndex == 0) {
                    return Number((contingency / totalValue) * 100).toFixed(2) + '%'
                  } else if (params.seriesIndex == 1) {
                    return Number((aekoValue / totalValue) * 100).toFixed(2) + '%'
                  } else if (params.seriesIndex == 2) {
                    return Number((notAekoValue / totalValue) * 100).toFixed(2) + '%'
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
                 data: [[form['search.carTypeName'] + ' ' + this.versionName]],
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                },
                axisLabel: {
                  textStyle: {
                    color: '#485465',
                    fontSize: 9
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
                  data: [contingency]
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
                  data: [aekoValue]
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
                  data: [notAekoValue],
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
                  barWidth: '20',
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
            let option4 = {
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
                  barWidth: '20',
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
            option2.series[option2.series.length - 1].label.formatter = totalValue
            option1.series[option1.series.length - 1].label.formatter = (Number(totalValue) + Number(this.carTypeBudget)).toFixed(2)
            chart1.setOption(option1);
            chart2.setOption(option2);
            chart3.setOption(option3);
            chart4.setOption(option4);
            chart2.on('click', function (params) {
              if (params.seriesName === "notAekoValue") {
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
                chart4.setOption(option4, true);
              } else if (params.seriesName === "aekoValue") {
                let option4Temp = cloneDeep(option4)
                option4Temp.series[1].barGap = '-100%'
                option4Temp.series.splice(1, 0, {
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
                chart4.setOption(option4Temp, true)
                chart3.setOption(option3, true);
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
          this.getInvestmentData()
        } else {
          iMessage.error(result);
        }
        // this.tableLoading = false
      }).catch(() => {
        // this.tableLoading = false
      });
    },
    clearAll(){
      this.tableListData = this.tableListData.map(item => {
        if(Number(item.dataSource) === 1){
          item.budgetAmount = 0
        }
        return item
      })
    },
    saveCommon(){
      if(!this.tableListData || this.tableListData.length === 0){
        iMessage.warn('无数据可保存')
        return
      }
      this.tableLoading = true
      commonSave({budgetAndInListIdVOList: this.tableListData}).then((res) => {
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
    toJV() {
      this.$router.push({
        path: '/tooling/budgetManagement/investmentListJV',
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
  width: 200px;
  height: 200px;
  align-self: flex-end;
}

#chart3 {
  width: 640px;
  height: 180px;
  margin: 0 30px;
  align-self: flex-end;
}

#chart4 {
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
          background-color: #2662F3;
          position: absolute;
          left: -17px;
          top: 4px;
        }

        &:nth-of-type(2) {
          &::before {
            background-color: #73A1F6;
            top: 2px;
          }
        }

        &:nth-of-type(3) {
          &::before {
            background-color: #B3D0FF;
            top: 2px;
          }
        }

        &:nth-of-type(4) {
          &::before {
            background-color: #FFB04D;
            top: 2px;
          }
        }

        &:nth-of-type(5) {
          &::before {
            background-color: #55C2D0;
            top: 2px;
          }
        }

        &:nth-of-type(6) {
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
