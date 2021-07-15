<!--
 * @Author: your name
 * @Date: 2021-06-21 11:38:57
 * @LastEditTime: 2021-07-15 18:28:49
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
              :max-height="maxHeight"
              :cell-style="cellFunction"
              @selection-change="handleSelectionChange"
              @row-click="rowClick"
              @row-dblclick="rowDblclick"
              @cell-dblclick="cellBbClick"
              @cell-click="cellClick"
              @expand-change="expandChange">
      <!-- <el-table-column label="" prop="title" width="250"> </el-table-column> -->
      <el-table-column v-for="i in tableList.title"
                       :key="i.id"
                       :label="i.title"
                       :prop="i.label"
                       :align="i.prop == 'title' ? 'left' : 'center'"
                       :width="i.prop == 'title' ? '200' : ''">
        <!-- <template slot-scope="scope">
         
          <div style="display:flex">
            <el-input v-if="scope.row[i.label]==='新组别'"
                      v-model="scope.row[i.label]"></el-input>
            <div v-else>
              <span v-if="testing(scope.row[i.label])">
                <span v-for="(item) in scope.row[i.label]"
                      :key="item.id"
                      class="margin-right20">{{ item }}</span>
              </span>
              <span v-else>{{scope.row[i.label]}}</span>
            </div>
          </div>

        </template> -->

        <!-- <div v-for="item in scope.row"
               :key="item.index">
            <p v-for="j in item.child"
               :key="j.index"
               class="margin-right20">
              <el-input v-if="j.title==='新组别'"></el-input>
              <span v-else>{{j[i.label]}}</span>
            </p>
          </div> -->

        <!-- <el-table-column
          v-for="item in i.children"
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
          align="left"
          :render-header="render"
        >
        </el-table-column> -->

        <!-- <template slot-scope="scope">
          <span v-if="testing(scope.row[i.prop])" >
            <span
              v-for="(item, index) in scope.row[i.prop]"
              :key="item.id"
              class="margin-right20"
              :class="checkClass(item, scope, index)"
              @click="clickCol(item, scope, index)"
              >{{ item }}</span>
          </span>
          <span v-else>
            <span  :class="checkClass(item, scope, index)"
              @click="clickCol(item, scope, index)">{{ scope.row[i.prop] }}</span>
          </span>
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  chargeRetrieve,
} from "@/api/partsrfq/bob";
import { filterEmptyChildren } from '@/utils'
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
  },
  data () {
    return {
      checkList: [],
      tableList: {},
      SchemeId: ""
    };
  },
  created () {
    if (this.$store.state.rfq.entryStatus === 1) {
      this.SchemeId = this.$route.query.rfqId
      this.chargeRetrieve("all");
    } else {
      if (this.$route.query.rfqId) {
        this.SchemeId = this.$route.query.rfqId
        this.chargeRetrieve("all");
      } else {
        this.SchemeId = this.$store.state.rfq.SchemeId;
      }
    }
    this.$nextTick(() => {
      this.chargeRetrieve('rawGrouped');
    });
    this.$EventBus.$on("acitveName", res => {
      console.log(res, 'hahahah')
    })
  },
  mounted () { },
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
    addclass (row) {
      var that = this;
      if (row.columnIndex == that.num) {
        return "addcss";
      }
    },
    cellFunction ({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
    },
    clickCol (a, b, c) {
      const i = this.checkList.findIndex((item) => item.index == c);
      if (i > -1) this.checkList.splice(i, i + 1);
      else
        this.checkList.push({
          id: b.row.id,
          index: c,
        });
    },
    //获取表格数据
    chargeRetrieve (type) {
      chargeRetrieve({
        schemaId: this.SchemeId,
        viewType: type,
      })
        .then((res) => {
          this.tableList = res;
          this.$nextTick(() => {
            this.open();
          });
        })
        .catch((err) => { });
    },


    getRowKey (row) {
      return row.index;
    },
    render (h, { column, $index }) { },
    rowClick (row, event, column) {
      this.$emit("row-click", row, event, column);
    },

    cellClick (row, column, cell, event) {
      console.log(row, column, cell, event);
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
::v-deep .el-table .cell {
  display: flex;
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
</style>
