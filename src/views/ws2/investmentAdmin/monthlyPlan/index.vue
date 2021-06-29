<template>
  <div class="monthlyPlan">
    <div class="monthlyHeader">
      <span class="versionNum">{{ $t('LK_BANBENHAO') }}</span>
      <iSelect
        class="versionSelect"
        :placeholder="$t('partsprocure.PLEENTER')"
        v-model="versionData"
        @change="changeVersion"
        value-key="id"
      >
        <el-option
          :value="item"
          :label="item.version"
          v-for="(item, index) in versionList"
          :key="index"
        ></el-option>
      </iSelect>
      <icon class="refreshIcon" @click="handleRefresh" symbol name="iconmojukanbanshuaxin" />
      <span class="refresh cursor" @click="handleRefresh">{{ $t('LK_SHUAXIN') }}</span>
      <span class="refreshTime">{{ $t('LK_SHUAXINRIQI') }}：{{ translateData(versionData.updateDate) }}</span>
      <div v-if="pageEdit">
        <iButton @click="exitEdit">{{ $t("LK_TUICHUBIANJI") }}</iButton>
        <!-- <iButton @click="uploadList">{{ $t("上传清单") }}</iButton> -->
        <upload-button
          @uploadedCallback="uploadList"
          :upload-button-loading="uploadLoading"
          :buttonText="$t('LK_SHANGCHUANQINGDAN')"
          class="margin-left8"
        />
        <iButton @click="saveAsList">{{ $t("LK_BAOCUN") }}</iButton>
        <iButton @click="saveAsNew">{{ $t("LK_BAOCUNWEIXINBANBEN") }}</iButton>
      </div>
      <div v-else>
        <iButton @click="edit">{{ $t("LK_BIANJI") }}</iButton>
        <iButton @click="downloadList">{{ $t("LK_XIAZAIQINGDAN") }}</iButton>
      </div>
    </div>
    <iCard class="margin-top20 mainCard" v-loading="tableLoading">
      <div class="cardTop">
        <div class="yearlyPlan">
          <span class="planTitle">{{ getYear(versionData.updateDate) }}{{ $t('LK_YUEDUJIHUA') }}</span>
          <span class="totalText">Total:</span>
          <span class="refresh">{{ totalAmount }}</span>
          <span class="unitText margin-left20"
            >{{ $t("LK_HUOBI") }}: {{ $t("LK_RENMINBI") }}</span
          >
          <span class="marginUnit unitText">|</span>
          <span class="unitText"
            >{{ $t("LK_DANWEI") }}: {{ $t("LK_BAIWANYUAN") }}</span
          >
          <span class="marginUnit unitText">|</span>
          <span class="unitText">{{ $t("LK_BUHANSUI") }}</span>
        </div>
        <div class="legend" v-if="tableListData">
          <div v-for="(item, index) in tableListData" :key="index">{{ item.commodity }}</div>
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
            {{ $t('LK_DANGNIANFUKUANJIHUA') }}
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
            {{ $t('LK_CINIANFUKUANJIHUA') }}
          </div>
        </div>
      </div>
      <div id="echart"></div>
      <!-- :height="tableHeight - 660 > 200 ? tableHeight - 660 : 200" -->
      <iTableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :filterTable="false"
        :titlePopover="false"
        :selection="false"
        :show-summary="true"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        @cellMouseLeave="cellMouseLeave"
        @cellMouseEnter="cellMouseEnter"
        :class="
          selectIndex == 1
            ? 'tableSelectOne'
            : selectIndex == 2
            ? 'tableSelectTwo'
            : selectIndex == 3
            ? 'tableSelectThree'
            : selectIndex == 4
            ? 'tableSelectFour'
            : selectIndex == 5
            ? 'tableSelectFive'
            : selectIndex == 6
            ? 'tableSelectSix'
            : ''
        "
      >
        <template #planAmountM1="scope">
          <iInput
            v-model="scope.row.planAmountM1"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM1 }}</div>
        </template>
        <template #planAmountM2="scope">
          <iInput
            v-model="scope.row.planAmountM2"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM2 }}</div>
        </template>
        <template #planAmountM3="scope">
          <iInput
            v-model="scope.row.planAmountM3"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM3 }}</div>
        </template>
        <template #planAmountM4="scope">
          <iInput
            v-model="scope.row.planAmountM4"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM4 }}</div>
        </template>
        <template #planAmountM5="scope">
          <iInput
            v-model="scope.row.planAmountM5"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM5 }}</div>
        </template>
        <template #planAmountM6="scope">
          <iInput
            v-model="scope.row.planAmountM6"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM6 }}</div>
        </template>
        <template #planAmountM7="scope">
          <iInput
            v-model="scope.row.planAmountM7"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM7 }}</div>
        </template>
        <template #planAmountM8="scope">
          <iInput
            v-model="scope.row.planAmountM8"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM8 }}</div>
        </template>
        <template #planAmountM9="scope">
          <iInput
            v-model="scope.row.planAmountM9"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM9 }}</div>
        </template>
        <template #planAmountM10="scope">
          <iInput
            v-model="scope.row.planAmountM10"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM10 }}</div>
        </template>
        <template #planAmountM11="scope">
          <iInput
            v-model="scope.row.planAmountM11"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM11 }}</div>
        </template>
        <template #planAmountM12="scope">
          <iInput
            v-model="scope.row.planAmountM12"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row)"
          ></iInput>
          <div v-if="!pageEdit">{{ scope.row.planAmountM12 }}</div>
        </template>
      </iTableList>
    </iCard>
    <new-version-dialog
      v-model="saveNewVersion"
      @handleConfirm="handleConfirm"
    />
  </div>
