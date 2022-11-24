<template>
  <iCard>
    <tableList
      class="margin-top15"
      ref="tableList"
      height="400"
      index
      :selection="false"
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      :lang="true"
      v-loading="tableLoading"
    >
      <template #aekoNum="scope">
        <div style="text-align: left">
          <a class="link-underline" href="javascript:;">
            {{ scope.row.aekoNum }}
          </a>
        </div>
      </template>
      <template #endTime="scope">
        <span>{{ scope.row.endTime | formatDate }}</span>
      </template>
      <template #akeoAuditType="scope">
        {{ getAdiType(scope.row.akeoAuditType) }}
      </template>
      <template #startUser="scope">
        <span>{{ scope.row.startUser ? scope.row.startUser.nameZh : "" }}</span>
      </template>
      <template #comment="scope">
        <span>{{ itemCommentContent(scope.row) }}</span>
      </template>
      <template #explainReason="scope">
        <iInput
          v-if="!itemIsCanReply(scope.row, scope.$index)"
          v-model="scope.row.explainReason"
          type="textarea"
          rows="2"
          :placeholder="language('LK_QINGSHURU', '请输入')"
          clearable
        />
        <span v-else-if="itemExplainShow(scope.row)">{{
          itemExplain(scope.row)
        }}</span>
        <span v-else>{{ scope.row.explainReason }}</span>
      </template>
      <template #attach="scope">
        <a
          class="link-underline"
          href="javascript:;"
          @click="openUploadDialog(scope.row, false)"
          v-if="!itemIsCanReply(scope.row, scope.$index)"
        >
          {{ language("LK_SHANGCHUAN", "上传") }}
        </a>
        <a
          class="link"
          href="javascript:;"
          @click="openUploadDialog(scope.row, true)"
          v-else
        >
          {{ language("CHAKAN", "查看") }}
        </a>
      </template>
    </tableList>
    <div class="pagination">
      <iPagination
        v-update
        class="pagination"
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
    <iFileDialog
      width="800"
      :title="language('JIESHIFUJIANCHAKAN', '解释附件查看')"
      :visible.sync="attachDialogVisibal"
      :hostId="attachAekoCode"
      :init="false"
      :getFileCallBack="getAttach"
      :onSuccessCallBack="onUploadsucess"
      :deleteFileCallBack="deleteFile"
      :customizeTableTitle="attachTableTitle"
      :editControl="['delete', 'upload']"
      :activeItems="'fileName'"
      :readOnly="attachReadOnly"
    />
  </iCard>
   <!-- 上传附件弹窗 -->

</template>

<script>
import Vuex from "vuex";
import { iCard } from "rise";
import tableList from "@/components/iTableSort";
import {
  approveReCordTableTitle as tableTitle,
  aekoApproveTypes,
  attachTableTitle,
  auditFileSave,
  auditFileDelete,
} from "../data";
import { getAuditFilePage } from "@/api/aeko/detail/approveAttach";

import iFileDialog from "rise/web/components/iFile/dialog";

import { pageMixins } from "@/utils/pageMixins";
import {
  findHistoryByAeko,
  getHistoricByParams
} from "@/api/aeko/detail/approveRecord";

