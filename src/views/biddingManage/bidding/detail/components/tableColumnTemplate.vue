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
      :empty-text="$t('LK_ZANWUSHUJU')"
      v-loading="tableLoading"
      @selection-change="handleSelectionChange"
      :row-class-name="handleTableRow"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
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
                @blur="handlerInputBlur($event, scope)"
                :disabled="items.disabled ? items.disabled : false"
              >
              </iInput>
              <iInput
                v-else
                v-model="scope.row[items.props]"
                @blur="handlerInputBlur($event, scope)"
                :disabled="items.disabled ? items.disabled : false"
              >
              </iInput>
            </el-form-item>
          </template>
        </el-table-column>

        <!--输入框-->
        <!-- <el-table-column
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
        </el-table-column> -->

        <!--批量更新年降 输入框-->
        <el-table-column
          :width="items.width"
          :show-overflow-tooltip="items.tooltip"
          :key="index"
          align="center"
          v-if="type === '3' && inputProps.includes(items.props)"
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
                v-model="scope.row[items.props]"
                oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 5):value.slice(0,15)"
                @blur="handleInputOnBlur(scope.row, items.props)"
                :disabled="items.disabled ? items.disabled : false"
              >
                <template slot="suffix">%</template>
              </iInput>
            </el-form-item>
          </template>
        </el-table-column>

        <!--年降计划 输入框-->
        <el-table-column
          :width="items.width"
          :show-overflow-tooltip="items.tooltip"
          :key="index"
          align="center"
          v-if="type === '4' && inputProps.includes(items.props)"
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
              :rules="scope.row['index'] %2 === 0?[dateValidator(scope.row, items.props)]:items.rule ? items.rule : ''"
            >
              <iDatePicker
                v-if="scope.row['index']%2 === 0"
                class="data--picker"
                value-format="yyyy-MM"
                type="month"
                v-model="scope.row[items.props]"
                :clearable="false"
                :editable="false"
                @blur="handlerInputBlur($event, scope)"
                :picker-options="pickerOptions(scope.row, items.props)"
              />
              <iInput
                v-else-if="scope.row['index'] %2 === 1"
                v-model="scope.row[items.props]"
                oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 5):value.slice(0,15)"
                @blur="handlerInputBlur($event, scope)"
                :disabled="items.disabled ? items.disabled : false"
              >
                <template slot="suffix">%</template>
              </iInput>
              
            </el-form-item>
          </template>
        </el-table-column>

        <!--年产量 输入框-->
        <el-table-column
          :width="items.width"
          :show-overflow-tooltip="items.tooltip"
          :key="index"
          align="center"
          v-if="type === '5' && inputProps.includes(items.props)"
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
              :rules="scope.row['index']%2 === 0? items.rule : ''"
            >
              <div v-if="scope.row['index'] === 0">{{scope.row[items.props]}}</div>

              <iInput
                v-else-if="scope.row['index']%2 === 0"
                v-model="scope.row[items.props]"
                placeholder="0.00"
                oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
                @blur="handlerInputBlur($event, scope)"
                :disabled="items.disabled ? items.disabled : false"
              >
              </iInput>
              <iDatePicker
                v-else-if="scope.row['index']%2 === 1"
                class="data--picker"
                format='yyyy'
                value-format="yyyy-MM"
                type="year"
                v-model="scope.row[items.props]"
                :clearable="false"
                :editable="false"
                 @input="handleOutPutInputDate($event, scope)"
                 @blur="handlerInputBlur($event, scope)"
                :picker-options="handleOutPutPickerOptions(scope.row, items.props)"
                :disabled="items.props !== 'stage1'"
              />
            </el-form-item>
          </template>
        </el-table-column>

        <!--复杂输入框-->
        <!-- <el-table-column
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
                    ? [items.rule[0]]
                    : [items.rule[1]]
                  : ''
              "
            >
              <iDatePicker
                v-if="scope.row['index'] % 3 === 0"
                class="data--picker"
                value-format="yyyy-MM"
                type="month"
                v-model="scope.row[items.props]"
                :clearable="false"
                :editable="false"
                @input="handleInputDate($event, scope)"
              />
              <i-input
                v-else-if="(scope.row['index'] + 2) % 3 === 0"
                v-model.number="scope.row[items.props]"
              >
                <template slot="suffix">%</template>
              </i-input>
              <i-input
                v-else-if="(scope.row['index'] + 1) % 3 === 0"
                v-model.number="scope.row[items.props]"
                placeholder="0"
                @input="handleInputNum($event, scope)"
                @blur="blurProcureNum($event, scope)"
              />
            </el-form-item>
          </template>
        </el-table-column> -->
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
    beginMonth: { type: String, default: "" },
    annualOutputObj:{
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    iInput,
    iDatePicker,
  },
  data() {
    return {
      rules: [],
    };
  },
  methods: {
    pickerOptions(row, props) {
      let num = Number(props.slice(5));
      return {
        disabledDate: (time) => {
          if (num === 1) {
            if(this.annualOutputObj[row.index+1][props]){
              return (
                dayjs(time).isBefore(dayjs(this.annualOutputObj[row.index+1][props]).add(1,"month")) 
              );
            }else if(!this.annualOutputObj[row.index+1][props] && this.beginMonth){
              return (
                dayjs(time).isBefore(dayjs(this.beginMonth).add(1,"month")) 
              );
            }
            return;
          }
          let curDate = dayjs(row[`stage${num - 1}`]).add(1, "month");
          return (
            dayjs(time).isBefore(curDate)
          );
        },
      };
    },
    // dateValidator(row, props) {
    //   let num = Number(props.slice(5));
    //   let afterDate = dayjs(row[`stage${num - 1}`]).add(1, "year");
    //   return {
    //     validator(rule, value, callback) {
    //       num === 1
    //         ? callback()
    //         : dayjs(value).isAfter(afterDate)
    //         ? callback(new Error(rule.message))
    //         : callback();
    //     },
    //     message: "排名区间配置错误",
    //     trigger: "blur",
    //   };
    // },
    dateValidator(row, props) {
      let num = Number(props.slice(5));
      let afterDate = dayjs(row[`stage${num - 1}`]);
      let firstDate = dayjs(this.annualOutputObj[row.index+1][props]).add(1, "month");
      return {
        validator(rule, value, callback) {
          num === 1
            ? dayjs(value).isBefore(firstDate)
            ? callback(new Error(rule.message)):callback()
            : dayjs(value).isBefore(afterDate)
            ? callback(new Error(rule.message))
            : callback();
        },
        message: "日期错误",
        trigger: ["blur","change"],
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
    // handleInputNum(val, scope) {
    //   let reg = /^\d+$/;
    //   if (val && !reg.test(val)) {
    //     return;
    //   }
    //   this.$emit("handleInputNum", val, scope);
    // },
    // blurProcureNum(val, scope) {
    //   this.$emit("blurProcureNum", val, scope);
    // },
    // handleInputDate(val, scope) {
    //   this.$emit("handleInputDate", val, scope);
    // },
    handleOutPutInputDate(val, scope) {
      this.$emit("handleOutPutInputDate", val, scope);
    },

    handleOutPutPickerOptions(row,prop){
      return {
        disabledDate: (time) => {
          let curDate = dayjs(this.beginMonth);
          return (
            dayjs(time).isBefore(curDate)
          );
        },
      };
    },
    handleInputOnBlur(row,prop){
      this.$emit('handleInputOnBlur', row,prop);
    },
    handlerInputBlur($event, scope){
      this.$emit('handlerInputBlur');
    }
  },
  
};
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
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
::v-deep .hover-row {
  .el-input__validateIcon {
    display: none;
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
.data--picker {
  ::v-deep .el-picker-panel__icon-btn {
    display: none;
  }
}
</style>