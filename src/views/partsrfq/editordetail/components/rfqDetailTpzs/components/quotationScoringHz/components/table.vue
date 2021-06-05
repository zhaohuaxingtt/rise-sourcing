<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 15:03:47
 * @LastEditTime: 2021-06-05 11:16:22
 * @LastEditors: Please set LastEditors
 * @Description: 特殊表格实现
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\table.vue
-->
<template>
<div class="selsTable">
  <el-table 
    tooltip-effect="light"
    :height="height"
    :data="tableData"
    v-loading="loading"
    @selection-change="handleSelectionChange"
    @cell-click="handleCellClick"
    :empty-text="$t('LK_ZANWUSHUJU')"
    :row-class-name="tableRowClassName"
    :header-cell-class-name='headerClassName'
    :cell-class-name='cellClassName'
    :span-method="spanMethod"
  >
    <template v-for='(item,index) in tableTitle'>
      <!-----------------存在index selection情况------------------------>
      <el-table-column
        :key="index"
        v-if="['selection', 'index'].includes(item.type)"
        :type="item.type"
        :label="item.i18n ? $t(item.i18n) : item.label"
        :width="item.width || 50"
        align="center"
        :resizable="false"
        :selectable='selectable'
      />
      <!-----------------表格中内容模块------------------------>
      <el-table-column
        v-else
        :key="index"
        :label="item.i18n ? $t(item.i18n) : item.label"
        :width="item.width"
        :prop='item.props'
        align="center"
        :sortable='item.props == "cfPartAPrice"'
        :resizable="false"
      >
        <!----------在表头上方需要显示评分的点，插入表头标签------>
        <template slot="header" slot-scope="scope">
          <span>{{scope.column.label}}</span>
          <div class="headerContent" v-if='scope.column.label == "EBR"'>
            <div class="c" :style="{width:cWidth}">
              <ul style="width:99.5px">
                <li></li>
                <li v-for='(items,index) in ratingList.firstTile' :key='index'>{{items}}</li>
              </ul>
        <!----------在表头上方动态循环点------------------------>
              <template v-for='(rating,index) in ratingList.ratingList'>
                <ul :key="index" class="lastChild">
                  <li v-for='(itemsss,index) in rating' :key='index'>{{itemsss}}</li>
                </ul>
              </template>
            </div>
          </div>
        </template>
        <template slot-scope="scope">
          <template v-if='removeKeysNumber(item.props) == "cfPartAPrice"'>
              <span :class="{chengse:scope.row[item.props].cfPartAPriceStatus == 2}">{{scope.row[item.props]}}</span>
          </template>
          <template v-else-if='removeKeysNumber(item.props) == "lcAPrice"'>
              <span :class="{lvse:scope.row[item.props] == 1}">{{scope.row[item.props]}}</span>
          </template>
          <span v-else>{{scope.row[item.props]}}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
  </div>
