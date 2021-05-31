<template>
  <div class="supplier">
    <!-- 多供应商 -->
    <multiTable />
    <!-- 单一供应商 -->
    <singleTable />
  </div>
</template>
<script>

import multiTable from "./components/multiTable";
import singleTable from "./components/singleTable";


export default {
  components: {
    multiTable,
    singleTable
  },
  data() {
    return {    
      partDialogVisibal: false,
      batchEditVisibal: false
    }
  },
  methods: {
    openPage() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>
<style lang="scss" scoped>
.supplier {
}
</style>