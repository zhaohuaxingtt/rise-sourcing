<!--
 * @Author: yuszhou 
 * @Date: 2021-10-14 17:53:29
 * @LastEditTime: 2021-12-01 22:20:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\bidOpenResult.vue
-->
<template>
  <iDialog :title='language("KAIBIAOJIEGUO","开标结果")' :visible.sync="options.show">
    <tabelList class="padding-bottom20" :tableTitle='suplierTableDataTitel' :tableData='tabelData'>
      <template #currentSort='scope'>
        <span v-if='scope.row.trafficLight'>
          <icon symbol :name='ligth[scope.row.trafficLight]'></icon>
        </span>
        <span v-else>
          {{scope.row.currentSort}}
        </span>
      </template>
    </tabelList>
  </iDialog>
</template>
<script>
import {iDialog,icon} from 'rise'
import tabelList from '@/views/partsign/home/components/tableList'
import {suplierTableDataTitel} from './data'
import {getPriceRank} from '@/api/partsrfq/editordetail'
export default{
  components:{iDialog,tabelList,icon},
  props:{
    options:{
      type:Object,
      default:()=>{}
    },
    round:Number,
    rundList:{
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return {
      suplierTableDataTitel,
      tabelData:[],
      ligth:{
        '01':'iconlvdeng',
        '02':'iconhuangdeng',
        '03':'iconhongdeng',
      }
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
        rfqRound:this.round>0?this.round:'' || this.rundList[this.rundList.length-1] || 0
      }
      getPriceRank(sendData).then(r=>{
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