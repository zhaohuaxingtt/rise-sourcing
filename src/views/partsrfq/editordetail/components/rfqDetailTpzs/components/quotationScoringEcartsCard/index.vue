<!--
 * @Author: yuszhou
 * @Date: 2021-04-23 09:16:48
 * @LastEditTime: 2021-06-20 01:33:52
 * @LastEditors: Please set LastEditors
 * @Description: 供应商维度展示
 * @FilePath: \front-supplier\src\views\rfqManageMent\partsOffer\components\ecartsCard\index.vue
-->
<template>
  <!----------------------------------------------------------->
  <!------------------- 供应商报价报价趋势图 --------------------->
  <!----------------------------------------------------------->
  <iCard :title='$t("LK_BAOJIAQS")' class="margin-top20" collapse>
    <div class="margin-bottom20 echarts">
      <el-form inline>
          <el-form-item label="价格维度">
            <iSelect style="width:80px;" :placeholder='$t("partsprocure.CHOOSE")' v-model="form.priceLatitude">
              <el-option label="mixPrice" value='1'></el-option>
              <el-option label="To" value='2'></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item label="供应商">
            <iSelect :placeholder='$t("partsprocure.CHOOSE")' multiple collapse-tags v-model="supplierSelectlist" @visible-change="removeOther($event,'supplierSelectlist')">
              <el-option label="All" value="all"></el-option>
              <el-option v-for="(items,index) in supplierlist" :key='index' :label="items.supplierName" :value='items.supplierNum'></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="$t('Lk_LINGJIAN')" class="ccc">
            <iSelect :placeholder='$t("partsprocure.CHOOSE")' multiple collapse-tags v-model="partsSelect" @change='changeParts' @visible-change="removeOther($event,'partsSelect')">
              <el-option label="All" value="all"></el-option>
              <el-option v-for="(items,index) in partList" :key='index' :label="items.name" :value='items.value'></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="$t('LK_FSHAO')" class="ccc">
            <iSelect :placeholder='$t("partsprocure.CHOOSE")' multiple collapse-tags v-model="fsSelect" @visible-change="removeOther($event,'fsSelect')">
              <el-option label="All" value="all"></el-option>
              <template v-for="(items,index) in fslist">
                  <el-option :value="items.value" :key='index' :label="items.name"></el-option>
              </template>
            </iSelect>
          </el-form-item>
          <el-form-item :label="$t('LK_DANGQIANLUNCI')">
            <iSelect style="width:140px;" :placeholder='$t("partsprocure.CHOOSE")' multiple collapse-tags v-model="luncSelect"  @visible-change="removeOther($event,'luncSelect')">
              <el-option label="All" value="all"></el-option>
              <el-option v-for="(items,index) in RoundList" :key='index' :label="items" :value='items'></el-option>
            </iSelect>
          </el-form-item>
          <span class="floatright">
            <iButton @click="refresh" :loading='refreshLoading'>{{$t('rfq.RFQINQUIRE')}}</iButton>
            <iButton @click="reset">{{$t('rfq.RFQRESET')}}</iButton>
            <iButton @click="exportExcel" :loading='exportLoading'>导出</iButton>
          </span>
      </el-form>
    </div>
    <div id='echartsPage' v-loading='refreshLoading'></div>
  </iCard>
