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
    <search
      :searchList="kickOffSearchList"
      :selectOptions="selectOptions"
      @sure="sure"
      @reset="reset"
      :icon="false"
    ></search>
    <tableList :title="titleName+' 列表'" :dataList="dataList" class="margin-top20" />
  </iPage>
</template>

<script>
import { iPage, iCard, iButton } from "rise";
import projectTop from "../../components/projectHeader";
import search from "../../components/search";
import tableList from "../../components/tableList";
import { kickOffSearchList } from "../../components/data";
import { selectDictByKeyss } from "@/api/dictionary"
import { sample_part_listPage } from '@/api/project/deliver'


export default {
  components: {
    iPage,
    projectTop,
    search,
    iCard,
    iButton,
    tableList,
  },
  data() {
    return {
      dataList:[],
      kickOffSearchList,
      selectOptions: {
        partTypeOptions: [//零件类型
        ],
        proessOptions: [//进度状态
        ],
      },
      searchParams: {
        cartypePro: "",
        materialGroupNameZh: "",
        rfq: "",
        partNum: "",
        partName: "",
        partType: "",//零件类型
        supplier: "",
        completion: "",//进度状态
      },
      titleName:"",
    };
  },
  created() {
    this.titleName = this.$route.query?.type;
    this.getDic();
    this.getData();
  },
  methods: {
    getData(){
      sample_part_listPage(this.searchParams).then(res=>{
        if(res.result){
          this.dataList = res.data;
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
          this.selectOptions.partTypeOptions = list;
        }
      })

      selectDictByKeyss([//进度状态
        "SAMPLE_PART_PROGRESS",
      ]).then(res=>{
        if(res.result){
          const list = res.data.SAMPLE_PART_PROGRESS;
          list.forEach(e => {
            e.value = e.id;
            e.label = e.name;
          });
          this.selectOptions.proessOptions = res.data.SAMPLE_PART_PROGRESS;
        }
      })
    },
    sure(form) {
      console.log(form);
      this.searchParams = form;
      this.getData();
    },
    reset() {
      this.searchParams = {};
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
</style>