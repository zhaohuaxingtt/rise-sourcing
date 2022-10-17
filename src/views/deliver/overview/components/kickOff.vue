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
      :searchValue="searchParams"
      :searchList="kickOffSearchList"
      :selectOptions="selectOptions"
      @sure="sure"
      @reset="reset"
      :icon="false"
    ></search>
    <tableList :page="page" :title="titleName+' 列表'" :dataList="dataList" class="margin-top20" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
  </iPage>
</template>

<script>
import { iPage, iCard, iButton } from "rise";
import projectTop from "../../components/projectHeader";
import search from "../../components/search";
import tableList from "../../components/tableList";
import { kickOffSearchList } from "../../components/data";
import { selectDictByKeyss } from "@/api/dictionary"
import { 
  sample_part_listPage,
  cartype_pro_List
} from '@/api/project/deliver'
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
      page:{
        totalCount:0, //总条数
        pageSize:10,   //每页多少条
        pageSizes:[10,20,50,100,300], //每页条数切换
        currPage:1,    //当前页
        layout:"sizes, prev, pager, next, jumper"
      },
      dataList:[],
      kickOffSearchList,
      selectOptions: {
        carProjectOptions:[],//车型项目
        partTypeOptions: [//零件类型
        ],
        proessOptions: [//进度状态
        ],
      },
      searchParams: {
        carTypeProId: "",
        materialGroupNameZh: "",
        rfq: "",
        partNum: "",
        partName: "",
        partType: "",//零件类型
        supplier: "",
        completion: "",//进度状态
      },
      searchParamsOld:{
        carTypeProId: "",
        materialGroupNameZh: "",
        rfq: "",
        partNum: "",
        partName: "",
        partType: "",//零件类型
        supplier: "",
        completion: "",//进度状态
      },
      titleName:"",
      partSource:"",
    };
  },
  created() {
    this.titleName = this.$route.query?.type;
    this.partSource = this.$route.query?.value;
    this.searchParams.carTypeProId = Number(this.$route.query?.id);
    this.searchParamsOld.carTypeProId = Number(this.$route.query?.id);

    this.getDic();
    this.getData();
  },
  methods: {
    getData(){
      sample_part_listPage({
        ...this.searchParams,
        partSource:this.partSource,
        current:this.page.currPage,
        size:this.page.pageSize,
        completion:this.$route.query?.completion,
        partType:this.$route.query?.partType,
      }).then(res=>{
        if(res.result){
          this.dataList = res.data;
          this.page.totalCount = res.total;
          this.page.pageSize = res.pageSize;
          this.page.currPage = res.pageNum;
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
    sure(form) {
      console.log(form);
      this.searchParams = form;
      this.getData();
    },
    reset() {
      this.searchParams = _.cloneDeep(this.searchParamsOld);
      this.page.currPage = 1;
      this.page.pageSize = 10;
      
      console.log(this.searchParams)
      this.getData();
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