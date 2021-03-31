<!--
 * @Author: your name
 * @Date: 2021-03-26 18:37:44
 * @LastEditTime: 2021-03-30 23:22:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqPending\components\partDetaiList\components\partsTable.vue
-->
<template>
  <div class="notPushRfq">
    <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        @openPage="openPage"
    ></tableList>
    <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
    ></iPagination>
  </div>
</template>

<script>
import {
  iPagination,
} from "@/components";
import {
  tableTitle,
  form
} from "@/views/partsprocure/home/components/data";
import tableList from "@/views/partsign/home/components/tableList";
import {
  pageMixins
} from "@/utils/pageMixins";
import {
  getPartSrcPrjs,
} from '@/api/partsrfq/editordetail';

export default {
  mixins: [pageMixins],
  components: {
    tableList,
    iPagination
  },
  props: {
    rfqId: {
      type: String
    }
  },
  data() {
    return {
      tableLoading: false,
      tableListData: [],
      parmarsNotHasRfq: JSON.parse(JSON.stringify(form)),
      // handleSelectArr: [],
      tableTitle,
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    //获取表格数据
    getTableList() {
      this.parmarsNotHasRfq['search.size'] = this.page.pageSize
      this.parmarsNotHasRfq['search.current'] = this.page.currPage
      this.parmarsNotHasRfq['search.projectStatus'] = '11'
      getPartSrcPrjs(this.parmarsNotHasRfq).then(res => {
        this.tableLoading = false
        this.page.currPage = res.data.pageData.pageNum
        this.page.pageSize = res.data.pageData.pageSize
        this.page.totalCount = res.data.pageData.total
        this.tableListData = res.data.pageData.data || []
      }).catch(() => this.tableLoading = false)
    },
    // 待选零件
    handleSelectionChange(e) {
      this.$emit('targetHand', e)
      // this.handleSelectArr = e;
    },
    // 跳转详情
    openPage(item) {
      this.$router.push({
        path: "/partsprocure/editordetail",
        query: {
          item: JSON.stringify(item),
        },
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.notPushRfq {
  width: 100%;
}
</style>
