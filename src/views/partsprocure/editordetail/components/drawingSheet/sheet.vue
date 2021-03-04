<template>
  <iCard class="outputRecord" tabCard title="信息单流水号：256051">
    <div class="body">
      <iFormGroup v-for="(chunk, $index) in items" :key="$index" :row="3" inline>
        <iFormItem v-for="item in chunk" :key="item.props" :label="item.name">
          <iText>test</iText>
        </iFormItem>
      </iFormGroup>
    </div>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText } from '@/components'
import { items } from './data'

export default {
  components: { iCard, iFormGroup, iFormItem, iText },
  data() {
    return {
      loading: false,
      items,
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.outputRecord {}
</style>