<!--
 * @Author: haojiang
 * @Date: 2021-07-07 16:53:18
 * @LastEditTime: 2021-07-08 13:13:59
 * @LastEditors: Please set LastEditors
 * @Description: Economic Assessment
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rsCapacityExpan/components/ecoAssessment.vue
-->
<template>
  <div class="caexpan-card">
    <div class="tit">4 Economic Assessment</div>
    <div class="caexpan-card-body">
      <div class="topLevel">
        <div class="leftNote">
          Part<br>
          Price<br>
          Variation
        </div>
        <div class="rightTable">
          <el-table
          fit
          border
          tooltip-effect='light'
          :cell-class-name="getCellClass"
          :header-cell-class-name="getHeaderCellClass"
          :data='dataList'
          width="100%"
          @selection-change="handleSelectionChange"
          :empty-text="language('LK_ZANWUSHUJU','暂无数据')"
          :class="{moTable: true}">
          <el-table-column
            align='center'
            prop="partNum"
            width="120"
            label="Part No.">
          </el-table-column>
          <el-table-column
            align='center'
            prop="nomiRecordAPrice"
            label="Old A Price[RMB]">
          </el-table-column>
          <el-table-column
            align='center'
            prop="nomiSuggestAPrice"
            label="New A Price[RMB]">
          </el-table-column>
          <el-table-column
            align='center'
            prop="APriceGrowRate"
            width="80"
            label="△ [%]">
          </el-table-column>
          <!-- 年份 -->
          <el-table-column
            align='center'
            prop="year"
            width="60"
            label="">
          </el-table-column>
          <el-table-column
            align='center'
            width="200"
            prop="Num"
            label="Life-Time Demand[Cars]">
          </el-table-column>
        </el-table>
        </div>
      </div>

      <!-- 底部拼接表格 -->
      <div class="middleLevel">
        <div class="leftNote">
          Bemerkung <br> 备注
        </div>
        <ul>
          <li v-for="(item, index) in lifeTimeList" :key="index" :class="dataList.length % 2 ? 'odd' :'even'">
            <dl><dt>{{item.year}}</dt><dd>{{item.Num}}</dd></dl>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>
<script>
import {iMessage} from 'rise'

export default {
  data() {
    return {
      dataList: [],
      lifeTimeList: []
    }
  },
  mounted(){
    this.getFetchData()
  },
  methods: {
    getCellClass({columnIndex}) {
      return (columnIndex === 0 || columnIndex === 4) ? 'pin' : ''
    },
    getHeaderCellClass({columnIndex}) {
      if (columnIndex === 4) return 'yearHeader'
      if (columnIndex === 5) return 'yearValueHeader'
    },
    getFetchData() {
      try {
        const res = require('./ecoassessment.json')
        if (res.code === '200') {
          const year = 'year'
          const Num = 'Num'
          
          const data = res.data.dataList || []
          const lifeTimeList = res.data.lifeTimeList || []
          if (data.length <= lifeTimeList.length) {
            data.map((o, index) => {
              o[year] = lifeTimeList[index][year]
              o[Num] = lifeTimeList[index][Num]
            })
            this.dataList = data
            this.lifeTimeList = lifeTimeList.slice(data.length, lifeTimeList.length - 1)
          }
          
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch(e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
.caexpan {
  .caexpan-card {
    .tit {
      padding: 15px 0;
    }
    .caexpan-card-body {
      padding-left: 20px;
      .topLevel {
        display: flex;
        align-content: space-between;
        .leftNote {
          width: 65PX;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          text-align: center;
          font-size: 12px;
          background: rgb(217, 230, 253);
          border-top-left-radius: 3px;
        }
        .rightTable {
          width: 100%;
        }
      }
      .middleLevel {
        position: relative;
        .leftNote {
          position: absolute;
          left: 0px;
          top: 0px;
          width: 156px;
          height: 100%;
          min-height: 69.68PX;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          text-align: center;
          font-size: 12px;
          background: #f0f6ff;
          border-bottom-left-radius: 3px;
          border-right: 1px solid #fff;
          
        }
        ul {
          li {
            min-height: 34.84PX;
            &:hover {
              background: #f5f7fa;
            }
            // 偶数
            &.even {
              &:nth-child(2n) {
                background: #fff;
              }
              &:nth-child(2n+1) {
                background: rgb(239, 244, 254);
              }
            }
            // 奇数
            &.even {
              &:nth-child(2n+1) {
                background: #fff;
              }
              &:nth-child(2n) {
                background: rgb(239, 244, 254);
              }
            }
            
            dl {
              width: 260PX;
              float: right;
              display: flex;
              justify-items: center;
              align-items: center;
              dt {
                width: 60PX;
                min-height: 34.84PX;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #f0f6ff;
              }
              dd {
                width: 200PX;
                min-height: 34.84PX;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
}
::v-deep.moTable {
  &.el-table--border {
    .yearHeader {
      border-right: 0px !important;
    }
    .yearValueHeader {
      text-align: left;
    }
    th,td {
      border-bottom: 1px solid #fff !important;
      border-right: 1px solid #fff !important;
      &.pin {
        background: #f0f6ff;
        &.dbl {
          background: #f0f6ff;
        }
        // .cell {
        //   color: #32cec7;
        // }
      }
    }
  }
}
</style>