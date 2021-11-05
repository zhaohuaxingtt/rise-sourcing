<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: csf/commodity 筛选
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
      <!-- 供应商简称 -->
      <el-form-item :label="language('GONGYINGSHANGJIANCHENG','供应商简称')">
        <iInput
          v-model="form.buyerName"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 专业采购员 -->
      <el-form-item :label="language('ZHUANYECAIGOUYUAN','专业采购员')">
        <iInput
          v-model="form.buyerName"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 成本变化Δ值 -->
       <el-form-item :label="language('LK_CHENGBENBIANHUAZHI','成本变化Δ值')" class="intervalCss">
         <iInput
             v-model="form.chiefName"
             :placeholder="language('LK_QINGSHURU','请输入')"
             clearable
         />
         <span>-</span>
         <iInput
             v-model="form.chiefName"
             :placeholder="language('LK_QINGSHURU','请输入')"
             clearable
         />
      </el-form-item>
      <!--审批状态-->
      <el-form-item :label="language('LK_SHNEPIZHUANGTAI','审批状态')">
        <i-select v-model="value1" multiple placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </i-select>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>

import {
  iSearch,
  iInput,
  iSelect,
  // iMessage
} from "rise";

export default {
  data() {
    return {
      form: {

      },
      selectOptions: {
      }
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
  },
  mounted() {
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
    }
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
::v-deep.intervalCss .el-form-item__content{
  display: inline-flex;
  align-items: center;
}
</style>