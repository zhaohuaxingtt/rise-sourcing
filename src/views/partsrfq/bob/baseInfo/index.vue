<!--
 * @Author: xuxin
 * @Date: 2021-06-16 10:41:04
 * @Description: 谈判基本信息主页面
 * @FilePath: \front-web\src\views\bob\baseInfo\index.vue
-->
<template>
  <div class="base-info">
    <iCard :title="$t('项目概览')+':'+reqID">
      <info-list></info-list>
    </iCard>
  </div>
</template>

<script>
import {iCard} from "rise"
import infoList from './components/infoList.vue'
export default {
  components:{
    iCard,
    infoList
  },
  data(){
    return {
      reqID:'1232132'
    }
  }
}
</script>

<style>

</style>