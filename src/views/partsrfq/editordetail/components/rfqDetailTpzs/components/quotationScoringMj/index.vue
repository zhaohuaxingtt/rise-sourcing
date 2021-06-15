<!--
 * @Author: yuszhou
 * @Date: 2021-05-27 14:55:03
 * @LastEditTime: 2021-06-15 20:57:38
 * @LastEditors: Please set LastEditors
 * @Description: 采购员报价与基本分析模具界面
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringMj\index.vue
-->
<script>
import {getRfqSupplierList} from '@/api/designate/supplier'
import quotationMj from 'rise/web/mouldOffer/components/moduleCost'
import {iMessageBox} from 'rise'
export default {
  extends:quotationMj,
  data(){
    return {
      useCardSlot:false,
      hasSupplierComponets:true,
      supplierId:'',
      supplierList:[],
      myDisabled:true,
      titleKey:"BJZS.LK_BAOJIAZUSHOU_MJ",
      oldSupplierId:''
    }
  },
  computed:{
    disabled(){
      return !this.dgysBj
    }
  },
  watch:{
    /**
     * @description: 记录上一次的供应商值
     * @param {*} old
     * @param {*} val
     * @return {*}
     */
    "supplierId":function(old,val){
      this.oldSupplierId = val
    }
  },
  created(){
    this.partInfo.rfqId = parseInt(this.$route.query.id)
    this.partInfo.currentRounds = parseInt(this.$route.query.round)
    this.getRfqSupplierList().then(r=>{
      this.getAllMouldFee()
    })
    this.getAllPartForMould()
  },
  methods:{
    getFee(res){
      if(this.dgysBj && this.tableListData.length > 0){
        iMessageBox("您确定要切换供应商吗？").then(res=>{
          this.tableListData = []
          this.getAllMouldFee()
          this.getAllPartForMould()
        }).catch(()=>{
          this.supplierId = this.oldSupplierId
        })
      }else{
        this.tableListData = []
        this.getAllMouldFee()
        this.getAllPartForMould()
      }
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