<!--
 * @Author: Haojiang
 * @Date: 2021-06-28 09:29:08
 * @LastEditTime: 2021-12-01 14:44:35
 * @LastEditors: Luoshuang
 * @Description: m签字单搜索
 * @FilePath: \front-sourcing\src\views\designate\home\signSheet\components\search\index.vue
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
      <el-form-item :label="language('nominationLanguage_ShenQingDanHao','申请单号')" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_NOMINATEID|申请单号">
        <iInput
          type="number"
          clearable
          v-model="form.nominateId"
          :placeholder="language('LK_QINGSHURU','请输入')"
          @input="form.nominateId = numberProcessor(form.nominateId, 0)"
        ></iInput>
      </el-form-item>
      <!-- 零件号 -->
      <el-form-item :label="language('nominationLanguage_LingJianHao', '零件号')" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_PARTNUM|零件号">
        <!-- <iInput
          clearable
          v-model="form.partNum"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput> -->
        <iMultiLineInput v-model="form.partNum" :title="language('nominationLanguage_LingJianHao','零件号')" />
      </el-form-item>
      <!-- 询价采购员 -->
      <el-form-item :label="language('CSF','CSF')" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_BUYERNAME|CSF">
        <iInput
          clearable
          v-model="form.buyerName"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- LINIE -->
      <el-form-item label="LINIE" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_LINIENAME|linieName">
        <iInput
          clearable
          v-model="form.linieName"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- 签字单状态 -->
      <el-form-item :label="language('QIANZIDANZHUANGTAI','签字单状态')" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_STATUS|签字单状态">
        <iSelect
          clearable
          v-model="form.status"
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
      <el-form-item :label="language('FUHESHIFOUJIEZHI','复核是否截至')" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_ISPASSCHECK|复核是否截至">
        <iSelect
          clearable
          v-model="form.isPassCheck"
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
      <el-form-item :label="language('HUIYIMINGCHENG','会议名称')" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_METTINGNAME|会议名称">
        <iInput
          clearable
          v-model="form.meetingName"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput>
      </el-form-item>
      <!-- 复核开始日期 -->
      <el-form-item :label="language('JIEZHIQIZHIRIQI','截止起止日期')" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_CHECKDATE|截止起止日期">
        <iDatePicker
          clearable
          v-model='form.checkDate'
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss">
        </iDatePicker>
      </el-form-item>
      <!-- 签字单号 -->
      <el-form-item :label="language('QIANZIDANHAO','签字单号')" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_SIGNID|签字单号">
        <iInput
          clearable
          v-model="form.signCode"
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
import { numberProcessor } from '@/utils' 
import {
  iSearch,
  iInput,
  iSelect,
  iDatePicker,
  iMultiLineInput
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
    iDatePicker,
    iMultiLineInput
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
    numberProcessor,
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
  ::v-deep .el-date-editor .el-range__close-icon{
      display: block;
      width: 10px;
  }
}
</style>