<!--
 * @Author: YoHo
 * @Date: 2021-12-31 15:11:17
 * @LastEditTime: 2022-01-13 22:33:57
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iCard collapse :title="language('LINGJIANMUBIAOJIA', '零件目标价')" :defalutCollVal="status == '已完成' || !todo">
    <template slot="subInfo">
      <div
        v-if="todo"
        :class="{
          danger: status == '未申请',
          warning: status == '未完成',
          success: status == '已完成',
        }"
        class="tishi"
      >
        <icon symbol :name="iconName[status]" class="tishi-icon"></icon>
        <span class="status">{{ status }}</span>
      </div>
    </template>
    <template slot="header-control">
      <div class="button-box">
        <template v-if="!todo">
          <iButton  v-if="isPosition" v-permission.auto="PARTSRFQ_PARTDETAILLIST_LINGJIANMUBIAOJIA_CHAKANXIUGAIJILU|零件目标价-查看修改记录"  @click="showDialog">{{ language('CHAKAN','查看') + language('XIUGAIJILU','修改记录') }}</iButton>
          <iButton v-permission.auto="PARTSRFQ_PARTDETAILLIST_LINGJIANMUBIAOJIA_DAOCHU|零件目标价-导出" @click="exports">{{ language("LK_DAOCHU", "导出") }}</iButton>
        </template>
        <template v-else>
          <iButton v-if="!disabled" @click="openDialog" v-permission.auto="PARTSRFQ_PARTDETAILLIST_APPLYLINGJIANMUBIAOJIA|申请零件目标价">{{
            language("LK_SHENQINGMUBIAOJIA", "申请目标价")
          }}</iButton>
        </template>
      </div>
    </template>
    <div>
      <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :hide-open-page="true"
        :index="true"
        :lang="true"
        v-permission.auto="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_TABLE|零件清单列表"
      ></tablelist>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </div>
    <toolingTargetPrice :visible.sync="visible" :rfqId="$route.query.id" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, icon } from "rise";
import tablelist from "pages/partsrfq/components/tablelist";
import toolingTargetPrice from "./toolingTargetPrice";
import { pageMixins } from "@/utils/pageMixins";
import { getCfPriceEffective } from "@/api/partsrfq/editordetail";
import { excelExport } from "@/utils/filedowLoad";
import { iconName, partsTargetPriceTitle as tableTitle } from "../data";

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    icon,
    toolingTargetPrice,
  },
  mixins: [pageMixins],
  props: {
    todo: Boolean,
  },
  data() {
    return {
      iconName,
      visible: false,
      tableListData: [],
      tableLoading: false,
      selectTableData: [],
      tableTitle,
    };
  },
  inject:["isPos", "getDisabled"],
  computed:{
    status(){
      return this.$store.state.rfq.todoObj['cfPriceStatusDesc'].status
    },
    isPosition() {
      return this.isPos()
    },
    disabled() {
      return this.getDisabled()
    }
  },
  created() {
    this.getTableList();
  },
  methods: {
    showDialog() {
      this.visible = true;
    },
    openDialog() {
      if (!this.selectTableData.length) {
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGLINGJIANMUBIAOJIADECAIGOUXIANGMU",
            "抱歉，您当前还未选择需要申请零件目标价的采购项目！"
          )
        );
      }
      this.$emit(
        "openDialog",
        "partsDialogVisible",
        JSON.parse(JSON.stringify(this.selectTableData))
      );
    },
    async getTableList() {
      const id = this.$route.query.id;
      if (id) {
        this.tableLoading = true;
        try {
          const res = await getCfPriceEffective({
            rfqId: id,
            currPage: this.page.currPage,
            pageSize: this.page.pageSize,
          });
          this.tableListData = Array.isArray(res.data) ? res.data : [];
          this.tableListData.forEach((i) => {
            if (i.applyType == "LC") {
              i.APrice = i["lcAPrice"];
              i.BPrice = i["lcBPrice"];
            } else if (i.applyType == "SKD") {
              i.APrice = i["skdAPrice"];
              i.BPrice = i["skdBPrice"];
            } else if (i.applyType == "CKD LANDED") {
              if (i["ckdExwork"] && i["ckdDuty"]) {
                i.APrice = i["ckdExwork"] + "(" + i["ckdDuty"] + "%)";
              } else {
                i.APrice = ""
              }
              
              i.BPrice = i["ckdLanded"];
            }
          });
          this.page.totalCount = res.total || 0;
          this.tableLoading = false;
        } finally {
          this.tableLoading = false;
        }
      }
    },
    exports() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.language(
            "LK_QINGXUANZHEXUYAODAOCHUSHUJU",
            "请选择需要导出的数据"
          )
        );
      excelExport(this.selectTableData, this.tableTitle);
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
  },
};
</script>

<style scoped>
</style>