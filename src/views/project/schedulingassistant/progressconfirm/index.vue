<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:26:47
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-07 17:13:04
 * @Description: 进度确认汇总
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\index.vue
-->

<template>
<!------------v-permission.dynamic.auto="permissionKey"--------------------->
  <iPage class="progressConfirm" v-permission.dynamic.auto="permissionKey">
    <iTabsList type="card" @tab-click="tabChange" :before-leave="tabLeaveBefore" v-model="currentTab">
      <el-tab-pane lazy :label="language('CHANPINZU', '产品组')" :name="'productGroup'" v-permission.dynamic.auto="productGroupPermissionKey">
          <productGroup ref="confirmProductGroup"  />
      </el-tab-pane>
      <el-tab-pane lazy :label="language('LINGJIAN', '零件')" :name="'part'" v-permission.dynamic.auto="partPermissionKey">
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
  created() {
    if (this.$route.query.type === 'part') {
      this.currentTab = 'part'
    } else {
      this.currentTab = 'productGroup'
    }
  },
  computed: {
    permissionKey() {
      return !this.$route.path.includes('proconfirm') ? 'PROJECTMGT_SCHEDULINGASSISTANT_PROCONFIRM_PAGE|项目管理-排程助手-排程确认页面' : 'PROJECTMGT_SCHEDULINGASSISTANT_PROGRESSCONFIRMSUMMARY_PAGE|项目管理-排程助手-进度确认汇总页面'
    },
    productGroupPermissionKey() {
      return !this.$route.path.includes('proconfirm') ? 'PROJECTMGT_SCHEDULINGASSISTANT_PROCONFIRM_PRODUCTGROUP|项目管理-排程助手-排程确认-产品组' : 'PROJECTMGT_SCHEDULINGASSISTANT_PROGRESSCONFIRMSUMMARY_PRODUCTGROUP|项目管理-排程助手-进度确认-产品组'
    },
    partPermissionKey() {
      return !this.$route.path.includes('proconfirm') ? 'PROJECTMGT_SCHEDULINGASSISTANT_PROCONFIRM_PART|项目管理-排程助手-排程确认-零件' : 'PROJECTMGT_SCHEDULINGASSISTANT_PROGRESSCONFIRMSUMMARY_PART|项目管理-排程助手-进度确认-零件'
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