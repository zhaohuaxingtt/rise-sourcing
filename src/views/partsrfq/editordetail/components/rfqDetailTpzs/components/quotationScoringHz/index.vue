:<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 14:32:04
 * @LastEditTime: 2021-06-02 16:17:39
 * @LastEditors: Please set LastEditors
 * @Description: 报价分析汇总表格
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\index.vue
-->
<template>
  <div style="position: relative;">
    <div class="quotationHz margin-bottom20">
      <!--------------输入框模块-------------->
      <div class='search'>
        <div class="needAddWhi" v-if='!disabel'>
          <span>Hide/unHide：</span>
          <iSelect v-model="backChoose" multiple :collapse-tags='true' @remove-tag='removeTags' @visible-change='visibleChange'>
            <el-option v-for='(items,index) in backChooseLists' :key='index' :label="items.label" :value="items.props"></el-option>
          </iSelect> 
        </div>
        <div v-if='showRound && !disabel'>
          <span>Quota. Round：</span>
          <iSelect v-model="round" @change="changeRound" style="width:100px">
            <el-option :label="items" :value="items" v-for='(items,index) in rundList' :key='index'></el-option>
          </iSelect> 
        </div>
        <div v-if='!disabel'>
          <span>Layout: </span>
          <iSelect v-model="layout" @change="changeLayout">
            <el-option label="FS-Parts as Row" value="1"></el-option>
            <el-option label="FS-Supplier as Row" value="2"></el-option>
            <el-option label="GS-Parts as Row" value="3"></el-option>
          </iSelect> 
        </div>            
      </div>
      <div class="btnSearch" v-if='!disabel && !disabled'>
        <iButton @click="quote" v-if='quoteShow' :loading="quoteInquiryPriceLoading">引用报价</iButton>
        <iButton @click="group"  v-if='layout == "1" && !abPrice'>组合</iButton>
        <iButton @click="removeGroup"  v-if='layout == "1" && !abPrice'>取消组合</iButton>
        <!-- <iButton>导出</iButton> -->
      </div>
      <!--------------表格模块-------------->
    </div>
    <tableList v-loading='fsTableLoading' @sortChangeTabless='sortChange' :round='round' :tableTitle='title' v-if='layout == "1" || layout == "3"' :ratingList='ratingList' :tableData='exampelData' @handleSelectionChange='handleSelectionChange'></tableList>
    <tableListSupplier ref='tableSupplier' :cWidth='cWidth' :budget='budget' :kmAPrice='kmAPrice' :kmTooling='kmTooling' v-loading='supplierTableLoading' :centerSupplierData='suppliertopList' :supplierLeftLit='supplierLeftLit' :tableTitle='supplierTile'  :tableData='supplierData' v-if='layout == "2" && showTable'></tableListSupplier>
    <div class="margin-top10 font-size14"><span style='color:red;font-size14px;'>*</span> means Invest or Develop Cost is amortized into piece price. </div>
    <!-- <tablelistGSasRow v-loading='fsTableLoading' @sortChangeTabless='sortChange' :round='round' :tableTitle='title' v-if='layout == "3"' :ratingList='ratingList' :tableData='exampelData' @handleSelectionChange='handleSelectionChange'></tablelistGSasRow> -->
    <!--------------弹窗-------------->
    <iDialog title="组合名" :visible.sync="groupVisble" width='25%' >
      <div class="mine_height">
        <span>组合名：</span><iInput v-model="groupName" />
      </div>
      <template slot='footer'>
        <iButton @click="groupVisble = false">取消</iButton>
        <iButton @click="sureClick()">确定</iButton>
      </template>
    </iDialog>
  </div>