export default {
    components:{
        iCard,
        tableList,
        iFileDialog
    },
    mixins: [pageMixins],
    data(){
        return{
            tableTitle:tableTitle,
            tableLoading:false,
            tableListData:[],
                  // 解释记录
      tableExplainData: [],
      // 自定义解释附件表头
      attachTableTitle,
      // 附件弹窗
      attachDialogVisibal: false,
      attachAekoCode: "",
      attachReadOnly: false,
      currentRow: {},
      approveStatus: "", // 流程状态
        }
    },
    created(){
        this.getFetchData();
        console.log(this.aekoInfo)
    },
    props: {
        aekoInfo: {
            type: Object,
            default: () => {},
        },
    },
    computed:{
        ...Vuex.mapState({
            userInfo: (state) => state.permission.userInfo,
        }),
    },
    methods:{
      getAdiType(code) {
        return aekoApproveTypes.find((o) => o.id === code)?.name || "";
      },
      itemCommentContent(row) {
        if (row.activityName == "【解释说明回复】") {
          return "";
        }
        return row.comment;
      },
      itemExplainShow(row) {
      return row.activityName == "【解释说明回复】";
    },
        itemExplain(row) {
          if (row.activityName == "【解释说明回复】") {
            return row.comment;
          }
          return "";
        },
        itemIsCanReply(row, index = null) {
          // 第一行如果是补充材料就允许编辑
          if (this.approveStatus == 3) return index !== 0;
          //不用回复
          return true;
          // return row.disabled;
        },

        async getFetchData() {
            this.tableLoading = true;
            await this.getexplainList();
        },
        openUploadDialog(row, attachReadOnly) {
          this.attachReadOnly = attachReadOnly;
          if (!row.taskId) {
            this.$message.error(
              this.language("TASKIDBUNENGWEIKONG", "TASK ID 不能为空")
            );
            return;
          }
          if (!row.processInstanceId) {
            this.$message.error(
              this.language("LIUCHNEGIDBUENNGWEIKONG", "流程不能为空")
            );
            return;
          }
          this.attachDialogVisibal = true;
          this.attachAekoCode = row.aekoCode;
          this.currentRow = row;
        },
        getexplainList() {
            // const parmas = Object.assign({
            //     applyUserId: String(this.userInfo.id) || "",
            //     currentUserId: String(this.userInfo.id) || "",
            //     aekoNo: this.aekoInfo.aekoNo || "",
            //     hasParentTaskId: true,
            //     pageNo: this.page.currPage,
            //     pageSize: this.page.pageSize,
            // });
            const data = {
              aekoNo: this.aekoInfo.aekoNum || "",
              hasParentTaskId: true,
              pageNo: this.page.currPage,
              pageSize: this.page.pageSize,
            };
                getHistoricByParams(data).then((res) => {
                  if (res?.data) {
                    this.tableLoading = false;
                    this.page.totalCount = res.data.total;
                    let resDatas = res.data.records;
                    // resDatas= resDatas.filter(item=>item.comment!='AutoCompleted')
                    this.tableListData = resDatas.map((item) => {
                      item.disabled = item.activityName != "【补充材料通知】补充材料";
                      return item;
                    });
              }
            });
            // findHistoryByAeko(parmas).then((res) => {
            //     this.tableLoading = false;
            //     if (res?.data) {
            //         let resDatas = res.data.records;
            //         resDatas = resDatas.filter(
            //         (item) =>
            //             item.comment != "AutoCompleted" && item.comment != "AutoSkip"
            //         );
            //         this.tableListData = resDatas.map((item) => {
            //         item.disabled = item.activityName != "【补充材料通知】补充材料";
            //         return item;
            //         });
            //     }
            // });
        },
         /**
       * @description: 获取数据列表
       * @param {*}
       * @return {*}
       */
      getAttach(cb) {
        console.log(this.aekoInfo);
        const parmas = Object.assign({
          linieId: this.userInfo.id || "",
          aekoNum: this.aekoInfo.aekoCode,
          manageId: Number(this.aekoInfo.aekoManageId) || "",
          taskId: [Number(this.currentRow.taskId)],
          current: this.page.currPage,
          size: this.page.pageSize,
        });
        let tableLoading = false;
        let tableListData = [];
        let totalCount = 0;
        cb &&
          typeof cb === "function" &&
          cb({
            fileTableLoading: true,
          });
        getAuditFilePage(parmas)
          .then((res) => {
            if (res.code === "200") {
              tableListData = (res.data || []).map((o) => {
                o.fileSize = `${o.fileSize} MB`;
                return o;
              });
              totalCount = res.total;
            } else {
              tableListData = [];
              this.$message.error(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
            }
            tableLoading = false;
            cb &&
              typeof cb === "function" &&
              cb({
                fileTableLoading: tableLoading,
                fileDataList: tableListData,
                totalCount,
              });
          })
          .catch((e) => {
            cb &&
              typeof cb === "function" &&
              cb({
                fileTableLoading: false,
              });
            this.$message.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
          })
          .finally(() => {
            cb &&
              typeof cb === "function" &&
              cb({
                fileTableLoading: false,
              });
          });
      },
      onUploadsucess(data, cb) {
        console.log("data", data);
        const fileData = data.data || {};
        const parmas = {
          aekoNum: this.aekoInfo.aekoCode,
          manageId: Number(this.aekoInfo.aekoManageId) || "",
          fileName: fileData.name || "",
          filePath: fileData.path || "",
          fileSize: Number(fileData.size / 1000 / 1000).toFixed(2) || 0, // 文件大小MB
          fileType: fileData.extensionName || "",
          uploadId: fileData.id || "",
          linieId: this.userInfo.id || "",
          deptId: (this.userInfo.deptDTO && this.userInfo.deptDTO.id) || "",
          auditUserId: this.userInfo.id || "",
          taskId: this.currentRow.parentTaskId,
        };
        this.uploading = true;
        auditFileSave(parmas)
          .then((res) => {
            if (res.code === "200") {
              this.$message.success(
                this.language("LK_CAOZUOCHENGGONG", "操作成功")
              );
              cb && typeof cb === "function" && cb();
            } else {
              this.$message.error(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
            }
            this.uploading = false;
          })
          .catch((e) => {
            this.$message.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
            this.uploading = false;
          });
      },
        deleteFile(data = [], cb) {
        console.log("删除文件", data, cb);
        if (!data.length) {
          this.$message.error(
            this.language("QINGXUANZEZHISHAOYITIAOSHUJU", "请选择至少一条数据")
          );
          return;
        }
        const fileList = data.map((o) => o.id);
        if (fileList && !fileList.length)
          return this.$message.error(
            this.language("QINGXUANZEZHISHAOYITIAOSHUJU", "请选择至少一条数据")
          );
        this.$confirm(
          this.language("deleteSure", "您确定要执行删除操作吗？")
        ).then((confirmInfo) => {
          if (confirmInfo === "confirm") {
            auditFileDelete({
              ids: fileList,
              isSubmited: !this.checkFirstRecord, // 是否已提交
              delType: 1,
            })
              .then((res) => {
                if (res.code === "200") {
                  this.$message.success(
                    this.language("LK_CAOZUOCHENGGONG", "操作成功")
                  );
                  cb && typeof cb === "function" && cb();
                } else {
                  this.$message.error(
                    this.$i18n.locale === "zh" ? res.desZh : res.desEn
                  );
                }
              })
              .catch((e) => {
                this.$message.error(
                  this.$i18n.locale === "zh" ? e.desZh : e.desEn
                );
              })
              .finally(() => {});
          }
        });
      },
    }

}
</script>

<style>

</style>