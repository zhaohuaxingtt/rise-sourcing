<!--
 * @Author: yz
 * @Date: 2021-04-21 09:50:42
-->
<template>
  <div v-loading="loadingiPage" v-permission="TOOLING_BUDGET_OVERVIEW">
    <div class="content">
      <div class="item" @click="toEdit('add')">
        <Popover
            content="点击进入【生成投资清单】页面"
            placement="top-start"
            trigger="hover">
          <img slot="reference" class="addIcon" src="../../../assets/images/addCar.png" alt="">
        </Popover>
      </div>
      <div class="item" v-for="(item, index) in contentData" :key="index"
           @click="toEdit(item.id, item.sourceStatus, item.isBudget)">
        <div class="item_top">
          <img v-if="item.isBudget == 1" class="editIcon" src="../../../assets/images/editCar.png" alt="">
          <img v-if="item.isBudget == 2" class="editIcon" src="../../../assets/images/editCar2.png" alt="">
          <img v-if="item.isBudget == 3" class="editIcon" src="../../../assets/images/editCar.png" alt="">
          <div class="title">
            <Popover
                :content="item.cartypeProjectName"
                placement="top-start"
                trigger="hover">
              <h4 slot="reference">{{ item.cartypeProjectName }}</h4>
            </Popover>
            <Popover
                :content="$t('LK_CAIGOUGONGCHANG') + ': ' + (item.locationFactory ? item.locationFactory : '')"
                placement="top-start"
                trigger="hover">
              <p slot="reference">{{$t("LK_CAIGOUGONGCHANG")}}: {{ item.locationFactory }}</p>
            </Popover>
            <Popover
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
          {{$t("LK_DANWEI")}}: {{$t("LK_BAIWANYUAN")}}
        </div>
        <div class="chart" :id="'chart' + index"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  iMessage,
} from "rise";
import {Popover} from "element-ui"
import {tabtitle} from "./components/data";
import echarts from "@/utils/echarts";
import {
  findCartypePro
} from "@/api/ws2/budgetManagement";

export default {
  components: {
    Popover
  },
  data() {
    return {
      loadingiPage: false,
      tabtitle: tabtitle,
      contentData: []
    };
  },
  mounted() {
    this.findCartypePro();
  },
  methods: {
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
          path: '/tooling/budgetManagement/investmentList',
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
      return new Promise((r) => {
        findCartypePro().then(res => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          this.loadingiPage = false
          if (Number(res.code) === 0) {
            this.contentData = res.data
            this.$nextTick(() => {
              // const vm = echarts().init(document.getElementById("chart0"));
              // let option = {
              //   grid: {
              //     left: '0%',
              //     right: '0',
              //     bottom: '0%',
              //     top: '12%',
              //     containLabel: true
              //   },
              //   xAxis: {
              //     type: 'category',
              //     data: ['总预算', '定点金额', 'BM单', '付款'],
              //     axisTick: {
              //       show: false
              //     },
              //     axisLine:{
              //       lineStyle:{
              //         color: '#CDD4E2'
              //       }
              //     },
              //     axisLabel:{
              //       textStyle:{
              //         color: '#485465'
              //       }
              //     },
              //   },
              //   yAxis: {
              //     type: 'value',
              //     axisTick: {
              //       show: false
              //     },
              //     axisLabel: {
              //       show: false
              //     },
              //     splitLine: {
              //       show: false
              //     },
              //     axisLine: {
              //       show: false
              //     },
              //
              //   },
              //   series: [
              //     {
              //       data: [120, 200, 150, 80],
              //       type: 'bar',
              //       barWidth: 30,
              //        stack: 'total',
              //       label: {
              //         show: false,
              //         position: 'top',
              //         textStyle: {
              //           color: '#485465'
              //         }
              //       },
              //       itemStyle: {
              //         normal: {
              //           color: function(params){
              //             console.log(params)
              //             let colorlist = ['#1763F7','#73A1FA','#B0C5F5','#CEE1FF'];
              //             return colorlist[params.dataIndex];
              //           }
              //         },
              //       }
              //     },
              //     {
              //       data: [150, 100, 250, 100],
              //       type: 'bar',
              //       barWidth: 30,
              //        stack: 'total',
              //       label: {
              //         show: true,
              //         position: 'top',
              //         textStyle: {
              //           color: '#485465'
              //         }
              //       },
              //       itemStyle: {
              //         normal: {
              //           barBorderRadius: [5, 5, 0, 0],
              //           color: function(params){
              //             console.log(params)
              //             let colorlist = ['#55C2D0','#87D4DE','#BBE7EC','#D4F8F7'];
              //             return colorlist[params.dataIndex];
              //           }
              //         },
              //       }
              //     }
              //   ]
              // };
              // vm.setOption(option);
              this.contentData.map((item, index) => {
                let chartData = [(item.generalBudget | 0), (item.fixedAmount | 0), (item.bmAmount | 0), (item.paymentAmount | 0)]
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
                    label: {
                      show: true,
                      position: 'top',
                      textStyle: {
                        color: '#485465'
                      }
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
                vm1.setOption(option1);
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
  },
};
</script>
<style lang="scss" scoped>
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

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
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
      margin-bottom: 29px;
      margin-right: calc((100% - 1640px) / 3);
      cursor: pointer;

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
        font-size: 12px;
        color: #485465;
        text-align: right;
        margin-top: 24px;
      }

      .chart {
        width: 100%;
        height: 210px;
      }
    }
  }
}
</style>
