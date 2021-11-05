<!--
 * @Author: Haojiang
 * @Date: 2021-06-28 09:29:08
 * @LastEditTime: 2021-11-02 20:42:10
 * @LastEditors:  
 * @Description: m签字单搜索
 * @FilePath: /front-web/src/views/designate/home/signSheet/components/search/index.vue
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
      <!-- 申请单号 -->
      <el-form-item :label="language('nominationLanguage_ShenQingDanHao','申请单号')">
        <iInput
          v-model="form.nominateId"
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_NOMINATEID|申请单号"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- 零件号 -->
      <el-form-item :label="language('nominationLanguage_LingJianHao', '零件号')">
        <iInput
          v-model="form.partNum"
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_PARTNUM|零件号"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- 询价采购员 -->
      <el-form-item :label="language('CSF','CSF')">
        <iInput
          v-model="form.buyerName"
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_BUYERNAME|CSF"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- LINIE -->
      <el-form-item label="LINIE">
        <iInput
          v-model="form.linieName"
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_LINIENAME|linieName"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- 签字单状态 -->
      <el-form-item :label="language('QIANZIDANZHUANGTAI','签字单状态')">
        <iSelect
          v-model="form.status"
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_STATUS|签字单状态"
          :placeholder="language('LK_QINGXUANZE','请选择')"
        >
          <el-option
            value=""
            :label="language('all','全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.id"
            :label="language(items.key, items.name)"
            v-for="(items, index) in signSheetStatus"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 复核是否截至 -->
      <el-form-item :label="language('FUHESHIFOUJIEZHI','复核是否截至')">
        <iSelect
          v-model="form.isPassCheck"
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_ISPASSCHECK|复核是否截至"
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
      <!-- 会议名称 -->
      <el-form-item :label="language('HUIYIMINGCHENG','会议名称')">
        <iInput
          v-model="form.meetingName"
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_METTINGNAME|会议名称"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- 复核开始日期 -->
      <el-form-item :label="language('JIEZHIQIZHIRIQI','截止起止日期')">
        <iDatePicker
          v-model='form.checkDate'
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_CHECKDATE|截止起止日期"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss">
        </iDatePicker>
      </el-form-item>
      <!-- 签字单号 -->
      <el-form-item :label="language('QIANZIDANHAO','签字单号')">
        <iInput
          v-model="form.signCode"
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_SIGNID|签字单号"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>

import { applyType } from '@/layout/nomination/components/data'
import { form } from '../data'
import {
  signSheetStatus
} from '@/views/designate/home/components/options'

import {
  iSearch,
  iInput,
  iSelect,
  iDatePicker
} from "rise";

export default {
  data() {
    return {
      form,
      ptocessType: applyType,
      signSheetStatus
      
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
    iDatePicker
  },
  mounted() {
    this.form = {
      isPassCheck:false,
      status:3
    }
  },
  beforeDestroy() {
    this.form = {}
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
.designateSearch {
  margin-top: 20px;
}
</style>