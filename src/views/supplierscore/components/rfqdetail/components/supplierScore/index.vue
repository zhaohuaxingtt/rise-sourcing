<!--
 * @Author: your name
 * @Date: 2021-06-22 11:36:01
 * @LastEditTime: 2021-06-22 16:56:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\supplierScore\index.vue
-->
<template>
  <div class="supplierScore">
    <score />
    <attachment class="margin-top20" />
  </div>
</template>

<script>
import score from "./components/score"
import attachment from "./components/attachment"

export default {
  components: {
    score,
    attachment
  }
}
</script>

<style lang="scss" scoped>
.supplierScore {}
</style>