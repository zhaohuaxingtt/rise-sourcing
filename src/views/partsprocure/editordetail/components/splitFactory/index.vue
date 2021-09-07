<!--
 * @Author: yuszhou
 * @Date: 2021-03-24 18:12:23
 * @LastEditTime: 2021-09-07 15:57:17
 * @LastEditors: Please set LastEditors
 * @Description: 拆分采购工厂
 * @FilePath: \rise\src\views\partsprocure\editordetail\components\splitFactory\index.vue
-->
<template>
    <iDialog class="dialog" :visible="splitPurchBoolean.splitPurchBoolean" @close='close'>
      <template slot="title">
        <span class="el-dialog__title">{{ language('LK_CHAIFENCAIGOUGONGCHANG','拆分采购工厂') }}</span>
        <el-tooltip effect="light">
          <i class="iconxinxitishi iconfont color"></i>
          <template slot="content">
            保存后将按照您所维护的工厂份<br />额拆分询价产量。 如果已经维护<br />车型产量，请确保为该零件的所<br />有工厂产量。
          </template>
        </el-tooltip>
        <iButton class="float-right marginleft300" @click='save' :btnLoding='btnLoding'>{{ language('LK_BAOCUN','保存') }}</iButton>
      </template>
      <template>
        <el-form ref='form' :model="splitPurchList">
        <el-table
          :height="height"
          :data="splitPurchList"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
          width="500"
          class="margin-right30"
          :empty-text="language('LK_ZANWUSHUJU','暂无数据')"
        >
          <el-table-column
            type="selection"
            width="40"
            align="center"
          ></el-table-column>
          <template v-for="(items, index) in splitPurchTitle">
            <el-table-column
              :key="index"
              v-if="items.props == 'factoryName'"
              :label="language(items.key,items.name)"
              :prop="items.props"
              width="200"
            ></el-table-column>
            <el-table-column
              v-else
              :key="index"
              :label="language(items.key,items.name)"
              width="250"
            >
              <template slot-scope="scope">
                <el-form-item :error="scope.row.error">
                  <iInput v-model="scope.row[items.props]" type="number" @input="validate(scope.row,items.props)"></iInput>
                </el-form-item>
              </template>
            </el-table-column>
            </template>
          <el-table-column></el-table-column>
        </el-table>
          <iPagination
            class="margin-bottom20"
            @size-change="handleSizeChange($event, purchaseFactory)"
            @current-change="handleCurrentChange($event, purchaseFactory)"
            background
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :current-page="page.currPage"
            :total="page.totalCount" v-update
          />
          </el-form>
      </template>
    </iDialog>
</template>
<script>
import { splitPurchTitle } from "../data";
import { iDialog,iButton,iPagination,iInput,iMessage } from 'rise'
import {purchaseFactory} from '@/api/partsprocure/editordetail'
import {pageMixins} from '@/utils/pageMixins'
import {_getMathNumber} from "@/utils"
import {splitFactorySave} from '@/api/partsprocure/home'
import validate from '@/assets/validate/zh_cn'
export default{
  mixins:[pageMixins],
  props:{
    splitPurchBoolean:Boolean,
    purchaseProjectId:String,
    updateTabs:Function,
    firstId:{
      default:null
    }
  },
  components:{iDialog,iButton,iPagination,iInput},
  created(){
    this.purchaseFactory()
  },
  data(){
    return {
      splitPurchTitle:splitPurchTitle,
      splitPurchList: [],
      selectSplitPurchList: [],
      tableLoading:false,
      btnLoding:false,
    }
  },
  methods:{
    close(){
      this.splitPurchBoolean.splitPurchBoolean = false
    },
    validateNumberPersiont(){
     return new Promise((r)=>{
        if(!this.selectSplitPurchList.every(items=>items.share>0)){
          iMessage.warn(this.language('LK_CHAIFENFACTORY','选中的工厂中,存在未分配的份额，请填写后重试！'))
          r(false)
          return
        }
        if(this.selectSplitPurchList.length == 0){
          iMessage.warn(this.language('LK_HAIWEIXUANZHEGONGCHANG','您还未选择工厂！'))
          r(false)
          return
        }
        const persiontData = []
        this.selectSplitPurchList.forEach(element => {
          persiontData.push(element.share)
        });
        const total = persiontData.reduce((a,b)=> _getMathNumber(`${a || 0}+${b || 0}`))
        if(total > 100){
          iMessage.warn(this.language('LK_CAIGOUFENEFENPEICHAOGUO','当前分配已超过100%，请重新分配！'))
          r(false)
          return
        }
        if(total < 100){
          iMessage.warn(this.language('LK_CAIGOUFENEFENPEIWEIDADAO','当前分配未达到100%，请重新分配！'))
          r(false)
          return
        }
        if(this.selectSplitPurchList.find(items=>items.share == 0 || items.share == '')){
          iMessage.warn(this.language('LK_CAIGOUFENEFENPEIWEIDADAODANGQIAN','当前分配未达到100%当前分配的工厂中存在为0的情况，请重新分配！'))
          r(false)
          return
        }
        r(true)
     })
    },
    fixedTo(data){
      const newData = JSON.parse(JSON.stringify(data))
      newData.forEach(items=>{items.share = Number(items.share).toFixed(2)})
      return newData
    },
    translateDataForService(){
      return {
          purchaseProjectId:this.purchaseProjectId,
          splitProcureFactoryList:this.fixedTo(this.selectSplitPurchList)
      }
    },
    async save(){
      this.btnLoding = true
      if(!await this.validateNumberPersiont()) return
      splitFactorySave(this.translateDataForService()).then(res=>{
                if(res.data){
                  this.btnLoding = false
                  iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
                  this.updateTabs()
                  this.close()
                }else{
                  iMessage.warn(res.desZh)
                }
        }).then(err=>{this.btnLoding = false})
    },
    translateData(data){
      const newData = []
      data.forEach((element,index) => {
        element['share'] = ''
        if(index == 0 && this.firstId){
          element['share'] = '100'
        }
        newData.push(element)
      });
      return newData
    },
    purchaseFactory(){
      this.tableLoading = true
      purchaseFactory({firstId:this.firstId}).then(res=>{
        if(res.data){
          this.splitPurchList = this.translateData(res.data,this.firstId);
          this.tableLoading = false
          this.page.pageSize = res.pageSize
          this.page.currPage = res.pageNum
          this.page.totalCount = res.total
        }
      }).catch(err=>this.tableLoading = false)
    },
    handleSelectionChange(val){
      this.selectSplitPurchList = val
    },
    validate(val,props){
      if(val[props] == ''){
        val.error = ''
      }
      else if(!validate['floatNumber2'][0].test(val[props])){
        val.error = validate['floatNumber2'][1]
      }else{
        val.error = ''
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .color {
    color: $color-table-header;
    position: relative;
    left: 20px;
    top: 1px; 
    cursor: pointer;
    &:hover {
      color: $color-blue;
    }
  }
  .marginleft300 {
    position: relative;
    float: right;
    right: 20px;
    // left: 620px;
    top: -5px;
  }
  ::v-deep .el-dialog__body{
    overflow: hidden;
  }
</style>