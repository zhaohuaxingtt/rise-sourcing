<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 15:03:47
 * @LastEditTime: 2021-11-05 16:07:13
 * @LastEditors:  
 * @Description: 特殊表格实现,如果fixed模块需要改动，需要将里面部分提为组件。
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\table.vue
-->
<template>
<div class="supplier">
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
            <el-tooltip :content="scope.column.label" effect='light'><p v-if="item.renderHeader" v-html="item.renderHeader"></p><span v-else class="labelHader">{{scope.column.label}}</span></el-tooltip>
            <div class="headerContent" v-if='scope.column.label == "Supplier"'>
              <div class="c" :style="{width:cWidth}">
                <ul class="ca" :style="{width:(100+50*tableTitle[1].list.length) + 'PX'}">
                  <li v-for='(items,index) in supplierLeftLit' :key='index'>
                    {{items.name}}
                  </li>
                </ul>
                <ul class="cb" v-for='(items,index) in centerSupplierData' :key='index'>
                  <template v-for="(itemss,index) in supplierLeftLit">
                     <template v-if='itemss.name != "F-Target"'>
                        <li :key='index' v-if='itemss.props == "partNo"'>{{items[itemss.props] + '-' + items['partName']||''+'-'+items['partNameDe']||''}}</li>
                        <li :key='index' v-else>{{items[itemss.props]}}</li>
                     </template>
                      <li :key="index" v-else class="ftaget">
                        <!-- <span>{{items['cfPartAPrice']}}</span>
                        <span style="width:99PX"></span>
                        <span>{{items['cfPartBPrice']}}</span> -->
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
            <span :class="{price:true,pricea:true,redPrice:getCfPartsAorBprice(centerSupplierData,getPorpsNumber(scope.column.property),'cfPartAPriceStatus') == 2}" v-if='removeKeysNumber(scope.column.property) == "lcAPrice"'>
                {{getCfPartsAorBprice(centerSupplierData,getPorpsNumber(scope.column.property),'cfPartAPrice')}}
            </span>
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
                  <template slot="header" slot-scope="scope">
                    <el-tooltip :content='levelTowItem.label' effect='light'>
                      <span class="overText">{{levelTowItem.label}}</span>
                    </el-tooltip>
                    <span :class="{price:true,priceb:true,redPrice:getCfPartsAorBprice(centerSupplierData,getPorpsNumber(scope.column.property),'cfPartBPriceStatus') == 2}" v-if='removeKeysNumber(scope.column.property) == "lcBPrice"'>{{getCfPartsAorBprice(centerSupplierData,getPorpsNumber(scope.column.property),'cfPartBPrice')}}</span>
                  </template>
                  <template slot-scope="scope">
                    <template v-if='removeKeysNumber(levelTowItem.props) == "lcBPrice"'>
                      <span :class="{buleColor:scope.row[getPorpsNumber(levelTowItem.props)+'suggestPartFlag'] == 1}">{{scope.row[levelTowItem.props]}}</span>
                    </template>
                    <template v-else>
                      <span>{{scope.row[levelTowItem.props]}}</span>
                    </template>
                  </template>
                </el-table-column>
            </template>
          </template>
          <!--------------时间格式------------>
          <template slot-scope="scope">
            <template v-if ='removeKeysNumber(item.props) == "developmentCost"'>
              <el-tooltip  effect='light' v-if='scope.row[getPorpsNumber(item.props)+"developmentCostHasShare"]'>
                <template slot="content">
                  <div>一次性：{{scope.row[getPorpsNumber(item.props)+"developmentCost"]-scope.row[getPorpsNumber(item.props)+"developmentCostShare"]}}RMB</div>
                  <div>分摊：{{scope.row[getPorpsNumber(item.props)+"developmentCostShare"]}}RMB</div>
                </template>
                <span>{{scope.row[item.props]}}</span>
              </el-tooltip>
              <span v-else>{{scope.row[item.props]}}</span>
              <span style="color:red;" v-if='scope.row[getPorpsNumber(item.props)+"developmentCostHasShare"]'>*</span>
            </template>
            <template v-else-if ='removeKeysNumber(item.props) == "tooling"'>
              <el-tooltip  effect='light' v-if='scope.row[getPorpsNumber(item.props)+"toolingHasShare"]'>
                <template slot="content">
                  <div>一次性：{{scope.row[getPorpsNumber(item.props)+"tooling"]-scope.row[getPorpsNumber(item.props)+"toolingShare"]}}RMB</div>
                  <div>分摊：{{scope.row[getPorpsNumber(item.props)+"toolingShare"]}}RMB</div>
                </template>
                <span>{{scope.row[item.props]}}</span>
              </el-tooltip>
              <span v-else>{{scope.row[item.props]}}</span>
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
            <template v-else-if='removeKeysNumber(item.props) == "lcAPrice"'>
              <span :class="{buleColor:scope.row[getPorpsNumber(item.props)+'suggestPartFlag'] == 1}">{{scope.row[item.props]}}</span>
            </template>
            <template v-else slot-scope="scope">
              <span>{{scope.row[item.props]}}</span>
            </template>
          </template>

        </el-table-column>
      </template>
    </el-table>
  </div>
  <div class="leftFlex" :style="{width:(100+50*tableTitle[1].list.length) + 'PX'}">
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
    {{tableTitle}}
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
                <ul class="ca" :style="{width: (100+50*tableTitle[1].list.length)+ 'PX'}">
                  <li v-for='(items,index) in supplierLeftLit' :key='index'>
                    {{items.name}}
                  </li>
                </ul>
                <ul class="cb" v-for='(items,index) in centerSupplierData' :key='index'>
                  <template v-for="(itemss,index) in supplierLeftLit">
                      <li :key='index' v-if='itemss.name != "F-Target"'>{{items[itemss.props]}}</li>
                      <li :key="index" v-else class="ftaget">
                        <span>{{items['cfPartAPrice']}}</span>
                        <span style="width:99PX"></span>
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
  </div>
  <!-- <div class="rightFlex">
  </div> -->
