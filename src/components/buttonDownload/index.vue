<template>
  <iButton :loading="loading" @click="exportExcel" class="download">
    <slot name="default">
      {{ language('导出') }}
    </slot>
  </iButton>
</template>

<script>
import { iButton } from 'rise'
export default {
  name: 'buttonDownload',
  components: { iButton },
  props: {
    downloadMethod: {
      type: Function,
      require: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    exportExcel() {
      this.loading = true
      this.downloadMethod().finally(() => (this.loading = false))
    }
  }
}
</script>

<style lang="scss" scoped></style>
