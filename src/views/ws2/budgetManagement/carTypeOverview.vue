<!--
 * @Author: yz
 * @Date: 2021-04-21 09:50:42
-->
<template>
  <div>
    <div v-permission="TOOLING_BUDGET_OVERVIEW">
      <div class="carTypeOverview">
        <el-switch
            v-model="onleySelf"
            @change="changeCarTypeOverview"
            inactive-text="仅看自己">
        </el-switch>
        <el-switch
            v-model="checkHistory"
            @change="changeCheckHistory"
            inactive-text="查看历史">
        </el-switch>
        <Popover
            content="点击进入【生成投资清单】页面"
            placement="top-start"
            trigger="hover">
          <iButton slot="reference" icon="el-icon-circle-plus-outline" type="primary" @click="addCarType">新增车型项目</iButton>
        </Popover>
      </div>
      <iSearch
          class="margin-bottom20 giSearch"
          style="margin-top: 20px"
          @sure="findCartypePro"
          @reset="reset"
          :icon="false"
          :resetKey="PARTSPROCURE_RESET"
          :searchKey="PARTSPROCURE_CONFIRM"
          v-loading="loadingiSearch"
      >
        <el-form>
          <el-form-item :label="$t('LK_CHEXINXIANGMU')">
            <iSelect
                class="multipleSelect"
                :placeholder="$t('partsprocure.PLEENTER')"
                v-model="cartypeProId"
                filterable
                @change="changeCarTypeProject"
                collapse-tags
                multiple
            >
              <el-option
                  :value="item.id"
                  :label="item.cartypeNname"
                  v-for="(item, index) in fromGroup"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="$t('生产工厂')">
            <iSelect
                :placeholder="$t('partsprocure.CHOOSE')"
                v-model="localFactoryName"
                filterable
                ref=""
            >
              <el-option
                  :value="item.locationFactoryName"
                  :label="item.locationFactoryName"
                  v-for="(item, index) in factoryList"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="$t('SOP时间')">
            <el-date-picker
                v-model="timeStarEnd"
                format="yyyy-MM-dd"
                class="budgetApprovalDate"
                type="daterange"
                range-separator="至"
                start-placeholder="YYYY-MM-DD"
                end-placeholder="YYYY-MM-DD">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div class="searchSure">
          <!--        <iButton @click="saveAddCarType" :disabled="carTypeProjectObj.isBudget == 3" v-loading="addCarTypeLoading">{{ $t('LK_QUEREN') }}</iButton>-->
          <!--          <iButton @click="sure">查询</iButton>-->
          <!--          <iButton @click="reset">重置</iButton>-->
        </div>
      </iSearch>
      <div v-loading="loadingiPage">
        <!--      <div class="infinite-list-wrapper" style="overflow:auto;height: 100px;">-->
        <!--        <ul-->
        <!--            class="list"-->
        <!--            v-infinite-scroll="load"-->
        <!--            infinite-scroll-disabled="disabled">-->
        <!--          <li v-for="(item, index) in contentData" :key="index" class="list-item">{{ item.cartypeProjectName }}</li>-->
        <!--        </ul>-->
        <!--        <p v-if="loading">加载中...</p>-->
        <!--        <p v-if="noMore">没有更多了</p>-->
        <!--      </div>-->

        <div class="content list"
             style="overflow:auto;"
             :style="{height: cardHeight + 'px'}"
             v-if="contentData.length > 0"
             v-infinite-scroll="load"
             infinite-scroll-distance="10"
             infinite-scroll-disabled="scrollDisabled">
          <div class="item list-item" v-for="(item, index) in contentData" :key="index"
               @click="toEdit(item.id, item.sourceStatus, item.isBudget)">
            <div class="item_top">
              <Popover
                  :content="Number(item.isBudget) === 3 ? '点击进入【模具投资清单】页面' : '点击进入未完成/需要继续编辑的【生成投资清单】页面'"
                  placement="top-start"
                  trigger="hover">
                <img slot="reference" v-if="item.isBudget == 1" class="editIcon" src="../../../assets/images/editCar.png" alt="">
                <img slot="reference" v-if="item.isBudget == 2" class="editIcon" src="../../../assets/images/editCar2.png" alt="">
                <img slot="reference" v-if="item.isBudget == 3" class="editIcon" src="../../../assets/images/editCar.png" alt="">
              </Popover>
              <div class="title">
                <Popover
                    :content="item.cartypeProjectName"
                    placement="top-start"
                    trigger="hover">
                  <h4 slot="reference">{{ item.cartypeProjectName }}</h4>
                </Popover>
                <Popover
                    v-if="Number(item.sourceStatus) === 1 || Number(item.isBudget) !== 3"
                    :content="$t('生产工厂') + ': ' + (item.locationFactory ? item.locationFactory : '')"
                    placement="top-start"
                    trigger="hover">
                  <p slot="reference">{{$t("生产工厂")}}: {{ item.locationFactory }}</p>
                </Popover>
                <Popover
                    v-if="Number(item.sourceStatus) === 1 || Number(item.isBudget) !== 3"
                    :content="'SOP: ' + item.sop"
                    placement="top-start"
                    trigger="hover">
                  <p slot="reference">SOP: {{ item.sop }}</p>
                </Popover>
                <Popover
                    :content="$t('LK_ZUIXINGENGXINREN') + ': ' + (item.updateByName ? item.updateByName : '')"
                    placement="top-start"
                    trigger="hover">
                  <p slot="reference" v-if="item.isBudget == 3">{{$t('LK_ZUIXINGENGXINREN')}}: {{ item.updateByName }}</p>
                </Popover>
                <Popover
                    :content="$t('LK_ZUIXINGENGXINSHIJIAN') + ': ' + (item.updateTime ? item.updateTime : '')"
                    placement="top-start"
                    trigger="hover">
                  <p slot="reference" v-if="item.isBudget == 3">{{$t('LK_ZUIXINGENGXINSHIJIAN')}}: {{ item.updateTime }}</p>
                </Popover>
                <!--            <h4 :title="item.cartypeProjectName">{{ item.cartypeProjectName }}</h4>-->
                <!--            <p :title="item.locationFactory">{{$t("LK_CAIGOUGONGCHANG")}}: {{ item.locationFactory }}</p>-->
                <!--            <p :title="item.sop">SOP: {{ item.sop }}</p>-->
                <!--            <p :title="item.updateByName" v-if="item.isBudget == 3">最近更新人: {{ item.updateByName }}</p>-->
                <!--            <p :title="item.updateTime" v-if="item.isBudget == 3">最近更新时间: {{ item.updateTime }}</p>-->
              </div>
            </div>
            <div class="unit">
              <div class="repeatCateGoryCount">
                <div v-if="item.isCommonSourcing">
                  {{$t("重复材料组")}}: <span>{{ item.repeatCateGoryCount }}</span>
                </div>
              </div>
              <div class="wanyuan">{{$t("LK_DANWEI")}}: {{$t("LK_BAIWANYUAN")}}</div>
            </div>
            <Popover
                :content="Number(item.isBudget) === 3 ? '点击进入【模具投资清单】页面' : '点击进入未完成/需要继续编辑的【生成投资清单】页面'"
                placement="top-start"
                trigger="hover">
              <div slot="reference" class="chart" :id="'chart' + index"></div>
            </Popover>
          </div>
        </div>
        <div class="loader" v-if="loading && contentData.length != 0">
          <div class="loader-inner ball-pulse">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <!--      <p v-if="noMore">没有更多了</p>-->
        <div class="noData" v-if="contentData.length === 0">暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  iMessage,
  iSearch,
  iSelect,
  iButton
} from "rise";
import {budgetManagement3rd, form} from "./components/data";
import {Switch, Popover} from "element-ui"
import {tabtitle} from "./components/data";
import echarts from "@/utils/echarts";
import {
  findCartypePro
} from "@/api/ws2/budgetManagement";
import {findProjectTypeDetailPulldown, getCartypePulldown} from "@/api/ws2/budgetManagement/edit";
import {getPurchaseFactoryPullDown} from "@/api/ws2/baApply";
import {mapState} from 'vuex'
import Moment from 'moment'
import {tableHeight} from "@/utils/tableHeight";
import {cloneDeep} from 'lodash'
import {pageMixins} from "@/utils/pageMixins";
import {getTousandNum} from "@/utils/tool";

