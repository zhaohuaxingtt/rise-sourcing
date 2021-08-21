<!--
 * @Author: your name
 * @Date: 2021-08-04 13:54:47
 * @LastEditTime: 2021-08-21 16:34:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\batchmiantain\components\onlyPartsChange.vue
-->
<template>
  <iCard>
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
export default{
  components:{iCard,iTalbeList,selectOldpartsNumber,iInput},
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
        this.$nextTick(()=>{
					this.$refs.tabel.defaultSelectAll()
				})
        this.loading = false
      }).catch(err=>{
        this.loading = false
      })
    }
  }
}
</script>
<style lang='scss' scoped>
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