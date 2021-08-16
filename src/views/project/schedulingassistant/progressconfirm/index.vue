<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:26:47
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-16 14:46:33
 * @Description: 进度确认汇总
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\index.vue
-->

<template>
  <iPage class="progressConfirm" v-permission.dynamic="permissionKey">
    <iTabsList type="card" @tab-click="tabChange" :before-leave="tabLeaveBefore" v-model="currentTab">
      <el-tab-pane lazy :label="language('CHANPINZU', '产品组')" :name="'productGroup'">
          <productGroup ref="confirmProductGroup" />
      </el-tab-pane>
      <el-tab-pane lazy :label="language('LINGJIAN', '零件')" :name="'part'">
          <part ref="confirmPart" />
      </el-tab-pane>
    </iTabsList>
  </iPage>
</template>

<script>
import { iPage, iTabsList } from 'rise'
import productGroup from './components/productgroup'
import part from './components/part'
export default {
  components: { iPage, iTabsList, productGroup, part },
  data() {
    return {
      currentTab: 'productGroup'
    }
  },
  methods: {
    tabChange() {},
    tabLeaveBefore() {}
  },
  computed: {
    permissionKey() {
      return this.$route.path.includes('proconfirm') ? 'PROJECTMGT_SCHEDULINGASSISTANT_PROCONFIRM' : 'PROJECTMGT_SCHEDULINGASSISTANT_PROGRESSCONFIRMSUMMARY'
    }
  }
}
</script>

<style lang="scss" scoped>
.progressConfirm {
  padding: 0;
  padding-top: 10px;
  height: auto;
  overflow: auto;
}
</style>