<!--
 * @Author: your name
 * @Date: 2021-07-07 09:35:37
 * @LastEditTime: 2021-10-13 11:25:57
 * @LastEditors: Hao,Jiang
 * @Description: 扩产能天，周，年表格
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rsCapacityExpan/components/capacity.vue
-->
<template>
  <div class="caexpan-card">
    <div class="tit">1 Capacity</div>
    <div class="caexpan-card-body">
      <el-table
        fit
        border
        tooltip-effect='light'
        :data='dataList'
        width="100%"
        default-expand-all
        :span-method="spanMethod"
        :empty-text="language('LK_ZANWUSHUJU','暂无数据')"
        :class="{monitorTable: true, en: this.lang === 'en'}">
        <el-table-column
          align='center'
          width="80"
          prop="capa"
          label="Current">
        </el-table-column>
        <el-table-column
          align='left'
          width="150"
          prop="name"
          :label="''">
        </el-table-column>
        <el-table-column
          align='center'
          width="150"
          prop="date"
          :label="'Date'">
        </el-table-column>
        <el-table-column
          align='center'
          prop="eday"
          label="">
        <template slot="header">
          <div class="auoHeader">
            <div class="auoHeaderRow">E./Day</div>
            <div class="auoHeaderCol"><div>Norm.</div><div>Max.</div></div>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="auoCol">
            <div>{{scope.row.capacityNormDay || ''}}</div>
            <div>{{scope.row.capacityMaxDay || ''}}</div>
          </div>
        </template>
        </el-table-column>
        <el-table-column
          align='center'
          prop="eday"
          label="">
        <template slot="header">
          <div class="auoHeader">
            <div class="auoHeaderRow">E./Week</div>
            <div class="auoHeaderCol"><div>Norm.</div><div>Max.</div></div>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="auoCol">
            <div>{{scope.row.capacityNormWeek || ''}}</div>
            <div>{{scope.row.capacityMaxWeek || ''}}</div>
          </div>
        </template>
        </el-table-column>
        <el-table-column
          align='center'
          prop="eday"
          label="">
        <template slot="header">
          <div class="auoHeader">
            <div class="auoHeaderRow">E./Year</div>
            <div class="auoHeaderCol"><div>Norm.</div><div>Max.</div></div>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="auoCol">
            <div>{{scope.row.capacityNormYear || ''}}</div>
            <div>{{scope.row.capacityMaxYear || ''}}</div>
          </div>
        </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    data: {
      type: Array,
      default: () => ([])
    },
  },
  created() {
    this.init()
  },
  watch: {
    data(data) {
      if (data && data.length) {
        this.dataList.map((o, index) => {
          Vue.set(o, 'date', data[index] && data[index].date)
          Vue.set(o, 'capacityNormDay', data[index] && data[index].capacityNormDay)
          Vue.set(o, 'capacityMaxDay', data[index] && data[index].capacityMaxDay)
          Vue.set(o, 'capacityNormWeek', data[index] && data[index].capacityNormWeek)
          Vue.set(o, 'capacityMaxWeek', data[index] && data[index].capacityMaxWeek)
          Vue.set(o, 'capacityNormYear', data[index] && data[index].capacityNormYear)
          Vue.set(o, 'capacityMaxYear', data[index] && data[index].capacityMaxYear)
          return o
        })
      }
      
    }
  },
  data() {
    return {
      dataList: [],
      spanArr: [],
      dataEN: [
        {
          gid: 1,
          capa: 'Capa.',
          name: 'Nomination Capa.'
        },
        {
          capa: 'Capa.',
          gid: 1,
          name: 'Current Capa.'
        },
        {
          capa: 'Capa.',
          gid: 1,
          name: 'After Invested'
        },
        {
          capa: 'Capa.',
          gid: 1,
          name: 'Interim Measure'
        }
      ],
    }
  },
  methods: {
    init() {
      this.dataList = this.dataEN
      this.spanArr = this.rowspan(this.dataList)
    },
    rowspan(dataList = [], groupKey = 'gid') {
      // 缓存每行的span记录
      const spanArr = []
      // 遍历dataList index
      let position = 0
      // 过滤有分组的数据行，把相同分组id的放在一起,并排序
      const groupedArray = dataList.filter(o => o[groupKey]).sort((a, b) => {return a[groupKey] === b[groupKey]})
      // 过滤出没有分组的数据行
      const unGroupedArray = dataList.filter(o => !o[groupKey])
      // 合并
      dataList = [...groupedArray, ...unGroupedArray]

      dataList.forEach((item, index) => {
        if( index === 0){
          spanArr.push(1);
          position = 0;
        }else{
          if(item[groupKey] && item[groupKey] === dataList[index-1][groupKey] ){
            spanArr[position] += 1;
            spanArr.push(0);
          }else{
            spanArr.push(1);
            position = index;
          }
        }
      })
      return spanArr
    },
    spanMethod({row, column, rowIndex, columnIndex}) {
      // 只做第一列合并操作
      if (columnIndex === 0 ) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.monitorTable {
  ::v-deep .el-table {
    height: 450px;
  }
  ::v-deep .el-table--border {
    th,td {
      border-bottom: 1px solid #fff !important;
      border-right: 1px solid #fff !important;
      &.pin {
        background: #e8f6fb;
        &.dbl {
          background: #effbfb;
        }
        .cell {
          color: #32cec7;
        }
      }
    }
  }
  &.en ::v-deep.el-table_1_column_1 {
    border-right: 0px !important;
  }
  .tableSelection {
    line-height: 1rem;
    letter-spacing: 0px;
    padding-top: 5px
  }
  ::v-deep .tline {
    padding: 0px;
  }
  ::v-deep.el-table_1_column_3,::v-deep.el-table_1_column_4,::v-deep.el-table_1_column_5 {
    padding: 0px;
    .cell {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
  .auoHeader {
    text-align: center;
    &.lineheight1 {
      line-height: 1;
    }
    .auoHeaderRow {
      text-align: center;
    }
    .auoHeaderCol {
      display: flex;
      align-content: space-between;
      justify-content: center;
      position: relative;
      
      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #EBEEF5;
        position: absolute;
        left: 0px;
        top: 0px;
      }
      &:after {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        background: #EBEEF5;
        position: absolute;
        left: 50%;
        top: 0px;
      }
      &>div {
        width: 50%;
        text-align: center;
      }
    }
    
    p {
      height: 50%;
      line-height: 2rem;
      text-align: center;
      border-bottom: 1px solid #EBEEF5;
      &:last-child {
        border-bottom: 0px;
      }
    }
  }
  .auoCol {
    display: flex;
    align-content: space-between;
    justify-content: center;
    position: relative;
    &>div {
      width: 50%;
      text-align: center;
    }
  }
}
.caexpan-card {
  .tit {
    padding: 15px 0;
  }
  .caexpan-card-body {
    padding-left: 20px;
  }
}
</style>