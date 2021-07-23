<!--
 * @Author: your name
 * @Date: 2021-06-22 11:35:46
 * @LastEditTime: 2021-07-22 19:20:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\partList\index.vue
-->
<template>
  <iCard class="partList" :title="language('LINGJIANQINGDAN', '零件清单')">
    <div class="body">
      <tableList
        class="table"
        index
        :lang="true"
        :selection="false"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading" />
      <iPagination 
        v-update
        class="margin-top30"
        @size-change="handleSizeChange($event, init)"
        @current-change="handleCurrentChange($event, init)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { partListTableTitle as tableTitle } from "../data"
import { pageMixins } from "@/utils/pageMixins"
import { getPartsForRfq } from "@/api/supplierscore"

export default {
  components: {
    iCard,
    iPagination,
    tableList
  },
  mixins: [ pageMixins ],
  props: {
    rfqId: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: []
    }
  },
  methods: {
    init() {
      this.loading = true
      getPartsForRfq({
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        rfqId: this.rfqId
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>