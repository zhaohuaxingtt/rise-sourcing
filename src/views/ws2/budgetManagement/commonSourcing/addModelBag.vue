<template>
  <div class="main" v-loading="mainLoading">
    <div class="header">
      <div v-loading="searchLoading">
        <span class="font20W">车型包:</span>
        <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="carTypePackageId"
            class="font20W"
            @change="getCommonSourcingView"
            filterable
        >
          <el-option
              :value="item.carTypePackageId"
              :label="item.carTypePackageNameZh"
              v-for="(item, index) in carTypePackageList"
              :key="index"
          ></el-option>
        </iSelect>
        <span>版本</span>
        <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="packageVersion"
            @change="getCommonSourcingView"
            filterable
        >
          <el-option
              :value="item.versionId"
              :label="item.versionName"
              v-for="(item, index) in packageVersionList"
              :key="index"
          ></el-option>
        </iSelect>
      </div>
      <iNavWS2></iNavWS2>
    </div>
    <div class="content">
      <div class="charts" v-loading="contentLoading">
        <div class="left">
          <div class="title">
            <span>{{ $t('模具投资清单') }}</span>
            <span>{{ $t("LK_DANWEI") }}: {{ $t("LK_BAIWANYUAN") }}</span>
          </div>
          <div class="chart1">
            <div id="chart1"></div>
          </div>
        </div>
        <div class="right">
          <span class="unit">{{ $t("LK_DANWEI") }}: {{ $t("LK_BAIWANYUAN") }}</span>
          <div v-for="(item, index) in carTypeBudgetDetailVOSCount" :key="index">
            <div class="title">{{ item.carTypeProName }}</div>
            <div class="chart" :id="'chart' + (index + 2)"></div>
          </div>
        </div>
      </div>
      <iCard class="table">
         <div class="search" v-loading="searchLoading">
          <div>
            <span>{{$t('科室')}}:</span>
            <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="departmentsCombo"
                filterable
                multiple
                collapse-tags
                class="multipleSelect"
                clearable
                @change="getCommonSourcingView"
            >
              <el-option
                  :value="item.deptId"
                  :label="item.commodity"
                  v-for="(item, index) in DepartmentsComboList"
                  :key="index"
              ></el-option>
            </iSelect>
            <span>{{ $t('LK_CAILIAOZU') }}:</span>
            <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="materialGroup"
                filterable
                multiple
                collapse-tags
                class="multipleSelect"
                 clearable
                @change="getCommonSourcingView"
            >
              <el-option
                  :value="item.id"
                  :label="item.name"
                  v-for="(item, index) in materialGroupList"
                  :key="index"
              ></el-option>
            </iSelect>
          </div>
          <div class="btn">
            <iButton @click="saveAs">{{$t('保存为新版本')}}</iButton>
            <Upload
                class="upload"
                ref="uploadRef"
                :action="actionUrl"
                :on-change="beforeUpload"
                :on-success="onSuccess"
                :before-upload="beforeAvatarUpload"
                :before-remove="beforeRemove"
                :limit="1"
                :show-file-list="false"
                :file-list="fileList">
              <iButton>{{ $t('上传清单') }}</iButton>
            </Upload>
            <iButton @click="hanldeDownload">{{$t('下载清单')}}</iButton>
            <iButton @click="sendToAdmin">{{$t('发送项目采购员')}}</iButton>
          </div>
        </div>
        <iTableList
            v-loading="contentLoading"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :typeIndex="true"
            @handleSelectionChange="handleSelectionChange"
            :activeItems="'partNum'"
            :row-class-name="handleTableRow"
        >
          <template #categoryId="scope">
            <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="scope.row.categoryId"
                class="tempSelect"
                @change="id => changeMaterial(id, scope.row)"
                filterable
            >
              <el-option
                  :value="item.id"
                  :label="item.name"
                  v-for="(item, index) in materialGroupList"
                  :key="index"
              ></el-option>
            </iSelect>
          </template>
          <template #targetBudgetTotal="scope">
            <div class="linkStyle"><span @click="clicktargetBudgetTotal(scope.row)">{{ getTousandNum(scope.row.targetBudgetTotal) }}</span></div>
          </template>
          <template #fixedPointAllotTotal="scope">
            <div class="linkStyle"><span @click="clickfixedPointAllotTotal(scope.row)">{{ getTousandNum(scope.row.fixedPointAllotTotal) }}</span></div>
          </template>
        </iTableList>
      </iCard>
    </div>
    <targetBudget
        v-model="targetBudgetShow"
        :id="targetBudgetId"
        :targetBudgetInfo="targetBudgetInfo"
    ></targetBudget>
    <fixedAssignment
        v-model="fixedAssignmentShow"
        :id="fixedAssignmentId"
        :fixedAssignmentInfo="fixedAssignmentInfo"
        @fixedAssignmentSave="getCommonSourcingView"
    ></fixedAssignment>
  </div>
