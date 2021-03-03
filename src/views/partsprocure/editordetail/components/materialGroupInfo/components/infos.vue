<template>
  <div class="infos">
    <iFormGroup v-for="(infoChunk, $chunkIndex) in infoChunks" :key="$chunkIndex" row="3" class="infos" inline icon>
      <iFormItem v-for="(info, $index) in infoChunk" :key="$index" class="item" :label="`${ info.label }：`">
        <iText class="text">{{ info.value }}</iText>
      </iFormItem>
    </iFormGroup>
  </div>
</template>

<script>
import { infos } from './data'
import { chunk } from 'lodash'
import { iFormGroup, iFormItem, iText } from '@/components'

export default {
  components: { iFormGroup, iFormItem, iText },
  data() {
    return {
      infoChunks: []
    }
  },
  created() {
    this.infoChunks = chunk(infos, 3)
  },
}
</script>

<style lang="scss" scoped>
.infos {
}
</style>