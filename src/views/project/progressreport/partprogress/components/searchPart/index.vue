<!--
 * @Author: Luoshuang
 * @Date: 2021-10-12 10:02:14
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-12 10:21:00
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressreport\partprogress\components\searchPart\index.vue
-->

<template>
  <iSearch :icon="true" class="margin-top20">
    <template slot="button">
      <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
      <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
    </template>
    <el-form>
      <el-form-item v-for="item in searchList" :key="item.value" :label="language(item.key,item.name)">
        <iInput v-if="item.type === 'input'" v-model="searchParams[item.value]" :placeholder="language('QINGSHURU', '请输入')" />
        <!--------------询价采购员下拉----------------------->
        <!-- <fsSelect v-else-if="item.type === 'fsSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" /> -->
        <!--------------项目采购员下拉----------------------->
        <!-- <productPurchaserSelect v-else-if="item.type === 'productPurchaserSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" /> -->
        <!--------------车型项目下拉----------------------->
        <!-- <carProjectSelect v-else-if="item.type === 'carProjectSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" /> -->
        <!--------------字典下拉----------------------->
        <iDicoptions v-else-if="item.type === 'selectDict'" :optionAll="false" :optionKey="item.selectOption" v-model="searchParams[item.value]" />
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iButton, iInput } from 'rise'
import iDicoptions from 'rise/web/components/iDicoptions' 
export default {
  components: { iSearch, iButton, iInput, iDicoptions },
  data() {
    return {
      searchList: [
        {value: 'confirmStatus', name: 'FG组', key: 'FGZU', type: 'selectDict', selectOption: 'PART_SCHEDULE_CONFIRM_STATUS'},
        {value: 'partNum', name: '询价采购员', key: 'XUNJIACAIGOUYUAN', type: 'input'},
        {value: 'partNum', name: '供应商', key: 'GONGYINGSHANG', type: 'input'},
      ],
      searchParams: {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>