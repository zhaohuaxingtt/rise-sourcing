<!--
 * @Author: your name
 * @Date: 2021-08-08 15:16:42
-->
<template>
  <iDialog class="dialog" :visible.sync="value" width="95%" @close="clearDiolog">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">
        {{ language("BAOGAOQINGDAN", "报告清单") }}
      </div>
      <div class="operation">
        <iButton @click="handleAll">{{ $t("全选") }} </iButton>
        <iButton @click="handleExport">{{ $t("LK_DAOCHU") }} </iButton>
      </div>
    </div>
    <div class="content">
      <div class="table" v-for="(value, index) in tableList" :key="index">
        <el-table v-loading="tableLoading" :ref="'multipleTable'" :data="value.dimensions" @selection-change="handleSelectionChange($event,index)">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" :index="indexMethod" label="#" width="55"> </el-table-column>
          <el-table-column prop="name" :label="value.name">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from "rise";
import { categoryReportExport, categoryReport } from "@/api/categoryManagementAssistant/categoryManagementAssistant/index.js";
import resultMessageMixin from '@/utils/resultMessageMixin.js';

export default {
  mixins: [resultMessageMixin],
  data() {
    return {
      tableList: {},
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
    iMessage
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
      console.log(this.$refs);
      console.log(this.$refs.multipleTable);
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
::v-deep td > .cell {
  text-align: center;
}
::v-deep th > .cell {
  text-align: center;
}
</style>
