<!--
 * @Author: your name
 * @Date: 2021-06-22 11:35:46
 * @LastEditTime: 2021-06-22 15:40:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\partList\index.vue
-->
<template>
  <iCard class="partList" :title="$t('零件清单')">
    <div class="body">
      <tableList
        class="table"
        index
        :selection="false"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading" />
      <iPagination 
        v-update
        class="margin-top30"
        @size-change="handleSizeChange($event, getList)"
        @current-change="handleCurrentChange($event, getList)"
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

export default {
  components: {
    iCard,
    iPagination,
    tableList
  },
  mixins: [ pageMixins ],
  props: {
    partInfo: {
      type: Object,
      default: () => ({})
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
      const getList = function () {}

      this.loading = true
      getList()
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