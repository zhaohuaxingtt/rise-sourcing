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
      <el-form-item :label="language('nominationLanguage_LingJianHao','零件号')">
        <iInput
          v-model="form.partNum"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_PARTNUM|零件号"
        ></iInput>
      </el-form-item>
      <!-- 零件名 -->
      <el-form-item :label="language('nominationLanguage_LingJianMing','零件名')">
        <iInput
          v-model="form.partName"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_PARTNAME|零件名"
        ></iInput>
      </el-form-item>
      <!-- FSNR/GSNR -->
      <el-form-item :label="language('FSNR/GSNR','FSNR/GSNR')">
        <iInput
          v-model="form.fsnrGsnrNum"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_FSNRPSNR|FSNR/GSNR"
        ></iInput>
      </el-form-item>
      <!-- 车型项目 -->
      <el-form-item :label="language('CHEXINGXIANGMU','车型项目')">
        <iSelect
          v-model="form.carType"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_CARTYPEPROJ|车型项目"
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
            v-for="(items, index) in ( selectOptions && selectOptions.CAR_TYPE_PRO) || []"
            :key="index"
            style="max-width: 190px"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 询价采购员 -->
      <el-form-item :label="language('XUNJIACAIGOUYUAN','询价采购员')">
        <iInput
          v-model="form.nominateUserName"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_BUYERNAME|询价采购员"
        ></iInput>
      </el-form-item>
      <!-- LINIE -->
      <el-form-item label="LINIE">
        <iInput
          v-model="form.linieName"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_LININENAME|linieName"
        ></iInput>
      </el-form-item>
      <!-- 申请单号 -->
      <el-form-item :label="language('SHENGQINGDANHAO','申请单号')">
        <iInput
          v-model="form.nominateId"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_NOMINAEID|申请单号"
        ></iInput>
      </el-form-item>
        <!-- RFQ编号 -->
      <el-form-item :label="language('nominationLanguage.RFQBianHao','RFQ编号')">
        <iInput
          v-model="form.rfqId"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_RFQID|RFQ编号"
          @input="form.rfqId = numberProcessor(form.rfqId, 0)"
        ></iInput>
      </el-form-item>
      <!-- 会议 -->
      <el-form-item :label="language('nominationLanguage_HuiYi','会议')">
        <iInput
          v-model="form.meetingType"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_MEETINGNAME|会议"
        ></iInput>
      </el-form-item>
      <!-- 签字单号 -->
      <el-form-item :label="language('QIANZIDANHAO','签字单号')">
        <iInput
          v-model="form.signId"
          :placeholder="language('LK_QINGSHURU','请输入')"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_SIGNID|签字单号"
          @input="form.signId = numberProcessor(form.signId, 0)"
        ></iInput>
      </el-form-item>
      <!-- rs冻结日期 -->
      <el-form-item :label="language('RSDONGJIERIQI','RS冻结日期')">
        <iDatePicker
          v-model='form.rsFreezeDate'
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_RSFREEZEDATE|RS冻结日期"
          value-format="yyyy-MM-dd HH:mm:ss">
        </iDatePicker>
      </el-form-item>
      <!-- 冻结日期 -->
      <el-form-item :label="language('nominationLanguage_DongJieRiQi','冻结日期')">
        <iDatePicker
          v-model='form.freezeDate'
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_FREEZEDATE|冻结日期"
          value-format="yyyy-MM-dd">
        </iDatePicker>
      </el-form-item>
      <!-- 定点日期 -->
      <el-form-item :label="language('nominationLanguage_DingDianRiQi','定点日期')">
        <iDatePicker
          v-model='form.nominateDate'
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_NOMINATEDATE|定点日期"
          value-format="yyyy-MM-dd">
        </iDatePicker>
      </el-form-item>
       <!-- 复核截止日期 -->
      <el-form-item :label="language('FUHEJIEZHIRIQI','复核截止日期')">
        <iDatePicker
          v-model='form.recheckDueDate'
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_RECHCKDATE|复核截止日期"
          @change="oncheckDateChange"
          type="daterange"
          value-format="yyyy-MM-dd"
          clearable>
        </iDatePicker>
      </el-form-item>
      <!-- 申请状态 -->
      <el-form-item :label="language('SHENGQINGZHUANGTAI','申请状态')">
        <iSelect
          v-model="form.applicationStatus"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_APPLICATIONSTATE|申请状态"
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
      <!-- 报价一致性校验 -->
      <el-form-item :label="language('nominationLanguage_BaoJiaYiZhiXingJiaoYan','报价一致性校验')">
        <iSelect
          v-model="form.isPriceConsistent"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_ISPRICECONSISTENT|报价一致性校验"
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
      <!-- SEL单据确认状态 -->
      <el-form-item :label="language('SELDANJUQUERENZHUANGTAI','SEL单据确认状态')">
        <iSelect
          v-model="form.selStatus"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_SELSTATUS|SEL单据确认状态"
          :placeholder="language('LK_QINGXUANZE','请选择')"
        >
          <el-option
            value=""
            :label="language('all','全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.key"
            :label="language(items.key, items.name)"
            v-for="(items, index) in selStatus"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 是否单一供应商 -->
      <el-form-item :label="language('nominationLanguage_ShiFouDnaYiGongYingShang','是否单一供应商')">
        <iSelect
          v-model="form.isSingle"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_SINGLESOURCING|是否单一供应商"
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
      <!-- 单一原因 -->
      <el-form-item :label="language('DANYIYUANYIN','单一原因')">
        <iSelect
          v-model="form.singleReason"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_SINGLEREASON|单一原因"
          :placeholder="language('LK_QINGXUANZE','请选择')"
        >
          <el-option
            value=""
            :label="language('all','全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.value"
            :label="$i18n.locale === 'zh' ? items.label : items.labelEN"
            v-for="(items, index) in (selectOptions.reason || [])"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 原因部门 -->
      <el-form-item :label="language('YUANYINBUMEN','原因部门')">
        <iSelect
          v-model="form.singleDepartment"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_SINGLEDEPARTMENT|原因部门"
          :placeholder="language('LK_QINGXUANZE','请选择')"
        >
          <el-option
            value=""
            :label="language('all','全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.value"
            :label="items.value"
            v-for="(items, index) in (selectOptions.dept || [])"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 签字单状态 -->
      <el-form-item :label="language('QIANZIDANZHUANGTAI', '签字单状态')">
        <iSelect
          v-model="form.signStatus"
          v-permission.auto="SOURCING_NOMINATION_RSREVIEW_SIGNSTATUS|签字单状态"
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
    </el-form>
  </iSearch>
