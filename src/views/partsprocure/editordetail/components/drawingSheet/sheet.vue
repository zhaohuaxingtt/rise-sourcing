<!--
 * @Author: your name
 * @Date: 2021-03-04 11:13:18
 * @LastEditTime: 2021-07-22 17:57:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\editordetail\components\drawingSheet\sheet.vue
-->
<template>
  <iCard class="outputRecord" tabCard :title="`${ language('LK_LINGJIANHAO','零件号') }：${ this.data.partNum || '' }`" v-loading="loading">
    <div class="body">
      <iFormGroup v-for="(chunk, $index) in items" :key="$index" :row="3" inline>
        <iFormItem v-for="item in chunk" :key="item.props" :label="language(item.key,item.name)">
          <iText v-if="item.props === 'status'">{{ item.value }}</iText>
          <iText v-else-if="item.props === 'createDate' || item.props === 'drawingDate'">{{ item.value | dateFilter }}</iText>
          <iText v-else-if="item.props === 'isSecondTier' || item.props === 'isBMG'">{{ item.value | boolFilter }}</iText>
          <iText v-else>{{ item.value }}</iText>
        </iFormItem>
      </iFormGroup>
    </div>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText } from 'rise'
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
      require: true,
      default:()=>{}
    }
  },
  watch: {
    data: {
      handler(data) {
        console.log('test', data)
        this.items.forEach(chunk => {
          chunk.forEach(item => {
            this.$set(item, 'value', data[item.props])
          })
        })
      },
      deep: true
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
      if (this.params.partProjectSource == 2) return // 手工创建的采购项目不调用该接口
      if (!this.params.purchasingRequirementId) return

      this.loading = true
      getTpInfo({
        purchasingRequirementId: this.params.purchasingRequirementId,
        userId: store.state.permission.userInfo.id
      })
        .then(res => {
          console.log(res.data.tpRecordsSenarioResult)
          this.data = (res.data.tpRecordsSenarioResult && res.data.tpRecordsSenarioResult.tpRecordList && res.data.tpRecordsSenarioResult.tpRecordList[0] && res.data.tpRecordsSenarioResult.tpRecordList[0].tpPartInfoVO) || {}
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