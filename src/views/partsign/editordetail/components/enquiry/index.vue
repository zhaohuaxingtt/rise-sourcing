/* 
 * @Author: ldh  
 * @Date: 2021-02-24 11:26:04  
 * @Last Modified by: ldh
 * @Last Modified time: 2021-02-24 13:47:07
 */
<template>
  <div style="padding: 20px; background: #fff">
    <div class="header">
      <iButton>查看全部版本</iButton>
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
      tableListData: [ { a: 'a.pdf' }, { a: 'b.pdf' } ]
    }
  },
  // created(){this.getTableList()},
  methods: {
    // getTableList(){
    //   getTabelData().then(res=>this.tableListData = res.data)
    // }
  }
}
</script>

<style lang="scss" scoped>
.body {
  margin-top: 20px;
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>