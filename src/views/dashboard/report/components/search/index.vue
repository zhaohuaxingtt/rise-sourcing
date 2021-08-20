<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 新建签字单嵌入的定点管理页面
-->
<template>
  <iSearch
    @sure="sure"
    @reset="reset"
    :resetKey="NORNIMATION_RESETBUTTON"
    :searchKey="NORNIMATION_CONFIRMBUTTON"
  >
    <el-form>
      <!-- 车型项目 -->
      <el-form-item :label="language('nominationLanguage_CheXingXiangMu','车型项目')">
        <iSelect
          class="select-control"
          autocomplete='new-password'
          v-model="form.carTypes"
          v-permission="REPORTMGMT_STATUSREPORT_CARTYPE"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          :filter-method="filter.filterCarType"
          @visible-change="resetOption(...arguments, 'CAR_TYPE_BUYER')"
          multiple
          filterable
          clearable
        >
          <el-option
            :value="items.code"
            :label="items.name"
            v-for="(items, index) in (options.CAR_TYPE_BUYER || [])"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 零件号 -->
      <el-form-item :label="language('nominationLanguage_LingJianHao', '零件号')">
        <iInput
          v-model="form.partNum"
          v-permission="REPORTMGMT_STATUSREPORT_PARTNUM"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- RFQ编号 -->
      <el-form-item :label="language('nominationLanguage.RFQBianHao','RFQ编号')">
        <iInput
          v-model="form.rfqId"
          v-permission="REPORTMGMT_STATUSREPORT_RFQID"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 排序 -->
      <el-form-item :label="language('strategicdoc_PaiXu','排序')">
        <iSelect
          class="select-control"
          v-model="form.order"
          v-permission="REPORTMGMT_STATUSREPORT_SORT"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          :filter-method="filter.filterSort"
          @visible-change="resetOption(...arguments, 'SORT')"
          filterable
          clearable
        >
          <el-option
            :value="items.code"
            :label="language(items.key,items.name)"
            v-for="(items, index) in (options.SORT || [])"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 材料组 -->
      <el-form-item :label="language('LK_CAILIAOZU','材料组')">
        <iSelect
          class="select-control"
          v-model="form.categoryGroup"
          v-permission="REPORTMGMT_STATUSREPORT_MATERIAL"
          multiple
          :placeholder="language('LK_QINGXUANZE','请选择')"
          :filter-method="filter.filterMaterial"
          @visible-change="resetOption(...arguments, 'MATERIAL_GROUP_BUYER')"
          filterable
          clearable
        >
          <el-option
            :value="items.code"
            :label="items.name"
            v-for="(items, index) in (options.MATERIAL_GROUP_BUYER || [])"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 采购员 -->
      <el-form-item :label="language('LK_CAIGOUYUAN','采购员')">
        <iSelect
          class="select-control"
          v-model="form.buyer"
          v-permission="REPORTMGMT_STATUSREPORT_BUYERL"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          :filter-method="filter.filterBuyer"
          @visible-change="resetOption(...arguments, 'BUYER_BY_USER')"
          filterable
          clearable
        >
          <el-option
            :value="items.code"
            :label="items.name"
            v-for="(items, index) in (options.BUYER_BY_USER || [])"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      
      
    </el-form>
  </iSearch>
</template>

<script>
// import { form } from '../data'
import Vue from 'vue'
import _ from 'lodash'
import {
  findBySearchesList,
} from '@/api/dashboard'

import {
  iSearch,
  iInput,
  iSelect,
  iMessage
} from "rise";

export default {
  data() {
    return {
      form: {
        buyer: '',
        carTypes: [],
        categoryGroup: [],
        order: 'DEFAULT',
        partNum: '',
        rfqId: '',
      },
      // 车型项目列表
      carTypeList: [],
      // options
      options: {
        SORT: [
          {
            code: 'DEFAULT',
            name: '默认',
            key: 'MOREN'
          },
          {
            code: 'TASK_STATUS',
            name: '按任务状态',
            key: 'ANRENWUZHUANGTAI'
          },
          {
            code: 'CAR_RISK',
            name: '按整车进度风险',
            key: 'ANZHENGCHEFENGXIAN'
          },
        ],
        MATERIAL_GROUP_BUYER: [],
        CAR_TYPE_BUYER: [],
        BUYER_BY_USER: []
      },
      // 原始options
      optionsOrigin: {},
      filter: {
        filterCarType: (key) => {
          return this.filterOption(key, 'CAR_TYPE_BUYER')
        },
        filterBuyer: (key) => {
          return this.filterOption(key, 'BUYER_BY_USER')
        },
        filterSort: (key) => {
          return this.filterOption(key, 'SORT')
        },
        filterMaterial: (key) => {
          return this.filterOption(key, 'MATERIAL_GROUP_BUYER')
        },
      }
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
  },
  created() {
    this.getSearchOptions()
  },
  mounted() {
  },
  methods: {
    sure() {
      this.$emit('search', this.form)
    },
    reset() {
      this.form = {}
      this.$emit('search', {})
    },
    // 获取下拉值
    async getSearchOptions() {
      try {
        const params = {
          types: [
            // 材料组
            'MATERIAL_GROUP_BUYER',
            // 车型项目
            'CAR_TYPE_BUYER',
            // 采购员
            'BUYER_BY_USER',
          ]
        }
        const res = await findBySearchesList(params)
        // const res = require('./moke.json')
        if (res.code === '200') {
          let options = res.data || {}
          options = Object.assign(this.options, options)
          // 添加首字母拼音字段
          Object.keys(options).forEach(key => {
            const optionArray = options[key]
            optionArray.map(o => {
              o.cnChar = String(o.name).spell().split('')[0] || ''
              return o
            })
          })
          this.options = options
          this.optionsOrigin = _.cloneDeep(this.options)
          console.log('options', options)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.loading = false
      } catch(e) {
        this.loading = false
        e && (iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn))
      }
    },
    filterOption(data, optionKey) {
      // 去除空格
      data = String(data).trim()
      const startWords = String(data).spell().toLocaleUpperCase().split('')[0]
      const options = _.cloneDeep(this.optionsOrigin[optionKey]) || []
      const filtedOption = options.filter(o => String(o.name).indexOf(data) > -1 || o.cnChar === startWords)
      Vue.set(this.options, optionKey, filtedOption)
      // console.log('this.option', this.options[optionKey], optionKey)
    },
    resetOption(state, optionKey) {
      if (state) return
      const options = _.cloneDeep(this.optionsOrigin[optionKey]) || []
      this.options[optionKey] = options
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
.select-control {
  &::v-deep.el-select {
    .el-select__tags {
      height: 26px !important;
      overflow: hidden;
    }
  }
}
</style>