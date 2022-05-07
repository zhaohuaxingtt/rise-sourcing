<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2022-04-29 12:33:31
 * @LastEditors: Please set LastEditors
-->

<template>
  <div class="monitorTable">
    <el-table
      :key="'tableKey_'+tableKey"
      fit
      border
      tooltip-effect='light'
      :data='data'
      :cell-class-name="getCellClass"
      width="100%"
      default-expand-all
      @selection-change="handleSelectionChange"
      v-bind="$attrs"
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
        min-width="66"
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
        label="Part"
        min-width="110"
        >
      <template slot-scope="scope">
        <p class="partName">{{scope.row.partNo || ''}}</p>
        <p class="partDeName" :title="scope.row.partNameDe || ''">{{scope.row.partNameDe || ''}}</p>
      </template>
      </el-table-column>
      <el-table-column
        align='center'
        prop="partPrjCode"
        label="FS/GS/SP No."
        min-width="120"
        >
      </el-table-column>
      <el-table-column
        align='center'
        prop="factoryEn"
        label="Factory">
      </el-table-column>

      <!-- 循环取出厂商以及TTO -->
      <el-table-column
        align='center'
        min-width="100"
        label-class-name="tline"
        v-for="(head, hindex) in supplier"
        :key="hindex"
        >
        <template slot="header">
          <div class="auoHeader">
            <p class="titleCN">{{head}}</p>
            <p class="titleEN" :title="supplierEN[hindex] || ''">{{supplierEN[hindex] || ''}}</p>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="supplier-tto" @click="handleCellClick(scope.row, hindex)">
            <span v-if="scope.row.TTo && scope.row.TTo[hindex]">{{ thousandsFilter(scope.row.TTo[hindex])}}</span>
          </div>
        </template>
      </el-table-column>
      

      <!-- 循环取出供应商百分比分布 -->
      <template
        v-for="hindex in (supplier || []).length"
      >
        <el-table-column
          align='center'
          width="120"
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
import filters from "@/utils/filters"
import _ from 'lodash'

