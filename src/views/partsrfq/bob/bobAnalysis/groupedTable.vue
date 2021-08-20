<!--
 * @Author: your name
 * @Date: 2021-06-21 11:38:57
 * @LastEditTime: 2021-08-19 16:38:43
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
              stripe
              v-loading="loading"
              :max-height="maxHeight"
              :cell-style="cellsytle"
              :row-style="rowStyle"
              @selection-change="handleSelectionChange"
              @row-click="rowClick"
              @row-dblclick="rowDblclick"
              @cell-dblclick="cellBbClick"
              @cell-click="cellClick"
              @expand-change="expandChange">
      <el-table-column key="id"
                       label=""
                       prop="title"
                       align="left"
                       width="200"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.isFresh"
               style="display:inline-block">
            <el-input v-model="scope.row.title"
                      style="width:100px;margin-right:10px"></el-input>
            <i class="el-icon-check"
               @click="sure(scope)"></i>
            <!-- <i class="el-icon-close"></i> -->
          </div>
          <div v-else-if="scope.row.isFresh===false"
               class="editBox">
            <span style="max-width: 100px">
              {{scope.row.title}}
            </span>
            <i class="el-icon-edit "
               style="line-height:18px"
               @click="edit(scope)"></i>
          </div>
          <span v-else>
            {{scope.row.title}}
          </span>

        </template>
      </el-table-column>
      <!-- <el-table-column label="" prop="title" width="250"> </el-table-column> -->
      <el-table-column v-for="i in tableList.title"
                       :key="i.id"
                       :label="i.title"
                       :prop="i.label"
                       align="center"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.checkRow&&scope.row.level===2&&scope.column.label">
            <el-checkbox @change="check=>checkChang(check,scope,i.label)"></el-checkbox>
          </div>
          <span v-else>
            <span class="flexSpan"
                  v-if="scope.row[i.label]=='true'||scope.row[i.label]=='false'">{{ scope.row[i.label]=='false'?'否':'是' }}</span>
            <span class="flexSpan"
                  v-else>{{ scope.row[i.label] }}</span>
            <span class="flexSpan"
                  v-show="scope.row.code!=='detailId'">
            </span>
            <!-- {{scope.row[i.label]}} -->
          </span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import {
  chargeRetrieve,
  renameComponentGroup
} from "@/api/partsrfq/bob";

