<!--
 * @Author: yuszhou
 * @Date: 2021-05-27 14:55:03
 * @LastEditTime: 2021-06-15 19:17:44
 * @LastEditors: Please set LastEditors
 * @Description: 采购员报价与基本分析模具界面
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringMj\index.vue
-->
<script>
import {getRfqSupplierList} from '@/api/designate/supplier'
import quotationMj from 'rise/web/mouldOffer/components/moduleCost'
export default {
  extends:quotationMj,
  data(){
    return {
      useCardSlot:false,
      hasSupplierComponets:true,
      supplierId:'11034',
      supplierList:[],
      myDisabled:true,
      titleKey:"BJZS.LK_BAOJIAZUSHOU_MJ"
    }
  },
  computed:{
    disabled(){
      return !this.dgysBj
    }
  },
  created(){
    this.partInfo.rfqId = parseInt(this.$route.query.id)
    this.partInfo.currentRounds = parseInt(this.$route.query.round)
    console.log("testtttttttttttttttttt")
    this.getRfqSupplierList().then(r=>{
      this.getAllMouldFee()
    })
    this.getAllPartForMould()
  },
  methods:{
    getFee(res){
      this.getAllMouldFee()
      this.getAllPartForMould()
    },
    getRfqSupplierList(){
     return new Promise(r=>{
       getRfqSupplierList({rfqId:this.partInfo.rfqId}).then(res=>{
         r(res)
         if(res && res.code == 200){
           this.supplierId = res.data[0].supplierId
           this.supplierList = res.data
         }
       }).catch(err=>{
         r()
       })
     })
    }
  }
}
</script>