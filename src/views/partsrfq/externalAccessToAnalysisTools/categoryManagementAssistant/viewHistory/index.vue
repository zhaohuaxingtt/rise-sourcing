<!--
 * @Author: your name
 * @Date: 2021-08-08 14:31:25
 * @LastEditors: zbin
 * @Description: 查看历史
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\pinleiDialog.vue
-->
<template>
  <iDialog class="dialog" :visible.sync="value" width="90%" @close="clearDiolog">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">
        {{ language("CHAKANLISHI", "查看历史") }}
      </div>
      <div class="queryForm">
        <el-form class="queryForm">
          <el-form-item label="材料组">
            <iSelect v-model="form.categoryCode" filterable placeholder="请选择">
              <el-option v-for="item in formGoup.categoryList" :key="item.categoryCode" :label="item.categoryName" :value="item.categoryCode">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item label="年份">
            <br>
            <div style="width:17rem" class="flex-between-center-center">
              <iDatePicker v-model="form.startYear" format="yyyy" value-format="yyyy" type="year" :placeholder="language('KAISHINIANFENG','开始年份')" clearable :picker-options="pickerStartAuditYear" />
              -
              <iDatePicker v-model="form.endYear" format="yyyy" value-format="yyyy" type="year" :placeholder="language('JIESHUNIANFENG','结束年份')" clearable :picker-options="pickerEndAuditYear" />
            </div>
          </el-form-item>
        </el-form>
        <div class="operation">
          <iButton @click="getTableList">{{ $t("LK_QUEREN") }} </iButton>
          <iButton @click="handleReset">{{ $t("LK_CHONGZHI") }} </iButton>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="flex-between-center titleBox">
        <span class="title">搜索结果</span>
        <div class="operation">
          <iButton @click="handleExampleDownload">{{ $t("LK_XIAZAI") }} </iButton>
        </div>
      </div>
      <tableList class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange" />
    </div>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page='page.currPage' :total="page.totalCount" />
    <div slot="footer"></div>
  </iDialog>
</template>

<script>
import { getMaterialGroupByUserIds } from "@/api/kpiChart/index.js";
import { getReportList } from "@/api/categoryManagementAssistant/categoryManagementAssistant/index.js";
import { iDialog, iButton, iDatePicker, iSelect, iPagination } from "rise";
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin';
import { tableTitle } from "./components/data.js";
import tableList from '@/components/ws3/commonTable';
import { iMessage } from '../../../../../components/index.js';
import { downloadFile } from '@/api/file'

export default {
  mixins: [resultMessageMixin, pageMixins],
  data() {
    return {
      tableTitle,
      tableLoading: false,
      selectTableData: [],
      tableListData: [],
      pickerOptions: {
        disabledDate(time) {
          let currentYear = new Date().getFullYear()
          return time.getFullYear() > currentYear;
        }
      },
      form: {
        categoryCode: '',
        startYear: '',
        endYear: ''
      },
      formGoup: {
        categoryList: []
      },
      pickerStartAuditYear: {
        disabledDate: time => {
          if (this.form.endYear) {
            return time.getFullYear() > this.form.endYear
          }
        }
      },
      pickerEndAuditYear: {
        disabledDate: time => {
          return time.getFullYear() < this.form.startYear
        }
      },
    };
  },
  components: {
    iDialog,
    iButton,
    iDatePicker,
    iSelect,
    iPagination,
    tableList
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  created() {
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.getMaterialGroupByUserIds()
          this.getTableList()
        }
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    async handleExampleDownload() {
      const req = {
        applicationName: 'rise',
        fileList: [],
      }
      this.selectTableData.forEach(item => {
        req.fileList.push(item.reportFileName)
      })
      if (!req.fileList.length) {
        iMessage.warn(this.language('BAOQIANQINGXUANZHESHUJU', '抱歉，请选择数据'))
        return
      }
      await downloadFile(req)
    },
    handleReset() {
      this.form = {
        categoryCode: '',
        years: ''
      }
    },
    async getTableList() {
      try {
        this.tableLoading = true
        const pms = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...this.form
        }
        const res = await getReportList(pms)
        this.page.currPage = res.pageNum;
        this.page.pageSize = res.pageSize;
        this.page.totalCount = res.total;
        this.tableListData = res.data
        this.tableLoading = false
      } catch (error) {
        this.tableListData = []
        this.tableLoading = false
      }
    },
    async getMaterialGroupByUserIds() {
      const res = await getMaterialGroupByUserIds({})
      this.formGoup.categoryList = res.data
    },
    clearDiolog() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.queryForm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.operation {
  display: flex;
  align-items: center;
}
.dialog-Header {
  border-bottom: 1px solid #ccc;
}
.title {
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
  line-height: 18px;
  color: #000000;
  opacity: 1;
}
.table {
  margin-top: 20px;
}
::v-deep .el-form-item__content {
  margin-right: 3rem;
}
</style>
