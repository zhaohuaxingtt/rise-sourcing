<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
  <iSearch
    class="designateSearch margin-bottom20"
    @sure="sure"
    @reset="reset"
    :resetKey="NORNIMATION_RESETBUTTON"
    :searchKey="NORNIMATION_CONFIRMBUTTON"
  >
    <el-form>
      <!-- 零件号 -->
      <el-form-item :label="$t('nominationLanguage.LingJianHao')">
        <iInput
          v-model="form.partNum"
          :placeholder="$t('LK_QINGSHURU')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        ></iInput>
      </el-form-item>
      <!-- 申请单号 -->
      <el-form-item :label="$t('nominationLanguage.ShenQingDanHao')">
        <iInput
          v-model="form.nominateId"
          :placeholder="$t('LK_QINGSHURU')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        ></iInput>
      </el-form-item>
        <!-- RFQ编号 -->
      <el-form-item :label="$t('nominationLanguage.RFQBianHao')">
        <iInput
          v-model="form.rfqIq"
          :placeholder="$t('LK_QINGSHURU')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        ></iInput>
      </el-form-item>
      <!-- 流程类型 -->
      <el-form-item :label="$t('nominationLanguage.LiuChengLeiXing')">
        <iSelect
          v-model="form.nominateProcessType"
          :placeholder="$t('LK_QINGXUANZE')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        >
          <el-option
            value=""
            :label="$t('all') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.id"
            :label="items.name"
            v-for="(items, index) in ptocessType"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 申请状态 -->
      <el-form-item :label="$t('nominationLanguage.ShenQingZhuangTai')">
        <iSelect
          v-model="form.applicationStatus"
          :placeholder="$t('LK_QINGXUANZE')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        >
          <el-option
            value=""
            :label="$t('all') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.id"
            :label="items.name"
            v-for="(items, index) in applyStates"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
        <!-- FSNR/GSNR -->
      <el-form-item label="FSNR/GSNR">
        <iInput
          v-model="form.buyerName"
          :placeholder="$t('LK_QINGSHURU')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        ></iInput>
      </el-form-item>
      <!-- 零件名 -->
      <el-form-item :label="$t('nominationLanguage.LingJianMing')">
        <iInput
          v-model="form.partNameZh"
          :placeholder="$t('LK_QINGSHURU')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        ></iInput>
      </el-form-item>
      <!-- 询价采购员 -->
      <el-form-item :label="$t('nominationLanguage.XunJiaCaiGouYuan')">
        <iInput
          v-model="form.buyerName"
          :placeholder="$t('LK_QINGSHURU')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        ></iInput>
      </el-form-item>
      <!-- LINE -->
      <el-form-item label="LINE">
        <iInput
          v-model="form.linieNameZh"
          :placeholder="$t('LK_QINGSHURU')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        ></iInput>
      </el-form-item>
      <!-- 车型项目 -->
      <el-form-item :label="$t('nominationLanguage.CheXingXiangMu')">
        <iSelect
          v-model="form.carTypeProj"
          :placeholder="$t('LK_QINGXUANZE')"
          v-permission="PARTSPROCURE_PARTNUMBER"
          filterable
          clearable
        >
          <el-option
            value=""
            :label="$t('all') | capitalizeFilter"
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
      <!-- 报价一致性校验 -->
      <el-form-item :label="$t('nominationLanguage.BaoJiaYiZhiXingJiaoYan')">
        <iSelect
          v-model="form.isPriceConsistent"
          :placeholder="$t('LK_QINGXUANZE')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        >
          <el-option
            value=""
            :label="$t('all') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.key"
            :label="items.value"
            v-for="(items, index) in []"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 是否单一供应商 -->
      <el-form-item :label="$t('nominationLanguage.ShiFouDnaYiGongYingShang')">
        <iSelect
          v-model="form.singleSourcing"
          :placeholder="$t('LK_QINGXUANZE')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        >
          <el-option
            value=""
            :label="$t('all') | capitalizeFilter"
          ></el-option>
          <el-option :value="true" :label="$t('nominationLanguage.Yes')"
          ></el-option>
          <el-option :value="false" :label="$t('nominationLanguage.No')"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 显示自己 -->
      <el-form-item :label="$t('nominationLanguage.XianShiZiJi')">
        <iSelect
          v-model="form.showMe"
          :placeholder="$t('LK_QINGXUANZE')"
          v-permission="PARTSPROCURE_PARTNUMBER"
        >
          <el-option
            value=""
            :label="$t('all') | capitalizeFilter"
          ></el-option>
          <el-option :value="true" :label="$t('nominationLanguage.Yes')"
          ></el-option>
          <el-option :value="false" :label="$t('nominationLanguage.No')"
          ></el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>

import { applyType } from '@/layout/nomination/components/data'
import { form, applyStates } from '../data'
import {
  iSearch,
  iInput,
  iSelect
} from "rise";

export default {
  data() {
    return {
      form,
      ptocessType: applyType,
      applyStates
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect
  },
  mounted() {
    console.log(this)
  },
  methods: {
    sure() {
      this.$emit('search', this.form)
    },
    reset() {
      this.form = {}
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
.designateSearch {
  margin-top: 20px;
}
</style>