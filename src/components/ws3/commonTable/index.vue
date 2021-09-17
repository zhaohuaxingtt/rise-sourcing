<!--
 * @Author: yourname
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-09-16 10:35:06
 * @LastEditors: Please set LastEditors
 * @Description: 通用表格
-->
<template>
  <el-form :model="{tableData}"
           status-icon
           :rules="rules"
           :class="{ 'formStyle' :ruleLength === 0}"
           ref="commonTableForm">
    <el-table :height="height"
              :max-height="maxHeight"
              ref="dataTable"
              :span-method="handleMerge"
              tooltip-effect='light'
              :data='tableData'
              :empty-text="$t('LK_ZANWUSHUJU')"
              v-loading='tableLoading'
              highlight-current-row
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              :row-class-name="handleTableRow"
              :row-key="rowKey"
              :tree-props="{children: treeProps}"
              @select="rowSelect"
              @select-all="selectAll">
      <el-table-column v-if="selection"
                       type='selection'
                       width="50"
                       align='center'></el-table-column>
      <el-table-column v-if='index'
                       type='index'
                       width='50'
                       align='center'
                       label='#'
                       :index="indexMethod"></el-table-column>
      <template v-for="(items,index) in tableTitle">
        <!-- 点击事件-->
        <el-table-column :key="index"
                         align='center'
                         :width="items.width"
                         :show-overflow-tooltip='items.tooltip'
                         v-if='items.props === openPageProps'
                         :prop="items.props"
                         :label="items.key ? language(items.key, items.name) : items.name"
                         :fixed="items.fixed">
          <template slot-scope="scope">
            <el-form-item>
              <span class="openLinkText cursor linkEllipsis"
                    @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props])">{{
                customOpenPageWord ? customOpenPageWord : scope.row[openPageProps]
              }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <!--输入框-->
        <el-table-column :width="items.width"
                         :show-overflow-tooltip='items.tooltip'
                         :key="index"
                         align='center'
                         v-else-if='inputProps.includes(items.props)'
                         :prop="items.props"
                         :label="items.key ? language(items.key, items.name) : items.name">
          <template #header>
            {{ items.key ? language(items.key, items.name) : items.name }}
            <span class="required"
                  v-if="items.required">*</span>
            <el-popover trigger="hover"
                        :content="items.iconTextKey ? language(items.iconTextKey, items.iconText) : items.iconText"
                        placement="top-start">
              <icon slot="reference"
                    symbol
                    v-if="items.icon"
                    :name="items.icon"
                    class="font-size16 marin-left5" />
            </el-popover>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props"
                          :rules="items.rule ? items.rule : ''">
              <i-input v-model="scope.row[items.props]"
                       v-if="inputType"
                       :type="inputType"
                       :maxlength="items.maxlength ? items.maxlength : 300" />
              <i-input v-model="scope.row[items.props]"
                       v-else
                       :maxlength="items.maxlength ? items.maxlength : 300" />
            </el-form-item>
          </template>
        </el-table-column>
        <!--普通下拉框-->
        <el-table-column :width="items.width"
                         :show-overflow-tooltip='items.tooltip'
                         :key="index"
                         align='center'
                         v-else-if='selectProps.includes(items.props)'
                         :prop="items.props"
                         :label="items.key ? language(items.key, items.name) : items.name">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props"
                          :rules="items.rule ? items.rule : ''">
              <i-select v-model="scope.row[items.props]">
                <el-option v-for="items in selectPropsOptionsObject[items.props]"
                           :key='items.code'
                           :value='customSelectValueKey ? items[customSelectValueKey] : items.code'
                           :label="items.key ? language(items.key, items.name) : items.name" />
              </i-select>
            </el-form-item>
          </template>
        </el-table-column>
        <!--文件大小-->
        <el-table-column :width="items.width"
                         :show-overflow-tooltip='items.tooltip'
                         :key="index"
                         align='center'
                         v-else-if='items.props === fileSizeProps'
                         :prop="items.props"
                         :label="items.key ? language(items.key, items.name) : items.name">
          <template slot-scope="scope">
            <el-form-item>
              {{ scope.row[items.props] ? scope.row[items.props] / 1024 / 1024 : 0 }}
            </el-form-item>
          </template>
        </el-table-column>
        <!--纯展示-->
        <el-table-column :width="items.width"
                         :show-overflow-tooltip='items.tooltip'
                         :key="index"
                         align='center'
                         v-else
                         :label="items.key ? language(items.key, items.name) : items.name"
                         :prop="items.props"
                         :fixed="items.fixed">
          <!--自定义嵌入-->
          <template #header>
            {{ items.key ? language(items.key, items.name) : items.name }}
            <span class="required"
                  v-if="items.required">*</span>
            <el-popover trigger="hover"
                        :content="items.iconTextKey ? language(items.iconTextKey, items.iconText) : items.iconText"
                        placement="top-start">
              <icon slot="reference"
                    symbol
                    v-if="items.icon"
                    :name="items.icon"
                    class="font-size16 marin-left5" />
            </el-popover>
          </template>
          <template v-if="$scopedSlots[items.props] || $slots[items.props]"
                    v-slot="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props"
                          :rules="items.rule ? items.rule : ''">
              <slot :name="items.props"
                    :row="scope.row"></slot>
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
    tiledTableData: { type: Array },
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
    customIndex: { type: Number, default: 0 },
    treeTable: { type: Boolean, default: false },
    treeProps: { type: String, default: 'children' },
    rowKey: { type: String, default: 'id' },
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
  data () {
    return {
      rules: [],
    };
  },
  methods: {
    handleMerge ({ row, column, rowIndex, columnIndex }) {
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
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val);
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val);
    },
    handleSelectChange (type, val, time) {
      const res = {
        type,
        val,
        time,
      };
      this.$emit('handleSelectChange', res);
    },
    openPage (params) {
      this.$emit('openPage', params);
    },
    handleTableRow (row) {
      row.row.index = row.rowIndex;
    },
    indexMethod (index) {
      if (this.treeTable) {
        return this.tiledTableData[index].treeIndex;
      } else {
        return index + 1 + this.customIndex;
      }
    },
    rowSelect (selection, row) {
      if (row.fileList) { //只对有子节点的行响应
        if (!row.isChecked) {   //由行数据中的元素isChecked判断当前是否被选中
          row.fileList.map((item) => { //遍历所有子节点
            this.$refs.dataTable.toggleRowSelection(item, true); //切换该子节点选中状态
            /*
            方法名                    说明                                      参数
                                 用于多选表格，切换某一行的选中状态，         row, selected
            toggleRowSelection   如果使用了第二个参数，则是设置这一行
                                 选中与否（selected 为 true 则选中）
             */
            item.isChecked = true;
          });
          row.isChecked = true; //当前行isChecked标志元素切换为false
        } else {
          row.fileList.map((item) => {
            this.$refs.dataTable.toggleRowSelection(item, false);
            item.isChecked = false;
          });
          row.isChecked = false;
        }
        // console.log(this.multipleSelection, row);
      }
      this.$emit('select', selection, row)
    },
    selectAll (selection) {
      // selection 是选中的数据集合
      this.$refs.dataTable.data.map((items) => { //使用$ref获取注册的子组件信息，用data获取所有行，并用map函数遍历行
        if (items.fileList) {
          if (!items.isChecked) { //若遍历出来的行未选中
            this.$refs.dataTable.toggleRowSelection(items, true); //行变为选中状态
            items.isChecked = true; //更新标志参数
            items.fileList.map((item) => { //遍历子节点并改变状态与标志参数
              this.$refs.dataTable.toggleRowSelection(item, true);
              item.isChecked = true;
            });
          } else { //选中状态同理
            this.$refs.dataTable.toggleRowSelection(items, false);
            items.isChecked = false;
            items.fileList.map((item) => {
              this.$refs.dataTable.toggleRowSelection(item, false);
              item.isChecked = false;
            });
          }
        }
        else {
          if (!items.isChecked) items.isChecked = true;
          else items.isChecked = false;
        }
      });
      // console.log(this.orgs)
    }
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
