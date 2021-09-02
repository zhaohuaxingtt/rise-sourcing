<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 15:16:47
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-02 09:56:35
 * @Description: 基础信息
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\components\basic.vue
-->

<template>
  <iCard :title="language('JICHUXINXI','基础信息')" collapse class="margin-top30" :loading="loading">
    <iFormGroup row="4" class="targetPriceDetail">
      <iFormItem v-for="(item, index) in detailList" :key="index" :label="language(item.i18n_label, item.label)+':'" :class="item.row ? 'row'+item.row : ''">
        <template v-if="item.editable && isEdit">
          <iInput v-if="item.type === 'input'" :value="detailData[item.value]" @input="handleInput($event, item.number, item.value)" :disabled="isDisabled(item.value)" />
          <iSelect v-else-if="item.type === 'select'" v-model="detailData[item.value]" :disabled="isDisabled(item.value)">
            <el-option
              :value="item.code"
              :label="item.name"
              v-for="(item) in currencyOptions"
              :key="item.code"
            ></el-option>
          </iSelect>
        </template>
        <iText v-else>{{detailData[item.value]}}</iText>
      </iFormItem>
      <iFormItem :class="'row2'" style="text-align:right">
        <iButton v-if="!isEdit" @click="changeBasicIsEdit(true)">{{language('BIANJI','编辑')}}</iButton>
        <template v-else>
          <iButton @click="handleBasicSave" :loading="loading">{{language('BAOCUN','保存')}}</iButton>
          <iButton @click="handleBasicCancel">{{language('QUXIAO','取消')}}</iButton>
        </template>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText, iInput, iSelect, iButton, iMessage } from 'rise'
import { detailList } from '../data'
import { getTargetPriceDetail, setPrice } from "@/api/financialTargetPrice/index"
import { getDictByCode } from '@/api/dictionary'
export default {
  props: {
    id: {type:String}
  },
  components: {iCard, iFormGroup, iFormItem, iText, iInput, iSelect, iButton},
  watch: {
    id:{
      handler(val) {
        if(val) {
          this.getDetail()
        }
      },
      immediate: true
     }
  },
  data() {
    return {
      isEdit: false,
      detailList: detailList,
      detailData: {},
      loading: false,
      currencyOptions: []
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    handleInput(value, isNumber, name) {
      if (isNumber) {
        if (/^\d*\.?\d*$/.test(value)) {
          this.$set(this.detailData, name, value)
        }
      } else {
        this.$set(this.detailData, name, value)
      }
    },
    isDisabled(type) {
      const lcs = ['lcTcCurrencyId','lcBPrice','lcAPrice']
      const skds = ['skdTcCurrencyId','skdBPrice','skdAPrice']
      const ckds = ['ckdExwork','ckdLanded','ckdDuty','ckdTcCurrencyId']
      if ((lcs.includes(type) || ckds.includes(type)) && this.detailData.applyType === 'SKD') {
        return true
      }
      if ((ckds.includes(type) || skds.includes(type)) && this.detailData.applyType === 'LC') {
        return true
      }
      if ((lcs.includes(type) || skds.includes(type)) && this.detailData.applyType === 'CKD LANDED') {
        return true
      }
      return false
    },
    getDict() {
      getDictByCode('PP_CSTMGMT_CURRENCY').then(res => {
        if(res?.result) {
          this.currencyOptions = res.data[0]?.subDictResultVo || []
        }
      })
    },
    getDetail() {
      if (!this.id) {
        return
      }
      this.loading = true
      getTargetPriceDetail(this.id).then(res => {
        if (res?.result) {
          this.detailData = res.data
        } else {
          this.detailData = {}
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    /**
     * @Description: 保存基础信息编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleBasicSave() {
      this.loading = true
      const params = {
        ...this.detailData,
        partPrjCode: this.detailData.fsnrGsnrNum
      }
      setPrice(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeBasicIsEdit(false)
          this.$emit('basicSaving')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    /**
     * @Description: 取消基础信息编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleBasicCancel() {
      this.changeBasicIsEdit(false)
      this.getDetail()
    },
    /**
     * @Description: 切换基础信息部分编辑状态
     * @Author: Luoshuang
     * @param {*} isEdit
     * @return {*}
     */    
    changeBasicIsEdit(isEdit) {
      this.isEdit = isEdit
    }
  }
}
</script>

<style lang="scss" scoped>
.targetPriceDetail {
  ::v-deep {
    .row2 {
      margin-right: 3.75rem;
      width: calc((100% - 1*3.75rem) / 2);
      &:nth-child(2n+1) {
        margin-right: 0px;
      }
    }
    .row2, .row4 {
      // width: calc((100% - 1*3.75rem) / 2);
      .el-form-item__label {
        // width: 150px
      }
    }
  }
}
</style>