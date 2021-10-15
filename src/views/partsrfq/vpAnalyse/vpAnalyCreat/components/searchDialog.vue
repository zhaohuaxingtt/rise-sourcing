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
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.materialGroupCode">
            <el-option :value="item.code" :label="item.name" v-for="item of formGoup.materialGroupList" :key="item.code"></el-option>
          </iSelect>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="language('RFQHAO','RFQ号')">
          <iInput :disabled='!!$route.query.rfqId' :placeholder="$t('LK_QINGSHURU')" v-model="form.rfqId"></iInput>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="$t('LK_FSHAO')">
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.fsId"></iInput>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="$t('LK_LINGJIANHAO')">
          <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.partsId"></iInput>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <iButton @click="getTableList">{{$t('LK_QUEREN')}}</iButton>
          <iButton @click="handleSearchReset">{{$t('LK_ZHONGZHI')}}</iButton>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { iSearch, iInput, iSelect, iDatePicker, iButton } from 'rise'
import { materialGroupSelectDict } from "@/api/partsrfq/vpAnalysis/vpAnalyseCreate/index.js";
export default {
  components: {
    iSearch,
    iInput,
    iSelect, iDatePicker, iButton
  },
  data() {
    return {
      form: {
        materialGroup: '',
        materialGroupCode: '',
        rfqId: '',
        fsId: '',
        partsId: '',
      },
      formGoup: {
        materialGroupList: [],
      },
      fieldList: []
    }
  },
  created() {
    this.getDictByCode()
  },
  methods: {
    async getDictByCode() {
      const res = await materialGroupSelectDict()
      this.formGoup.materialGroupList = res.data
    },
    handleSearchReset() {
      this.form = {
        materialGroup: '',
        rfqId: '',
        fsId: '',
        partsId: '',
        materialGroupCode: ''
      }
      this.getTableList()
    },
    getTableList() {
      this.form.materialGroupCode && this.formGoup.materialGroupList.forEach((item) => {
        if (item.code === this.form.materialGroupCode) {
          this.form.materialGroup = item.name
          return
        }
      })
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
