<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
  <iSearch
    class="margin-bottom20"
    @sure="sure"
    @reset="reset"
    :resetKey="QUEREN"
    :searchKey="REST"
  >
    <el-form>
      <!-- 零件号 -->
      <el-form-item :label="language('LINGJIAHAO', '零件号')">
        <iInput
          v-model.trim="form.partNums"
          v-permission.auto="MTZ_MODIFY_LIST_SEARCH_PARTNUM|零件号"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 供应商简称 -->
      <el-form-item :label="language('GONGYINGSHANGJIANCHENG', '供应商简称')">
        <iInput
          v-model.trim="form.supplierName"
          v-permission.auto="MTZ_MODIFY_LIST_SEARCH_SUPPLIERNAME|供应商简称"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 原材料 -->
      <el-form-item :label="language('TPGLZS.YUANCHAOLIAO','原材料')">
        <iSelect
          class="multi-select"
          v-model="form.materialCodeList"
          v-permission.auto="MTZ_MODIFY_LIST_SEARCH_MATERIALIST|原材料"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          filter-method="filterMaterial"
          @change="handlemultipleChange"
          multiple
          filterable
          clearable
        >
          <el-option
            value=""
            :label="language('all','全部')"
          ></el-option>
          <el-option
            :value="items.code"
            :label="items.value"
            v-for="(items, index) in (selectOptions && selectOptions.materialCodeList) || []"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 有效期 -->
      <el-form-item :label="language('LK_YOUXIAOQI','有效期')">
      <!-- <iDatePicker 
        v-model="form.validateDate" 
        format="yyyy-MM-dd" 
        value-format="yyyy-MM-dd"
        :clearable="false"
      /> -->
      <iDatePicker
        v-model='form.checkDate'
        v-permission.auto="MTZ_MODIFY_LIST_SEARCH_VALIDATE|有效期"
        @change="setstartEndDate"
        type="daterange"
        value-format="yyyy-MM-dd"
        clearable>
      </iDatePicker>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
import Vue from 'vue'
import {
  iSearch,
  iInput,
  iSelect,
  iDatePicker,
  iMessage
} from "rise";
import {user as configUser } from '@/config'
import {
  getMaterial,
} from '@/api/aeko/mtz'

export default {
  data() {
    return {
      form: {
        materialCodeList: ['']
      },
      selectOptions: {
        materialCodeList: [],
      },
      options: {
        linieList: [],
      },
      filter: {
        filterMaterial: (key) => {
          return this.filterOption(key, 'materialCodeList', 'materialCodeList')
        },
      },
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
    iDatePicker
  },
  mounted() {
    // 获取下拉数据
    this.getSearchList()
  },
  beforeDestroy() {
  },
  methods: {
    setstartEndDate(val) {
      if (val && val.length) {
        this.$set(this.form, 'startDate', val[0])
        this.$set(this.form, 'endDate', val[1])
      }
    },
    sure() {
      this.$emit('search', this.form)
    },
    reset() {
      this.form = {
        materialCodeList: ['']
      }
      this.$emit('search', {})
    },
    handlemultipleChange(value) {
      if (!value[value.length - 1]) {
        this.form.materialCodeList=['']
      } else {
        this.form.materialCodeList=this.form.materialCodeList.filter(item => item)
      }
      
    },
    filterOption(data, optionKey, valueKey) {
      // 去除空格
      data = String(data).trim()
      const startWords = String(data).spell().toLocaleLowerCase()
      const options = window._.cloneDeep(this.selectOptions[optionKey]) || []
      const filtedOption = options.filter(o => String(o.name).indexOf(data) > -1 || String(o.cnChar).indexOf(startWords)>-1)
      Vue.set(this.options, optionKey, filtedOption)
      Vue.set(this.form, valueKey, data)
    },
    resetOption(state, optionKey) {
      console.log('resetOption', state, optionKey)
      if (state) return
      const options = window._.cloneDeep(this.selectOptions[optionKey]) || []
      this.options[optionKey] = options
    },
    // 获取搜索框下拉数据
    getSearchList(){
      // 科室
      getMaterial().then((res)=>{
        const {code,data} = res;
        if(code === '200' ) {
          this.selectOptions.materialCodeList = data.map((item)=>{
            return {
              value: item.material,
              code: item.materialCode,
              cnChar: String(item.material).spell()
            }
          });
          console.log('selectOptions', this.selectOptions)
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
      
    },
  },
}
</script>

<style lang="scss" scoped>
.multi-select {
  &::v-deep.el-select {
    .el-select__tags {
      max-height: 60px !important;
      overflow: hidden;
    }
  }
}
</style>