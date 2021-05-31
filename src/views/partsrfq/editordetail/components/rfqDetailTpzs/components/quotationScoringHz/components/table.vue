<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 15:03:47
 * @LastEditTime: 2021-05-29 21:57:34
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
        :resizable="false"
      >
        <!----------在表头上方需要显示评分的点，插入表头标签------>
        <template slot="header" slot-scope="scope">
          <span>{{scope.column.label}}</span>
          <div class="headerContent" v-if='scope.column.label == "EBR"'>
            <div class="c" :style="{width:cWidth}">
              <ul style="width:99.5px">
                <li></li>
                <li>EP</li>
                <li>MQ</li>
                <li>PL</li>
              </ul>
        <!----------在表头上方动态循环点------>
              <template v-for='(rating,index) in ratingList'>
                <ul :key="index" class="lastChild">
                  <li>{{rating.name}}</li>
                  <li>{{rating.ep}}</li>
                  <li>{{rating.mq}}</li>
                  <li>{{rating.pl}}</li>
                </ul>
              </template>
            </div>
          </div>
        </template>
        <template slot-scope="scope">
          <span>{{scope.row[item.props]}}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
  </div>
</template>
<script>
export default{
  props:{
    tableData:{
      type:Array,
      default:()=>[]
    },
    tableTitle:{
      type:Array,
      default:()=>{}
    }
  },
  computed:{
    cWidth(){
      const index = this.tableTitle.findIndex((item)=>item.label == 'EBR')
      return (this.tableTitle.length - index) * 100 + 'px'
    },
    ratingList(){
      return [
        {name:'shanghai',ep:'A',mq:'A',pl:'A'},
        {name:'shanghai',ep:'A',mq:'A',pl:'A'}
      ]
    }
  },
  methods:{
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
    },
    /**
     * @description: 在表格内容中，加入特殊颜色 
     * @param {*} row
     * @param {*} rowIndex
     * @return {*}
     */
    tableRowClassName({row,rowIndex}){
      if(row.b == "Subtotal"){
        return 'blueclass'
      }
      if(rowIndex == this.tableData.length -1 || rowIndex == this.tableData.length -2){
        return 'lineBlueClass'
      }
    },
    cellClassName({row, column, rowIndex, columnIndex}){
      if(column.label == 'EBR' && rowIndex <= this.tableData.length - 4){
        return 'leftRightBorder'
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
  .el-table {
    overflow: visible;
    ::v-deep.cell{
      overflow: visible;
    }
    ::v-deep .el-table__header-wrapper{
      overflow: visible;
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
  }
  .headerContent{
    position: relative;
    .c{
      position: absolute;
      height: 150px;
      width: 100px;
      //background-color: red;
      z-index: 123;
      bottom: 38px;
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