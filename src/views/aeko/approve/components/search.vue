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
      <!-- AEKO号 -->
      <el-form-item :label="language('LK_AEKOHAO', 'AEKO号')">
        <iInput
          v-model.trim="form.aekoNum"
          v-permission.auto="AEKO_APPROVE_APPROVELIST_SEARCH_AEKONUM|AEKO号"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 零件号 -->
      <el-form-item :label="language('LINGJIAHAO', '零件号')">
        <iInput
          v-model.trim="form.partNum"
          v-permission.auto="AEKO_APPROVE_APPROVELIST_SEARCH_PARTNUM|零件号"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 科室 -->
      <el-form-item :label="language('LK_AEKOKESHI','科室')">
        <iSelect
          class="multi-select"
          v-model="form.departmentIdList"
          v-permission.auto="AEKO_APPROVE_APPROVELIST_SEARCH_DEPARTMENTIDLIST|科室"
          :placeholder="language('LK_QINGXUANZE','请选择')"
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
            v-for="(items, index) in (selectOptions && selectOptions.linieDeptNumList) || []"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 专业采购员 -->
      <el-form-item :label="language('ZHUANYECAIGOUYUAN','专业采购员')">
        <iSelect
          v-model="form.buyerId"
          v-permission.auto="AEKO_APPROVE_APPROVELIST_SEARCH_BUYERNAME|专业采购员"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          :filter-method="filter.filterLinie"
          @visible-change="resetOption(...arguments, 'linieList')"
          filterable
          clearable
        >
        <!-- @blur="resetOption(...arguments, 'linieList')" -->
          <el-option
            value=""
            :label="language('all','全部')"
          ></el-option>
          <el-option
            :value="items.code"
            :label="items.value"
            v-for="(items, index) in (options && options.linieList) || []"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- CSF股长 -->
      <el-form-item :label="language('CSFGUZHANG','CSF股长')">
        <iInput
          v-model.trim="form.chiefId"
          v-permission.auto="AEKO_APPROVE_APPROVELIST_SEARCH_CHIEFNAME|CSF股长"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
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
  iMessage
} from "rise";
import {
  searchCommodity,
  searchLinie,
} from '@/api/aeko/manage'

export default {
  data() {
    return {
      form: {
        departmentIdList: []
      },
      selectOptions: {
        linieDeptNumList: [],
        linieList: []
      },
      options: {
        linieList: []
      },
      filter: {
        filterLinie: (key) => {
          return this.filterOption(key, 'linieList')
        },
      },
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
  },
  mounted() {
    // 获取下拉数据
    this.getSearchList()
  },
  beforeDestroy() {
  },
  methods: {
    sure() {
      this.$emit('search', this.form)
    },
    reset() {
      this.form = {}
      this.$emit('search', {})
    },
    filterOption(data, optionKey) {
      // 去除空格
      data = String(data).trim()
      const startWords = String(data).spell().toLocaleLowerCase()
      const options = window._.cloneDeep(this.selectOptions[optionKey]) || []
      const filtedOption = options.filter(o => String(o.name).indexOf(data) > -1 || String(o.cnChar).indexOf(startWords)>-1)
      Vue.set(this.options, optionKey, filtedOption)
      console.log(startWords, optionKey, filtedOption)
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
      searchCommodity().then((res)=>{
        const {code,data} = res;
        if(code === '200' ) {
          this.selectOptions.linieDeptNumList = data.map((item)=>{
            return {
              value: item.deptNum,
              code: item.id
            }
          });
          console.log('selectOptions', this.selectOptions)
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
      searchLinie().then((res)=>{
        const {code,data} = res;
        if(code === '200' ) {
          this.selectOptions.linieList = data.map((item)=>{
            return {
              cnChar: item.namePinyin,
              name: this.$i18n.locale === "zh" ? item.nameZh : item.nameEn,
              value: this.$i18n.locale === "zh" ? item.nameZh : item.nameEn,
              code: item.id
            }
          });
          this.options.linieList = window._.cloneDeep(this.selectOptions.linieList)
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