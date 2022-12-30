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
import {quotations} from '@/api/rfqManageMent/workingRfq'
import {getNoticeStatus} from "@/api/rfqManageMent/quotationdetail"
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

    getNoticeStatus() {
      this.agentQutationLoading = true

      return new Promise(resolve => {
        getNoticeStatus({
          serverCode:this.$route.query.rfqId,
          supplierId: this.supplierId,
          type: "RFQ" // 该字段必传，但是这个把RFQ和CARBON的状态都返回了，所以这个接口只用调一次
        })
        .then(res => {
          if (res.code == 200) {
            // rfqStatus 询价承诺书状态  carbonStatus 可再生能源使用承诺书状态
            if (!+res.data.rfqStatus) { // 0 拒绝  1同意 
              iMessage.warn(this.language("GONGYINGSHANGWEIQIANSHUXUNJIACHENGNUOSHU", "供应商未签署《询价承诺书》，不可代报价"))
              resolve(false)
            } else {
              if (!+res.data.agreementStatus) { // 0 拒绝  1同意 
                iMessage.warn(this.$t("供应商未签署合规协议告知书不可代报价"))
                resolve(false)
              } else {
                resolve(true)
              }
            }
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            resolve(false)
          }
        })
        .finally(() => this.agentQutationLoading = false)
      })
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