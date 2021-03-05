<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">会议基本信息</span>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          open-page-props="d"
          customOpenPageWord="查看"
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
    <!------------------------------------------------------------------------>
    <!--                  供应商材料准备                                      --->
    <!------------------------------------------------------------------------>
    <supplier-material-preparation class="margin-top20"/>
    <!------------------------------------------------------------------------>
    <!--                  会议其它信息                                      --->
    <!------------------------------------------------------------------------>
    <other-meeting-information class="margin-top20"/>
  </div>
</template>

<script>
import {iCard, iPagination} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {tableTitle} from "./components/data";
import {pageMixins} from "@/utils/pageMixins";
import {getBomList} from "@/api/partsrfq/editordetail";
import supplierMaterialPreparation from './components/supplierMaterialPreparation'
import otherMeetingInformation from './components/otherMeetingInformation'


export default {
  components: {
    iCard,
    iPagination,
    tablelist,
    supplierMaterialPreparation,
    otherMeetingInformation
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
    submit() {
    },
    recall() {
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