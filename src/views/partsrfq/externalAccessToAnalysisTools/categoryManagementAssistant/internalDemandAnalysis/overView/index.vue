<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 15:43:21
 * @LastEditTime: 2021-08-04 17:34:44
 * @LastEditors: 舒杰
 * @Description: 内部需求分析概览
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\overview\index.vue
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
              name:"采购金额总览",
              key:"CAIGOUJINEZONGLAN",
              image:require("@/assets/images/partRfq/internalDemandAnalysis01.png")
           },
           {
              name:"产量总览",
              key:"CAILIANGZONGLAN",
              image:require("@/assets/images/partRfq/internalDemandAnalysis02.png")
           },{
              name:"批量供应商概览",
              key:"PLGYSGL",
              image:require("@/assets/images/partRfq/internalDemandAnalysis03.png")
           },{
              name:"车型价格对比",
              key:"CHEXINGJIAGEDUIBI",
              image:require("@/assets/images/partRfq/internalDemandAnalysis04.png")
           },{
              name:"EKL",
              key:"EKL",
              image:require("@/assets/images/partRfq/internalDemandAnalysis05.png")
           },{
              name:"SOP进度轴",
              key:"SOPJINDUZHOU",
              image:require("@/assets/images/partRfq/internalDemandAnalysis06.png")
           },{
              name:"成本组成",
              key:"CHENGBENZUCHENG",
              image:require("@/assets/images/partRfq/internalDemandAnalysis07.png")
           },{
              name:"技术路线",
              key:"JISHULUXIAN",
              image:require("@/assets/images/partRfq/internalDemandAnalysis08.png"),
              url:"/sourcing/categoryManagementAssistant/internalDemandAnalysis/technology"
           },{
              name:"批量供应商概览",
              key:"PLGYJZL",
              image:require("@/assets/images/partRfq/internalDemandAnalysis09.png")
           },{
              name:"定点历史记录",
              key:"DINGDIANLISHIJILU",
              image:require("@/assets/images/partRfq/internalDemandAnalysis10.png")
           }
        ]
     }
  },
  methods: {
    onJump(url){
      this.$router.push(url)
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

