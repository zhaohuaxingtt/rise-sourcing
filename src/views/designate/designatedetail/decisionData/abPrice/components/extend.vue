<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2021-07-17 20:31:30
 * @LastEditors: Please set LastEditors
 * @Description: fs 供应商 横轴纵轴界面。基于报价分析界面组件。
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\abPrice\index.vue
-->
<script>
import {iMessage} from 'rise'
import fsAndSupplierTable from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/quotationScoringHz'
import {getRenderTableTile,defaultSort,translateData,translateRating,subtotal,translateDataListSupplier,getRenderTableTileSupplier,getleftTittleList} from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/quotationScoringHz/components/data'
import {fsPartsAsRowDd,fsSupplierAsRowDd} from '@/api/partsrfq/editordetail'
export default{
  extends:fsAndSupplierTable,
  data(){
    return {
      showRound:false,
      quoteShow:false,
      templateSummary:2, //请求模板类型
      abPrice:true
    }
  },
  methods:{
    /**
     * @description: 重写报价助手中的获取最新轮次方法。当前界面不需要最新轮次。
     * @param {*}
     * @return {*}
     */
    getbaseInfoData(){
      return {}
    },
    /**
     * @description: 重构获取供应商横轴方法 
     * @param {*}
     * @return {*}
     */
    fsPartsAsRow(){
      this.fsTableLoading = true
      fsPartsAsRowDd(this.$route.query.desinateId).then(res=>{
        this.fsTableLoading = false
        if(res.data && res.data.partInfoList && res.data.partInfoList.length){
          this.partInfoList = res.data.partInfoList
          this.bdlPriceTotalInfoList = res.data.bdlPriceTotalInfoList
          const relTitle = getRenderTableTile(this.backChoose,res.data.partInfoList[0].bdlInfoList.length)
          this.title = relTitle.title
          this.reRenderLastChild = relTitle.xhLastChildProps
          this.exampelData = defaultSort(translateData(res.data.partInfoList),'groupId')
          this.ratingList = translateRating(res.data.partInfoList,res.data.bdlRateInfoList)
          this.exampelData = [...this.exampelData,...subtotal(this.title,this.exampelData,res.data.bdlPriceTotalInfoList)]
          this.oldExampelData = JSON.parse(JSON.stringify(this.exampelData))
        }
      }).catch(err=>{
        this.fsTableLoading = false
        iMessage.warn(err.desZh)
      })
    },
        /**
     * @description:重构获取零件横轴
     * @param {*}
     * @return {*}
     */
    supplierfsSupplierAsRow(){
      this.supplierTableLoading = true
      fsSupplierAsRowDd(this.$route.query.desinateId).then(res=>{
        this.supplierTableLoading = false
        if(res.code == 200 && res.data && res.data.bdlInfoList){
            const data = translateDataListSupplier(res.data.bdlInfoList)
            this.supplierData = data.dataList
            this.supplierTile = getRenderTableTileSupplier(this.backChoose,res.data.bdlInfoList)
            this.supplierLeftLit = getleftTittleList(this.backChoose)
            this.suppliertopList = data.topList
            this.leftData = res.data.kmAPrice
            this.rightData = res.data.kmTooling
            this.reRenderTable() 
        } 
      }).catch(err=>{
        this.supplierTableLoading = false
        iMessage.error(err.desZh)
      })
    }
  }
}
</script>