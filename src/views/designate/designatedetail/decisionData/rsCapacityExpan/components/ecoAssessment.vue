<!--
 * @Author: haojiang
 * @Date: 2021-07-07 16:53:18
 * @LastEditTime: 2021-10-13 14:08:51
 * @LastEditors: Hao,Jiang
 * @Description: Economic Assessment
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
            prop="nomiSuggestBPrice"
            label="New B Price[RMB]">
          </el-table-column>
          <el-table-column
            align='center'
            prop="apriceGrowRate"
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
            prop="totalCarTypeProOutput"
            label="Life-Time Demand[Cars]">
          </el-table-column>
        </el-table>
        </div>
      </div>

      <!-- 底部拼接表格 -->
      <div class="middleLevel">
        <div class="leftNote">
          <!-- Bemerkung  -->
          <!-- <br> 备注 -->
          Comments
        </div>
        <ul>
          <li v-for="(item, index) in lifeTimeList" :key="index" :class="dataList.length % 2 ? 'odd' :'even'">
            <dl><dt>{{item.year}}</dt><dd>{{item.totalCarTypeProOutput}}</dd></dl>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>
<script>
import {iMessage} from 'rise'

export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    timeList: {
      type: Array,
      default: () => ([])
    }
  },
  watch: {
    data() {
      if (this.data && this.data.length) {
        this.dataList = this.data
        this.getFetchData()
      }
    }
  },
  data() {
    return {
      dataList: [],
      lifeTimeList: []
    }
  },
  methods: {
    getCellClass({columnIndex}) {
      return (columnIndex === 0 || columnIndex === 5) ? 'pin' : ''
    },
    getHeaderCellClass({columnIndex}) {
      if (columnIndex === 5) return 'yearHeader'
      if (columnIndex === 6) return 'yearValueHeader'
    },
    async getFetchData() {
      // const res = require('./ecoassessment.json')
      const year = 'year'
      const Num = 'totalCarTypeProOutput'
      
      const data = this.dataList || []
      const lifeTimeList = this.timeList || []
      const dataLength = data && data.length || 0
      const lifeTimeListLength = lifeTimeList && lifeTimeList.length || 0
      if (dataLength) {
        data.map((o, index) => {
          o[year] = lifeTimeList[index][year] || ''
          o[Num] = lifeTimeList[index][Num] || ''
        })
        this.dataList = data
      }
      // 零件行数小于年分数
      
      if ( dataLength && dataLength <= lifeTimeListLength) {
        this.lifeTimeList = lifeTimeList.slice(dataLength, lifeTimeListLength)
      } else {
         this.lifeTimeList = [{}, {}]
      }
      // 针对时间表格缺一条数据的情况，填充成2条
      if (this.lifeTimeList.length === 1) {
        this.lifeTimeList.push({})
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.caexpan {
  .caexpan-card {
    .tit {
      padding: 15px 0;
      font-size: 14px;
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
        border: 1px solid #f0f6ff;
        border-top: 0px;
        position: relative;
        min-height: 69.68PX;
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
            // 奇数
            &.odd {
              &:nth-child(2n) {
                background: #fff;
              }
              &:nth-child(2n+1) {
                background: rgb(239, 244, 254);
              }
            }
            // 偶数
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