export default {
  mixins: [tableHeight],
  components: {
    Popover,
    iSearch,
    iSelect,
    iButton
  },
  data() {
    return {
      loading: false,
      loadingiPage: false,
      loadingiSearch: false,
      tabtitle: tabtitle,
      form: form,
      contentData: [],
      initContentData: [],
      cartypeProId: [],
      localFactoryName: '',
      timeStarEnd: [],
      count: 8,
      cardHeight: 600,
      getTousandNum: getTousandNum,
      query: true,
      onleySelf: true,
      checkHistory: false,
      budgetManagement3rd: budgetManagement3rd,
    };
  },
  computed: {
    ...mapState({
      onleySelf: (state) => state.mouldManagement.onleySelf,
      showHistory: (state) => state.mouldManagement.checkHistory,
    }),
    noMore () {
      return this.count >= this.initContentData.length
    },
    scrollDisabled () {
      return this.loading || this.noMore
    }
  },
  mounted() {
    this.findCartypePro();
    this.getProcureGroup();
    this.cardHeight = this.tableHeight - document.querySelector('.giSearch').offsetHeight - document.querySelector('.navBar').offsetHeight - document.querySelector('.left').offsetHeight - 160
  },
  methods: {
    changeCarTypeOverview(val){
      this.$store.commit('SET_onleySelf', this.onleySelf)
    },
    changeCheckHistory(val){
      this.$store.commit('SET_checkHistory', this.checkHistory)
    },
    addCarType(){
      this.$router.push({
        path: '/tooling/budgetManagement/generateInvestmentList',
        query: {
          id: 'add',
          sourceStatus: ''
        },
      })
    },
    load () {
      if(!this.loading){
        this.loading = true
        setTimeout(() => {
          this.count += 8
          this.contentData = this.contentData.concat(this.initContentData.slice(this.count - 8, this.count))
          let _this = this
          _this.$nextTick(() => {
            this.contentData.map((item, index) => {
              let chartData = [
                (item.generalBudget ? item.generalBudget.toFixed(2) : 0),
                (item.fixedAmount ? item.fixedAmount.toFixed(2) : 0),
                (item.bmAmount ? item.bmAmount.toFixed(2) : 0),
                (item.paymentAmount ? item.paymentAmount.toFixed(2) : 0)
              ]
              let chartData_commonSourcing = [
                (item.csGeneralBudget ? item.csGeneralBudget.toFixed(2) : 0),
                (item.csFixedAmount ? item.csFixedAmount.toFixed(2) : 0),
                (item.csBmAmount ? item.csBmAmount.toFixed(2) : 0),
                (item.csPaymentAmount ? item.csPaymentAmount.toFixed(2) : 0)
              ]
              const vm1 = echarts().init(document.getElementById("chart" + index));
              let option1 = {
                grid: {
                  left: '0%',
                  right: '0',
                  bottom: '0%',
                  top: '12%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  data: [this.$t("LK_ZONGYUSUAN"), this.$t("LK_DINGDIANJINE"), this.$t("LK_BMDAN"), this.$t("LK_FUKUAN")],
                  axisTick: {
                    show: false
                  },
                  axisLine: {
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
                series: [{
                  data: chartData,
                  type: 'bar',
                  barWidth: 30,
                  stack: 'total',
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#485465'
                    },
                    formatter: function(p){
                      return _this.getTousandNum(p.value)
                    },
                  },
                  itemStyle: {
                    normal: {
                      barBorderRadius: [5, 5, 0, 0],
                      color: function (params) {
                        let colorlist = ['#1763F7', '#73A1FA', '#B0C5F5', '#CEE1FF'];
                        return colorlist[params.dataIndex];
                      }
                    },
                  }
                }]
              };
              let option2 = {
                tooltip: {
                  formatter: function (params) {//这里就是控制显示的样式
                    if (params.seriesIndex == 0) {
                      return `<div>JV Sourcing</div><div>${params.value}</div>`
                    } else if (params.seriesIndex == 1) {
                      return `<div>Commom Sourcing</div><div>${params.value}</div>`
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
                  data: [this.$t("LK_ZONGYUSUAN"), this.$t("LK_DINGDIANJINE"), this.$t("LK_BMDAN"), this.$t("LK_FUKUAN")],
                  axisTick: {
                    show: false
                  },
                  axisLine: {
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
                    name: 'JV Sourcing',
                    data: chartData,
                    type: 'bar',
                    barWidth: 30,
                    stack: 'total',
                    label: {
                      show: false
                    },
                    itemStyle: {
                      normal: {
                        label: false,
                        barBorderRadius: [0, 0, 0, 0],
                        color: function (params) {
                          let colorlist = ['#1763F7', '#73A1FA', '#B0C5F5', '#CEE1FF'];
                          return colorlist[params.dataIndex];
                        }
                      },
                    }
                  },
                  {
                    name: 'Commom Sourcing',
                    data: chartData_commonSourcing,
                    type: 'bar',
                    barWidth: 30,
                    stack: 'total',
                    label: {
                      show: false,
                    },
                    itemStyle: {
                      normal: {
                        label: false,
                        barBorderRadius: [5, 5, 0, 0],
                        color: function (params) {
                          let colorlist = ['#55C2D0','#87D4DE','#BBE7EC','#D4F8F7'];
                          return colorlist[params.dataIndex];
                        }
                      },
                    }
                  },
                  {
                    data: [0, 0, 0, 0],
                    name: '',
                    type: 'bar',
                    stack: 'total',
                    color: '#B3D0FF',
                    label: {
                      show: true,
                      position: 'top',
                      textStyle: {
                        color: '#485465'
                      },
                      formatter: function(p){
                        let dataIndex = p.dataIndex
                        return _this.getTousandNum((Number(chartData[dataIndex]) + Number(chartData_commonSourcing[dataIndex])).toFixed(2))
                      },
                    },
                    emphasis: {
                      focus: 'series'
                    },
                  }
                ]
              };
              if(item.isCommonSourcing){
                vm1.setOption(option2);
              } else {
                vm1.setOption(option1);
              }
            })
          })
          this.loading = false
        }, 1000)
      }

    },
    getProcureGroup() {
      this.loadingiSearch = true
      Promise.all([getPurchaseFactoryPullDown(), getCartypePulldown()]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        if (res[0].data) {
          this.factoryList = res[0].data;
        } else {
          iMessage.error(result0);
        }
        if (res[1].data) {
          this.fromGroup = res[1].data;
        } else {
          iMessage.error(result1);
        }
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });

    },
    // 跳转投资清单
    toEdit(id, sourceStatus, isBudget) {
      // this.$emit(
      //     'toGenerateInvestmentList',
      //     {
      //       step: isBudget == 3 ? 2 : 1,
      //       id: id,
      //       sourceStatus: sourceStatus
      //     }
      // )
      if(isBudget == 3){
        this.$router.push({
          path: '/tooling/budgetManagement/investmentListJV',
          query: {
            id: id,
            sourceStatus: sourceStatus
          },
        })
      }else {
        this.$store.commit('SET_nextStep', true);
        this.$router.push({
          path: '/tooling/budgetManagement/generateInvestmentList',
          query: {
            id: id,
            sourceStatus: sourceStatus
          },
        })
      }
    },
    // 获取卡片列表
    findCartypePro() {
      this.loadingiPage = true
      let _this = this
      let timeStarEnd =  this.timeStarEnd ? (this.timeStarEnd.length === 0 ? '' : this.timeStarEnd) : ''
      return new Promise((r) => {
        let params = {
          showSelf: this.onleySelf ? 'Y' : 'N',
          showHistory: this.showHistory ? '1' : '0',
          cartypeProId: this.cartypeProId,
          sopBegin: timeStarEnd ? Moment(timeStarEnd[0]).format('YYYY-MM-DD') : '',
          sopEnd: timeStarEnd ? Moment(timeStarEnd[1]).format('YYYY-MM-DD') : '',
          localFactoryName: this.localFactoryName,
        }
        findCartypePro(params).then(res => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          this.loadingiPage = false
          if (Number(res.code) === 0) {
            this.initContentData = cloneDeep(res.data)
            this.contentData = res.data.slice(0, 8)
            this.$nextTick(() => {
              this.contentData.map((item, index) => {
                let chartData = [
                    (item.generalBudget ? item.generalBudget.toFixed(2) : 0),
                    (item.fixedAmount ? item.fixedAmount.toFixed(2) : 0),
                    (item.bmAmount ? item.bmAmount.toFixed(2) : 0),
                    (item.paymentAmount ? item.paymentAmount.toFixed(2) : 0)
                ]
                let chartData_commonSourcing = [
                  (item.csGeneralBudget ? item.csGeneralBudget.toFixed(2) : 0),
                  (item.csFixedAmount ? item.csFixedAmount.toFixed(2) : 0),
                  (item.csBmAmount ? item.csBmAmount.toFixed(2) : 0),
                  (item.csPaymentAmount ? item.csPaymentAmount.toFixed(2) : 0)
                ]
                const vm1 = echarts().init(document.getElementById("chart" + index));
                let option1 = {
                  grid: {
                    left: '0%',
                    right: '0',
                    bottom: '0%',
                    top: '12%',
                    containLabel: true
                  },
                  xAxis: {
                    type: 'category',
                    data: [this.$t("LK_ZONGYUSUAN"), this.$t("LK_DINGDIANJINE"), this.$t("LK_BMDAN"), this.$t("LK_FUKUAN")],
                    axisTick: {
                      show: false
                    },
                    axisLine: {
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
                  series: [{
                    data: chartData,
                    type: 'bar',
                    barWidth: 30,
                    stack: 'total',
                    label: {
                      show: true,
                      position: 'top',
                      textStyle: {
                        color: '#485465'
                      },
                      formatter: function(p){
                        return _this.getTousandNum(p.value)
                      },
                    },
                    itemStyle: {
                      normal: {
                        barBorderRadius: [5, 5, 0, 0],
                        color: function (params) {
                          let colorlist = ['#1763F7', '#73A1FA', '#B0C5F5', '#CEE1FF'];
                          return colorlist[params.dataIndex];
                        }
                      },
                    }
                  }]
                };
                let option2 = {
                  tooltip: {
                    formatter: function (params) {//这里就是控制显示的样式
                      if (params.seriesIndex == 0) {
                        return `<div>JV Sourcing</div><div>${params.value}</div>`
                      } else if (params.seriesIndex == 1) {
                        return `<div>Commom Sourcing</div><div>${params.value}</div>`
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
                    data: [this.$t("LK_ZONGYUSUAN"), this.$t("LK_DINGDIANJINE"), this.$t("LK_BMDAN"), this.$t("LK_FUKUAN")],
                    axisTick: {
                      show: false
                    },
                    axisLine: {
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
                      name: 'JV Sourcing',
                      data: chartData,
                      type: 'bar',
                      barWidth: 30,
                      stack: 'total',
                      label: {
                        show: false
                      },
                      itemStyle: {
                        normal: {
                          label: false,
                          barBorderRadius: [0, 0, 0, 0],
                          color: function (params) {
                            let colorlist = ['#1763F7', '#73A1FA', '#B0C5F5', '#CEE1FF'];
                            return colorlist[params.dataIndex];
                          }
                        },
                      }
                    },
                    {
                      name: 'Commom Sourcing',
                      data: chartData_commonSourcing,
                      type: 'bar',
                      barWidth: 30,
                      stack: 'total',
                      label: {
                        show: false,
                      },
                      itemStyle: {
                        normal: {
                           label: false,
                          barBorderRadius: [5, 5, 0, 0],
                          color: function (params) {
                            let colorlist = ['#55C2D0','#87D4DE','#BBE7EC','#D4F8F7'];
                            return colorlist[params.dataIndex];
                          }
                        },
                      }
                    },
                    {
                      data: [0, 0, 0, 0],
                      name: '',
                      type: 'bar',
                      stack: 'total',
                      color: '#B3D0FF',
                      label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                          color: '#485465'
                        },
                        formatter: function(p){
                          let dataIndex = p.dataIndex
                          return _this.getTousandNum((Number(chartData[dataIndex]) + Number(chartData_commonSourcing[dataIndex])).toFixed(2))
                        },
                      },
                      emphasis: {
                        focus: 'series'
                      },
                    }
                  ]
                };
                if(item.isCommonSourcing){
                  vm1.setOption(option2);
                } else {
                  vm1.setOption(option1);
                }
              })
            })
          } else {
            iMessage.error(result);
          }
        }).catch(() => {
          this.loadingiPage = false
        })
      })
    },
    reset(){
      this.cartypeProId = []
      this.localFactoryName = ''
      this.timeStarEnd = []
      this.findCartypePro();
    }
  },
  watch: {
    onleySelf(val){
      this.findCartypePro();
    },
    showHistory(val){
      this.findCartypePro();
    },
  }
};
</script>
<style lang="scss" scoped>
.carTypeOverview{
  margin-top: 20px;
  text-align: right;
  > div{
    margin-right: 10px;
  }
  ::v-deep .el-switch__label.is-active{
    color: #41434A;
  }
  ::v-deep .el-button--primary{
    font-size: 16px;
    color: #1660F1;
    background-color: #EEF2FB;
    border-color: #EEF2FB;
    //margin-right: 10px;
  }
}
@keyframes scale
{
  30% {
    -webkit-transform: scale(0.3);
    transform: scale(0.3);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.loader{
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 25%;
  height: 30px;
  align-items: center;
  justify-content: center;
  .ball-pulse > div{
    background-color: #1763f7;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    &:nth-of-type(1){
      animation: scale 0.75s 0.12s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
    &:nth-of-type(2){
      animation: scale 0.75s 0.24s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
    &:nth-of-type(3){
      animation: scale 0.75s 0.36s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
  }
}
.budgetApprovalDate::v-deep.el-range-editor.el-input__inner {
  width: 489px;
  .el-range-input {
    width: 50%;
  }
}
.multipleSelect{
  ::v-deep .el-tag{
    max-width: calc(100% - 65px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.checkBox {
  position: relative;
  top: 30px;
  left: -70px;
}

.partsprocureHome {
  position: relative;

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

  .noData {
    min-height: 300px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    min-height: 300px;
    margin-top: 23px;

    .item {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      width: 410px;
      height: 418px;
      background: #FFFFFF;
      box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
      opacity: 1;
      border-radius: 10px;
      padding: 52px 30px 30px 30px;
      margin-top: 29px;
      margin-right: calc((100% - 1640px) / 3);
      cursor: pointer;
      &:nth-of-type(1) {
        margin-top: 0;
      }
      &:nth-of-type(2) {
        margin-top: 0;
      }
      &:nth-of-type(3) {
        margin-top: 0;
      }
      &:nth-of-type(4) {
        margin-top: 0;
      }
      &:nth-of-type(4n) {
        margin-right: 0;
      }

      .addIcon {
        width: 214px;
        height: 122px;
        transform: translate(-50%, -50%);
        margin-left: 50%;
        margin-top: 47%;
      }

      .item_top {
        display: flex;
        justify-content: space-between;
        color: #41434A;
        line-height: 21px;

        .editIcon {
          width: 150px;
          height: 53px;
          margin-top: 5px;
          margin-left: 6px;
        }

        .title {
          width: 148px;

          h4 {
            font-size: 16px;
            font-weight: bold;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          p {
            font-size: 14px;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .unit {
        color: #485465;
        margin-top: 24px;
        display: flex;
        justify-content: space-between;
        .repeatCateGoryCount{
          font-size: 10px;
          span{
            color: #55C2D0;
            font-size: 14px;
            font-weight: bold;
          }
        }
        .wanyuan{
          font-size: 12px;
        }
      }

      .chart {
        width: 100%;
        height: 210px;
      }
    }
  }
  .noData{
    font-size: 22px;
  }
}
</style>
