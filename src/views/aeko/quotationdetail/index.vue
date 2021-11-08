<!--
 * @Author: YoHo
 * @Date: 2021-10-14 16:02:11
 * @LastEditTime: 2021-11-06 14:19:52
 * @LastEditors: YoHo
 * @Description: 
-->
<script>
import quotationDetail from "rise/web/aeko/quotationdetail"
import iLog from "../log";
import { setLogMenu } from "@/utils";

export default {
  extends: quotationDetail,
  components:{
    iLog
  },
  created(){
    setLogMenu('AEKO表态-详情页-内容表态-报价单')
  }
}
</script>