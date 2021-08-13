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
      <div @click="handleRefresh" v-if="versionData.editFlag">
        <icon class="refreshIcon" symbol name="iconmojukanbanshuaxin" />
        <span class="refresh cursor">{{ $t('LK_SHUAXIN') }}</span>
      </div>
      <span class="refreshTime">{{ $t('LK_SHUAXINRIQI') }}：{{ versionData.updateDate }}</span>
      <div v-if="pageEdit">
        <iButton @click="exitEdit">{{ $t("LK_TUICHUBIANJI") }}</iButton>
        <!-- <iButton @click="uploadList">{{ $t("上传清单") }}</iButton> -->
        <upload-button
          @uploadedCallback="uploadList"
          :upload-button-loading="uploadLoading"
          :buttonText="$t('LK_SHANGCHUANQINGDAN')"
          class="margin-left10 margin-right10"
        />
        <iButton @click="saveAsList" v-if="versionData.editFlag">{{ $t("LK_BAOCUN") }}</iButton>
        <iButton @click="saveAsNew">{{ $t("LK_BAOCUNWEIXINBANBEN") }}</iButton>
      </div>
      <div v-else>
        <iButton @click="edit" v-if="versionData.editFlag">{{ $t("LK_BIANJI") }}</iButton>
        <iButton @click="downloadList">{{ $t("LK_XIAZAIQINGDAN") }}</iButton>
      </div>
    </div>
    <iCard class="margin-top20 mainCard" v-loading="tableLoading">
      <div class="cardTop">
        <div class="yearlyPlan">
          <span class="planTitle">{{ getYear(versionData.year) }}{{ $t('LK_YUEDUJIHUA') }}</span>
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
        :getSummaries="getSummaries"
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
        <template #amount="scope">
          <div v-if="pageEdit">{{ scope.row.amount }}</div>
          <div v-else>{{ getTousandNum(scope.row.amount) }}</div>
        </template>
        <template #planAmountM1="scope">
          <iInput
            v-model="scope.row.planAmountM1"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM1')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM1) }}</div>
        </template>
        <template #planAmountM2="scope">
          <iInput
            v-model="scope.row.planAmountM2"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM2')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM2) }}</div>
        </template>
        <template #planAmountM3="scope">
          <iInput
            v-model="scope.row.planAmountM3"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM3')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM3) }}</div>
        </template>
        <template #planAmountM4="scope">
          <iInput
            v-model="scope.row.planAmountM4"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM4')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM4) }}</div>
        </template>
        <template #planAmountM5="scope">
          <iInput
            v-model="scope.row.planAmountM5"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM5')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM5) }}</div>
        </template>
        <template #planAmountM6="scope">
          <iInput
            v-model="scope.row.planAmountM6"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM6')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM6) }}</div>
        </template>
        <template #planAmountM7="scope">
          <iInput
            v-model="scope.row.planAmountM7"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM7')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM7) }}</div>
        </template>
        <template #planAmountM8="scope">
          <iInput
            v-model="scope.row.planAmountM8"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM8')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM8) }}</div>
        </template>
        <template #planAmountM9="scope">
          <iInput
            v-model="scope.row.planAmountM9"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM9')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM9) }}</div>
        </template>
        <template #planAmountM10="scope">
          <iInput
            v-model="scope.row.planAmountM10"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM10')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM10) }}</div>
        </template>
        <template #planAmountM11="scope">
          <iInput
            v-model="scope.row.planAmountM11"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM11')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM11) }}</div>
        </template>
        <template #planAmountM12="scope">
          <iInput
            v-model="scope.row.planAmountM12"
            :placeholder="$t('LK_QINGSHURU')"
            v-if="pageEdit"
            @input="handleInputChange(scope.row, 'planAmountM12')"
          ></iInput>
          <div v-else>{{ getTousandNum(scope.row.planAmountM12) }}</div>
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
import { iTableList } from '@/components';
import { cloneDeep } from "lodash";
import { tableHeight } from "@/utils/tableHeight";
import NewVersionDialog from "./components/newVersionDialog.vue";
import uploadButton from "./components/uploadButton";
import { 
  queryPlanVersionList, 
  saveNewVersion, 
  exportPlanCommutityList, 
  queryPlanMonthList, 
  saveMonthData,
  importMonthData,
  refreshVersion
} from "@/api/ws2/investmentAdmin";
import { iMessage } from '../../../../components';
import store from '@/store';
import { getTousandNum, delcommafy } from "@/utils/tool";

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
      newVersionDate: '', //保存新版本年份日期
      getTousandNum: getTousandNum,
      delcommafy: delcommafy
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
      this.pageEdit = false;
      this.$store.commit('SET_versionId', this.versionData.id);
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
          // this.pageEdit = false;
          this.tableListData.map(item => {
            for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
              if (item[`planAmountM${monthIndex + 1}`] == null) {
                item[`planAmountM${monthIndex + 1}`] = 0;
              }
              item[`planAmountM${monthIndex + 1}`] = this.getFormatNumber(item[`planAmountM${monthIndex + 1}`]);
            }
          });
          this.noChangeTableListData = cloneDeep(this.tableListData);
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
        let monthTotal = (new Array(12)).fill(0);
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
          for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
            monthTotal[monthIndex] += parseFloat(element[`planAmountM${monthIndex + 1}`]);
            if (index == this.tableListData.length - 1) {
              monthTotal[monthIndex] = monthTotal[monthIndex].toFixed(2);
            }
            data.push(element[`planAmountM${monthIndex + 1}`]);
          }
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
        series.unshift({
          name: "total",
          type: "bar",
          barWidth: 50,
          barGap: '-100%',
          itemStyle: {
            normal: {
              color: 'rgba(128, 128, 128, 0)'   // 设置背景颜色为透明
            }
          },
          label: {                 
            normal: {
              show: true, //显示数值
              position: 'top',       //  位置设为top
              formatter: '{c}',
              textStyle: { color: '#7E84A3' } //设置数值颜色
            }
          },
          data: monthTotal
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
            "rgba(128, 128, 128, 0)",
            "#D8D9FD",
            "#DFE3FF",
            "#D8E5FF",
            "#DDEDFC",
            "#E8F6FF",
          ];
          _this.selectIndex = _this.tableListData.length - params.componentIndex + 1;
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
    handleInputChange(row, key) {
      let temp = row[key].replace(/[^\d.]/g,'');
      let tempArr = temp.split('.')
      let count = tempArr.length;
      if (count > 2) {
        row[key] = row[key].substring(0, row[key].length - 1);
      } else {
        if (count == 2 && tempArr[1].length > 2) {
          row[key] = temp.substring(0, row[key].length - 1);
        } else {
          row[key] = temp;
        }
      }
      row.amount = 0;
      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        let temp = cloneDeep(row[`planAmountM${monthIndex + 1}`]);
        row.amount += parseFloat(temp);
      }
      row.amount = this.getFormatNumber(row.amount);
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
      this.newVersionDate = val;
      saveNewVersion(param).then(res => {
        if (Number(res.code) === 0) {
          this.getVersionList();
          return iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        } else {
          this.saveNewVersion = false;
          return iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      }).catch((e) => {
        this.saveNewVersion = false;
      });
    },
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
          this.versionList = res.data;
          //保存为新版本，取保存的新版本
          if (this.saveNewVersion) {
            this.versionList.map(item => {
              if (this.newVersionDate == item.version.split("-")[0]) {
                this.versionData = item;
              }
            });
            this.saveNewVersion = false;
          } else {
            this.versionList.map((item, index) => {
              if (this.versionList.map(temp => temp.year).indexOf(item.year) == index) {
                if (currentYear == item.year) {
                  this.versionData = item;
                }
              }
            });
            this.versionList.map(item => {
              if (store.state.investmentAdmin.versionId == item.id) {
                this.versionData = item; 
              }
            });
          }
          this.getMonthList();
        }
      });
    },
    //刷新
    handleRefresh() {
      this.refreshLoading = true;
      refreshVersion(this.versionData.id).then(res => {
        if (Number(res.code) === 0) {
          this.getVersionList();
        } else {
          return iMessage.error(this.$i18n.locale === 'zh' ? msg.desZh : msg.desEn)
        }
      });
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
            item.amount = 0;
            for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
              // monthTotal[monthIndex] += element[`planAmountM${monthIndex + 1}`];
              // data.push(element[`planAmountM${monthIndex + 1}`]);
              if (item[`planAmountM${monthIndex + 1}`] == null) {
                item[`planAmountM${monthIndex + 1}`] = 0;
              }
              let temp = cloneDeep(item[`planAmountM${monthIndex + 1}`]);
              item[`planAmountM${monthIndex + 1}`] = this.getFormatNumber(temp);
              item.amount += parseFloat(temp);
            }
            item.amount = this.getFormatNumber(item.amount);
            return item;
          });
          this.noChangeTableListData = cloneDeep(this.tableListData);
          this.showEcharts();
          this.tableLoading = false;
          if (this.refreshLoading) {
            this.refreshLoading = false;
            iMessage.success(this.$t('LK_CAOZUOCHENGGONG'));
          }
        }
      }).catch((e) => {
        this.tableLoading = false;
      });
    },
    translateData(date) {
      return window.moment(date).format("YYYY.MM.DD");
    },
    getYear(year) {
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
    },
    getFormatNumber(num) {
      return (Math.round(num * 100) / 100).toFixed(2);
    },
    getSummaries(param){
      const { columns, data } = param;
      const sums = [];
      const keyArr = [];

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Total';
          return;
        }
        if(!keyArr.includes(column.property)){  //  只有金额字段才需要显示总价
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = this.getTousandNum(sums[index].toFixed(2));
          } else {
            sums[index] = 'N/A';
          }
        }else{
          sums[index] = '';
        }
        
      });
      return sums;
    },
  },
  computed: {
    totalAmount() {
      let res = 0;
      this.tableListData.forEach(item => {
        res += parseFloat(this.delcommafy(item.amount));
      });
      return this.getTousandNum(res.toFixed(2));
    },
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
    width: 155px;
    margin: 0 20px;
  }

  .versionNum {
    font-size: 16px;
  }

  .refreshIcon {
    margin-left: 10px;
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