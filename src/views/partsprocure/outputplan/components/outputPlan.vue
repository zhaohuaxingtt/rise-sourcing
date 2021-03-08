<template>
  <iCard class="outputPlan tabCard" title="询价产量计划" tabCard collapse>
    <template v-slot:header-control>
      <iButton @click="save">保存</iButton>
    </template>
    <div class="body">
      <el-table
        :data="tableListData"
        v-loading="loading">
        <template v-for="(items, $index) in tableTitle">
          <el-table-column :key="$index" align="center" v-if="$index == 1" :prop="items.props" :label="items.name">
            <div slot="header">
              <iSelect v-model="startYear" class="select">
                <el-option
                  v-for="(item, $index) in years"
                  :key="$index"
                  :label="item"
                  :value="item" />
              </iSelect>
            </div>
            <iInput class="input" />
          </el-table-column>
          <el-table-column v-if="$index == 0" :key="$index" align="center" :label="items.name" :prop="items.props"></el-table-column>
          <el-table-column v-else :key="$index" align="center" :label="items.name" :prop="items.props">
            <iInput class="input" :disabled="$index == tableTitle.length - 1 || $index == tableTitle.length - 2" />
          </el-table-column>
        </template>
      </el-table>
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iSelect, iInput } from '@/components'
import { getYearScope, getOutputPlan } from '@/api/partsprocure/home'
import { outputPlanTableTitle as tableTitle } from './data'
import { cloneDeep } from 'lodash'

export default {
  components: { iCard, iButton, iSelect, iInput },
  data() {
    return {
      loading: false,
      years: [],
      startYear: 2019,
      tableTitle: cloneDeep(tableTitle),
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
        this.years = years
        const res = await getOutputPlan({})

        this.tableTitle.splice(1, 0, ...years.map(year => ({ props: year + '', name: year + '' })))
        
        this.$set(this.tableListData[0], 'b', Object.keys(res.data).reduce((acc, key) => {
          this.tableListData[0][key + ''] = res.data[key] || 0
          return window.math.add(acc, window.math.bignumber(res.data[key] || 0))
        }, 0).toString())
      } finally {
        this.loading = false
      }
    },
    save() {
    }
  }
}
</script>

<style lang="scss" scoped>
.outputPlan {
  .select {
    ::v-input {
      input {
        height: 30px!important;
      }
    }
  }

  .input {
    height: 30px!important;
    margin: 2px 0;

    ::v-deep input {
      height: 30px!important;
    }
  }
}
</style>