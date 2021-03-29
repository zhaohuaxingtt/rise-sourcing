<!--
 * @Author: your name
 * @Date: 2021-03-04 11:13:18
 * @LastEditTime: 2021-03-27 20:56:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\editordetail\components\drawingSheet\sheet.vue
-->
<template>
  <iCard class="outputRecord" tabCard :title="`信息单流水号：${ this.params.purchasingRequirementId || '' }`" v-loading="loading">
    <div class="body">
      <iFormGroup v-for="(chunk, $index) in items" :key="$index" :row="3" inline>
        <iFormItem v-for="item in chunk" :key="item.props" :label="item.name">
          <iText v-if="item.props === 'status'">{{ value | statusFilter }}</iText>
          <iText v-else-if="item.props === 'createDate' || item.props === 'drawingDate'">{{ value | dateFilter }}</iText>
          <iText v-else>{{ value }}</iText>
        </iFormItem>
      </iFormGroup>
    </div>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText } from '@/components'
import { items } from './data'
import { cloneDeep } from 'lodash'
import filters from '@/utils/filters'
import { getTpInfo } from "@/api/partsprocure/editordetail";
import store from '@/store'
export default {
  components: { iCard, iFormGroup, iFormItem, iText },
  mixins: [ filters ],
  props: {
    params: {
      type: Object,
      require: true
    }
  },
  watch: {
    data: {
      handler(data) {
        this.items.forEach(chunk => {
          chunk.forEach(item => {
            this.$set(item, 'value', data[item.props])
          })
        })
      },
      deep: true
    }
  },
  filters: {
    statusFilter(val) {
      const map = {
        1: '未签收',
        2: '签收',
        3: '退回',
        4: '中止'
      }

      return map[val] || ''
    }
  },
  data() {
    return {
      loading: false,
      data: {},
      items: cloneDeep(items),
    }
  },
  created() {
    this.getTpInfo()
  },
  methods: {
    getTpInfo() {
      if (!this.params.purchasingRequirementId) return

      this.loading = true
      getTpInfo({
        purchasingRequirementId: this.params.purchasingRequirementId,
        userId: store.state.permission.userInfo.id
      })
        .then(res => {
          this.data = (res.data.tpRecordsSenarioResult && res.data.tpRecordsSenarioResult.tpRecordList && res.data.tpRecordsSenarioResult.tpRecordList[0]) || {}
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
  }
}
</script>

<style lang="scss" scoped>
.outputRecord {}
</style>