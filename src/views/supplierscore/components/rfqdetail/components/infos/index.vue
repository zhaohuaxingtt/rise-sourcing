<!--
 * @Author: your name
 * @Date: 2021-06-22 11:13:15
 * @LastEditTime: 2021-07-02 18:30:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\infos\index.vue
-->
<template>
  <iCard collapse :title="language('JICHUXINXI', '基础信息')" class="infos margin-top20" v-loading="loading">
    <iFormGroup row="4">
      <iFormItem
        v-for="(item, index) in infos"
        label-width="110px"
        :key="index"
        :row="item.row"
        :label="language(item.key, item.name)"
        v-permission.dynamic.auto="item.permissionKey"
      >
        <iText>{{ rfqInfo[item.props] }}</iText>
      </iFormItem>
      <template v-if="showSQE">
        <iFormItem
          v-for="(item, index) in infosSQE"
          :label-width="item.labelWidth||'110px'"
          :key="index"
          :row="item.row"
          :label="language(item.key, item.name)"
        >
          <iText v-if="item.props==='sqeStatus'">{{ rfqInfo[item.props] || $t('未推送') }}</iText>
          <iText v-else>{{ rfqInfo[item.props] }}</iText>
        </iFormItem>
      </template>
    </iFormGroup>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText } from "rise"
import { infos, infosSQE } from "../data"

export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iText
  },
  props: {
    rfqInfo: {
      type: Object,
      require: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    showSQE: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      infos,
      infosSQE,
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