<!--
 * @Author: your name
 * @Date: 2021-09-03 14:20:08
 * @LastEditTime: 2021-10-08 11:54:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\components\partsprocure\createNomiappBtnAsse\index.vue
-->
<template>
<div class="inline margin-left10 margin-right10 ssS" v-permission.auto="PARTSPROCURE_SHENGCHENGDINGDSQ_ACC|总成件-生成定点申请按钮">
    <iButton :loading='loadind' @click="created">{{language('SHENGCDINGIDANSHENGQACC','生成定点申请单')}}</iButton>
    <iDialog :visible.sync="diologShow" :title="language('ZONGCHNEGGONGYS','总成供应商')" width='70%' style="margin-bottom:40px;">
      <div class="top">
        <iFormGroup inline row='2' label-width='100px'>
          <iFormItem :label='language("ZHONGCHENGGYS","总成供应商")'>
            <iText>{{totalSupplier}}</iText>
          </iFormItem>
          <iFormItem :label='language("FENE","份额")'>
            <iInput @input='numberProcessor(rate)' @blur.native.capture="numberBlur" v-model="rate" />
          </iFormItem>
        </iFormGroup>
        <div class="btn">
          <iButton :loading='loadingbtn' @click="createNomi">{{language('SHENGCHENGDINGDSQD','生成定点申请单')}}</iButton>
          <iButton @click="diologShow=false">{{language('QUXIAO','取消')}}</iButton>
        </div>
      </div>
      <!------------------------------------------------------------------------------------>
      <!----界面勾选逻辑：进入界面，默认勾选全部，若勾选多条加工装配费或多条本体定点记录时提醒：请只选择一条加工装配费与一条本体的定点记录，此处提醒不做强制限制-------->
      <!----已经勾选过的需要将前面的勾选框变成disabel状态----------------------------------------->
      <tablelist ref='tabel' :borderLeftStatus='false' :selectable='disabelRow' selection :tableData='tableList' :tableTitle='tableTitle' @select='handleSelectionChange'></tablelist>
    </iDialog>
