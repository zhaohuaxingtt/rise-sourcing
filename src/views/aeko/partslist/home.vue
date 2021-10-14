<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-10-14 09:56:45
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-14 11:06:21
 * @Description: 零件清单页面
-->
<template>
  <div>
    <!-- AEKO CSF AEKO审批分配人 跳到指定的零件清单页面 -->
    <partList v-if="userRole && userRole.isCSFAEKOFENPEI" />
    <indexPage v-else />
  </div>
</template>
<script>
import indexPage from './index'
import partList from './partList'
import {roleMixins} from '@/utils/roleMixins'

export default {
  mixins: [roleMixins],
  components: {
    indexPage,
    partList
  }
}
</script>