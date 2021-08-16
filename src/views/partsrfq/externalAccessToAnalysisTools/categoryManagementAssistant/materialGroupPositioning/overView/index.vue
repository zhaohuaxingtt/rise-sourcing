<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 15:43:21
 * @LastEditTime: 2021-08-13 15:42:12
 * @LastEditors: 舒杰
 * @Description: 内部需求分析概览
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\materialGroupPositioning\overView\index.vue
-->
<template>
   <el-row gutter="20">
      <el-col :span="8" v-for="(item,index) in list" :key="index">
         <iCard class="icard" :title='language(item.key,item.name)'>
            <div @click="onJump(item.url)" class="img">
               <img :src="item.image">
            </div>     
         </iCard> 
      </el-col>
   </el-row>
</template>

<script>
import {iCard} from 'rise'
export default {
  components: {
    iCard,
  },
  data () {
     return {
        list:[
           {
              name:"材料组定位",
              key:"CAILIAOZUDINGWEI",
              image:require("@/assets/images/partRfq/materialGroup01.png"),
              url:"/sourcing/categoryManagementAssistant/materialGroupPositioning/materialGroup"
           },{
              name:"供应商定位",
              key:"GONGYINGSHANGDINGWEI",
              image:require("@/assets/images/partRfq/internalDemandAnalysis05.png")
           }
        ]
     }
  },
  methods: {
    onJump(url){
      if(this.$store.state.rfq.categoryCode){
         this.$router.push(url)
      }else{
         this.$parent.$children[0].openCatecory()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
   .icard{
      height: 406px;
      margin-bottom: 20px;
      .img{
         height: 100%;
         cursor: pointer;
         img{
            width: 100%;
         }
      }
   }  

</style>

