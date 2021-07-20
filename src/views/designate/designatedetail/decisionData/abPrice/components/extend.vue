<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2021-07-19 14:07:37
 * @LastEditors: Please set LastEditors
 * @Description: fs 供应商 横轴纵轴界面。基于报价分析界面组件。
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\abPrice\index.vue
-->
<script>
import {iMessage} from 'rise'
import fsAndSupplierTable from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/quotationScoringHz'
import {getRenderTableTile,defaultSort,translateData,translateRating,subtotal,translateDataListSupplier,getRenderTableTileSupplier,getleftTittleList} from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/quotationScoringHz/components/data'
import {fsPartsAsRow,fsSupplierAsRow,gsPartsAsRow} from '@/api/partsrfq/editordetail/abprice'
export default{
  extends:fsAndSupplierTable,
  data(){
    return {
      showRound:false,
      quoteShow:false,
      templateSummary:1, //请求模板类型
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
     * @description:重写--获取供应商横轴 保持和报价助手一直。cope 只是传参变成nomiID
     * @param {*}
     * @return {*}
     */
    supplierfsSupplierAsRow(){
      return new Promise(r=>{
        this.supplierTableLoading = true
        fsSupplierAsRow(this.$route.query.desinateId,this.round).then(res=>{
          this.supplierTableLoading = false
          if(res.code == 200 && res.data && res.data.bdlInfoList){
            const data = translateDataListSupplier(res.data.bdlInfoList)
            this.supplierData = data.dataList
            this.supplierTile = getRenderTableTileSupplier(this.backChoose,res.data.bdlInfoList)
            this.supplierLeftLit = getleftTittleList(this.backChoose)
            this.suppliertopList = data.topList
            this.kmAPrice = res.data.kmAPrice
            this.kmTooling = res.data.kmTooling
            this.budget = res.data.budget
            this.reRenderTable() 
            r()
          } 
        }).catch(err=>{
          this.supplierTableLoading = false
          iMessage.error(err.desZh)
        })
      })
    },
        /**
     * @description: fs轴实现方法重写。cope 只是传参变成nomiID
     * @param {*}
     * @return {*}
     */
    fsPartsAsRow(){
      this.fsTableLoading = true
      // eslint-disable-next-line no-unexpected-multiline
      this.changeFnForGSandFS(this.layout).then(res=>{
        this.fsTableLoading = false
        this.clearDataFs()
        if(res.data && res.data.partInfoList && res.data.partInfoList){
          this.partInfoList = res.data.partInfoList
          this.bdlPriceTotalInfoList = res.data.bdlPriceTotalInfoList
          const relTitle = getRenderTableTile(this.backChoose,res.data.partInfoList[0].bdlInfoList.length,this.layout)
          this.title = relTitle.title
          this.reRenderLastChild = relTitle.xhLastChildProps
          this.exampelData = defaultSort(translateData(res.data.partInfoList),'groupId')
          this.ratingList = translateRating(res.data.partInfoList,res.data.bdlRateInfoList)
          this.exampelData = [...this.exampelData,...subtotal(this.title,this.exampelData,res.data.bdlPriceTotalInfoList)]
          this.oldExampelData = JSON.parse(JSON.stringify(this.exampelData))
        }
      }).catch(err=>{
        this.clearDataFs()
        this.fsTableLoading = false
        iMessage.warn(err.desZh)
      })
    },
    changeFnForGSandFS(type){
      if(type == 1){
        return fsPartsAsRow(this.$route.query.desinateId,this.round)
      }else{
        return gsPartsAsRow(this.$route.query.desinateId,this.round)
      }
    }
  }
}
</script>