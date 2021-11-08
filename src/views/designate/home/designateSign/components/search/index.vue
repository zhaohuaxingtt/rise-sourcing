<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 新建签字单嵌入的定点管理页面
-->
<template>
  <iSearch
    class="designateSearch"
    @sure="sure"
    @reset="reset"
    :resetKey="NORNIMATION_RESETBUTTON"
    :searchKey="NORNIMATION_CONFIRMBUTTON"
  >
    <el-form>
      <!-- 零件号 -->
      <el-form-item :label="language('nominationLanguage_LingJianHao', '零件号')">
        <iInput
          v-model="form.partNum"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- 零件号 -->
      <el-form-item :label="language('nominationLanguage_LingJianMing', '零件名')">
        <iInput
          v-model="form.partName"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- FSNR/GSNR -->
      <el-form-item label="FSNR/GSNR">
        <iInput
          v-model="form.fsnrGsnrNum"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
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
            v-for="(items, index) in (formOptions && formOptions.CAR_TYPE_PRO) || []"
            :key="index"
            style="max-width: 190px"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 询价采购员 -->
      <el-form-item :label="language('nominationLanguage_XunJiaCaiGouYuan','询价采购员')">
        <iInput
          v-model="form.buyerName"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- LINIE -->
      <el-form-item label="LINIE">
        <iInput
          v-model="form.linieName"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- 申请单号 -->
      <el-form-item :label="language('nominationLanguage_ShenQingDanHao','申请单号')">
        <iInput
          v-model="form.nominateId"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- 会议 -->
      <el-form-item :label="language('nominationLanguage_HuiYi', '会议')">
        <iInput
          v-model="form.meetingName"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- 复核截止日期 -->
      <el-form-item :label="language('FUHEJIEZHIQIZHIRIQI','复核截止起止日期')">
        <iDatePicker
          v-model='form.checkDate'
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss">
        </iDatePicker>
      </el-form-item>
      <!-- 申请状态 -->
      <el-form-item :label="language('nominationLanguage_ShenQingZhuangTai','申请状态')">
        <iSelect
          disabled
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
            v-for="(items, index) in applicationStatus"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 是否单一供应商 -->
      <el-form-item :label="language('nominationLanguage_ShiFouDnaYiGongYingShang','是否单一供应商')">
        <iSelect
          v-model="form.singleSourcing"
          :placeholder="language('LK_QINGXUANZE','请选择')"
        >
          <el-option
            value=""
            :label="language('all','全部') | capitalizeFilter"
          ></el-option>
          <el-option :value="true" :label="language('YES','是')"
          ></el-option>
          <el-option :value="false" :label="language('NO','否')"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- SEL单据确认状态 -->
      <el-form-item :label="language('SELDANJUQUERENZHUANGTAI','SEL单据确认状态')">
        <iSelect
          v-model="form.selStatus"
          :placeholder="language('LK_QINGXUANZE','请选择')"
        >
          <el-option value="" :label="language('ALL','全部')"></el-option>
          <el-option
            :value="items.id"
            :label="language(items.key, items.name)"
            v-for="(items, index) in selStatus"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 报价一致性校验 -->
      <el-form-item :label="language('nominationLanguage_BaoJiaYiZhiXingJiaoYan','报价一致性校验')">
        <iSelect
          disabled
          v-model="form.isPriceConsistent"
          :placeholder="language('LK_QINGXUANZE','请选择')"
        >
          <el-option
            value=""
            :label="language('all','全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.id"
            :label="language(items.key, items.name)"
            v-for="(items, index) in priceConsistentStatus"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>

import { applyType } from '@/layout/nomination/components/data'
import { form } from '../data'
import {
  applicationStatus,
  signSheetselStatus,
  priceConsistentStatus 
} from '@/views/designate/home/components/options'
import {selectDictByKeyss} from '@/api/dictionary'
import { cloneDeep } from "lodash"

import {
  iSearch,
  iInput,
  iSelect,
  iDatePicker
} from "rise";

export default {
  data() {
    return {
      form: cloneDeep(form),
      ptocessType: applyType,
      applicationStatus,
      selStatus: signSheetselStatus,
      priceConsistentStatus,
      // 下拉
      formOptions: {}
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
    iDatePicker
  },
  mounted() {
    // 获取车型项目
    this.getOptions()
  },
  methods: {
    sure() {
      this.$emit('search', this.form)
    },
    reset() {
      this.form = cloneDeep(form)
      this.$emit('search', this.form)
    },
    getOptions() {
      let types = [
        "CAR_TYPE_PRO",
      ];
      selectDictByKeyss(types).then((res) => {
        this.formOptions = res.data;
      });
    },
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