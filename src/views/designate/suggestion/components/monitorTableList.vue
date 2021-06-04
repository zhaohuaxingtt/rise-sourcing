<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-04-19 17:15:37
 * @LastEditors: Please set LastEditors
-->

<template>
  <div class="monitorTable">
    <el-table
      fit
      border
      tooltip-effect='light'
      :height="height"
      :data='data'
      :cell-class-name="getCellClass"
      width="100%"
      default-expand-all
      v-loading='tableLoading'
      @selection-change="handleSelectionChange"
      :span-method="spanMethod"
      :empty-text="$t('LK_ZANWUSHUJU')"
      ref="monitorTable">
      <!-- <el-table-column
        v-if="selection"
        type='selection' 
        width="60"
        label='Group'
        align='center'>
        <template slot-scope="scope">
          <el-checkbox></el-checkbox>
          <div class="tableSelection" v-if="scope.row.gid">{{'GroupName'}}</div>
        </template>
      </el-table-column> -->
      <el-table-column
        width="60"
        label='Group'
        align='center'>
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.selected"
            v-if="batchEdit"
            @change="handleSelectionChange"></el-checkbox>
          <div class="tableSelection" v-if="scope.row.groupId">{{scope.row.groupName}}</div>
        </template>
      </el-table-column>
      <el-table-column 
        v-if='index' 
        type='index' 
        width='50' 
        align='center' 
        :label='indexLabel'>
      </el-table-column>
      <el-table-column
        align='center'
        prop="partNo"
        label="Teil Nr.">
      </el-table-column>
      <el-table-column
        align='center'
        prop="partPrjCode"
        label="FSNr.">
      </el-table-column>
      <el-table-column
        align='center'
        prop="factory"
        label="Factory">
      </el-table-column>

      <!-- 循环取出厂商以及TTO -->
      <el-table-column
        align='center'
        label-class-name="tline"
        v-for="(head, hindex) in supplier"
        :key="hindex"
        >
        <template slot="header">
          <div class="auoHeader">
            <p>{{head}}</p>
            <p>TTO</p>
          </div>
        </template>
        <template slot-scope="scope">
          <div @click="handleCellClick(scope.row, hindex)">
            {{scope.row.TTo && scope.row.TTo[hindex] || '' }}
          </div>
        </template>
      </el-table-column>
      

      <!-- 循环取出供应商百分比分布 -->
      <template
        v-for="hindex in (supplier || []).length"
      >
        <el-table-column
          align='center'
          :key="hindex"
          :label="`Recommend Supplier ${hindex + 1}`">
          <template slot="header">
            <div class="auoHeader lineheight1">
              Recommend <br />{{`Supplier ${hindex}`}}
            </div>
          </template>
          <template slot-scope="scope">
            <div>
              {{scope.row.supplierChosen && scope.row.supplierChosen[hindex - 1] || '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align='center'
          width="80"
          :key="hindex"
          :label="`Share ${hindex}(%)`">
          <template slot-scope="scope">
            <div v-if="batchEdit">
              <iInput
                :placeholder="scope.row.percent && scope.row.percent[hindex - 1] || $t('LK_QINGSHURU')"
                v-model="scope.row.percent[hindex - 1]"
                @change="handleEditPercent(scope.row, hindex)"
              ></iInput>
            </div>
            <div v-else>{{scope.row.percent && scope.row.percent[hindex - 1] || '' }}</div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
  
</template>
<script>
import Vue from 'vue'
// import {mokeMouldMonitorData} from './data'
import {iMessage, iInput} from 'rise'
import _ from 'lodash'

export default {
   props:{
    tableData:{type:Array},
    tableLoading:{type:Boolean,default:false},
    selection:{type:Boolean,default:true},
    index:{type:Boolean,default:false},
    indexLabel:{type:String,default:'#'},
    height:{type:Number||String, default:'380'},
    batchEdit: {type:Boolean, default:false},
    // 供应商数组
    supplier: {type:Array, default: () => ([])}
  },
  components: {iInput},
  data() {
    return {
      isEdit: false,
      data: this.tableData,
      spanArr: [],
      selectedData: [],
      chartData: [],
      combineVisible: false
    }
  },
  watch: {
    tableData() {
      this.init()
    }
  },
  methods: {
    getCellClass(row, Index) {
      let pin = ''
      // 厂商列从第offset列开始
      const offset = 4
      const curIndex = row.columnIndex - offset
      if (curIndex >=0 && curIndex <= this.supplier.length - 1) {
        const curSupplier = this.supplier[curIndex]
        const supplierChosen = row.row.supplierChosen && row.row.supplierChosen || []
        if (supplierChosen.includes(curSupplier)) pin = 'pin'
      }
      // 判断奇偶行,偶行加深斑马纹
      if (row.rowIndex % 2 === 0 && pin === 'pin') pin = 'pin dbl'
      return pin
    },
    handlEdit() {
      if (!this.selectData.length) {
        iMessage.error('请选择')
        return
      }
      this.editControl = true
      this.setEditState(true)
    },
    setEditState(state = false) {
      this.selectData.forEach(item => {
        const tar = this.selectData.find(o => o.id === item.id)
        tar && (Vue.set(tar, 'isEdit', state))
      })
    },
    // section选择
    handleSelectionChange() {
      let selectedData = this.tableData.filter(o => o.selected)
      selectedData.forEach(item => {
        if (item.groupId){
          const groupedArray = this.tableData.filter(o => o.groupId === item.groupId)
          selectedData = [...selectedData, ...groupedArray]
        }
      })
      this.selectedData = _.uniqBy(selectedData, o => o.id)
      // console.log(this.selectedData)
    },
    // 点击cell，分比例
    handleCellClick(row, Index) {
      const curSupplier = this.supplier[Index]
      const supplierChosen = row.supplierChosen && row.supplierChosen || []
      if (supplierChosen.includes(curSupplier))  {
        const cIndex = supplierChosen.findIndex(o => o === curSupplier)
        if (supplierChosen.length === 1) return
        supplierChosen.splice(cIndex, 1)
      } else {
        supplierChosen.push(curSupplier)
      }
      Vue.set(row, 'supplierChosen', supplierChosen)
    },
    // 编辑百分比
    handleEditPercent(row, Index) {
      console.log(row, Index)
      this.chartData = this.calculateBestTTo(this.data)
      this.$nextTick(() => {
        this.$emit('updateCharts', this.chartData)
      })
    },
    /**
     * 分组函数，用于element-ui table 分组合并
     * target 目标数组
     * groupKey 同一组打标字段名, 
     * cb 回调函数，提供格式化好的原数组，
     */
    rowspan(dataList = [], groupKey = 'gid', cb = null) {
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
      // 处理回调
      typeof cb === 'function' && (cb(dataList, spanArr))
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
    init() {
      this.data = this.tableData
      this.spanArr = this.rowspan(this.data, 'gid', (data = []) => {
        // 格式化数据
        this.data = data
        this.chartData = this.calculateBestTTo(data)
        this.$nextTick(() =>{
          this.$emit('updateCharts', this.chartData)
        })
      })
    },
    /**
     * 计算柱状图最佳TTO
     * Best TTO for Whole Package 所有零件报价最低的厂商
     * Best TTO by Group 报价最低的分组
     * Best TTO by Part 报价最低的零件
     * Recommend Scenario 自定义最低，加权最低
     */
    calculateBestTTo(data = []) {
      // Best TTO for Whole Package
      const GroupKey = 'gid'
      const res = [[], []]
      const countSupplier = []
      // 根据供应商
      this.supplier.forEach((item, index) => {
        countSupplier[index] = data.map(o => Number(o.TTo[index])).reduce((total, n) => total += n)
      })
      console.log('1', data, countSupplier)
      res[0][0] = 0
      res[1][0] = countSupplier.reduce((total, n) => total += n)

      

      // Best TTO by Group
      // 筛选出所有的分组
      const groups = _.uniq(data.filter(o => o[GroupKey]).map(o => o[GroupKey]))
      const bestGroup = []
      groups.forEach((gid, index) => {
        const groupedArray = data.filter(o => o[GroupKey] === gid)
        bestGroup[index] = groupedArray.map(o => {
          const tto = [...(o.TTo || [])]
          return Number(tto.sort()[0])
        }).reduce((total, n) => total += n)
        console.log(index, groupedArray.map(o => {
          const tto = [...(o.TTo || [])]
          return Number(tto.sort()[0])
        }))
      })

      res[0][1] = bestGroup[0] || 0
      res[1][1] = bestGroup[1] || 0

      // Best TTO by Part
      const TTO = data.map(o => o.TTo)
      const filtedTTo = TTO.flat(Infinity).sort((a, b) => { return a - b})
      const countTTo = filtedTTo.reduce((total, n) => {
        total = Number(total) + Number(n);
        return total
      })
      res[0][2] = filtedTTo[0]
      res[1][2] = countTTo

      // Recommend Scenario 加权最低
      const weightedTTo = []
      data.forEach((item, index) => {
        let count = 0
        const tto = item.TTo || []
        tto.forEach((t, tIndex) => {
          const percent = (item.percent[tIndex] / 100)
          if (!isNaN(percent)) {
            count = Number(count) + Number(t) * percent
            count = Number(count).toFixed(0)
          }
        })
        weightedTTo[index] = count
      })
      const countWeightedTTo = weightedTTo.reduce((total, n) => {
        total = Number(total) + Number(n);
        return total
      })

      res[0][3] = weightedTTo.sort()[0]
      res[1][3] = countWeightedTTo

      console.log('calculateBestTTo', res, bestGroup, weightedTTo)
      return res
    }
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
  .tableSelection {
    line-height: 1rem;
    letter-spacing: 0px;
    padding-top: 5px
  }
  ::v-deep .tline {
    padding: 0px;
  }
  .auoHeader {
    text-align: center;
    &.lineheight1 {
      line-height: 1;
    }
    
    p {
      height: 50%;
      line-height: 2rem;
      text-align: center;
      border-bottom: 1px solid #fff;
      &:last-child {
        border-bottom: 0px;
      }
    }
  }
}

</style>