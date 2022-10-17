<template>
  <iCard :title="title">
    <template #header-control>
      <iButton :loading="downloadLoading" @click="handleDownload">{{
        language("DAOCHU", "导出")
      }}</iButton>
    </template>
    <div>
      <!-- 延误清单 -->
      <tableList
        v-if="$route.path == '/deliver/delayanalysis'"
        class="table"
        ref="tableList"
        :lang="true"
        :tableData="dataList"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :selection='false'
      >
        <!-- 延迟级别 -->
        <template #delayWk="scope">
          <div class="table-item-aeko">
            <img v-if="scope.row.delayWk >= 4"
              class="margin-right5 img_deng"
              :src="require('@/assets/images/icon/black.png')"
            >
            <img v-else-if="scope.row.delayWk >= 2 && scope.row.delayWk <4"
              class="margin-right5 img_deng"
              :src="require('@/assets/images/icon/red.png')"
            >
            <img v-else-if="scope.row.delayWk == 1"
              class="margin-right5 img_deng"
              :src="require('@/assets/images/icon/yellow.png')"
            >
            <span>{{ scope.row.delayWkDesc }}</span>
          </div>
        </template>
      </tableList>
      <!-- 总览下零件清单 -->
      <tableList
        v-else
        class="table"
        ref="tableList"
        :lang="true"
        :tableData="dataList"
        :tableTitle="tableTitleA"
        :tableLoading="loading"
        :selection='false'
      >
        <!-- 延迟级别 -->
        <template #progress="scope">
          <!-- 延期 -->
          <div class="table-item-aeko" v-if="scope.row.progress == 1">
            <img
              class="margin-right5 img_deng"
              :src="require('@/assets/images/icon/red.png')"
            >
            <span>延期{{ scope.row.delayWeek }}周</span>
          </div>
          <!-- 临近 -->
          <div class="table-item-aeko" v-if="scope.row.progress == 2">
            <img
              class="margin-right5 img_deng"
              :src="require('@/assets/images/icon/yellow.png')"
            >
            <span>临近</span>
          </div>
          <!-- 正常 -->
          <div class="table-item-aeko" v-if="scope.row.progress == 3">
            <img
              class="margin-right5 img_deng"
              :src="require('@/assets/images/icon/click-green.png')"
            >
            <span>正常</span>
          </div>
        </template>
        <template #materialGroupNameZh="scope">
          <span>{{scope.row.materialGroupCode}}-{{scope.row.materialGroupNameZh}}</span>
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
import { tableTitle,tableTitleA } from "./data.js";

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
    page:{type:Object,default:[]},
  },
  data() {
    return {
      downloadLoading: false,
      loading: false,
      tableTitle,
      tableTitleA,
    };
  },
  created(){
    
  },
  methods: {
    handleSizeChange(val){
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
    getTableData() {
    },
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