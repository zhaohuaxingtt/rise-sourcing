<!--
 * @Author: yuszhou
 * @Date: 2021-05-27 14:55:03
 * @LastEditTime: 2021-05-30 11:36:18
 * @LastEditors: Please set LastEditors
 * @Description: 采购员报价与基本分析模具界面
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringMj\index.vue
-->
<script>
import quotationMj from 'rise/web/mouldOffer/components/moduleCost'
export default {
  extends:quotationMj,
  data(){
    return {
    useCardSlot:false,
    hasSupplierComponets:true
    }
  },
  computed:{
    disabled(){
      return false
    }
  }
}
</script>