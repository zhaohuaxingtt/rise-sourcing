<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 15:03:47
 * @LastEditTime: 2023-04-13 16:46:45
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 特殊表格实现
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\table.vue
-->
<template>
  <div class="conent">
    <div class="selsTable">
      <el-table 
        ref="table"
        border
        :stripe="false"
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
                <span v-if="scope.row.partNo && scope.row.partNo.length && scope.row.partNo.includes('Group total')">{{scope.row.partNo}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            v-else-if="item.props == 'cfPartAPrice' || item.props == 'partNo'"
            :key="index"
            :label="item.i18n ? $t(item.i18n) : item.label"
            :min-width="item.width"
            :prop='item.props'
            align="center"
            :sortable='"custom"'
          >
            <template slot-scope="scope">
              <template v-if="item.props == 'cfPartAPrice'">
                <!-- 有SEL分摊 -->
                <el-tooltip  effect='light' v-if='+scope.row.selAPrice'>
                  <template slot="content">
                    <div>零件目标价A价：{{ scope.row.cfPartAPrice | thousandsFilter }} RMB</div>
                    <div>SEL目标价A价：{{scope.row.selAPrice | thousandsFilter}} RMB</div>
                  </template>
                  <span :class="{chengse:scope.row['cfPartAPriceStatus'] == 2}">{{ (Number(scope.row.cfPartAPrice) + Number(scope.row.selAPrice)) | thousandsFilter  }}</span>
                </el-tooltip>
                <!-- 无SEL分摊 -->
                <span v-else :class="{chengse:scope.row['cfPartAPriceStatus'] == 2}">{{ scope.row.cfPartAPrice | thousandsFilter  }}</span>
                <span style="color:red;" v-if='+scope.row.selAPrice'>*</span>
              </template>
              <span v-else :class="{chengse:(scope.row['cfPartAPriceStatus'] == 2 && item.props != 'partNo')}">{{scope.row[item.props]}}</span>
            </template>
          </el-table-column>
          <!-----------------表格中内容模块------------------------>
          <el-table-column
            v-else
            :fixed='item.fixed'
            :key="index"
            :label="item.label"
            :min-width="item.width"
            :prop='item.props'
            align="center"
          >
            <!----------在表头上方需要显示评分的点，插入表头标签------>
            <template slot="header" slot-scope="scope">
              <el-tooltip :content="scope.column.label" effect='light'><p v-if="item.renderHeader" v-html="item.renderHeader"></p><span v-else class="labelHader">{{scope.column.label}}</span></el-tooltip>
              <div class="headerContent" v-if='scope.column.label == ""'>
                <div class="c" :style="{width:cWidth,minWidth:minWidth}" v-if='ratingList.firstTile.length > 0'>
                  <ul style="width:0px">
                    <li></li>
                    <template v-for='(items,index) in ratingList.firstTile'>
                      <template v-if='ratingList.firstTile.length > 1'>
                        <li :key='index' v-if='items'>
                          <el-tooltip effect="light" :content="items">
                            <div class="titleOverflow">
                              {{items}}
                            </div>
                          </el-tooltip>
                        </li>
                         <li v-else :key='index'>Dept</li>
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
                        <template v-if="indexss > 0" >
                          <li :key='indexss' v-if='ratingList.firstTile[indexss-1]' style="padding: 5px 0">
                            <span style="margin-rigth:10px;">{{itemsss.rate}}</span>
                            <span><icon v-if='!itemsss.isAllPartRateConsistent' name='icontishi-cheng' symbol></icon></span>
                          </li>
                        </template>
                        <li v-else :key='indexss'>
                          <span>
                            {{itemsss.rateEn}}
                          </span>
                          <br v-if='itemsss.rateEn && itemsss.rate' />
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
                  <span :class="{chengse:scope.row['cfPartAPriceStatus'] == 2}">{{ttoShow(scope.row[item.props])}}</span>
              </template>
              <template v-if='removeKeysNumber(item.props) == "ftSkdAPrice"'>
                  <span :class="{chengse:scope.row['ftSkdAPriceStatus'] == 2}">{{ttoShow(scope.row[item.props])}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "ebrCalculatedValue"'>
                <span>{{ebrShow(scope.row[item.props])}}</span>
              </template>       
              <template v-else-if='removeKeysNumber(item.props) == "partName"'>
                <el-tooltip effect='light' v-if=" scope.row[getPorpsNumber(item.props)+'partNameDe'] || scope.row[getPorpsNumber(item.props)+'partName']">
                  <div slot="content">
                    <div>{{scope.row[getPorpsNumber(item.props)+"partNameDe"]}}</div>
                    <div>{{scope.row[getPorpsNumber(item.props)+"partName"]}}</div>
                  </div>
                  <div>
                    <span class="isEplis" style="white-space:nowrap">{{ removeSpace(scope.row[getPorpsNumber(item.props)+"partNameDe"])}}</span><br/>
                    <span class="isEplis" >{{scope.row[item.props]}}</span>
                  </div>
                </el-tooltip>
              </template> 
              <template v-else-if='removeKeysNumber(item.props) == "factory"'>
                <span >{{scope.row['factoryEn']? scope.row['factoryEn'] : scope.row['factory']}}</span>
              </template>        
              <template v-else-if='removeKeysNumber(item.props) == "cfPartBPrice"'>
                  <span :class="{chengse:scope.row['cfPartBPriceStatus'] == 2}">{{ttoShow(scope.row[item.props])}}</span>
              </template>   
              <template v-else-if='removeKeysNumber(item.props) == "ftSkdBPrice"'>
                  <span :class="{chengse:scope.row['ftSkdBPriceStatus'] == 2}">{{ttoShow(scope.row[item.props])}}</span>
              </template>  
              <template v-else-if='removeKeysNumber(item.props) == "lcAPrice"'>
                <div class="tag" v-if="scope.row[getOriginpriceProp(item.props)]">
                  <el-tooltip :content="language('TONGPILIANG','同批量')" placement="bottom" effect="light">
                    <icon name='iconxialakuang_qiehuanlingjian_yiwancheng' class="icon"></icon>
                  </el-tooltip>
                </div>
                <span :class="{lvse:lvseFn(scope.row,item.props,'lcAPriceStatus')}">{{ttoShow(scope.row[item.props])}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "lcBPrice"'>
                  <span :class="{lvse:lvseFn(scope.row,item.props,'lcBPriceStatus')}">{{ttoShow(scope.row[item.props])}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "skdAPrice"'>
                  <span :class="{lvse:lvseFn(scope.row,item.props,'skdAPriceStatus')}">{{ttoShow(scope.row[item.props])}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "skdBPrice"'>
                  <span :class="{lvse:lvseFn(scope.row,item.props,'skdBPriceStatus')}">{{ttoShow(scope.row[item.props])}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "tto"'>
                <el-tooltip :content='ttoShow(scope.row[item.props])' effect='light'>
                  <span class="tooEplis" :class="{lvse:lvseFn(scope.row,item.props,'ttoStatus')}" >{{ttoShow(scope.row[item.props])}}</span>
                </el-tooltip>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "Quotationdetails" && scope.$index < tableData.length -3 && (scope.row.partNo && scope.row.partNo.indexOf("Group total") === -1)'>
                <span class="link" @click="optionPage(scope.row,getPorpsNumber(item.props))">View</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "supplierSopDate"'>
                <span>{{scope.row[item.props]?moment(scope.row[item.props]).format("YYYY-MM-DD"):''}}</span>
              </template>
              <template v-else-if='removeKeysNumber(item.props) == "ltcStaringDate"'>
                <span>{{scope.row[item.props]?moment(scope.row[item.props]).format("YYYY-MM"):''}}</span>
              </template>
              <template v-else-if ='removeKeysNumber(item.props) == "developmentCost"'>
                <!-- <el-tooltip  effect='light' v-if='scope.row[getPorpsNumber(item.props)+"developmentCostHasShare"]'> -->
                <el-tooltip  effect='light' v-if='+scope.row[getPorpsNumber(item.props)+"developmentCostShare"]'>
                  <template slot="content">
                    <div>一次性：{{ ttoShow(subtract(scope.row[getPorpsNumber(item.props)+"developmentCost"], scope.row[getPorpsNumber(item.props)+"developmentCostShare"])) }}RMB</div>
                    <div>分摊：{{ ttoShow(scope.row[getPorpsNumber(item.props)+"developmentCostShare"])}}RMB</div>
                  </template>
                  <span>{{ttoShow(scope.row[item.props])}}</span>
                </el-tooltip>
                <span v-else>{{ttoShow(scope.row[item.props])}}</span>
                <!-- <span style="color:red;" v-if='scope.row[getPorpsNumber(item.props)+"developmentCostHasShare"]'>*</span> -->
                <span style="color:red;" v-if='+scope.row[getPorpsNumber(item.props)+"developmentCostShare"]'>*</span>
              </template>
              <template v-else-if ='removeKeysNumber(item.props) == "tooling"'>
                <!-- <el-tooltip  effect='light' v-if='scope.row[getPorpsNumber(item.props)+"toolingHasShare"]'> -->
                <el-tooltip  effect='light' v-if='+scope.row[getPorpsNumber(item.props)+"toolingShare"]'>
                  <template slot="content">
                    <div>一次性：{{ ttoShow(subtract(scope.row[getPorpsNumber(item.props)+"tooling"], scope.row[getPorpsNumber(item.props)+"toolingShare"])) }}RMB</div>
                    <div>分摊：{{ttoShow(scope.row[getPorpsNumber(item.props)+"toolingShare"])}}RMB</div>
                  </template>
                  <span>{{ttoShow(scope.row[item.props]?scope.row[item.props]:scope.row[item.props])}}</span>
                </el-tooltip>
                <span v-else>{{ttoShow(scope.row[item.props]?scope.row[item.props]:scope.row[item.props])}}</span>
                <!-- <span style="color:red;" v-if='scope.row[getPorpsNumber(item.props)+"toolingHasShare"]'>*</span> -->
                <span style="color:red;" v-if='+scope.row[getPorpsNumber(item.props)+"toolingShare"]'>*</span>
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
import {icon,iMessage} from 'rise'
import moment from 'moment'
import filter from "@/utils/filters";
export default{
  components:{icon},
  mixins:[filter],
  props:{
    height: {type: Number, default:''},
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
  watch:{
    tableData(val){
      console.log('tableData=>',val);
    }
  },
  computed:{
    cWidth(){
      const indexTabs = this.tableTitle.findIndex(i=>i.props == "headerEbr")
      return this.tableTitle.reduce((a,b,index)=>{
        if(index > indexTabs) {
          return a+parseFloat(b.width)
        }else{
          return a
        }
      },0) + 'px'
    },
    spanArr(){
      return this.rowspan(this.tableData,'groupId',null)
    },
    isPreview(){
        return this.$store.getters.isPreview;
    }
  },
  data() {
    return {
      ebrWidth: '',
      minWidth: ''
    }
  },
  methods:{
    // 获取对应供应商isOriginprice
    getOriginpriceProp(prop){
      let index = parseInt(prop)
      if(!isNaN(index)){
        return index+'isOriginprice'
      }else{
        return 'isOriginprice'
      }
    },
    setfixElement(){
      try {
        const needRemovebox = document.querySelector('.selsTable .el-table__fixed .el-table__fixed-header-wrapper .rateList')
        console.log([needRemovebox])
        if(needRemovebox){
          needRemovebox.parentNode.removeChild(needRemovebox)
        }
        const box = document.querySelector('.selsTable .el-table__fixed .el-table__fixed-header-wrapper')
        let str = `<li>Dept</li>`
        this.ratingList.firstTile.forEach(items=>{
          str+=(`<li>${items?items:''}</li>`)
        })
        const ulDom = document.createElement('div')
        ulDom.innerHTML = `<ul>${str}</ul>`
        ulDom.setAttribute('class','rateList')
        box.appendChild(ulDom)
        this.$nextTick(()=>{
          setTimeout(()=>{
            if(ulDom){
              this.minWidth = document.getElementsByClassName('selsTable')[0].offsetWidth - document.getElementsByClassName('rightBorder')[0].offsetLeft - document.getElementsByClassName('rightBorder')[0].offsetWidth + 'px'
              ulDom.style.width = document.getElementsByClassName('EBR')[0].clientWidth + 'px'
            }
          },280)
        })
      } catch (error) {
        console.warn(error)
      }
    },
    //推荐供应商添加下划线
    tuijianSuplier(currentProps,row){
      if (['lcAPrice','skdAPrice','lcBPrice','skdBPrice'].includes(this.removeKeysNumber(currentProps)) && row[this.getPorpsNumber(currentProps)+'suggestFlag']) return true
      return false
    },
    ttoShow(data){
      if(data && parseFloat(data)){
        return (data+'').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,') 
      }else{
        return data
      }
    },
    ebrShow(data) {
      if(!data || data.indexOf('Budget') > -1 || data == 'KM')
       return data 
      else{
        // eslint-disable-next-line no-undef
        const result = math.multiply(math.bignumber(data || 0), 100).toString() + '%'
        return result
      }

    },
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
      if(items[index+'hasNoBidOpen']) return iMessage.warn(this.language('AIBIAOSHIJIANWEIDAO','抱歉！开标时间未到，暂时无法查看报价单！'))
      const router = this.$router.resolve({
        path:'/sourceinquirypoint/sourcing/supplier/quotationdetail',
        query:{
          rfqId:this.$route.query.id||items.rfqId,
          // round:items.round,
          round:items[index+'round'],
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
    // grouptotal 合并第一、二格
    if (row.partNo.indexOf('Group total')>-1) {
      if (columnIndex === 0) {
        return [1, 2];
      } else if (columnIndex === 1) {
        return [0, 0];
      }
    }
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
    getPorpsNumber(key=""){
      return getPorpsNumber(key)
    },
    removeKeysNumber(data=""){
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
        return 'EBR rightBorder'
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
      if(rowIndex == this.tableData.length -1 || rowIndex == this.tableData.length -2 ){
        return 'lineBlueClass'
      }
      if (row.partNo && row.partNo.length && row.partNo.includes('Group total')) {
        return 'lineBlueClass groupLineBlueClass'
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
      if(column.label == ''){
        return 'hiddleBorder'
      }
      //判断是否是推荐供应商
      if(this.tuijianSuplier(column.property,row)){
        return 'tuijianSupplier'
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
    },
    //去掉空格
    removeSpace(str) {
      try {
        return str.replace(/\s+/g,"")
      } catch (error) { 
        return str 
      }
    },
    // 减法
    subtract(a, b) {
      const _a = (a + "").replace(/,/g, "")
      const _b = (b + "").replace(/,/g, "")

      // eslint-disable-next-line no-undef
      return math.subtract(math.bignumber(+_a || 0), math.bignumber(+_b || 0)).toFixed(2)
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
  .ttoEplisDe{
    width: 90% !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    display: inline-block;
    word-break: keep-all;
  }
  .chengse{
    color: $color-delete;
  }
  .tooEplis{
    width: 90px;
    overflow:hidden;
    text-overflow:ellipsis;
    word-break:keep-all;
    display: inline-block;

  }  

  .el-table {
    position: initial;
    overflow: visible;
    ::v-deep.tuijianSupplier{
      border-bottom: 2px solid blue;
    }
    
    ::v-deep tr:nth-child(even){
      background-color: #FFFFFF;
    }
    ::v-deep .el-table__row{
      height: unset !important;
    }
    ::v-deep.cell{
      overflow: visible;
      position: static;
      padding: 0px;
      span {
        white-space:pre-line!important;
        text-align: center;
      }
      .tag{
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        background: #54b88e;
        transform: translate3d(50%, -50%, 0) rotate(-135deg);
        z-index: 1;
        .icon{
          transform: rotate(135deg) scale(0.8);
          display: inline-block;
          color: white;
          overflow: unset;
          height: 17px;
          width: 17px;
          font-size: 8px;
        }
      }
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
    ::v-deep.isEplis{
      width: 100px;
      overflow:hidden;
      text-overflow:ellipsis;
      word-break:keep-all;
      display: inline-block;
      white-space: nowrap !important;
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
    ::v-deep.groupLineBlueClass{
      td .cell{
        font-weight: bold;
      }
      td:first-child .cell{
        font-weight: normal;
      }
    }
    ::v-deep.leftRightBorder{
      border-left: 1px solid #EBEEF5;
      border-right: 1px solid #EBEEF5;
    }
    ::v-deep .bgcoor{
      background: #f5f7fa;
      border-bottom: 1px solid #e6eaef;
      &:last-child{
        border-bottom: none;
      }
    }
    ::v-deep .rightBorder{
      border-right: 1px solid #EBEEF5;
      position: relative;
    }
    ::v-deep .hiddleBorder{
      border-right: 0px;
    }
    ::v-deep .is-sortable{
      .cell{
          display: flex;
          justify-content: center;
          white-space: pre;
          align-items: center;
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
    position: absolute;
    top: 0px;
    left: 0px;
    height: 0px;
    width: 0px;
    .c{
      position: absolute;
      width: 100px;
      z-index: 123;
      bottom: -1px;
      left:0PX;
      border: 1px solid #EBEEF5;
      border-bottom: none;
      border-left:none;
      // border-top-right-radius: 5px;
      overflow:hidden;
      display: flex;
      border-top: none;
      .titleOverflow{
        margin: 0 0 0 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      ul{
        border-right: 1px solid #EBEEF5;
        border-top: 1px solid #EBEEF5;
        &:nth-child(2){
          overflow: hidden;
        }
        &:first-child{
          border: 0px;
          // border-top-right-radius: 3px;
          // overflow: hidden;
          // border-right: 0px;
          // border: none;
          // width: 0px;
          li{
            border:0px;
            // border-right: 1px solid #EBEEF5;
            // &:first-child{
            //   background-color:white;
            //   border:none;
            //   border-right: 1px solid #EBEEF5;
            // }
          }
        }
        li{
          border-bottom: 1px solid #EBEEF5;
          height: 38px;
          &:last-child{
            border-bottom: none;
          }
          &:first-child{
            background-color:rgba(22, 99, 246, 0.17);
            height: 60px;
            padding: 5px 0;
          }
        }
      }
      .lastChild{
        flex: 1;
        &:first-child{
          border: 0px;
        }
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
          height: calc(100% - 20px) !important;;
          bottom: -1px;
          padding-top: 200px;
          box-sizing: border-box;
          background-color: white;
          z-index: 124;
          top: 0px;
          left: 1px;
          .el-table__fixed-header-wrapper{
            position: relative;
            top: inherit;
            left: inherit;
            .rateList{
              position: absolute;
              right: -1px;
              height: 0px;
              width: 0px;
              top: 0px;
              ul{
                width: 100%;
                position: absolute;
                bottom: -1.8px;
                right: 1.6px;
                border-left: 1px solid #EBEEF5;
                border-top: 1px solid #EBEEF5;
                border-right: 1px solid #EBEEF5;
                border-bottom: none;
                // border-top-left-radius: 10px;
                overflow: hidden;
                // min-width: 70px;
                // width: 100%;
                li{
                    border-bottom: 1px solid #EBEEF5;
                    line-height: 38px;
                    height: 38px;
                    padding: 0px 5px;
                    text-align: center;
                    &:last-child{
                      border-bottom: none;
                    }
                    &:first-child{
                      background-color:rgba(22, 99, 246, 0.17);
                      height: 60px;
                      padding: 5px 0;
                      font-weight: bold;
                    }
                  }
              }
            }
          }
          .el-table__fixed-body-wrapper{
            position: static;
            top: inherit;
            left: inherit;
          }
    }

    // ::v-deep .el-table__header,
    // .el-table__body,
    // .el-table__row {
    //   .cell {
    //     zoom: 0.85;
    //   }
    // }

    // ::v-deep .el-table__row {
    //   .cell span {
    //     zoom: 0.85;
    //   }
    // }
  }
  .conent{
    height: auto;
    position: relative;
  }
</style>