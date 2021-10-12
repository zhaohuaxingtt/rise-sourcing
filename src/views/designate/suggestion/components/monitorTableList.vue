<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-10-12 12:56:09
 * @LastEditors: Hao,Jiang
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
      :empty-text="language('LK_ZANWUSHUJU','暂无数据')"
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
            v-if="batchEdit && selection"
            @change="handleSelectionChange(scope)"></el-checkbox>
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
        width="150"
        label-class-name="tline"
        v-for="(head, hindex) in supplier"
        :key="hindex"
        >
        <template slot="header">
          <div class="auoHeader">
            <p style="padding: 0 10px">{{head}}</p>
            <p>TTO</p>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="supplier-tto" @click="handleCellClick(scope.row, hindex)">
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
          width="150"
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
          width="100"
          :key="hindex"
          :label="`Share ${hindex}(%)`">
          <template slot-scope="scope">
            <div v-if="batchEdit">
              <iInput
                v-if="scope.row && scope.row.supplierChosen[hindex - 1] "
                :placeholder="scope.row.percent && scope.row.percent[hindex - 1] || language('LK_QINGSHURU','请输入')"
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
    // 清空选中的项目
    clearSelected() {
      this.data.map(o => {
        Vue.set(o, 'selected', false)
        return o
      })
      this.selectedData = []
    },
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
        iMessage.error(this.language('LK_QINGSHURU','请输入'))
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
    handleSelectionChange(scope) {
      const row = scope.row
      const selected = row.selected
      let selectedData = this.selectedData
      const newSelectedData = row.groupId ? this.data.filter(o => o.groupId === row.groupId) : [row]
      if (!selected) {
        selectedData = _.pullAllBy(selectedData, newSelectedData, 'id')
      } else {
        selectedData = selectedData.concat(newSelectedData)
      }
      this.selectedData = _.uniqBy(selectedData, o => o.id)
      // console.log('selectedData', this.selectedData, this.data)
    },
    // 点击cell，分比例
    handleCellClick(row, Index) {
      const curSupplier = this.supplier[Index]
      const supplierChosen = row.supplierChosen && row.supplierChosen || []
      const percent = row.percent || []
      const cIndex = supplierChosen.findIndex(o => o === curSupplier)
      // 当前supplier是否有TTo
      const curTTo = row.TTo && row.TTo[Index]
      // console.log(curTTo, curSupplier, supplierChosen, row)
      // 非编辑模式下不允许编辑供应商
      if (!this.batchEdit) return
      if (supplierChosen.includes(curSupplier))  {
        // 只有一家供应商报价
        if (supplierChosen.length === 1) return
        supplierChosen.splice(cIndex, 1)
        percent.splice(cIndex, 1)
      } else {
        // 当前供应商TTO为空不能被选中
        if (!curTTo) return
        supplierChosen.push(curSupplier)
      }
      // 添加未保存警告
      this.$emit('unSaveWarning', true)
      Vue.set(row, 'supplierChosen', supplierChosen)
      Vue.set(row, 'percent', percent)
      // 同步编辑到percentCalc
      this.onPercentChangeWhiteBack(row)
      this.chartData = this.calculateBestTTo(this.data)
      this.$nextTick(() => {
        this.$emit('updateCharts', this.chartData)
      })
      // console.log('handleCellClick', curSupplier, cIndex, supplierChosen, row)
    },
    // 校验输入的比例是否合法
    checkPercent() {
      console.log(this.data)
      let state = true
      let info = ''
      this.data.forEach(row => {
        const percent = row.percent || []
        const count = _.sum(percent.map(o => Number(o)))
        // 校验是否包含负数比例
        const containNGNumber = percent.filter(m => m < 0).length
        if (state && isNaN(count) || count > 100 || containNGNumber) {
          state = false
          info = this.language('FENPEIBILIBUHEFA', '分配比例不合法')
        }
      })
      return {
        state,
        info
      }
    },
    // 编辑百分比
    handleEditPercent(row, Index) {
      const percent = row.percent || []
      const count = _.sum(percent.map(o => Number(o)))
      // 校验是否包含负数比例
      const containNGNumber = percent.filter(m => m < 0).length
      if (isNaN(count) || count > 100 || containNGNumber) {
        // percent[Index] = 0
        // Vue.set(row, 'percent', percent)
        iMessage.error(this.language('NINGSHURUDEBILIBUHEFA', '您输入的比例不合法'))
        return
      }
      this.onPercentChangeWhiteBack(row)
      this.chartData = this.calculateBestTTo(this.data)
      // 添加未保存警告
      this.$emit('unSaveWarning', true)
      this.$nextTick(() => {
        this.$emit('updateCharts', this.chartData)
      })
    },
    // 输入百分比回写
    onPercentChangeWhiteBack(item) {
      const supplierChosen = item.supplierChosen || []
      const percentCalc = item.percentCalc || []
      supplierChosen.forEach((o, index) => {
        // 找到对应的供应商修改的tto
        const value = item.percent[index]
        // 找到供应商的index
        const calcIndex = this.supplier.findIndex(p => p === o)
        percentCalc[calcIndex] = Number(value) || 0
      })
      percentCalc.map((calcValue, index) => {
        const supName = this.supplier[index]
        // console.log('supplierChosen', calcValue, supName, percentCalc)
        if (!supplierChosen.includes(supName) && calcValue > 0) {
          percentCalc[index] = 0
          // console.log('supplierChosen2', calcValue, supName, percentCalc)
        }
        return calcValue
      })
      Vue.set(item, 'percentCalc', percentCalc)
      // console.log('percentCalc', percentCalc, item)
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
      // 只做第一列合并操作 - 只针对有推荐供应商的处理
      if (_.sum(row.TTo || []) && columnIndex === 0 ) {
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
    cacleSc(data = [], index = null) {
      let count = 0
      let str = ''
      const weightedArray = []
      data.forEach((item) => {
        const tto = item.TTo || []
        tto.forEach((t, tIndex) => {
          // 传了index 求单一零件的 推荐供应商tto 汇总
          if (index !== null) {
            if (index === tIndex) {
              const percent = ((item.percentCalc[tIndex] || 0) / 100).toFixed(2)
              weightedArray.push(Number(t) * percent)
            }
          } else {
            const percent = ((item.percentCalc[tIndex] || 0) / 100).toFixed(2)
            weightedArray.push(Number(t) * percent)
          }
        })
      })
      count = _.sum(weightedArray)
      // console.log(data, str, count)
      return Number(count).toFixed(0)
    },
    // 筛选出分组最低的供应商
    filterBestGrouper(data) {
      let bestGroup = []
      const supplierTemlate = JSON.parse(JSON.stringify(this.supplier))
      // 循环供应商
      supplierTemlate.forEach((supplierName, index) => {
        // 以纵向供应商维度，每个零件都必须有报价
        const cstStatus = !data.map(dataItem => dataItem.TTo[index]).filter(p => p === 0).length
        // 取出该供应商所有零件报价的TTo
        const wholePackageData = data.map(o => Number(o.TTo[index]) || 0)
        cstStatus && (bestGroup[index] = {
          index,
          data: Number(_.sum(wholePackageData)).toFixed(2)
        })
      })
      if (!bestGroup.length) return false
      // 根据TTO之和排序
      bestGroup = _.sortBy(bestGroup, ['data'])
      // console.log('--bestGroup', bestGroup)
      // 返回零件之和最低的供应商
      return bestGroup[0]
    },
    /**
     * 计算柱状图最佳TTO
     * Best TTO for Whole Package 所有零件报价最低的厂商
     * Best TTO by Group 报价最低的分组
     * Best TTO by Part 报价最低的零件
     * Recommend Scenario 自定义最低，加权最低
     */
    calculateBestTTo(data = []) {
      if (!data.length) return {}
      // Best TTO for Whole Package
      const GroupKey = 'gid'

      // 需要展示的供应商，统计出需要展示的涉及的供应商
      let supplier = []
      
      // 校验是否显示加权第四根柱子
      let isShowWeightStick = false
      isShowWeightStick = Boolean(data.filter(o => o.supplierChosen && (o.supplierChosen.length > 1 || (o.supplierChosen.length === 1 && o.percent && String(o.percent[0]) !== '100.00'))).length)

      // 'Best TTO \n for Whole Package'
      // 根据供应商
      let countSupplier = []
      const supplierTemlate = JSON.parse(JSON.stringify(this.supplier))
      supplierTemlate.forEach((supplierName, index) => {
        // 检查该供应商是否支持汇总，这个供应商对所有零件都有报价才支持
        const cstStatus = !data.map(dataItem => dataItem.TTo[index]).filter(p => p === 0).length
        const wholePackageData = data.map(o => Number(o.TTo[index] || 0))
        cstStatus && (countSupplier[index] = {
          index,
          data:  _.sum(wholePackageData)
        })
      })
      // wholePackage 排序
      countSupplier = countSupplier.sort((a, b) => a.data - b.data)
      console.log('countSupplier', countSupplier)
      const wholePackage = Number(countSupplier[0] && countSupplier[0].data).toFixed(2) || 0
      const wholePackageIndex = (countSupplier[0] && countSupplier[0].index) || 0
      // 记录该供应商
      supplier.push(wholePackageIndex)

      // 'Best TTO \n by Group'
      // 分组汇总
      let bestGroup = []
      // 是否显示分组最低
      const isShowGroupStick = Boolean(data.filter(o => o.groupId).length)
      // 取出所有已分组的组名，没有分组的零件当单独一个分组
      const groups = _.uniq(data.filter(o => o[GroupKey]).map(o => o[GroupKey]))
      // console.log('groups', groups)
      groups.forEach((gid) => {
        // 循环已分组的零件组
        const groupedArray = data.filter(o => o[GroupKey] === gid)
        // 已分组，取最低TTO，
        const itemBestGroup = this.filterBestGrouper(groupedArray)
        console.log('最低tto-group', itemBestGroup)
        if (itemBestGroup) {
          bestGroup.push(itemBestGroup)
        }
      })
      
      // 取出未分组最低，未分组的按照单独分组处理
      const unGroupedList = data.filter(o => !o[GroupKey])
      if (unGroupedList.length) {
        unGroupedList.forEach(item => {
          const itemBestGroup = this.filterBestGrouper([item])
          if (itemBestGroup) {
            bestGroup.push(itemBestGroup)
          }
          // 分组权重
          // weightedGroup.push(this.cacleSc([item]))
        })
      }
      bestGroup = _.sortBy(bestGroup, ['data'])
      // console.log('bestGroup', bestGroup)
      // 筛选分组最低数据
      // const bestGroupTotal = _.sum(bestGroup.map(o => o.data))
      const bestGroupTotal = bestGroup[0].data
      // const bestGroupSupplier = [bestGroup[0].data, bestGroupTotal - bestGroup[0].data]
      const bestGroupSupplier = [bestGroup[0].data]
      const bestGroupSupplierIndex = bestGroup[0].index
      bestGroupSupplier.push(bestGroupTotal)
      // 记录该供应商
      supplier.push(bestGroupSupplierIndex)
      
      console.log('weightSupplier', weightSupplier, unGroupedList)


      // Best TTO \n by Part
      // 零件最低
      let minPartSupplierTToTotal = 0
      let minPartSupplierTToArray = []
      // 求最低tto之和，遍历零件，过滤掉未报价的供应商，取报价最低的TTO求和
      // 筛选出每个零件最低tto的供应商
      let bestPartList = []
      // 记录供应商的，和供应商的tto
      data.forEach(item => {
        let minTTo = item.TTo.map((data, index) => {
          return {
            index, 
            data: Number(data)
          }
        })
        // 过滤掉未报价的供应商
        minTTo = _.sortBy(minTTo.filter(o=> o.data > 0), ['data'])
        if (minTTo[0]) {
          bestPartList.push(minTTo[0])
        }
      })
      bestPartList = bestPartList.sort((a,b)=>a-b)
      supplierTemlate.forEach((supplierName, index) => {
        const sup = bestPartList.filter(o => o.index === index)
        const dataCount = _.sum(sup.map(supItem => Number(supItem.data) || 0))
        
        if (dataCount) {
          // 记录该供应商
          supplier.push(index)
          minPartSupplierTToArray[index] = {
            index,
            data: dataCount
          }
        }
      })
      minPartSupplierTToTotal = _.sum(minPartSupplierTToArray.map(o => o.data))


      
      // console.log('minPartSupplierTTo',minPartSupplierTToArray)
      // Recommend \n Scenario
      // 加权汇总
      let weightSupplier = []
      
      supplierTemlate.forEach((supplierName, index) => {
        // 分供应商筛选出报价最高和最低的零件
        let baojiaArray = []
        data.forEach((dataItem) => {
          // 取出推荐供应商有效报价的零件价格
          if (dataItem.TTo[index] && dataItem.supplierChosen.includes(supplierName)) {
            baojiaArray.push(dataItem)
          }
        })
        // 求对应供应商的权重
        const weightSupplierItem = this.cacleSc(baojiaArray, index)
        if (Number(weightSupplierItem) > 0) {
          weightSupplier[index] = {
            index,
            data: weightSupplierItem
          }
          // 记录该供应商
          supplier.push(index)
        }
      })
      // supplier = _.uniq(supplier)
      const weightSupplierTotal = _.sum(weightSupplier.map(o => Number(o.data)))
      const res = {
        // 整体最佳
        wholePackage,
        wholePackageIndex,
        // 分组最佳
        bestGroupSupplier,
        bestGroupSupplierIndex,
        // 是否显示分组最佳，默认在无分组的情况下不显示
        isShowGroupStick,
        // 报价都是最低的供应商
        minPartSupplierTToArray,
        minPartSupplierTToTotal,
        // 权重
        weightSupplier,
        weightSupplierTotal,
        // 是否显示第四根柱子
        isShowWeightStick,
        supplier
      }
      console.log(res)
      return res
    }
  }
}
</script>
<style lang="scss" scoped>
.monitorTable {
  ::v-deep .el-table {
    height: 450px;
    .supplier-tto {
      display: flex;
      width: 100%;
      min-height:40px;
      align-items: center;
      /* text-align: center; */
      justify-content: center;
    }
  }
  ::v-deep .el-table--border {
    th,td {
      border-bottom: 1px solid #fff !important;
      border-right: 1px solid #fff !important;
      &.pin {
        background: #95f1ec;
        &.dbl {
          background: #95f1ec;
        }
        .cell {
          color: #094e4a;
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