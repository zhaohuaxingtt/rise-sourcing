<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:17:57
 * @LastEditTime: 2021-02-26 10:31:20
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收列表界面.
 * @FilePath: \rise\src\views\partsign\index.vue
-->
<template>
  <iPage>
    <div>
      <mvpNavBar @change="change"></mvpNavBar>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  table模块，向外入参表格数据，表头                    --->
    <!------------------------------------------------------------------------>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <iButton @click="save">签收</iButton>
        <iButton @click="openDiologBack">退回</iButton>
        <iButton @click="openDiologChangeItems">转派</iButton>
      </div>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  table模块，向外入参表格数据，表头                    --->
    <!------------------------------------------------------------------------>
    <iCard>
      <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <el-pagination
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
    <!--                  转派弹出框                                         --->
    <!------------------------------------------------------------------------>
    <changeItems
      v-model="diologChangeItems"
      @sure="sureChangeItems"
    ></changeItems>
    <!------------------------------------------------------------------------>
    <!--                  退回弹出框                                         --->
    <!------------------------------------------------------------------------>
    <backItems v-model="diologBack" @sure="sureBackmark"></backItems>
  </iPage>
</template>
<script>
import { iPage, iButton, iCard, iMessage } from "@/components";
import tablelist from "./components/tablelist";
import { tableTitle } from "./components/data";
import { getTabelData } from "@/api/partsign/home";
import { pageMixins } from "@/utils/pageMixins";
import backItems from "./components/backItems";
import changeItems from "./components/changeItems";
import { mvpNavBar } from "@/components";
export default {
  components: { iPage, tablelist, iButton, iCard, backItems, changeItems ,mvpNavBar},
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      diologChangeItems: false,
      diologBack: false,
      backmark: "",
      inquiryBuyer: "",
      inquiryBuyerList: [],
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //获取表格数据
    getTableList() {
      this.tableLoading = true;
      getTabelData().then((res) => {
        this.tableListData = res.data;
        this.tableLoading = false;
      });
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    //签收
    save() {
      if (this.selectTableData.length == 0)
        return iMessage.warn("抱歉，您当前还未选择您需要签收的信息单！");
      console.log(this.selectTableData);
    },
    //退回
    openDiologBack() {
      if (this.selectTableData.length == 0)
        return iMessage.warn("抱歉，您当前还未选择您需要退回的信息单！");
      this.diologBack = true;
    },
    //转派
    openDiologChangeItems() {
      if (this.selectTableData.length == 0)
        return iMessage.warn("抱歉，您当前还未选择您需要转派的信息单！");
      this.diologChangeItems = true;
    },
    sureBackmark(val) {
      console.log("your message:", val);
      this.diologBack = false;
      this.getTableList();
    },
    sureChangeItems(val) {
      console.log("your select data is", JSON.parse(val));
      this.diologChangeItems = false;
      this.getTableList();
    },
  },
};
</script>
<style lang="scss" scoped></style>
