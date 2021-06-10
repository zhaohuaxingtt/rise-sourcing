<!--
 * @Author: 业务分配模拟
 * @Date: 2021-06-09 22:25:34
 * @LastEditTime: 2021-06-09 23:22:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\qutaionScoringBusses\index.vue
-->
<script>
import buMonitor from "@/views/designate/suggestion/components/buMonitor"
export default {
  extends:buMonitor,
  props:{
    collapse:{
      type:Boolean,
      default:true
    },
    cardTitle:{
      type:String,
      default:'报价分析汇总-业务分配模拟'
    },
    title:{
      type:String,
      default:''
    }
  }
}
</script>