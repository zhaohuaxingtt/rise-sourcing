<!--
 * @Author: your name
 * @Date: 2021-06-21 11:38:57
 * @LastEditTime: 2021-08-19 16:41:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails\table1.vue
-->
<template>
  <iCard>
    <template v-slot:header>
      <div class="flex-between-center titleBox">
        <div>
          <span id="allocated">待分配区域</span>
          <span v-if="remark"
                class="margin-left40">{{ remark }}</span>
        </div>
        <div>
          <iButton @click="groupBy">分组至</iButton>
        </div>
      </div>
    </template>
    <el-tabs v-model="activeName"
             @tab-click="handleClick"
             style="margin-top:-10px">
      <el-tab-pane label="原材料/散件"
                   name="rawUngrouped">
        <el-table ref="treeList"
                  v-if='activeName==="rawUngrouped"'
                  :data="tableList.element"
                  :tree-props="{ hasChildren: 'hasChildren', children: 'child' }"
                  :row-key="getRowKey"
                  :expand-row-keys="expends"
                  :row-style="rowStyle"
                  v-loading="loading"
                  :max-height="maxHeight"
                  :cell-style="cellsytle"
                  @selection-change="handleSelectionChange"
                  @row-click="rowClick"
                  @row-dblclick="rowDblclick"
                  @cell-dblclick="cellBbClick"
                  @cell-click="cellClick"
                  @header-click="headerClick"
                  @expand-change="expandChange">
          <!-- <el-table-column label="" prop="title" width="250"> </el-table-column> -->
          <el-table-column v-for="i in tableList.title"
                           :key="i.index"
                           :label="i.title"
                           :prop="i.label"
                           :align="i.label == 'title' ? 'left' : 'center'"
                           :width="i.label == 'title' ? '200' : ''">
            <template v-if="i.child">
              <el-table-column v-for="item in i.child"
                               :key="item.index"
                               :label="item.title"
                               :prop="item.label"
                               align="center">
                <template slot="header"
                          slot-scope="scope">
                  <el-checkbox @change="check=>select(check,scope.column)"></el-checkbox>
                </template>
                <template slot-scope="scope">
                  <span>
                    <span class="flexSpan"
                          v-if="scope.row[item.label]=='true'||scope.row[item.label]=='false'">{{ scope.row[item.label]=='false'?'否':'是' }}</span>
                    <span class="flexSpan"
                          v-else>{{ scope.row[item.label] }}</span>
                  </span>
                </template>
              </el-table-column>
            </template>
            <!-- <template slot-scope="scope">
          <span v-if="testing(scope.row[i.prop])" class="flex">
            <span
              v-for="(item, index) in scope.row[i.prop]"
              :key="item.id"
              class="margin-right20"
              :class="checkClass(item, scope, index)"
              @click="clickCol(item, scope, index)"
              >{{ item }}</span
            >
          </span>
          <span v-else>
            <span
              :class="checkClass(item, scope, index)"
              @click="clickCol(item, scope, index)"
              >{{ scope.row[i.prop] }}</span
            >
          </span>
        </template> -->
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="制造费"
                   name="maUngrouped">
        <el-table ref="treeList1"
                  v-if='activeName==="maUngrouped"'
                  :data="tableList.element"
                  :tree-props="{ hasChildren: 'hasChildren', children: 'child' }"
                  :row-key="getRowKey"
                  :expand-row-keys="expends"
                  v-loading="loading"
                  :max-height="maxHeight"
                  @selection-change="handleSelectionChange"
                  @row-click="rowClick"
                  @row-dblclick="rowDblclick"
                  @cell-dblclick="cellBbClick"
                  @cell-click="cellClick"
                  @header-click="headerClick"
                  @expand-change="expandChange">
          <!-- <el-table-column label="" prop="title" width="250"> </el-table-column> -->
          <el-table-column v-for="i in tableList.title"
                           :key="i.index"
                           :label="i.title"
                           :prop="i.label"
                           :align="i.label == 'title' ? 'left' : 'center'"
                           :width="i.label == 'title' ? '200' : ''">
            <template v-if="i.child">
              <el-table-column v-for="item in i.child"
                               :key="item.index"
                               :label="item.title"
                               :prop="item.label"
                               align="center">
                <template slot="header"
                          slot-scope="scope">
                  <el-checkbox @change="check=>select(check,scope.column)"></el-checkbox>
                </template>
                <template slot-scope="scope">
                  <span>
                    <span class="flexSpan"
                          v-if="scope.row[item.label]=='true'||scope.row[item.label]=='false'">{{ scope.row[item.label]=='false'?'否':'是' }}</span>
                    <span class="flexSpan"
                          v-else>{{ scope.row[item.label] }}</span>
                  </span>
                </template>
              </el-table-column>
            </template>
            <!-- <template slot-scope="scope">
          <span v-if="testing(scope.row[i.prop])" class="flex">
            <span
              v-for="(item, index) in scope.row[i.prop]"
              :key="item.id"
              class="margin-right20"
              :class="checkClass(item, scope, index)"
              @click="clickCol(item, scope, index)"
              >{{ item }}</span
            >
          </span>
          <span v-else>
            <span
              :class="checkClass(item, scope, index)"
              @click="clickCol(item, scope, index)"
              >{{ scope.row[i.prop] }}</span
            >
          </span>
        </template> -->
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </iCard>
</template>

