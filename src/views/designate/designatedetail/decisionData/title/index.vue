<!--
 * @Author: wentliao
 * @Date: 2021-05-20 17:54:21
 * @Description: 决策资料-title
-->
<template>
 <iPage class="decision-data-title">
    <designateStep v-show="!isPreview" @preview="preview"/>
    <decisionDataHeader v-show="!isPreview" :isPreview="isPreview"/>
    <iCard>
       <div>
         <h2 v-show="isPreview" class="flex-between-center margin-bottm20">
            CSC Nomination Recommendation
            <icon symbol name="guanbixiaoxiliebiaokapiannei" class="closeIcon" @click="preview"></icon>
         </h2>
         <decisionDataHeader v-show="isPreview" :isPreview="isPreview"/>
       </div>
       <div class="decision-data-title-content">
          <h1 class="margin-bottom20 font18">Title</h1>
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
 </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iFormGroup,
  iFormItem,
  iText,
} from "rise";
import designateStep from '../../components/designateStep'
import decisionDataHeader from '../components/decisionDataHeader'
export default {
     components:{
        designateStep,
        iPage,
        decisionDataHeader,
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
             {label:'PUC/TIA',value:'Not Relevant/Finished'},
          ],
          isPreview:false,
       }
    },
    methods:{
       // 预览
       preview(){
          const {isPreview} = this;
          this.isPreview = !isPreview;
       }
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