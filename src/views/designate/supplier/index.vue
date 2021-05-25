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
  .supplierTable {
    box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
    border-radius: 0.375rem;
    background: #fff;
    padding: 20px;
    margin-top: 20px;
  }
}
</style>