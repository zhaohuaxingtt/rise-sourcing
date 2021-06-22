<!--
 * @Author: your name
 * @Date: 2021-06-18 16:52:01
 * @LastEditTime: 2021-06-19 13:36:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\search.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-06-18 16:41:16
 * @LastEditTime: 2021-06-18 16:46:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\serch.vue
-->
<template>
  <div class="search">
    <el-card :body-style="{height:'579px'}">
      <el-form>
        <el-form-item :label="$t('LK_CAILIAOZU')">
          <iInput placeholder="请输入"></iInput>
        </el-form-item>`
        <el-form-item :label="$t('LK_RFQHAO')">
          <iInput placeholder="请输入"></iInput>
        </el-form-item>
        <el-form-item :label="$t('LK_FSHAO')">
          <iInput placeholder="请输入"></iInput>
        </el-form-item>
        <el-form-item :label="$t('partsprocure.PARTSPROCUREPARTNUMBER')">
          <iInput placeholder="请输入"></iInput>
        </el-form-item>
      </el-form>
      <div class="flex flex-center-center">
        <iButton
          @click="$emit('sure')"
          :v-permission="searchKey"
        >{{ $t('LK_INQUIRE') }}</iButton>
        <iButton
          @click="$emit('reset')"
          :v-permission="resetKey"
        >{{ $t('LK_ZHONGZHI') }}</iButton>
      </div>
    </el-card>
  </div>
</template>

<script>
import {  iButton, iInput } from "rise";
export default {
  components: {
    iButton,
    iInput,
  },
};
</script>

<style lang="scss" scoped>
.search{
  height:579px
}
</style>