<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 15:03:47
 * @LastEditTime: 2021-08-30 12:03:40
 * @LastEditors: Please set LastEditors
 * @Description: 特殊表格实现
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\table.vue
-->
<template>
<div class="selsTable" :style="{paddingTop:paddingTop}">
  <el-table
    tooltip-effect="light"
    :height="height"
    :data="tableData"
    v-loading="loading"
    :cell-class-name='cellClassName'
    :empty-text="$t('LK_ZANWUSHUJU')"
    ref='table'
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
          <el-tooltip :content="scope.column.label" effect='light'><span class="labelHader">{{scope.column.label}}</span></el-tooltip>
          <div class="headerContent" v-if='scope.column.label == "Supplier"'>
            <div class="c" :style="{width:cWidth}">
              <ul class="ca" :style="{width:tableTitle.find(i=>i.label == 'Ratings').list.length * 50 + 100 + 'PX'}">
                <li v-for='(items,index) in supplierLeftLit' :key='index'>
                  {{items.name}}
                </li>
              </ul>
              <ul class="cb" v-for='(items,index) in centerSupplierData' :key='index'>
                <template v-for="(itemss,index) in supplierLeftLit">
                    <li :key='index' v-if='itemss.name != "F-Target"'>{{items[itemss.props]}}</li>
                    <li :key="index" v-else :class="isLower">
                      <span>{{items['cfPartAPrice']}}</span>
                      <span></span>
                      <span>{{items['cfPartBPrice']}}</span>
                    </li>
                </template>
              </ul>
              <div class="cc" style="width:100px">
                <ul>
                  <template v-for="(itemss,index) in supplierLeftLit">
                      <li :key='index' v-if='itemss.name == "KM"'>{{kmAPrice}}</li>
                      <li :key="index" v-else class=""></li>
                  </template>
                </ul>
              </div>
              <div class="cd" style="width:100px">
                <ul>
                  <template v-for="(itemss,index) in supplierLeftLit">
                      <li :key='index' v-if='itemss.name == "KM"'>{{kmTooling}}</li>
                      <li :key='index' v-else-if='itemss.name == "Planned Invest"'>{{budget}}</li>
                      <li :key="index" v-else class=""></li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </template>
        <!----------存在二级表头------>
        <template v-if='item.list && item.list.length >0'>
          <template v-for="(levelTowItem,levelTowIndex) in item.list">
              <el-table-column
                :key="levelTowIndex"
                :width="levelTowItem.width"
                :prop='levelTowItem.props'
                align="center"
                :resizable="false"
              >
              <template slot="header">
                <el-tooltip :content='levelTowItem.label' effect='light'>
                  <span class="overText">{{levelTowItem.label}}</span>
                </el-tooltip>
              </template>
              </el-table-column>
          </template>
        </template>
        <!--------------时间格式------------>
        <template slot-scope="scope">
          <template v-if ='removeKeysNumber(item.props) == "developmentCost"'>
            <span>{{scope.row[item.props]}}</span>
            <span style="color:red;" v-if='scope.row[getPorpsNumber(item.props)+"developmentCostHasShare"]'>*</span>
          </template>
          <template v-else-if ='removeKeysNumber(item.props) == "tooling"'>
            <span>{{scope.row[item.props]}}</span>
            <span style="color:red;" v-if='scope.row[getPorpsNumber(item.props)+"toolingHasShare"]'>*</span>
          </template>
          <template v-else-if='removeKeysNumber(item.props) == "supplierSopDate"'>
            <span>{{scope.row[item.props]?moment(scope.row[item.props]).format("YYYY-MM-DD"):''}}</span>
          </template>
          <template v-else-if='removeKeysNumber(item.props) == "ltcStaringDate"'>
                <span>{{scope.row[item.props]?moment(scope.row[item.props]).format("YYYY-MM"):''}}</span>
              </template>
          <template v-else-if='removeKeysNumber(item.props) == "Quotationdetails"'>
             <span class="link" @click="optionPage(scope.row,getPorpsNumber(item.props))">查看详情</span>
          </template>     
          <template v-else-if="removeKeysNumber(item.props) == 'fTarget'">
            <span :class="{lvse:lvseFn(scope.row,item.props,'fTarget')}">{{scope.row[item.props]}}</span>
          </template>
           <template v-else-if='item.props== "partName"'>
            <span style="color:red;" :class="{lvse:lvseFn(scope.row,item.props,'partName')}">{{scope.row[item.props]}}</span>
          </template>
          <!-- <template v-else-if='removeKeysNumber(item.props) == "lcAPrice"'>
            <span class="priceUnderLinePrice">{{scope.row[item.props]}}</span>
          </template>
              <template v-else-if='removeKeysNumber(item.props) == "lcBPrice"'>
                  <span class="priceUnderLinePrice">{{scope.row[item.props]}}</span>
              </template> -->
          <template v-else slot-scope="scope">
            <span>{{scope.row[item.props]}}</span>
          </template>
        </template>

      </el-table-column>
    </template>
  </el-table>
  </div>
