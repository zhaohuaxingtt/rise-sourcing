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
      <el-form-item :label="language('nominationLanguage_LingJianHao', '零件号')">
        <iInput
          v-model="form.partNum"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_PARTNUM|零件号"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 申请单号 -->
      <el-form-item :label="language('nominationLanguage_ShenQingDanHao','申请单号')">
        <iInput
          v-model="form.nominateId"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_NOMINATEID|申请单号"
          clearable
        ></iInput>
      </el-form-item>
        <!-- RFQ编号 -->
      <el-form-item :label="language('nominationLanguage_RFQBianHao','RFQ编号')">
        <iInput
          v-model="form.rfqId"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_RFQID|RFQ编号"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 流程类型 -->
      <el-form-item :label="language('nominationLanguage_LiuChengLeiXing','流程类型')">
        <iSelect
          v-model="form.nominateProcessType"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          v-permission.auto="SOURCING_NOMINATION_NOMINATEPROCESSTYPE|流程类型"
          @change="onNomiProcessTypeChange"
          clearable
        >
          <el-option
            value=""
            :label="language('all','全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.id"
            :label="language(items.key, items.name)"
            v-for="(items, index) in ptocessType"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 申请状态 -->
      <el-form-item :label="language('nominationLanguage_ShenQingZhuangTai','申请状态')">
        <iSelect
          v-model="form.applicationStatus"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          v-permission.auto="SOURCING_NOMINATION_APPLICATIONSTATUS|申请状态"
          clearable
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
        <!-- FSNR/GSNR -->
      <el-form-item label="零件采购项目号/GSNR">
        <iInput
          v-model="form.fsnrGsnrNum"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_FSNRGSNRNUM|零件采购项目号GSNR"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 零件名 -->
      <el-form-item :label="language('nominationLanguage_LingJianMing','零件名')">
        <iInput
          v-model="form.partNameCn"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_PARTNAMECN|零件名"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 询价采购员 -->
      <el-form-item :label="language('nominationLanguage_XunJiaCaiGouYuan','询价采购员')">
        <iInput
          v-model="form.buyerName"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- LINIE -->
      <el-form-item label="LINIE">
        <iInput
          v-model="form.linieName"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_LINIENAME|LINIE"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 车型项目 -->
      <el-form-item :label="language('nominationLanguage_CheXingXiangMu','车型项目')">
        <!-- <iDicoptions v-model="form.carTypeProj" :optionKey="'CAR_TYPE_PRO'" /> -->
        <iSelect
          v-model="form.carTypeProj"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          v-permission.auto="SOURCING_NOMINATION_CARTYPEPRO|车型项目"
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
            v-for="(items, index) in (fromGroup && fromGroup.CAR_TYPE_PRO) || []"
            :key="index"
            style="max-width: 190px"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 报价一致性校验 -->
      <el-form-item :label="language('nominationLanguage_BaoJiaYiZhiXingJiaoYan','报价一致性校验')">
        <iSelect
          v-model="form.isPriceConsistent"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          v-permission.auto="SOURCING_NOMINATION_ISPRICECONSISTENT|报价一致性校验"
          clearable
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
      <!-- 是否单一供应商 -->
      <el-form-item :label="language('nominationLanguage_ShiFouDnaYiGongYingShang','是否单一供应商')">
        <iSelect
          v-model="form.singleSourcing"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          v-permission.auto="SOURCING_NOMINATION_SINGLESOURCING|是否单一供应商"
          clearable
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
      <!-- 显示自己 -->
      <el-form-item :label="language('nominationLanguage_XianShiZiJi','显示自己')">
        <iSelect
          v-model="form.showMe"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          v-permission.auto="SOURCING_NOMINATION_SHOWME|显示自己"
          clearable
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
    </el-form>
  </iSearch>
</template>

<script>

import { applyType } from '@/layout/nomination/components/data'
import {
  priceConsistentStatus,
  nomiApplicationStatus,
  nomiApplicationObject
} from '@/views/designate/home/components/options'
import {selectDictByKeyss} from '@/api/dictionary'
import { form } from '../data'
// import iDicoptions from 'rise/web/components/iDicoptions'
import {
  iSearch,
  iInput,
  iSelect
} from "rise";

export default {
  data() {
    return {
      form,
      fromGroup: {},
      ptocessType: applyType,
      nomiApplicationStatus,
      priceConsistentStatus,
      applicationStatus: []
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
    // iDicoptions
  },
  mounted() {
    this.form = { 
      showMe:true, // 默认显示自己
    }
    const acceptKeys = ['nominateProcessType', 'applicationStatus', 'currentUser', 'isDelay']
    Object.keys(this.$route.query).forEach(key => {
      const keyValue = this.$route.query[key]
      // 判断寻源概览过来的参数为查询流转中，只有流转中需要带参数
      if (key === 'nominateProcessType') {
        this.onNomiProcessTypeChange(keyValue)
      }
        acceptKeys.includes(key) && (this.$set(this.form, `${ key }`, keyValue))
    })
    this.getOptions()
  },
  beforeDestroy() {
    this.form = {
      showMe:true, // 默认显示自己
    }
  },
  methods: {
    sure() {
      this.$emit('search', this.form)
    },
    reset() {
      this.form = {}
      this.$emit('search', {})
    },
    onNomiProcessTypeChange(type) {
      const types = nomiApplicationObject[type] || []
      this.applicationStatus = this.nomiApplicationStatus.filter(o => types.includes(o.id))
    },
    getOptions() {
      let types = [
        "CAR_TYPE_PRO",
      ];
      selectDictByKeyss(types).then((res) => {
        this.fromGroup = res.data;
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