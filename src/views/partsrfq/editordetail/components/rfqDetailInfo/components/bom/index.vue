<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <iFormGroup inline icon>
          <iFormItem label="创建日期" name="test">
            <i-text>2020-12-10</i-text>
          </iFormItem>
          <iFormItem label="导入时间" name="test">
            <i-text >2020-12-10</i-text>
          </iFormItem>
          <div class="floatright margin-top5">
            <iButton @click="readEffectiveBOM">读取有效BOM</iButton>
            <iButton @click="exports">导出</iButton>
          </div>
        </iFormGroup>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          :hide-open-page="true"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.page"
          :layout="page.layout"
          :current-page='page.size'
          :total="page.total"
      />
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iPagination, iFormGroup, iFormItem, iText} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {tableTitle} from "./components/data";
import {pageMixins} from "@/utils/pageMixins";
import {getBomList} from "@/api/partsfcq/editordetail";


export default {
  components: {
    iCard,
    iButton,
    iPagination,
    iFormGroup,
    iFormItem,
    iText,
    tablelist
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: []
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //获取表格数据
    getTableList() {
      this.tableLoading = true;
      getBomList().then((res) => {
        this.tableListData = res.data;
        this.tableLoading = false;
      });
    },
    readEffectiveBOM() {
    },
    exports() {
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    openPage() {
      this.detailDialog = true
    }
  }
}
</script>

<style scoped>

</style>