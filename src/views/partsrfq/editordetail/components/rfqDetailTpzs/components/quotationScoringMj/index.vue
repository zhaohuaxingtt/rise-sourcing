<!--
 * @Author: yuszhou
 * @Date: 2021-05-27 14:55:03
 * @LastEditTime: 2021-07-17 11:07:26
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
  inject:['getbaseInfoData', 'getDisabled'],
  provide(){
    return {
      supplierId: this.supplierId
    }
  },
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
    disabled() {
      return !this.dgysBj || this.getDisabled()
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
          if(this.dgysBj) this.dgysBj = res.data
        }
      }).catch(err=>{
        iMessage.error(err.desZh)
      })
    },
    getFee(res){
      if(this.dgysBj && this.tableListData.length > 0){
        iMessageBox("编辑状态下，切换供应商不会保存！您确定要切换供应商吗？").then(res=>{
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
    },
    // 零件号选择-重写父方法供应商Id
    handleChangeByAssembledPartCode(partNum, row) {
      this.$set(row, "assembledPartPrjCode", "")
      const fsObj = this.partNumMap[partNum][0]
      if (fsObj) {
        this.$set(row, "assembledPartName", fsObj.partName)
        this.handleInputByAssembledPartName(fsObj.partName, row)
      }

      const mouldIdIndexes = this.tableListData.map(item => {
        const list = item.mouldId.split("_")
        return +list[list.length - 1].replace(/\D/g, "") || 0
      })

      mouldIdIndexes.sort((a, b) => b - a)
      const index = mouldIdIndexes[0] ? (mouldIdIndexes[0] >= 10 ? (mouldIdIndexes[0] + 1) + "" : "0" + (mouldIdIndexes[0] + 1)) : "01"
    
      this.$set(row, "mouldId", `${ this.partInfo.rfqId }_${ this.supplierId }_${ partNum }_T${ index }`)
    },
    // fs号选择--重写父方法。供应商ID
    handleChangeByAssembledPartPrjCode(fsNum, row) {
      const fsObj = this.fsNums.filter(item => item.fsnrGsnrNum === fsNum)[0]
      this.$set(row, "quotationId", fsObj.quotationId)
      if (!row.assembledPartCode) {
        this.$set(row, "assembledPartCode", fsObj.partNum)
        this.$set(row, "assembledPartName", fsObj.partName)
        this.handleInputByAssembledPartName(fsObj.partName, row)
        
        const mouldIdIndexes = this.tableListData.map(item => {
          const list = item.mouldId.split("_")
          return +list[list.length - 1].replace(/\D/g, "") || 0
        })

        mouldIdIndexes.sort((a, b) => b - a)
        const index = mouldIdIndexes[0] ? (mouldIdIndexes[0] >= 10 ? (mouldIdIndexes[0] + 1) + "" : "0" + (mouldIdIndexes[0] + 1)) : "01"
      
        this.$set(row, "mouldId", `${ this.partInfo.rfqId }_${ this.supplierId }_${ fsObj.partNum }_T${ index }`)
      }
    },
  }
}
</script>