</div>
</template>
<script>
import {iButton,iDialog,iMessage,iInput,iFormItem,iFormGroup,iText,iMessageBox} from 'rise'
import {nomiAutoPartsAssemblyCheck,nomiAutoPartsAssembly,partsAssemblyOutPlan} from '@/api/partsprocure/editordetail'
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
      rate:'',
      ontologyList:[],
      isUserPackage:false,
      loadingbtn:false
    }
  },
  computed:{
    totalSupplier(){
      const s = this.ontologyList.find(i=>i.partType == 'S')
      return s?s.sname:''
    }
  },
  methods:{
    disabelRow(row){
      if(row.addAssemblyNomi){
        return false
      }else {
        return true
      }
    },
    removeSelect(row){
      this.$refs.tabel.clearSelection()
      this.ontologyList = this.ontologyList.filter(items=>items.supplierId != row.supplierId)
      this.ontologyList.forEach(r=> this.$refs.tabel.toggleRowSelection(r))
    },
    selectGroup(row){
      if(this.ontologyList.find(items=>items.partType === 'S') && this.tableList.filter(i=>i.supplierId == row.supplierId).find(t=>t.partType === 'S')) {
        this.$refs.tabel.clearSelection()
        this.ontologyList.filter(i=>i.itemKey != row.itemKey).forEach(r=>this.$refs.tabel.toggleRowSelection(r))
        iMessage.warn(this.language('DANGQLJHANYOUDUOGEJIAGONG','您已选择过零件类型含有加工装配的供应商，切勿重复选择！'))
      }else{
        this.ontologyList = [...new Set([...this.ontologyList,...this.tableList.filter(items=>items.supplierId === row.supplierId)])]
        this.ontologyList.forEach(r => this.$refs.tabel.toggleRowSelection(r))
      }
    },
    selectData(row,select){
      if(select.filter(i=>i.supplierId == row.supplierId && !i.needRow).length === 0){
        this.$refs.tabel.clearSelection()
        select.filter(i=>i.supplierId !== row.supplierId).forEach(t=>this.$refs.tabel.toggleRowSelection(t))
      }
      if(select.filter(i=>i.partType === 'S').length > 1){
        this.$refs.tabel.clearSelection()
        const selectfilterPartTypeS = (select.filter(i=>i.partType === 'S').map(r=>r.itemKey)).splice(1,1,'')
        select.filter(b=>!selectfilterPartTypeS.includes(b.itemKey)).forEach(r=>this.$refs.tabel.toggleRowSelection(r))
        iMessage.warn(this.language('DANGQLJHANYOUDUOGEJIAGONG','您已选择过零件类型含有加工装配的供应商，切勿重复选择！'))
        return
      }
      //选择完成的数据数量刚好等于总量。勾选上供应商表头
      if(select.filter(i=>i.supplierId == row.supplierId && !i.needRow).length == this.tableList.filter(c=>c.supplierId == row.supplierId && !c.needRow).length){
        Array.from(new Set([...select,...this.tableList.filter(items=>items.supplierId == row.supplierId)])).forEach(i=>this.$refs.tabel.toggleRowSelection(i))
      }
      //选择完成的数据数量刚好小于总量。取消供应商表头
      if(select.filter(i=>i.supplierId == row.supplierId && !i.needRow).length < this.tableList.filter(c=>c.supplierId == row.supplierId && !c.needRow).length){
        this.$refs.tabel.clearSelection()
        select.map(items=> {
          if(items.needRow){
            if(items.supplierId != row.supplierId){
              return items
            }
          }else{
            return items
          }
        }).forEach(i=>this.$refs.tabel.toggleRowSelection(i))
      }
    },
    handleSelectionChange({row,selection}){
      const selections = selection.every(i=>i == undefined)?[]:selection
      this.ontologyList = selections
      const isSelect = selections.find(rows=>rows.itemKey == row.itemKey)
      if(row.needRow){ //勾选供应商表头
        if(isSelect){
          this.selectGroup(row)
        }else{
          this.removeSelect(row)
        }
      }else{ //勾选了数据
        this.selectData(row,selections || [])
      }
    },
    numberProcessor(a){
      this.rate = numberProcessor(a,2,false) > 100 ? 100:numberProcessor(a,2,false)
    },
    numberBlur(){
      this.rate =this.rate+'%'
    },
    partsAssemblyOutPlans(){
      return partsAssemblyOutPlan(this.detailData().id)
    },
    async messageBox(){
      return new Promise(r=>{
        this.partsAssemblyOutPlans().then(res=>{
          if(res.data){
            iMessageBox('是否使用本体加工费的产量计划？').then(res=>{
              this.isUserPackage = true
              r()
            }).catch(()=>{
              this.isUserPackage = false
              r()
            })
          }else{
            r()
          }
        })
      })
    },
    created(){
      if(this.detailData().carTypeProjectZh == '') return iMessage.warn(this.language('DANGQIANCHEXINGXIANGMU','当前车型项目为空，请先维护车型项目！'))
      if(this.detailData().procureFactory == '') return iMessage.warn(this.language('DANGQIANCAIGGCWEIK','当前采购工厂为空，请先维护采购工厂！'))
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
            this.$nextTick(()=>{
              document.querySelector('.el-table__header-wrapper .el-checkbox').style.display = 'none'
            })
          if(res.data.isMustRecord){
            this.diologShow = true
          }else{
            this.ontologyList = this.tableList
            this.rate = null
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
      data.forEach((element) => {
        newArray.push({supplierName:element.supplierName,supplierId:element.supplierId,needRow:true,addAssemblyNomi:element.nomiPartsAssemblyRecordVoList.every(i=>i.addAssemblyNomi),itemKey:Math.random()})
        newArray = [...newArray,...element.nomiPartsAssemblyRecordVoList.map(r=>{return {...r,...{supplierName:'',sname:r.supplierName,needRow:false,itemKey:Math.random()}}})]
      });
      return newArray
    },
    createNomi(){
      const submitValidate = this.ontologyList.filter(items=>items.partType === 'S')
      if(this.rate === '') return iMessage.warn(this.language('DANGQIANFENEBNWEIK','抱歉，您还未填写份额！'))
      if(submitValidate && submitValidate.length > 1) return iMessage.warn(this.language('XUANZEDEBUNENGDAYULIANGT','抱歉！零件类型【加工装配费】只能为一条！'))
      this.loadingbtn = true
      const sendData = {
        isUserPackage:this.isUserPackage,
        ontologyList:this.ontologyList.filter(r=>!r.needRow).filter(r=>!r.addAssemblyNomi),
        rate:this.rate.indexOf('%')>-1?JSON.parse(JSON.stringify(this.rate)).substring(0,this.rate.length - 1):this.rate, //将rate后面的百分号去除
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
  .ssS{
    ::v-deep.el-dialog{
      padding-bottom:40px;
    }
  }
</style>