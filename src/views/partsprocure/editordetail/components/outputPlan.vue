<template>
  <iCard class="outputPlan tabCard" title="询价产量计划" tabCard>
    <template v-slot:header-control>
      <iButton>保存</iButton>
    </template>
    <div class="body">
      <tablelist
        class="table" 
        :selection="false"
        indexLabel="编号" 
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton } from '@/components'
import tablelist from '@/views/partsign/home/components/tableList'
import { getYearScope, getOutputPlan } from '@/api/partsprocure/home'

export default {
  components: { iCard, iButton, tablelist },
  data() {
    return {
      loading: false,
      tableTitle: [
        { props: 'a', name: '年份' },
        { props: 'b', name: 'SUM' },
        { props: 'c', name: '版本号' }
      ],
      tableListData: [
        { 'a': '产量（PC）' }
      ],
    }
  },
  created() {
    this.getOutputPlan()
  },
  methods: {
    async getOutputPlan() {
      try {
        this.loading = true
        const { data: years } = await getYearScope({})
        const res = await getOutputPlan({})

        this.tableTitle.splice(1, 0, ...years.map(year => ({ props: year + '', name: year + '' })))
        
        this.$set(this.tableListData[0], 'b', Object.keys(res.data).reduce((acc, key) => {
          this.tableListData[0][key + ''] = res.data[key] || 0
          return window.math.add(acc, window.math.bignumber(res.data[key] || 0))
        }, 0).toString())
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.outputPlan {
}
</style>