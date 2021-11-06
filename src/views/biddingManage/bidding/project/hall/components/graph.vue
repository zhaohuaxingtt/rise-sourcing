<template>
  <div>
    <iCard>
      <div class="graph">
        <div id="chartLineBox" style="width: 100%; height: 40rem"></div>
        <div class="graph-amplitude">
          <div class="graph-amplitude__top">
            <span>{{ amplitude }}</span
            >%
          </div>
          <div class="graph-amplitude__bottom">幅度</div>
        </div>
      </div>
    </iCard>

    <!-- <div class="tool-tip">
      <div class="tool-tip-title">{{ "供应商名称" }}</div>
      <div class="form">
        <div class="el-form-item">
          <div class="el-form-label">{{ $t("时间") }}</div>
          <div class="el-form-content"></div>
        </div>
        <div class="el-form-item">
          <div class="el-form-label">{{ $t("出价") }}</div>
          <div class="el-form-content"></div>
        </div>
      </div>
    </div> -->

    <iCard :title="$t('供应商')">
      <commonTable
        ref="tableDataForm"
        :tableData="suppliers"
        :tableTitle="supplierRankTableTitle"
        :tableLoading="tableLoading"
        :selection="false"
        @handleSelectionChange="handleSelectionChange"
      >
        <template slot="currentSort" slot-scope="scope">
          <div>
            {{
              ruleForm.manualBiddingType == "02"
                ? suppliers.length
                : scope.row["currentSort"]
            }}
          </div>
        </template>
        <!-- 是否参与本轮RFQ -->
        <template slot="isAttend" slot-scope="scope">
          <div>{{ scope.row["isAttend"] == "0" ? "否" : "是" }}</div>
        </template>
      </commonTable>
      <iPagination
        v-update
        @current-change="handleCurrentChange($event)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        prev-text="上一页"
        next-text="下一页"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.total"
        @size-change="handleSizeChange"
      />
    </iCard>
  </div>
</template>