</template>

<script>
import {
  iTableList
} from "@/components"
import {iButton, iMessage, iSelect, iCard} from 'rise'
import {Upload} from "element-ui"
 import {
  cateGoryCombo,
  getDepartmentsCombo,
  carTypePackageCombo,
  packageVersionCombo,
  commonSourcingView,
  commonSourcingExport,
  saveAsVersion,
  sendToAdmin,
  updateCateGory,
 } from '@/api/ws2/commonSourcing'
import {iNavWS2} from "@/components";
import echarts from "@/utils/echarts";
import targetBudget from "../components/targetBudget";
import fixedAssignment from "../components/fixedAssignment";

import {addModelBagTitle, form} from "pages/ws2/dataBase/components/data";
import {getTousandNum} from "@/utils/tool";

export default {
  name: "commonSourcing",
  components: {
    iButton,
    iNavWS2,
    iSelect,
    iTableList,
    Upload,
    iCard,
    targetBudget,
    fixedAssignment,
  },
  data() {
    return {
      packageNameZh: '',
      mainLoading: false,
      searchLoading: false,
      contentLoading: false,
      targetBudgetShow: false,
      fixedAssignmentShow: false,
      targetBudgetId: '',
      fixedAssignmentId: '',
      fixedAssignmentInfo: '',
      targetBudgetInfo: '',
      tableListData: [],
       carTypeBudgetDetailVOSCount: [],
      tableTitle: addModelBagTitle,
      selectTableData: [],
      carTypePackageId: '',
      carTypePackageList: [],
      packageVersion: '',
      packageVersionList: [],
      departmentsCombo: [],
      DepartmentsComboList: [],
      materialGroup: [],
      materialGroupList: [],
      getTousandNum: getTousandNum
    }
  },
  computed: {
    actionUrl() {
      return process.env.VUE_APP_CSBUDGET + '/upload/' + this.packageVersion
    }
  },
  mounted() {
    let carTypePackageId = this.$route.query.carTypePackageId
    this.getSelect(carTypePackageId)
   },
  methods: {
    async getSelect(carTypePackageId) {
      this.searchLoading = true
      await Promise.all([
          carTypePackageCombo(),
          packageVersionCombo({carTypePackageId: carTypePackageId}),
          getDepartmentsCombo(),
          cateGoryCombo()
      ]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn
        if (res[0].data) {
          this.carTypePackageList = res[0].data;
          this.carTypePackageId = carTypePackageId
        } else {
          iMessage.error(result0);
        }
        if (res[1].data) {
          this.packageVersionList = res[1].data;
          this.packageVersion = this.packageVersionList.length > 0 ? this.packageVersionList[0].versionId : ''
        } else {
          iMessage.error(result1);
        }
        if (res[2].data) {
          this.DepartmentsComboList = res[2].data;
        } else {
          iMessage.error(result2);
        }
        if (res[3].data) {
          this.materialGroupList = res[3].data;
        } else {
          iMessage.error(result3);
        }
         this.getCommonSourcingView(carTypePackageId)
        this.searchLoading = false
      }).catch(() => {
         this.searchLoading = false
      });

    },
    getCommonSourcingView(){
       this.contentLoading = true
      commonSourcingView({
        carTypePackageId: this.carTypePackageId,
        categoryId: this.materialGroup,
        commodity: this.departmentsCombo,
        versionId	: this.packageVersion,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.getPackageVersionCombo()
          this.tableListData = res.data.partsPackageDetailVOS ? res.data.partsPackageDetailVOS : []
          let carTypeBudgetDetailVOS = res.data.carTypeBudgetDetailVOS ? res.data.carTypeBudgetDetailVOS : []
          this.carTypeBudgetDetailVOSCount = carTypeBudgetDetailVOS
          let carTypeBudgetPackageTotal = res.data.carTypeBudgetPackageTotal ? res.data.carTypeBudgetPackageTotal : []
          let carTypeSharePackageTotal = res.data.carTypeSharePackageTotal ? res.data.carTypeSharePackageTotal : []
          let option1Data = ['车型包总目标预算', '车型包定点预分配'].concat(carTypeBudgetDetailVOS.map(item => item.carTypeProName))
          let option1DataReverse = option1Data.slice(0).reverse()
          let option1Series = [carTypeBudgetPackageTotal, carTypeSharePackageTotal].concat(carTypeBudgetDetailVOS.map(item => item.allocated))
          let option1SeriesReverse = option1Series.slice(0).reverse()
          let option1SeriesTemp = []
          for(let i = 0; i < option1Series.length; i++){
            if(i === 0 || i === 1){
              option1SeriesTemp[i] = 0
            } else {
              option1SeriesTemp[i] = option1Series[1]
              for(let j = 2; j <= i; j++){
                option1SeriesTemp[i] -= option1Series[j]
              }
            }
            if(option1SeriesTemp[i] < 0){
              option1SeriesTemp[i] = 0
            }
          }
          let option1SeriesTempReverse = option1SeriesTemp.slice(0).reverse()

          let markLine = []
          if(option1Series.length > 2){
            markLine = [
              [
                {
                  coord: [option1Series[1], '车型包定点预分配']
                },
                {
                  coord: [option1Series[1], 'Passat Lingyu Classic']
                },
              ]
            ]
          }
          for(let i = 0; i < option1SeriesTemp.length; i++){
            if(i > 1){
              markLine.push([
                {
                  coord: [option1SeriesTemp[i], option1Data[i]]
                },
                {
                  coord: [option1SeriesTemp[i], option1Data[i + 1]]
                },
              ])
            }
          }
          const chart1 = echarts().init(document.getElementById("chart1"));
          let option1 = {
            tooltip: {
              show: false
            },
            grid: {
              left: '0%',
               right: '10%',
              bottom: '0%',
              top: '0%',
              containLabel: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#CDD4E2'
              }
            },
            xAxis: {
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
            yAxis: {
              type: 'category',
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
              data: option1DataReverse
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
                data: option1SeriesTempReverse
              },
              {
                name: '投资',
                type: 'bar',
                barWidth: 14,
                stack: 'total',
                color: '#1763F7',
                label: {
                  show: true,
                  position: 'right'
                },
                itemStyle: {
                  normal: {
                    barBorderRadius: [0, 5, 5, 0],
                  }
                },
                markLine: {
                  symbol: 'none',
                  data: markLine
                },
                data: option1SeriesReverse
              }
            ]
          };
           chart1.setOption(option1);

          this.$nextTick(() => {
            carTypeBudgetDetailVOS.map((item, index) => {
              let key = index + 2
              let series = [item.budget, item.pendingAllocate, item.allocated, item.fixed]
              let seriesPop = [item.budgetCount, item.pendingAllocateCount, item.allocatedCount, item.fixed]
              // let series = [9000000, 8000000, 1000000, 500000]
              let seriesTemp = [0, series[0] - series[1], 0, 0]
              const chart = echarts().init(document.getElementById("chart" + key));
              let option = {
                tooltip: {
                  formatter: function (params) {//这里就是控制显示的样式
                    if(params.dataIndex === 3){
                      return
                    } else {
                      return `<div style="font-size: 12px; text-align: center">
                              <div style="color: #131523;">零件包</div>
                              <div style="color: #1660F1;">${seriesPop[params.dataIndex]}</div>
                            </div>`
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
                  data: ['目标预算', '待分配', '定点预分配', '已定点'],
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
                      fontSize: 8
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
                    data: seriesTemp
                  },
                  {
                    name: '',
                    type: 'bar',
                    stack: 'total',
                    color: '#73A1FA',
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
                    data: series,
                    itemStyle: {
                      normal: {
                        barBorderRadius: [5, 5, 0, 0],
                      }
                    },
                    markLine: {
                      symbol: 'none',
                      data: [
                        [{
                          coord: ['目标预算', series[0]]
                        },{
                          coord: ['待分配', series[0]]
                        }],
                        [{
                          coord: ['待分配', series[2]]
                        },{
                          coord: ['定点预分配', series[2]]
                        }],
                      ]
                    }
                  },
                ]
              }
              chart.setOption(option);
            })
          })
        } else {
          iMessage.error(result);
        }
        this.contentLoading = false
      }). catch(err => {
        this.contentLoading = false
      })
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    handleTableRow(row){
      row.index = row.rowIndex
    },
    hanldeDownload(){
      this.mainLoading = true;
      let params = {
        cartypePackageId: this.carTypePackageId,
        versionId: this.packageVersion
      }
      commonSourcingExport(params)
          .then((res) => {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            if (Number(res.code) === 0) {
              iMessage.success(result)
            } else {
              iMessage.error(result)
            }
            this.mainLoading = false;
          }).catch(() => (this.mainLoading = false));
    },
    changeMaterial(id, row){
      console.log(id)
      this.mainLoading = true;
      let params = {
        carTypePackageId: this.carTypePackageId,
        versionId: this.packageVersion,
        categoryId: id,
        partsPackageId: row.id,
      }
      updateCateGory(params)
          .then((res) => {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            if (Number(res.code) === 0) {
              iMessage.success(result)
            } else {
              iMessage.error(result)
            }
            this.mainLoading = false;
          }).catch(() => (this.mainLoading = false));
    },
    sendToAdmin(){
      this.mainLoading = true;
      let params = {
        carTypePackageId: this.carTypePackageId,
        versionId: this.packageVersion
      }
      sendToAdmin(params)
          .then((res) => {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            const message = this.$i18n.locale === 'zh' ? res.data.messageZh : res.data.messageEn
            if (Number(res.code) === 0) {
              if(res.data.message){
                iMessage.success(res.data.message)
              } else {
                iMessage.success(result)
              }
            } else {
              iMessage.error(result)
            }
            this.mainLoading = false;
          }).catch(() => (this.mainLoading = false));
    },
    saveAs(){
      this.mainLoading = true
      saveAsVersion({
        carTypePackageId: this.carTypePackageId,
        versionId: this.packageVersion,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.getPackageVersionCombo()
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.mainLoading = false
      }).catch(err => {
        this.mainLoading = false
      })
    },
    getPackageVersionCombo(){
      this.mainLoading = true
      packageVersionCombo({
        carTypePackageId: this.carTypePackageId,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.packageVersionList = res.data;
          this.packageVersion = this.packageVersionList.length > 0 ? this.packageVersionList[0].versionId : ''
        } else {
          iMessage.error(result);
        }
        this.mainLoading = false
      }).catch(err => {
        this.mainLoading = false
      })
    },
    clicktargetBudgetTotal(row){
      this.targetBudgetShow = true
      this.targetBudgetId = row.id
      let category = this.materialGroupList.find(item => Number(item.id) === Number(row.categoryId))
      let info = (category ? category.value : '') + ' ' + row.partNameZh
      this.targetBudgetInfo = info
    },
    clickfixedPointAllotTotal(row){
      this.fixedAssignmentShow = true
      this.fixedAssignmentId = row.id
      let category = this.materialGroupList.find(item => Number(item.id) === Number(row.categoryId))
      let info = (category ? category.value : '') + ' ' + row.partNameZh
      this.fixedAssignmentInfo = info
    }
  }
}
</script>

