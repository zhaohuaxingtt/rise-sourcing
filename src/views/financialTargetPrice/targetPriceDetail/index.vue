<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:47:09
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-23 17:02:28
 * @Description: 目标价详情
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\index.vue
-->

<template>
  <iPage class="targetPriceDetail">
    <div class="font20 font-weight">零件号：3df4324432</div>
    <!------------------------------------------------------------------------>
    <!--                 基础信息                                          --->
    <!------------------------------------------------------------------------>
    <basic @changeIsEdit="changeBasicIsEdit" :isEdit="basicIsEdit" @handleCancel="handleBasicCancel" @handleSave="handleBasicSave"></basic>
    <!------------------------------------------------------------------------>
    <!--                 修改历史                                          --->
    <!------------------------------------------------------------------------>
    <history />
    <!------------------------------------------------------------------------>
    <!--                 定点信息                                          --->
    <!------------------------------------------------------------------------>
    <designateInfo />
  </iPage>
</template>

<script>
import { iPage, iCard } from 'rise'
import history from './components/history'
import basic from './components/basic'
import designateInfo from './components/designateInfo'
export default {
  components: {iPage,iCard,history,basic,designateInfo},
  data() {
    return {
      basicIsEdit: false,
    }
  },
  methods: {
    /**
     * @Description: 保存基础信息编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleBasicSave() {
      this.changeBasicIsEdit(false)
    },
    /**
     * @Description: 取消基础信息编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleBasicCancel() {
      this.changeBasicIsEdit(false)
    },
    /**
     * @Description: 切换基础信息部分编辑状态
     * @Author: Luoshuang
     * @param {*} isEdit
     * @return {*}
     */    
    changeBasicIsEdit(isEdit) {
      this.basicIsEdit = isEdit
    }
  }
}
</script>

<style lang="scss" scoped>

</style>