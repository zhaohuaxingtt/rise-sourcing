<template>
  <iPage>
    <projectTop />
    <iNavMvp lev="2" class="flex-end"
               :list="navList"
               @change="change"
               lang></iNavMvp>
    <search :searchList="searchList" :selectOptions="selectOptions" :icon="false" @sure="sure" @reset="reset"></search>
    <iTabsList v-model='defaultTab' type="card">
      <el-tab-pane label="延迟图" name="1"></el-tab-pane>
      <el-tab-pane label="offen图" name="2"></el-tab-pane>
    </iTabsList>
    <template v-if="defaultTab==1">
      <el-row :gutter="20">
        <el-col :span="12"><chartsItem :picLeftData="picLeftData" /></el-col>
        <el-col :span="12"><yuanyinChartsItem :picRightData="picRightData" /></el-col>
      </el-row>
    </template>
    <template v-else>
      <offenChartsItem  />
    </template>
    <tableList title="零件清单列表" class="margin-top20" :dataList="dataList" ref="partsListTable" 
      @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
    />
  </iPage>
</template>

<script>
import { iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage, iTabsList,iNavMvp } from "rise";
import projectTop from '../components/projectHeader'
import search from "../components/search";
import chartsItem from "./components/chartsItem";
import offenChartsItem from "./components/offenChartsItem";
import yuanyinChartsItem from "./components/yuanyinChartsItem";
import tableList from "../components/tableList";
import { delayAnalysisSearchList as searchList } from "../components/data";
import { selectDictByKeyss } from "@/api/dictionary";
import {
  cartype_pro_List,
  delayList,
  level_summary,
  reason_summary,
} from "@/api/project/deliver";

import { navList } from "./data";
  export default {
    components:{
      iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage, iTabsList, projectTop, search, chartsItem, offenChartsItem,yuanyinChartsItem,tableList,iNavMvp
    },
    data() {
      return {
        searchList,
        selectOptions: {
          cartypeProId:[],
          partType:[],
          cartypeStatus:[
            {
              value:0,
              label:"未SOP车型",
            },{
              value:1,
              label:"已SOP车型",
            }
          ],
          delayLevel:[
            {
              value:1,
              label:"轻度延迟",
            },{
              value:2,
              label:"中度延迟",
            },{
              value:3,
              label:"重度延迟",
            }
          ],
          completionStatus:[
            {
              value:0,
              label:"未完成",
            },{
              value:1,
              label:"已完成",
            }
          ],
        },
        searchForm:{
          cartypeProId:"",
          rfq:"",
          materialGroup:"",
          part:"",
          partType:"",
          cartypeStatus:"",
          delayLevel:"",
          delayReason:"",
          completionStatus:"",
          supplierName:"",
        },
        defaultTab:'1',
        navList,
        threeTreeValue:"",
        dataList:[],//列表数据
        picLeftData:[],//左图表数据
        picRightData:[],//右图表数据
      }
    },
    created(){
      this.getDic();
      this.getData(1,10);
      this.getPicLeft();
      this.getPicRight();
    },
    methods:{
      getPicLeft(){
        level_summary(this.searchForm).then(res=>{
          if(res?.result){
            this.picLeftData = res.data;
          }
        })
      },
      getPicRight(){
        reason_summary(this.searchForm).then(res=>{
          if(res?.result){
            this.picRightData = res.data;
          }
        })
      },
      getDic(){
        selectDictByKeyss([//零件类型
          "SAMPLE_PART_TYPE",
        ]).then(res=>{
          if(res.result){
            const list = res.data.SAMPLE_PART_TYPE;
            list.forEach(e => {
              e.value = e.id;
              e.label = e.name;
            });
            this.selectOptions.partType = list;
          }
        })

        cartype_pro_List({}).then(res=>{
          if(res?.result){
            this.selectOptions.cartypeProId = res.data.filter(res => res)
          }
        })
      },
      getData(page,size){
        delayList({
          ...this.searchForm,
          current:page,
          size:size,
        }).then(res=>{
          if(res?.result){
            this.dataList = res.data;
          }
        })
      },
      handleSizeChange(val){
        console.log(val)
        this.getData(val.currPage,val.size);
      },
      handleCurrentChange(val){
        console.log(val)
        this.getData(val.currPage,val.size);
      },
      sure(val){
        console.log(val);
        this.searchForm = val;
        this.getData(1,10);
      },
      reset(){
        this.searchForm = {
          cartypeProId:"",
          rfq:"",
          materialGroup:"",
          part:"",
          partType:"",
          cartypeStatus:"",
          delayLevel:"",
          delayReason:"",
          completionStatus:"",
          supplierName:"",
        };
        this.getData(1,10);
      },
      change(val){
        this.threeTreeValue = val.value;
      },
    }
  }
</script>

<style lang="scss" scoped>
.chart-box{
  width: 100%;
  display: flex;
  flex-flow: row;
  ::v-deep .card{
    width: 100%;
  }
}
.flex-end{
  position: absolute;
  right:140px;
  top:30px;
}
.routerpage{
  position: relative;
}
</style>