<!--
 * @Author: YoHo
 * @Date: 2021-10-09 09:24:00
 * @LastEditTime: 2021-10-09 17:08:56
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iPage>
    <project-top :navList="navList" :subNavList="subNavList"></project-top>
    <!-- <router-view></router-view> -->
    <variationCBDSummaryTable />
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import projectTop from '../components/projectHeader'
import variationCBDSummaryTable from './components/variationCBDSummaryTable'
  export default {
    components:{
      iPage,
      projectTop,
      variationCBDSummaryTable
    },
    data() {
      return {
        navList:[],
        subNavList: [
          {
            value: 1,
            name: 'AEKO审批',
            message: 0,
            url: '/aeko/approve',
            activePath: 'projectoverview',
            key: '审批单'
          },
          {
            value: 2,
            name: 'AEKO查看',
            message: 0,
            url: '/aeko/approve',
            activePath: 'projectoverview',
            key: 'CBD汇总'
          },
          {
            value: 3,
            name: 'AEKO查看',
            message: 0,
            url: '/aeko/approve',
            activePath: 'projectoverview',
            key: '审批附件'
          },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>