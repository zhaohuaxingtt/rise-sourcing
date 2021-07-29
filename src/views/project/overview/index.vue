<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:06:56
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-29 15:28:06
 * @Description: 项目管理概览
 * @FilePath: \front-web\src\views\project\overview\index.vue
-->

<template>
  <iPage class="projectoverview">
    <projectTop />
    <iCard ></iCard>
  </iPage>
</template>

<script>
import { iPage, iCard } from "rise"
import projectTop from '../components/projectHeader'
export default {
  components: { iPage, projectTop, iCard },
}
</script>

<style lang="scss" scoped>

</style>