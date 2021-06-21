<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: 概览
-->
<template>
  <iCard collapse>
    <div slot="header" class="title">
      <div>{{$t('TPZS.PLGYSGL')}}</div>
      <div>
        <iButton>{{$t('TPZS.GYS360')}}</iButton>
        <iButton>{{$t('costanalysismanage.BeiZhu')}}</iButton>
      </div>
    </div>
    <pie :chartData="[
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' }
          ]" />
  </iCard>
</template>

<script>
import { iCard, iButton, iLabel, iFormGroup, iFormItem, iSelect } from "rise";
import pie from "./pie";
export default {
  components: { iCard, iButton, iLabel, iFormGroup, iFormItem, iSelect, pie },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style>
.title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>