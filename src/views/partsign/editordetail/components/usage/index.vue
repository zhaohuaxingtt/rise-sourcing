<template>
  <div class="usage">
    <div class="header">
      <iButton @click="version">查看全部版本</iButton>
    </div>
    <div class="body">
      <tablelist class="table" :tableData="tableListData" :tableTitle="tableTitle"></tablelist>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { iButton } from '@/components'
import tablelist from './components/tablelist'
import { tableTitle } from './components/data'
// import { getTabelData } from '@/api/partsign/home'

export default {
  components: { tablelist, iButton },
  data() {
    return {
      tableTitle,
      tableListData: []
    }
  },
  // created(){this.getTableList()},
  methods: {
    // getTableList(){
    //   getTabelData().then(res=>this.tableListData = res.data)
    // }
    version() {
      window.open('/#/version', '_blank', 'width=900,height=600,menubar=no,toolbar=no,status=no,scrollbars=yes')
    }
  }
}
</script>

<style lang="scss" scoped>
.usage {
  .body {
    margin-top: 12px;
    
    .pagination {
      text-align: right;
      margin-top: 12px;
    }
  }
}
</style>