</template>

<script>
import { iSelect, iButton, iCard, iInput, icon } from "rise";
import echarts from "@/utils/echarts";
import { tableTitle, dataList } from "./components/data";
import { iTableList } from "@/components";
import { cloneDeep } from "lodash";
import { tableHeight } from "@/utils/tableHeight";
import NewVersionDialog from "./components/newVersionDialog.vue";
import uploadButton from "./components/uploadButton";
import { 
  queryPlanVersionList, 
  refreshVersion, 
  saveNewVersion, 
  exportPlanCommutityList, 
  queryPlanMonthList, 
  saveMonthData,
  importMonthData
} from "@/api/ws2/investmentAdmin";
import { iMessage } from '../../../../components';

export default {
  mixins: [tableHeight],
  components: {
    iSelect,
    iButton,
    iCard,
    iInput,
    icon,
    iTableList,
    NewVersionDialog,
    uploadButton,
  },
  data() {
    return {
      versionData: {},
      versionList: [],
      tabIndex: 0, //柱状图tab
      pageEdit: false,
      tableListData: [],
      tableTitle: tableTitle,
      saveNewVersion: false, //保存为新版本对话框
      uploadLoading: false, //上传加载
      selectIndex: -1, //table选择index
      fromTable: false, //是否在表格
      refreshLoading: false, //刷新加载
      tableLoading: false,
      clearEchart: false,
      noChangeTableListData: [], //未编辑数据
    };
  },
  created() {
    this.getVersionList();
  },
  mounted() {
    // this.showEcharts();
  },
  methods: {
    //选择版本
    changeVersion() {
      this.clearEchart = true;
      this.getMonthList();
    },
    //编辑
    edit() {
      this.pageEdit = true;
    },
    //退出编辑
    exitEdit() {
      this.tableListData = cloneDeep(this.noChangeTableListData);
      this.showEcharts();
      this.pageEdit = false;
    },
    //保存为新版本
    saveAsNew() {
      this.saveNewVersion = true;
    },
    //保存
    saveAsList() {
      let param = {
        versionId: this.versionData.id,
        // versionId: "1407690871637319681",
        planType: this.tabIndex === 0 ? "current_year" : "next_year",
        dataList: this.tableListData
      };
      saveMonthData(param).then(res => {
        if (Number(res.code) === 0) {
          this.pageEdit = false;
          return iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        } else {
          return iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      });
    },
    //下载清单
    downloadList() {
      let param = {
        versionId: this.versionData.id,
        // versionId: "1407690871637319681",
        planType: this.tabIndex === 0 ? "current_year" : "next_year",
      };
      exportPlanCommutityList(param).then(res => {
        
      });
    },
    tabClick(index) {
      if (this.tabIndex === index) {
        return;
      }
      this.tabIndex = index;
      this.getMonthList();
    },
    showEcharts() {
      this.$nextTick(() => {
        const chart = echarts().init(document.getElementById("echart"));
        let series = [];
        let colorList = [];
        if (this.fromTable) {
          colorList = ["#D8D9FD", "#DFE3FF", "#D8E5FF", "#DDEDFC", "#E8F6FF"];
          colorList.splice(this.selectIndex - 1, 0, "#0053EF");
        } else {
          colorList = [
            "#0040be",
            "#6073ff",
            "#0053ef",
            "#3c7eff",
            "#54a6ed",
            "#8bd2ff",
          ];
        }
        this.tableListData.forEach((element, index) => {
          element.index = index;
          let temp = {};
          let data = [];
          temp.name = element.commodity;
          temp.type = "bar";
          temp.barWidth = 50;
          temp.stack = "total";
          temp.color = colorList[index];
          if (this.fromTable && index == this.selectIndex - 1) {
            temp.label = {
              show: true,
            };
          } else {
            temp.label = {
              show: false,
            };
          }

          data.push(element.planAmountM1);
          data.push(element.planAmountM2);
          data.push(element.planAmountM3);
          data.push(element.planAmountM4);
          data.push(element.planAmountM5);
          data.push(element.planAmountM6);
          data.push(element.planAmountM7);
          data.push(element.planAmountM8);
          data.push(element.planAmountM9);
          data.push(element.planAmountM10);
          data.push(element.planAmountM11);
          data.push(element.planAmountM12);
          temp.emphasis = {
            focus: "series",
          };
          temp.data = data;
          if (index == 0) {
            temp.itemStyle = {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
              },
            };
          }
          series.unshift(temp);
        });
        let option = {
          tooltip: {
            formatter: function (params) {
              //这里就是控制显示的样式
              return `${params.seriesName}<br/><span style="color: #1763F7; font-weight: bold">${params.data}</span>`;
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
            data: [
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
          series: series,
        };
        if (this.clearEchart) {
          chart.clear();
          this.clearEchart = false;
        }
        chart.setOption(option);
        let _this = this;
        chart.on("mouseover", function (params) {
          let optionTemp = cloneDeep(option);
          let colorTempList = [
            "#D8D9FD",
            "#DFE3FF",
            "#D8E5FF",
            "#DDEDFC",
            "#E8F6FF",
          ];
          _this.selectIndex = this.data - params.componentIndex;
          colorTempList.splice(params.componentIndex, 0, "#0053EF");
          optionTemp.series.map((item, index) => {
            item.color = colorTempList[index % colorTempList.length];
            if (params.componentIndex == index) {
              item.label = {
                show: true,
              };
            }
            return item;
          });
          chart.setOption(optionTemp);
        });
        chart.on("mouseout", function () {
          _this.selectIndex = -1;
          chart.setOption(option);
        });
      });
    },
    handleInputChange(row) {
      row.amount = 0;
      row.amount =
        Number(row.planAmountM1) +
        Number(row.planAmountM2) +
        Number(row.planAmountM3) +
        Number(row.planAmountM4) +
        Number(row.planAmountM5) +
        Number(row.planAmountM6) +
        Number(row.planAmountM7) +
        Number(row.planAmountM8) +
        Number(row.planAmountM9) +
        Number(row.planAmountM10) +
        Number(row.planAmountM11) +
        Number(row.planAmountM12);
      this.showEcharts();
    },
    //保存新版本
    handleConfirm(val) {
      let param = {
        versionId: this.versionData.id,
        // versionId: "1407690871637319681",
        planType: this.tabIndex === 0 ? "current_year" : "next_year",
        dataList: this.tableListData,
        dateStr: val
      };
      saveNewVersion(param).then(res => {
        this.saveNewVersion = false;
        if (Number(res.code) === 0) {
          return iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        } else {
          return iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      }).catch((e) => {
        this.saveNewVersion = false;
      });
    },
    uploadAttachments(data) {},
    cellMouseLeave() {
      this.selectIndex = -1;
      this.fromTable = false;
      this.showEcharts();
    },
    cellMouseEnter(val) {
      this.selectIndex = val.index + 1;
      this.fromTable = true;
      this.showEcharts();
    },
    //获取版本列表
    getVersionList() {
      queryPlanVersionList().then(res => {
        if (Number(res.code) === 0 && res.data.length > 0) {
          const currentYear = new Date().getFullYear();
          let currentYearVersion = [];
          res.data.forEach((item, index) => {
            let year = item.version.substring(0, 4);
            if (year == currentYear) {
              let temp = {};
              temp.index = index;
              temp.version = item.version.split("V")[1];
              currentYearVersion.push(temp);
            }
          });
          currentYearVersion.sort(function(a, b) { return b.version - a.version});
          this.versionData = res.data[currentYearVersion[0].index];
          this.versionList = res.data;
          this.getMonthList();
        }
      });
    },
    //刷新
    handleRefresh() {
      this.refreshLoading = true;
      refreshVersion(this.versionData.id).then(res => {
        this.refreshLoading = false;
        if (Number(res.code) === 0) {
          iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      }).catch((e) => {
        this.refreshLoading = false;
      });
      this.getVersionList();
    },
    //查询列表数据
    getMonthList() {
      let param = {
        planType: this.tabIndex === 0 ? "current_year" : "next_year",
        versionId: this.versionData.id,
        // versionId: "1407690871637319681"
      };
      this.tableLoading = true;
      queryPlanMonthList(param).then(res => {
        if (Number(res.code) === 0) {
          this.tableListData = res.data;
          this.tableListData.map(item => {
            item.amount =
              Number(item.planAmountM1) +
              Number(item.planAmountM2) +
              Number(item.planAmountM3) +
              Number(item.planAmountM4) +
              Number(item.planAmountM5) +
              Number(item.planAmountM6) +
              Number(item.planAmountM7) +
              Number(item.planAmountM8) +
              Number(item.planAmountM9) +
              Number(item.planAmountM10) +
              Number(item.planAmountM11) +
              Number(item.planAmountM12);
            return item;
          });
          this.noChangeTableListData = cloneDeep(this.tableListData);
          this.showEcharts();
          this.tableLoading = false;
        }
      }).catch((e) => {
        this.tableLoading = false;
      });
    },
    translateData(date) {
      return window.moment(date).format("YYYY-MM-DD");
    },
    getYear(date) {
      let year = Number(window.moment(date).format("YYYY"));
      return this.tabIndex === 0 ? year : year + 1;
    },
    //上传清单 importMonthData
    async uploadList(formData) {
      this.uploadLoading = true;
      formData.append("planType", this.tabIndex === 0 ? "current_year" : "next_year");
      formData.append("versionId ", this.versionData.id);
      const res = await importMonthData({data: formData, versionId: this.versionData.id});
      if (Number(res.code) === 0) {
        this.uploadLoading = false;
        this.getMonthList();
        return iMessage.success(this.$i18n.locale === 'zh' ? msg.desZh : msg.desEn)
      } else {
        this.uploadLoading = false;
        return iMessage.error(this.$i18n.locale === 'zh' ? msg.desZh : msg.desEn)
      }
    }
  },
  computed: {
    totalAmount() {
      let res = 0;
      this.tableListData.forEach(item => {
        res += item.amount;
      });
      return res;
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
    width: 140px;
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
  color: #485465;
}

.marginUnit {
  margin: 0 5px;
}

.tableSelectOne {
  // @include table-row-border(1);
  ::v-deep .el-table__body-wrapper {
    tbody {
      tr:nth-child(1) {
        td {
          border-top: 1px solid #0053ef;
          border-bottom: 1px solid #0053ef;
        }
        td:first-child {
          border-left: 1px solid #0053ef;
        }
        td:last-child {
          border-right: 1px solid #0053ef;
        }
      }
    }
  }
}

.tableSelectTwo {
  ::v-deep tbody {
    tr:nth-child(2) {
      td {
        border-top: 1px solid #0053ef;
        border-bottom: 1px solid #0053ef;
      }
      td:first-child {
        border-left: 1px solid #0053ef;
      }
      td:last-child {
        border-right: 1px solid #0053ef;
      }
    }
  }
}

.tableSelectThree {
  ::v-deep tbody {
    tr:nth-child(3) {
      td {
        border-top: 1px solid #0053ef;
        border-bottom: 1px solid #0053ef;
      }
      td:first-child {
        border-left: 1px solid #0053ef;
      }
      td:last-child {
        border-right: 1px solid #0053ef;
      }
    }
  }
}

.tableSelectFour {
  ::v-deep tbody {
    tr:nth-child(4) {
      td {
        border-top: 1px solid #0053ef;
        border-bottom: 1px solid #0053ef;
      }
      td:first-child {
        border-left: 1px solid #0053ef;
      }
      td:last-child {
        border-right: 1px solid #0053ef;
      }
    }
  }
}

.tableSelectFive {
  ::v-deep tbody {
    tr:nth-child(5) {
      td {
        border-top: 1px solid #0053ef;
        border-bottom: 1px solid #0053ef;
      }
      td:first-child {
        border-left: 1px solid #0053ef;
      }
      td:last-child {
        border-right: 1px solid #0053ef;
      }
    }
  }
}

.tableSelectSix {
  ::v-deep tbody {
    tr:nth-child(6) {
      td {
        border-top: 1px solid #0053ef;
      }
      td:first-child {
        border-left: 1px solid #0053ef;
      }
      td:last-child {
        border-right: 1px solid #0053ef;
      }
    }
  }
}
</style>