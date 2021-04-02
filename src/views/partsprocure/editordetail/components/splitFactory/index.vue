<!--
 * @Author: yuszhou
 * @Date: 2021-03-24 18:12:23
 * @LastEditTime: 2021-04-02 13:39:39
 * @LastEditors: Please set LastEditors
 * @Description: 拆分采购工厂
 * @FilePath: \rise\src\views\partsprocure\editordetail\components\splitFactory\index.vue
-->
<template>
    <iDialog class="dialog" :visible="splitPurchBoolean.splitPurchBoolean" @close='close'>
      <template slot="title">
        <span class="el-dialog__title">{{ $t('LK_CHAIFENCAIGOUGONGCHANG') }}</span>
        <el-tooltip effect="light">
          <i class="iconxinxitishi iconfont color"></i>
          <template slot="content">
            保存后将按照您所维护的工厂份<br />额拆分询价产量。 如果已经维护<br />车型产量，请确保为该零件的所<br />有工厂产量。
          </template>
        </el-tooltip>
        <iButton class="float-right marginleft300" @click='save' :btnLoding='btnLoding'>{{ $t('LK_BAOCUN') }}</iButton>
      </template>
      <template>
        <el-form ref='form'>
        <el-table
          :height="height"
          :data="splitPurchList"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
          width="500"
          class="margin-right30"
          :empty-text="$t('LK_ZANWUSHUJU')"
        >
          <el-table-column
            type="selection"
            width="50"
            align="center"
          ></el-table-column>
          <template v-for="(items, index) in splitPurchTitle">
            <el-table-column
              :key="index"
              v-if="items.props == 'factoryName'"
              :label="$t(items.key)"
              :prop="items.props"
              width="200"
            ></el-table-column>
            <el-table-column
              v-else
              :key="index"
              :label="$t(items.key)"
              width="150"
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
            :total="page.totalCount"
			      v-update
          />
          </el-form>
      </template>
    </iDialog>
</template>
<script>
import { splitPurchTitle } from "../data";
import { iDialog,iButton,iPagination,iInput,iMessage } from '@/components'
import {purchaseFactory} from '@/api/partsprocure/editordetail'
import {pageMixins} from '@/utils/pageMixins'
import {_getMathNumber} from "@/utils"
import {changeProcure} from '@/api/partsprocure/home'
import validate from '@/assets/validate/zh_cn'
export default{
  mixins:[pageMixins],
  props:{
    splitPurchBoolean:Boolean,
    purchaseProjectId:String,
    updateTabs:Function
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
      btnLoding:false
    }
  },
  methods:{
    close(){
      this.splitPurchBoolean.splitPurchBoolean = false
    },
    validateNumberPersiont(){
     return new Promise((r)=>{
        if(this.selectSplitPurchList.length == 0){
          iMessage.warn(this.$t('LK_HAIWEIXUANZHEGONGCHANG'))
          r(false)
          return
        }
        const persiontData = []
        this.selectSplitPurchList.forEach(element => {
          persiontData.push(element.share)
        });
        const total = persiontData.reduce((a,b)=> _getMathNumber(`${a || 0}+${b || 0}`))
        if(total > 100){
          iMessage.warn(this.$t('LK_CAIGOUFENEFENPEICHAOGUO'))
          r(false)
          return
        }
        if(total < 100){
          iMessage.warn(this.$t('LK_CAIGOUFENEFENPEIWEIDADAO'))
          r(false)
          return
        }
        if(this.selectSplitPurchList.find(items=>items.share == 0 || items.share == '')){
          iMessage.warn(this.$t('LK_CAIGOUFENEFENPEIWEIDADAODANGQIAN'))
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
        splitProcureFactoryReq:{
          purchaseProjectId:this.purchaseProjectId,
          splitProcureFactoryList:this.fixedTo(this.selectSplitPurchList)
        }
      }
    },
    save(){
      this.btnLoding = true
      if(!this.validateNumberPersiont()) return
            changeProcure(this.translateDataForService()).then(res=>{
              if(res.data){
                this.btnLoding = false
                iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
                this.updateTabs()
                this.close()
              }else{
                iMessage.warn(res.desZh)
              }
      }).then(err=>{this.btnLoding = false})
    },
    translateData(data){
      const newData = []
      data.forEach(element => {
        element['share'] = ''
        newData.push(element)
      });
      return newData
    },
    purchaseFactory(){
      this.tableLoading = true
      purchaseFactory().then(res=>{
        if(res.data){
          this.splitPurchList = this.translateData(res.data);
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