<!--
 * @Author: wentliao
 * @Date: 2021-05-20 17:54:21
 * @Description: 决策资料-title
-->
<template>
 <div class="decision-data-title">
    <iCard title="Title">
       <div class="decision-data-title-content">
         <iFormGroup row="1">
            <div class="col">
               <iFormItem v-for="(item,index) in titleData" :key="'titleData'+index"  :label="item.label+':'">
                  <iText >
                     {{ item.value }}
                  </iText>
               </iFormItem>
            </div>
         </iFormGroup>
       </div>
    </iCard>
 </div>
</template>

<script>
import {
  iCard,
  iFormGroup,
  iFormItem,
  iText,
} from "rise";
export default {
     components:{
        iCard,
        iFormGroup,
        iFormItem,
        iText,
    },
    data(){
       return{
          titleData:[
             {label:'Project Type',value:'FS⼩零件'},
             {label:'Part',value:'零件号-德⽂名-中⽂名(⾸零件),零件号-德⽂名-中⽂名(⾸零件),零件号-德⽂名-中⽂名(⾸零件)'},
             {label:'Project',value:'AAAA BBBB'},
             {label:'SOP Time',value:'2020-01-01'},
             {label:'Buyer',value:'FS Name/ Linie Name'},
             {label:'Single Sourcing',value:'Y'},
             {label:'PCA/TIA',value:'Not Relevant/Finished'},
          ],
       }
    },
    
    computed:{
        isPreview(){
            return this.$store.getters.isPreview;
        }
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
   .decision-data-title{
      .decision-data-title-content{
         width: 50%;
      }
      .closeIcon{
         width: 24px;
         height: 24px;
      }
   }
</style>