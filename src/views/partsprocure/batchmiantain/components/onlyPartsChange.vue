<!--
 * @Author: your name
 * @Date: 2021-08-04 13:54:47
 * @LastEditTime: 2021-11-04 14:24:14
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\batchmiantain\components\onlyPartsChange.vue
-->
<template>
  <iCard>
    <div class="btn-right">
      <!-- 手工采购项目创建 -->
      <batch-miantain-output-plan :planItems="selectTions" v-permission.auto="PARTSPROCURE_BATCHMANTAINCEPRODUCTPLAN|批量维护产量计划"></batch-miantain-output-plan>
    </div>
    <iTalbeList ref='tabel' :tableLoading='loading' @handleSelectionChange='handleSelectionChange' :tableTitle='tableTitleOnlyPartsChange' :tableData='tableData'>
      <template #oldFsnrGsnrNum='{row}'>
        <iInput class="removeInputDisabelColor" disabled search :value="(typeof row.oldFsnrGsnrNum == 'string' || row.oldFsnrGsnrNum == null)?row.oldFsnrGsnrNum:row.oldFsnrGsnrNum.fsnrGsnrNum"> <i class="el-icon-search el-input__icon cursor" slot="suffix" @click="openDiologOldParts(row)"></i></iInput>	
        <!-----------------------选择原fs号--------------------------------->
        <selectOldpartsNumber :diolog='row.selectOldParts' v-model="row.oldFsnrGsnrNum" @vmodelHander='vmodelHander'></selectOldpartsNumber>
      </template>
    </iTalbeList>
  </iCard> 
</template>
<script>
import {iCard,iInput,iMessage} from 'rise'
import iTalbeList from '@/views/partsign/home/components/tableList'
import {tableTitleOnlyPartsChange} from './data'
import {getDataListBatchList} from '@/api/partsprocure/editordetail'
import selectOldpartsNumber from '@/views/partsprocure/editordetail/components/selectOldpartsNumber'
import BatchMiantainOutputPlan from '../../home/components/batchMiantainOutputPlan.vue'
import {dictkey} from "@/api/partsprocure/editordetail";
export default{
  components:{iCard,iTalbeList,selectOldpartsNumber,iInput, BatchMiantainOutputPlan},
  data(){return {
    tableTitleOnlyPartsChange:tableTitleOnlyPartsChange,
    tableData:[],
    loading:false,
    detailData:{},
    selectTions:[]
  }},
  created(){
    this.getDataList()
  },
  provide:function(){
      return {detailData:this.getDetailData}
  },
  methods:{
    vmodelHander(){
      this.tableData.forEach(element => {
        if(this.selectTions.find(i=>i.id == element.id)) this.selectTions.splice(this.selectTions.findIndex(r=>r.id == element.id),1,element)
      });
      this.$emit('handleSelectionChange',this.selectTions)
    },
    openDiologOldParts(row){
				if(row.procureFactory == '') return iMessage.warn(this.language('NINDANGQIANWEIXUANZE','您当前还未选择采购工厂，请选择后重试！'))
				row.selectOldParts.show = true
        this.detailData = row
		},
    getDetailData(){
      return this.detailData
    },
    handleSelectionChange(res){
      this.selectTions = res
      this.$emit('handleSelectionChange',this.selectTions)
    },
    /**
     * @description:获取仅零件号变更的历史记录 
     * @param {*}
     * @return {*}
     */
    getDataList(){
      this.loading = true 
      const dataIds = Array.isArray(this.$route.query.ids)?this.$route.query.ids:[this.$route.query.ids];
      getDataListBatchList({ids:dataIds}).then(res=>{  
        this.tableData = res.data.map(r=>{return {...r,...{selectOldParts:{show:false}}}})
        this.$emit('updateCategoryGroup', new Set(this.tableData.map(r=> {return {categoryId:r.categoryId,categoryCode:r.categoryCode,categoryName:r.categoryName}})))
        this.$nextTick(()=>{
					this.$refs.tabel.defaultSelectAll()
				})
        this.loading = false
      }).catch(err=>{
        this.loading = false
      })
      dictkey().then(res => {
        if(res.data) {
          this.tableData.forEach(val=>{
             res.data.PART_TYPE.forEach(value =>{
              val.partType = value.code == val.partType ? value.name : val.partType
              })
          })
        }
      })
    },
  }
}
</script>
<style lang='scss' scoped>
  .btn-right{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
	::v-deep.removeInputDisabelColor{
		.el-input__inner{
			background-color: white!important;
			cursor: pointer;
			.el-input__suffix{
				cursor: pointer!important;
			}
			.el-input__icon{
				cursor: pointer!important;
			}
		}
	}
</style>