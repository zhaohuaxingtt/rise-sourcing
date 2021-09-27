<!--
 * @Author: 业务分配模拟
 * @Date: 2021-06-09 22:25:34
 * @LastEditTime: 2021-07-07 19:02:08
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
      default:'业务分配模拟'
    },
    title:{
      type:String,
      default:''
    }
  },
  inject: ['getDisabled'],
  computed: {
    disabled() {
      return this.getDisabled()
    }
  },
  data(){
    return {
      rfqId:this.$route.query.id
    }
  }
}
</script>