<!--
 * @Author: your name
 * @Date: 2021-06-21 11:38:57
 * @LastEditTime: 2021-09-08 15:01:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails\table1.vue
-->
<template>
  <div>
    <el-table ref="treeList"
              :data="tableList.element"
              :tree-props="{ hasChildren: 'hasChildren', children: 'child' }"
              :row-key="getRowKey"
              :expand-row-keys="expends"
              v-loading="loading"
              stripe
              border
              :max-height="maxHeight"
              :cell-style="cellsytle"
              :row-style="rowStyle"
              @selection-change="handleSelectionChange"
              @row-click="rowClick"
              @row-dblclick="rowDblclick"
              @cell-dblclick="cellBbClick"
              @cell-click="cellClick"
              @expand-change="expandChange">
      <!-- <el-table-column label="" prop="title" width="200"> </el-table-column> -->
      <el-table-column v-for="i in tableList.title"
                       :key="i.index"
                       :label="i.title"
                       :prop="i.label"
                       :align="i.label=='title'?'left':'center'"
                       :width="duration(i)"
                       show-overflow-tooltip
                       :render-header="renderHeader">
        <template slot-scope="scope">
          <span v-if="testing(scope.row[i.label])"
                class="scopeBox">
            <span v-for="(item,index) in scope.row[i.label]"
                  :key="index"
                  class="flexSpan">
              <span v-if="item==minText(scope.row)&&bobType==='Best of Best'"
                    class=" minText">
                {{ item}}
              </span>
              <span v-else-if="item==sendText(scope.row)&&bobType==='Best of Second'"
                    class=" minText">
                {{ item}}
              </span>
              <span v-else-if="item=='true'||item=='false'">{{ item=='false'?'否':'是' }}</span>
              <span v-else>{{ item }}</span>
            </span>
          </span>
          <span v-else-if="scope.row[i.label]==minText(scope.row)&&bobType==='Best of Best'"
                class=" minText">
            {{ scope.row[i.label]}}
          </span>
          <span v-else-if="scope.row[i.label]==sendText(scope.row)&&bobType==='Best of Second'"
                class=" minText">
            {{ scope.row[i.label]}}
          </span>
          <span v-else
                class="flex-center">
            <span v-if="scope.row[i.label]=='true'||scope.row[i.label]=='false'">{{ scope.row[i.label]=='false'?'否':'是' }}</span>
            <span v-else>{{ scope.row[i.label] }}</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addParamToUrl } from 'util';
