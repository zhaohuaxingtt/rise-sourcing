<!--
 * @Author: your name
 * @Date: 2021-05-26 13:55:55
 * @LastEditTime: 2021-06-21 16:13:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplier\quotationdetail\index.vue
-->
<script>
import quotationDetail from "rise/web/quotationdetail"
import {iMessage} from 'rise'
import {quotations, getNoticeStatus} from '@/api/rfqManageMent/workingRfq'
export default {
  extends: quotationDetail,
  created(){
    this.currentTab = this.$route.query.currentTab?this.$route.query.currentTab:this.currentTab 
    this.watingSupplier = this.$route.query.watingSupplier?this.$route.query.watingSupplier:false
  },
  methods:{
    /**
     * @description: 确认拒绝
     * @param {*}
     * @return {*}
     */
    sueReject(){
      if(this.rejectRason == ''){
        iMessage.warn('拒绝理由不能为空')
        return
      }
      this.quotations(2)
    },
    /**
     * @description: 接受报价
     * @param {*}
     * @return {*}
     */
    async agreePrice() {
      const status = await this.getNoticeStatus()
      if (!status) return
      
      this.quotations(1)
    },
    /**
     * @description: 签收拒绝 
     * @param {*} type
     * @return {*}
     */    
    quotations(type){
      const sendData = {
        acceptType:type,
        rfqRoundInfoList:[{rounds:this.$route.query.round,rfqId:this.$route.query.rfqId}],
        supplierId: this.$route.query.supplierId
      }
      quotations({rfqAcceptQuotationScenes:sendData}).then(res=>{
        if(res.code == 200){
          this.getPartsQuotations()
          iMessage.success('操作成功！')
          this.dialogVisible = false
        }else{
          iMessage.error(res.desZh)
          this.dialogVisible = false
        }
      }).catch(err=>{
        iMessage.error(err.desZh)
        console.warn(err)
      })
    }
  }
}
</script>