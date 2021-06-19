<!--
 * @Author: your name
 * @Date: 2021-05-26 13:55:55
 * @LastEditTime: 2021-06-19 17:50:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplier\quotationdetail\index.vue
-->
<script>
import quotationDetail from "rise/web/quotationdetail"
export default {
  extends: quotationDetail,
  created(){
    this.currentTab = this.$route.query.currentTab?this.$route.query.currentTab:this.currentTab 
    this.watingSupplier = this.$route.query.watingSupplier?this.$route.query.watingSupplier:false
  },
  methods:{
    /**
     * @description: 确认拒绝
     * @param {*}
     * @return {*}
     */
    sueReject(){
      
    },
    /**
     * @description: 接受报价
     * @param {*}
     * @return {*}
     */
    agreePrice(){
      
    }
  }
}
</script>