<!--
 * @Author: your name
 * @Date: 2021-06-22 11:13:15
 * @LastEditTime: 2021-06-22 15:49:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\infos\index.vue
-->
<template>
  <iCard collapse :title="$t('LK_JICHUXINXI')" class="infos margin-top20" v-loading="loading">
    <iFormGroup row="4">
      <iFormItem
        v-for="(item, index) in infos"
        label-width="110px"
        :key="index"
        :row="item.row"
        :label="$t(item.key)"
      >
        <iText>{{ partInfo[item.props] }}</iText>
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
  props: {
    partInfo: {
      type: Object,
      require: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      infos
    }
  }
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