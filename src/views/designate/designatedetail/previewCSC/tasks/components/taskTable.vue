<template>
  <div>
    <div class="margin-bottom10">
      <span class="font20 font-weight">
        {{ language("Tasks", "Tasks") }}
      </span>
    </div>
    <div class="table-box">
      <tableList
        class="table"
        index
        height="100%"
        :selection="!$store.getters.isPreview"
        :tableData="data"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :class="{ taskTable: true, edit: editControl }"
        v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_TABLE | 表格"
        @handleSelectionChange="handleSingleSelectionChange"
      >
        <template #partNum="scope">
          <a class="link-underline" href="javascript:;">{{
            scope.row.partNum
          }}</a>
        </template>
        <!-- 任务时间 -->
        <template #taskTime="scope">
          <div v-if="editControl">
            <iDatePicker
              v-model="scope.row.taskTime"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </iDatePicker>
          </div>
          <span v-else>{{ formatDate(scope.row.taskTime) }}</span>
        </template>
        <!-- 任务名称 -->
        <template #taskRemark="scope">
          <div v-if="editControl">
            <iInput v-model="scope.row.taskRemark" />
          </div>
          <span v-else>{{ scope.row.taskRemark }}</span>
        </template>
        <!-- 任务结果 -->
        <template #taskResult="scope">
          <div v-if="editControl">
            <iInput maxlength="1000" v-model="scope.row.taskResult" />
          </div>
          <span v-else>{{ scope.row.taskResult }}</span>
        </template>
        <!-- 任务状态 -->
        <template #isFinishFlag="scope">
          <div v-if="editControl">
            <iSelect
              v-model="scope.row.isFinishFlag"
              :placeholder="language('LK_QINGXUANZE', '请选择')"
            >
              <el-option
                :value="items.key"
                :label="items.value"
                v-for="(items, index) in taskStatus"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{ getTaskStatusDesc(scope.row.isFinishFlag) }}</span>
        </template>
        <!-- 编辑 -->
        <template #edit="scope">
          <div>
            <!-- <div v-if="editControl && scope.row.isAdd"> -->
            <a
              class="link-underline"
              v-if="!scope.row.isPresent"
              @click="toggleShow(scope.row, true)"
            >
              <icon symbol name="iconyincang" class="icon trigger-visible" />
            </a>
            <a
              class="link-underline"
              v-else
              @click="toggleShow(scope.row, false)"
            >
              <icon symbol name="iconxianshi" class="icon trigger-visible" />
            </a>
          </div>
        </template>
      </tableList>
    </div>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getFetchData)"
      @current-change="handleCurrentChange($event, getFetchData)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { tasksTitle, taskStatus, getTaskStatusDesc } from "./data";
import {
  getNominateTaskList,
  addNominateTask,
  deleteNominateTask,
} from "@/api/designate/decisiondata/tasks";
import { excelExport } from "@/utils/filedowLoad";
import { pageMixins } from "@/utils/pageMixins";
import filters from "@/utils/filters";
import tableList from "@/components/iTableSort";

import dayjs from "dayjs";

import {
  iCard,
  iInput,
  iButton,
  iPagination,
  iMessage,
  iSelect,
  iDatePicker,
  icon,
} from "rise";

