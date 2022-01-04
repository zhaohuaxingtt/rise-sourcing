<!--
 * @Author: YoHo
 * @Date: 2021-12-31 15:11:17
 * @LastEditTime: 2022-01-04 18:32:03
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <iCard>
      <div class="card-header">
        <div class="card-title">
          <span class="title">{{ "零件目标价" }}</span>
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
            <span>{{ status }}</span>
          </div>
        </div>
        <div class="button-box">
          <template v-if="!todo">
            <iButton
              @click="exports"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_EXPORT | (财务目标价 - 导出)
              "
              >{{ "查看修改记录" }}</iButton
            >
            <iButton
              @click="exports"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_EXPORT | (财务目标价 - 导出)
              "
              >{{ language("LK_DAOCHU", "导出") }}</iButton
            >
          </template>
          <template v-else>
            <iButton
              @click="openDialog"
              >{{ language("LK_SHENQINGMUBIAOJIA", "申请目标价") }}</iButton
            >
          </template>
          <i
            @click="toggle('hidens')"
            class="el-icon-arrow-down card-icon cursor"
            :class="{ rotate: hidens }"
          ></i>
        </div>
      </div>
      <div v-show="hidens || !todo">
        <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :hide-open-page="true"
          :index="true"
          :lang="true"
          v-permission.auto="PARTSRFQ_EDITORDETAIL_TABLE | (财务目标价 - 表格)"
        ></tablelist>
        <!------------------------------------------------------------------------>
        <!--                  表格分页                                          --->
        <!------------------------------------------------------------------------>
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
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, icon } from "rise";
import tablelist from "pages/partsrfq/components/tablelist";
import { pageMixins } from "@/utils/pageMixins";
import { getCfPrice } from "@/api/partsrfq/editordetail";
import { excelExport } from "@/utils/filedowLoad";
import { iconName } from "@/views/partsrfq/editordetail/components/rfqPending/components/partDetaiList/data"

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    icon
  },
  mixins: [pageMixins],
  props:{
    todo: Boolean,
  },
  data() {
    return {
      iconName,
      hidens: false,
      status:'',
      tableListData: [],
      tableLoading: false,
      selectTableData: [],
      tableTitle: [
        { props: "fsnrGsnrNum", name: "FS号", key: "LK_FSHAO" },
        { props: "partNum", name: "零件号", key: "LK_LINGJIANHAO" },
        {
          props: "partNameZh",
          name: "零件名（中）",
          key: "LK_LINGJIANMINGZHONG",
        },
        // {props:'targetPrice',name:'T-TargetPrice',key:'T-TargetPrice'},
        {
          props: "targetPrice",
          name: "模具目标价",
          key: "MOJUMUBIAOJIA",
          width: "180",
        },
        { props: "applyType", name: "申请类别", key: "LK_SHENQINGLEIBIE" },
        {
          props: "expTargetpri",
          name: "期望目标价",
          key: "LK_QIWANGMUBIAOJIA",
        },
        { props: "lcAPrice", name: "LC_A", key: "LC_A" },
        { props: "lcBPrice", name: "LC_B ", key: "LC_B" },
        { props: "skdAPrice", name: "SKD_A", key: "SKD_A" },
        { props: "skdBPrice", name: "SKD_B", key: "SKD_B" },
        { props: "ckdDuty", name: "CKD Duty%", key: "CKD Duty%" },
        { props: "ckdExwork", name: "CKD EX-Work", key: "CKD EX-Work" },
        { props: "ckdLanded", name: "CKDLANDED", key: "CKDLANDED" },
      ],
    };
  },
  created() {
    this.getTableList();
  },
  watch:{
    status(val){
      if(val=='已完成'){
        this.hidens = true
      }else{
        this.hidens = false
      }
    }
  },
  methods: {
    openDialog(){
      this.$emit('openDialog','partsDialogVisible')
    },
    toggle(type) {
      this[type] = !this[type];
    },
    async getTableList() {
      const id = this.$route.query.id;
      if (id) {
        this.tableLoading = true;
        try {
          const res = await getCfPrice({
            rfqId: id,
            currPage: this.page.currPage,
            pageSize: this.page.pageSize,
          });
          this.tableListData = Array.isArray(res.data) ? res.data : [];
          this.page.totalCount = res.total || 0;
          this.tableLoading = false;
          this.status = '未申请'
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