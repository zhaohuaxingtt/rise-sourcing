<template>
  <div class="monthlyPlan">
    <div class="monthlyHeader">
      <span class="versionNum">版本号</span>
      <iSelect
        class="versionSelect"
        :placeholder="$t('partsprocure.PLEENTER')"
        v-model="version"
        @change="changeVersion"
      >
        <el-option
          :value="item"
          :label="item"
          v-for="(item, index) in versionList"
          :key="index"
        ></el-option>
      </iSelect>
      <icon class="refreshIcon" symbol name="iconmojukanbanshuaxin" />
      <span class="refresh">刷新</span>
      <span class="refreshTime">刷新日期：2021.01.31</span>
      <div v-if="pageEdit">
        <iButton @click="saveAsList">{{ $t("退出编辑") }}</iButton>
        <iButton @click="saveAsList">{{ $t("上传清单") }}</iButton>
        <iButton @click="saveAsList">{{ $t("保存") }}</iButton>
        <iButton @click="saveAsList">{{ $t("保存为新版本") }}</iButton>
      </div>
      <div v-else>
        <iButton @click="saveAsList">{{ $t("编辑") }}</iButton>
        <iButton @click="saveAsList">{{ $t("下载清单") }}</iButton>
      </div>
    </div>
    <iCard class="margin-top20 mainCard">
      <div class="cardTop">
        <div class="yearlyPlan">
          <span class="planTitle">2021月度计划</span>
          <span class="totalText">Total:</span>
          <span class="refresh">720.0</span>
          <span class="unitText margin-left20"
            >{{ $t("LK_DANWEI") }}: {{ $t("LK_BAIWANYUAN") }}</span
          >
        </div>
        <div class="legend">
          <div>CSE</div>
          <div>CSI</div>
          <div>CSM</div>
          <div>CSP</div>
          <div>CSX</div>
          <div>BU-B</div>
        </div>
        <div class="tab-box">
          <icon
            v-if="tabIndex === 0"
            class="icon"
            symbol
            name="icontabdingweiicon"
          />
          <div
            @click="tabClick(0)"
            class="margin-right20"
            :class="tabIndex === 0 ? 'tabOn' : 'tabItem'"
          >
            当年付款计划
          </div>
          <icon
            v-if="tabIndex === 1"
            class="icon"
            symbol
            name="icontabdingweiicon"
          />
          <div
            @click="tabClick(1)"
            :class="tabIndex === 1 ? 'tabOn' : 'tabItem'"
          >
            次年付款计划
          </div>
        </div>
      </div>

      <div id="echart"></div>
      <iTableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :filterTable="false"
        :titlePopover="false"
        :selection="false"
        :show-summary="true"
        @handleSelectionChange="handleSelectionChange"
        :height="tableHeight - 660 > 200 ? tableHeight - 660 : 200"
      >
        <template #jan="scope">
          <iInput
            v-model="scope.row.jan"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.jan }}</div>
        </template>
        <template #feb="scope">
          <iInput
            v-model="scope.row.feb"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.feb }}</div>
        </template>
        <template #mar="scope">
          <iInput
            v-model="scope.row.mar"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.mar }}</div>
        </template>
        <template #apr="scope">
          <iInput
            v-model="scope.row.apr"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.apr }}</div>
        </template>
        <template #may="scope">
          <iInput
            v-model="scope.row.may"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.may }}</div>
        </template>
        <template #june="scope">
          <iInput
            v-model="scope.row.june"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.june }}</div>
        </template>
        <template #july="scope">
          <iInput
            v-model="scope.row.july"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.july }}</div>
        </template>
        <template #aug="scope">
          <iInput
            v-model="scope.row.aug"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.aug }}</div>
        </template>
        <template #sep="scope">
          <iInput
            v-model="scope.row.sep"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.sep }}</div>
        </template>
        <template #oct="scope">
          <iInput
            v-model="scope.row.oct"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.oct }}</div>
        </template>
        <template #nov="scope">
          <iInput
            v-model="scope.row.nov"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.nov }}</div>
        </template>
        <template #dec="scope">
          <iInput
            v-model="scope.row.dec"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.dec }}</div>
        </template>
      </iTableList>
    </iCard>
  </div>
</template>

<script>
import { iSelect, iButton, iCard, iInput, icon } from "rise";
import echarts from "@/utils/echarts";
import { tableTitle, dataList } from "./components/data";
import { iTableList } from "@/components";
import { cloneDeep } from 'lodash';
import { tableHeight } from "@/utils/tableHeight";