export default {
  components: {
    iCard,
    iButton,
    iInput,
    iSelect,
    iPagination,
    iDatePicker,
    icon,
    tableList,
  },
  mixins: [filters, pageMixins],
  data() {
    return {
      // 单一供应商
      tableTitle: JSON.parse(JSON.stringify(tasksTitle)),
      taskStatus,
      tableLoading: false,
      submiting: false,
      data: [],
      selectedData: [],
      editControl: false,
      batchEditVisibal: false,
      editColumn: {
        props: "edit",
        name: "Hide/Unhide",
        key: "Hide/Unhide",
        tooltip: false,
      },
    };
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: (state) => state.nomination.nominationDisabled,
      rsDisabled: (state) => state.nomination.rsDisabled,
    }),
  },
  mounted() {
    this.toggleShowEditCol(!this.$store.getters.isPreview);
    this.getFetchData();
  },
  methods: {
    formatDate(val) {
      return val ? dayjs(val).format("YYYY-MM-DD") : "";
    },
    // 取任务状态
    getTaskStatusDesc,
    addRow() {
      this.data.push({
        isFinishFlag: false,
        isPresent: true,
        isAdd: true,
        nominateId: this.$store.getters.nomiAppId,
        taskRemark: "",
        taskResult: "",
        taskTime: "",
      });
    },
    async deleteRow() {
      if (!this.selectedData.length) {
        iMessage.error(
          this.language(
            "nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu",
            "请选择至少一条数据"
          )
        );
        return;
      }
      const data = {
        taskIds: this.selectedData.map((o) => o.id),
      };
      console.log(data);
      const confirmInfo = await this.$confirm(
        this.language("deleteSure", "您确定要执行删除操作吗？")
      );
      if (confirmInfo !== "confirm") return;
      deleteNominateTask(data)
        .then((res) => {
          if (res.code === "200") {
            iMessage.success(this.language("LK_CAOZUOCHENGGONG", "操作成功"));
            this.getFetchData();
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch((e) => {
          console.log(e);
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
        });
    },
    toggleShow(row, state) {
      if (!this.editControl) return;
      Vue.set(row, "isPresent", state);
    },
    async save() {
      const data = {
        items: this.data.map((o) => {
          // const status = this.taskStatus.find(item => item.key === o.isFinishFlag) || {}
          return {
            id: o.id,
            isFinishFlag: o.isFinishFlag,
            isPresent: o.isPresent,
            nominateId: this.$store.getters.nomiAppId,
            taskRemark: o.taskRemark,
            taskResult: o.taskResult,
            taskTime: o.taskTime,
          };
        }),
      };
      console.log(data);
      const confirmInfo = await this.$confirm(
        this.language("saveSure", "您确定要保存吗？")
      );
      if (confirmInfo !== "confirm") return;
      this.submiting = true;
      addNominateTask(data)
        .then((res) => {
          if (res.code === "200") {
            iMessage.success(this.language("LK_CAOZUOCHENGGONG", "操作成功"));
            this.getFetchData();
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
          this.submiting = false;
        })
        .catch((e) => {
          console.log(e);
          this.submiting = false;
        });
    },
    // 获取任务列表
    getFetchData() {
      this.tableLoading = true;
      getNominateTaskList({
        nominateId:
          this.$store.getters.nomiAppId || this.$route.query.desinateId,
        current: this.page.currPage,
        size: this.page.pageSize,
        isPreview:
          this.$route.query.isPreview == "1" ||
          this.$store.getters.isPreview ||
          false,
      })
        .then((res) => {
          if (res.code === "200") {
            this.data = res.data || [];
            this.data.map((o) => {
              o.createDate = window
                .moment(o.createDate)
                .format("YYYY-MM-DD HH:mm:ss");
              o.taskTime = o.taskTime
                ? window.moment(o.taskTime).format("YYYY-MM-DD HH:mm:ss")
                : "";
              return o;
            });
            this.page.totalCount = res.total || 0;
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
          this.tableLoading = false;
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          this.tableLoading = false;
        });
    },
    // 批量编辑
    handleBatchEdit() {
      if (!this.selectedData.length) {
        iMessage.error("请选择");
        return;
      }
      this.batchEditVisibal = true;
    },
    handlEdit() {
      this.editControl = true;
      // if (!this.tasksTitle.find(o => o.props === 'edit')) {
      //   this.tasksTitle.push(this.editColumn)
      // }
    },
    handlCancel() {
      this.editControl = false;
      this.getFetchData();
      // if (this.tasksTitle.find(o => o.props === 'edit')) {
      //   this.tasksTitle.pop()
      // }
    },
    toggleShowEditCol(state) {
      if (state) {
        if (!this.tableTitle.find((o) => o.props === "edit")) {
          this.tableTitle.push(this.editColumn);
        }
      } else {
        if (this.tableTitle.find((o) => o.props === "edit")) {
          this.tableTitle.pop();
        }
      }
    },
    // 单一供应商
    handleSingleSelectionChange(data) {
      this.selectedData = data;
    },
    async exportTasks() {
      if (!this.selectedData.length) {
        iMessage.error(
          this.language(
            "nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu",
            "请选择至少一条数据"
          )
        );
        return;
      }
      console.log(this.selectedData);
      excelExport(this.selectedData, this.tableTitle);
    },
  },
};
</script>
<style lang="scss" scoped>
.link-underline {
  .trigger-visible {
    font-size: 18px;
  }
}
.table {
  ::v-deep .el-table__header {
    background-color: #364d6e;
  }
}
.table-box {
  height: calc(100% - 81px);
}
</style>