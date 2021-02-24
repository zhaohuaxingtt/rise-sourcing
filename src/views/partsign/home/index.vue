<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:17:57
 * @LastEditTime: 2021-02-24 09:46:06
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收列表界面.
 * @FilePath: \rise\src\views\partsign\index.vue
-->
<template>
  <iPage>
    <tablelist :data='tableListData' :title='tableTitle'></tablelist>
  </iPage>
</template>
<script>
import {iPage,iButton,iCard} from '@/components'
import tablelist from './components/tablelist'
import tableTitle from './components/data'
export default{
  components:{iPage,tablelist},
  data(){
    return {
      tableListData:[],
      tableTitle:tableTitle
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