</template>
<script>
import {iCard,iSelect,iButton,iMessage} from 'rise'
import echarts from '@/utils/echarts'
import {chartsOptions,form,translateGetLunci} from './data'
import { quotations,findRfqInfoList,downLoadExcel } from '@/api/rfqManageMent/mouldOffer'
export default{
  components:{iCard,iSelect,iButton},
  data(){
    return {
      echarts:'',
      form:form,
      partsSelect:['all'],
      fslist:[],
      fsSelect:['all'],
      luncSelect:['all'],
      RoundList:[],
      partList:[],
      refreshLoading:false,
      supplierlist:[],
      supplierSelectlist:['all'],
      exportLoading:false
    }
  },
  created(){
    this.form.rfqId = this.$route.query.id
  },
  mounted(){
    this.initEcharts()
    this.supplierPart()
  },
  methods:{
    /**
     * @description: 导出excel
     * @param {*}
     * @return {*}
     */
    exportExcel(){
      downLoadExcel(Object.assign(this.getQuery()))
    },
    removeOther(row,type){
      if(!row){
        if(this[type].find(items=>items == "all")){
          this[type] = ['all'] 
        } 
      }
    },
    reset(){
      this.form.priceLatitude = "1"
      this.fsSelect = ['all']
      this.luncSelect = ['all']
      this.partsSelect = ['all']
      this.supplierSelectlist = ['all']
      this.getDataList()
    },
    /**
     * @description: 多选零件的时候，存在多个fs号的情况
     * @param {*}
     * @return {*}
     */   
    changeParts(row){    
      this.fslist = []
      if(row.find(items=>items == "all") || row.length == 0){
        return false
      }
      row.forEach(item=>{
        this.fslist = [...this.partList.find(items=>items.name == item).list,...this.fslist]
      })
      
    },
    /**
     * @description:刷新界面数据 
     * @param {*}
     * @return {*}
     */    
    refresh(){
      this.refreshLoading = true
      this.getDataList()
    },
    /**
     * @description:初始化echarts 
     * @param {*}
     * @return {*}
     */
    initEcharts(){
      this.getDataList()
    },
    /**
     * @description:更新echarts数据 
     * @param {*}
     * @return {*}
     */
    updateEchars(datas){
      document.getElementById('echartsPage').removeAttribute('_echarts_instance_')
      this.echarts = echarts().init(document.getElementById('echartsPage'))
      this.echarts.setOption(chartsOptions(datas,this.$t('LK_ECHARTSTITLE'),this.$t('LK_DANWEIYUAN')))
    },
    /**
     * @description: 获取数据问题 
     * @param {*}
     * @return {*}
     */    
    getDataList(){
      quotations(this.getQuery()).then(res=>{
        this.refreshLoading = false
        if(res.data && res.data){
          this.updateEchars(translateGetLunci(res.data,this.$t('LK_LUNCI'))) 
        }
      }).catch(err=>{
        this.refreshLoading = false
        iMessage.error(err.desZh)
      })
    },
    supplierPart(){
      findRfqInfoList(this.form.rfqId).then(res=>{
        if(res.data){
          this.RoundList = res.data.round
          this.supplierlist = res.data.supplier
          this.partList = this.translatePartList(res.data.partNum)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getQuery(){
      this.form.partNum = this.partsSelect.find(items=>items == "all")?[]:this.partsSelect
      this.form.round = this.luncSelect.find(items=>items == "all")?[]:this.luncSelect.sort((a,b)=>{return a-b})
      this.form.supplierID = this.supplierSelectlist.find(items=>items == "all")?[]:this.supplierSelectlist
      this.form.fsSelect = this.fsSelect.find(items=>items == 'all')?[]:this.fsSelect
      const templateMap = {}
      Object.keys(this.form).forEach(items=>{
        if(items == "fsSelect"){
          templateMap["fsNum"] = this.form[items]
        }else{
          templateMap[items] = this.form[items]
        }
      })
      return templateMap
    },
    translatePartList(datas){
      let partList = []
      datas.forEach(element => {
        if(partList.find(items=>items.name == element.partNum)){ //上方列表已经存在数据
          partList.forEach(itemss=>{ 
            if(itemss.name == element.partNum){//将当前数据推到已经存在的列表中
              itemss.list.push({
              name:element.fsNum,
              value:element.fsNum
            })
            }
          })
        }else{
          partList.push({
            name:element.partNum,
            value:element.partNum,
            list:[
              {
                name:element.fsNum,
                value:element.fsNum
              }
            ]
          })
        }
      });
      return partList
    }
  }
}
</script>
<style lang='scss' scoped>
  .echarts{
    height: 50px;
    overflow: hidden;
    ::v-deep .el-form-item{
      margin-right: 30px!important;
    }
  }
  #echartsPage{
    width: 100%;
    height: 500px;
    overflow: hidden;
  }
  .ccc{
      ::v-deep .el-form--inline {
    .el-form-item__content{
    width: 280px;
  }
  }
  }
  ::v-deep .el-select__tags{
    span{
      white-space: nowrap;
      display: inherit;
    }
  }
</style>
