<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 15:03:47
 * @LastEditTime: 2021-09-16 18:00:19
 * @LastEditors: Please set LastEditors
 * @Description: 特殊表格实现
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\table.vue
-->
<template>
  <div class="conent">
    <div class="selsTable">
      <el-table 
        tooltip-effect="light"
        :height="height"
        :data="tableData"
        v-loading="loading"
        @cell-click="handleCellClick"
        :empty-text="$t('LK_ZANWUSHUJU')"
        :row-class-name="tableRowClassName"
        :header-cell-class-name='headerClassName'
        :cell-class-name='cellClassName'
        :span-method="spanMethod"
        @sort-change="sortChangeTable"
      >
        <template v-for='(item,index) in tableTitle'>
          <!-----------------存在index selection情况------------------------>
          <el-table-column
            :key="index"
            v-if="item.props == 'groupName'"
            :label="item.i18n ? $t(item.i18n) : item.label"
            :width="item.width || 50"
            align="center"
            fixed
            :prop='item.prop'
          >
            <template slot-scope="scope">
                <el-checkbox @change="handleSelectionChange(scope.row,scope.$index)" class="checkBox" v-model="scope.row.active"><span>{{scope.row[item.props]}}</span></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            v-else-if="item.props == 'cfPartAPrice' || item.props == 'partNo'"
            :key="index"
            :label="item.i18n ? $t(item.i18n) : item.label"
            :width="item.width"
            :prop='item.props'
            align="center"
            :sortable='"custom"'
          >
            <template slot-scope="scope">
              <span :class="{chengse:(scope.row['cfPartAPriceStatus'] == 2 && item.props != 'partNo')}">{{scope.row[item.props]}}</span>
            </template>
          </el-table-column>
          <!-----------------表格中内容模块------------------------>
          <el-table-column
            v-else
            :fixed='item.props == "partName" || item.props == "cfPartBPrice"'
            :key="index"
            :label="item.i18n ? $t(item.i18n) : item.label"
            :width="item.width"
            :prop='item.props'
            align="center"
          >
            <!----------在表头上方需要显示评分的点，插入表头标签------>
            <template slot="header" slot-scope="scope">
              <el-tooltip :content="scope.column.label" effect='light'><span class="labelHader">{{scope.column.label}}</span></el-tooltip>
              <div class="headerContent" v-if='scope.column.label == "EBR"'>
                <div class="c" :style="{width:cWidth}" v-if='ratingList.firstTile.length > 0'>
                  <ul style="width:99.5px">
                    <li></li>
                    <template v-for='(items,index) in ratingList.firstTile'>
                      <template v-if='ratingList.firstTile.length > 1'>
                        <li :key='index' v-if='!items==""'>{{items}}</li>
                      </template>
                      <template v-else>
                        <li :key='index'>{{items}}</li>
                      </template>
                    </template>
                  </ul>
            <!----------在表头上方动态循环点------------------------>
                  <template v-for='(rating,index) in ratingList.ratingList'>
                    <ul :key="index" class="lastChild">
                      <template v-for='(itemsss,indexss) in rating'>
                        <!--------------------------------判断逻辑：只要有评分，肯定是有评分部门，如果评分部门为空，则处理当前行不显示------------>
                        <template v-if="indexss > 0">
                          <li :key='indexss' v-if='ratingList.firstTile[indexss-1]'>
                            <span style="margin-rigth:10px;">{{itemsss.rate}}</span>
                            <span><icon v-if='!itemsss.isAllPartRateConsistent' name='icontishi-cheng' symbol></icon></span>
                          </li>
                        </template>
                        <li v-else :key='indexss'>
                          <span>
                            {{itemsss.rate}}
                          </span>
                          <el-tooltip  effect="light" v-if='itemsss.isRateRisk && !isPreview' :content="`FRM评级：${itemsss.isAllPartRateConsistent}`">
                              <icon name='icontishi-cheng' symbol></icon>
                          </el-tooltip>
                        </li>
                      </template>
                    </ul>
                  </template>
                </div>
              </div>
            </template>
            <template slot-scope="scope">
              <template v-if='removeKeysNumber(item.props) == "cfPartAPrice"'>
                  <span :class="{chengse:scope.row['cfPartAPriceStatus'] == 2}">{{scope.row[item.props]}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "cfPartBPrice"'>
                  <span :class="{chengse:scope.row['cfPartBPriceStatus'] == 2}">{{scope.row[item.props]}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "lcAPrice"'>
                  <span :class="{lvse:lvseFn(scope.row,item.props,'lcAPriceStatus')}">{{scope.row[item.props]}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "lcBPrice"'>
                  <span :class="{lvse:lvseFn(scope.row,item.props,'lcBPriceStatus')}">{{scope.row[item.props]}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "tto"'>
                  <span :class="{lvse:lvseFn(scope.row,item.props,'ttoStatus')}">{{scope.row[item.props]}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "Quotationdetails" && scope.$index < tableData.length -3'>
                <span class="link" @click="optionPage(scope.row,getPorpsNumber(item.props))">查看详情</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "supplierSopDate"'>
                <span>{{scope.row[item.props]?moment(scope.row[item.props]).format("YYYY-MM-DD"):''}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "ltcStaringDate"'>
                <span>{{scope.row[item.props]?moment(scope.row[item.props]).format("YYYY-MM"):''}}</span>
              </template>
              <template v-else-if ='removeKeysNumber(item.props) == "developmentCost"'>
                <span>{{scope.row[item.props]}}</span>
                <span style="color:red;" v-if='scope.row[getPorpsNumber(item.props)+"developmentCostHasShare"]'>*</span>
              </template>
              <template v-else-if ='removeKeysNumber(item.props) == "tooling"'>
                <span>{{scope.row[item.props]}}</span>
                <span style="color:red;" v-if='scope.row[getPorpsNumber(item.props)+"toolingHasShare"]'>*</span>
              </template>
              <template v-else>
                <span>{{scope.row[item.props]}}</span>
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script>
import {removeKeysNumber,getPorpsNumber} from './data'
import {icon} from 'rise'
import moment from 'moment'
export default{
  components:{icon},
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
    },
    round:{
      type:String,
      default:''
    }
  },
  inject:['vm','getbaseInfoData'],
  filters:{
    zeroTonull:function(val){
      if(val == 0){ 
        return ''
      }else{
        return val
      }
    }
  },
  computed:{
    cWidth(){
      const index = this.tableTitle.findIndex((item)=>item.label == 'EBR')
      return (this.tableTitle.length - index) * 100 + 'px'
    },
    spanArr(){
      return this.rowspan(this.tableData,'groupId',null)
    },
    isPreview(){
        return this.$store.getters.isPreview;
    }
  },
  methods:{
    sortChangeTable({column, prop, order}){
      this.$emit('sortChangeTabless',{prop:prop,props:order})
    },
    moment(date){
      return moment(date)
    },
    lvseFn(row,props,String){
      try {
        return row[getPorpsNumber(props)+String] == 1
      } catch (error) {
        return false
      }
    },
    optionPage(items,index){
      const router = this.$router.resolve({
        path:'/sourceinquirypoint/sourcing/supplier/quotationdetail',
        query:{
          rfqId:this.$route.query.id,
          round:this.round,
          supplierId:items[index+'supplierId'],
          fsNum:items.partPrjCode,
          fix:true,
          sourcing:true
        }
      })
      window.open(router.href,'_blank')
    },
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
          if(item[groupKey] && item[groupKey] === dataList[index-1][groupKey] && item[groupKey] !='-' ){
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
        return 'rightBorder'
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
        return 'rightBorder'
      }
      if(column.label == 'Group' && row.groupId && row.groupId != '-'){
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
    /**
     * @description: 自定义表格选中。 
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(e,index){
      this.$set(this.tableData,index,e)
      this.$emit('handleSelectionChange',this.tableData.filter(items=>items.active))
    }
  }
}
</script>
<style lang='scss' scoped>
  .checkBox{
    ::v-deep.el-checkbox__label{
      display: block;
      padding-left: 0px;
      font-size: 12px;
    }
  }
  .lvse{
    color:$color-green;
  }
  .chengse{
    color: $color-delete;
  }
  .el-table {
    position: initial;
    overflow: visible;
    ::v-deep.cell{
      overflow: visible;
    }
    ::v-deep .el-table__header-wrapper{
      overflow: visible;
      .cell{
        span{
          width: 100%;
        }
        .el-checkbox{
          width: 18px;
        }
        .caret-wrapper{
          top: -8px;
        }
        .labelHader{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    ::v-deep.el-table__header{
      th{
        overflow: visible;
      }
    }
    ::v-deep.el-table__body-wrapper{
      overflow:visible;
      height:auto!important;
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
      background: #f5f7fa;
      border-bottom: 1px solid #e6eaef;
      &:last-child{
        border-bottom: none;
      }
    }
    ::v-deep .rightBorder{
      border-right: 1px solid #C5CCD6;
    }
    ::v-deep .is-sortable{
      .cell{
          display: flex;
          .caret-wrapper{
            height: 20px;
            .ascending{
              top: -2px;
            }
            .descending{
              bottom: -6px;
            }
          }
      }
    }
  }
  .headerContent{
    position: relative;
    .c{
      position: absolute;
      width: 100px;
      //background-color: red;
      z-index: 123;
      bottom: 34px;
      left:-9px;
      border: 1px solid #C5CCD6;
      border-bottom: none;
      border-left:none;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      overflow:hidden;
      display: flex;
      border-top: none;
      ul{
        border-right: 1px solid #C5CCD6;
        border-top: 1px solid #C5CCD6;
        &:nth-child(2){
          border-top-left-radius: 5px;
          overflow: hidden;
        }
        &:first-child{
          border-top-right-radius: 3px;
          overflow: hidden;
          border-right: 0px;
          border: none;
          li{
            border-right: 1px solid #C5CCD6;
            &:first-child{
              background-color:white;
              border:none;
              border-right: 1px solid #C5CCD6;
            }
          }
        }
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
        span{
          display: inline;
          margin-right: 10px;
        }
      }
    }
  }
  .selsTable{
    width: 100%;
    padding-top: 200px;
    overflow-x: scroll;
    ::v-deep.el-table__fixed{
          height: 97%!important;
          bottom: -1px;
          padding-top: 200px;
          box-sizing: border-box;
          background-color: white;
          z-index: 124;
          top: 0px;
          .el-table__fixed-header-wrapper{
            position: static;
            top: inherit;
            left: inherit;
          }
          .el-table__fixed-body-wrapper{
            position: static;
            top: inherit;
            left: inherit;
          }
    }
  }
  .conent{
    height: auto;
    position: relative;
  }
</style>