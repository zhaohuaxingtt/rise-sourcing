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
          <template v-for="(item, index) in Object.values(lineListNew)">
            <div
              ref="time-line"
              class="line-samll"
              :key="index"
              v-if="item.show"
              :style="{ left: item.w + '%' }"
            >
              <div
                class="time-line"
                :class="item.garyShow ? 'gray' : 'line-line'"
              >
                <p class="line-title" :style="offsetList[index]">
                  <span>{{ item.name }}</span
                  ><br />
                  <span>KW{{ item.time }}</span>
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
        <template v-for="(item, index) in detail.timeAxisSupplierInfoList">
          <div class="supplier" :key="item.supplierId + index">
            <div class="supplier-name">{{ item.supplierNameEn }}</div>
            <div class="supplier-time">
              <div
                class="time-range-1st"
                v-if="item.oneStWeek"
                :style="{
                  width: ((item.oneStWeek * 7) / dateRange) * 100 + '%',
                  marginLeft: getMargin() + '%',
                }"
              >
                <!-- 1st Tryout: -->
                {{ item.oneStWeek }}W
              </div>

              <el-tooltip
                :content="'EM:' + item.emWeek"
                v-if="item.emWeek"
                placement="top"
                effect="light"
              >
                <div
                  class="time-range-em"
                  :style="{
                    width: ((item.emWeek * 7) / dateRange) * 100 + '%',
                  }"
                >
                  <!-- EM:  -->
                  {{ item.emWeek }}W
                </div>
              </el-tooltip>
              <!-- Q3:  -->
              <el-tooltip
                :content="'Q3:' + item.qthreeWeek"
                v-if="item.qthreeWeek"
                placement="top"
                effect="light"
              >
                <div
                  class="time-range-q3"
                  :style="{
                    width: ((item.qthreeWeek * 7) / dateRange) * 100 + '%',
                  }"
                >
                  {{ item.qthreeWeek }}W
                </div>
              </el-tooltip>
              <!-- Q1:  -->
              <el-tooltip
                :content="'Q1:' + item.qoneWeek"
                v-if="item.qoneWeek"
                placement="top"
                effect="light"
              >
                <div
                  class="time-range-q1"
                  :style="{
                    width: ((item.qoneWeek * 7) / dateRange) * 100 + '%',
                  }"
                >
                  {{ item.qoneWeek }}W
                </div>
              </el-tooltip>

              <!-- <div
              v-if="item.otsWeek"
                class="otsWeek"
                :style="{
                  left: getPosition(item.otsWeek) + '%',
                }"
              >
                <img class="img" :src="ots" />
                <div class="text">OTS</div>
              </div> -->
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
      offsetList: [],
      lineListNew: {
        rfqTime: {
          name: "RFQ",
          time: "KW20",
        },
        cscTime: {
          name: "CSC",
          time: "KW20",
          color: "#f00",
        },
        bfConfirmTime: {
          name: "BF",
          time: "KW20",
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
          name: "Newpro",
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
      if (this.lineListNew.bfConfirmTime.w >= this.lineListNew.cscTime.w) {
        return this.lineListNew.bfConfirmTime.w;
      }
      return this.lineListNew.cscTime.w;
    },
    getPosition(date) {
      return (
        ((new Date(date).getTime() - this.MonthFirst) /
          (24 * 60 * 60 * 1000) /
          this.dateRange) *
        100
      );
    },
    computedLabelPosition() {
      let arr = [];
      let list = this.$refs["time-line"];
      for (let i = 0; i < list.length; i++) {
        const el = list[i];
        arr.push({
          index: i,
          offsetLeft: el.offsetLeft,
          textWidth: el.children[0].children[0].clientWidth || 0,
        });
      }
      arr = arr.sort((a, b) => a.offsetLeft - b.offsetLeft);
      if (arr.length > 1)
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i];
          if (i == 0) {
            //比较前两个,定位两个的初始位置
            let next = arr[i + 1];
            let minOffset =
              parseInt((item.textWidth + next.textWidth) / 2) + 10; // 线条最小间距
            let offset = next.offsetLeft - item.offsetLeft; // 线条实际间距
            if (offset < minOffset) {
              item.offset = -(minOffset - offset) / 2 - item.textWidth / 2; // 文字往左偏移
              next.offset = -(minOffset - offset) / 2 + next.textWidth / 2; // 文字往右偏移
            }
          } else if (i > 1) {
            let prev = arr[i - 1];
            let minOffset =
              parseInt((item.textWidth + prev.textWidth) / 2) + 10; // 线条最小间距
            if (prev.offset) {
              // 已经偏移过
              let offset =
                item.offsetLeft -
                (prev.offsetLeft + prev.offset + prev.textWidth); // 模拟线条实际间距
              if (offset < minOffset) {
                // 实际间距小于最小间距, 补齐间距到最小间距
                item.offset = minOffset - offset - item.textWidth;
              }
            } else {
              let offset = item.offsetLeft - prev.offsetLeft; // 线条实际间距
              if (offset < minOffset) {
                // 实际间距小于最小间距, 补齐间距到最小间距
                item.offset = minOffset - offset - item.textWidth / 2;
              }
            }

            // let prev = arr[i-1]
            // let minOffset = parseInt(prev.textWidth / 2) + 10 // 最小间距
            // let offset = item.offsetLeft - ((prev.offsetLeft + (prev.offset?prev.offset + prev.textWidth : (prev.textWidth/2))))  // 实际间距: 当前文本与前一个文本的距离
            // if(offset<0){
            //   item.offset = prev.offset + prev.textWidth // 往右偏移
            // }else if(offset<minOffset){
            //   item.offset = minOffset - offset - item.textWidth / 2 // 往右偏移
            // }
          }
        }
      let offsetList = JSON.parse(JSON.stringify(arr)).sort(
        (a, b) => a.index - b.index
      );
      this.offsetList = offsetList.map((item) => {
        return {
          left: item.offset + "px",
        };
      });
    },
    getFirstDate() {
      let timeList = [];
      if (this.detail.sopTbtTime)
        timeList.push(new Date(this.detail.sopTbtTime).getTime());
      if (this.detail.rfqTime)
        timeList.push(new Date(this.detail.rfqTime).getTime());
      if (this.detail.pvsTbtTime)
        timeList.push(new Date(this.detail.pvsTbtTime).getTime());
      if (this.detail.partReleaseTime)
        timeList.push(new Date(this.detail.partReleaseTime).getTime());
      if (this.detail.osTbtTime)
        timeList.push(new Date(this.detail.osTbtTime).getTime());
      if (this.detail.bfConfirmTime)
        timeList.push(new Date(this.detail.bfConfirmTime).getTime());
      if (this.detail.cscTime)
        timeList.push(new Date(this.detail.cscTime).getTime());
      if (this.detail.vffTbtTime)
        timeList.push(new Date(this.detail.vffTbtTime).getTime());
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
      Object.keys(this.lineListNew).forEach((key) => {
        if (this.detail[key]) this.lineListNew[key].show = true;
        this.lineListNew[key].w =
          (
            parseInt(
              (new Date(this.detail[key]).getTime() - MonthFirst) /
                (24 * 60 * 60 * 1000)
            ) / this.dateRange
          ).toFixed(4) * 100;
        let week = window.moment(new Date(this.detail[key])).week();
        this.lineListNew[key].time = week < 10 ? "0" + week : week;
      });
      this.getMonthList(MonthFirst, MonthLast);
    },
    getMonthList(MonthFirst, MonthLast) {
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
      this.$nextTick(() => {
        this.computedLabelPosition();
      });
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
  border-left: 1px solid #d9d9d9;
  pointer-events: none;
  .year {
    border-top: 1px solid #d9d9d9;
    display: flex;
    flex-flow: column;
    align-items: center;
    line-height: 35px;
    z-index: 1;
    .year-value {
      width: 100%;
      border-right: 1px solid #d9d9d9;
      color: #fff;
      background: #364d6e;
    }
    .month {
      border-top: 1px solid #d9d9d9;
      display: flex;
      flex: 1;
      width: 100%;
      .month-value {
        border-right: 1px solid #d9d9d9;
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
    border-top: 1px solid #d9d9d9;
  }
}
.bottom-line {
  &::before {
    content: "";
    width: calc(100% - 8px);
    height: 0px;
    display: block;
    position: relative;
    top: -1px;
    border-top: 1px solid #d9d9d9;
  }
}
.supplier-table {
  width: 100%;
  max-height: calc(100vh - 300px);
  margin-top: 72px;
  line-height: 37px;
  overflow-y: scroll;
  .supplier {
    display: flex;
    flex-flow: row;
    font-size: 16px;
    font-weight: 700;
    border-left: 1px solid #d9d9d9;
    height: 70px;
    &:last-of-type {
      border-bottom: 1px solid #d9d9d9;
    }
    .supplier-name {
      width: 180px;
      padding: 5px 8px;
      border-right: 1px solid #d9d9d9;
      border-top: 1px solid #d9d9d9;
      display: inline-flex;
      align-items: center;
    }
    .supplier-time {
      border-right: 1px solid #d9d9d9;
      border-top: 1px solid #d9d9d9;
      width: 100%;
      display: flex;
      flex: 1;
      padding: 8px 0;
      position: relative;
      overflow: hidden;
      .time-range-1st {
        background: #f2f2f2;
        white-space: nowrap;
        padding-left: 5px;
        z-index: 1;
        display: inline-flex;
        align-items: center;
      }
      .time-range-em {
        background: #66ccff;
        white-space: nowrap;
        padding-left: 5px;
        z-index: 1;
        display: inline-flex;
        align-items: center;
      }
      .time-range-q3 {
        background: #ccffcc;
        white-space: nowrap;
        padding-left: 5px;
        z-index: 1;
        display: inline-flex;
        align-items: center;
      }
      .time-range-q1 {
        background: #339933;
        white-space: nowrap;
        padding-left: 5px;
        z-index: 1;
        display: inline-flex;
        align-items: center;
      }
      .otsWeek {
        position: absolute;
        height: 30px;
        display: flex;
        align-items: center;
        top: 15px;
        z-index: 1;
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