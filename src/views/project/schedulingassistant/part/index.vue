<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 13:59:40
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-24 11:14:55
 * @Description: 零件排程页面
 * @FilePath: \front-web\src\views\project\schedulingassistant\part\index.vue
-->

<template>
  <iPage class="schedulePart">
    <!---------------------------------------------------------------------->
    <!----------                  车型项目部分                   ---------------->
    <!---------------------------------------------------------------------->
    <carProject :carProjectId="carProject" :collapse="true" @handleCarProjectChange="handleCarProjectChange" />
  </iPage>
</template>

<script>
import {iPage} from 'rise'
import carProject from '@/views/project/components/carprojectprogress'
export default {
  components: { iPage, carProject },
  data() {
    return {
      carProject: ''
    }
  },
  methods: {
    handleCarProjectChange(carProjectId, carProjectName) {
      
    }
  }
  
}
</script>

<style lang="scss" scoped>
.schedulePart {
  padding: 0;
  padding-top: 10px;
  height: auto;
  overflow: auto;
}
</style>