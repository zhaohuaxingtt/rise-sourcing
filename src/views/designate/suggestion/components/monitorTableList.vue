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
                v-if="scope.row && scope.row.supplierChosen[hindex - 1] "
                :placeholder="scope.row.percent && scope.row.percent[hindex - 1] || $t('LK_QINGSHURU')"
                v-model="scope.row.percent[hindex - 1]"
                @change="handleEditPercent(scope.row, hindex - 1)"
              ></iInput>
              <span v-else>{{scope.row.percent && scope.row.percent[hindex - 1] || ''}}</span>
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
      const percent = row.percent || []
      const cIndex = supplierChosen.findIndex(o => o === curSupplier)
      if (!this.batchEdit) return
      if (supplierChosen.includes(curSupplier))  {
        // 只有一家供应商报价
        if (supplierChosen.length === 1) return
        supplierChosen.splice(cIndex, 1)
        percent.splice(percent, 1)
      } else {
        supplierChosen.push(curSupplier)
      }
      Vue.set(row, 'supplierChosen', supplierChosen)
      Vue.set(row, 'percent', percent)
      // console.log('handleCellClick', curSupplier, cIndex, supplierChosen, row)
    },
    // 编辑百分比
    handleEditPercent(row, Index) {
      const percent = row.percent || []
      const count = percent.map(o => Number(o)).reduce((total, n) => total += n)
      // console.log('handleEditPercent', row, Index, count)
      if (isNaN(count) || count > 100) {
        percent[Index] = 0
        Vue.set(row, 'percent', percent)
        iMessage.error(this.$t('nominationSuggestion.NingShuRuDeBiLiBuHeFa'))
        return
      }
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
    cacleSc(data = []) {
      let count = 0
      let str = ''
      data.forEach((item) => {
        const tto = item.TTo || []
        tto.forEach((t, tIndex) => {
          const percent = ((item.percentCalc[tIndex] || 0) / 100).toFixed(2)
          count += Number(t) * percent
          str += `${Number(t)}* ${percent} +`
        })
      })
      // console.log(str, count)
      return Number(count).toFixed(2)
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
      res[0][0] = 0
      res[1][0] = countSupplier.map(o => Number(o) || 0).reduce((total, n) => total += n)

      

      // Best TTO by Group
      // 筛选出所有的分组
      const groups = _.uniq(data.filter(o => o[GroupKey]).map(o => o[GroupKey]))
      let bestGroup = []
      let weightedGroup = []
      // 取出分组最低
      groups.forEach((gid, index) => {
        const groupedArray = data.filter(o => o[GroupKey] === gid)
        // 已分组，取最低TTO，组内求和
        bestGroup[index] = groupedArray.map(o => {
          const tto = [...(o.TTo || [])].filter(p => p > 0)
          return Number(tto.sort()[0])
        }).reduce((total, n) => total += n)

        // 分组权重
        weightedGroup[index] = this.cacleSc(groupedArray)
        console.log('g', groupedArray, this.cacleSc(groupedArray))
      })
      // 取出未分组最低，未分组的按照单独分组处理
      const unGroupedList = data.filter(o => !o[GroupKey])
      if (unGroupedList.length) {
        unGroupedList.forEach(item => {
          const tto1 = [...(item.TTo || [])].filter(o => o > 0)
          bestGroup.push(Number(tto1.sort()[0]))
          // 分组权重
          weightedGroup.push(this.cacleSc([item]))
        })
      }

      bestGroup = bestGroup.sort()
      weightedGroup = weightedGroup.sort()
      console.log('weightedGroup',bestGroup, weightedGroup)

      // // 分组 / 加权最低
      bestGroup.forEach((groupValue, gIndex) => {
        !res[gIndex] && (res[gIndex] = [])
        !res[gIndex][0] && (res[gIndex][0] = '')
        res[gIndex][1] = groupValue
        !res[gIndex][2] && (res[gIndex][2] = '')
        !res[gIndex][3] && (res[gIndex][3] = '')

        res[gIndex][3] = weightedGroup[gIndex]
      })

      // Best TTO by Part
      const TTO = data.map(o => o.TTo)
      const filtedTTo = TTO.flat(Infinity).filter(o => Number(o) > 0).sort((a, b) => { return a - b})
      res[0][2] = filtedTTo[0]
      res[1][2] = 0

      console.log('calculateBestTTo', res)
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