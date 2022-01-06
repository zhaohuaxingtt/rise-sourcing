<!--
 * @Author: YoHo
 * @Date: 2021-12-31 15:11:17
 * @LastEditTime: 2022-01-05 18:22:15
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <iCard>
      <div class="card-header">
      <div class="card-title">
        <span class="title">{{ '模具目标价' }}</span>
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
          <iButton @click="showDialog" v-permission.auto="PARTSRFQ_EDITORDETAIL_EXPORT|财务目标价-导出">{{'查看修改记录'}}</iButton>
            <iButton @click="exports" v-permission.auto="PARTSRFQ_EDITORDETAIL_EXPORT|财务目标价-导出">{{language('LK_DAOCHU','导出')}}</iButton>
        </template>
          <template v-else>
            <iButton
              @click="openDialog"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_EXPORT | (财务目标价 - 导出)
              "
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
          v-permission.auto="PARTSRFQ_EDITORDETAIL_TABLE|财务目标价-表格"
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
          :current-page='page.currPage'
          :total="page.totalCount"
      />
      </div>
    </iCard>
    <moldChangeRecord :visible.sync="visible" :id="$route.query.id" />
  </div>
</template>

<script>
import {iCard, iButton, iPagination, iMessage, icon} from "rise";
import tablelist from 'pages/partsrfq/components/tablelist'
import moldChangeRecord from "./moldChangeRecord";
import {pageMixins} from "@/utils/pageMixins";
import {getCfPrice} from "@/api/partsrfq/editordetail";
import {excelExport} from "@/utils/filedowLoad";
import { iconName } from "@/views/partsrfq/editordetail/components/rfqPending/components/partDetaiList/data"

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    icon,
    moldChangeRecord
  },
  mixins: [pageMixins],
  props:{
    todo: Boolean,
    status: String
  },
  data() {
    return {
      iconName,
      hidens: false,
      visible: false,
      tableListData: [],
      tableLoading: false,
      selectTableData: [],
      tableTitle: [
        {props:'fsnrGsnrNum',name:'FS号',key: 'LK_FSHAO'},
        {props:'partNum',name:'零件号',key: 'LK_LINGJIANHAO'},
        {props:'partNameZh',name:'零件名（中）',key: 'LK_LINGJIANMINGZHONG'},
        {props:'applyType',name:'申请类型',key: 'LK_SHENQINGLEIXING'},
        {props:'cfControllerName',name:'CF负责人',key:'LK_CFFUZEREN', width: '180'},
        {props:'expTargetpri',name:'期望目标价',key: 'LK_QIWANGMUBIAOJIA'},
        {props:'targetPrice',name:'目标价',key: 'LK_MUBIAOJIA'},
        {props:'applyStatusDesc',name:'申请状态',key: 'LK_SHENQINGZHUANGTAI'},
        {props:'approveStatusDesc',name:'审批状态',key: 'LK_SHENPIZHUANGTAI'},
    ]
    };
  },
  watch:{
    status: {
      handler(val) {
        if (val == "已完成") {
          this.hidens = true;
        } else {
          this.hidens = false;
        }
      },
      immediate: true
    },
  },
  created() {
    this.getTableList();
  },
  methods: {
    showDialog(){
      this.visible = true
    },
    openDialog(){
      this.$emit('openDialog','moduleDialogVisible')
    },
    toggle(type) {
      this[type] = !this[type];
    },
    async getTableList() {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
        try {
          const res = await getCfPrice({
            rfqId: id,
            currPage: this.page.currPage,
            pageSize: this.page.pageSize,
          })
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
          this.tableLoading = false;
        } finally {
          this.tableLoading = false;
        }
      }
    },
    exports() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.language('LK_QINGXUANZHEXUYAODAOCHUSHUJU','请选择需要导出的数据'))
      excelExport(this.selectTableData, this.tableTitle)
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
  }
}
</script>

<style scoped>

</style>