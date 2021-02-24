<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:17:57
 * @LastEditTime: 2021-02-24 10:11:23
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收列表界面.
 * @FilePath: \rise\src\views\partsign\index.vue
-->
<template>
  <iPage>
    <!------------------------------------------------------------------------>
    <!--                  table模块，向外入参表格数据，表头                    --->
    <!------------------------------------------------------------------------>
    <tablelist :tableData='tableListData' :tableTitle='tableTitle'></tablelist>
  </iPage>
</template>
<script>
import {iPage,iButton,iCard} from '@/components'
import tablelist from './components/tablelist'
import {tableTitle} from './components/data'
import {getTabelData} from '@/api/partsign/home'
export default{
  components:{iPage,tablelist},
  data(){
    return {
      tableListData:[],
      tableTitle:tableTitle
    }
  },
  created(){this.getTableList()},
  methods:{
    getTableList(){
      getTabelData().then(res=>this.tableListData = res.data)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
