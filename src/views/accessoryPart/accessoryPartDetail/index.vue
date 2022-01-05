<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 15:16:38
 * @LastEditors: Luoshuang
 * @LastEditTime: 2022-01-05 21:37:03
 * @Description: 配件详情
 * @FilePath: \front-sourcing\src\views\accessoryPart\accessoryPartDetail\index.vue
-->

<template>
  <iPage v-permission.auto="ACCESSORYPART_DETAILINFO_PAGE|配件详情页面">
    <topComponents logModuleName="配件需求" logBizIdKey="spNum" optionDicKey2="配件需求详情页">
      <span slot="left" class="floatleft font20 font-weight">
        {{language('PEIJIANBIANHAO','配件编号')}}：{{detailData.partNum}}
      </span>
    </topComponents>
    <iCard :title="language('JICHUXINXI','基础信息')">
      <iFormGroup row="4" class="accessoryPartDetail">
        <iFormItem v-for="(item, index) in detailList" :key="index" :label="language(item.key,item.label)" :class="item.row ? 'row'+item.row : ''" v-permission.dynamic.auto="item.permission">
          <iText>{{detailData[item.value] ? detailData[item.value].desc || detailData[item.value] : ''}}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
    <fileTable v-permission.auto="ACCESSORYPART_DETAILINFO_TECATTACHMENT|配件详情页面-技术询价资料" ref="tec" class="margin-top20" :title="language('JISHUXUNJIAZILIAO', '技术询价资料')" fileType="ACCESSORY_TEC_ATTACHMENT" :hostId="detailData.id" />
    <fileTable v-permission.auto="ACCESSORYPART_DETAILINFO_PACHAGEATTACHMENT|配件详情页面-包装询价资料" ref="package" class="margin-top20" :title="language('BAOZHUANGXUNJIAZILIAO', '包装询价资料')" fileType="ACCESSORY_PACKAGE_ATTACHMENT" :hostId="detailData.id" />
  </iPage>
</template>

<script>
import { iPage, iCard, iFormGroup, iFormItem, iText } from 'rise'
import topComponents from '../../designate/designatedetail/components/topComponents'
import { detailList, fileTableTitle } from './data'
import { getAccessoryOneInfo } from '@/api/accessoryPart/index'
import { iMessage } from '../../../components'
import fileTable from "./components/fileTable"

export default {
  components: { iPage, topComponents, iCard, iFormGroup, iFormItem, iText, fileTable },
  data() {
    return {
      detailList,
      detailData: {},
      pageLoading: false,
      fileTableTitle
    }
  },
  created() {
    if (this.$route.query.spNum) {
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      getAccessoryOneInfo(this.$route.query.spNum).then(res => {
        if (res.result) {
          this.detailData = res.data
          this.$nextTick(() => {
            this.$refs.tec.getFiles()
            this.$refs.package.getFiles()
          })
        } else {
          this.detailData = {}
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).catch((err) => {
        console.log(err)
        this.pageLoading = false
      })
    }
  }
}
</script>