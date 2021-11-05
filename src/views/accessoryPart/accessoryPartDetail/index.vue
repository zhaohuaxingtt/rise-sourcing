<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 15:16:38
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-21 13:59:03
 * @Description: 配件详情
 * @FilePath: \front-web\src\views\accessoryPart\accessoryPartDetail\index.vue
-->

<template>
  <iPage v-loading="pageLoading">
    <topComponents>
      <span slot="left" class="floatleft font20 font-weight">
        {{language('PEIJIANBIANHAO','配件编号')}}：{{detailData.partNum}}
      </span>
    </topComponents>
    <iCard :title="language('JICHUXINXI','基础信息')">
      <iFormGroup row="4" class="accessoryPartDetail">
        <iFormItem v-for="(item, index) in detailList" :key="index" :label="language(item.key,item.label)" :class="item.row ? 'row'+item.row : ''">
          <iText>{{detailData[item.value] ? detailData[item.value].desc || detailData[item.value] : ''}}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iFormGroup, iFormItem, iText } from 'rise'
import topComponents from '../../designate/designatedetail/components/topComponents'
import { detailList } from './data'
import { getAccessoryOneInfo } from '@/api/accessoryPart/index'
import { iMessage } from '../../../components'
export default {
  components: { iPage, topComponents, iCard, iFormGroup, iFormItem, iText },
  data() {
    return {
      detailList,
      detailData: {},
      pageLoading: false
    }
  },
  created() {
    if (this.$route.query.spNum) {
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      this.pageLoading = true
      getAccessoryOneInfo(this.$route.query.spNum).then(res => {
        if (res.result) {
          this.detailData = res.data
        } else {
          this.detailData = {}
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.pageLoading = false
      })
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