<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-04-26 17:52:13
 * @LastEditors: 余继鹏 917955345@qq.com
 * @FilePath: \front-web\src\views\designate\home\signSheet\approve\details.vue
-->
<template>
  <iPage class="details">
    <div class="page-header">
      <span class="title">签字单:{{ signCode }}</span>
      <div class="button-box">
        <iButton @click="signDocExport">导出</iButton>
        <iButton @click="signApprove(1)">批准</iButton>
        <iButton @click="signApprove(0)">拒绝</iButton>
      </div>
    </div>
    <div class="margin-top20">
      <el-radio-group class="radio-group" v-model="tab">
        <el-radio-button label="part">Part * {{ partNum }}</el-radio-button>
        <el-radio-button label="mtz"
          >MTZ Rules & Parts * {{ mtzNum }}</el-radio-button
        >
      </el-radio-group>
    </div>
    <partTable
      class="margin-top10"
      ref="partTable"
      v-show="tab == 'part'"
      @setCount="setCount"
    ></partTable>
    <mtzTable
      class="margin-top10"
      ref="mtzTable"
      v-show="tab == 'mtz'"
      @setCount="setCount"
    ></mtzTable>
  </iPage>
</template>

<script>
import { iPage, iButton, iMessage } from "rise";
import partTable from "./components/partTable";
import mtzTable from "./components/mtzTable";
import {
  signApprove,
  signDocExport,
} from "@/api/designate/nomination/mApprove";
export default {
  components: {
    iPage,
    iButton,
    partTable,
    mtzTable,
  },
  data() {
    return {
      signCode: "",
      tab: "part",
      partNum: "",
      mtzNum: "",
    };
  },
  created() {
    this.signCode = this.$route.query.signCode || "-";
  },
  methods: {
    setCount(key, count) {
      this[key] = count;
    },

    signApprove(isAgree) {
      // 0拒绝、1同意
      let selectData = [
        ...this.$refs.partTable.selectData,
        ...this.$refs.mtzTable.selectData,
      ];
      // 没有勾选数据，则全部审批
      if (!selectData.length) {
        let params = {
          isAgree: isAgree, // 0拒绝、1同意
          isConfirm: 1, // 是否确认弹窗请求，1-是，0-否
          reason: isAgree ? "【同意】" : "【拒绝】", // 原因
          signIds: [this.$route.query.signId],
        };
        signApprove(params).then(async (res) => {
          if (res?.code == 200) {
            iMessage.success("操作成功");
            this.$refs.partTable.getData();
            this.$refs.mtzTable.getData();
          } else {
            await this.$confirm(
              this.$i18n.locale == "zh" ? res.desZh : res.desEn,
              this.language("LK_WENXINTISHI", "温馨提示"),
              {
                confirmButtonText: this.language("LK_QUEDING", "确定"),
                cancelButtonText: this.language("LK_QUXIAO", "取 消"),
                type: "warning",
              }
            )
              .then(() => {
                let params = {
                  isAgree: isAgree, // 0拒绝、1同意
                  isConfirm: 0, // 是否确认弹窗请求，1-是，0-否
                  reason: isAgree ? "【同意】" : "【拒绝】", // 原因
                  signIds: [this.$route.query.signId],
                };
                signApprove(params).then((res) => {
                  if (res?.code == 200) {
                    iMessage.success("操作成功");
                    this.$refs.partTable.getData(),
                      this.$refs.mtzTable.getData();
                  } else {
                    iMessage.error("操作失败");
                  }
                });
              })
              .catch(() => {});
          }
        });
      } else {
        let approvedList = []; // 已完成审批的数据
        selectData.forEach((item) => {
          if (item.approvedStatus != "M_CHECK_INPROCESS") {
            approvedList.push("[" + item.appNo + "]");
          }
        });
        if (approvedList.length) {
          return iMessage.error(
            `所选记录${approvedList.join(
              "、"
            )}已完成审批，请选择待审批的记录进行操作`
          );
        } else {
          this.$confirm(
            `是否对所选记录${approvedList.join("、")}审批${
              isAgree ? "通过" : "拒绝"
            }？`,
            this.language("LK_WENXINTISHI", "温馨提示"),
            {
              type: "warning",
            }
          )
            .then(() => {
              let params = {
                isAgree: isAgree, // 0拒绝、1同意
                isConfirm: 0, // 是否确认弹窗请求，1-是，0-否
                reason: isAgree ? "【同意】" : "【拒绝】", // 原因
                signAppIds: selectData.map((item) => {
                  return item.signAppId;
                }),
              };
              signApprove(params).then((res) => {
                if (res?.code == 200) {
                  iMessage.success("操作成功");
                  this.$refs.partTable.getData();
                  this.$refs.mtzTable.getData();
                } else {
                  iMessage.error("操作失败");
                  this.$refs.partTable.getData();
                  this.$refs.mtzTable.getData();
                }
              });
            })
            .catch();
        }
      }
    },
    // 导出
    signDocExport() {
      let params = {
        signId: this.$route.query.signId,
      };
      signDocExport(params).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.details {
  .page-header {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }
  ::v-deep .el-radio-group {
    &.radio-group {
      .el-radio-button__inner {
        display: flex;
        border-radius: 0;
        padding: 3px 15px;
        align-items: center;
        min-width: 60px;
        justify-content: center;
        &:hover {
          color: #727272;
        }
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background: #364d6e;
        color: #fff;
        border-color: #e0e6ed;
      }
    }
  }
  ::v-deep .el-table {
    border-radius: 0;
    font-size: 18px;
    .el-table__header {
      tr {
        background-color: #364d6e;
      }
      tr:nth-child(even) {
        background-color: #364d6e;
      }
      th {
        border-color: #d9d9d9;
        .cell {
          color: #fff;
          line-height: 20px;
        }
      }
      th.gutter:last-of-type {
        background: #fff;
        border: 0;
      }
    }
    .el-table__body-wrapper,
    .el-table__fixed-body-wrapper {
      tr:nth-child(even) {
        background-color: #ffffff;
      }

      tr:last-of-type {
        td {
          // border-bottom: 1px solid #d9d9d9;
        }
      }

      td {
        border-color: #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        .cell {
          line-height: 20px;
        }
      }
    }
    .el-table__footer-wrapper {
      tr:nth-child(even) {
        background-color: #ffffff;
      }
    }
    tr {
      .link {
        color: #364d6e;
        text-decoration: underline;
      }
    }
  }
}
</style>