<!--
 * @Author: your name
 * @Date: 2021-08-04 13:54:47
 * @LastEditTime: 2021-08-17 17:33:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\batchmiantain\components\onlyPartsChange.vue
-->
<template>
  <iCard>
    <iTalbeList :tableLoading='loading' @handleSelectionChange='handleSelectionChange' :tableTitle='tableTitleOnlyPartsChange' :tableData='tableData'>
      <template #oldFsnrGsnrNum='{row}'>
        <iInput class="removeInputDisabelColor" disabled search :value="(typeof row.oldFsnrGsnrNum == 'string')?row.oldFsnrGsnrNum:row.oldFsnrGsnrNum.fsnrGsnrNum"> <i class="el-icon-search el-input__icon" slot="suffix" @click="()=>{selectOldParts.show=true;detailData=row}"></i></iInput>	
        <!-----------------------选择原fs号--------------------------------->
        <selectOldpartsNumber :diolog='selectOldParts' v-model="row.oldFsnrGsnrNum"></selectOldpartsNumber>
      </template>
    </iTalbeList>
  </iCard> 
</template>
<script>
import {iCard,iInput} from 'rise'
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
    selectOldParts:{
      show:false
    },
    detailData:{}
  }},
  created(){
    this.getDataList()
  },
  provide:function(){
      return {detailData:this.getDetailData}
  },
  methods:{
    getDetailData(){
      return this.detailData
    },
    handleSelectionChange(res){
      this.$emit('handleSelectionChange',res)
    },
    /**
     * @description:获取仅零件号变更的历史记录 
     * @param {*}
     * @return {*}
     */
    getDataList(){
      this.loading = true 
      const dataIds = this.$route.query.ids
      getDataListBatchList({ids:dataIds}).then(res=>{  
        this.tableData = res.data
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