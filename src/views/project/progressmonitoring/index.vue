<!--
 * @Author: Luoshuang
 * @Date: 2021-08-05 14:41:27
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-05 14:46:39
 * @Description: 项目进度监控
 * @FilePath: \front-web\src\views\project\progressmonitoring\index.vue
-->
<template>
  <iPage class="projectoverview">
    <projectTop />
    <comingSoon />
  </iPage>
  
</template>

<script>
import { iPage } from 'rise'
import projectTop from '../components/projectHeader'
import comingSoon from '@/views/project/components/comingSoon'
export default {
  components: { comingSoon, iPage, projectTop }
  
}
</script>