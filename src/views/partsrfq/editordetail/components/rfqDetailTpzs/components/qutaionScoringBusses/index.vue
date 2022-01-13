<!--
 * @Author: 业务分配模拟
 * @Date: 2021-06-09 22:25:34
 * @LastEditTime: 2022-01-13 17:58:04
 * @LastEditors: caopeng
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing-new\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\qutaionScoringBusses\index.vue
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
  },
  mounted(){
        let domElement = this.$el;
      var box =domElement.getElementsByClassName('title_content')[0]
        var span = document.createElement("span");  
        span.className = 'cursor ';
        box.appendChild(span)
        console.log(span)
     var i= document.createElement("i");
     span.appendChild(i)
     i.className = 'el-icon-shopping-cart-1';
     i.style.color='#1660f1'
     i.style.fontSize='18px'
     i.style.fontWeight='bold'
  }
}
</script>