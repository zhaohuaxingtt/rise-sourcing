<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 15:16:38
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-26 10:59:48
 * @Description: 配件详情
 * @FilePath: \front-web\src\views\accessoryPart\accessoryPartDetail\index.vue
-->

<template>
  <iPage>
    <topComponents>
      <span slot="left" class="floatleft font20 font-weight">
        配件编号：SVZC5052
      </span>
    </topComponents>
    <iCard title="基础信息">
      <iFormGroup row="4" class="accessoryPartDetail">
        <iFormItem v-for="(item, index) in detailList" :key="index" :label="item.label" :class="item.row ? 'row'+item.row : ''">
          <iText>{{detailData[item.value]}}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iFormGroup, iFormItem, iText } from 'rise'
import topComponents from '../../designate/designatedetail/components/topComponents'
import { detailList } from './data'
export default {
  components: { iPage, topComponents, iCard, iFormGroup, iFormItem, iText },
  data() {
    return {
      detailList,
      detailData: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.accessoryPartDetail {
  .el-form-item {
    ::v-deep .el-form-item__label {
      width: 150px;
    }
  }
}
</style>