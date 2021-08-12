<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 10:42:23
 * @LastEditTime: 2021-08-12 09:52:18
 * @LastEditors: 舒杰
 * @Description: 内部需求分析
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\index.vue
-->
<template>
  <iPage>
    <headerNav>
      <div slot="extralButton">
        <iButton @click="openCategoryCode">{{ language("CAILIAOZU", "材料组") }}</iButton>
        <iButton @click="handleReport">{{ language("BAOGAOQINGDAN", "报告清单") }}</iButton>
        <iButton @click="handleView">{{ language("CHAKANLISHI", "查看历史") }}</iButton>
      </div>
    </headerNav>
    <router-view></router-view>
    <reportInventory v-model="reportInventory" />
    <viewHistory v-model="viewHistory" />
    <!-- 材料组定位 -->
    <iDialog :title='language("CAILIAOZU", "材料组")' :visible.sync="value" class="iDialog" width="400px" @close='clearDiolog' top="40vh">
      <p class="tip margin-bottom10">{{ language("QXZCAILIAOZU", "请选择材料组") }}</p>
      <!-- <iInput v-model="categoryCode"></iInput> -->
      <el-autocomplete class="autocomplete" v-model="categoryName" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
      <span slot="footer" class="dialog-footer">
        <iButton @click="confirm">{{ language("QUEREN", "确认") }}</iButton>
      </span>
    </iDialog>
  </iPage>
</template>

<script>
import { iPage, iButton, iDialog } from 'rise';
import headerNav from '../components/headerNav';
import { pageRfqBaseInfo } from "@/api/partsrfq/specialAnalysisTool/specialAnalysisTool";
import reportInventory from "@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/reportInventory/index.vue";
import viewHistory from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/viewHistory/index.vue';
export default {
  components: {
    iPage,
    headerNav,
    iButton,
    iDialog,
    reportInventory,
    viewHistory
  },
  data() {
    return {
      value: false,
      categoryName: "",//材料组名称
      categoryCode: "",//材料组编号
      reportInventory: false,
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
    handleReport() {
      this.reportInventory = true
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
    // 确认
    confirm() {
      this.$store.dispatch('setCategoryCode', this.categoryCode)
      this.value = false
    },
    // 重新定位材料组
    openCategoryCode() {
      this.value = true
    },
    handleSelect(item) {
      this.categoryCode = item.categoryCode
    }
  }
};
</script>

<style scoped lang="scss">
.autocomplete {
  width: 100%;
}
</style>
