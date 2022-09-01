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
    <search :searchList="searchList" :selectOptions="selectOptions" @sure="sure" @reset="reset"></search>
    <div class="flex-end">
        <iButton>导出</iButton>
    </div>
    <div class="margin-top20">
      <template v-for="i in 3">
        <proItem
          :key="i"
          class="margin-top20"
          :tableTitle="tableTitle"
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
import { getOverview, getAllProPurchaser } from '@/api/project'
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
        carProjectOptions: [
          {
            label: "test",
            value: 1,
          },
        ],
        deptOptions: [
          {
            label: "组1",
            value: 1,
          },
        ],
      },
      searchParams: {
        carProject: "",
      },
      tableTitle: [
        { props: "type", name: "分类", key: "" },
        { props: "csc", name: "CSC", key: "" },
        { props: "Kickoff", name: "Kickoff", key: "" },
        { props: "BF", name: "BF", key: "" },
        { props: "Data", name: "Data", key: "" },
        {
          props: "tryout",
          name: "1st Tryout",
          key: "",
        },
        { props: "OTS", name: "OTS", key: "" },
        {
          props: "EM",
          name: "EM",
          key: "",
          children: [
            { props: "M", name: "M", key: "" },
            // { props: "D", name: "D", key: "" },
            // { props: "C", name: "C", key: "" },
            { props: "G", name: "G", key: "" },
          ],
        },
      ],
    };
  },
  created() {
    this.searchData()
  },
  methods: {
    sure(form){
      this.searchParams = form
    },
    reset(){
      this.searchParams = {}
    },
    searchData(){
      getOverview().then(res=>{
        if(res?.code=='200'){
          this.tableData = res.data
        }
      })
    }
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