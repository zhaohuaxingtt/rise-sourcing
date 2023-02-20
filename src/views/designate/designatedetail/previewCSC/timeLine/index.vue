<!--
 * @Author: wentliao
 * @Date: 2021-05-24 11:39:32
 * @Description: 决策资料-timeLine
-->
<template>
  <div
    class="decision-data-timeLine"
    v-permission.auto="
      SOURCING_NOMINATION_ATTATCH_TIMELINE | (决策资料 - timeline)
    "
  >
    <el-radio-group
      class="radio-group margin-bottom20"
      v-model="tabBar"
      @change="changeCarType"
    >
      <template v-for="item in carTypeList">
        <el-radio-button
          :label="item.carTypeProjectNum"
          :key="item.carTypeProjectNum"
        ></el-radio-button>
      </template>
    </el-radio-group>
    <div class="time-box" v-loading="isLoading">
      <span class="label">Supplier</span>
      <div class="line-div">
        <div class="wrap-div"></div>
        <div style="width: 100%; height: 100%">
          <template v-for="(item, index) in lineListNew">
            <div
              class="line-samll"
              :key="index"
              v-if="item.show"
              :style="{ left: item.w + '%' }"
            >
              <div
                class="time-line"
                :class="item.garyShow ? 'gray' : 'line-line'"
              >
                <p class="line-title">
                  <span>{{ item.name }}</span
                  ><br /><span>{{ item.time }}</span>
                </p>
                <div
                  class="text-line"
                  :style="{ background: item.color || '#333' }"
                ></div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="year-table">
        <template v-for="year in timeRange">
          <div
            class="year"
            :key="year.name"
            :style="{
              width: getWidth(year.monthList) + '%',
            }"
          >
            <div class="year-value">{{ year.name }}</div>
            <div class="month">
              <template v-for="month in year.monthList">
                <div class="month-value" :key="year + month">
                  <div
                    class="month-title"
                    :class="{ longer: dateRange > 1200 }"
                    :title="month"
                  >
                    {{ month }}
                  </div>
                  <div class="month-content"></div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
      <div class="top-line"></div>
      <div class="supplier-table">
        <template
          v-for="(item, index) in detail.timeAxisSupplierInfoList"
        >
          <div class="supplier" :key="item.supplierId + index">
            <div class="supplier-name">{{ item.supplierNameEn }}</div>
            <div class="supplier-time">
              <div
                class="time-range-1st"
                :style="{
                  width: ((item.oneStWeek * 7) / dateRange) * 100 + '%',
                  marginLeft: getMargin() + '%',
                }"
              >
                <!-- 1st Tryout: -->
                {{ item.oneStWeek }}W
              </div>

              <el-tooltip
                :content="'EM:' + item.qthreeWeek"
                placement="top"
                effect="light"
              >
                <div
                  class="time-range-em"
                  :style="{
                    width: ((item.qthreeWeek * 7) / dateRange) * 100 + '%',
                  }"
                >
                  <!-- EM:  -->
                  {{ item.qthreeWeek }}W
                </div>
              </el-tooltip>
              <div
              v-if="item.otsWeek"
                class="otsWeek"
                :style="{
                  left: getPosition(item.otsWeek) + '%',
                }"
              >
                <img class="img" :src="ots" />
                <div class="text">OTS</div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="bottom-line"></div>
    </div>
  </div>
</template>

