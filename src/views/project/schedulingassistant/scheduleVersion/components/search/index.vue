<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 排程版本查询条件
-->
<template>
  <iSearch
    class="margin-top20 margin-bottom20"
    @sure="sure"
    @reset="reset"
    :resetKey="NORNIMATION_RESETBUTTON"
    :searchKey="NORNIMATION_CONFIRMBUTTON"
  >
    <el-form>
      <!-- 车型项目 -->
      <el-form-item :label="language('LK_CHEXINGXIANGMU','车型项目')">
        <!-- v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_SCHEDULEVERSION_CARTYPE|车型项目" -->
        <el-autocomplete
          v-model="form.cartypeProName"
          :fetch-suggestions="querySearch"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          suffix-icon="el-icon-search"
          @select="handleCarTypeSelect"
          clearable />
      </el-form-item>
      <!-- 保存时间 -->
      <el-form-item :label="language('BAOCUNSHIJIAN','保存时间')">
        <!-- v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_SCHEDULEVERSION_CREATEDATE|保存时间" -->
        <iDatePicker
          v-model='createDate'
          @change="oncheckDateChange"
          type="daterange"
          clearable>
        </iDatePicker>
      </el-form-item>
      <!-- 保存时间 -->
      <el-form-item :label="language('PAICHENGWEIDU','排程维度')">
        <!-- v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_SCHEDULEVERSION_PAICHENGWEIDU|排程维度" -->
        <iDicoptions :optionKey="'SCHEDULE_VERSION_TYPES'" v-model="form.type" />
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
import { form } from '../data'
import {
  gescheduleVersionCarType
} from '@/api/project/scheduleVersion'
import iDicoptions from 'rise/web/components/iDicoptions'
import {
  iSearch,
  iDatePicker
} from "rise";
import _ from 'lodash'

export default {
  data() {
    return {
      form,
      createDate: [],
      carTypes: []
    }
  },
  components: {
    iSearch,
    iDatePicker,
    iDicoptions
  },
  watch: {
    "form.cartypeProName": function(data) {
      if (!data) {
        this.form.cartypeProId  = ''
      }
    }
  },
  mounted() {
    this.form = {}
    this.getOptions()
  },
  beforeDestroy() {
    this.form = {}
  },
  methods: {
    /**
     * @description: 车型项目选择回调
     * @param {*} item
     * @return {*}
     */    
    handleCarTypeSelect(item) {
      this.form.cartypeProId = item ? item.cartypeProId : ''
    },
    /**
     * @description: 保存时间选择回调
     * @param {*} data
     * @return {*}
     */    
    oncheckDateChange(data) {
      this.form.createDateStart = data && data[0] || ''
      this.form.createDateEnd = data && data[1] || ''
    },
    // 车型项目推荐
    querySearch(queryString, cb) {
      var carTypes = this.carTypes;
      var results = queryString ? carTypes.filter(this.createFilter(queryString)) : carTypes;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (data) => {
        return (data.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    /**
     * @description: 提交筛选
     * @param {*}
     * @return {*}
     */    
    sure() {
      const form = _.cloneDeep(this.form)
      delete form.recheckDueDate
      this.$emit('search', form)
    },
    /**
     * @description: 重置
     * @param {*}
     * @return {*}
     */    
    reset() {
      this.form = {}
      this.createDate = []
      this.$emit('search', {})
    },
    /**
     * @description: 获取车型项目
     * @param {*}
     * @return {*}
     */    
    getOptions() {
      gescheduleVersionCarType().then(res => {
        if (res.code === '200') {
          const data = res.data || []
          this.carTypes = data.map(o => {
            o.value = o.cartypeProName
            return o
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>