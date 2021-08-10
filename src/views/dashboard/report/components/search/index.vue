<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 新建签字单嵌入的定点管理页面
-->
<template>
  <iSearch
    @sure="sure"
    @reset="reset"
    :resetKey="NORNIMATION_RESETBUTTON"
    :searchKey="NORNIMATION_CONFIRMBUTTON"
  >
    <el-form>
      <!-- 车型项目 -->
      <el-form-item :label="language('nominationLanguage_CheXingXiangMu','车型项目')">
        <iSelect
          v-model="form.carTypeProj"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          filterable
          clearable
        >
          <el-option
            value=""
            :label="language('all','全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.code"
            :label="items.value"
            v-for="(items, index) in ($attrs && $attrs.carTypeList) || []"
            :key="index"
            style="max-width: 190px"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 零件号 -->
      <el-form-item :label="language('nominationLanguage_LingJianHao', '零件号')">
        <iInput
          v-model="form.partNum"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- RFQ编号 -->
      <el-form-item :label="language('nominationLanguage.RFQBianHao','RFQ编号')">
        <iInput
          v-model="form.rfqIq"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- 排序 -->
      <el-form-item :label="language('strategicdoc_PaiXu','排序')">
        <iSelect
          v-model="form.applicationStatus"
          :placeholder="language('LK_QINGXUANZE','请选择')"
        >
          <el-option
            value=""
            :label="language('all','全部') | capitalizeFilter"
          ></el-option>
          <el-option :value="'A'" :label="language('LK_ANRENWUZHUANGTAI','按任务状态')"
          ></el-option>
          <el-option :value="'B'" :label="language('LK_ZHENGCHEJINGDUFENGXIAN','按整车进度风险')"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 材料组 -->
      <el-form-item :label="language('LK_CAILIAOZU','材料组')">
        <iSelect
          v-model="form.applicationStatus"
          :placeholder="language('LK_QINGXUANZE','请选择')"
        >
          <el-option
            value=""
            :label="language('all','全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.id"
            :label="language(items.key, items.name)"
            v-for="(items, index) in []"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 采购员 -->
      <el-form-item :label="language('LK_CAIGOUYUAN','采购员')">
        <iSelect
          v-model="form.applicationStatus"
          :placeholder="language('LK_QINGXUANZE','请选择')"
        >
          <el-option
            value=""
            :label="language('all','全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.id"
            :label="language(items.key, items.name)"
            v-for="(items, index) in []"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      
      
    </el-form>
  </iSearch>
</template>

<script>

import { applyType } from '@/layout/nomination/components/data'
// import { form } from '../data'
import {
  applicationStatus,
  signSheetselStatus,
  priceConsistentStatus 
} from '@/views/designate/home/components/options'

import {
  iSearch,
  iInput,
  iSelect
} from "rise";

export default {
  data() {
    return {
      form: {},
      ptocessType: applyType,
      applicationStatus,
      selStatus: signSheetselStatus,
      priceConsistentStatus
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
  },
  mounted() {
  },
  methods: {
    sure() {
      this.$emit('search', this.form)
    },
    reset() {
      this.form = {}
      this.$emit('search', {})
    }
  },
  // watch: {
  //   form: {
  //     handler(newVal) {
  //       this.$nextTick(() => {
          
  //       })
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>
</style>