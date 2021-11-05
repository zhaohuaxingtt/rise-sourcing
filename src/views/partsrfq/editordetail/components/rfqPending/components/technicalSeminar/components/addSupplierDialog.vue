<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="80%" @close='clearDiolog'>
    <div class="changeContent">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright title-button-box">
          <iButton @click="save">{{ language('LK_BAOCUN','保存') }}</iButton>
        </div>
      </div>
      <tablelist
        lang
        index
        selection
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #supplierName="scope">{{ scope.row[`suppliername${ $i18n.locale }`] }}</template>
        <template #isMbdl="scope">{{ scope.row.isMbdl == 2 ? "M" : "" }}</template>
      </tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <!-- <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      /> -->
    </div>
    <span slot="footer" class="dialog-footer">
          <iButton @click="$emit('input',false)">{{ language('LK_QUXIAO','取 消') }}</iButton>
        </span>
  </iDialog>
</template>
<script>
import {iButton, iMessage, iDialog} from 'rise'
import tablelist from "@/views/partsign/editordetail/components/tableList";
import {addSupplierTitle} from "./data"
import {getAllRfqSupplier} from "@/api/partsrfq/editordetail";
import {pageMixins} from "@/utils/pageMixins";

export default {
  components: {iButton, iDialog, tablelist},
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
          const res = await getAllRfqSupplier(id)
          this.tableListData = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              ...item,
              suppliernameen: item.supplierNameEn,
              suppliernamezh: item.supplierNameZh,
            })) :
            []
        } finally {
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

