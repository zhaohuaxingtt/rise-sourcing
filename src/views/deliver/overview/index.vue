<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:06:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-06 14:01:28
 * @Description: 项目管理概览
 * @FilePath: \front-sourcing\src\views\project\overview\index.vue
-->

<template>
  <iPage class="overview">
    <projectTop />
    <search :searchList="searchList" :searchValue="searchParams" :selectOptions="selectOptions" @sure="sure" @reset="reset"></search>
    <div class="flex-end">
        <iButton v-permission="SONGYANGGUANLI_OVERVIEW_DAOCHU">{{$t("DAOCHU")}}</iButton>
    </div>
    <div class="margin-top20" v-loading="loading">
      <template v-for="(item,index) in tabelDataList">
        <proItem
          :key="index"
          class="margin-top20"
          :dataList="item"
        ></proItem>
      </template>
    </div>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iButton
} from "rise";
import projectTop from "../components/projectHeader";
import search from "../components/search";
import proItem from "../components/proItem";
import { searchList } from "../components/data";
import { 
  sample_overviewPage,
  sample_overviewallList
} from '@/api/project/deliver'

import {
  material_group_list,
  cartype_pro_List,
  buyer_list,
} from "@/api/project/deliver"

export default {
  components: {
    iPage,
    projectTop,
    search,
    proItem,
    iCard,
    iButton
  },
  data() {
    return {
      searchList,
      selectOptions: {
        deptOptions: [//材料组
          
        ],
        buyerList: [//采购员
          
        ],
        carProjectOptions: [//车型项目
          
        ],
        statusList:[
          {
            value:0,
            label:"未SOP车型",
          },{
            value:1,
            label:"已SOP车型",
          },
        ],
      },
      searchParams: {
        buyerIds:[],//采购员
        cartypeProIds:[],//车型项目
        materialGroupIds:[],//材料组
        cartypeStatus:"",
      },
      tabelDataList:[],
      loading:false,
    };
  },
  created() {
    this.searchData()
    this.getDataList();
  },
  methods: {
    getDataList(){
      this.loading = true;
      // sample_overviewPage(this.searchParams).then(res=>{
      sample_overviewallList(this.searchParams).then(res=>{
        if(res?.result){
          this.tabelDataList = _.cloneDeep(res.data)
        }
        this.loading = false;
      }).catch(res=>{
        this.loading = false;
      })
    },
    sure(form){
      this.searchParams = form;
      this.getDataList();
    },
    reset(){
      this.searchParams = {
        buyerIds: [],
        cartypeProIds: [],
        materialGroupIds: [],
      }
      this.getDataList();
    },
    searchData(){
      material_group_list({}).then(res=>{
        if(res?.result){
          var list = res.data
          list.forEach(e=>{
            e.value = e.materialGroupId;
            e.label = e.materialGroupNameZh;
          })
          this.selectOptions.deptOptions = list
        }
      })
      cartype_pro_List({}).then(res=>{
        if(res?.result){
          var carList = res.data.filter(res => res)
          carList.forEach(e=>{
            e.value = e.cartypeProId;
            e.label = e.cartypeProNameZh;
          })
          this.selectOptions.carProjectOptions = carList;
        }
      })
      buyer_list({}).then(res=>{
        if(res?.result){
          this.selectOptions.buyerList = res.data
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.overview {
  &-home {
    padding: 0 !important;
    padding-top: 10px !important;
    // height: calc(100% - 55px) !important;
    // overflow: auto !important;
  }
}
.flex-end{
  display: flex;
  justify-content: flex-end;
}
</style>