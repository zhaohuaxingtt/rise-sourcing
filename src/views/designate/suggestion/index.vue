<!--
 * @Author: your name
 * @Date: 2021-05-24 13:53:50
 * @LastEditTime: 2021-05-24 15:33:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\suggestion\index.vue
-->
<template>
  <div class="nomination-sugestion">
    定点建议
    <iButton @click="show">{{ $t("nominationSuggestion.Mujuyusuanguanli") }}</iButton>
    <mouldBudgetManagementDialog :visible.sync="mouldBudgetManagementDialogVisible" />
  </div>
</template>

<script>
import { iButton } from "rise"
import mouldBudgetManagementDialog from "./components/mouldBudgetManagementDialog"

export default {
  components: {
    iButton,
    mouldBudgetManagementDialog 
  },
  data() {
    return {
      mouldBudgetManagementDialogVisible: false
    }
  },
  methods: {
    show() {
      this.mouldBudgetManagementDialogVisible = true
    }
  }
}
</script>