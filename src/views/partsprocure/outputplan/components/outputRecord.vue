<template>
  <iCard class="outputRecord" tabCard collapse title="零件产量记录">
    <template v-slot:header-control>
      <iButton>更新至询价产量</iButton>
    </template>
    <div class="body">
      <tablelist
        class="table"
        index
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading" />
      <iPagination
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, getUsage)"
        @current-change="handleCurrentChange($event, getUsage)"
        background
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.page"
        :layout="page.layout"
        :total="page.total" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination } from '@/components'
import tablelist from '@/views/partsign/home/components/tableList'
import { getYearScope, getOutputPlan } from '@/api/partsprocure/home'
import { pageMixins } from '@/utils/pageMixins'
import { outputRecordTableTitle as tableTitle } from './data'
import { cloneDeep } from 'lodash'

export default {
  components: { iCard, iButton, tablelist, iPagination },
  mixins: [ pageMixins ],
  data() {
    return {
      loading: false,
      tableTitle: cloneDeep(tableTitle),
      tableListData: [],
    }
  },
  created() {
    this.getOutputRecord()
  },
  methods: {
    async getOutputRecord() {
      try {
        this.loading = true
        const { data: years } = await getYearScope({})
        const res = await getOutputPlan({})

        this.tableTitle.unshift(...years.map(year => ({ props: year + '', name: year + '' })))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.outputRecord {}
</style>