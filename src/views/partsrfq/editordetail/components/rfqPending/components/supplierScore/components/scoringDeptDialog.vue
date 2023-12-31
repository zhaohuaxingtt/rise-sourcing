<template>
  <iDialog
    class="dialog"
    :title="language('LK_SHEZHIPINGFENBUMEN', '设置评分部门')"
    v-bind="$props"
    :visible.sync="visible"
    v-on="$listeners"
  >
    <div class="body">
      <div class="control" id="control">
        <iButton @click="handleAdd" v-if="!customAction">{{
          language("LK_XINZENG", "新增")
        }}</iButton>
        <iButton @click="handleDelete" v-if="!customAction">{{
          language("LK_SHANCHU", "删除")
        }}</iButton>
        <iButton @click="handleRecover" v-if="!customAction">{{
          language("LK_HUIFU", "恢复")
        }}</iButton>
        <iButton @click="handleSave" :loading="saveLoading">{{
          language("LK_BAOCUN", "保存")
        }}</iButton>
      </div>
      <tableList
        index
        height="83%"
        class="table margin-top20"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :cellClassName="deleteLine"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #rateTag="scope">
          <iSelect
            v-model="scope.row.rateTag"
            :disabled="scope.row.deleteStatus || customAction"
            @change="handleClearAll($event, scope.row)"
          >
            <el-option
              v-for="item in deptScoringOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </iSelect>
        </template>
        <template #rateDepartNum="scope">
          <iSelect
            v-if="scope.row.rateTag"
            v-model="scope.row.rateDepartNum"
            :disabled="scope.row.deleteStatus"
            @change="handleClearCoordinatorAndRater($event, scope.row)"
          >
            <el-option
              v-for="(item, $index) in deptMap[scope.row.rateTag]
                ? Object.values(deptMap[scope.row.rateTag])
                : []"
              :key="$index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </iSelect>
        </template>
        <!-- right 评分人 -->
        <template #raterId="scope">
          <iSelect
            v-if="scope.row.rateDepartNum"
            v-model="scope.row.raterId"
            :disabled="scope.row.deleteStatus"
            @change="
              handleChange(
                $event,
                deptMap[scope.row.rateTag][scope.row.rateDepartNum].raterList,
                scope.row,
                'rater'
              )
            "
          >
            <el-option
              v-for="(item, $index) in deptMap[scope.row.rateTag] &&
              deptMap[scope.row.rateTag][scope.row.rateDepartNum]
                ? deptMap[scope.row.rateTag][scope.row.rateDepartNum].raterList
                : []"
              :key="$index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </iSelect>
        </template>
        <!-- left 评分人 -->
        <template #coordinatorId="scope">
          <iSelect
            v-if="scope.row.rateDepartNum"
            v-model="scope.row.coordinatorId"
            :disabled="scope.row.deleteStatus"
            @change="
              handleChange(
                $event,
                deptMap[scope.row.rateTag][scope.row.rateDepartNum]
                  .coordinatorList,
                scope.row,
                'coordinator'
              )
            "
          >
            <el-option
              v-for="(item, $index) in deptMap[scope.row.rateTag] &&
              deptMap[scope.row.rateTag][scope.row.rateDepartNum]
                ? deptMap[scope.row.rateTag][scope.row.rateDepartNum]
                    .coordinatorList
                : []"
              :key="$index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </iSelect>
        </template>
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iMessage } from "rise";
import tableList from "@/views/partsign/editordetail/components/tableList";
import { scoringDeptTitle as tableTitle } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import {
  getAllDeptTag,
  getRfqRateDeparts,
  getAllRaterAndCoordinator,
  saveRfqRateDeparts,
} from "@/api/configscoredept";