<script>
import { iCard, iButton, icon, iMessage } from "rise";
import ots from "@/assets/images/icon/ots.png";
import { getNomiCarProjectTimeAxis } from "@/api/designate/decisiondata/timeLine";
import { analysisNomiCarProject } from "@/api/partsrfq/editordetail/abprice";
export default {
  name: "timeLine",
  components: {
    iCard,
    iButton,
    icon,
  },
  data() {
    return {
      ots,
      isLoading: false,
      detailData: [],
      timeRange: [],
      lineListNew: {
        rfqTime: {
          name: "RFQ",
          time: "KW20",
        },
        cscTime: {
          name: "CSC",
          time: "KW20",
        },
        bfConfirmTime: {
          name: "BF",
          time: "KW20",
          color: "#f00",
        },
        vffTbtTime: {
          name: "VFF",
          time: "KW20",
        },
        pvsTbtTime: {
          name: "PVS",
          time: "KW20",
        },
        osTbtTime: {
          name: "OS",
          time: "KW20",
        },
        sopTbtTime: {
          name: "SOP",
          time: "KW20",
        },
        partReleaseTime: {
          name: "Part Release",
          time: "KW20",
        },
      },
      monthLabel: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      tableData: [],
      tabBar: "",
      detail: {},
      carTypeList: [],
      carTypeObj: {},
      carTypeDetail: {},
      carProjectId: "",
    };
  },
  created() {
    this.analysisNomiCarProject();
  },
  mounted() {},
  methods: {
    getWidth(list) {
      let arr = [];
      this.timeRange.forEach((item) => {
        arr = [...arr, ...item.monthList];
      });
      return (list.length / arr.length) * 100;
    },
    getMargin() {
      return this.lineListNew.bfConfirmTime.w;
    },
    getPosition(date) {
      return (
        ((new Date(date).getTime() - this.MonthFirst) /
          (24 * 60 * 60 * 1000) /
          this.dateRange) *
        100
      );
    },
    getFirstDate() {
      let timeList = [
        new Date(this.detail.sopTbtTime).getTime(),
        new Date(this.detail.rfqTime).getTime(),
        new Date(this.detail.pvsTbtTime).getTime(),
        new Date(this.detail.partReleaseTime).getTime(),
        new Date(this.detail.osTbtTime).getTime(),
        new Date(this.detail.bfConfirmTime).getTime(),
        new Date(this.detail.cscTime).getTime(),
      ];
      let maxDate = Math.max(...timeList);
      let minDate = Math.min(...timeList);
      // 最小月第一天
      let MonthFirst = window.moment(minDate).startOf("month").format("x");
      // 最大月最后天
      let MonthLast = window.moment(maxDate).endOf("month").format("x");
      this.MonthFirst = MonthFirst;
      this.MonthLast = MonthLast;
      // 时间范围
      this.dateRange = parseInt(
        (MonthLast - MonthFirst) / (24 * 60 * 60 * 1000)
      );
      console.log(this.MonthFirst);
      console.log(this.MonthLast);
      console.log(this.dateRange);
      Object.keys(this.lineListNew).forEach((key) => {
        if (this.detail[key]) this.lineListNew[key].show = true;
        this.lineListNew[key].w =
          (
            parseInt(
              (new Date(this.detail[key]).getTime() - MonthFirst) /
                (24 * 60 * 60 * 1000)
            ) / this.dateRange
          ).toFixed(4) * 100;
      });
      console.log(this.lineListNew);
      this.getMonthList(MonthFirst, MonthLast);
    },
    getMonthList(MonthFirst, MonthLast) {
      console.log(MonthFirst);
      let firstYear = new Date(+MonthFirst).getFullYear();
      let lastYear = new Date(+MonthLast).getFullYear();
      let indexStart = new Date(+MonthFirst).getMonth();
      let indexEnd = new Date(+MonthLast).getMonth();

      if (lastYear - firstYear == 0) {
        this.timeRange = [
          {
            name: firstYear,
            monthList: [],
          },
        ];
        for (let i = indexStart; i <= indexEnd; i++) {
          this.timeRange[0].monthList.push(this.monthLabel[i]);
        }
      }
      if (lastYear - firstYear == 1) {
        this.timeRange = [
          {
            name: firstYear,
            monthList: [],
          },
          {
            name: lastYear,
            monthList: [],
          },
        ];
        for (let i = indexStart; i <= 11; i++) {
          this.timeRange[0].monthList.push(this.monthLabel[i]);
        }
        for (let i = 0; i <= indexEnd; i++) {
          this.timeRange[1].monthList.push(this.monthLabel[i]);
        }
      } else {
        this.timeRange = [];
        for (let i = firstYear; i <= lastYear; i++) {
          this.timeRange.push({
            name: i,
            monthList: this.monthLabel,
          });
        }
        console.log(firstYear);
        console.log(lastYear);
        console.log(this.timeRange);
        this.timeRange[0].monthList = [];
        for (let i = indexStart; i <= 11; i++) {
          this.timeRange[0].monthList.push(this.monthLabel[i]);
        }
        this.timeRange[this.timeRange.length - 1].monthList = [];
        for (let i = 0; i <= indexEnd; i++) {
          this.timeRange[this.timeRange.length - 1].monthList.push(
            this.monthLabel[i]
          );
        }
      }
      // let index = new Date(MonthFirst).getMonth()
      // for (let i = index; i <= 11; i++) {
      //   list.push(this.monthLabel[i]);
      // }
      console.log(this.timeRange);
      // return list
    },
    analysisNomiCarProject() {
      this.carTypeObj = {};
      analysisNomiCarProject({
        nomiId: this.$route.query.desinateId,
      }).then((res) => {
        if (res?.code == "200") {
          this.carTypeList = res.data;
          this.carTypeList.forEach((item) => {
            this.carTypeObj[item.carTypeProjectNum] = JSON.parse(
              JSON.stringify(item)
            );
          });
          this.tabBar = this.carTypeList[0]?.carTypeProjectNum || "";
          this.changeCarType(this.tabBar);
        }
      });
    },

    changeCarType(val) {
      this.carTypeDetail = this.carTypeObj[val];
      this.getNomiCarProjectTimeAxis();
    },
    // 通过定点申请id和车型项目查询时间轴
    getNomiCarProjectTimeAxis() {
      this.isLoading = true;
      getNomiCarProjectTimeAxis(
        this.$route.query.desinateId,
        this.carTypeDetail.carTypeProjectId
      )
        .then((res) => {
          if (res?.code == "200") {
            this.detail = res.data[0];
            this.getFirstDate();
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: (state) => state.nomination.nominationDisabled,
      rsDisabled: (state) => state.nomination.rsDisabled,
    }),
    isPreview() {
      return this.$store.getters.isPreview;
    },
  },
};
</script>

<style lang="scss" scoped>
.decision-data-timeLine {
  position: relative;
  ::v-deep .el-radio-group {
    &.radio-group {
      .el-radio-button__inner {
        display: flex;
        border-radius: 0;
        height: 26px;
        padding: 3px 10px;
        align-items: center;
        min-width: 60px;
        justify-content: center;
        &:hover {
          color: #727272;
        }
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background: #364d6e;
        color: #fff;
        border-color: #e0e6ed;
      }
    }
  }
}
.time-box {
  position: relative;
  padding-top: 60px;
  .label {
    position: absolute;
    font-size: 18px;
    font-weight: 700;
    top: 110px;
    padding-left: 10px;
  }
}
.table {
  ::v-deep .el-table__header {
    background-color: #364d6e;
    tr:nth-child(even) {
      background-color: #fff;
      .cell {
        color: #222 !important;
      }
    }
  }
}
.time-line {
  position: absolute;
  display: flex;
  flex-flow: column;
  align-items: center;
  top: 0;
  z-index: 9;
  height: 100%;
  .line-title {
    position: absolute;
    text-align: center;
  }
  .text-line {
    margin-top: 50px;
    width: 2px;
    flex: 1;
  }
}
</style>
<style lang="scss" scoped>
.year-table {
  display: flex;
  flex-flow: row;
  margin-left: 180px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  width: calc(100% - 188px);
  height: calc(100% - 60px);
  position: absolute;
  border-left: 1px solid #222;
  pointer-events: none;
  .year {
    border-top: 1px solid #222;
    display: flex;
    flex-flow: column;
    align-items: center;
    line-height: 35px;
    z-index: 1;
    .year-value {
      width: 100%;
      border-right: 1px solid #222;
      color: #fff;
      background: #364d6e;
    }
    .month {
      border-top: 1px solid #222;
      display: flex;
      flex: 1;
      width: 100%;
      .month-value {
        border-right: 1px solid #222;
        display: flex;
        flex-flow: column;
        flex: 1;
        line-height: 35px;
        overflow: hidden;
        .month-title {
          overflow: hidden;
        }
        .longer {
          writing-mode: tb-rl;
          line-height: initial;
        }
        .month-content {
          height: 100%;
          flex: 1;
        }
      }
    }
  }
}
.top-line {
  &::after {
    content: "";
    width: calc(100% - 8px);
    height: 0px;
    display: block;
    position: relative;
    top: 73px;
    border-top: 1px solid;
  }
}
.bottom-line {
  &::before {
    content: "";
    width: calc(100% - 8px);
    height: 0px;
    display: block;
    border-top: 1px solid;
    position: relative;
    top: -1px;
  }
}
.supplier-table {
  width: 100%;
  max-height: calc(100vh - 300px);
  min-height: 300px;
  margin-top: 72px;
  line-height: 37px;
  overflow-y: scroll;
  .supplier {
    display: flex;
    flex-flow: row;
    font-size: 16px;
    font-weight: 700;
    border-left: 1px solid #222;
    &:last-of-type {
      border-bottom: 1px solid #222;
    }
    .supplier-name {
      width: 180px;
      padding: 5px 8px;
      border-right: 1px solid #222;
      border-top: 1px solid #222;
      display: inline-flex;
      align-items: center;
    }
    .supplier-time {
      border-right: 1px solid #222;
      border-top: 1px solid #222;
      width: 100%;
      display: flex;
      flex: 1;
      padding: 8px 0;
      position: relative;
      .time-range-1st {
        height: 50px;
        line-height: 50px;
        background: #0092eb;
        white-space: nowrap;
        padding-left: 5px;
        opacity: 0.7;
      }
      .time-range-em {
        height: 50px;
        line-height: 50px;
        background: #2a4659;
        white-space: nowrap;
        padding-left: 5px;
        opacity: 0.7;
      }
      .otsWeek {
        position: absolute;
        height: 30px;
        display: flex;
        align-items: center;
        top: 15px;
        .img {
          transform: translate(-50%, 0);
        }
        .text {
          line-height: 24px;
          border: 1px solid;
          padding: 0px 5px;
          margin-left: -8px;
          background: #fff;
          color: #222;
        }
      }
    }
  }
}
.line-div {
  width: calc(100% - 182px);
  height: 100%;
  position: absolute;
  margin-left: 180px;
  left: 0px;
  top: 0px;
  display: flex;
  flex-wrap: wrap;
  -webkit-pointer-events: none;
  -moz-pointer-events: none;
  -ms-pointer-events: none;
  -o-pointer-events: none;
  pointer-events: none;
}
.line-samll {
  position: absolute;
  height: 100%;
  top: 0;
  left: 10%;

  .gray {
    height: 100%;
    width: 2px;
    background: #cbcbcb;
  }

  span {
    font-size: 14px;
    font-weight: bold;
    pointer-events: all;
  }
  .gray-name {
    color: #a9a9a9;
  }
}
</style>