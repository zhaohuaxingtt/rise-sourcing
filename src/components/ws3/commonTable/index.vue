<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-11-06 18:34:01
 * @LastEditors: Please set LastEditors
 * @Description: 通用表格
-->
<template>
  <el-form :model="{tableData}" status-icon :rules="rules" ref="commonTableForm" :class="{ 'formStyle' :ruleLength === 0}">
    <el-table :highlight-current-row="highlightCurrentRow" :height="height" :max-height="maxHeight" :span-method="handleMerge" tooltip-effect='light' :data='tableData' :empty-text="$t('LK_ZANWUSHUJU')" v-loading='tableLoading' @current-change="handleCurrentChange" @selection-change="handleSelectionChange" @row-click="handleClickRow" :row-class-name="handleTableRow"> 
      <el-table-column v-if="selection" type='selection' width="50" align='center' :fixed="fixed"></el-table-column>
      <el-table-column v-if='index' type='index' width='50' align='center' label='#'></el-table-column>
      <template v-for="(items,index) in tableTitle">
        <!-- 点击事件-->
        <el-table-column :key="index" align='center' :width="items.width" :show-overflow-tooltip='items.tooltip' v-if='items.props === openPageProps' :prop="items.props" :label="items.key ? language(items.key,items.name) : items.name" :fixed="items.fixed">
          <template slot-scope="scope">
            <el-form-item>
              <span class="openLinkText cursor linkEllipsis" @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props])">{{
                customOpenPageWord ? customOpenPageWord : scope.row[openPageProps]
                }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <!--输入框-->
        <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="index" align='center' v-else-if='inputProps.includes(items.props)' :prop="items.props" :label="items.key ? language(items.key,items.name) : items.name">
          <template #header>
            {{ items.key ? language(items.key, items.name) : items.name }}
            <span class="required" v-if="items.required">*</span>
            <el-popover trigger="hover" :content="items.iconTextKey ? language(items.iconTextKey,items.iconText) : items.iconText" placement="top-start">
              <icon slot="reference" symbol v-if="items.icon" :name="items.icon" class="font-size16 marin-left5" />
            </el-popover>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : ''">
              <i-input v-model="scope.row[items.props]" v-if="inputType" :type="inputType" :maxlength="items.maxlength ? items.maxlength : 300" />
              <i-input v-model="scope.row[items.props]" v-else :maxlength="items.maxlength ? items.maxlength : 300" />
            </el-form-item>
          </template>
        </el-table-column>
        <!--普通下拉框-->
        <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="index" align='center' v-else-if='selectProps.includes(items.props)' :prop="items.props" :label="items.key ? language(items.key,items.name) : items.name">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : ''">
              <i-select v-model="scope.row[items.props]">
                <el-option v-for="items in selectPropsOptionsObject[items.props]" :key='items.code' :value='customSelectValueKey ? items[customSelectValueKey] : items.code' :label="items.key ? language(items.key,items.name) : items.name" />
              </i-select>
            </el-form-item>
          </template>
        </el-table-column>
        <!--文件大小-->
        <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="index" align='center' v-else-if='items.props === fileSizeProps' :prop="items.props" :label="items.key ? language(items.key,items.name) : items.name">
          <template slot-scope="scope">
            <el-form-item>
              {{ scope.row[items.props] ? scope.row[items.props] / 1024 / 1024 : 0 }}
            </el-form-item>
          </template>
        </el-table-column>
        <!--纯展示-->
        <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="index" align='center' v-else :label="items.key ? language(items.key,items.name) : items.name" :prop="items.props" :fixed="items.fixed">
          <!--自定义嵌入-->
          <template #header>
            <span style="margin-right: 10px;" v-html="items.key ? language(items.key,items.name) : items.name "></span>
            <span class="required" v-if="items.required">*</span>
            <el-popover trigger="hover" :content="items.iconTextKey ? language(items.iconTextKey) : items.iconText" placement="top-start">
              <icon slot="reference" symbol v-if="items.icon" :name="items.icon" class="font-size16 marin-left5" />
            </el-popover>
          </template>
          <template v-if="$scopedSlots[items.props] || $slots[items.props]" v-slot="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : ''">
              <slot :name="items.props" :row="scope.row"></slot>
            </el-form-item>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-form>
</template>
<script>
import { iInput, iSelect, icon } from 'rise';

export default {
  props: {
    tableData: { type: Array },
    tableTitle: { type: Array },
    tableLoading: { type: Boolean, default: false },
    selection: { type: Boolean, default: true },
    index: { type: Boolean, default: false },
    height: { type: Number || String },
    maxHeight: { type: Number || String },
    openPageProps: { type: String, default: '' },
    inputProps: {
      type: Array, default: () => {
        return [];
      },
    },
    selectProps: {
      type: Array, default: () => {
        return [];
      },
    },
    selectPropsOptionsObject: {
      type: Object, default: () => {
        return {};
      },
    },
    customSelectValueKey: { type: String, default: '' },
    customOpenPageWord: { type: String, default: '' },
    openPageGetRowData: { type: Boolean, default: false },
    inputType: { type: String, default: '' },
    fileSizeProps: { type: String, default: 'fileSize' },
    mergeValue: { type: String, default: '' },
    fixed: { type: Boolean, default: false },
    highlightCurrentRow: { type: Boolean, default: false }
  },
  components: {
    iInput,
    iSelect,
    icon,
  },
  computed: {
    ruleLength() {
      const ruleList = this.tableTitle.filter(item => {
        return item.rule;
      });
      return ruleList.length;
    },
  },
  data() {
    return {
      rules: [],
    };
  },
  created(){
  },
  methods: {
    handleMerge({ row, column, rowIndex, columnIndex }) {
      // 判断需不需要合并
      if (this.mergeValue === 'pkpiTable1') {
        if ((columnIndex === 1 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6) &&
          rowIndex === 14) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        }
      }
      if (this.mergeValue === 'furtherRatingCard') {
        if (columnIndex === 1) {
          return [1, 3];
        }
      }
    },
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val);
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val);
    },
    handleClickRow(row, column, event) {
      this.$emit('handleClickRow', row, column, event);
    },
    handleSelectChange(type, val, time) {
      const res = {
        type,
        val,
        time,
      };
      this.$emit('handleSelectChange', res);
    },
    openPage(params) {
      this.$emit('openPage', params);
    },
    handleTableRow(row) {
      row.row.index = row.rowIndex;
    },
  },
};
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}

.linkEllipsis {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-select {
  margin: 2px 0;
}

::v-deep .el-table__row .el-input {
  height: 35px !important;

  .el-input__inner {
    height: 35px !important;
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

.formStyle ::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
