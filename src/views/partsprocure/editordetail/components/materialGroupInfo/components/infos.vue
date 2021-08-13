<!--
 * @Author: wentliao
 * @Date: 2021-05-11 16:31:08
 * @Description: 
-->
<template>
  <div class="infos">
    <iFormGroup v-for="(infoChunk, $chunkIndex) in infoChunks" :key="$chunkIndex" row="3" class="infos" inline icon>
      <!--<iFormItem v-for="(info, $index) in infoChunk" :key="$index" class="item" :label="`${ info.label }：`">-->
      <iFormItem v-for="(info, $index) in infoChunk" :key="$index" class="item" :label="language(info.key,info.label)+':'">
        <iText class="text">{{ info.value }}</iText>
      </iFormItem>
    </iFormGroup>
  </div>
</template>

<script>
import { infos } from './data'
import { chunk, cloneDeep } from 'lodash'
import { iFormGroup, iFormItem, iText } from 'rise'

export default {
  components: { iFormGroup, iFormItem, iText },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    data: {
      handler(data) { // 字段绑定值
        const _infos = cloneDeep(infos)
        _infos.forEach(item => {
          item.value = data[item.props]
        })
        this.infoChunks = chunk(_infos, 3)
      },
      deep: true
    }
  },
  data() {
    return {
      infoChunks: []
    }
  },
  created() {
    // 字段分行
    const _infos = cloneDeep(infos)
    _infos.forEach(item => {
      item.value = this.data[item.key]
    })
    this.infoChunks = chunk(_infos, 3)
  }
}
</script>

<style lang="scss" scoped>
.infos {
}
</style>