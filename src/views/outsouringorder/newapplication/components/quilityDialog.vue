<template>
  <iDialog
    :visible.sync="value"
    width="40%"
    @close="clearDiolog"
    append-to-body
  >
    <div class="titlebar" slot="title">
      <span>{{
        `${$t("LK_SHULIANG")}-${$t("MODEL-ORDER.LK_XIANGCI")}${
          detailInfo.sapItem
        }`
      }}</span>
      <iButton
        class="save"
        @click="saveSapItem"
        permissionKey="OUTSOURINGORDER_DETAILS_SHULIANG_BAOCUN"
        >{{ $t("LK_BAOCUN") }}</iButton
      >
    </div>
    <div class="item-dialog clearFloat">
      <div v-if="canEdit" class="floatright margin-bottom20">
        <iButton
          @click="increatment"
          permissionKey="OUTSOURINGORDER_DETAILS_SHULIANG_XINZENG"
          >{{ $t("LK_XINZENG") }}</iButton
        >
        <iButton
          @click="deleteItem"
          permissionKey="OUTSOURINGORDER_DETAILS_SHULIANG_SHANCHU"
          >{{ $t("LK_SHANCHU") }}</iButton
        >
      </div>
      <tablePart
        ref="multipleTable"
        :lang="true"
        @handleSelectionChange="(row) => (selectRow = row)"
        :tableData="initData"
        :tableTitle="tbledColumns"
        :tableLoading="tableLoading"
        :selection="canEdit"
        class="aotoTableHeight margin-bottom20"
      >
        <template #year="scope">
          <el-date-picker
            :disabled="scope.$index"
            v-if="canEdit"
            v-model="scope.row.year"
            @change="changeYear"
            type="year"
            value-format="yyyy"
            :placeholder="language('QINGXUANZE', '请选择')"
          >
          </el-date-picker>
          <span v-else>{{ scope.row.year }}</span>
        </template>
        <template #quantity="scope">
          <iInput
            v-if="canEdit"
            v-model="scope.row.quantity"
            @input="handleInput($event, scope.row)"
            @blur="changeInput(scope.row, scope.$index)"
            :placeholder="language('QINGSHURU', '请输入')"
          />
          <span v-else>{{ scope.row.quantity }}</span>
        </template>
      </tablePart>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iMessage } from "rise";
import tablePart from "@/components/iTableSort";
import { numberProcessor } from "@/utils";

export default {
  components: {
    iDialog,
    iButton,
    iInput,
    tablePart,
  },
  props: {
    value: { type: Boolean, default: false },
    detailInfo: { type: Object, default: () => {} },
    canEdit: { type: Boolean, default: true, require: true },
    isItem: { type: Boolean, default: false },
  },
  data() {
    return {
      dialogVisible: false,
      tableLoading: false,
      tbledColumns: [
        {
          props: "year",
          name: "年份",
          key: "LK_NIANFEN",
          tooltip: true,
          align: "center",
        },
        {
          props: "quantity",
          name: "数量",
          key: "LK_SHULIANG",
          tooltip: true,
          align: "center",
        },
      ],
      initData: [],
      selectRow: [],
    };
  },

  methods: {
    // 年份修改，重新计算
    changeYear(year) {
      this.initData.forEach((item, i) => {
        item.year = (Number(year) + i).toString();
      });
    },
    // 关闭弹窗
    clearDiolog() {
      this.$emit("input", false);
    },
    saveSapItem() {
      this.$emit("handleSaveDetail", this.initData);
    },
    openOrderPage() {
      this.$emit("openOrderPage", this.detailInfo);
    },
    // 限制输入数值
    handleInput(value, row) {
      this.$set(row, "quantity", numberProcessor(value, 2));
    },

    // 检查输入数字
    changeInput(row, index) {
      let flag = false;
      this.initData.forEach((item, i) => {
        if (item.year < row.year && !+item.quantity) {
          // item.quantity = numberProcessor((+item.quantity || +row.quantity), 2)
          this.$set(row, "quantity", 0);
          flag = true;
        }
      });
      if (flag) {
        iMessage.warn("请填写连续的年计划");
      }
    },
    // 新增项次
    increatment() {
      if (this.initData.length == 15) {
        return iMessage.warn("最多输入15年计划");
      }
      let year = 1 + Number(this.initData[this.initData.length - 1].year);
      this.initData.push({
        year: year.toString(),
        quantity: "",
      });
    },

    // 删除项次
    deleteItem() {
      if (this.selectRow.lengt < 0) return iMessage.warn("请选择删除的项次");
      this.initData = this.initData.filter((i) => !i.selectedBorder);
    },
  },
  watch: {
    value: function (val) {
      if (val) {
        if (
          this.detailInfo.normalPrQuantityYears == null ||
          this.detailInfo.normalPrQuantityYears.length <= 0 ||
          this.detailInfo.normalPrQuantityYears == undefined
        ) {
          const startYear = new Date().getFullYear();
          this.initData = [
            {
              year: startYear,
              quantity: 0,
            },
            {
              year: startYear + 1,
              quantity: 0,
            },
            {
              year: startYear + 2,
              quantity: 0,
            },
            {
              year: startYear + 3,
              quantity: 0,
            },
            {
              year: startYear + 4,
              quantity: 0,
            },
          ];
        } else {
          this.initData = this.detailInfo.normalPrQuantityYears;
        }
        this.initData.map((i) => {
          i.year = i.year.toString();
          return i;
        });
        this.$forceUpdate();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.titlebar {
  display: flex;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;
  > span {
    font-size: 18px;
    font-weight: bold;
  }
}
.item-dialog {
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
  ::v-deep .el-form-item__label {
    width: 150px;
  }

  ::v-deep .el-form--inline .el-form-item {
    display: flex;
  }

  .save-btn {
    position: absolute;
    right: 60px;
    top: -60px;
  }
}

.order-link {
  color: $color-blue;
  cursor: pointer;
}

.openLinkText {
  color: $color-blue;
  cursor: pointer;
}
</style>
