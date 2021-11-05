<template>
  <div class="supplier" v-permission.auto="SOURCING_NOMINATION_SUPPLIER_PAGE|供应商&单一供应商">
    <!-- 供应商列表 -->
    <multiTable v-permission.auto="SOURCING_NOMINATION_SUPPLIER_SUPPLIERLIST|供应商列表" />
    <!-- 单一供应商 -->
    <singleTable v-permission.auto="SOURCING_NOMINATION_SUPPLIER_SINGLESUPPLIER|单一供应商" />
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
  }
}
</script>
<style lang="scss" scoped>
.supplier {
}
</style>