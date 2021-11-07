<template>
  <div>
    <el-form
      class="form"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      :hideRequiredAsterisk="true"
      :validate-on-rule-change="false"
    >
      <!-- 项目查询 -->
      <iCard style="margin-top: 1rem">
        <div class="form-top">
          <div>
            <h2>项目查询</h2>
          </div>
          <div>
            <iButton @click="getTableList">查询</iButton>
            <iButton @click="handleSearchReset('ruleForm')">重置 </iButton>
          </div>
        </div>

        <div class="item">
          <iFormItem label="$t('RFQ/项目编号')" prop="rfqCode">
            <iLabel :label="$t('RFQ/项目编号')" slot="label"></iLabel>
            <iInput v-model="ruleForm.rfqCode"></iInput>
          </iFormItem>

          <iFormItem label="$t('RFQ/项目名称')" prop="rfqName">
            <iLabel :label="$t('RFQ/项目名称')" slot="label"></iLabel>
            <iInput v-model="ruleForm.rfqName"></iInput>
          </iFormItem>

          <iFormItem label="$t('项目类型')" prop="projectType">
            <iLabel :label="$t('项目类型')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.projectType" clearable>
              <el-option
                v-for="(item, index) in projectType"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem label="$t('报价类型')" prop="quoteType">
            <iLabel :label="$t('报价类型')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.quoteType" clearable>
              <el-option
                v-for="(item, index) in quoteType"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem label="$t('竞价类型')" prop="biddingType">
            <iLabel :label="$t('竞价类型')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.biddingType" clearable>
              <el-option
                v-for="(item, index) in biddingType"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem label="$t('本轮RFQ关闭时间')" prop="rfqEndTime">
            <iLabel :label="$t('本轮RFQ关闭时间')" slot="label"></iLabel>
            <iDatePicker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :placeholder="$t('LK_QINGXUANZE')"
              v-model="ruleForm.rfqEndTime"
            />
          </iFormItem>

          <iFormItem label="$t('开始时间')" prop="openTenderTime">
            <iLabel :label="$t('开始时间')" slot="label"></iLabel>
            <iDatePicker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :placeholder="$t('LK_QINGXUANZE')"
              v-model="ruleForm.openTenderTime"
            />
          </iFormItem>

          <iFormItem label="$t('结束时间')" prop="biddingBeginTime">
            <iLabel :label="$t('结束时间')" slot="label"></iLabel>
            <iDatePicker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :placeholder="$t('LK_QINGXUANZE')"
              v-model="ruleForm.biddingBeginTime"
              :picker-options="biddingBeginTimeOptions"
            />
          </iFormItem>

          <iFormItem label="$t('状态')" prop="biddingStatus">
            <iLabel :label="$t('状态')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.biddingStatus" clearable>
              <el-option
                v-for="(item, index) in biddingStatus"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem label="$t('创建人')" prop="createName">
            <iLabel :label="$t('创建人')" slot="label"></iLabel>
            <iInput v-model="ruleForm.createName"></iInput>
          </iFormItem>

          <iFormItem label="$t('零件号')" prop="partNumber">
            <iLabel :label="$t('零件号')" slot="label"></iLabel>
            <iInput v-model="ruleForm.partNumber"></iInput>
          </iFormItem>
        </div>
      </iCard>

      <!-- 项目列表 -->
      <iCard style="margin-top: 1rem">
        <div class="form-top">
          <div>
            <h2>{{language('LK_XIANGMULIEBIAO', '项目列表')}}</h2>
          </div>
          <div>
            <iButton @click="showAddManual = true">新建项目</iButton>
            <iButton
              @click="handleDelete"
              :disabled="selectedTableData.length === 0"
              >删除</iButton
            >
          </div>
        </div>
        <iTableCustom
          :columns="projectTableTitle"
          :loading="tableLoading"
          :data="tableListData"
          @handle-selection-change="handleSelectionChange"
          @go-detail="handleGoDetail"
        />

        <iPagination
          v-update
          @current-change="handleCurrentChange($event, query)"
          @size-change="handleSizeChange($event, query)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          prev-text="上一页"
          next-text="下一页"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.total"
        />

        <addManual :show.sync="showAddManual" />
      </iCard>
    </el-form>
  </div>
