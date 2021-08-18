<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 10:42:23
 * @LastEditTime: 2021-08-18 10:50:29
 * @LastEditors: zbin
 * @Description: 内部需求分析
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\index.vue
-->
<template>
  <iPage>
    <headerNav ref="headerNav">
      <iButton slot="extralButton" @click="handleView">{{ language("CHAKANLISHI", "查看历史") }}</iButton>
    </headerNav>
    <router-view></router-view>
    <viewHistory v-model="viewHistory" />
  </iPage>
</template>

<script>
import { iPage, iButton } from 'rise';
import headerNav from '../components/headerNav';
import viewHistory from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/viewHistory/index.vue';
export default {
  components: {
    iPage,
    headerNav,
    iButton,
    viewHistory
  },
  data() {
    return {
      categoryName: "",//材料组名称
      categoryCode: "",//材料组编号
      viewHistory: false
    }
  },
  methods: {
    handleView() {
      if (this.$store.state.rfq.categoryCode) {
        this.viewHistory = true
      } else {
        this.$refs.headerNav.openCatecory()
      }
    },
  }
};
</script>

<style scoped lang="scss">
.autocomplete {
  width: 100%;
}
</style>
