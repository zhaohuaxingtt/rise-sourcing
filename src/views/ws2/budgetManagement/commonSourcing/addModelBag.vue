<template>
  <div class="main">
    <div class="header">
      <div>
        <span class="font20W">车型包:</span>
        <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="carTypePackageId"
            class="font20W"
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
    <div class="content" v-loading="tableLoading">
      <div class="charts">
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
          <div>
            <div class="title">Tiguan X 2021</div>
            <div class="chart" id="chart2"></div>
          </div>
          <div>
            <div class="title">Tiguan X 2021</div>
            <div class="chart" id="chart3"></div>
          </div>
          <div>
            <div class="title">Tiguan X 2021</div>
            <div class="chart" id="chart4"></div>
          </div>
          <div>
            <div class="title">Tiguan X 2021</div>
            <div class="chart" id="chart5"></div>
          </div>
          <div>
            <div class="title">Tiguan X 2021</div>
            <div class="chart" id="chart6"></div>
          </div>
        </div>
      </div>
      <iCard class="table">
        <div class="search">
          <div>
            <span>{{$t('科室')}}:</span>
            <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="departmentsCombo"
                filterable
                multiple
                collapse-tags
                class="multipleSelect"
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
            <iButton>{{$t('保存为新版本')}}</iButton>
            <iButton>{{$t('上传清单')}}</iButton>
            <iButton>{{$t('下载清单')}}</iButton>
            <iButton>{{$t('发送项目采购员')}}</iButton>
          </div>
        </div>
        <iTableList
            :tableData="tableListData"
            :tableTitle="tableTitle"
            @handleSelectionChange="handleSelectionChange"
            :activeItems="'partNum'"
        >
        </iTableList>
      </iCard>
    </div>
  </div>
</template>

<script>
import {
  iTableList
} from "@/components"
import {iButton, iMessage, iSelect, iCard} from 'rise'
import {cateGoryCombo, getDepartmentsCombo, carTypePackageCombo, packageVersionCombo, commonSourcingView} from '@/api/ws2/commonSourcing'
import {iNavWS2} from "@/components";
import echarts from "@/utils/echarts";
import {getCartypePulldown} from "@/api/ws2/budgetManagement/edit";

export default {
  name: "commonSourcing",
  components: {
    iButton,
    iNavWS2,
    iSelect,
    iTableList,
    iCard
  },
  data() {
    return {
      packageNameZh: '',
      tableLoading: false,
      tableListData: [],
      tableTitle: [],
      selectTableData: [],
      carTypePackageId: '',
      carTypePackageList: [],
      packageVersion: '',
      packageVersionList: [],
      departmentsCombo: [],
      DepartmentsComboList: [],
      materialGroup: [],
      materialGroupList: [],
    }
  },
  mounted() {
    let carTypePackageId = this.$route.query.carTypePackageId
    this.getSelect(carTypePackageId)
    const chart1 = echarts().init(document.getElementById("chart1"));
    const chart2 = echarts().init(document.getElementById("chart2"));
    const chart3 = echarts().init(document.getElementById("chart3"));
    const chart4 = echarts().init(document.getElementById("chart4"));
    const chart5 = echarts().init(document.getElementById("chart5"));
    const chart6 = echarts().init(document.getElementById("chart6"));
    let option1 = {
      tooltip: {
        show: false
      },
      grid: {
        left: '0%',
        right: '0%',
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
        boundaryGap: [0, 0.01]
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
        data: [
          '车型包总目标预算',
          '车型包总目标预算',
          '车型包总目标预算',
          '车型包总目标预算',
          '车型包总目标预算',
          '车型包总目标预算',
          '车型包总目标预算',
          '车型包总目标预算',
          '车型包总目标预算',
          '车型包总目标预算',
        ]
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
          data: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
        },
        {
          name: '2011年',
          type: 'bar',
          barWidth: 14,
          stack: 'total',
          color: '#1763F7',
          label: {
            show: true,
            position: 'right'
          },
          data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
        }
      ]
    };
    let option2 = {
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
          data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
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
          data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
          itemStyle: {
            normal: {
              // barBorderRadius: [5, 5, 5, 5],
            }
          }
        },
      ]
    }

    chart1.setOption(option1);
    chart2.setOption(option2);
    chart3.setOption(option2);
    chart4.setOption(option2);
    chart5.setOption(option2);
    chart6.setOption(option2);

  },
  methods: {
    async getSelect(carTypePackageId) {
      // this.tableLoading = true
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
        this.getTableListFn()
        // this.tableLoading = false
      }).catch(() => {
        // this.tableLoading = false
      });

    },
    getCommonSourcingView(){
      // this.tableLoading = true
      commonSourcingView({
        carTypePackageId: this.carTypePackageId,
        categoryId: '',
        commodity: '',
        versionId	: this.packageVersion,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.carTypePackageList = res.data
          this.carTypePackageId = carTypePackageId
          this.packageVersionCombo(carTypePackageId)
        } else {
          iMessage.error(result);
        }
        // this.tableLoading = false
      }). catch(err => {
        //this.tableLoading = false
      })
    },
    carTypePackageCombo(carTypePackageId){
      // this.tableLoading = true
      carTypePackageCombo().then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.carTypePackageList = res.data
          this.carTypePackageId = carTypePackageId
          this.packageVersionCombo(carTypePackageId)
        } else {
          iMessage.error(result);
        }
        // this.tableLoading = false
      }). catch(err => {
        //this.tableLoading = false
      })
    },
    packageVersionCombo(carTypePackageId){
      // this.tableLoading = true
      packageVersionCombo({
        carTypePackageId: carTypePackageId,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.packageVersionList = res.data
          this.packageVersion = this.packageVersionList.length > 0 ? this.packageVersionList[0].versionId : ''
        } else {
          iMessage.error(result);
        }
        // this.tableLoading = false
      }). catch(err => {
        //this.tableLoading = false
      })
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    commonSourcingView(carTypePackageId) {
      this.tableLoading = true
      commonSourcingView({
        carTypePackageId: carTypePackageId,
        categoryId: this.packageNameZh,
        commodity: this.packageNameZh,
        versionId: this.packageNameZh,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.tableListData = res.data;
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(err => {
        this.tableLoading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
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

  ::v-deep .el-select {
    width: 220px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .header {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;

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
            height: 300px;
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
      }
    }
  }
}
</style>