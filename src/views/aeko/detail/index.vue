<!--
 * @Author: your name
 * @Date: 2021-07-26 16:45:48
 * @LastEditTime: 2021-07-26 17:11:01
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