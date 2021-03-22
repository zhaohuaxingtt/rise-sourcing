<template>
  <div>
    <iCard>
      <div class="margin-bottom5 clearFloat">
        <div class="floatright">
          <iButton @click="addSupplier">添加供应商</iButton>
          <iButton @click="sendToMyEmail">发送至我的邮件</iButton>
        </div>
      </div>
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
          @openPage="openPage"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
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
    <!------------------------------------------------------------------------>
    <!--                  图纸弹框                                      --->
    <!------------------------------------------------------------------------>
    <drawing-dialog
        v-model="dialogDrawing"
    />
    <!------------------------------------------------------------------------>
    <!--                  添加供应商弹框                                      --->
    <!------------------------------------------------------------------------>
    <add-supplier-dialog
        v-model="dialogAddSupplier"
    />
  </div>
</template>

<script>
import {iCard, iPagination, iButton} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {tableTitle} from "./components/data";
import {pageMixins} from "@/utils/pageMixins";
import supplierMaterialPreparation from './components/supplierMaterialPreparation'
import otherMeetingInformation from './components/otherMeetingInformation'
import drawingDialog from './components/drawingDialog'
import addSupplierDialog from './components/addSupplierDialog'


export default {
  components: {
    iCard,
    iPagination,
    iButton,
    tablelist,
    supplierMaterialPreparation,
    otherMeetingInformation,
    drawingDialog,
    addSupplierDialog
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      dialogDrawing: false,
      dialogAddSupplier: false
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //获取表格数据
    getTableList() {
      this.tableLoading = true;

    },
    submit() {
    },
    recall() {
    },
    addSupplier() {
      this.dialogAddSupplier = true
    },
    sendToMyEmail() {
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    openPage() {
      this.dialogDrawing = true
    }
  }
}
</script>

<style scoped>

</style>