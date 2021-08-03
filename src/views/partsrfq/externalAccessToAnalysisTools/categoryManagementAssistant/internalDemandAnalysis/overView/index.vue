<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 15:43:21
 * @LastEditTime: 2021-08-03 17:56:55
 * @LastEditors: 舒杰
 * @Description: 内部需求分析概览
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\overview\index.vue
-->
<template>
  <iPage>
     <div class="overView flex-between-center">
        <iCard class="icard" :title='language(item.key,item.name)' v-for="(item,index) in list" :key="index">
            <div @click="onJump(item.url)" class="img">
               这是一张图
            </div>     
         </iCard>  
     </div>
  </iPage>
</template>

<script>
import {iPage,iCard} from 'rise'
export default {
  components: {
    iPage,
    iCard,
  },
  data () {
     return {
        list:[
           {
              name:"采购金额总览",
              key:"CAIGOUJINEZONGLAN",
              image:"iconAekojianzhiBMdanweixuanzhong"
           },
           {
              name:"产量总览",
              key:"CAILIANGZONGLAN",
              image:"iconAekojianzhiBMdanweixuanzhong"
           },{
              name:"批量供应商概览",
              key:"PLGYSGL",
              image:"iconAekojianzhiBMdanweixuanzhong"
           },{
              name:"车型价格对比",
              key:"CHEXINGJIAGEDUIBI",
              image:"iconAekojianzhiBMdanweixuanzhong"
           },{
              name:"EKL",
              key:"EKL",
              image:"iconAekojianzhiBMdanweixuanzhong"
           },{
              name:"SOP进度轴",
              key:"SOPJINDUZHOU",
              image:"iconAekojianzhiBMdanweixuanzhong"
           },{
              name:"成本组成",
              key:"CHENGBENZUCHENG",
              image:"iconAekojianzhiBMdanweixuanzhong"
           },{
              name:"技术路线",
              key:"JISHULUXIAN",
              image:"iconAekojianzhiBMdanweixuanzhong",
              url:"/sourcing/categoryManagementAssistant/internalDemandAnalysis/technology"
           },{
              name:"批量供应商概览",
              key:"PLGYJZL",
              image:"iconAekojianzhiBMdanweixuanzhong"
           },{
              name:"定点历史记录",
              key:"DINGDIANLISHIJILU",
              image:"iconAekojianzhiBMdanweixuanzhong"
           }
        ]
     }
  },
  methods: {
    onJump(url){
       console.log(11111)
      this.$router.push(url)
    }
  }
};
</script>

<style lang="scss" scoped>
   .routerpage{
      padding: 0;
      overflow-y: auto;
      height: auto;
   }
   .overView{
      flex-wrap: wrap;
      .icard{
         width: 32%;
         height: 406px;
         margin-bottom: 20px;
         cursor: pointer;
         .img{
            height: 100%;
         }
      }
   }

</style>

