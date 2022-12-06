<!--
 * @Author: YoHo
 * @Date: 2021-12-31 15:11:17
 * @LastEditTime: 2022-12-05 18:56:08
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 
-->
<template>
  <iCard collapse :title="language('SEL目标价', 'SEL目标价')" :defalutCollVal="status == '已完成' || !todo">
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
          <iButton v-if="isPosition" @click="showDialog">{{ language('CHAKAN','查看') + language('申请记录','申请记录') }}</iButton>
          <iButton @click="exports">{{ language("LK_DAOCHU", "导出") }}</iButton>
        </template>
        <template v-else>
          <iButton v-if="!disabled" @click="applySEL">{{
            language("LK_SHENQINGMUBIAOJIA", "申请SEL目标价")
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
    <applyDialog :visible.sync="visible" :rfqId="$route.query.id" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, icon } from "rise";
import tablelist from "pages/partsrfq/components/tablelist";
import applyDialog from "./applyDialog";
import { pageMixins } from "@/utils/pageMixins";
import { getCfPriceEffective } from "@/api/partsrfq/editordetail";
import { excelExport } from "@/utils/filedowLoad";
import { iconName, SELTargetPriceTitle as tableTitle } from "./data";

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    icon,
    applyDialog,
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
    // 申请SEL目标价
    applySEL(){
      if (this.selectTableData.length == 0) {
        return iMessage.warn(
          this.language(
            "抱歉，您当前还未选择需要申请SEL目标价的采购项目！",
            "抱歉，您当前还未选择需要申请SEL目标价的采购项目！"
          )
        );
      }
      let msg = ''
      this.selectTableData.forEach(item=>{
        if(['已冻结','已定点'].includes(item.statusDesc)){
          msg+=item.fsnrGsnrNum
        }
      })
      if(msg){
        return iMessage.error(
          msg + '采购项目状态为已冻结/已定点，不可申请SEL目标价'
        );
      }
      console.log('调用接口');
    },
    async getTableList() {
      console.log('获取申请记录');
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