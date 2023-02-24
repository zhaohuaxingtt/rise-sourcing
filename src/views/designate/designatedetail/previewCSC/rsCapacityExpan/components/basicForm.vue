<!--
 * @Author: your name
 * @Date: 2021-07-06 22:30:16
 * @LastEditTime: 2021-07-07 10:15:40
 * @LastEditors: Please set LastEditors
 * @Description: 决策资料 - rs 扩产能 基础表单
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rsCapacityExpan/components/basicForm.vue
-->

<template>
  <el-form :inline="true" :model="data" class="caexpan-form">
    <el-row>
      <el-col :span="6">
        <el-form-item label="Part-Name:">
          <iInput v-model="data.partName" disabled></iInput>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Part-No.:">
          <iInput v-model="data.partNum" disabled></iInput>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Linie:">
          <iInput v-model="data.linieName" disabled></iInput>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Carline:">
          <iInput v-model="data.carTypeName" disabled></iInput>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Supplier:">
          <iInput v-model="data.supplierName" disabled></iInput>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item class="checkbox" label="">
          <el-checkbox label="1" v-model="data.Increase" :true-label="1" :false-label="0">Capacity Increase</el-checkbox>
          <el-checkbox label="2" v-model="data.Renewal" :true-label="1" :false-label="0">Tooling Renewal</el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import {iInput} from 'rise'
export default {
  components: {
    iInput
  },
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      data: {}
    }
  },
  watch: {
    form() {
      this.data = this.form
    }
  }
}
</script>
<style lang="scss" scoped>
.caexpan-form {
  ::v-deep .el-form-item {
    .el-form-item__label {
      min-width: 78PX;
      text-align: left;
    }
    .el-checkbox__label {
      font-size: 12px;
      color: #606266;
    }
  }
}
</style>