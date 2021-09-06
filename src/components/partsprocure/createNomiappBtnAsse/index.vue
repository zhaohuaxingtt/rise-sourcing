<!--
 * @Author: your name
 * @Date: 2021-09-03 14:20:08
 * @LastEditTime: 2021-09-03 18:03:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\components\partsprocure\createNomiappBtnAsse\index.vue
-->
<template>
<div class="inline margin-left10 margin-right10" v-permission.auto="PARTSPROCURE_SHENGCHENGDINGDSQ_ACC|总成件-生成定点申请按钮">
    <iButton :loading='loadind' @click="created">{{language('SHENGCDINGIDANSHENGQACC','生成定点申请单')}}</iButton>
    <iDialog :visible.sync="diologShow" :title="language('ZONGCHNEGGONGYS','总成供应商')" width='70%'>
      <div class="top">
        <iFormGroup inline row='2' label-width='80px'>
          <iFormItem :label='language("ZHONGCHENGGYS","总成供应商")'>
            <iText></iText>
          </iFormItem>
          <iFormItem :label='language("FENE","份额")'>
            <iInput @input='numberProcessor(rate)' v-model="rate" />
          </iFormItem>
        </iFormGroup>
        <div class="btn">
          <iButton :loading='loadingbtn' @click="createNomi">{{language('SHENGCHENGDINGDSQD','生成定点申请单')}}</iButton>
          <iButton @click="diologShow=false">{{language('QUXIAO','取消')}}</iButton>
        </div>
      </div>
      <tablelist selection :tableData='tableList' :tableTitle='tableTitle' @handleSelectionChange='handleSelectionChange'></tablelist>
    </iDialog>
</div>
</template>
<script>
import {iButton,iDialog,iMessage,iInput,iFormItem,iFormGroup,iText,iMessageBox} from 'rise'
import {nomiAutoPartsAssemblyCheck,nomiAutoPartsAssembly} from '@/api/partsprocure/editordetail'
import tablelist from "pages/partsign/home/components/tableList";
import { tableTitle } from './data'
import {numberProcessor} from '@/utils' 
export default{
  components:{iButton,iDialog,iInput,iFormItem,iFormGroup,iText, tablelist},
  inject:['detailData'],
  data(){
    return {
      loadind:false,
      diologShow:false,
      tableList:[],
      tableTitle:tableTitle,
      rate:0,
      ontologyList:[],
      isUserPackage:false,
      loadingbtn:false
    }
  },
  methods:{
    handleSelectionChange(res){
      this.ontologyList = res
    },
    numberProcessor(a){
      this.rate = numberProcessor(a,2,false) > 100 ? 100:numberProcessor(a,2,false)
    },
    messageBox(){
      return new Promise(r=>{
      iMessageBox('是否使用本体加工费的产量计划？').then(res=>{
          this.isUserPackage = true
          r()
        }).catch(()=>{
          this.isUserPackage = false
          r()
        })
      })
    },
    created(){
      this.messageBox().then(()=>{
        this.loadind = true
        const sendData = {
          carTypeProjectZh:this.detailData().carTypeProjectZh,
          factoryId:this.detailData().procureFactory,
          partNum:this.detailData().partNum
        }
        nomiAutoPartsAssemblyCheck(sendData).then(res=>{
          this.loadind = false
          if(res.data){
            this.tableList = this.translateDataForRender(res.data.nomiPartsAssemblySupplierVoList)
          if(res.data.isMustRecord){
            this.diologShow = true
          }else{
            this.ontologyList = this.tableList
            this.createNomi()
          }
          }else{
            iMessage.error(res.desZh)
          }
        }).catch(err=>{
          this.loadind = false
          iMessage.error(err.desZh)
        })
      })
    },
    translateDataForRender(data){
      let newArray =  []
      data.forEach(element => {
        newArray.push({supplierName:element.supplierName,supplierId:element.supplierId,needRow:true})
        newArray = [...newArray,...element.nomiPartsAssemblyRecordVoList.map(r=>{return {...r,...{supplierName:'',needRow:false}}})]
      });
      return newArray
    },
    createNomi(){
      this.loadingbtn = true
      const sendData = {
        isUserPackage:this.isUserPackage,
        ontologyList:this.ontologyList.filter(r=>!r.needRow),
        rate:this.rate,
        purchaseProjectPartId:this.detailData().id
      }
      nomiAutoPartsAssembly(sendData).then(res=>{
        this.loadingbtn = false
        if(res.data){
            this.$router.push({
              path:'/designate/decisiondata/title',
              query:{
                desinateId:res.data.nominateId,
                designateType:res.data.nominateProcessType,
                partProjType:this.detailData().partProjType
              }
            })
        }else{
          iMessage.error(res.desZh)
        }
      }).catch(err=>{
        this.loadingbtn = false
        iMessage.error(err.desZh)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .top{
    display: flex;
    justify-content: space-between;
  }
  .el-form{
    width: 50%;
  }
</style>