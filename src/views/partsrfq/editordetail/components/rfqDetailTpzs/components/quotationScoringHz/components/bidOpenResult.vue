<!--
 * @Author: yuszhou 
 * @Date: 2021-10-14 17:53:29
 * @LastEditTime: 2021-10-14 19:46:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\bidOpenResult.vue
-->
<template>
  <iDialog :title='language("KAIBIAOJIEGUO","开标结果")' :visible.sync="options.show">
    <tabelList :tableTitle='suplierTableDataTitel' :tabelData='tabelData'></tabelList>
  </iDialog>
</template>
<script>
import {iDialog} from 'rise'
import tabelList from '@/views/partsign/home/components/tableList'
import {suplierTableDataTitel} from './data'
export default{
  components:{iDialog,tabelList},
  props:{
    options:{
      type:Object,
      default:()=>{}
    }
  },
  data(){
    return {
      suplierTableDataTitel,
      tabelData:[]
    }
  },
  watch:{
    'options.show':function(){
      this.getSupplierLevelList()
    }
  },
  methods:{
    /**
     * @description: 获取供应商排名 
     * @param {*}
     * @return {*}
     */
    getSupplierLevelList(){}
  }
}
</script>
<style lang='scss' scoped>
</style>