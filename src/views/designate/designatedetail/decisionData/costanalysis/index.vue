<!--
 * @Author: your name
 * @Date: 2021-11-02 15:22:44
 * @LastEditTime: 2021-11-18 02:04:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\costanalysis\index.vue
-->
<template>
<iCard>
  <iFormGroup row='4' label-width='100px' class="Iform">
    <iFormItem  :label='language("FENXILEIX","分析类型")'>
      <iSelect v-model="typeSelect" @change="costanalysisList">
        <el-option v-for='(items,index) in arrayOfselect' :label='items.label' :value='items.value' :key='index'></el-option>
      </iSelect>
    </iFormItem>
    <iFormItem  v-if='isPreview'  label='Analysis：'>
      <iSelect v-model="previewItems" v-loading='loadingRight' @change="refresh">
        <el-option v-for='(items,index) in (tableData.filter(r=>r.flag))' :label='items.bizId + "-" + items.stuffName + "" + items.analysisName' :value='JSON.stringify(items)' :key='index'></el-option>
      </iSelect>
    </iFormItem>
  </iFormGroup>
  <tabel v-if='!isPreview' :tableLoading='loading' :tableTitle='tableTitle' :tableData='tableData' selection>
    <template #operate='scope'>
      <span class="underline" @click="openPage(scope.row)">{{language('CHAKAN','查看')}}</span>
    </template>
    <template #flag='scope'>
      <span class="bule font10 cursor" @click="costanalysisShow(scope.row)">
        <i v-if='scope.row.flag' class="iconfont iconxianshi"></i>
        <i v-else class="iconfont iconyincang"></i>
      </span>
    </template>
    <template #sortOrder='scope'> 
      <span class="bule font10 cursor">
        <i @click="upOrDown(scope.row,1)" class="iconfont iconpaixu-xiangshang margin-right10"></i>
        <i @click="upOrDown(scope.row,0)" class="iconfont iconpaixu-xiangxia"></i>
      </span>
    </template>
  </tabel>
  <iDialog v-if='!isPreview' :visible.sync="messageBox" width='80%'>
      <div style="min-height:70vh" class="flex-center-center">
        <template v-if="['PCA','TIA'].includes(typeSelect)">
          <iframe v-if='pdfUrl' :src="pdfUrl" frameborder="0" height="97%" width="100%"></iframe>
          <span v-else>{{language('DANGQIANZANWUCHAKAN','当前分析类型暂无PDF/图片可以查看')}}</span>
        </template>
        <template v-else>
          <echartsComponents v-if='messageBox' :rfqId='rfqId'></echartsComponents>
        </template>
      </div>
  </iDialog>
  <div v-if='isPreview'>
    <bob v-if='typeSelect == "BOB" && previewItems' :propSchemeId='JSON.parse(previewItems).bizId' :key='keysRender'></bob>
    <vp v-else-if='typeSelect == "VP" && previewItems' propType='edit' :propSchemeId='JSON.parse(previewItems).bizId' :key='keysRender'></vp>
    <pi v-else-if='typeSelect == "PI" && previewItems' :propSchemeId='JSON.parse(previewItems).bizId' :key='keysRender'></pi>
    <div v-else-if='["PCA","TIA"].includes(typeSelect)' style="height:600px" class="flex-center-center" :key='keysRender'>
      <iframe height='600px' width="100%" v-if='previewItems && JSON.parse(previewItems).fileList && JSON.parse(previewItems).fileList[0].filePath' :src="JSON.parse(previewItems).fileList[0].filePath" frameborder="0"></iframe>
      <div v-else>抱歉当前类型暂无预览文件</div>
    </div>
    <template v-else-if='typeSelect == "QT"'>
        <echartsComponents v-if='previewItems' :rfqId='JSON.parse(previewItems).rfqId' :key='keysRender'></echartsComponents>
    </template>
    <template v-else>
      <mek v-if='previewItems' :propSchemeId='JSON.parse(previewItems).bizId' :key='keysRender'></mek>
    </template>
  </div>
</iCard>
</template>
<script>
import {iCard,iFormGroup,iFormItem,iSelect,iDialog} from 'rise'
import tabel from '@/views/partsign/home/components/tableList'
import {arrayOfselect,tableTitle} from './data'
import {costanalysisList,costanalysisShow,costanalysisSort} from '@/api/designate/decisiondata/costanalysis'
import bob from '@/views/partsrfq/bob/newReport'
import vp from '@/views/partsrfq/vpAnalyse/vpAnalyseDetail'
import pi from '@/views/partsrfq/piAnalyse/piDetail'
import mek from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/mek/mekDetails'
import echartsComponents from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/quotationScoringEcartsCard/previewEcharts'
export default{
  components:{iCard,iFormGroup,iFormItem,iSelect,tabel,iDialog,bob,vp,pi,mek,echartsComponents},
  data(){
    return {
      typesOfData:'',
      arrayOfselect,
      tableTitle,
      tableData:[],
      typeSelect:'BOB',
      loading:false,
      messageBox:false,
      isPreview:false,
      previewItems:null,
      keysRender:parseInt(Math.random()*100000000000)
    }
  },
  created(){
    this.costanalysisList()
    //当前状态是否是预览状态
    this.isPreview = this.$route.query.isPreview == 1
  },
  methods:{
    refresh(){
      this.keysRender = parseInt(Math.random()*10000000000)
    },
        /**
     * @description: 是否展示
     * @param {*}
     * @return {*}
     */
    upOrDown({id},type){
      costanalysisSort({id:id,type:type}).then(r=>{
        if(r.result){
          this.costanalysisList()
        }
      })
    },
    /**
     * @description: 是否展示
     * @param {*}
     * @return {*}
     */
    costanalysisShow(row){
      costanalysisShow({flag:(!row.flag)-0,id:row.id}).then(r=>{
        if(r.result){
          this.costanalysisList()
        }
      })
    },
    /**
     * @description: 根据不同的类型，跳转到不同的编辑界面。 
     * @param {*}
     * @return {*}
     */
    openPage(row){
      if(['PCA','TIA','QT'].includes(this.typeSelect)){
       try {
          this.pdfUrl = row.fileList.length?row.fileList[0].filePath:null
       } catch (error) {
          this.pdfUrl = ''
          this.rfqId = ''
       }
        this.rfqId = row.rfqId
        this.messageBox = true
        return 
      }
      const urlMaps = {
        'BOB':`sourcing/partsrfq/bobNew?chemeId=${row.bizId}&rfqId=${row.rfqId}&groupId=`,
        'VP':`sourcing/partsrfq/vpAnalyseDetail?type=edit&schemeId=${row.bizId}&round&rfqId=${row.rfqId}`,
        'PI':`sourcing/partsrfq/piAnalyseDetail?schemeId=${row.bizId}&rfqId=${row.rfqId}`,
        'MEK':`sourcing/mek/mekDetails?chemeId=${row.bizId}&rfqId=${row.rfqId}`
      }
      window.open(process.env.VUE_APP_SOURCING_URL + urlMaps[this.typeSelect],'_blank')
    },
    costanalysisList(){
      this.previewItems = null
      this.loading = true
      const id = this.$route.query.desinateId
      this.loadingRight = true
      costanalysisList(id,this.typeSelect).then(r=>{
        this.loading = false
        this.tableData = r.data
        this.loadingRight = false
      }).catch(()=>{
        this.loading = false
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.Iform{
    ::v-deep.el-form-item__content{
      margin-left: 0px!important;
    }
}
</style>