export default {
  mixins: [ tableHeight ],
  components: {
    iSelect,
    iButton,
    iCard,
    iInput,
    icon,
    iTableList,
  },
  data() {
    return {
      version: "20210101-V1",
      versionList: ["20210101-V1", "20210101-V2"],
      tabIndex: 0, //柱状图tab
      isCurrentYear: true,
      pageEdit: false,
      tableListData: dataList,
      tableTitle: tableTitle,
    };
  },
  mounted() {
    this.showEcharts();
  },
  methods: {
    changeVersion() {},
    saveAsList() {
      this.pageEdit = !this.pageEdit;
    },
    tabClick(index) {
      if (this.tabIndex === index) {
        return;
      }
      this.tabIndex = index;
    },
    showEcharts() {
      this.$nextTick(() => {
        const chart = echarts().init(document.getElementById("echart"));
        let series = [];
        const colorList = ["#0040be", "#6073ff", "#0053ef", "#3c7eff", "#54a6ed", "#8bd2ff"];
        // const colorList = ["#8bd2ff", "#54a6ed", "#3c7eff", "#0053ef", "#6073ff", "#0040be"];
        this.tableListData.forEach((element, index) => {
          let temp = {};
          let data = [];
          temp.name = element.department;
          temp.type = "bar";
          temp.barWidth = 50;
          temp.stack = "total";
          temp.color = colorList[index];
          // temp.label = {
          //   show: true,
          // }
          data.push(element.jan)
          data.push(element.feb)
          data.push(element.mar)
          data.push(element.apr)
          data.push(element.may)
          data.push(element.june)
          data.push(element.july)
          data.push(element.aug)
          data.push(element.sep)
          data.push(element.oct)
          data.push(element.nov)
          data.push(element.dec)
          temp.emphasis = {
            focus: 'series'
          }
          temp.data = data;
          series.unshift(temp);
        });
        let option = {
          tooltip: {
            formatter: function (params) {
              //这里就是控制显示的样式
              return `${params.seriesName}<br/><span style="color: #1763F7; font-weight: bold">${params.data}</span>`
            },
            backgroundColor: "#ffffff",
            extraCssText:
              "color: #1B1D21; box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.12);",
          },
          grid: {
            left: "0%",
            right: "0",
            bottom: "0%",
            top: "12%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#CDD4E2",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#485465",
                fontSize: 10,
              },
            },
          },
          yAxis: {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
          series: series
        };
        chart.setOption(option);
      });
    },
    getDepartData(array, key) {
      let temp = cloneDeep(array);
      return temp.map(item => {
        return item[key]
      });
    },
    handleInputChange(row) {
      row.amount = 0;
      row.amount = Number(row.jan) + Number(row.feb) + Number(row.mar) + Number(row.apr) + Number(row.may) + Number(row.june) + 
          Number(row.july) + Number(row.aug) + Number(row.sep) + Number(row.oct) + Number(row.nov) + Number(row.dec);
      this.showEcharts();
    }
  },
};
</script>

<style lang="scss" scoped>
.monthlyPlan {
  height: 92%;
  display: flex;
  flex-direction: column;
}

.mainCard {
  flex: 1;
}

.monthlyHeader {
  display: flex;
  align-items: center;
  margin-top: 20px;

  .versionSelect {
    width: 120px;
    margin: 0 20px;
  }

  .versionNum {
    font-size: 16px;
  }

  .refreshIcon {
    margin-left: 30px;
    margin-right: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  .refreshTime {
    flex: 1;
    font-size: 14px;
    margin-left: 20px;
  }
}

.refresh {
  font-size: 16px;
  color: $color-blue;
  font-weight: bold;
  cursor: pointer;
}

#echart {
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
}

.cardTop {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.legend {
  font-size: 12px;
  font-weight: bold;

  div {
    display: inline-block;
    margin-right: 20px;

    &::before {
      content: "";
      display: inline-block;
      margin-right: 10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #0040be;
    }

    &:nth-of-type(2) {
      &::before {
        background-color: #6073ff;
      }
    }

    &:nth-of-type(3) {
      &::before {
        background-color: #0053ef;
      }
    }

    &:nth-of-type(4) {
      &::before {
        background-color: #3c7eff;
      }
    }

    &:nth-of-type(5) {
      &::before {
        background-color: #54a6ed;
      }
    }

    &:nth-of-type(6) {
      &::before {
        background-color: #8bd2ff;
      }
    }
  }
}

.yearlyPlan {
  flex: 1;
}

.tab-box {
  display: flex;
  align-items: center;
}

.tabOn {
  cursor: pointer;
  color: $color-blue;
  font-weight: bold;
  font-size: 18px;
}

.tabItem {
  cursor: pointer;
  color: $color-black;
  opacity: 0.42;
  font-size: 14px;
}

.icon {
  height: 24px;
  width: 16px;
  margin-right: 5px;
}

.planTitle {
  font-size: 16px;
  font-weight: bold;
}

.totalText {
  font-size: 14px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 5px;
}

.unitText {
  font-size: 14px;
  color: #aeb4bb;
}
</style>