</template>
<script>
import {removeKeysNumber,getPorpsNumber} from './data'
export default{
  props:{
    tableData:{
      type:Array,
      default:()=>[]
    },
    tableTitle:{
      type:Array,
      default:()=>{}
    },
    ratingList:{
      type:Array,
      default:()=> {}
    }
  },
  inject:['vm'],
  computed:{
    cWidth(){
      const index = this.tableTitle.findIndex((item)=>item.label == 'EBR')
      return (this.tableTitle.length - index) * 100 + 'px'
    },
    spanArr(){
      return this.rowspan(this.tableData,'groupId',null)
    }
  },
  methods:{
        /**
     * 分组函数，用于element-ui table 分组合并
     * target 目标数组
     * groupKey 同一组打标字段名, 
     * cb 回调函数，提供格式化好的原数组，
     */
    rowspan(dataList = [], groupKey = 'groupId', cb = null) {
      // 缓存每行的span记录
      const spanArr = []
      // 遍历dataList index
      let position = 0
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
    getPorpsNumber(key){
      return getPorpsNumber(key)
    },
    removeKeysNumber(data){
      return removeKeysNumber(data)
    },
    /**
     * @description: 为表头特殊行加入border 
     * @param {*} row
     * @param {*} column
     * @param {*} rowIndex
     * @param {*} columnIndex
     * @return {*}
     */
    headerClassName({row, column, rowIndex, columnIndex}){
      if(column.label == 'EBR'){
        return 'leftRightBorder'
      }
      if(this.vm.reRenderLastChild.name == column.label){
        return 'rightBorder'
      }
    },
    /**
     * @description: 在表格内容中，加入特殊颜色 
     * @param {*} row
     * @param {*} rowIndex
     * @return {*}
     */
    tableRowClassName({row,rowIndex}){
      if(row.partNo == "Subtotal"){
        return 'blueclass'
      }
      if(rowIndex == this.tableData.length -1 || rowIndex == this.tableData.length -2){
        return 'lineBlueClass'
      }
    },
    /**
     * @description: 为表格表头新增class 
     * @param {*} row
     * @param {*} column
     * @param {*} rowIndex
     * @param {*} columnIndex
     * @return {*}
     */
    cellClassName({row, column, rowIndex, columnIndex}){
      if(column.label == 'EBR' && rowIndex <= this.tableData.length - 4){
        return 'leftRightBorder'
      }
      if(column.label == 'Group' && row.groupId){
        return 'bgcoor'
      }
      if(this.vm.reRenderLastChild.name == removeKeysNumber(column.label)){
        return 'rightBorder'
      }
    },
    selectable(row, index){
      if( index <= this.tableData.length - 4){
        return true
      }
    },
    handleSelectionChange(val){
      this.$emit('handleSelectionChange',val)
    }
  }
}
</script>
<style lang='scss' scoped>
  .lvse{
    color:$color-green;
  }
  .chengse{
    color: $color-orange;
  }
  .el-table {
    overflow: visible;
    ::v-deep.cell{
      overflow: visible;
    }
    ::v-deep .el-table__header-wrapper{
      overflow: visible;
      .cell{
        height: 30px;
        span{
          display: inline-block;
          word-break: break-all;
          overflow: hidden;
        }
        .el-checkbox{
          width: 18px;
        }
        .caret-wrapper{
          top: -8px;
        }
      }
    }
    ::v-deep.el-table__header{
      th{
        overflow: visible;
      }
    }
    ::v-deep.el-table__body-wrapper{
      overflow:visible
    }
    ::v-deep.blueclass{
      background-color: rgba(197, 215, 253, 1);
      .el-checkbox{
        display: none;
      }
      &:hover{
        background-color: none;
      }
    }
    ::v-deep.lineBlueClass{
      background-color: rgba(247, 250, 255, 1);
      .el-checkbox{
        display: none;
      }
      &:hover{
        background-color: rgba(247, 250, 255, 1)!important;
      }
    }
    ::v-deep.leftRightBorder{
      border-left: 1px solid #C5CCD6;
      border-right: 1px solid #C5CCD6;
    }
    ::v-deep .bgcoor{
      background: rgba(247, 250, 255, 1);
    }
    ::v-deep .rightBorder{
      border-right: 1px solid #C5CCD6;
    }
  }
  .headerContent{
    position: relative;
    .c{
      position: absolute;
      width: 100px;
      //background-color: red;
      z-index: 123;
      bottom: 45px;
      left:-14px;
      border: 1px solid #C5CCD6;
      border-bottom: none;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      overflow:hidden;
      display: flex;
      ul{
        border-right: 1px solid #C5CCD6;
        li{
          border-bottom: 1px solid #C5CCD6;
          height: 38px;
          line-height: 38px;
          &:last-child{
            border-bottom: none;
          }
          &:first-child{
            background-color:rgba(22, 99, 246, 0.17);
          }
        }
      }
      .lastChild{
        flex: 1;
        &:last-child{
          border-right: 0px;
        }
      }
    }
  }
  .selsTable{
    width: 100%;
    overflow-x: scroll;
    padding-top: 200px;
  }
</style>