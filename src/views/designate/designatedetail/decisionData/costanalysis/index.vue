<!--
 * @Author: your name
 * @Date: 2021-11-02 15:22:44
 * @LastEditTime: 2021-11-08 18:59:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\costanalysis\index.vue
-->
<template>
<iCard>
  <iFormGroup row='4' label-width='100px' class="Iform">
    <iFormItem  label='分析类型：'>
      <iSelect v-model="typeSelect" @change="costanalysisList">
        <el-option v-for='(items,index) in arrayOfselect' :label='items.label' :value='items.value' :key='index'></el-option>
      </iSelect>
    </iFormItem>
    <iFormItem v-if='isPreview'  label='Analysis：'>
      <iSelect v-model="typeSelect" @change="costanalysisList">
        <el-option v-for='(items,index) in arrayOfselect' :label='items.label' :value='items.value' :key='index'></el-option>
      </iSelect>
    </iFormItem>
  </iFormGroup>
  <tabel v-if='!isPreview' :tableLoading='loading' :tableTitle='tableTitle' :tableData='tableData' selection>
    <template #operate='scope'>
      <span class="underline" @click="openPage(scope.row)">查看</span>
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
  <iDialog v-if='!isPreview' :visible.sync="messageBox" width='80%' height='60vh'>
      <div style="height:70vh">
        <template v-if="['PCA','TIA'].includes(typeSelect)">
          <iframe v-if='pdfUrl' :src="pdfUrl" frameborder="0" height="97%" width="100%"></iframe>
          <span v-else>当前暂无PDF/或者图片可以查看</span>
        </template>
        <template v-else>
          <span>这是一个echarts</span>
        </template>
      </div>
  </iDialog>
</iCard>
</template>
<script>
import {iCard,iFormGroup,iFormItem,iSelect,iDialog} from 'rise'
import tabel from '@/views/partsign/home/components/tableList'
import {arrayOfselect,tableTitle} from './data'
import {costanalysisList,costanalysisShow,costanalysisSort} from '@/api/designate/decisiondata/costanalysis'
export default{
  components:{iCard,iFormGroup,iFormItem,iSelect,tabel,iDialog},
  data(){
    return {
      typesOfData:'',
      arrayOfselect,
      tableTitle,
      tableData:[],
      typeSelect:'BOB',
      loading:false,
      messageBox:false,
      isPreview:false
    }
  },
  created(){
    this.costanalysisList()
    //当前状态是否是预览状态
    this.isPreview = this.$route.query.isPreview == 1
  },
  methods:{
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
        this.pdfUrl = row.fileList.length?row.fileList[0].filePath:null
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
      this.loading = true
      const id = this.$route.query.desinateId
      costanalysisList(id,this.typeSelect).then(r=>{
        this.loading = false
        this.tableData = r.data
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