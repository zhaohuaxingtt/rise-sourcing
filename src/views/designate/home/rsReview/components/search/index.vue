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
      <el-form-item
        :label="language('nominationLanguage_LingJianHao', '零件号')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_PARTNUM | 零件号"
      >
        <!-- <iInput
          clearable
          v-model="form.partNum"
          :placeholder="language('LK_QINGSHURU','请输入')"
        ></iInput> -->
        <iMultiLineInput
          v-model="form.partNum"
          :title="language('nominationLanguage_LingJianHao', '零件号')"
        />
      </el-form-item>
      <!-- 零件名 -->
      <el-form-item
        :label="language('nominationLanguage_LingJianMing', '零件名')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_PARTNAME | 零件名"
      >
        <iInput
          clearable
          v-model="form.partName"
          :placeholder="language('LK_QINGSHURU', '请输入')"
        ></iInput>
      </el-form-item>
      <!-- FSNR/GSNR -->
      <el-form-item
        :label="language('FSNR/GSNR', 'FSNR/GSNR')"
        v-permission.auto="
          SOURCING_NOMINATION_RSREVIEW_FSNRPSNR | (FSNR / GSNR)
        "
      >
        <iInput
          clearable
          v-model="form.fsnrGsnrNum"
          :placeholder="language('LK_QINGSHURU', '请输入')"
        ></iInput>
      </el-form-item>
      <!-- 车型项目 -->
      <el-form-item
        :label="language('CHEXINGXIANGMU', '车型项目')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_CARTYPEPROJ | 车型项目"
      >
        <iSelect
          v-model="form.carTypeProjectId"
          :placeholder="language('LK_QINGXUANZE', '请选择')"
          filterable
          clearable
        >
          <el-option
            value=""
            :label="language('all', '全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.id"
            :label="items.value"
            v-for="(items, index) in (selectOptions &&
              selectOptions.CAR_TYPE_PRO) ||
            []"
            :key="index"
            style="max-width: 190px"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 询价采购员 -->
      <el-form-item
        :label="language('XUNJIACAIGOUYUAN', '询价采购员')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_BUYERNAME | 询价采购员"
      >
        <iInput
          clearable
          v-model="form.nominateUserName"
          :placeholder="language('LK_QINGSHURU', '请输入')"
        ></iInput>
      </el-form-item>
      <!-- LINIE -->
      <el-form-item
        label="LINIE"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_LININENAME | linieName"
      >
        <iInput
          clearable
          v-model="form.linieName"
          :placeholder="language('LK_QINGSHURU', '请输入')"
        ></iInput>
      </el-form-item>
      <!-- 申请单号 -->
      <el-form-item
        :label="language('SHENGQINGDANHAO', '申请单号')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_NOMINAEID | 申请单号"
      >
        <iInput
          clearable
          v-model="form.nominateId"
          :placeholder="language('LK_QINGSHURU', '请输入')"
        ></iInput>
      </el-form-item>
      <!-- RFQ编号 -->
      <el-form-item
        :label="language('nominationLanguage.RFQBianHao', 'RFQ编号')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_RFQID | RFQ编号"
      >
        <iInput
          clearable
          v-model="form.rfqId"
          :placeholder="language('LK_QINGSHURU', '请输入')"
          @input="form.rfqId = numberProcessor(form.rfqId, 0)"
        ></iInput>
      </el-form-item>
      <!-- 会议 -->
      <el-form-item
        :label="language('nominationLanguage_HuiYi', '会议')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_MEETINGNAME | 会议"
      >
        <iInput
          clearable
          v-model="form.meetingType"
          :placeholder="language('LK_QINGSHURU', '请输入')"
        ></iInput>
      </el-form-item>
      <!-- 签字单号 -->
      <el-form-item
        :label="language('QIANZIDANHAO', '签字单号')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_SIGNID | 签字单号"
      >
        <iInput
          clearable
          v-model="form.signCode"
          :placeholder="language('LK_QINGSHURU', '请输入')"
        ></iInput>
      </el-form-item>
      <!-- rs冻结日期 -->
      <el-form-item
        :label="language('RSDONGJIERIQI', 'RS冻结日期')"
        v-permission.auto="
          SOURCING_NOMINATION_RSREVIEW_RSFREEZEDATE | RS冻结日期
        "
      >
        <iDatePicker
          clearable
          v-model="form.rsFreezeDate"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </iDatePicker>
      </el-form-item>
      <!-- 冻结日期 -->
      <el-form-item
        :label="language('nominationLanguage_DongJieRiQi', '冻结日期')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_FREEZEDATE | 冻结日期"
      >
        <iDatePicker
          clearable
          v-model="form.freezeDate"
          value-format="yyyy-MM-dd"
        >
        </iDatePicker>
      </el-form-item>
      <!-- 定点日期 -->
      <el-form-item
        :label="language('nominationLanguage_DingDianRiQi', '定点日期')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_NOMINATEDATE | 定点日期"
      >
        <iDatePicker
          clearable
          v-model="form.nominateDate"
          value-format="yyyy-MM-dd"
        >
        </iDatePicker>
      </el-form-item>
      <!-- 复核截止日期 -->
      <el-form-item
        :label="language('FUHEJIEZHIRIQI', '复核截止日期')"
        v-permission.auto="
          SOURCING_NOMINATION_RSREVIEW_RECHCKDATE | 复核截止日期
        "
      >
        <iDatePicker
          v-model="form.recheckDueDate"
          @change="oncheckDateChange"
          type="daterange"
          value-format="yyyy-MM-dd"
          clearable
        >
        </iDatePicker>
      </el-form-item>
      <!-- 申请状态 -->
      <el-form-item
        :label="language('SHENGQINGZHUANGTAI', '申请状态')"
        v-permission.auto="
          SOURCING_NOMINATION_RSREVIEW_APPLICATIONSTATE | 申请状态
        "
      >
        <iSelect
          clearable
          v-model="form.applicationStatus"
          :placeholder="language('LK_QINGXUANZE', '请选择')"
        >
          <el-option
            value=""
            :label="language('all', '全部') | capitalizeFilter"
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
      <el-form-item
        :label="
          language(
            'nominationLanguage_BaoJiaYiZhiXingJiaoYan',
            '报价一致性校验'
          )
        "
        v-permission.auto="
          SOURCING_NOMINATION_RSREVIEW_ISPRICECONSISTENT | 报价一致性校验
        "
      >
        <iSelect
          clearable
          v-model="form.isPriceConsistent"
          :placeholder="language('LK_QINGXUANZE', '请选择')"
        >
          <el-option
            value=""
            :label="language('all', '全部') | capitalizeFilter"
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
      <el-form-item
        :label="language('SELDANJUQUERENZHUANGTAI', 'SEL单据确认状态')"
        v-permission.auto="
          SOURCING_NOMINATION_RSREVIEW_SELSTATUS | SEL单据确认状态
        "
      >
        <iSelect
          clearable
          v-model="form.selStatus"
          :placeholder="language('LK_QINGXUANZE', '请选择')"
        >
          <el-option
            value=""
            :label="language('all', '全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.value"
            :label="$i18n.locale === 'zh' ? items.label : items.labelEN"
            v-for="(items, index) in selectOptions.selStatus || []"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 是否单一供应商 -->
      <el-form-item
        :label="
          language(
            'nominationLanguage_ShiFouDnaYiGongYingShang',
            '是否单一供应商'
          )
        "
        v-permission.auto="
          SOURCING_NOMINATION_RSREVIEW_SINGLESOURCING | 是否单一供应商
        "
      >
        <iSelect
          clearable
          v-model="form.isSingle"
          :placeholder="language('LK_QINGXUANZE', '请选择')"
        >
          <el-option
            value=""
            :label="language('all', '全部') | capitalizeFilter"
          ></el-option>
          <el-option :value="true" :label="language('YES', '是')"></el-option>
          <el-option :value="false" :label="language('NO', '否')"></el-option>
        </iSelect>
      </el-form-item>
      <!-- 单一原因 -->
      <el-form-item
        :label="language('DANYIYUANYIN', '单一原因')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_SINGLEREASON | 单一原因"
      >
        <iSelect
          clearable
          v-model="form.singleReason"
          :placeholder="language('LK_QINGXUANZE', '请选择')"
        >
          <el-option
            value=""
            :label="language('all', '全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.value"
            :label="$i18n.locale === 'zh' ? items.label : items.labelEN"
            v-for="(items, index) in selectOptions.reason || []"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 原因部门 -->
      <el-form-item
        :label="language('YUANYINBUMEN', '原因部门')"
        v-permission.auto="
          SOURCING_NOMINATION_RSREVIEW_SINGLEDEPARTMENT | 原因部门
        "
      >
        <iSelect
          clearable
          v-model="form.singleDepartment"
          :placeholder="language('LK_QINGXUANZE', '请选择')"
        >
          <el-option
            value=""
            :label="language('all', '全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.value"
            :label="items.value"
            v-for="(items, index) in selectOptions.dept || []"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 签字单状态 -->
      <el-form-item
        :label="language('QIANZIDANZHUANGTAI', '签字单状态')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_SIGNSTATUS | 签字单状态"
      >
        <iSelect
          clearable
          v-model="form.signStatus"
          :placeholder="language('LK_QINGXUANZE', '请选择')"
        >
          <el-option
            value=""
            :label="language('all', '全部') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.id"
            :label="language(items.key, items.name)"
            v-for="(items, index) in signSheetStatus"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 显示自己 -->
      <el-form-item
        :label="language('nominationLanguage_XianShiZiJi', '显示自己')"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_SHOWSELF | 显示自己"
      >
        <iSelect
          v-model="form.showSelf"
          :placeholder="language('LK_QINGXUANZE', '请选择')"
          clearable
        >
          <el-option
            value=""
            :label="language('all', '全部') | capitalizeFilter"
          ></el-option>
          <el-option :value="true" :label="language('YES', '是')"></el-option>
          <el-option :value="false" :label="language('NO', '否')"></el-option>
        </iSelect>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
