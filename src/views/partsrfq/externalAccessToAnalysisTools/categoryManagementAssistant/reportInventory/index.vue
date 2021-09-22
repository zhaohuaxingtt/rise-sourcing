<!--
 * @Author: your name
 * @Date: 2021-08-08 15:16:42
-->
<template>
  <iDialog class="dialog" :visible.sync="value" width="95%" @close="clearDiolog">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">
        {{ language("BAOGAOQINGDAN", "报告清单") }}
        <el-popover trigger="hover" placement="top-start" :content="language('QTQBCFXJGZZCCJXCZ','请提前保存分析结果，再在此处进行导出操作')">
          <icon slot="reference" name="iconxinxitishi" tip="" symbol></icon>
        </el-popover>
      </div>
      <div class="operation">
        <iButton @click="handleAll">{{ $t("全选") }} </iButton>
        <iButton @click="handleExport">{{ $t("LK_DAOCHU") }} </iButton>
      </div>
    </div>
    <div class="content">
      <div class="table" v-for="(value, index) in tableList" :key="index">
        <el-table @select="select" @select-all="selectAll($event,value.code)" row-key="sort" :tree-props="{children:'childNodes'}" v-loading="tableLoading" :ref="'multipleTable'" :data="value.dimensions" @selection-change="handleSelectionChange($event,index)">
          <el-table-column align="center" type="selection" width="55"> </el-table-column>
          <el-table-column align="center" type="index" :index="indexMethod" label="#" width="55">
            <template slot-scope="scope">{{scope.row.sort}}</template>
          </el-table-column>
          <el-table-column align="left" prop="name" :label="value.name">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage, icon } from "rise";
import { categoryReportExport, categoryReport } from "@/api/categoryManagementAssistant/categoryManagementAssistant/index.js";
import resultMessageMixin from '@/utils/resultMessageMixin.js';

export default {
  mixins: [resultMessageMixin],
  data() {
    return {
      tableList: [],
      tableLoading: false,
      selectTableData0: [],
      selectTableData1: [],
      selectTableData2: [],
      selectTableData3: [],
    };
  },
  components: {
    iDialog,
    iButton,
    iMessage,
    icon
  },
  props: {
    value: { type: Boolean },
  },
  created() {
  },
  watch: {
    value: {
      handler(val) {
        val && this.getTableList()
      }
    }
  },
  methods: {
    setChildren(children, type, index) {
      // 编辑多个子层级
      children.map((j) => {
        this.toggleSelection(j, type, index)
        if (j.childNodes) {
          this.setChildren(j.childNodes, type, index)
        }
      })
    },
    // 选中父节点时，子节点一起选中取消
    select(selection, row) {
      this.tableList.forEach((item, index) => {
        item.dimensions.forEach(val => {
          // 反向推是哪一个表
          if (val.id === row.id) {
            if (
              selection.some((el) => {
                return row.id === el.id
              })
            ) {
              if (row.childNodes) {
                // 解决子组件没有被勾选到
                this.setChildren(row.childNodes, true, index)
              }
            } else {
              if (row.childNodes) {
                this.setChildren(row.childNodes, false, index)
              }
            }
          }
        })
      })
    },
    toggleSelection(row, select, index) {
      if (row) {
        this.$nextTick(() => {
          this.$refs.multipleTable[index] && this.$refs.multipleTable[index].toggleRowSelection(row, select)
        })
      }
    },
    // 选择全部
    selectAll(selection, code) {
      this.tableList.forEach((item, index) => {
        if (item.code === code) {
          // tabledata第一层只要有在selection里面就是全选
          const isSelect = selection.some((el) => {
            const tableDataIds = this.tableList[index].dimensions.map((j) => j.id)
            return tableDataIds.includes(el.id)
          })
          // tableDate第一层只要有不在selection里面就是全不选
          const isCancel = !this.tableList[index].dimensions.every((el) => {
            const selectIds = selection.map((j) => j.id)
            return selectIds.includes(el.id)
          })
          if (isSelect) {
            selection.map((el) => {
              if (el.childNodes) {
                // 解决子组件没有被勾选到
                this.setChildren(el.childNodes, true, index)
              }
            })
          }
          if (isCancel) {
            this.tableList[index].dimensions.map((el) => {
              if (el.childNodes) {
                // 解决子组件没有被勾选到
                this.setChildren(el.childNodes, false, index)
              }
            })
          }
        }
      })
    },
    handleSelectionChange(val, index) {
      switch (index) {
        case 0:
          this.selectTableData0 = val
          break;
        case 1:
          this.selectTableData1 = val
          break;
        case 2:
          this.selectTableData2 = val
          break;
        case 3:
          this.selectTableData3 = val
          break;
        default:
          break;
      }
    },
    clearDiolog() {
      this.$emit('input', false);
    },
    async handleExport() {
      const pms = {
        categoryCode: this.$store.state.rfq.categoryCode || '',
        ids: []
      }
      this.selectTableData0.forEach(item => {
        pms.ids.push(item.id)
      })
      this.selectTableData1.forEach(item => {
        pms.ids.push(item.id)
      })
      this.selectTableData2.forEach(item => {
        pms.ids.push(item.id)
      })
      this.selectTableData3.forEach(item => {
        pms.ids.push(item.id)
      })
      if (!pms.ids.length) {
        iMessage.warn(this.language('BQNMYXZSJ', '抱歉，你没有选择数据'))
        return
      }
      await categoryReportExport(pms)
    },
    handleAll() {
      this.$refs.multipleTable[0].clearSelection()
      this.$refs.multipleTable[1].clearSelection()
      this.$refs.multipleTable[2].clearSelection()
      this.$refs.multipleTable[3].clearSelection()
      this.$refs.multipleTable[0].toggleAllSelection()
      this.$refs.multipleTable[1].toggleAllSelection()
      this.$refs.multipleTable[2].toggleAllSelection()
      this.$refs.multipleTable[3].toggleAllSelection()
    },
    async getTableList() {
      try {
        this.tableLoading = true
        const res = await categoryReport(this.$store.state.rfq.categoryCode)
        this.tableList = res.data
        this.tableLoading = false
      } catch (error) {
        this.tableList = []
        this.tableLoading = false
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.operation {
  display: flex;
  align-items: center;
  margin-right: 40px;
}
.dialog-Header {
  display: flex;
  justify-content: space-between;
}
.content {
  display: flex;
}
.title {
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
  line-height: 18px;
  color: #000000;
  opacity: 1;
}
.table {
  flex: 1;
  margin-top: 20px;
  margin-right: 40px;
  &:last-child {
    margin-right: 0;
  }
}
//有子节点 且未展开
::v-deep .el-table .el-icon-arrow-right:before {
  background: url("~@/assets/images/Icon - Arrow Drop Down.png") no-repeat 0 0;
  content: "";
  display: block;
  width: 10px;
  height: 4px;
  font-size: 10px;
  background-size: 10px;
}
//有子节点 且已展开
::v-deep .el-table .el-table__expand-icon--expanded {
  .el-icon-arrow-right:before {
    background: url("~@/assets/images/Icon - Arrow收起.png") no-repeat 0 0;
    content: "";
    display: block;
    width: 10px;
    height: 4px;
    font-size: 10px;
    background-size: 10px;
    transform: rotate(270deg);
  }
}
::v-deep .el-table__expand-icon {
  float: right !important;
}

::v-deep .el-tree .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
</style>
