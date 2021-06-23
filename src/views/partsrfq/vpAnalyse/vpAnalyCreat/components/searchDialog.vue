<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <el-form>
    <el-row type="flex" align='bottom' justify="start">
      <el-col :span="4">
        <el-form-item :label="$t('TPZS.CLZ')">
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.tsPpSupplierName"></iInput>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="$t('LK_RFQHAO')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.status">
            <el-option :value="item.code" :label="item.name" v-for="item of formGoup.statusList" :key="item.code"></el-option>
          </iSelect>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="$t('LK_FSHAO')">
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.principalName"></iInput>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="$t('LK_LINGJIANHAO')">
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.principalName"></iInput>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <iButton>{{$t('LK_QUEREN')}}</iButton>
          <iButton>{{$t('LK_ZHONGZHI')}}</iButton>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { iSearch, iInput, iSelect, iDatePicker, iButton } from 'rise'
export default {
  components: {
    iSearch,
    iInput,
    iSelect, iDatePicker, iButton
  },
  data() {
    return {
      form: {
        tsPpSupplierName: '',
        status: '',
        principalName: '',
        signalFrom: '',
        relativeDept: '',
        submitDateStart: '',
        submitDateEnd: '',
        supplyingRelationship: '',
        processType: '',
        furtherRatingResult: '',
        isBreak: '',
        riskBigType: '',
        riskSmallType: '',
        effectiveTime: '',
      },
      formGoup: {
        statusList: [],
        supplyingRelationshipList: [],
        processTypeList: [],
        furtherRatingResultList: [],
        isBreakList: [
          {
            name: '是',
            code: true
          },
          {
            name: '否',
            code: false
          }
        ],
        riskBigTypeList: [],
        riskSmallTypeList: [],
      },
      fieldList: []
    }
  },
  created() {
  },
  methods: {
    handleSearchReset() {
      this.form = {
        tsPpSupplierName: '',
        status: '',
        principalName: '',
        signalFrom: '',
        relativeDept: '',
        submitDateStart: '',
        submitDateEnd: '',
        supplyingRelationship: '',
        processType: '',
        furtherRatingResult: '',
        isBreak: '',
        riskBigType: '',
        riskSmallType: '',
        effectiveTime: '',
        submitTime: []
      }
      this.getTableList()
    },
    getTableList() {
      this.$emit('getTableList', this.form)
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__content {
  width: 220px;
}
::v-deep .el-col-8 .el-form-item {
  display: flex;
  justify-content: flex-end;
}
</style>
