<!--
 * @Author: yuszhou
 * @Date: 2021-04-23 09:16:48
 * @LastEditTime: 2022-01-13 14:18:20
 * @LastEditors: caopeng
 * @Description: 供应商维度展示
 * @FilePath: \front-sourcing-new\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringEcartsCard\previewEcharts.vue
-->
<template>
  <!----------------------------------------------------------->
  <!------------------- 供应商报价报价趋势图 --------------------->
  <!----------------------------------------------------------->
  <div>
    <div class="margin-bottom20 echarts">
      <el-form inline>
          <el-form-item :label="language('PI.JIAGEWEIDU','价格维度')" v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAQUSHI_JIAGEWEIDU_SELECT|价格维度">
            <iSelect style="width:90PX;" :placeholder="language('partsprocure.CHOOSE','请选择')" v-model="form.priceLatitude">
              <el-option label="MixPrice" value='1'></el-option>
              <el-option label="To" value='2'></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('costanalysismanage.GongYingShang','供应商')" v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAQUSHI_GONGYINGSHANG_SELECT|供应商" >
            <iSelect :placeholder="language('partsprocure.CHOOSE','请选择')" multiple collapse-tags v-model="supplierSelectlist" @change="onFilteDataChange($event,'supplierSelectlist')">
              <el-option label="All" value="all"></el-option>
              <el-option v-for="(items,index) in supplierlist" :key='index' :label="items.supplierName" :value='items.supplierNum'></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('Lk_LINGJIAN','零件')" class="ccc partClass"  v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAQUSHI_LINGJIAN_SELECT|零件">
            <iSelect :placeholder="language('partsprocure.CHOOSE','请选择')" multiple collapse-tags v-model="partsSelect" @change="onFilteDataChange($event,'partsSelect')" >
              <el-option label="All" value="all"></el-option>
              <el-option v-for="(items,index) in partList" :key='index' :label="items.name" :value='items.value'></el-option>
            </iSelect>
          </el-form-item>
          <!-- <el-form-item :label="language('LK_FSHAO','FS号')" class="ccc" v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAQUSHI_FSHAO_SELECT|FS号">
            <iSelect :placeholder="language('partsprocure.CHOOSE','请选择')" multiple collapse-tags v-model="fsSelect" @visible-change="removeOther($event,'fsSelect')">
              <el-option label="All" value="all"></el-option>
              <template v-for="(items,index) in fslist">
                  <el-option :value="items.value" :key='index' :label="items.name"></el-option>
              </template>
            </iSelect>
          </el-form-item> -->
          <el-form-item :label="language('LK_DANGQIANLUNCI','当前轮次')" v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAQUSHI_DANGQIANLUNCI_SELECT|当前轮次">
            <iSelect style="width:140PX;" :placeholder="language('partsprocure.CHOOSE','请选择')" multiple collapse-tags v-model="luncSelect"  @change="onFilteDataChange($event,'luncSelect')">
              <el-option label="All" value="all"></el-option>
              <el-option v-for="(items,index) in RoundList" :key='index' :label="items" :value='items'></el-option>
              <el-option label="Latest Offer" value="-1"></el-option>
            </iSelect>
          </el-form-item>
          <span class="floatright">
            <iButton v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAQUSHI_CHAXUN_BUTTON|查询" @click="refresh" :loading='refreshLoading'>{{language('rfq.RFQINQUIRE','查询')}}</iButton>
            <iButton @click="reset" v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAQUSHI_CHONGZHI_BUTTON|重置">{{language('rfq.RFQRESET','重置')}}</iButton>
            <iButton @click="exportExcel" :loading='exportLoading' v-permission.auto="RFQ_DETAIL_TIPS_BAOJIAQUSHI_DAOCHU_BUTTON|导出">{{language('LK_DAOCHU','导出')}}</iButton>
          </span>
      </el-form>
    </div>
    <div id='echartsPage' v-loading='refreshLoading'></div>
  </div>
