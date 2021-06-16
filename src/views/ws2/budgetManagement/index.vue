<template>
  <div>
    <iNavMvp
        :lev='2'
        :routerPage="true"
        :list="budgetManagement3rd"
    ></iNavMvp>
  </div>
</template>

<script>
import {budgetManagement3rd} from "pages/ws2/budgetManagement/components/data";

export default {
  data() {
    return {
      tabtitle: budgetManagement3rd,

    }
  }
}
</script>

<style scoped>

</style>