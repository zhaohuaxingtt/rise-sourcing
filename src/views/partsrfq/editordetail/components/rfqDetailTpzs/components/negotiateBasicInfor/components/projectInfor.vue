<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-18 11:34:43
 * @LastEditors: zbin
 * @Descripttion: 项目信息
-->
<template>
  <div >
    <div class="info">{{$t('TPZS.XMXX')}}</div>
    <iFormGroup :key="$index" row="4" inline>
      <iFormItem>
        <iLabel :label="'RFQ'" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem>
      <!-- <iFormItem>
        <iLabel :label="$t('LK_CHEXING')" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem> -->
      <iFormItem>
        <iLabel :label="$t('LK_CAILIAOZU')" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="'FS'" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="'FOP'" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="$t('TPZS.MQXTY')" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="$t('TPZS.PLXTY')" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="$t('TPZS.CFXTY')" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel icons="iconxinxitishi" :tip="$t('TPZS.LCHTIPS')" :label="$t('TPZS.FOPQK')" slot="label"></iLabel>
        <iText>
          <icon name="iconbaojiapingfengenzong-jiedian-hong" symbol></icon>
        </iText>
      </iFormItem>
      <iFormItem>
        <iLabel icons="iconxinxitishi" :tip="$t('TPZS.LCHTIPS')" :label="$t('TPZS.MQQK')" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel icons="iconxinxitishi" :tip="$t('TPZS.LCHTIPS')" :label="$t('TPZS.PLQK')" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel icons="iconxinxitishi" :tip="$t('TPZS.LCHTIPS')" :label="$t('TPZS.CFQK')" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem>
      <!-- <iFormItem>
        <iLabel :label="$t('TPZS.CXLC')" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="$t('TPZS.SOPRQ')" slot="label"></iLabel>
        <iText>{{  }}</iText>
      </iFormItem> -->
    </iFormGroup>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import {  iFormItem, iText, iFormGroup, iLabel, icon } from "rise";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {  iFormItem, iText, iFormGroup, iLabel, icon },
  data() {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' >
// @import url(); 引入公共css类
.info {
  font-weight: Bold;
}
.row4[data-v-018a401a] .el-form-item__label{
  width: 8rem !important;
}
</style>