export default {
  props: {
    expends: {
      type: Array,
      default: function () {
        return [];
      },
    },
    tableList: {
      type: Object,
      default: function () {
        return {};
      },
    },
    supplierList: {
      type: Array,
      default: () => []
    },
    partList: {
      type: Array,
      default: () => []
    },
    bobType: {
      type: String,
      default: ""
    },
    heightFlag: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    testing (val) {
      return function (val) {
        if (val instanceof Array) {
          return true;
        }
      };
    },
    minText () {
      return function (val) {
        let min
        if (val.level === 1 || val.level === 2) {
          const numOfCols = Object.keys(val).filter((key) => {
            return key.indexOf("label#") >= 0
          })
          const dataArr = []
          numOfCols.forEach((colNum) => {
            if (val[colNum] instanceof Array) {
              dataArr.push(parseFloat(this.min(val[colNum])))
            } else {
              dataArr.push(parseFloat(val[colNum]))
            }
          })
          min = this.min(dataArr)
        }
        return min
      }
    },
    sendText () {
      return function (val) {
        let min
        if (val.level === 1 || val.level === 2) {
          const numOfCols = Object.keys(val).filter((key) => {
            return key.indexOf("label#") >= 0
          })
          const dataArr = []
          numOfCols.forEach((colNum) => {
            if (val[colNum] instanceof Array) {
              dataArr.push(val[colNum])
            } else {
              dataArr.push(parseFloat(val[colNum]))
            }
          })
          let dataArr1 = _.flatten(dataArr)
          min = this.bos(dataArr1)
        }
        return min
      }
    },
    duration () {
      return function (i) {
        let result = this.getTreeExpandKeys(this.tableList.element, i.label)
        return result
      }
    }
  },
  watch: {
    expends: {
      handler (val) {
      },
    },
    bobType: {
      handler (val) {
      },
      immediate: true
    },
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll, true)
  },
  data () {
    return {
      checkList: [],
      hasChildren: true,
      min: window._.min,
      max: window._.max,
    };
  },
  methods: {
    getTreeExpandKeys (data, i) {
      if (i == 'title') { return "227px" }
      let datalength = 0
      data.forEach(item => {
        let obj = item.child[0][i]
        let len = obj instanceof Array ? obj.length : 1
        datalength = len > datalength ? len : datalength
      })
      return datalength * 120 + 'px'
    },
    renderHeader (h, { column }) {
      let header = column.label.split('<br/>');
      return [h('p', [
        h('p', {}, header[0]),
        h('span', {}, header[1])
      ])];
    },
    //筛选第二
    bos (arr) {
      const min = this.min(arr);
      let send = this.max(arr);
      arr.forEach((i) => {
        if (i > min) {
          if (i < send) {
            send = i;
          }
        }
      });
      return send;
    },
    cellsytle ({ row, column, rowIndex, columnIndex }) {
      let styleJson = {}
      if (row.title == "原材料/散件" || row.title == '制造费' || row.title == '报废成本' || row.title == '管理费' || row.title == '其他费用' || row.title == '利润') {
        // return "font-weight: bold"
        styleJson = {
          "font-weight": "bold"
        }
      }
      return styleJson
    },
    rowStyle ({ row, rowIndex }) {
      let styleJson
      if (row.level === 1 || row.level === 2) {
        styleJson = {
          'background': 'rgb(231 239 255) !important'
        }
        return styleJson
      }
    },
    close () {
      if (this.tableList.element.length != 0) {
        this.flag = true;
        this.flag1 = false;
        const elsopen = this.$el.getElementsByClassName(
          "el-table__expand-icon--expanded"
        );
        if (
          this.$el.getElementsByClassName("el-table__expand-icon--expanded")
        ) {
          for (let i = 0; i < elsopen.length; i++) {
            elsopen[i].click();
          }
        }
      }
    },
    //                                                                                                                                              ````````````````````                                   
    getRowKey (row) {
      return row.index.toString();
    },
    render (h, { column, $index }) { },
    rowClick (row, event, column) {
      this.$emit("row-click", row, event, column);
    },

    cellClick (row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    // 格子双击事件
    cellBbClick (row, column, cell, event) {
      this.$emit("cell-dblclick", row, column, cell, event);
    },
    // 行双击事件
    rowDblclick (row, enent) {
      this.$emit("row-dblclick", row, enent);
    },
    // 行单击事件
    handleSelectionChange (val) {
      this.$emit("selection-change", val);
    },
    expandChange (row, expanded) {
      if (expanded.length > 0) {
        this.$emit("expand-change", row, expanded);
      }

    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table .el-table__body-wrapper {
  height: auto;
}

::v-deep .el-table tr:nth-child(even) {
  background-color: #fff;
}

// ::v-deep.el-table__body-wrapper.el-table__row.el-table__row--level-0
//   .el-table__row
//   .el-table__row--level-1 {
//   background: #e7efff !important;
// }
::v-deep.el-table__body-wrapper tbody {
  transform: scaleY(-1);
}
::v-deep.el-table__empty-text {
  transform: scaleY(-1);
}
</style>
<style lang="scss">
.addcss {
  color: red;
}
.nocolor {
  border: none;
}
.top {
  border: 1px solid blue;
  border-bottom: none;
}
.middle {
  border: 1px solid blue;
  border-bottom: none;
  border-top: none;
}
.bottom {
  border: 1px solid blue;
  border-top: none;
}
.scopeBox {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
}
.flexSpan {
  width: 120px;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.minText {
  color: #00c1b9;
}
</style>