import { applyType } from "@/layout/nomination/components/data";
import { form } from "../data";
import {
  RSReviewApplicationStatus,
  signSheetStatus,
  priceConsistentStatus,
} from "@/views/designate/home/components/options";
import { getCarTypeSop } from "@/api/partsprocure/editordetail";
import { getDictByCode } from "@/api/dictionary";
import { selectDictByKeys } from "@/api/dictionary";
import { iSearch, iInput, iSelect, iDatePicker, iMultiLineInput } from "rise";
import _ from "lodash";
import { numberProcessor } from "@/utils";

export default {
  data() {
    return {
      form,
      ptocessType: applyType,
      applicationStatus: [],
      signSheetStatus,
      priceConsistentStatus,
      selectOptions: {},
    };
  },
  components: {
    iSearch,
    iInput,
    iSelect,
    iDatePicker,
    iMultiLineInput,
  },
  mounted() {
    this.form = { showSelf: true };
    // 获取下拉枚举值
    this.getOptions();
  },
  beforeDestroy() {
    this.form = {};
  },
  methods: {
    numberProcessor,
    sure() {
      const form = _.cloneDeep(this.form);
      delete form.recheckDueDate;
      this.$emit("search", form);
    },
    reset() {
      this.form = { showSelf: true };
      this.$emit("search", {});
    },
    oncheckDateChange(data) {
      console.log(data);
      this.form.startRecheckDueDate = data[0];
      this.form.endRecheckDueDate = data[1];
    },
    getOptions() {
      // 上会RS复核支持以下状态查询
      let searchStatus = ['CHECK_FAIL','CHECK_INPROCESS','CHECK_PASS','M_CHECK_FAIL','M_CHECK_INPROCESS','M_CHECK_PASS','PASS','NOMINATE']
      this.applicationStatus = RSReviewApplicationStatus.filter(item=>searchStatus.includes((item.id)))
      this.getDictionary();
      // 获取车型项目
      this.getCarTypeSop();
    },
    // 获取数据字典
    getDictionary() {
      selectDictByKeys([
        { keys: "score_dept" },
        { keys: "SINGLE_SOURCING_REASON" },
        { keys: "NOMINATE_SEL_STATUS" },
      ]).then((res) => {
        if (res.code == 200) {
          Object.keys(res.data).forEach((key) => {
            switch (key) {
              case "score_dept":
                this.selectOptions.dept = res.data["score_dept"].map(
                  (item) => ({
                    ...item,
                    key: item.code,
                    value: item.code,
                    label: item.name,
                    labelEN: item.nameEn,
                  })
                );
                break;
              case "SINGLE_SOURCING_REASON":
                this.selectOptions.reason = res.data[
                  "SINGLE_SOURCING_REASON"
                ].map((item) => ({
                  ...item,
                  key: item.code,
                  value: item.code,
                  label: item.name,
                  labelEN: item.nameEn,
                }));
                break;
              case "NOMINATE_SEL_STATUS":
                this.selectOptions.selStatus = res.data[
                  "NOMINATE_SEL_STATUS"
                ].map((item) => ({
                  ...item,
                  key: item.code,
                  value: item.code,
                  label: item.name,
                  labelEN: item.nameEn,
                }));
                break;
              default:
            }
          });
        }
      });
    },
    // 获取车型项目
    getCarTypeSop() {
      getCarTypeSop().then((res) => {
        if (res.code === "200") {
          this.$set(
            this.selectOptions,
            "CAR_TYPE_PRO",
            Array.isArray(res.data)
              ? res.data.map((item) => ({
                  id: item.id,
                  code: item.cartypeProCode,
                  name: item.cartypeProName,
                  value: item.cartypeProName,
                }))
              : []
          );
        }
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
};
</script>

<style lang="scss" scoped>
.designateSearch {
  margin-top: 20px;
  ::v-deep .el-date-editor .el-range__close-icon {
    display: block;
    width: 10px;
  }
}
</style>