<template>
  <el-form
    :model="{ tableData }"
    status-icon
    :rules="rules"
    ref="commonTableForm"
  >
    <el-table
      :height="height"
      tooltip-effect="light"
      :data="tableData"
      :empty-text="language('LK_ZANWUSHUJU', '暂无数据')"
      v-loading="tableLoading"
      @selection-change="handleSelectionChange"
      :row-class-name="handleTableRow"
      :class="role === 'supplier' ? 'form-item-none' : ''"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="index"
        type="index"
        width="50"
        align="center"
        label="#"
      ></el-table-column>
      <template v-for="(items, index) in tableTitle">
        <!--输入框-->
        <el-table-column
          :width="items.width"
          :show-overflow-tooltip="items.tooltip"
          :key="index"
          align="center"
          v-if="type === '0' && inputProps.includes(items.props)"
          :prop="items.props"
          :label="items.key ? $t(items.key) : items.name"
        >
          <template #header>
            {{ items.key ? $t(items.key) : items.name }}
            <span class="required" v-if="items.required">*</span>
            <el-popover
              trigger="hover"
              :content="
                items.iconTextKey ? $t(items.iconTextKey) : items.iconText
              "
              placement="top-start"
            >
              <icon
                slot="reference"
                symbol
                v-if="items.icon"
                :name="items.icon"
                class="font-size16 marin-left5"
              />
            </el-popover>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + items.props"
              :rules="items.rule ? items.rule : ''"
            >
              <iInput
                v-if="priceProps.includes(items.props)"
                v-model="scope.row[items.props]"
                oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
                :disabled="items.disabled ? items.disabled : false"
              >
              </iInput>
              <iInput
                v-else
                v-model="scope.row[items.props]"
                :disabled="items.disabled ? items.disabled : false"
              >
              </iInput>
            </el-form-item>
          </template>
        </el-table-column>

        <!--输入框-->
        <el-table-column
          :width="items.width"
          :show-overflow-tooltip="items.tooltip"
          :key="index"
          align="center"
          v-if="type === '1' && inputProps.includes(items.props)"
          :prop="items.props"
          :label="items.key ? $t(items.key) : items.name"
        >
          <template #header>
            {{ items.key ? $t(items.key) : items.name }}
            <span class="required" v-if="items.required">*</span>
            <el-popover
              trigger="hover"
              :content="
                items.iconTextKey ? $t(items.iconTextKey) : items.iconText
              "
              placement="top-start"
            >
              <icon
                slot="reference"
                symbol
                v-if="items.icon"
                :name="items.icon"
                class="font-size16 marin-left5"
              />
            </el-popover>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + items.props"
              :rules="items.rule ? items.rule : ''"
            >
              <iInput
                v-if="scope.row['index'] === 0"
                v-model.number="scope.row[items.props]"
                :disabled="items.disabled ? items.disabled : false"
              >
                <template slot="suffix">%</template>
              </iInput>
              <div v-else>{{ scope.row[items.props] }}</div>
            </el-form-item>
          </template>
        </el-table-column>
        <!--复杂输入框-->
        <el-table-column
          :width="items.width"
          :show-overflow-tooltip="items.tooltip"
          :key="index"
          align="center"
          v-else-if="type === '2' && inputProps.includes(items.props)"
          :prop="items.props"
          :label="items.key ? $t(items.key) : items.name"
        >
          <template #header>
            {{ items.key ? $t(items.key) : items.name }}
            <span class="required" v-if="items.required">*</span>
            <el-popover
              trigger="hover"
              :content="
                items.iconTextKey ? $t(items.iconTextKey) : items.iconText
              "
              placement="top-start"
            >
              <icon
                slot="reference"
                symbol
                v-if="items.icon"
                :name="items.icon"
                class="font-size16 marin-left5"
              />
            </el-popover>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + items.props"
              :rules="
                items.rule
                  ? scope.row['index'] % 3 === 0
                    ? [dateValidator(scope.row, items.props)]
                    : (scope.row['index'] + 1) % 3 === 0
                    ? ''
                    : items.rule
                  : ''
              "
            >
              <span v-if="scope.row['index'] % 3 === 0">{{
                scope.row[items.props]
              }}</span>
              <i-input
                v-if="(scope.row['index'] + 2) % 3 === 0"
                v-model.number="scope.row[items.props]"
              >
                <template slot="suffix">%</template>
              </i-input>
              <i-input
                v-else-if="(scope.row['index'] + 1) % 3 === 0"
                v-model.number="scope.row[items.props]"
                placeholder="0"
                @input="handleInputNum($event, scope)"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="items.width"
          :show-overflow-tooltip="items.tooltip"
          :key="index"
          align="center"
          v-else-if="type === '3' && inputProps.includes(items.props)"
          :label="items.key ? $t(items.key) : items.name"
          :prop="items.props"
          :fixed="items.fixed"
        >
          <!--自定义嵌入-->
          <template #header>
            {{ items.key ? $t(items.key) : items.name }}
            <span class="required" v-if="items.required">*</span>
            <el-popover
              trigger="hover"
              :content="
                items.iconTextKey ? $t(items.iconTextKey) : items.iconText
              "
              placement="top-start"
            >
              <icon
                slot="reference"
                symbol
                v-if="items.icon"
                :name="items.icon"
                class="font-size16 marin-left5"
              />
            </el-popover>
          </template>
          <template
            slot-scope="scope"
            v-if="
              scope.row['index'] % 3 === 0 || (scope.row['index'] + 2) % 3 === 0
            "
          >
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + items.props"
              :rules="
                items.rule
                  ? scope.row['index'] % 3 === 0
                    ? [dateValidator(scope.row, items.props)]
                    : (scope.row['index'] + 1) % 3 === 0
                    ? ''
                    : items.rule
                  : ''
              "
            >
              <span>{{ scope.row[items.props] }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <!--纯展示-->
        <el-table-column
          :min-width="items.width"
          :show-overflow-tooltip="items.tooltip"
          :key="index"
          align="center"
          v-else-if="!inputProps.includes(items.props)"
          :label="items.key ? $t(items.key) : items.name"
          :prop="items.props"
          :fixed="items.fixed"
        >
          <!--自定义嵌入-->
          <template #header>
            {{ items.key ? $t(items.key) : items.name }}
            <span class="required" v-if="items.required">*</span>
            <el-popover
              trigger="hover"
              :content="
                items.iconTextKey ? $t(items.iconTextKey) : items.iconText
              "
              placement="top-start"
            >
              <icon
                slot="reference"
                symbol
                v-if="items.icon"
                :name="items.icon"
                class="font-size16 marin-left5"
              />
            </el-popover>
          </template>
          <template
            v-if="$scopedSlots[items.props] || $slots[items.props]"
            v-slot="scope"
          >
            <el-form-item
              :prop="'tableData.' + scope.$index + '.' + items.props"
              :rules="items.rule ? items.rule : ''"
            >
              <slot :name="items.props" :row="scope.row"></slot>
            </el-form-item>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-form>
</template>
<script>
import { iInput, iDatePicker } from "rise";
import dayjs from "dayjs";
export default {
  props: {
    isSupplier: { type: Boolean, default: false },
    type: { type: String },
    tableData: { type: Array },
    tableTitle: { type: Array },
    tableLoading: { type: Boolean, default: false },
    selection: { type: Boolean, default: true },
    index: { type: Boolean, default: false },
    height: { type: Number || String },
    openPageProps: { type: String, default: "" },
    inputProps: {
      type: Array,
      default: () => {
        return [];
      },
    },
    priceProps: {
      type: Array,
      default: () => {
        return [];
      },
    },
    selectProps: {
      type: Array,
      default: () => {
        return [];
      },
    },
    selectPropsOptionsObject: {
      type: Object,
      default: () => {
        return {};
      },
    },
    customOpenPageWord: { type: String, default: "" },
    openPageGetRowData: { type: Boolean, default: false },
    inputType: { type: String, default: "" },
    fileSizeProps: { type: String, default: "fileSize" },
  },
  components: {
    iInput,
    // iDatePicker,
  },
  data() {
    return {
      rules: [],
    };
  },
  computed: {
    role() {
      return this.$route.meta.role;
    },
  },
  methods: {
    pickerOptions(row, props) {
      let num = Number(props.slice(5));
      return {
        disabledDate: (time) => {
          if (num === 1) {
            return;
          }
          let curDate = dayjs(row[`stage${num - 1}`]).add(1, "month");
          let afterDate = dayjs(row[`stage${num - 1}`]).add(1, "year");
          return (
            dayjs(time).isBefore(curDate) || dayjs(time).isAfter(afterDate)
          );
        },
      };
    },
    dateValidator(row, props) {
      let num = Number(props.slice(5));
      let afterDate = dayjs(row[`stage${num - 1}`]).add(1, "year");
      return {
        validator(rule, value, callback) {
          num === 1
            ? callback()
            : dayjs(value).isAfter(afterDate)
            ? callback(new Error(rule.message))
            : callback();
        },
        message: this.language('BIDDING_PMQJPZCW',"排名区间配置错误"),
        trigger: "blur",
      };
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    handleSelectChange(type, val, time) {
      const res = {
        type,
        val,
        time,
      };
      this.$emit("handleSelectChange", res);
    },
    openPage(params) {
      this.$emit("openPage", params);
    },
    handleTableRow(row) {
      row.row.index = row.rowIndex;
    },
    handleInputNum(val, scope) {
      this.$emit("handleInputNum", val, scope);
    },
    handleInputDate(val, scope) {
      this.$emit("handleInputDate", val, scope);
    },
  },
};
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}

/* 隐藏 */
::v-deep .form-item-none .el-table__row:nth-child(3n) {
  display: none;
}
.el-select {
  margin: 2px 0;
}

::v-deep .el-table__row {
  .el-input {
    height: 35px !important;

    .el-input__inner {
      height: 35px !important;
      padding: 0 0.2rem;
    }
    .el-input__validateIcon {
      display: none;
    }
  }
  .is-error {
    .el-input {
      .el-input__inner {
        box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
        border-color: #f56666;
      }
      .el-input__validateIcon {
        display: none;
      }
    }
  }
  .data--picker {
    .el-input__inner {
      padding-left: 1.3rem;
      padding-right: 1.3rem;
    }
    .el-input__icon {
      width: 1rem;
    }
  }
}

.icon {
  color: $color-blue;
}

.required {
  font-size: 14px;
  color: red;
}

.el-form-item {
  margin-top: 1.375rem;
}
</style>