import { filterEmptyChildren } from '@/utils'
import { iMessage } from 'rise';
export default {
  props: {
    expends: {
      type: Array,
      default: function () {
        return [];
      },
    },

    // tableList: {
    //   type: Object,
    //   default: function () {
    //     return {};
    //   },
    // },
  },
  computed: {
    testing (val) {
      return function (val) {
        if (val instanceof Array) {
          return true;
        }
      };
    },
  },
  watch: {
    expends: {
      handler (val) {
        if (val.length === 0)
          this.$refs.treeList.expandRowKeys = Array.from(val);
      },
    },
    activeName: {
      handler (val) {
        console.log(val)
        if (val === 'rawGrouped') {
          this.chargeRetrieve({
            isDefault: true,
            viewType: 'rawGrouped',
            schemaId: this.SchemeId,
            groupId: this.groupId
          })
        } else {
          this.chargeRetrieve({
            isDefault: true,
            viewType: 'maGrouped',
            schemaId: this.SchemeId,
            groupId: this.groupId
          })
        }
      },
    }
  },
  data () {
    return {
      checkList: [],
      tableList: {},
      SchemeId: "",
      usercheckedColumnIndex: [],
      checkedIds: [8],
      checkLists: [],
      activeName: "",
      cloneDeep: window._.cloneDeep,
      tableList1: []
    };
  },
  created () {
    this.newBuild = this.$route.query.newBuild;
    this.entryStatus = this.$store.state.rfq.entryStatus
    if (this.newBuild && this.entryStatus === 0) {
      this.SchemeId = this.$store.state.rfq.SchemeId;
    } else {
      this.SchemeId = this.$attrs.analysisSchemeId;
    }
    this.groupId = this.$route.query.groupId
    this.$nextTick(() => {
      this.chargeRetrieve({
        isDefault: true,
        viewType: 'rawGrouped',
        schemaId: this.SchemeId,
        groupId: this.groupId
      });
    });

  },
  mounted () {
    this.$EventBus.$on("activeName", res => {
      this.activeName = res
    })
  },
  methods: {
    open () {
      let els = this.$el.getElementsByClassName("el-table__expand-icon");
      if (els) {
        if (this.tableList.element.length != 0 && els.length != 0) {
          this.flag = false;
          this.flag1 = true;
          for (let j1 = 0; j1 < els.length; j1++) {
            els[j1].classList.add("dafult");
          }
          if (
            this.$el.getElementsByClassName("el-table__expand-icon--expanded")
          ) {
            const open = this.$el.getElementsByClassName(
              "el-table__expand-icon--expanded"
            );
            for (let j = 0; j < open.length; j++) {
              open[j].classList.remove("dafult");
            }
            const dafult = this.$el.getElementsByClassName("dafult");
            for (let a = 0; a < dafult.length; a++) {
              dafult[a].click();
            }
          }
        }
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

    cellFunction ({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
    },
    rowStyle ({ row, rowIndex }) {
      let styleJson
      if (row.level === 1 || row.level === 2) {
        styleJson = {
          'background': 'rgb(231 239 255) !important'
        }
      } else if (row.code === 'detailId') {
        styleJson = {
          display: 'none'
        }
      }
      return styleJson
    },
    //获取表格数据
    chargeRetrieve (params) {
      chargeRetrieve(params)
        .then((res) => {
          this.tableList = res;
          this.tableList.title.shift()
          this.tableList.element = this.arrayTreeSetLevel(this.tableList.element)
          // this.tableList.title.forEach(value => {
          //   this.$attrs.supplierList.forEach(i => {
          //     if (value.title == i.supplierId) {
          //       value.title = i.shortNameZh
          //     }
          //   })
          // })
          console.log('----------------', this.tableList.element)
          // this.tableList1.element = this.cloneDeep(this.tableList.element)
          // filterEmptyChildren(this.tableList1.element, 'detailId')
          this.$nextTick(() => {
            this.open();
          });
        })
        .catch((err) => { });
    },

    arrayTreeSetLevel (array, levelName = 'level', childrenName = 'child') {
      if (!Array.isArray(array)) return []
      this.recursiveArray(array)
      return array;
    },

    sure (scope) {
      renameComponentGroup({
        groupId: scope.row.matchId,
        groupName: scope.row.title,
        schemaId: this.SchemeId
      }).then(res => {
        console.log(res)
        if (res.code === '200') {
          iMessage.success('修改成功')
          if (!this.activeName) {
            this.activeName = "rawGrouped"
          } else {
            this.activeName = "maGrouped"
          }
          // this.chargeRetrieve({
          //   isDefault: true,
          //   viewType: this.activeName,
          //   schemaId: this.SchemeId
          // })
        } else {
          iMessage.error('修改失败')
        }
      }).catch((error) => {
        iMessage.error('修改失败')
      })
    },


    edit (scope) {
      scope.row.isFresh = true
    },

    recursiveArray (parentObj, level) {

      if (!level) level = 0;
      level++
      if (level === 2) {
        let addDatas = {}
        parentObj.child.forEach((value, index) => {
          value.level = level
          const numOfCols = Object.keys(value).filter((key) => {
            return key.indexOf("label#") >= 0
          })
          const checkboxRow = { index: Math.random(), checkRow: true, level, title: "", checkIndex: value.index, checked: false }
          numOfCols.forEach((colNum) => {
            checkboxRow[colNum] = ""
          })
          addDatas[index] = checkboxRow;
        })
        const allInsertPoint = Object.keys(addDatas)
        for (var i = allInsertPoint.length - 1; i >= 0; i--) {
          parentObj.child.splice(allInsertPoint[i], 0, addDatas[allInsertPoint[i]])
        }
        addDatas = {}
      } else {
        if (parentObj && parentObj.length) {
          parentObj.forEach((child, index) => {
            child.level = level
            this.recursiveArray(child, level)
          })
        }
      }
    },
    getRowKey (row) {
      return row.index;
    },
    checkChang (flag, scope, labelIndex) {
      Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      if (flag) {
        this.usercheckedColumnIndex.push(parseInt(labelIndex.split("#")[1]) + 1)
      } else {
        this.usercheckedColumnIndex.remove(parseInt(labelIndex.split("#")[1]) + 1)
      }
      const selectedIndex = scope.row.checkIndex
      let newArr = this.tableList.element[0].child.map((value, index) => {
        if (selectedIndex == value.index) {
          if (this.usercheckedColumnIndex.length === 0) {
            value.checked = false
          } else {
            value.checked = true
          }
          if (value.child && value.child.length) {
            this.recursiveChildChecked(value.child, flag)
          }
        }
        return value
      })
      if (flag) {
        this.checkLists.push(newArr[1].child[0][labelIndex])
      } else {
        this.checkLists.remove(newArr[1].child[0][labelIndex])
      }
      console.log(this.checkLists)
      this.$set(this.tableList.element[0], 'child', newArr);

    },
    recursiveChildChecked (parentObj, checked) {
      parentObj.forEach((child, index) => {
        if (this.usercheckedColumnIndex.length === 0) {
          child.checked = false
        } else {
          child.checked = true
        }
        if (child.child && child.child.length) {
          this.recursiveChildChecked(child.child, checked)
        }
      })
    },
    cellsytle ({ row, column, rowIndex, columnIndex }) {
      let styleStr = {}
      if (row.title == "原材料/散件" || row.title == '制造费' || row.title == '保费成本' || row.title == '管理费' || row.title == '其他费用' || row.title == '利润') {
        styleStr.fontWeight = "bold"
      }
      if (row.checked && this.usercheckedColumnIndex.indexOf(columnIndex) > -1) {
        styleStr.backgroundColor = "#94C8FC"
        styleStr.opacity = "0.6"
      }
      return styleStr
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
      // console.log(row, expanded)
    },
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .el-table tr:nth-child(even){
//     display: none;
// }
// ::v-deep .el-table .cell {
//   display: flex;
// }
::v-deep .el-table .el-table__body-wrapper {
  height: auto;
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
.add {
  background-color: red;
}
.editBox {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}
</style>
