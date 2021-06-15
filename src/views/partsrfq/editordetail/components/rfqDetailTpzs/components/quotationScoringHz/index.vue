:<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 14:32:04
 * @LastEditTime: 2021-06-02 16:17:39
 * @LastEditors: Please set LastEditors
 * @Description: 报价分析汇总表格
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\index.vue
-->
<template>
  <div>
    <div class="quotationHz margin-bottom20">
      <!--------------输入框模块-------------->
      <div class='search'>
        <div class="needAddWhi">
          <span>Hide/unHide：</span>
          <iSelect v-model="backChoose" multiple :collapse-tags='true' @visible-change='visibleChange'>
            <el-option v-for='(items,index) in backChooseLists' :key='index' :label="items.label" :value="items.props"></el-option>
          </iSelect> 
        </div>
        <div>
          <span>Quota. Round：</span>
          <iSelect v-model="round" @change="changeRound" style="width:100px">
            <el-option :label="items" :value="items" v-for='(items,index) in rundList' :key='index'></el-option>
          </iSelect> 
        </div>
        <div>
          <span>Layout: </span>
          <iSelect v-model="layout" @change="changeLayout">
            <el-option label="FS-Parts as Row" value="1"></el-option>
            <el-option label="FS-Supplier as Row" value="2"></el-option>
          </iSelect> 
        </div>            
      </div>
      <div class="btnSearch">
        <iButton @click="quote">引用报价</iButton>
        <iButton @click="group"  v-if='layout == "1"'>组合</iButton>
        <iButton @click="removeGroup"  v-if='layout == "1"'>取消组合</iButton>
        <!-- <iButton>导出</iButton> -->
      </div>
      <!--------------表格模块-------------->
    </div>
    <tableList v-loading='fsTableLoading' :tableTitle='title' v-if='layout == "1"' :ratingList='ratingList' :tableData='exampelData' @handleSelectionChange='handleSelectionChange'></tableList>
    <tableListSupplier v-loading='supplierTableLoading' :centerSupplierData='suppliertopList' :supplierLeftLit='supplierLeftLit' :tableTitle='supplierTile'  :tableData='supplierData' v-if='layout == "2"'></tableListSupplier>
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
import {exampelData,backChooseList,getRenderTableTile,translateData,translateRating,subtotal,defaultSort,getRenderTableTileSupplier,translateDataListSupplier,getleftTittleList} from './components/data'
import {negoAnalysisSummaryLayout,negoAnalysisSummaryLayoutSave,negoAnalysisSummaryRound,fsPartsAsRow,negoAnalysisSummaryGroup,negoAnalysisSummaryGroupDelete,fsSupplierAsRow} from '@/api/partsrfq/editordetail'
export default{
  components:{iButton,iSelect,tableList,iDialog,iInput,tableListSupplier},
  data(){return {
    title:getRenderTableTile([],0),
    exampelData:exampelData,
    groupSelectData:[],
    groupVisble:false,
    layout:'1',
    supplierData:[],
    supplierTile:[],
    //轮次选择
    round:this.$route.query.round,
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
    supplierLeftLit:[]
  }},
  mounted(){
    this.init()
  },
  provide(){
    return {vm:this}
  },
  methods:{
    changeRound(){
      this.init()
    },
    /**
     * @description: 切换tempalte展示 
     * @param {*} res
     * @return {*}
     */
    changeLayout(res){
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
          rfqId: this.$route.query.id
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
          rfqId: this.$route.query.id
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
        if(this.layout == 1){
          await this.negoAnalysisSummaryLayout(this.layout) //获取隐藏项
          await this.fsPartsAsRow()
        }else{
          await this.negoAnalysisSummaryLayout(this.layout) //获取隐藏项
          await this.supplierfsSupplierAsRow()
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
      negoAnalysisSummaryLayout(type).then(res=>{
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
          if(this.layout == 1){
            await this.negoAnalysisSummaryLayout(this.layout) //获取隐藏项
            await this.fsPartsAsRow()
          }else{
            await this.negoAnalysisSummaryLayout(this.layout) //获取隐藏项
            await this.supplierfsSupplierAsRow()
          }
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
      fsPartsAsRow(this.$route.query.id,this.round).then(res=>{
        this.fsTableLoading = false
        if(res.data && res.data.partInfoList && res.data.partInfoList.length){
          const relTitle = getRenderTableTile(this.backChoose,res.data.partInfoList[0].bdlInfoList.length)
          this.title = relTitle.title
          this.reRenderLastChild = relTitle.xhLastChildProps
          this.exampelData = defaultSort(translateData(res.data.partInfoList),'groupId')
          this.ratingList = translateRating(res.data.partInfoList,res.data.bdlRateInfoList)
          this.exampelData = [...this.exampelData,...subtotal(this.title,this.exampelData,res.data.bdlPriceTotalInfoList)]
        }
      }).catch(err=>{
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
    quote() {
      this.$confirm('是否引用询价轮次报价?', '引用询价轮次报价', {
        confirmButtonText: '是',
        cancelButtonText: '否',
      })
      .then(() => {
        
      })
      .catch(() => {});
    },
    /**
     * @description:获取供应商横轴 
     * @param {*}
     * @return {*}
     */
    supplierfsSupplierAsRow(){
      this.supplierTableLoading = true
      fsSupplierAsRow(this.$route.query.id,this.round).then(res=>{
        this.supplierTableLoading = false
        if(res.code == 200 && res.data && res.data.bdlInfoList){
          this.supplierData = translateDataListSupplier(res.data.bdlInfoList).dataList
          this.supplierTile = getRenderTableTileSupplier(this.backChoose,res.data.bdlInfoList)
          this.supplierLeftLit = getleftTittleList(this.backChoose)
          this.suppliertopList = translateDataListSupplier(res.data.bdlInfoList).topList
        } 
      }).catch(err=>{
        this.supplierTableLoading = false
        iMessage.error(err.desZh)
      })
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
