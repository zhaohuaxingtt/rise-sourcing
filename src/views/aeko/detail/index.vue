<!--
 * @Author: your name
 * @Date: 2021-07-26 16:45:48
 * @LastEditTime: 2021-07-27 20:02:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aekomanage\detail\index.vue
-->
<template>
  <iPage class="aekodetail">
    <iTabsList class="margin-top20" type="card" v-model="currentTab" @tab-click="tabChange">
      <!-- language(tab.key, tab.label) -->
      <el-tab-pane v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="tab.label" :name="tab.name">
        <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" />
      </el-tab-pane>
    </iTabsList>
  </iPage>
</template>

<script>
import { iPage, iTabsList } from "rise"
import contentDeclare from "./components/contentDeclare"

export default {
  components: { iPage, iTabsList, contentDeclare },
  data() {
    return {
      currentTab: "contentDeclare",
      tabs: [
        { label: "内容表态", name: "contentDeclare", key: "NEIRONGBIAOTAI", components: [ "contentDeclare" ] },
        { label: "封⾯表态", name: "a", key: "FENGMIANBIAOTAI", components: [] },
        { label: "零件清单", name: "b", key: "LINGJIANQINGDAN", components: [] },
        { label: "审批附件", name: "c", key: "SHENPIFUJIAN", components: [] },
        { label: "审批记录", name: "d", key: "SHENPIFUJIAN", components: [] }
      ],
    }
  },
  methods: {
    tabChange() {}
  }
}
</script>

<style lang="scss" scoped>
.aekodetail {}
</style>