<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-11-02 15:32:59
 * @LastEditTime: 2021-11-02 17:59:01
 * @LastEditors:  
-->
<template>
  <iPage>
    <iCard class="outputPlan tabCard"  tabCard collapse  :title="价格记录">
      <div class="btnRight">
        <iButton @click="SyncPriceRecord">
          同步价格记录
        </iButton>
      </div>
      <div>
        <tableList
          :selection="false"
          :tableTitle='priceTitle'
          :tableData="tableData"
          :tableLoading="tableLoading"
        >
        </tableList>
      </div>
    </iCard>
  </iPage>
</template>
<script>
import {iCard, iButton, iPage, iMessage} from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import {getSupplierPriceRecord,syncPriceRecords} from '@/api/partsprocure/editordetail'
import {priceTitle} from './data'
export default {
  components: {
    iCard, iButton, iPage, tableList
  },
  data() {
    return {
      priceTitle ,
      tableData: [],
      tableLoading: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.tableLoading = true
      let data ={
        fsnrGsnrNum:this.$route.query.fsnrGsnrNum,
        partNum:this.$route.query.partNum,
        partType:this.$route.query.partType,
        procureFactoryId:this.$route.query.procureFactoryId,
        supplierId:this.$route.query.supplierId
      }
      console.log(data);
      getSupplierPriceRecord(data).then(res => {
        if(res.result == true ){
          this.tableLoading = false
          this.tableData = res.data
        } else {
          this.tableLoading = false
          console.log('false---------------------------------');
          return iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    },
    SyncPriceRecord() {
      let data={
        fsnrGsnrNum:this.$route.query.fsnrGsnrNum,
        nomiRecordDetailId:this.$route.query.nomiRecordDetailId,
        priceList:this.tableData,
        supplierId:this.$route.query.supplierId
      }
      syncPriceRecords(data).then(res=>{
         if(res.result == true) {
          return iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        } else {
          return iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .btnRight{
    display: flex;
    justify-content: flex-end;
    margin: 0 0 20px 0;
  }
</style>