export default {
  mixins: [ filters ],
   props:{
    key:{type: String},
    tableData:{type:Array},
    selection:{type:Boolean,default:true},
    index:{type:Boolean,default:false},
    indexLabel:{type:String,default:'#'},
    height:{type:Number||String, default:'380'},
    batchEdit: {type:Boolean, default:false},
    // 供应商数组
    supplier: {type:Array, default: () => ([])},
    // 供应商英文
    supplierEN: {type:Array, default: () => ([])}
  },
  components: {iInput},
  data() {
    return {
      isEdit: false,
      data: this.tableData,
      spanArr: [],
      selectedData: [],
      chartData: [],
      combineVisible: false,
      tableKey:0,
    }
  },
  watch: {
    tableData() {
      this.init()
    },
  },
  created(){
    this.init()
  },
  methods: {
    thousandsFilter(value) {
      return filters.filters.thousandsFilter(value, 0)
    },
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
      let state = true
      let info = ''
      this.data.forEach(row => {
        const percent = row.percent || []
        const count = _.sum(percent.map(o => Number(o)))
        // 校验是否包含负数比例
        const containNGNumber = percent.filter(m => m < 0).length
        if (state && count > 100) {
          state = false
          info = this.language('FENEBUCHAOGUOHUNDRENDPERCENT', '定点份额不超过100%')
        }
        if (state && isNaN(count) || containNGNumber) {
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
      if (count > 100) {
        iMessage.error(this.language('FENEBUCHAOGUOHUNDRENDPERCENT', '定点份额不超过100%'))
        return
      }
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
      supplierChosen.forEach((supName, index) => {
        // 找到对应的供应商修改的tto
        const value = item.percent[index]
        // 存在这个供应商推荐比例
        const targetP = percentCalc.find(pitem => pitem.key === supName)
        if (targetP) {
          Vue.set(targetP, 'value', Number(value) || 0)
        } else {
          percentCalc.push({
            key: supName,
            value: Number(value) || 0
          })
        }
      })
      Vue.set(item, 'percentCalc', percentCalc)
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
      ++this.tableKey;
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
    cacleSc(data = [], supplierName = null) {
      let count = 0
      let formula = [] // 计算公式,用于debug
      const weightedArray = []
      data.forEach((item) => {
        const tto = item.TTo || []
        if (supplierName !== null) {
          const percentCalc = item.percentCalc || []
          const targetPitem = percentCalc.find(p => p.key === supplierName)
          const bdlInfo = (item.bdlInfoList || []).find(o => o.supplierName === supplierName)
          const t = bdlInfo && !isNaN(Number(bdlInfo.tto)) ? Number(bdlInfo.tto) : 0
          if (targetPitem) {
            // ----***注意:这里是百分比,必须保留2位小数***----
            let percent = Number(((targetPitem.value || 0) / 100).toFixed(2))
            // ----***注意:这里是百分比,必须保留2位小数***----
            percent = isNaN(percent) ? 0 : percent
            weightedArray.push(Number(t) * percent)
            // 统计计算公式
            formula.push(`${Number(t)}x${percent}`)
          }
        }
      })
      count = _.sum(weightedArray)

      const formulaStr = formula.join('+')
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
          data: _.sum(wholePackageData),
          groupId: data[0] && data[0].groupId || '',
          groupName: data[0] && data[0].groupName || '',
        })
      })
      bestGroup.map(o => {
        o.data = Number(o.data)
        return o
      })
      if (!bestGroup.length) return false
      // 根据TTO之和排序
      bestGroup = _.sortBy(bestGroup, ['data'])
      // console.log('--bestGroup', bestGroup)
      // 返回零件之和最低的供应商
      return bestGroup[0]
    },
    // 合并求和相同的供应商
    uniqueCountSupplier(data=[]) {
      const res = []
      // 取出所有的不重复供应商列表
      let supplierIds = _.uniq(data.map(o => o.index)) || []
      supplierIds.forEach(supId => {
        const total = _.sum(data.filter(o => o.index === supId).map(o => (Number(o.data) || 0)))
        res.push({
          index: supId,
          data: total
        })
      })
      return res
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
      // console.log('countSupplier', countSupplier)
      const wholePackage = Number(countSupplier[0] && countSupplier[0].data).toFixed(0) || 0
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
        // console.log('最低tto-group', itemBestGroup)
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
      const bestGroups = _.cloneDeep(bestGroup)
      bestGroup = this.uniqueCountSupplier(bestGroup)
      bestGroup = _.sortBy(bestGroup, ['data'])
      // console.log('bestGroup', bestGroup)
      // 筛选分组最低数据，暂时没有用
      const bestGroupTotal = bestGroup[0].data
      const bestGroupSupplier = [bestGroup[0].data]
      const bestGroupSupplierIndex = bestGroup[0].index
      // 分组数据
      const bestGroupSupplierTotal = _.sum(bestGroup.map(o => (Number(o.data) || 0)))
      bestGroupSupplier.push(bestGroupTotal)
      // 记录该供应商
      supplier.push(bestGroupSupplierIndex)
      
      // console.log('weightSupplier', weightSupplier, unGroupedList)


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
        let baojiaArray = []
        data.forEach((dataItem) => {
          // 取出推荐供应商有效报价的零件价格
          if (dataItem.TTo[index] && dataItem.supplierChosen.includes(supplierName)) {
            baojiaArray.push(dataItem)
          }
        })
        // 求对应供应商的权重
        const weightSupplierItem = this.cacleSc(baojiaArray, supplierName)
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
        bestGroup,
        // debugger时候用，未合并之前的最佳分组数据列表
        bestGroups,
        bestGroupSupplier,
        bestGroupSupplierIndex,
        bestGroupSupplierTotal,
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
        supplier,
        // 供应商名称列表
        supplierList: this.supplier
      }
      return res
    }
  }
}
</script>
<style lang="scss" scoped>
.monitorTable {
  width: max-content;
  ::v-deep .el-table {
    // height: 450px;
    .el-table__header {
      background-color: #e8efff;
    }
    tr:nth-child(even) {
      td,th {
        background-color: #f7faff;
      }
    }
    .supplier-tto {
      display: flex;
      width: 100%;
      min-height:40px;
      align-items: center;
      /* text-align: center; */
      justify-content: center;
    }
    .el-table__header {
      border-bottom: 1px solid #fff;
    }
  }
  ::v-deep .el-table--border {
    border: 0px !important;
    &:after,&:before {
      background-color: #fff;
    }
    th,td {
      border-bottom: 1px solid #fff !important;
      border-right: 1px solid #fff !important;
      &.pin {
        background: #e8f5fb !important;
        &.dbl {
          background: #effbfb !important;
        }
        .cell {
          color: #00C1B9;
          font-weight: bold;
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
    .titleCN {
      padding: 0px 10px;
      height: 35px;
      line-height: 35px;
    }
    .titleEN {
      height: 35px;
      line-height: 35px;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 0 5px;
      box-sizing: border-box;
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
  .partDeName {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

</style>