export default {
  components: { tableList, iDialog, iSelect, iButton },
  mixins: [pageMixins],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    ids: {
      type: Array,
    },
    customAction: {
      type: Boolean,
    },
  },
  watch: {
    visible(nv) {
      if (nv && this.ids.length) {
        this.getRfqRateDepartsData();
        this.getAllDeptTag();
      } else {
        this.tableListData = [];
        this.$emit("update", this.isUpdate);
        this.deptMap = {
          EP: null,
          MQ: null,
        };
      }
      this.$emit("update:visible", nv);
    },
  },
  created() {
    // if (this.customAction) {
    //   this.tableTitle = this.tableTitle.filter(title => title.props !== 'coordinatorId')
    // } else {
    if (!this.visible) return;
    if (!this.$route.query.id) return;
    this.getRfqRateDepartsData();
    this.getAllDeptTag();
    // }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      deptScoringOptions: [],
      saveLoading: false,
      isUpdate: false,
      scoreDeptOptions: [],
      deptMap: {
        EP: null,
        MQ: null,
      },
    };
  },
  methods: {
    // 获取评分部门类型
    getAllDeptTag() {
      getAllDeptTag()
        .then((res) => {
          if (res.code == 200) {
            this.deptScoringOptions = Array.isArray(res.data)
              ? res.data.map((item) => ({
                  ...item,
                  key: item.rateTag,
                  label: item.rateTagDesc,
                  value: item.rateTag,
                })).filter(item=>item.key!=='SQE') // 过滤掉其中的SQE部门
              : [];
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch(() => {});
    },
    // 获取下拉列表值
    getRfqRateDeparts(rateTag, type) {
      if (this.deptMap[rateTag] && Object.keys(this.deptMap[rateTag]).length)
        return;
      console.log("000000000");
      return getRfqRateDeparts({
        // rfqIds: type === "all" ? undefined : this.ids,
        rateTag,
      })
        .then((res) => {
          if (res.code == 200) {
            this.deptMap[rateTag] = {};

            res.data.forEach((dept) => {
              this.$set(this.deptMap[rateTag], dept.rateDepartNum, {
                ...dept,
                label: dept.rateDepartNum,
                value: dept.rateDepartNum,
                key: dept.rateDepartNum,
              });
            });
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch(() => {});
    },
    // 获取评分人和协调人列表
    getAllRaterAndCoordinator(rateTag, rateDepartNum, data = {}) {
      if (
        this.deptMap[rateTag] &&
        this.deptMap[rateTag][rateDepartNum] &&
        (this.deptMap[rateTag][rateDepartNum].raterList ||
          this.deptMap[rateTag][rateDepartNum].coordinatorList)
      )
        return;

      return getAllRaterAndCoordinator({
        rateTag,
        rateDepartNum,
      })
        .then((res) => {
          if (res.code == 200) {
            // 评分人
            let raterList = res.data.raterList.map((item) => ({
              ...item,
              label: item.nameZh,
              value: item.id,
              key: item.id,
            }));
            console.log("data.raterId=>", data.raterId);
            // if(data.raterId&&!raterList.map(i=>i.value).includes(data.raterId)){
            //   raterList.push({
            //     ...data,
            //     label: data.rater,
            //     value: data.raterId,
            //     key: data.raterId
            //   })
            // }
            // 协调人
            let coordinatorList = res.data.coordinatorList.map((item) => ({
              ...item,
              label: item.nameZh,
              value: item.id,
              key: item.id,
            }));
            // if(data.coordinatorId&&!coordinatorList.map(i=>i.value).includes(data.coordinatorId)){
            //   coordinatorList.push({
            //     ...data,
            //     label: data.coordinator,
            //     value: data.coordinatorId,
            //     key: data.coordinatorId
            //   })
            // }
            this.$set(
              this.deptMap[rateTag][rateDepartNum],
              "raterList",
              raterList
            );
            this.$set(
              this.deptMap[rateTag][rateDepartNum],
              "coordinatorList",
              coordinatorList
            );
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch(() => {
          this.deptMap[rateTag] &&
            this.deptMap[rateTag][rateDepartNum] &&
            this.$set(this.deptMap[rateTag][rateDepartNum], "raterList", [
              {
                ...data,
                label: data.rater,
                value: data.raterId,
                key: data.raterId,
              },
            ]);
          this.deptMap[rateTag] &&
            this.deptMap[rateTag][rateDepartNum] &&
            this.$set(this.deptMap[rateTag][rateDepartNum], "coordinatorList", [
              {
                ...data,
                label: data.coordinator,
                value: data.coordinatorId,
                key: data.coordinatorId,
              },
            ]);
        });
    },
    // 获取已保存的评分部门
    getRfqRateDepartsData() {
      this.loading = true;

      getRfqRateDeparts({
        rfqIds: this.ids,
      })
        .then((res) => {
          if (res.code == 200) {
            this.tableListData = Array.isArray(res.data) ? res.data : [];

            if (this.tableListData.length > 0) {
              this.iteratorRecursive(this.tableListData.values());
            }
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .finally(() => (this.loading = false));
    },
    async iteratorRecursive(iterator) {
      const data = iterator.next().value;

      if (data) {
        await this.getRfqRateDeparts(data.rateTag);

        if (data.rateTag && data.rateDepartNum) {
          await this.getAllRaterAndCoordinator(
            data.rateTag,
            data.rateDepartNum,
            data
          );
        }

        this.iteratorRecursive(iterator);
      }
    },
    handleSelectionChange(list) {
      this.multipleSelection = list;
    },

    handleAdd() {
      this.tableListData.push({
        // rateTag: "", // 评分部门类型
      });
    },
    // 前端样式删除（删除数据不传给后端，保存后刷新数据重绘掉）
    handleDelete() {
      if (!this.multipleSelection.length)
        return iMessage.warn(
          this.language(
            "LK_QINGXUANZEXUYAOSHANCHUDEPINGFENBUMEN",
            "请选择需要删除的评分部门"
          )
        );

      this.multipleSelection.forEach((item) =>
        this.$set(item, "deleteStatus", true)
      );
    },
    deleteLine({ row }) {
      if (row.deleteStatus) return "deleteLine";
    },
    // 前端样式恢复
    handleRecover() {
      if (!this.multipleSelection.length)
        return iMessage.warn(
          this.language(
            "LK_QINGXUANZEXUYAOHUIFUDEPINGFENBUMEN",
            "请选择需要恢复的评分部门"
          )
        );

      this.multipleSelection.forEach((item) => {
        this.$set(item, "deleteStatus", false);

        if (
          Array.isArray(
            this.deptMap[item.rateTag][item.rateDepartNum].raterList
          )
        ) {
          item.raterId =
            this.deptMap[item.rateTag][item.rateDepartNum].raterList[0].value;
          this.handleChange(
            item.raterId,
            this.deptMap[item.rateTag][item.rateDepartNum].raterList,
            item,
            "rater"
          );
        }

        if (
          Array.isArray(
            this.deptMap[item.rateTag][item.rateDepartNum].coordinatorList
          )
        ) {
          item.coordinatorId =
            this.deptMap[item.rateTag][
              item.rateDepartNum
            ].coordinatorList[0].value;
          this.handleChange(
            item.coordinatorId,
            this.deptMap[item.rateTag][item.rateDepartNum].coordinatorList,
            item,
            "coordinator"
          );
        }
      });
    },
    handleChange(val, list, row, key) {
      for (let i = 0, item; (item = list[i++]); ) {
        if (item.id == val) {
          this.$set(row, key, item.nameZh);
        }
      }
    },
    // 评分部分类型变更
    handleClearAll(value, row) {
      if (this.deptMap[value] && Object.keys(this.deptMap[value]).length)
        return;

      this.getRfqRateDeparts(value, "all");
      this.$set(
        row,
        "rateTagDesc",
        this.deptScoringOptions.find((item) => item.rateTag === value)
          ?.rateTagDesc ?? ""
      );

      const keys = [
        "coordinator",
        "coordinatorId",
        "rateDepartNum",
        "rater",
        "raterId",
      ];
      keys.forEach((key) => this.$set(row, key, undefined));
    },
    // 评分部门变更
    async handleClearCoordinatorAndRater(value, row) {
      await this.getAllRaterAndCoordinator(row.rateTag, value, row);
      this.$set(row, "isCheck", this.deptMap[row.rateTag][value]?.isCheck);
      this.$set(row, "deptId", this.deptMap[row.rateTag][value]?.deptId ?? "");

      const keys = ["coordinator", "coordinatorId", "rater", "raterId"];
      keys.forEach((key) => this.$set(row, key, undefined));

      if (Array.isArray(this.deptMap[row.rateTag][value].raterList)) {
        row.raterId = this.deptMap[row.rateTag][value].raterList[0].value;
        this.handleChange(
          row.raterId,
          this.deptMap[row.rateTag][value].raterList,
          row,
          "rater"
        );
      }

      if (Array.isArray(this.deptMap[row.rateTag][value].coordinatorList)) {
        row.coordinatorId =
          this.deptMap[row.rateTag][value].coordinatorList[0].value;
        this.handleChange(
          row.coordinatorId,
          this.deptMap[row.rateTag][value].coordinatorList,
          row,
          "coordinator"
        );
      }
    },
    // 保存
    handleSave() {
      const list = this.tableListData.filter((item) => !item.deleteStatus);

      list.forEach((item) => {
        // coordinatorId 不一定会有，所以去掉!item.coordinatorId判断
        if (!item.raterId || !item.rateDepartNum) {
          throw iMessage.warn(
            this.language(
              "LK_QINGXUANZEWANSHUJUZAIZUOBAOCUN",
              "请选择完数据再做保存"
            )
          );
        }
      });
      let obj = {};
      let msg = "";
      list.forEach((item) => {
        let key = item.rateTag + item.raterId + item.coordinatorId;
        if (!obj[key]) {
          obj[item.rateTag + item.raterId + item.coordinatorId] = item;
        } else {
          msg = this.language(
            "评分类型、评分人、协调人信息不可重复，请检查数据",
            "评分类型、评分人、协调人信息不可重复，请检查数据"
          );
        }
      });
      if (msg) return iMessage.warn(msg);
      if (this.customAction) {
        // RFQ 管理页面 转派任务评分
        this.$emit("handleSave", this.multipleSelection);
      } else {
        this.saveLoading = true;
        saveRfqRateDeparts({
          rfqId: this.ids[0],
          data: list.map((item) => ({
            id: item.id,
            rateTag: item.rateTag,
            rateTagDesc: item.rateTagDesc,
            deptId: item.deptId,
            isCheck: item.isCheck,
            coordinator: item.coordinator,
            coordinatorId: item.coordinatorId,
            rateDepartNum: item.rateDepartNum,
            rater: item.rater,
            raterId: item.raterId,
            rfqId: this.ids[0],
          })),
        })
          .then((res) => {
            if (res.code == 200) {
              iMessage.success(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
              this.getRfqRateDepartsData();
              this.isUpdate = true; // 用于判断是否有数据更新
            } else {
              iMessage.error(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
            }
          })
          .finally(() => (this.saveLoading = false));
      }
    },
    setSaveLoading(val) {
      this.saveLoading = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }

  .control {
    text-align: right;
  }

  ::v-deep .el-dialog {
    width: 1500px !important;
    position: absolute;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 580px;
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
      @include pdtb(28px, 28px);
    }
  }

  .table {
    ::v-deep .deleteLine:not(.el-table-column--selection)::after {
      content: no-open-quote;
      position: absolute;
      top: 51%;
      left: 0;
      width: 100%;
      border-bottom: 1px solid $color-blue;
    }
  }
}
</style>