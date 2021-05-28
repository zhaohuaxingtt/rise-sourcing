<!--
 * @Author: your name
 * @Date: 2021-05-27 17:37:00
 * @LastEditTime: 2021-05-27 19:05:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\components\infos\index.vue
-->
<template>
  <iCard collapse :title="$t('LK_JICHUXINXI')" class="infos margin-top20">
    <iFormGroup row="4">
      <iFormItem
        v-for="(item, index) in infos"
        label-width="110px"
        :key="index"
        :row="item.row"
        :label="$t(item.key)"
      >
        <iText>{{ infoData[item.props] }}</iText>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText } from "rise"
import { infos } from "../data"
export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iText
  },
  data() {
    return {
      infos,
      infoData: {}
    }
  },
};
</script>

<style lang="scss" scoped>
.infos {
  ::v-deep .el-form-item__content{
    margin-left: 10px!important;
  }

  ::v-deep .cardBody {
    padding-bottom: 5px;
  }
}
</style>