<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-10-14 09:56:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-15 14:48:32
 * @Description: 零件清单页面
-->
<template>
  <iPage>
    <!-- AEKO CSF AEKO审批分配人 跳到指定的零件清单页面 -->
    <partList v-if="userRole && userRole.isCSFAEKOFENPEI" />
    <indexPage v-else />
  </iPage>
</template>
<script>
import {iPage} from 'rise';
import indexPage from './index'
import partList from './partList'
import {roleMixins} from '@/utils/roleMixins'

export default {
  mixins: [roleMixins],
  components: {
    indexPage,
    partList,
    iPage,
  }
}
</script>