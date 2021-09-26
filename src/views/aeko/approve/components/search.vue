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
          v-model="form.aekoNum"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 零件号 -->
      <el-form-item :label="language('LINGJIAHAO', '零件号')">
        <iInput
          v-model="form.partNum"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 科室 -->
      <el-form-item :label="language('LK_AEKOKESHI','科室')">
        <iSelect
          class="multi-select"
          v-model="form.departmentIdList"
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
        <iInput
          v-model="form.buyerName"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- CSF股长 -->
      <el-form-item :label="language('CSFGUZHANG','CSF股长')">
        <iInput
          v-model="form.chiefName"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>

import {
  iSearch,
  iInput,
  iSelect,
  iMessage
} from "rise";
import {
  searchCommodity,
} from '@/api/aeko/manage'

export default {
  data() {
    return {
      form: {
        departmentIdList: []
      },
      selectOptions: {
        linieDeptNumList: []
      }
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