</template>
<script>
import {iSelect,iButton,iMessage} from 'rise'
import echarts from '@/utils/echarts'
import {chartsOptions,form,translateGetLunci} from './data'
import { quotations,findRfqInfoList,downLoadExcel,rfqQueryLinkage,downLoadExcelTwo } from '@/api/rfqManageMent/mouldOffer'
export default{
  components:{iSelect,iButton},
  props:{
    rfqId:String
  },
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
      exportLoading:false,
      filterQUeue: [], //报价趋势筛选队列，用于条件寄存
    }
  },
  created(){
    this.form.rfqId = this.$route.query.id || this.rfqId
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
   async exportExcel(v){
    const res= await downLoadExcel(Object.assign(this.getQuery()))
    },
      exportExcelTwo(v){
        return new Promise (r=>{
            const res= downLoadExcelTwo(Object.assign(this.getQuery()))
            r(res)
        })
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
      // 清空寄存列表
      this.filterQUeue = []
      this.getDataList()
      // 还原原来的筛选
      this.supplierPart()
    },
    onFilteDataChange(data=[], props) {
      if (!data.length || data[data.length - 1] === 'all') {
        this[props]=['all']
      } else {
        this[props]=data.filter(item => item !== 'all')
      }
      if (props === 'partsSelect') {
        // 原来的逻辑
        this.changeParts(data)
      }
      // 筛选寄存
      if (!this.filterQUeue.includes(props)) this.filterQUeue.push(props)
      // 联动
      this.$nextTick(() => {this.rfqQueryLinkage(data, props)})
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
        this.fslist = [...this.partList.find(items=>items.value == item).list,...this.fslist]
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
          const rfqPartQuotationListVOList = res.data.rfqPartQuotationListVOList || []
          this.updateEchars(translateGetLunci(rfqPartQuotationListVOList,this.$t('LK_LUNCI'))) 
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
      this.form.partNum = this.partsSelect.find(items=>items == "all")?[]:this.partList.filter(o => this.partsSelect.includes(o.fsNum)).map(o => o.partNum).filter(o => o)
      this.form.round = this.luncSelect.find(items=>items == "all")?[]:this.luncSelect.sort((a,b)=>{return a-b})
      this.form.supplierID = this.supplierSelectlist.find(items=>items == "all")?[]:this.supplierSelectlist
      // 之前的一个bug，fs号唯一，零件号不唯一，所以选中零件号，才会传对应的fs号,零件号关联了FS号和零件号2哥条件
      this.form.fsSelect = this.partsSelect.find(items=>items == "all")?[]:this.partsSelect
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
              fsNum: element.fsNum,
              partNum: element.partNum,
              name:element.fsNum,
              value:element.fsNum
            })
            }
          })
        }else{
          partList.push({
            name:element.partNum+'-'+element.fsNum+'-'+element.partName+'-'+element.partNameDe,
            value:element.fsNum,
            partNum: element.partNum,
            fsNum: element.fsNum,
            list:[
              {
                fsNum: element.fsNum,
                partNum: element.partNum,
                name:element.fsNum,
                value:element.fsNum
              }
            ]
          })
        }
      });
      return partList
    },
    // 根据供应商查询零件和轮次列表
    rfqQueryLinkage(val=[], key='supplierSelectlist') {
      const supplierIdList =  this.supplierSelectlist.filter(o => o !== 'all')
      const roundList =  this.luncSelect.filter(o => o !== 'all')
      // 查找选中零件的FS号
      const partNumList =  this.partsSelect.filter(o => o !== 'all')
      const fsNumListArray = this.partList.filter(o => partNumList.includes(o.value))
      const fsNumList = fsNumListArray.map(o=> o.fsNum)
      const params = {
        rfqId: this.form.rfqId,
        supplierIdList,
        fsNumList,
        roundList
      }
      rfqQueryLinkage(params).then(res => {
        if (res && res.code === '200') {
          // 待更新的key
          const queueArrayKeys = ['supplierSelectlist','partsSelect','luncSelect']
          // 求 待更新的key与已经寄存的key的交集
          const intersectionArray = window._.intersection(queueArrayKeys, this.filterQUeue)
          // 在寄存列表中的条件枚举不更新(寄存下来),其他对应的枚举要更新
          const willBefiltedArray = queueArrayKeys.filter(o => !intersectionArray.includes(o))
          // 遍历待更新的列表
          willBefiltedArray.forEach(key => {
            // 更新供应商
            if (key === 'supplierSelectlist') this.supplierlist = res.data.supplier || []
            // 更新零件
            if (key === 'partsSelect') this.partList = this.translatePartList(res.data.partNum || [])
            // 更新轮次
            if (key === 'luncSelect') this.RoundList = res.data.round || []
          })
        }
      })
    } 
  }
}
</script>
<style lang='scss' scoped>
  .laschildwidth{
    width: 350px;
  }
  .partClass{
    ::v-deep .el-select{
      width:300px !important
      
    }
  }
  .echarts{
    height: 50px;
    ::v-deep .el-form-item{
      margin-right: 30px!important;
        .el-select__tags-text{
          overflow: hidden;
          max-width: 160px
        }
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
