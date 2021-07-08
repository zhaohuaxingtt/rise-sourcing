<!--
 * @Author: yuszhou
 * @Date: 2021-05-27 14:55:03
 * @LastEditTime: 2021-07-07 18:50:22
 * @LastEditors: Please set LastEditors
 * @Description: 采购员报价与基本分析模具界面
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringMj\index.vue
-->
<script>
import {getRfqSupplierList} from '@/api/designate/supplier'
import quotationMj from 'rise/web/mouldOffer/components/moduleCost'
import {hasShowDelegate} from '@/api/partsrfq/editordetail'
import {iMessageBox,iMessage} from 'rise'
export default {
  extends:quotationMj,
  inject:['getbaseInfoData'],
  data(){
    return {
      useCardSlot:false,
      hasSupplierComponets:true,
      supplierId:'',
      supplierList:[],
      myDisabled:true,
      titleKey:"BJZS.LK_BAOJIAZUSHOU_MJDANWEIYUAN",
      oldSupplierId:'',
      quotationSupplierState:true
    }
  },
  computed:{
    disabled(){
      return !this.dgysBj
    },
    hastateSupplierBj(){
      return this.getbaseInfoData().currentRoundsStatus != "已关闭" && this.quotationSupplierState
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
    this.partInfo.currentRounds = parseInt(this.getbaseInfoData().currentRounds)
    this.partInfo.carTypeNames = this.$route.query.carTypeNames
    this.getRfqSupplierList().then(r=>{
      this.getAllMouldFee()
      this.hasShowDelegate()
    })
    this.getAllPartForMould()
  },
  methods:{
    hasShowDelegate(){
      hasShowDelegate({
        round: this.partInfo.currentRounds,
        rfqId:this.partInfo.rfqId,
        supplierId: this.supplierId
      }).then(res=>{
        if(res.code == 200){
          this.quotationSupplierState = res.data
        }
      }).catch(err=>{
        iMessage.error(err.desZh)
      })
    },
    getFee(res){
      if(this.dgysBj && this.tableListData.length > 0){
        iMessageBox("您确定要切换供应商吗？").then(res=>{
          this.tableListData = []
          this.getAllMouldFee()
          this.getAllPartForMould()
          this.hasShowDelegate()
        }).catch(()=>{
          this.supplierId = this.oldSupplierId
        })
      }else{
        this.tableListData = []
        this.getAllMouldFee()
        this.getAllPartForMould()
        this.hasShowDelegate()
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