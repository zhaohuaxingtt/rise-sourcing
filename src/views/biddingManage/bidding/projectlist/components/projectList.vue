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
      <iCard style="margin-top: 1rem" :title="language('BIDDING_XIANGMUCHAXUN','项目查询')" collapse>
        <div class="form-top">
          <!-- <div>
            <h2>{{language('BIDDING_XIANGMUCHAXUE','项目查询')}}</h2>
          </div> -->
           <div class="item">
          <iFormItem :label="language('BIDDING_RFQ/XIANGMUBIANHAO', 'RFQ/项目编号')" prop="rfqCode">
            <iLabel :label="language('BIDDING_RFQ/XIANGMUBIANHAO', 'RFQ/项目编号')" slot="label"></iLabel>
            <iInput :placeholder="language('BIDDING_QINGSHURU', '请输入')" v-model="ruleForm.rfqCode"></iInput>
          </iFormItem>

          <iFormItem :label="language('BIDDING_RFQ/XIANGMUMINGCHENG', 'RFQ/项目名称')" prop="rfqName">
            <iLabel :label="language('BIDDING_RFQ/XIANGMUMINGCHENG', 'RFQ/项目名称')" slot="label"></iLabel>
            <iInput :placeholder="language('BIDDING_QINGSHURU', '请输入')" v-model="ruleForm.rfqName"></iInput>
          </iFormItem>

          <iFormItem :label="language('BIDDING_XIANGMULEIXING', '项目类型')" prop="projectType">
            <iLabel :label="language('BIDDING_XIANGMULEIXING', '项目类型')" slot="label"></iLabel>
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

          <iFormItem :label="language('BIDDING_BAOJIALEIXING', '报价类型')" prop="quoteType">
            <iLabel :label="language('BIDDING_BAOJIALEIXING', '报价类型')" slot="label"></iLabel>
            <iSelect ref='select' v-model="ruleForm.quoteType" clearable @keydown.native.capture.enter.stop.prevent>
              <el-option
                v-for="(item, index) in quoteType"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem :label="language('BIDDING_JINGJIALEIXING', '竞价类型')" prop="biddingType">
            <iLabel :label="language('BIDDING_JINGJIALEIXING', '竞价类型')" slot="label"></iLabel>
            <iSelect ref='select' v-model="ruleForm.biddingType" clearable @keydown.native.capture.enter.stop.prevent>
              <el-option
                v-for="(item, index) in biddingType"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem :label="language('BIDDING_BENLUNRFQGUANBISHIJIAN', '本轮RFQ关闭时间')" prop="rfqEndTime">
            <iLabel :label="language('BIDDING_BENLUNRFQGUANBISHIJIAN', '本轮RFQ关闭时间')" slot="label"></iLabel>
            <iDatePicker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.rfqEndTime"
            />
          </iFormItem>

          <iFormItem :label="language('BIDDING_KAISHISHIJIAN', '开始时间')" prop="openTenderTime">
            <iLabel :label="language('BIDDING_KAISHISHIJIAN', '开始时间')" slot="label"></iLabel>
            <iDatePicker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.openTenderTime"
            />
          </iFormItem>

          <iFormItem :label="language('BIDDING_JIESHUSHIJIAN', '结束时间')" prop="biddingBeginTime">
            <iLabel :label="language('BIDDING_JIESHUSHIJIAN', '结束时间')" slot="label"></iLabel>
            <iDatePicker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="datetime"
              :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
              v-model="ruleForm.biddingBeginTime"
              :picker-options="biddingBeginTimeOptions"
            />
          </iFormItem>

          <iFormItem :label="language('BIDDING_ZHUANGTAI', '状态')" prop="biddingStatus">
            <iLabel :label="language('BIDDING_ZHUANGTAI', '状态')" slot="label"></iLabel>
            <iSelect ref='select' v-model="ruleForm.biddingStatus" clearable @keydown.native.capture.enter.stop.prevent>
              <el-option
                v-for="(item, index) in biddingStatus"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem :label="language('BIDDING_CHUANGJIANREN', '创建人')" prop="createName">
            <iLabel :label="language('BIDDING_CHUANGJIANREN', '创建人')" slot="label"></iLabel>
            <iInput :placeholder="language('BIDDING_QINGSHURU', '请输入')" v-model="ruleForm.createName"></iInput>
          </iFormItem>

          <iFormItem :label="language('BIDDING_LINGJIANHAO', '零件号')" prop="partNumber">
            <iLabel :label="language('BIDDING_LINGJIANHAO', '零件号')" slot="label"></iLabel>
            <iInput :placeholder="language('BIDDING_QINGSHURU', '请输入')" v-model="ruleForm.partNumber"></iInput>
          </iFormItem>
          </div>
          <div class="item-button">
            <iButton @click.enter="getTableList">{{language('BIDDING_CHAXUN','查询')}}</iButton>
            <iButton @click="handleSearchReset('ruleForm')">{{language('BIDDING_CHONGZHI','重置')}}</iButton>
          </div>
        </div>

      </iCard>

      <!-- 项目列表 -->
      <iCard style="margin-top: 1rem">
        <div class="form-top1">
          <div>
            <h2>{{language('BIDDING_XIANGMULIEBIAO', '项目列表')}}</h2>
          </div>
          <div>
            <iButton @click="showAddManual = true">{{language('BIDDING_XINJIANXIANGMU', '新建项目')}}</iButton>
            <iButton
              @click="handleDelete"
              :disabled="selectedTableData.length === 0"
              >{{language('BIDDING_SHANCHU', '删除')}}</iButton
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
    // 绑定enter事件
    this.enterKeyup();
  },
  destroyed() {
    // 销毁enter事件
      this.enterKeyupDestroyed();
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
    enterKey(event) {
      const code = event.keyCode
          ? event.keyCode
          : event.which
              ? event.which
              : event.charCode;
      if (code == 13) {
        console.log(218,this.$refs.select)
        this.$refs.select.blur();
          this.getTableList();
      }
    },
    enterKeyupDestroyed() {
        document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
        document.addEventListener("keyup", this.enterKey);
    },
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
        return this.$message.error(this.language('BIDDING_ZKXZSGCJQZTW【CG】DXM','只可选择手工创建且状态为【草稿】的项目'));
      }
      this.$confirm(this.language('BIDDING_SFSCXZDXM','是否删除选中的项目？'), this.language('BIDDING_TISHI','提示'), {
        confirmButtonText: this.language('BIDDING_SHI','是'),
        cancelButtonText: this.language('BIDDING_FOU','否'),
        type: "warning",
      })
        .then(() => {
          const param = { ids };
          deleteProject(param)
            .then((res) => {
              this.$message.success(this.language('BIDDING_SHANCHUCHENGGONG','删除成功'));
              this.getTableList();
            })
            .catch(() => {
              this.$message.error(this.language('BIDDING_SHANCHUSHIBAI','删除失败'));
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
::v-deep .card .cardHeader  {
  justify-content: flex-end !important;
  padding-bottom: 0;
  .title{
    display: none !important;
  }
  .rotate{
    margin-bottom: 1.875rem;
  }
}
.form-top {
  display: flex;
  margin-top: -1.5rem;
  /* align-items: center;
  justify-content: space-between; */
  /* margin-bottom: 1.5rem; */
}
.form-top1{
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
    width: 13rem;
    margin-right: 5rem;
    position: relative;
    .el-form-item__label {
      width: 100%;
      .flex-align-center{
        font-weight: 600;
        font-size: smaller;
      }
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

.item-button{
  flex: none;
  margin-top: 2.5rem;
}

::v-deep .el-date-editor {
  width: 100%;
  .el-icon-time::before {
    content: "";
    display: none;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0.2rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    color: grey;
    background-image: url("~@/assets/images/datetime.svg");
    background-size: 2rem 2rem;
    background-repeat: no-repeat
  }
  &:hover::after {
    display: none;
  }

  .el-input__inner {
    padding-left: 0.875rem;
  }
}
</style>