</template>
<script>
import {
  iInput,
  iSelect,
  iFormItem,
  iCard,
  iButton,
  iLabel,
  iPagination,
  iDatePicker,
} from "rise";
import {
  projectTableTitle,
  projectType,
  quoteType,
  biddingType,
  biddingStatus,
  infoForm,
} from "./data";
import addManual from "./addManual.vue";
import { queryProjectByPage, deleteProject } from "@/api/bidding/bidding";
import iTableCustom from "@/components/biddingComponents/iTableCustom";
import { pageMixins } from "@/utils/pageMixins";

export default {
  mixins: [pageMixins],
  components: {
    iInput,
    iSelect,
    iFormItem,
    iCard,
    iButton,
    iLabel,
    iPagination,
    iTableCustom,
    iDatePicker,
    addManual,
  },
  data() {
    return {
      ruleForm: { ...infoForm },
      rules: {},
      selectedTableData: "",
      projectTableTitle,
      projectType,
      quoteType,
      biddingType,
      biddingStatus,
      tableLoading: false,
      showAddManual: false,
      tableListData: [],
      formData: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.getTableList();
  },
  computed: {},
  watch: {
    "ruleForm.createName"(val) {
      if (val == "") this.ruleForm.createName = null;
    },
    "ruleForm.rfqCode"(val) {
      if (val == "") this.ruleForm.rfqCode = null;
    },
    "ruleForm.rfqName"(val) {
      if (val == "") this.ruleForm.rfqName = null;
    },
    "ruleForm.partNumber"(val) {
      if (val == "") this.ruleForm.partNumber = null;
    },
  },
  methods: {
    // 查询
    getTableList() {
      this.page.currPage = 1;
      this.query();
    },
    // 重置
    handleSearchReset() {
      this.$refs["ruleForm"].resetFields();
      this.getTableList();
    },
    handleGoDetail(e) {
      this.$router.push({
        path: `/bidding/project/inquiry/${e.id}`,
      });
      sessionStorage.setItem("projectBack", "back");
    },
    // 删除
    handleDelete() {
      let flag = false;
      const ids = this.selectedTableData.map((item) => {
        if (item.biddingStatus === "01") {
          if (item.roundType === "05") {
            flag = false;
            return item.id;
          } else {
            return (flag = true);
          }
        } else {
          return (flag = true);
        }
      });
      console.log(ids);
      if (flag) {
        return this.$message.error("只可选择手工创建且状态为【草稿】的项目");
      }
      this.$confirm("是否删除选中的项目？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          const param = { ids };
          deleteProject(param)
            .then((res) => {
              this.$message.success("删除成功");
              this.getTableList();
            })
            .catch(() => {
              this.$message.error("删除失败");
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 表格选中值集
    handleSelectionChange(val) {
      console.log(val);
      this.selectedTableData = val;
    },

    query() {
      this.tableLoading = true;
      let param = {
        ...this.ruleForm,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      // 分页查询获取项目列表
      queryProjectByPage(param)
        .then((res) => {
          this.tableListData = res.data;
          this.page.total = res.total;
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.form-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.item ::v-deep {
  display: flex;
  margin-right: -6rem;
  flex-wrap: wrap;
  .el-form-item {
    /* display: flex; */ //平行解开
    width: 21rem;
    margin-right: 6.2rem;
    position: relative;
    .el-form-item__label {
      width: 52%;
    }
    .el-form-item__content {
      width: 100%;
    }
    /* 禁用样式 */
    .el-input.is- .el-input__inner {
      background-color: #f4f5f6;
      color: #000;
      text-align: center;
    }
  }
}
</style>