</template>
<script>
import {supplierTableTop,removeKeysNumber,getPorpsNumber} from './data'
export default{
  inject:['getbaseInfoData'],
  props:{
    kmAPrice:{
      type:String,
      default:''
    },
    kmTooling:{
      type:String,
      default:''
    },
    budget:{
      type:String,
      default:''
    },
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
    },
    cWidth:{
      type:String,
      default:'0px'
    }
  },
  data(){
    return {
    supplierTableTop:supplierTableTop
  }},
  watch:{
    tableData(){
        setTimeout(() => {
           this.getTopWidth() 
        }, 2000);
    }
  },
  methods:{
    getPorpsNumber(props){return getPorpsNumber(props)},
    optionPage(items,index){
      const router = this.$router.resolve({
        path:'/sourceinquirypoint/sourcing/supplier/quotationdetail',
        query:{
          rfqId:this.$route.query.id,
          round:this.getbaseInfoData().currentRounds,
          supplierId:items.supplierId,
          fsNum:items[index+'partPrjCode'],
          fix:true,
          sourcing:true
        }
      })
      window.open(router.href,'_blank')
    },
    moment(date){
      // eslint-disable-next-line no-undef
      return moment(date)
    },
    removeKeysNumber(key){
      return removeKeysNumber(key)
    },
    doLayout(){
      this.$refs.table.doLayout()
    },
    lvseFn(row,props,String) {
      console.log('lvseFn',row,props,String);
      try {
        return row[getPorpsNumber(props)+String] == 1
      } catch (error) {
        return false
      }
    },
    cellClassName({row, column, rowIndex, columnIndex}) {
      console.log(column);
      if(column.label =='LC A Price' ) {
        return 'priceUnderLinePrice'
      }      
      if(column.property =='lcBPrice' ) {
        return 'priceUnderLinePrice'
      }      

      
    }
  }, 
  computed:{
    paddingTop:function(){
      return this.supplierLeftLit.length * 30 + 20 + 'PX'
    }
  }
}
</script>
<style lang='scss' scoped>
  .overText{
    overflow: hidden;
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 15px;
    line-height: 100%;
  }
  
  .ftaget{
    text-align: left;
    span{
      width: 100PX;
      display: inline-block;
      height: 100%;
      border-right: 1px solid #C5CCD6;
      text-align: center;
      float: left;
    }
  }
  .el-table {
    overflow: visible;
    ::v-deep.cell{
      overflow: visible;
    }
    ::v-deep.priceUnderLinePrice{
      border-bottom:3px solid blue;
    }
    ::v-deep .el-table__header-wrapper{
      overflow: visible;
      
      .labelHader{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inherit;
      }
    }
    ::v-deep.el-table__header{
      th{
        overflow: visible;
      }
    }
    ::v-deep.el-table__body-wrapper{
      overflow:visible;
      height: auto!important;
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
      bottom: 49PX;
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
        ul{
          background-color: transparent;
          border-right: none;
          li{
            border-bottom: none;
          }
        }
      }
      .cd{
        display: flex;
        align-items: center;
        justify-content: center;
        ul{
          background-color: transparent;
          border-right: none;
          li{
            border-bottom: none;
          }
        }
      }
    }
  }
  .selsTable{
    width: 100%;
    overflow-x: scroll;
  }

</style>