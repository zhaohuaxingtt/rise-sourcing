<!--
 * @Author: yuszhou 
 * @Date: 2021-10-14 17:53:29
 * @LastEditTime: 2021-10-25 21:54:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\bidOpenResult.vue
-->
<template>
  <iDialog :title='language("KAIBIAOJIEGUO","开标结果")' :visible.sync="options.show">
    <tabelList class="padding-bottom20" :tableTitle='suplierTableDataTitel' :tableData='tabelData'></tabelList>
  </iDialog>
</template>
<script>
import {iDialog} from 'rise'
import tabelList from '@/views/partsign/home/components/tableList'
import {suplierTableDataTitel} from './data'
import {getPriceRank} from '@/api/partsrfq/editordetail'
export default{
  components:{iDialog,tabelList},
  props:{
    options:{
      type:Object,
      default:()=>{}
    },
    round:Number
  },
  data(){
    return {
      suplierTableDataTitel,
      tabelData:[]
    }
  },
  watch:{
    'options.show':function(r){
      this.getSupplierLevelList()
    }
  },
  methods:{
    /**
     * @description: 获取供应商排名 
     * @param {*}
     * @return {*}
     */
    getSupplierLevelList(){
      const sendData = {
        rfqCode:this.$route.query.id,
        rfqRound:this.round
      }
      getPriceRank(sendData).then(r=>{
        console.log(r)
        if(r.data && r.data.supplierRanks.length){
          this.tabelData = r.data.supplierRanks
        }
      })  
    }
  }
}
</script>
<style lang='scss' scoped>
</style>