</template>
<script>
import {iButton,iSelect,iDialog,iInput,iMessage} from 'rise'
import tableList from './components/table'
import tableListSupplier from './components/tableListSupplier'
// import tablelistGSasRow from './components/tablelistGSasRow'
import {exampelData,backChooseList,getRenderTableTile,translateData,translateRating,subtotal,defaultSort,getRenderTableTileSupplier,translateDataListSupplier,getleftTittleList,defaultLayoutTemplate} from './components/data'
import {negoAnalysisSummaryLayout,negoAnalysisSummaryLayoutSave,negoAnalysisSummaryRound,fsPartsAsRow,gsPartsAsRow,negoAnalysisSummaryGroup,negoAnalysisSummaryGroupDelete,fsSupplierAsRow, quoteInquiryPrice} from '@/api/partsrfq/editordetail'
export default{
  components:{iButton,iSelect,tableList,iDialog,iInput,tableListSupplier},
  data(){return {
    title:getRenderTableTile([],0,1),
    exampelData:exampelData,
    groupSelectData:[],
    groupVisble:false,
    layout:'1',
    supplierData:[],
    supplierTile:[],
    //轮次选择
    round:'',
    rundList:[],
    backChooseLists:[],
    backChoose:[],
    ratingList:{
      firstTile:[],
      ratingList:[]
    },
    groupName:'',
    fsTableLoading:false,
    supplierTableLoading:false,
    reRenderLastChild:'',
    suppliertopList:[],
    supplierLeftLit:[],
    showRound:true,
    quoteShow:true,
    partInfoList:[],
    bdlPriceTotalInfoList:[],
    oldExampelData:[],
    templateSummary:1,
    disabel:false,
    showTable:true,
    cWidth:'0px',
    abPrice:false,
    kmAPrice:'',
    budget:'',
    kmTooling:'',
    quoteInquiryPriceLoading: false,
  }},
  watch:{
    /**
     * @description:当前界面是否处于一个disble模式。取决于当前路由中是否存在 isPreview 字段
     * @param {*}
     * @return {*}
     */
    '$route':function(){
     try {
      if(this.$route.query.isPreview == 1){
        this.disabel = true
      }else{
        this.disabel = false
      }
      } catch (error) {
        this.disabel = false
    }
    }
  },
  inject:['getbaseInfoData', 'getDisabled'],
  computed: {
    disabled() {
      return typeof this.getDisabled === "function" ? this.getDisabled() : false
    }
  },
  created(){
    this.layout = this.getLayoutDetaultNumber()
    console.log(this.layout)
  },
  mounted(){
    this.round = this.getbaseInfoData().currentRounds || 1
    this.init()
  },
  provide(){
    return {vm:this}
  },
  methods:{
    getLayoutDetaultNumber(){
      try {
        const partProjectType = this.$route.query.businessKey
        if(!partProjectType) return '1'
        if(defaultLayoutTemplate[partProjectType]) return defaultLayoutTemplate[partProjectType]
        return '1'
      } catch (error) {
        return '1'
      }
    },
    reRenderTable(){
      this.showTable = false,
      setTimeout(() => {
        this.showTable = true
      },0)
      setTimeout(() => {
        this.getTopWidth()
      }, 500);
    },
    getTopWidth(){
      this.cWidth = this.$refs.tableSupplier.$el.querySelector('.el-table__body').offsetWidth - 100 + 'px'
    },
    removeTags(){
      this.negoAnalysisSummaryLayoutSave()
    },
    /**
     * @description: 排除group total km buget 列不需要排序外，其他的都是需要排序的列。
     * @param {*} props -表格中返回的标识。正排序 还是 反排序 还是 默认
     *            prop  - 表格中的排序字段 名字叫啥
     * @return {*}
     */
    sortChange({props,prop}){
      try {
        const notSortData = this.oldExampelData.filter(items=> items.groupId != null && items.groupId != '-')
        const sortData = this.oldExampelData.filter(items=> items.groupId == null && items.groupId != '-')
        const totalData = this.oldExampelData.filter((items)=> items.groupId == '-')
        if(props == "ascending"){
          this.exampelData = [...notSortData,...sortData.sort((a,b)=>b[prop].toString().localeCompare(a[prop].toString())),...totalData]
        }else if(props == "descending"){
          this.exampelData = [...notSortData,...sortData.sort((a,b)=>a[prop].toString().localeCompare(b[prop].toString())),...totalData]
        }else{
          this.exampelData = this.oldExampelData
        }
      } catch (error) {
        this.exampelData = this.oldExampelData
      }
    },
    changeRound(){
      this.init()
    },
    /**
     * @description: 切换tempalte展示 
     * @param {*} res
     * @return {*}
     */
    changeLayout(res){
      this.layout = res
      this.init()
    },
    removeGroup(){
      if(this.groupSelectData.length == 0){iMessage.warn('抱歉！您还未选择零件！');return}
      if(this.groupSelectData[0].groupId == null){iMessage.warn('抱歉！您选中的零件还未组合，无法取消');return}
      this.negoAnalysisSummaryGroupsDelete()
    },
    /**
     * @description: 确认组合 
     * @param {*}
     * @return {*}
     */
    sureClick(){
      this.negoAnalysisSummaryGroups()
      this.groupVisble = false
    },
    getPartNumber(list){
      const listArray = []
      list.forEach(element => {
        listArray.push(element.partPrjCode)
      });
      return listArray
    },
    getPartGroupNumber(){
      const listArray = []
      this.groupSelectData.forEach(element => {
        listArray.push(element.groupId)
      });
      return listArray
    },
        /**
     * @description:取消组合零件 
     * @param {*}
     * @return {*}
     */
    negoAnalysisSummaryGroupsDelete(){
      const sendata = {
          groupIdList: this.getPartGroupNumber(),
          rfqId: this.$route.query.id,
          scenarioType:this.templateSummary
        }
        negoAnalysisSummaryGroupDelete(sendata).then(res=>{
          if(res.code == 200){
            this.fsPartsAsRow()
          }else{
            iMessage.warn(res.desZh)
          }
        }).catch(err=>{
          iMessage.warn(err.desZh)
        })
      },
    /**
     * @description:组合零件 
     * @param {*}
     * @return {*}
     */
    negoAnalysisSummaryGroups(){
      const sendata = {
          groupName: this.groupName,
          partPrjCode: this.getPartNumber(this.groupSelectData),
          rfqId: this.$route.query.id,
          scenarioType:this.templateSummary
        }
        negoAnalysisSummaryGroup(sendata).then(res=>{
          if(res.code == 200){
            this.fsPartsAsRow()
          }else{
            iMessage.warn(res.desZh)
          }
        }).catch(err=>{
          iMessage.warn(err.desZh)
        })
      },
    async init(){
        await this.negoAnalysisSummaryRound() //获取轮次
        await this.negoAnalysisSummaryLayout(this.layout) //获取隐藏项
        if(this.layout == 1){
          await this.fsPartsAsRow()
        }else if(this.layout == 2){
          await this.supplierfsSupplierAsRow()
        }else{
          await this.fsPartsAsRow()
        }
    },
    visibleChange(res){
      if(!res){
        this.negoAnalysisSummaryLayoutSave()
      }
    },
    /**
     * @description: 获取隐藏打开项
     * @param {*}
     * @return {*}
     */
    negoAnalysisSummaryLayout(type){
      this.backChooseLists = backChooseList(this.layout);
      negoAnalysisSummaryLayout(type,this.templateSummary).then(res=>{
        if(res.data && res.data.layout){
          this.backChoose = JSON.parse(res.data.layout) // 
        }
      }).catch(err=>{
        iMessage.warn(err.desZh)
      })
    },
    /**
     * @description: 保存隐藏打开项 
     * @param {*}
     * @return {*}
     */
    negoAnalysisSummaryLayoutSave(){
      negoAnalysisSummaryLayoutSave(JSON.stringify(this.backChoose),this.layout).then(async res=>{
        if(res.code == 200){
          this.init()
        }
      }).catch(err=>{
        iMessage.warn(err.desZh)
      })
    },
    /**
     * @description: 获取报价轮次
     * @param {*}
     * @return {*}
     */
    negoAnalysisSummaryRound(){
      //兼容定点管理界面，无法拿到rfqID，定点管理这个接口也不需要请求。
      if(!this.$route.query.id) return
      negoAnalysisSummaryRound(this.$route.query.id).then(res=>{
        if(res.code == 200 && res.data){
          this.rundList = res.data
        }
      }).catch(err=>{
        iMessage.warn(err.desZh)
      })
    },
    /**
     * @description: 勾选方法 
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(val){
      this.groupSelectData = val
    },
    /**
     * @description: 获取数据。
     * @param {*}
     * @return {*}
     */
    fsPartsAsRow(){
      this.fsTableLoading = true
      // eslint-disable-next-line no-unexpected-multiline
      this.changeFnForGSandFS(this.layout).then(res=>{
        this.fsTableLoading = false
        this.clearDataFs()
        if(res.data && res.data.partInfoList && res.data.partInfoList){
          this.partInfoList = res.data.partInfoList
          this.bdlPriceTotalInfoList = res.data.bdlPriceTotalInfoList
          const relTitle = getRenderTableTile(this.backChoose,res.data.partInfoList[0].bdlInfoList.length,this.layout)
          this.title = relTitle.title
          this.reRenderLastChild = relTitle.xhLastChildProps
          this.exampelData = defaultSort(translateData(res.data.partInfoList),'groupId')
          this.ratingList = translateRating(res.data.partInfoList,res.data.bdlRateInfoList)
          this.exampelData = [...this.exampelData,...subtotal(this.title,this.exampelData,res.data.bdlPriceTotalInfoList)]
          this.oldExampelData = JSON.parse(JSON.stringify(this.exampelData))
        }
      }).catch(err=>{
        this.clearDataFs()
        this.fsTableLoading = false
        iMessage.warn(err.desZh)
      })
    },
    group(){
      if(this.groupSelectData.length == 0){
        iMessage.warn('请选择您要组合的项');
        return
      }
      if(this.groupSelectData.length == 1){
        iMessage.warn('请至少选择两项组合');
        return 
      }
      this.groupVisble = !this.groupVisble
    },
    async quote() {
      await this.$confirm(
        this.language("SHIFOUYINYONGXUNJIALUNCIBAOJIA", "是否引用询价轮次报价？"), 
        this.language("YINYONGXUNJIALUNCIBAOJIA", "引用询价轮次报价"), 
        {
          confirmButtonText: this.language("SHI", "是"),
          cancelButtonText: this.language("FOU", "否"),
        }
      )

      this.quoteInquiryPriceLoading = true
      try {
        const res = await quoteInquiryPrice({
          rfqId: this.$route.query.id
        })

        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn
        if (res.code == 200) {
          iMessage.success(message)
        } else {
          iMessage.error(message)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.quoteInquiryPriceLoading = false
      }
    },
    /**
     * @description:获取供应商横轴 
     * @param {*}
     * @return {*}
     */
    supplierfsSupplierAsRow(){
      return new Promise(r=>{
        this.supplierTableLoading = true
        fsSupplierAsRow(this.$route.query.id,this.round).then(res=>{
          this.supplierTableLoading = false
          if(res.code == 200 && res.data && res.data.bdlInfoList){
            const data = translateDataListSupplier(res.data.bdlInfoList)
            this.supplierData = data.dataList
            this.supplierTile = getRenderTableTileSupplier(this.backChoose,res.data.bdlInfoList)
            this.supplierLeftLit = getleftTittleList(this.backChoose)
            this.suppliertopList = data.topList
            this.kmAPrice = res.data.kmAPrice
            this.kmTooling = res.data.kmTooling
            this.budget = res.data.budget
            this.reRenderTable() 
            r()
          } 
        }).catch(err=>{
          this.supplierTableLoading = false
          iMessage.error(err.desZh)
        })
      })
    },
    changeFnForGSandFS(type){
      if(type == 1){
        return fsPartsAsRow(this.$route.query.id,this.round)
      }else{
        return gsPartsAsRow(this.$route.query.id,this.round)
      }
    },
    clearDataFs(){
        this.partInfoList = []
        this.bdlPriceTotalInfoList = []
        this.title = []
        this.reRenderLastChild = []
        this.exampelData = []
        this.ratingList = []
    }
  }
}
</script>
<style lang='scss' scoped>
  .mine_height{
    min-height: 100px;
    display: flex;
    span{
      width: 100px;
      line-height: 35px;
    }
  }
  .quotationHz{
    display: flex;
    justify-content: space-between;
    .search{
      &>div{
        float: left;
        margin-right: 20px;
        display: flex;
        justify-content: space-between;
        span{
          width: 160px;
          line-height: 30px;
          font-size: 14px;
        }
      }
    }
  }
  .needAddWhi{
    width: 480px;
  }
</style>
