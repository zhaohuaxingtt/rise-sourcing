<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="80%" @close='clearDiolog'>
    <div class="changeContent">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright title-button-box">
          <iButton @click="save">{{ language('LK_BAOCUN','保存') }}</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :index="true"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      />
    </div>
    <span slot="footer" class="dialog-footer">
          <iButton @click="$emit('input',false)">{{ language('LK_QUXIAO','取 消') }}</iButton>
        </span>
  </iDialog>
</template>
<script>
import {iButton, iMessage, iDialog, iPagination} from 'rise'
import tablelist from "pages/partsrfq/components/tablelist";
import {addSupplierTitle} from "./data"
import {getAllRfqSupplier} from "@/api/partsrfq/editordetail";
import {pageMixins} from "@/utils/pageMixins";

export default {
  components: {iButton, iDialog, tablelist, iPagination},
  props: {
    title: {type: String, default: 'LK_TIANJIAGONGYINGSHANG'},
    value: {type: Boolean},
    repeatClick: Boolean,
    addSupplierList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mixins: [pageMixins],
  created() {
    this.getTableList()
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
      if (this.selectTableData.length == '') {
        iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZE','抱歉！您当前还未选择！'))
        return false
      }
      this.$emit('sure', this.selectTableData)
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

