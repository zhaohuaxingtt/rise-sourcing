<!--
 * @Author: wentliao
 * @Date: 2021-05-20 17:54:21
 * @Description: 决策资料-title
-->
<template>
 <div class="decision-data-title" v-permission.auto="SOURCING_NOMINATION_ATTATCH_TITLE|决策资料-title">
    <iCard title="Title">
       <div class="decision-data-title-content">
         <iFormGroup row="1">
            <div class="col">
               <template v-for="(item,index) in titleData"  >
                  <iFormItem v-if="!item.hidden" :key="'titleData'+index"  :label="item.label+':'">
                     <iText >
                        {{ item.value }}
                     </iText>
                  </iFormItem>
               </template>
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
import {
   findLayoutTitleInfo,
} from '@/api/designate/decisiondata/title'
import { cloneDeep } from 'lodash'
export default {
     components:{
        iCard,
        iFormGroup,
        iFormItem,
        iText,
    },
    computed:{
        isPreview(){
            return this.$store.getters.isPreview;
        }
    },
    data(){
       return{
          titleData:[
             {label:'Project Type',key:'projectType'},
             {label:'Part',key:'nominateName'},
             {label:'Project',key:'projects'},
             {label:'SOP Time',key:'soptime'},
             {label:'Buyer',key:'buyer'},
             {label:'Single Sourcing',key:'singleSourcing'},
             {label:'PCA/TIA',key:'PCA/TIA'},
          ],
       }
    },
    mounted(){
       this.getInfo();
    },
    methods:{
       // 获取title信息
       async getInfo(){
         const { query } = this.$route;
         const {desinateId =''} = query;
         const { titleData } = this;
         const newData = cloneDeep(titleData);
        await findLayoutTitleInfo({nominateId:desinateId}).then((res)=>{
            const {data,code} = res;
            if(code == 200 && data){
               console.log(data);
               newData.map((item)=>{
                  if(item.key === 'PCA/TIA'){
                     if(!data.isShow) item.hidden = true;
                     else{
                        const {pacStatus,tiaStatus} = data;
                        item.value = `${pacStatus}/${tiaStatus}`
                     }
                  }else if(item.key === 'projects'){
                     item.value = data.projects ? data.projects.join() :'-';
                  }else if(item.key === 'singleSourcing'){
                     data['singleSourcing'] ? item.value = 'Y' : item.hidden = true;
                  }else{
                     item.value = data[item.key];
                     
                     console.log(data[item.key],item.key);
                  }
               })

               this.titleData = newData;
            }
         })
       },
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