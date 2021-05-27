<!--
 * @Author: your name
 * @Date: 2021-05-27 17:27:15
 * @LastEditTime: 2021-05-27 19:08:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\index.vue
-->
<template>
  <iPage class="rfqdetail">
    <infos />
    <partList class="margin-top20" />
  </iPage>
</template>

<script>
import { iPage } from "rise"
import infos from "./components/infos"
import partList from "./components/partList"

export default {
  components: {
    iPage,
    infos,
    partList
  }
}
</script>

<style lang="scss" scoped>
.rfqdetail {

}
</style>