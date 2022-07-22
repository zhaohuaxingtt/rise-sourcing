<!--
 * @Author: your name
 * @Date: 2021-11-08 11:48:04
 * @LastEditTime: 2022-01-28 13:17:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\tableListSupplier.vue
-->
<template>
  <el-table class="table" :class="isRoutePreview?'isRoutePreview':''" :data="tabelData"  :show-header='false' border :span-method='spanMethod' :cell-style='cellStyleName' :stripe='false'>
    <af-table-column v-for="(i,index) in tabelTitle" :fit='true' :props='i' :key='index' :fixed='fixedFn(index)' align="center" :width='tabelTitle.length >= 18 ? (headerWidth?(headerWidth[index]-3)*2*4+"px":""): fixWidth(index)'>
      <template slot-scope="scope">
        <span class="link" @click="openPage(scope.row[i].style.hyperlink)" v-if='scope.row[i].data == "View" && !scope.row[i].isHeader'>View</span>
        <template v-else-if='scope.row[i] && scope.row[i].data && scope.row[i].data.match(/\n/)'>
          <div>{{scope.row[i].data.split(/\n/)[0]}}</div>
          <div>{{scope.row[i].data.split(/\n/)[1]}}</div>
        </template>
        <template v-else-if='scope.row[i] && scope.row[i].style.tips'>
            <el-tooltip effect='light'>
              <span slot="content" style='white-space: pre;'>{{scope.row[i].style.tips}}</span>
              <div>{{scope.row[i].data | deleteContent}}<span style="color:red;">*</span></div>
            </el-tooltip>
        </template>
        <div v-else>{{scope.row[i].data | deleteContent}}</div>
      </template>
    </af-table-column>
  </el-table>  
</template>
<script>
import afTableColumn from 'af-table-column'
import {iMessage} from 'rise'
export default{
  inject:['getbaseInfoData'],
  components:{afTableColumn},
  props:{
    parentsData:{
      type:Object,
      default:()=>{}
    }
  },
  filters:{
    dateFillter(val){
      // eslint-disable-next-line no-undef
      if(isNaN(val)&&!isNaN(Date.parse(val))) return moment(val).format('YYYY-MM-DD')
      return val
    },
    deleteContent(val){
      if(val == 'DEL') return ''
      return val
    }
  },
  computed:{
    isRoutePreview() {
      return this.$route.query.isPreview == 1
    },
    tabelData(){
      try {
        return this.parentsData.data
      } catch (error) {
        console.log(error)
        return []
      }
    },
    tabelTitle() {
      try {
        return this.parentsData.data[0].map((r,index)=>index)
      } catch (error) {
        return []
      }
    },
    headerWidth(){
      try {
        return this.parentsData.maxWidthList
      } catch (error) {
        return null
      }
    }
  },
  methods:{
    openPage(items,index){
      if(!JSON.parse(items)) return iMessage.warn('关键数据为空，请联系管理员')
      let itemss = JSON.parse(items)
      if(itemss['hasNoBidOpen']) return iMessage.warn(this.language('AIBIAOSHIJIANWEIDAO','抱歉！开标时间未到，暂时无法查看报价单！'))
      const router = this.$router.resolve({
        path:'/sourceinquirypoint/sourcing/supplier/quotationdetail',
        query:{
          rfqId:this.$route.query.id||items.rfqId,
          round:itemss.round,
          supplierId:itemss.supplierId,
          fsNum:itemss.partPrjCode,
          fix:true,
          sourcing:true
        }
      })
      window.open(router.href,'_blank')
    },
    fixedFn(index){
      if(index<4) return 'left'
      if(index>this.tabelTitle.length-4) return 'right'
      return false
    },
    spanMethod({ row, column, rowIndex, columnIndex }){
      return row[columnIndex].mergeArray
    },
    cellStyleName({row, column, rowIndex, columnIndex}){
      try {
        let style = {
        'fontWeight':row[columnIndex].style.isBold?'bold':'',
        'color':row[columnIndex].style.fontColor || '#707070',
        'backgroundColor':row[columnIndex].style.backgroundColor || 'white'
        }
        if(row[columnIndex].style.borderRight) style = {...style,...{borderRight:'none'}}
        if(row[columnIndex].style.underscore) style = {...style,...{borderBottom:'2px solid #1763F7'}}
        return style
      } catch (error) {
       return {
        'fontWeight':'',
        'color':'#707070',
        'backgroundColor':'white'
      } 
      }
    },
    fixWidth(index) {
      switch(index) {
        case 0:
          return "160px"
        case 1:
        case 2:
        case 3:
          return "64px"
        default:
          return ''
      }
      return ""
    }
  }
}
</script>
<style lang='scss' scoped>
  .table{
    ::v-deep tr:nth-child(even){
      background-color: white;
    }
    ::v-deep td{
        border-bottom: 1px solid #EBEEF5;
        .cell{
          white-space:nowrap;
          word-break: normal;
          div{
            text-align: center;
          }
        }
    }
  }
  .isRoutePreview{
    ::v-deep .el-table__row{
      height: unset !important;
    }
    ::v-deep td{
        padding: 1px 0;
        .cell{
          padding: 0px 1px;
          line-height: 1.2;
        }
    }
  }
</style>