<script>
import { iCard, iPagination } from "rise";
import commonTable from "@/components/biddingComponents/commonTable";
import { supplierTableTitle, supplierRankTableTitle, currencyMultipleLib } from "./data";
import {
  findHallSupplier,
  getCurve,
  getProjectResults,
  getBiddingDetails
} from "@/api/bidding/bidding";
import { pageMixins } from "@/utils/pageMixins";
import { getCurrencyUnit } from "@/api/mock/mock";
import dayjs from "dayjs";
import Big from "big.js";
import supplierListVue from "./supplierList.vue";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iPagination,

    commonTable,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
        
      },
    },
  },
  data() {
    return {
      // 测试数据
      showAddRFQ: false,
      showAddManual: false,

      showSupplierDialog: false,

      id: 0,
      orgRuleForm: {
        biddingProducts: [],
      },
      ruleForm: {},

      selectedTableData: [],

      cbdLevelList: [],
      userListCache: {},

      supplierTableTitle,
      supplierRankTableTitle,
      currencyMultipleLib,

      clickType: "",

      suppliers: [],

      offerPriceList: [],
      supplierlist: [],
      currencyUnit: {},

      xAxisTitle: "",
      xAxisData: [],

      supplierOffers: [],

      maxDate: "",
      minDate: "",

      split: 1,
      amplitudeList: {
        maxPrice: 0,
        minPrice: 0,
        finPrice: 0,
      },
    };
  },
  computed: {
    suppliersPage() {
      const { suppliers } = this.ruleForm;
      const { currPage, pageSize } = this.page;
      return suppliers?.slice((currPage - 1) * pageSize, pageSize * currPage);
    },
    beishu() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.beishu || 1;
    },
    currencyMultiple() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.unit || "元";
    },
    // 幅度
    amplitude() {
      let { manualBiddingType, totalPrices, biddingType, roundType } =
        this.ruleForm;
      let { maxPrice, minPrice, finPrice } = this.amplitudeList;
      let amp;
      if (manualBiddingType == "02" && biddingType == "01") {
        amp = (
          ((finPrice - totalPrices) / totalPrices).toFixed(4) * 100
        ).toFixed(2);
      } else if (
        (manualBiddingType == "01" || roundType == "03") &&
        biddingType == "02"
      ) {
        amp = (
          ((maxPrice - totalPrices) / totalPrices).toFixed(4) * 100
        ).toFixed(2);
      } else {
        amp = (
          ((totalPrices - minPrice) / totalPrices).toFixed(4) * 100
        ).toFixed(2);
      }
      return isNaN(amp) ? "" : amp;
    },
  },
  async created() {
    this.id = this.$route.params.id;
    // this.cbdLevelList = await getSuppliers();
  },
  mounted() {
    this.handleSearchReset();
    // this.drawLine();
    getCurrencyUnit().then((res) => {
      this.currencyUnit = res.data?.reduce((obj, item) => {
        return { ...obj, [item.code]: item.name };
      }, {});
    });
  },
  methods: {
    handleSearchReset() {
      let param = this.id;
      this.query(param);
    },
    currencyMultiples(currencyMultiple) {
      return {
        "01": "元",
        "02": "千",
        "03": "万",
        "04": "百万",
      }[currencyMultiple];
    },
    dividedBeiShu(val){
     return Big(val).div(this.beishu).toNumber()
    },
    handleUserChange(row, item) {
      row.contactName = item.nameZh;
      row.contactId = item.id;
      row.email = item.email;
      row.telephone = item.phoneM;
    },
    handleCbdChange(row, item) {
      row.cbdLevel = item.cbdLevel;
      row.supplierCode = item.supplierCode;
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
    },
    // 表格选中值集
    handleCurrentChange(e) {
      this.page.currPage = e;
    },
    handlePrice(list) {
      let max = list[0]?.offerPrice;
      let min = list[0]?.offerPrice;
      let time = dayjs(list[0]?.clientTime).valueOf();
      let index = 0;

      for (let i = 0; i < list.length; i++) {
        if (list[i]?.offerPrice > max) {
          max = list[i].offerPrice;
        }
        if (list[i]?.offerPrice < min) {
          min = list[i].offerPrice;
        }
        if (time < dayjs(list[i]?.clientTime).valueOf()) {
          index = i;
        }
      }
      this.amplitudeList.maxPrice = max;
      this.amplitudeList.minPrice = min;
      this.amplitudeList.finPrice = list[index]?.offerPrice;
    },
    async query(e) {
      const res = await getProjectResults({
        id: e,
      });
      const result = await getCurve({
        id: e,
      });
      this.$emit("change-title", res);
      this.page.total = res.length;
      this.page.currPage = 1;

      const biddingDetail = await getBiddingDetails({
        id: e,
      }).catch((err) => {
        console.log(err)
      });

      if (biddingDetail || biddingDetail?.length > 0) {
        this.handlePrice(biddingDetail);
      }
      this.xAxisTitle = `(${this.currencyMultiples(result?.currencyMultiple)})${
        this.currencyUnit[result?.currencyUnit]
      }`;
      result.amplitude = (result.amplitude * 100).toFixed(2)
      this.ruleForm = {
        ...result,
      };
      console.log(287,this.ruleForm)
      // const supplierOffer = {
      // ...this.ruleForm.supplierOffer,
      // offerPrice: this.dividedBeiShu(this.ruleForm.supplierOffer.offerPrice)
      // }
      // const totalPrices = this.dividedBeiShu(this.ruleForm.totalPrices)
      // this.ruleForm = {... this.ruleForm,totalPrices}

      let { biddingBeginTime, biddingEndTime } = result;
      let beginTime = dayjs(biddingBeginTime).valueOf();
      let endTime = dayjs(biddingEndTime).valueOf();
      const interval = (endTime - beginTime) / 1000 / 60;
      let split = Math.ceil(interval/2) - 1; 
      if (split <= 0) {
        const interval2 = (Math.ceil(dayjs(biddingBeginTime).valueOf() / 1000 / 60) * 1000 * 60 - beginTime) / (endTime - beginTime) || 0.01;
        this.split = interval < 1 ? 0.01 : interval2;
        // this.split = 0.5
      } else if (split < 15) {
        this.split = split - 0.1;
      } else {
        this.split = 15;
      }

      this.minDate = dayjs(beginTime).format("YYYY/MM/DD HH:mm:ss");
      this.maxDate = dayjs(endTime).format("YYYY/MM/DD HH:mm:ss");
      console.log(result)
      if (result.roundType == "05" && result.manualBiddingType == "02") {
        this.suppliers = res?.filter(item => item?.supplierCode == result?.finalOfferSupplier)
        this.handleHeGraphData(result.supplierOffers);
        this.handleHeLine(result.dutchOfferCurveDTOS);
        this.drawHeLine();
      } else {
        this.handleGraphData(result.supplierOffers);
        this.drawLine();
        this.suppliers = res;
      }
    },
    handleShowBidNotice() {
      this.showBidNotice = true;
    },
    handleBottom(e) {
      this.bottomActived = e;
    },
    // 英式曲线图
    drawLine() {
      let chartLine = this.$echarts.init(
        document.getElementById("chartLineBox")
      );
      let fontOptions = {
        show: true,
        textStyle: {
          color: "black", //更改坐标轴文字颜色
          fontSize: "1rem", //更改坐标轴文字大小
        },
      };

      let multiple = this.currencyMultiples(this.ruleForm?.currencyMultiple);
      let unit = this.ruleForm?.currencyUnit;

      let options = {
        title: {
          left: "18%",
          top: "14%",
          text: this.xAxisTitle,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            label: {
              formatter: function (params) {
                if (params.seriesData.length === 0) {
                  window.mouseCurValue = params.value;
                }
              },
            },
          },
          formatter:(params) =>{
            let htmlStr = ``;
            let series = params[0];
            htmlStr = `<div style="width: 35rem;background: #fff;padding: 1.875rem 2.5rem;border-radius: 0.375rem;">
                    <div class="tool-tip-title" style="padding-bottom: 1.875rem;font-size: 1.125rem;color: #131523;font-weight: bold;">${
                      series.seriesName
                    }</div>
                    <div class="form">
                        <!-- 时间 -->
                        <div class="el-form-item" style="width: 30rem;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
                        <div class="el-form-label" style="width: 10rem;font-size: 0.875rem;color: #4d4f5c;">时间</div>
                        <div class="el-form-content" style="background-color: #f4f5f6;display: flex;justify-content: center;align-items: center;font-size: 1rem;color: #000;width: 100%;height: 2.1875rem;box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);">${dayjs(
                          series.axisValue
                        ).format("HH:mm:ss")}</div>
                        </div>
                        <!-- 出价 -->
                        <div class="el-form-item" style="width: 30rem;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
                        <div class="el-form-label" style="width: 10rem;font-size: 0.875rem;color: #4d4f5c;">出价</div>
                        <div class="el-form-content" style="background-color: #f4f5f6;display: flex;justify-content: center;align-items: center;font-size: 1rem;color: #000;width: 100%;height: 2.1875rem;box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);">${
                          unit + " " + series.value[1] + " " + multiple
                        }</div>
                        </div>
                    </div>
                    </div>`;
            return htmlStr;
          },
        },
        legend: {
          data: this.supplierlist,
          left: 0,
          top: "30%",
          orient: "vertical",
          textStyle: {
            fontSize: "1rem",
            padding: 10,
          },
          itemWidth: 40,
          itemGap: 20,
          itemHeight: 15,
        },
        grid: {
          left: "20%",
          right: "4%",
          bottom: "3%",
          top: "20%",
          containLabel: true,
        },
        xAxis: {
          min: this.minDate,
          max: this.maxDate,
          type: "time",
          boundaryGap: false,
          splitLine: {
            show: false,
          },
          splitNumber: this.split,
          axisLabel: {
            textStyle: {
              color: "black", //更改坐标轴文字颜色
              fontSize: ".8rem", //更改坐标轴文字大小
            },
            formatter: {
              hour: "{hour|{HH}:{mm}}",
              second: "{HH}:{mm}",
              millisecond: "{HH}:{mm}",
              none: "{HH}:{mm}",
            },
            rich: {
              hour: {
                fontSize: ".8rem",
              },
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#333",
              width: 3,
            },
          },
          axisTick: {
            show: true,
            length: 5,
            lineStyle: {
              width: 3,
            },
          },
          offset: 10,
        },
        yAxis: {
          type: "value",
          axisLabel: fontOptions,
          offset: 20,
          splitLine: {
            show: true,
            lineStyle: {
              width: 2,
            },
          },
        },
        dataZoom: [
          // {
          //   show: true,
          //   type: "inside",
          //   filterMode: "none",
          //   xAxisIndex: [0],
          // },
          {
            show: true,
            type: "inside",
            filterMode: "none",
            yAxisIndex: [0],
          },
        ],
        // tooltip:
        series: this.offerPriceList,
      };
      chartLine.setOption(options);
    },
    // 荷氏曲线图
    drawHeLine() {
      let chartLine = this.$echarts.init(
        document.getElementById("chartLineBox")
      );
      let fontOptions = {
        show: true,
        textStyle: {
          color: "black", //更改坐标轴文字颜色
          fontSize: "1rem", //更改坐标轴文字大小
        },
      };

      let multiple = this.currencyMultiples(this.ruleForm?.currencyMultiple);
      let unit = this.ruleForm?.currencyUnit;
      let options = {
        title: {
          left: "18%",
          top: "14%",
          text: this.xAxisTitle,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            label: {
              formatter: function (params) {
                if (params.seriesData.length === 0) {
                  window.mouseCurValue = params.value;
                }
              },
            },
          },
          formatter:(params) => {
            let htmlStr = ``;
            let series = params[0];
              htmlStr = `<div style="width: 35rem;background: #fff;padding: 1.875rem 2.5rem;border-radius: 0.375rem;">
                    <div class="tool-tip-title" style="padding-bottom: 1.875rem;font-size: 1.125rem;color: #131523;font-weight: bold;">${
                      series.componentSubType == "scatter" ? series.seriesName : '采购员'
                    }</div>
                    <div class="form">
                        <!-- 时间 -->
                        <div class="el-form-item" style="width: 30rem;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
                        <div class="el-form-label" style="width: 10rem;font-size: 0.875rem;color: #4d4f5c;">时间</div>
                        <div class="el-form-content" style="background-color: #f4f5f6;display: flex;justify-content: center;align-items: center;font-size: 1rem;color: #000;width: 100%;height: 2.1875rem;box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);">${dayjs(
                          series.axisValue
                        ).format("HH:mm:ss")}</div>
                        </div>
                        <!-- 出价 -->
                        <div class="el-form-item" style="width: 30rem;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
                        <div class="el-form-label" style="width: 10rem;font-size: 0.875rem;color: #4d4f5c;">出价</div>
                        <div class="el-form-content" style="background-color: #f4f5f6;display: flex;justify-content: center;align-items: center;font-size: 1rem;color: #000;width: 100%;height: 2.1875rem;box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);">${
                          unit + " " + series.value[1] + " " + multiple
                        }</div>
                        </div>
                    </div>
                    </div>`;

            return htmlStr;
          },
        },
        legend: {
          data: this.supplierlist,
          left: 0,
          top: "30%",
          orient: "vertical",
          textStyle: {
            fontSize: "1rem",
            padding: 10,
          },
          itemWidth: 40,
          itemGap: 20,
          itemHeight: 15,
        },
        grid: {
          left: "20%",
          right: "4%",
          bottom: "3%",
          top: "20%",
          containLabel: true,
        },
        xAxis: {
          // min: this.minDate,
          // max: this.maxDate,
          type: "time",
          boundaryGap: false,
          splitLine: {
            show: false,
          },
          // 3
          splitNumber: this.split,
          axisLabel: {
            // interval: 0,
            textStyle: {
              color: "black", //更改坐标轴文字颜色
              fontSize: ".8rem", //更改坐标轴文字大小
            },
            formatter: {
              hour: "{hour|{HH}:{mm}}",
              second: "{HH}:{mm}",
              millisecond: "{HH}:{mm}",
              none: "{HH}:{mm}",
            },
            rich: {
              hour: {
                fontSize: ".8rem",
              },
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#333",
              width: 3,
            },
          },
          axisTick: {
            show: true,
            length: 15,
            interval: 'auto',
            lineStyle: {
              width: 3,
            },
          },
          offset: 10,
        },
        yAxis: {
          type: "value",
          axisLabel: fontOptions,
          offset: 20,
          splitLine: {
            show: true,
            lineStyle: {
              width: 2,
            },
          },
        },
        dataZoom: [
          // {
          //   show: false,
          //   type: "inside",
          //   xAxisIndex: [1],
          //   zoomLock: true,
          //   filterMode: "none",
          //   preventDefaultMouseMove: true
          // },
          {
            show: true,
            type: "inside",
            filterMode: "none",
            yAxisIndex: [0],
          },
        ],
        // tooltip:
        series: this.offerPriceList,
      };
      chartLine.setOption(options);
    },
    handleGraphData(list) {
      let supplierlist = [];
      for (let key in list) {
        supplierlist.push(key);
      }
      this.supplierlist = supplierlist;
      let offerPriceList = [];
      for (let i = 0; i < supplierlist.length; i++) {
        let data = [];
        let xData = [];
        for (let j = 0; j < list[supplierlist[i]].length; j++) {
          data.push({
            value: [
              dayjs(
                list[supplierlist[i]][j].serverTime.replace("T", " ")
              ).format("YYYY/MM/DD HH:mm:ss"),
              this.dividedBeiShu(list[supplierlist[i]][j].offerPrice),
            ],
          });
          // data.push([
          //     dayjs(
          //       list[supplierlist[i]][j].serverTime.replace("T", " ")
          //     ).format("YYYY/MM/DD HH:mm:ss"),
          //     list[supplierlist[i]][j].offerPrice,
          //   ]);
          let time = dayjs(
            list[supplierlist[i]][j].serverTime.replace("T", " ")
          ).format("YYYY/MM/DD HH:mm:ss");
          xData.push(time);
        }
        this.xAxisData = xData;
        offerPriceList.push({
          name: supplierlist[i],
          type: "line",
          data: data,
          symbol: "circle",
          showSymbol: true,
          symbolSize: 20,
        });
        console.log(681,offerPriceList)
      }
      this.offerPriceList = [...offerPriceList];
    },
    // 荷氏点
    handleHeGraphData(list) {
      let supplierlist = [];
      for (let key in list) {
        supplierlist.push(key);
      }
      this.supplierlist = supplierlist;
      let offerPriceList = [];
      for (let i = 0; i < supplierlist.length; i++) {
        let data = [];
        let xData = [];
        for (let j = 0; j < list[supplierlist[i]].length; j++) {
          data.push({
            value: [
              dayjs(
                list[supplierlist[i]][j].serverTime.replace("T", " ")
              ).format("YYYY/MM/DD HH:mm:ss"),
              this.dividedBeiShu(list[supplierlist[i]][j].offerPrice),
            ],
          });
          // data.push([
          //     dayjs(
          //       list[supplierlist[i]][j].serverTime.replace("T", " ")
          //     ).format("YYYY/MM/DD HH:mm:ss"),
          //     list[supplierlist[i]][j].offerPrice,
          //   ]);

          // 荷式线
          let time = dayjs(
            list[supplierlist[i]][j].serverTime.replace("T", " ")
          ).format("YYYY/MM/DD HH:mm:ss");
          xData.push(time);
        }
        this.xAxisData = xData;
        offerPriceList.push({
          name: supplierlist[i],
          type: "scatter",
          data: data,
          symbol: "circle",
          showSymbol: true,
          symbolSize: 20,
        });
        console.log(726,offerPriceList)
      }
      offerPriceList.forEach((item) => {
        this.offerPriceList.push(item);
      });
    },
    // 荷氏线
    handleHeLine(list) {
      let supplierlist = [];
      for (let key in list) {
        supplierlist.push(key);
      }
      // this.supplierlist = supplierlist;
      let offerPriceList = [];
      let data = [];
      for (let i = 0; i < list.length; i++) {
        let xData = [
          dayjs(list[i].createDate.replace("T", " ")).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          this.dividedBeiShu(list[i].currentOffer),
        ];
        let yData = [
          dayjs(list[i].expiryDate.replace("T", " ")).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          this.dividedBeiShu(list[i].currentOffer),
        ];
        if (i == 0) {
          data.push(xData, yData);
        } else {
          data.push(yData);
        }
        offerPriceList.push({
          type: "line",
          data: data,
          step: "start",
        });
      }
      this.offerPriceList.push(offerPriceList[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.inquiry {
  &__header {
    &-title {
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      font-weight: bold;
      .el-button--default {
        min-width: 130px;
        margin-bottom: 10px;
      }
    }
  }
  &__navtab {
    margin-bottom: 15px;
    &-item {
      .el-button {
        margin-left: 2px;
        background-color: #fcfdfd;
        color: #ccc;
      }
      .el-button.active {
        color: #1763f7;
        box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
        border-color: transparent;
      }
    }
  }
}
.card {
  margin-bottom: 30px;
}

::v-deep .el-table {
  .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}

::v-deep .el-form-item {
  .el-input.is-disabled {
    .el-input__inner {
      text-align: center;
    }
  }
  .el-select .el-input.is-disabled {
    .el-input__suffix {
      display: none;
    }
  }
}

::v-deep .cardHeader {
  position: relative;

  .collapse {
    pointer-events: none;
  }
}
.icon-success {
  color: green;
  font-size: 1.8rem;
  position: absolute;
  left: 120px;
  top: 35px;
  z-index: 10;
}

.tool-tip {
  width: 35rem;
  background: #fff;
  padding: 1.875rem 2.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
  margin-bottom: 1.875rem;

  .tool-tip-title {
    padding-bottom: 1.875rem;
    font-size: 1.125rem;
    color: #131523;
    font-weight: bold;
  }
}
.form {
  .el-form-item {
    width: 30rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .el-form-label {
      width: 10rem;
      font-size: 0.875rem;
      color: #4d4f5c;
    }
    .el-form-content {
      background-color: #f4f5f6;
      text-align: center;
      color: #000;
      width: 100%;
      height: 2.1875rem;
      box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
    }
  }
}

.graph {
  position: relative;

  &-amplitude {
    width: 15%;
    min-width: 7rem;
    height: 8rem;
    position: absolute;
    top: 0;
    background-color: #f4f5f6;
    /* padding: 1.5rem 4rem .7rem 4rem; */
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__top {
      font-weight: bold;
      font-size: 1.5rem;
      span {
        font-size: 3rem;
        color: #1763f7;
        padding-right: 0.2rem;
      }
    }
  }
}
</style>