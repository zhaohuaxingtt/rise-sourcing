<template>
  <tablelist :tableTitle="tableTitle" :tableData="tableData" />
</template>

<script>
import tablelist from './components/tablelist'
import { tableTitle } from './components/data'

export default {
  components: { tablelist },
  data() {
    return {
      tableTitle,
      tableData: []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>