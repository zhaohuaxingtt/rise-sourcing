<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 15:03:47
 * @LastEditTime: 2021-06-08 19:36:02
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
    :empty-text="$t('LK_ZANWUSHUJU')"
  >
    <template v-for='(item,index) in tableTitle'>
      <!-----------------表格中内容模块------------------------>
      <el-table-column
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
          <div class="headerContent" v-if='scope.column.label == "Supplier"'>
            <div class="c" :style="{width:cWidth}">
              <ul class="ca" style="width:200px;">
                <li v-for='(items,index) in supplierLeftLit' :key='index'>
                  {{items.name}}
                </li>
              </ul>
              <ul class="cb" v-for='(items,index) in centerSupplierData' :key='index'>
                <template v-for="(itemss,index) in supplierLeftLit">
                    <li :key='index'>{{items[itemss.props]}}</li>
                </template>
              </ul>
              <div class="cc" style="width:100px">
                450.000
              </div>
              <div class="cd" style="width:100px">
                450.000
              </div>
            </div>
          </div>
        </template>
        <!----------存在二级表头------>
        <template v-if='item.list && item.list.length >0'>
          <template v-for="(levelTowItem,levelTowIndex) in item.list">
              <el-table-column
                :key="levelTowIndex"
                :label="levelTowItem.i18n ? $t(levelTowItem.i18n) : levelTowItem.label"
                :width="levelTowItem.width"
                :prop='levelTowItem.props'
                align="center"
                :resizable="false"
              />
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
  </div>
</template>
<script>
import {supplierTableTop} from './data'
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
    centerSupplierData:{
      type:Array,
      default:()=>[{},{}]
    },
    supplierLeftLit:{
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return {
    cWidth:'0px',
    supplierTableTop:supplierTableTop
  }},
  watch:{
    tableTitle(){
      this.$nextTick(()=>{
        setTimeout(() => {
           this.getTopWidth() 
        }, 500);
      })
    }
  },
  methods:{
    getTopWidth(){
      this.cWidth = this.$el.querySelector('.el-table__header').offsetWidth - 100 + 'px'
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
  }
  .headerContent{
    position: relative;
    .c{
      position: absolute;
      height: auto;
      width: 100px;
      //background-color: red;
      z-index: 123;
      bottom: 58px;
      left:-13px;
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
        }
        &:first-child{
          background-color:rgba(22, 99, 246, 0.17);
        }
      }
      .cb{
        flex: 1;
      }
      .cc{
        display: flex;
        border-right: 1px solid #C5CCD6;
        align-items: center;
        justify-content: center;
        background-color:rgba(22, 99, 246, 0.17);
      }
      .cd{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .selsTable{
    width: 100%;
    overflow-x: scroll;
    padding-top: 320px;
  }

</style>