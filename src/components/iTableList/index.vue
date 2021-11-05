<!--
 * @Author: lyujiahong
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-09-07 16:50:20
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收-table组件。
 * @FilePath: \front-web\src\components\iTableList\index.vue
-->
<template>
  <div class="tableContent">
    <iSelect v-if="filterTable"
             class="chooseCol"
             :placeholder="$t('partsprocure.PLEENTER')"
             v-model="chooseCol"
             @change="changeCol"
             collapse-tags
             filterable
             multiple>
      <el-option :value="item.props"
                 :label="$t(item.key)"
                 v-for="(item, index) in tableTitle"
                 :key="index"></el-option>
    </iSelect>
    <el-table tooltip-effect="light"
              :height="height"
              :data="tableData"
              v-loading="tableLoading"
              @selection-change="handleSelectionChange"
              :empty-text="$t('LK_ZANWUSHUJU')"
              ref="moviesTable"
              :class="radio && 'radio'"
              :show-summary="showSummary"
              :summary-method="getSummaries"
              :row-class-name="tableRowClassName"
              @cell-mouse-leave="cellMouseLeave"
              @cell-mouse-enter="cellMouseEnter"
              @select="handleSelect"
              @select-all="handleSelectAll"
              :cell-style="borderLeft">
      <el-table-column v-if="selection"
                       type="selection"
                       :width="selectionWidth"
                       align="center"></el-table-column>
      <el-table-column v-if="typeIndex"
                       type="index"
                       align="center"
                       label="序号"
                       width="50">
      </el-table-column>
      <template v-for="(items, index) in tableTitle">
        <el-table-column :key="index"
                         align="center"
                         :show-overflow-tooltip="items.tooltip"
                         v-if="items.props == activeItems"
                         :prop="items.props"
                         :label="items.key?language(items.key,items.name):items.name"
                         :min-width="items.minWidth"
                         :width="items.width">
          <template slot-scope="row">
            <span class="flexRow">
              <span class="openLinkText cursor "
                    @click="openPage(row.row)"> {{ row.row[activeItems] }}</span>
              <span v-if="row.row[activeItems]"
                    class="icon-gray  cursor "
                    @click="openPage(row.row)">
                <icon symbol
                      class="show"
                      name="icontiaozhuananniu" />
                <icon symbol
                      class="active"
                      name="icontiaozhuanxuanzhongzhuangtai" />
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column :key="index"
                         align="center"
                         :show-overflow-tooltip="items.tooltip"
                         v-else-if="items.props == 'tpInfoType'"
                         :label="items.key?language(items.key,items.name):items.name"
                         :prop="items.props"
                         :min-width="items.minWidth"
                         :width="items.width">
          <template slot-scope="scope">
            <span>{{
              translateData("tp_info_type", scope.row[items.props])
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :key="index"
                         align="center"
                         :show-overflow-tooltip="items.tooltip"
                         v-else
                         :label="items.key?language(items.key,items.name):items.name"
                         :prop="items.props"
                         :min-width="items.minWidth"
                         :width="items.width">
          <template slot="header"
                    slot-scope=""
                    v-if="titlePopover">
            <Popover v-if="items.name !== '定点金额-SVW'"
                     placement="bottom-start"
                     :content="$t(items.key)"
                     trigger="hover">
              <div slot="reference"
                   class="tableHeader">
                {{ $t(items.key) }}
                <span v-if="items.isStar" style="color: red;font-size: 18px;font-weight: normal;">*</span>
              </div>
            </Popover>
            <Popover v-else
                     placement="bottom-start"
                     content="定点金额-SVW = 系统内该车型包中所有车型项目的common sourcing零件已定点金额汇总"
                     trigger="hover">
              <div slot="reference"
                   class="tableHeader">
                {{ $t(items.key) }}
                <icon symbol
                      name="iconxinxitishi"></icon>
              </div>
            </Popover>
          </template>
          <template slot="header"
                    slot-scope=""
                    v-else>
            <div>{{ $t(items.key) }}</div>
          </template>
          <template v-if="$scopedSlots[items.props] || $slots[items.props]"
                    v-slot="scope">
            <slot :name="items.props"
                  :row="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { Popover } from "element-ui"
import { iSelect, icon } from "rise"
import { cloneDeep } from 'lodash'

export default {
  props: {
    tableData: { type: Array },
    tableTitle: { type: Array },
    tableLoading: { type: Boolean, default: false },
    selection: { type: Boolean, default: true },
    typeIndex: { type: Boolean, default: false },
    index: { type: Boolean, default: false },
    indexLabel: { type: String, default: "#" },
    selectionWidth: { type: String, default: "50" },
    height: { type: Number || String },
    activeItems: { type: String, default: "b" },
    radio: { type: Boolean, default: false }, // 是否单选
    showSummary: { type: Boolean, default: false }, //  是否显示总结行
    filterTable: { type: Boolean, default: false }, //  是否筛选列
    titlePopover: { type: Boolean, default: true }, //  表头是否省略加popover
    getSummaries: { type: Function },
    tableRowClassName: { type: Function },
  },
  inject: ["vm"],
  components: {
    Popover,
    iSelect,
    icon,
  },
  data () {
    return {
      chooseCol: [],
      // tableTitleTemp: cloneDeep(this.tableTitle),
      tableTitleTemp: [],
      multipleSelection: []
    }
  },
  mounted () {

    this.multipleSelection = JSON.parse(localStorage.getItem('checkList'))
    if (this.multipleSelection) {
      this.$nextTick(() => {
        this.multipleSelection.forEach(i => {
          console.log(this.$refs.moviesTable)
          this.$refs.moviesTable.toggleRowSelection(i, true)
        })
      });
    }

    if (this.filterTable) {
      this.initChoose()
    }
  },
  methods: {
    initChoose () {
      this.chooseCol = this.tableTitle.map(item => item.props)
    },
    changeCol (val) {
      let tableTitleTemp = []
      this.tableTitle.map(item => {
        if (val.includes(item.props)) {
          tableTitleTemp.push(item)
        }
      })
      this.tableTitleTemp = tableTitleTemp
    },
    handleSelectionChange (val) {
      if (this.radio) {
        if (val.length > 1) {
          //取出最后val的最后一个返回出来
          var duoxuans = val.pop();
          this.handleSelectArr = val.pop();
          //清除所有选中
          this.$refs.moviesTable.clearSelection();
          //给最后一个加上选中
          this.$refs.moviesTable.toggleRowSelection(duoxuans);
        } else {
          this.$emit("handleSelectionChange", val);
        }
      } else {
        this.multipleSelection = val
        localStorage.setItem('checkList', JSON.stringify(val))
        this.$emit("handleSelectionChange", val);
      }
    },
    openPage (e) {
      this.$emit("openPage", e);
    },
    translateData (key, row) {
      try {
        return this.vm.getGroupList(key).find((i) => i.key == row).value;
      } catch (error) {
        return "";
      }
    },
    cellMouseLeave () {
      this.$emit("cellMouseLeave");
    },
    cellMouseEnter (row) {
      this.$emit("cellMouseEnter", row);
    },
    // handleSelect (selection, row) {
    //   const selectdBorder = row.selectedBorder
    //   this.$set(row, 'selectedBorder', !selectdBorder)
    // },
    handleSelectAll (selection) {
      const flag = selection.length
      for (let i = 0; i < flag; i++) {
        this.$set(selection[i], 'selectedBorder', !!flag)
      }
      !flag ? this.tableData.forEach(i => { i.selectedBorder = !i.selectedBorder }) : ''
    },
    borderLeft ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && row.selectedBorder === true) {
        return "border-left:2px solid #1660F1;"
      }
      else {
        return ""
      }
    }
  },
};
</script>
<style lang='scss' scoped>
.tableContent {
  //position: relative;
  .chooseCol {
    width: 330px;
    position: absolute;
    top: -55px;
  }
}
.tableHeader {
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.openLinkText {
  color: $color-blue;
}
.radio {
  ::v-deep thead .el-table-column--selection .cell {
    display: none;
  }
  .icon-gray {
    cursor: pointer;
    .active {
      display: none;
    }
    .show {
      display: block;
    }
  }
  .flexRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon-gray:hover {
    cursor: pointer;
    .show {
      display: none;
    }
    .active {
      display: block;
    }
  }
}
</style>