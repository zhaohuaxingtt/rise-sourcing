<template>
  <iPage>
    <headerNav/>
    <industryReport></industryReport>
    <!--    市场数据-->
<!--    <marketData class="margin-top30"/>-->
  </iPage>
</template>

<script>
import {iPage} from 'rise'
import headerNav from '../components/headerNav'
import industryReport from './industryReport'
import marketData from './marketData';
export default {
  components: {
    iPage,
    headerNav,
    industryReport,
    marketData
  }
};
</script>

<style scoped>

</style>
