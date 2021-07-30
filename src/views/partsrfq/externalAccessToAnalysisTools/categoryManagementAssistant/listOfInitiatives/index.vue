<template>
  <iPage>
    <headerNav>
      <template #extralButton>
         <iButton>材料组</iButton>
         <iButton>报告清单</iButton>
         <iButton>编辑</iButton>
         <iButton>导出</iButton>
      </template>
    </headerNav>
    举措清单
  </iPage>
</template>

<script>
import {iPage, iButton} from 'rise'
import headerNav from '../components/headerNav'
export default {
  components: {
    iPage,
    iButton,
    headerNav
  }
};
</script>

<style scoped>

</style>