<style lang="scss" scoped>
.linkStyle {
  span {
    color: #1663F6;
    border-bottom: 1px solid #1663F6;
    cursor: pointer;
  }
  &.red{
    span{
      color: #E30D0D;
      border-bottom: 1px solid #E30D0D;
    }
  }
}
.font20W {
  font-size: 20px;
  font-weight: bold;
}
.multipleSelect {
  ::v-deep .el-tag {
    max-width: calc(100% - 65px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.main {
  padding: 30px 40px;

  .header {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    ::v-deep .el-select {
      width: 220px;
      margin-left: 20px;
      margin-right: 20px;
    }
    .font20W ::v-deep .el-input__inner {
      font-size: 20px;
      font-weight: bold;
    }


  }

  .content {
    .charts {
      display: flex;
      justify-content: space-between;

      .left {
        width: 480px;
        height: 272px;
        background: #FFFFFF;
        box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
        border-radius: 10px;
        padding: 25px 20px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .title {
          display: flex;
          justify-content: space-between;
          line-height: 24px;

          span:nth-of-type(1) {
            color: #131523;
            font-size: 18px;
            font-weight: bold;
          }

          span:nth-of-type(2) {
            color: #485465;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .chart1 {
          width: 440px;
          height: 180px;
          overflow-y: auto;
          overflow-x: hidden;

          #chart1 {
            width: 440px;
            height: 400px;
          }
        }
      }

      .right {
        width: calc(100% - 500px);
        height: 272px;
        background: #FFFFFF;
        box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
        border-radius: 10px;
        padding: 20px 60px;
        display: flex;
        overflow-x: auto;
        position: relative;
        .unit{
          color: #485465;
          font-size: 12px;
          font-weight: 400;
          position: absolute;
          right: 20px;
          top: 30px;
        }
        > div{
          width: 294px;
          height: 100%;
          margin-right: 120px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          .title{
            color: #000000;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
          }
          .chart{
            width: 294px;
            height: 196px;
          }
        }
      }
    }
    .table{
      margin-top: 20px;
      .search{
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        margin-bottom: 20px;

        ::v-deep .el-select {
          width: 220px;
          margin-left: 20px;
          margin-right: 20px;
        }

        .upload{
          display: inline-block;
          margin: 0 10px;
        }
      }
    }
  }
}
</style>