<template>
  <iDialog :title="title" :visible.sync="value" width="80%" @close='clearDiolog'>
    <div class="changeContent">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright title-button-box">
          <iButton @click="save">保存</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :index="true"
      ></tablelist>
    </div>
    <span slot="footer" class="dialog-footer">
          <iButton @click="$emit('input',false)">取 消</iButton>
        </span>
  </iDialog>
</template>
<script>
import {iButton, iMessage, iDialog} from '@/components'
import tablelist from "pages/partsrfq/components/tablelist";
import {addSupplierTitle} from "./data"
import {getAllRfqSupplier} from "@/api/partsrfq/editordetail";

export default {
  components: {iButton, iDialog, tablelist},
  props: {
    title: {type: String, default: '添加供应商'},
    value: {type: Boolean},
    repeatClick: Boolean
  },
  data() {
    return {
      tableListData: [],
      tableTitle: addSupplierTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  methods: {
    //获取表格数据
    async getTableList() {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
        try {
          const req = {
            rfqId: id
          }
          const res = await getAllRfqSupplier(req)
          this.tableListData = res.records;
          this.page.currPage = res.current
          this.page.pageSize = res.size
          this.page.totalCount = res.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    save() {
      if (this.selectTableData.length == '') return iMessage.warn('抱歉！您当前还未选择！')
      this.$emit('sure', JSON.parse(this.selectTableData))
    }
  },
  watch: {
    value() {
      this.getTableList()
    }
  }
}
</script>
<style lang='scss' scoped>
.changeContent {
  padding: 0px 10px 20px 10px;

  .title-button-box {
    margin-top: -60px;
    margin-right: 30px;
  }
}
</style>