<script>
import { iCard, iButton } from "rise";
import { chargeRetrieve } from "@/api/partsrfq/bob";
import { filterEmptyChildren } from '@/utils'

export default {
  components: {
    iCard,
    iButton,
  },
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
  mounted () {

    this.newBuild = this.$route.query.newBuild;
    this.entryStatus = this.$store.state.rfq.entryStatus
    if (this.newBuild && this.entryStatus === 0) {
      this.SchemeId = this.$store.state.rfq.SchemeId;
    } else {
      this.SchemeId = this.$attrs.analysisSchemeId;
    }
    this.groupId = this.$route.query.groupId
    setTimeout(() => {
      this.$nextTick(() => {
        this.chargeRetrieve({
          isDefault: true,
          viewType: this.activeName,
          schemaId: this.SchemeId,
          groupId: this.groupId
        });
        // this.open();
      });
    }, 100);
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
        this.chargeRetrieve({
          isDefault: true,
          viewType: val,
          schemaId: this.SchemeId,
          groupId: this.groupId
        });
        // this.$EventBus.$emit("activeName", val);
      },
    },
    // tableList: {
    //   handler (val) {
    //     this.$set(this.tableList, 'title', val.title);
    //     this.$set(this.tableList, 'element', val.element);
    //   },
    //   deep: true
    // },

  },
  data () {
    return {
      checkList: [],
      auditData: [], //表格行内容数据
      auditDataColumnCode: [], //表头动态列内容数据Code备份  业务需求 可忽略
      auditDataColumn: [], //表头动态列内容数据集合
      checkAllOptions: [], //全选备用赋值数组   二维  注意没写错 这里暂时先定义成一维数组 业务需求 需要动态验证是否选中
      noCheckAllOptions: [], //全选备用赋值数组 二维
      checkedOptions: [], //列选择项 选中控制 二维
      checkOptionCount: [], //实时记录当前列 选中数量
      checkAll: [], //表头全选按钮 选中控制
      isIndeterminate: [], //表头 不确定状态控制
      activeName: "rawUngrouped",
      tableList: {},
      flattenDeep: window._.flattenDeep,
      result: [],
      check: false,
      SchemeId: ""
    };
  },
  methods: {
    open () {
      let els = this.$el.getElementsByClassName("el-table__expand-icon");
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
    addclass (row) {
      var that = this;
      if (row.columnIndex == that.num) {
        return "addcss";
      }
    },
    clickCol (a, b, c) {
      const i = this.checkList.findIndex((item) => item.index == c);

      if (i > -1) this.checkList.splice(i, i + 1);
      else
        this.checkList.push({
          id: b.row.id,
          index: c,
        });
      console.log("checkList", this.checkList);
    },
    //获取表格数据
    chargeRetrieve (params) {
      chargeRetrieve(params)
        .then((res) => {
          this.tableList = res;
          filterEmptyChildren(this.tableList.element, 'detailId')
          this.result = []
          this.$nextTick(() => {
            this.open();
          });
        })
        .catch((err) => { });
    },


    getRowKey (row) {
      return row.index;
    },
    handleClick (val) {
      console.log(val)
      this.$EventBus.$emit("activeName", val.name);
      // this.activeName = val;
    },
    renderHeader (h, { column }) {
      return h("div", [
        h("el-checkbox", {
          // style: "display:inline-flex;margin-right:15px;",
          on: {
            change: this.select.bind(this, column),
          },
        }),
        // h("span", column.label),
      ]);
    },
    /** 是否勾选表头 */
    select (checked, col) {
      // 如果checked为true则是勾选了对应的表头
      // console.log(col, checked);

      this.$nextTick(() => {

        const els = this.$el.getElementsByClassName(col.id);
        for (let i = 0; i < els.length; i++) {
          if (checked) {
            els[i].style.backgroundColor = "#94C8FC";
            els[i].style.opacity = "0.6";
          } else {
            els[i].style.backgroundColor = "";
            els[i].style.opacity = "1";
          }
        }
        if (checked) {
          this.result.push(col.property.split('#')[1])
        } else {
          this.result.forEach((value, index, array) => {
            if (value.indexOf(col.property.split('#')[1]) > -1) {
              this.result.splice(index, 1)
            }
          })
        }
        // this.$el.getElementsByClassName(col.id).style.backgroudColor = "#0EBADD";
      });
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
    rowClick (row, event, column) {
      this.$emit("row-click", row, event, column);
    },
    cellClick (row, column, cell, event) {
      console.log(row, column, cell);
      this.$emit("cell-click", row, column, cell, event);
    },
    // headerClick (column, event) {
    //   console.log(column);
    // },
    cellsytle ({ row }) {
      if (row.title == "原材料/散件" || row.title == '制造费' || row.title == '保费成本' || row.title == '管理费' || row.title == '其他费用' || row.title == '利润') {
        return "font-weight: bold"
      }
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
    groupBy () {
      this.$emit("groupBy", true, this.result, this.activeName);
    },
  },
};
</script>


<style lang="scss" scoped>
// ::v-deep .el-table tr:nth-child(even){
//     display: none;
// }
.card .cardHeader {
  padding-bottom: 0px !important;
}
::v-deep .el-table .el-table__body-wrapper {
  height: auto !important;
}
.new-bob .end {
  bottom: 50px !important;
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
.titleBox {
  width: 100%;
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
}
</style>