</template>

<script>

import { applyType } from '@/layout/nomination/components/data'
import { form } from '../data'
import {
  RSReviewApplicationStatus,
  selStatus,
  signSheetStatus,
  priceConsistentStatus 
} from '@/views/designate/home/components/options'
import { getDictByCode } from '@/api/dictionary'
import {selectDictByKeyss} from '@/api/dictionary'
import {
  iSearch,
  iInput,
  iSelect,
  iDatePicker
} from "rise";
import _ from 'lodash'
import { numberProcessor } from '@/utils' 

export default {
  data() {
    return {
      form,
      ptocessType: applyType,
      applicationStatus: RSReviewApplicationStatus,
      selStatus,
      signSheetStatus,
      priceConsistentStatus,
      selectOptions: {}
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
    iDatePicker
  },
  mounted() {
    this.form = {}
    // 获取下拉枚举值
    this.getOptions()
  },
  beforeDestroy() {
    this.form = {}
  },
  methods: {
    numberProcessor,
    sure() {
      const form = _.cloneDeep(this.form)
      delete form.recheckDueDate
      this.$emit('search', form)
    },
    reset() {
      this.form = {}
      this.$emit('search', {})
    },
    oncheckDateChange(data) {
      console.log(data)
      this.form.startRecheckDueDate = data[0]
      this.form.endRecheckDueDate = data[1]
    },
    getOptions() {
      this.getDictionary('signStatus', 'signStatus')
      this.getDictionary('selStatus', 'selStatus')
      this.getDictionary('applicationStatus', 'applicationStatus')
      // 获取单一原因部门
      this.getDictionary('dept', 'score_dept')
      // 获取单一原因数据字典
      this.getDictionary('reason', 'SINGLE_SOURCING_REASON')
      // 获取车型项目
      selectDictByKeyss([
        "CAR_TYPE_PRO",
      ]).then((res) => {
        const optionList = (res.data && res.data['CAR_TYPE_PRO']) || []
        this.$set(this.selectOptions, 'CAR_TYPE_PRO', optionList)
      });
    },
    // 获取数据字典
    getDictionary(optionName, optionType, key = {value: 'code', label: 'name'}) {
      getDictByCode(optionType).then(res => {
        if(res?.result) {
          this.selectOptions[optionName] = res.data[0].subDictResultVo.map(item => {
            return { value: item.code, label: item.name, labelEN: item.nameEn }
          })
        }
      })
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