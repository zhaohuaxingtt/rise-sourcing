<template>
  <iPage>
    <projectTop />
    <!-- <iNavMvp lev="2" class="flex-end"
               :list="navList"
               routerPage
               @change="change"
               lang></iNavMvp> -->
    <div class="flex-end">
      <div class="flex2-name" v-for="(item,index) in navList" :key="index" @click="change(item)">
        <span :class="lev2Index == index?'click-name':''">{{$t(item.key)}}</span>
      </div>
    </div>
    <search :searchList="searchList" :searchValue="searchForm" :selectOptions="selectOptions" :icon="false" @sure="sure" @reset="reset"></search>
    <iTabsList v-model='defaultTab' type="card" @tab-click="tableClick">
      <el-tab-pane label="延迟图" name="1"></el-tab-pane>
      <el-tab-pane label="offen图" name="2" v-if="offenShow"></el-tab-pane>
    </iTabsList>
    <template v-if="defaultTab==1">
      <el-row :gutter="20">
        <el-col :span="12"><chartsItem ref="chartsItem" :picLeftData="picLeftData" /></el-col>
        <el-col :span="12"><yuanyinChartsItem ref="yuanyinChartsItem" :picRightData="picRightData" /></el-col>
      </el-row>
    </template>
    <template v-else>
      <offenChartsItem ref="offenChartsItem" :offenData="offenData" />
    </template>
    <tableList title="零件清单列表" class="margin-top20" :dataList="dataList" ref="partsListTable" :page="page" 
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
  delayOffen,
  partType,
} from "@/api/project/deliver";

import { navList } from "./data";
  export default {
    components:{
      iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage, iTabsList, projectTop, search, chartsItem, offenChartsItem,yuanyinChartsItem,tableList,iNavMvp
    },
    data() {
      return {
        page:{
          totalCount:0, //总条数
          pageSize:10,   //每页多少条
          pageSizes:[10,20,50,100,300], //每页条数切换
          currPage:1,    //当前页
          layout:"sizes, prev, pager, next, jumper"
        },
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
          cartypeStatus:0,
          delayLevel:"",
          delayReason:"",
          completionStatus:0,
          supplierName:"",
        },
        defaultTab:'1',
        navList,
        dataList:[],//列表数据
        picLeftData:[],//左图表数据
        picRightData:[],//右图表数据
        offenData:[],//offen图标数据

        threeTreeValue:"EM",//二级菜单 /OTS/EM
        lev2Index:2,

        offenShow:true,
      }
    },
    created(){
      this.getDic();
      this.getData();
      this.getPicLeft();
      this.getPicRight();
    },
    methods:{
      tableClick(val){
        if(val.name == 1){
          this.getPicLeft();
          this.getPicRight();
        }else{
          this.delayOffen();
        }
      },
      delayOffen(){
        delayOffen({
          ...this.searchForm,
          title:this.threeTreeValue,
        }).then(res=>{
          if(res?.result){
            this.offenData = res.data;
            this.$refs.offenChartsItem.setEcharts(this.offenData);
          }
        })
      },
      getPicLeft(){
        level_summary({
          ...this.searchForm,
          title:this.threeTreeValue,
        }).then(res=>{
          if(res?.result){
            this.picLeftData = res.data;
            this.$refs.chartsItem.setEcharts(this.picLeftData);
          }
        })
      },
      getPicRight(){
        reason_summary({
          ...this.searchForm,
          title:this.threeTreeValue,
        }).then(res=>{
          if(res?.result){
            this.picRightData = res.data;
            this.$refs.yuanyinChartsItem.setEcharts(this.picRightData);
          }
        })
      },
      getDic(){
        partType({}).then(res=>{
          if(res?.result){
            const list = res.data;
            list.forEach(e => {
              e.value = e.partType;
              e.label = e.partType;
            });
            this.selectOptions.partType = list;
          }
        })

        // selectDictByKeyss([//零件类型
        //   "SAMPLE_PART_TYPE",
        // ]).then(res=>{
        //   if(res.result){
        //     const list = res.data.SAMPLE_PART_TYPE;
        //     list.forEach(e => {
        //       e.value = e.id;
        //       e.label = e.name;
        //     });
        //     this.selectOptions.partType = list;
        //   }
        // })

        cartype_pro_List({}).then(res=>{
          if(res?.result){
            var carList = res.data.filter(res => res)
            carList.forEach(e=>{
              e.value = e.cartypeProId;
              e.label = e.cartypeProNameZh;
            })
            this.selectOptions.cartypeProId = carList;
          }
        })
      },
      getData(){
        delayList({
          ...this.searchForm,
          current:this.page.currPage,
          size:this.page.pageSize,
          title:this.threeTreeValue,
        }).then(res=>{
          if(res?.result){
            this.dataList = res.data;
            this.pageTotal = res.total;
            this.$refs.partsListTable.page.totalCount = res.total;
          }
        })
      },
      handleSizeChange(val){
        this.page.currPage = val.currPage;
        this.page.pageSize = val.size;
        this.getData();
      },
      handleCurrentChange(val){
        this.page.currPage = val.currPage;
        this.page.pageSize = val.size;
        this.getData();
      },
      sure(val){
        this.searchForm = val;
        this.getData();
        if(this.defaultTab == 1){
          this.getPicLeft();
          this.getPicRight();
        }else{
          this.delayOffen();
        }
      },
      reset(){
        this.searchForm = {
          cartypeProId:"",
          rfq:"",
          materialGroup:"",
          part:"",
          partType:"",
          cartypeStatus:0,
          delayLevel:"",
          delayReason:"",
          completionStatus:0,
          supplierName:"",
        };
        this.page.currPage = 1;
        this.page.pageSize = 10;
        this.getData();
        if(this.defaultTab == 1){
          this.getPicLeft();
          this.getPicRight();
        }else{
          this.delayOffen();
        }
      },
      change(val){
        this.lev2Index = val.value - 1;
        this.threeTreeValue = val.name;
        // if(Number(val.value) < 4){
        //   this.offenShow = false;
        //   this.defaultTab = '1';
        // }else{
        //   this.offenShow = true;
        // }

        this.getData();
        if(this.defaultTab == 1){
          this.getPicLeft();
          this.getPicRight();
        }else{
          this.delayOffen();
        }
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

  display: flex;
}
.routerpage{
  position: relative;
}
.flex2-name{
  min-width: 7.625rem;
  margin-left: 0.0625rem;
  position: relative;
  padding: 0.25rem 1.5625rem;
  cursor: pointer;
  letter-spacing: 0.0625rem;
  text-align: center;

  span{
    opacity: 1;
    border-radius: 0.3125rem;
    font-size: 1rem;
    color: #727272;
    display: inline-block;
    font-size: 1.125rem !important;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: -1px;
      transform: translate(0, -50%);
      width: 1px;
      height: 16px;
      background: #909091;
      opacity: 0.58;
    }
  }
}
.flex2-name:first-of-type{
  min-width: auto!important;
  padding-left: 0 !important;
  margin-left: 0 !important;

  span{
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: -1px;
      transform: translate(0, -50%);
      width: 0px;
      height: 0px;
      background: #909091;
      opacity: 0.58;
    }
  }
}

.flex2-name:last-of-type{
  min-width: auto!important;
  padding-right: 0 !important;
  margin-right: 0 !important;
}

.click-name{
  font-weight:bold;
  color:#1660f1!important;
}
</style>