</div>
</template>
<script>
import {supplierTableTop,removeKeysNumber,getPorpsNumber} from './data'
import {toThousands} from '@/utils'
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
  methods:{
    ttoShow(data){
      if(parseInt(data)){
        return toThousands(parseInt(data))
      }else{
        return data
      }
    },
    getPorpsNumber(props){return getPorpsNumber(props)},
    getCfPartsAorBprice(arrayList,index,props){
      try {
        return arrayList[index || 0][props]
      } catch (error) { 
        return ''
      }
    },
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
    isborder(row,props) {
      row.partInfoList.forEach((val,index,arr) => {
        let  a = false 
        Object.keys(val).forEach(value=>  {
           value ==  props ? a= true: ''
        })
        let b  = val.suggestPartFlag == 1  && a == true ? true: false
        console.log(b,props);
        if(b==true)
        return 'priceUnderLinePrice'
        else
        return ''        
      })
    }
    // cellClassName({row, column, rowIndex, columnIndex}) {
      // console.log(column,'columncolumncolumn'); 
      // console.log(row,'rowrowrowrowrow'); 
      // row.partInfoList.forEach(val => {
        // val.suggestPartFlag === 1 ? val.partName
      // })

      // if(row.partInfoList.suggestPartFlag === 1){
      //   if(column.label =='LC A Price' ) {
      //     return 'priceUnderLinePrice'
      //   }      
      //   if(column.level === 2 && column.property.indexOf('lcBPrice')>-1) {
      //     return 'priceUnderLinePrice'
      //   }      
      // }

      // 
    // }
  }, 
  computed:{
    paddingTop:function(){
      return this.supplierLeftLit.length * 30 + 20 + 'PX'
    }
  }
}
</script>
<style lang='scss' scoped>
  .redPrice{
    color:red;
  }
  .supplier{
    position: relative;
    .leftFlex{
      position: absolute;
      height: 100%;
      bottom: 10PX;
      padding-top:10PX;
      left: 0px;
      z-index: 199;
      width: 100px;
      background-color: white;
      .selsTable{
        overflow: hidden;
      }
    }
    .rightFlex{
      position: absolute;
      height: 100%;
      bottom: 10PX;
      padding-top:10PX;
      right: 0px;
      z-index: 199;
      width: 350px;
      overflow: hidden;
      background-color: white;
      display: flex;
      flex-direction: row-reverse;
      .selsTable{
        overflow: inherit;
        width: auto;
        ::v-deep .el-table{
           width: auto;
           max-width: auto;
          .el-table__header-wrapper{
            width: auto;
          }
        }
      }
    }
  }
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
      width: 82PX;
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
        .price{
          position: absolute;
          top: 0px;
          left: 0px;
          height: 38px;
          line-height: 38px;
          display: inline-block;
          width: 100%;
          border-left: 1px solid #C5CCD6;
          border-right: 1px solid #C5CCD6;
        }
        .pricea{
            top:-70px;
            border-left: none;
        }
        .priceb{
            top:-95px;
        }    
        .buleColor::after{
          margin: auto;
          position: absolute;
          content:"";
          width: 80PX;
          height:3px;
          left: 0px;
          bottom: 0px;
          background: blue;
        }
    }
    ::v-deep.priceUnderLinePrice{
      border-bottom:3px solid blue;
      color:red;
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