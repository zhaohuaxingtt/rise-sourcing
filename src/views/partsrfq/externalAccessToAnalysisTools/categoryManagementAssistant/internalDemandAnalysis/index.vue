<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 10:42:23
 * @LastEditTime: 2021-08-12 14:39:36
 * @LastEditors: 舒杰
 * @Description: 内部需求分析
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\index.vue
-->
<template>
  <iPage>
    <headerNav>
      <div slot="extralButton">
        <iButton @click="handleView">{{ language("CHAKANLISHI", "查看历史") }}</iButton>
      </div>
    </headerNav>
    <router-view></router-view>
    <viewHistory v-model="viewHistory" />
  </iPage>
</template>

<script>
import { iPage, iButton } from 'rise';
import headerNav from '../components/headerNav';
import { pageRfqBaseInfo } from "@/api/partsrfq/specialAnalysisTool/specialAnalysisTool";
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
  created() {
    if (!this.$store.state.rfq.categoryCode) {
      this.value = true
    }
  },
  methods: {
    handleView() {
      this.viewHistory = true
    },
    querySearchAsync(queryString, cb) {
      pageRfqBaseInfo({ keyword: queryString }).then(res => {
        if (res.data) {
          let result = []
          res.data.map(item => {
            if (item.categoryCode) {
              result.push({ value: item.categoryName, categoryCode: item.categoryCode })
            }
          })
          cb(result)
        }
      })
    },
  }
};
</script>

<style scoped lang="scss">
.autocomplete {
  width: 100%;
}
</style>
