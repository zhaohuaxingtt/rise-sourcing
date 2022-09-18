<template>
  <iCard :title="title">
    <template #header-control>
      <iButton :loading="downloadLoading" @click="handleDownload">{{
        language("DAOCHU", "导出")
      }}</iButton>
    </template>
    <div>
      <tableList
        class="table"
        ref="tableList"
        :lang="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :selection='false'
      >
        <!-- 延迟级别 -->
        <template #progress="scope">
          <div class="table-item-aeko">
            <img v-if="scope.row.delayWk"
              class="margin-right5 img_deng"
              :src="require('@/assets/images/icon/black.png')"
            >
            <!-- <img
              class="margin-right5 img_deng"
              :src="require('@/assets/images/icon/red.png')"
            >
            <img
              class="margin-right5 img_deng"
              :src="require('@/assets/images/icon/yellow.png')"
            > -->
            <span>{{ scope.row.progress }}</span>
          </div>
        </template>
      </tableList>
      <!-- 分页 -->
      <iPagination
        v-update
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </div>
  </iCard>
</template>

<script>
import { iCard, iPagination, iButton, icon } from "rise";
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { tableTitle } from "./data.js";

export default {
  components: {
    iCard,
    tableList,
    iPagination,
    iButton,
    icon,
  },
  mixins: [tableSortMixins],
  props:{
    title:{ type: String, },
    dataList:{type:Array,default:[]},
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
      downloadLoading: false,
      loading: false,
      tableTitle,
      tableListData: [
        {
          cartypeProNameZh: "ID4.X",
          rfq: "80000967",
          materialGroupCode: "123",
          partNum: "111",
          partNameZh: "示例零件1",
          status:1,
          partType: "Nomi",
          soll: "20W-20",
          progress: "重度延期4周",
          supplierName: "宁波金鑫粉末冶金有限公司",
        },
      ],
    };
  },
  created(){
    this.tableListData = _.cloneDeep(this.dataList);
  },
  methods: {
    handleSizeChange(val){
      console.log(val);
      this.$emit("handleSizeChange",{
        size:val,
        currPage:1,
      })
    },
    handleCurrentChange(val){
      this.$emit("handleCurrentChange",{
        size:this.page.pageSize,
        currPage:val,
      })
    },
    handleDownload() {},
    getTableData() {},
  },
};
</script>

<style lang="scss" scoped>
.table-item-aeko{
  display: flex;
  justify-content: center;
}
.img_deng{
  width:20px;
  height:20px;
}
</style>