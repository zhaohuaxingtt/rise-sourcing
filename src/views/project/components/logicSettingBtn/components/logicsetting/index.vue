<!--
 * @Author: Luoshuang
 * @Date: 2021-07-28 10:57:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-31 15:39:20
 * @Description: 算法配置弹窗
 * @FilePath: \front-web\src\views\project\components\logicSettingBtn\components\logicsetting\index.vue
-->

<template>
  <iDialog :title="language('SUANFAPEIZHI','算法配置')"
           :visible.sync="dialogVisible"
           @close="clearDialog">
    <template slot="footer">
      <iButton @click="handleConfirm"
               :loading="saveLoading">{{language('YINGYONGPEIZHI','应用配置')}}</iButton>
    </template>
    <iFormGroup row="2"
                class="targetPriceDetail">
      <iFormItem v-for="(item, index) in logicList"
                 :key="index">
        <span v-if="item.label"
              slot="label">{{language(item.i18n_label, item.label)}}<span style="color:red;"
                v-if="item.required">*</span>:</span>
        <iInput v-if="item.type === 'input'"
                v-model="logicData[item.value]" />
        <iSelect v-else-if="item.type === 'select'"
                 v-model="logicData[item.value]"
                 :filterable="item.filterable">
          <el-option :value="item.code"
                     :label="item.name"
                     v-for="(item) in selectOptions[item.selectOption]"
                     :key="item.code"></el-option>
        </iSelect>
        <iDicoptions v-else-if="item.type === 'selectDict'"
                     :optionAll="false"
                     :optionKey="item.selectOption"
                     v-model="logicData[item.value]" />
        <el-autocomplete v-else-if="item.type === 'inputFilter'"
                         :fetch-suggestions="querySearch"
                         v-model="logicData[item.value]" />
      </iFormItem>
    </iFormGroup>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iFormGroup, iFormItem, iSelect, iMessage } from 'rise'
import iDicoptions from 'rise/web/components/iDicoptions'

export default {
  components: { iDialog, iButton, iInput, iFormGroup, iFormItem, iSelect, iDicoptions },
  props: {
    dialogVisible: { type: Boolean, default: false },
    logicList: { type: Array, default: () => [] },
    logicData: { type: Object, default: () => { } },
    selectOptions: { type: Object, default: () => { } },
  },
  watch: {
    dialogVisible (val) {
      if (val) {
        // this.reasonDescription = ''
      }
    }
  },
  data () {
    return {
      saveLoading: false
    }
  },
  methods: {
    querySearch (queryString, cb) {
      var restaurants = this.selectOptions.productGroupOptions;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant = this.selectOptions.productGroupOptions) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    clearDialog () {
      this.reasonDescription = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm () {
      for (let i = 0; i < this.logicList.length; i++) {
        if (this.logicList[i].required && !this.logicData[this.logicList[i].value]) {
          iMessage.warn(this.language(this.logicList[i].i18n_label, this.logicList[i].name) + this.language('BUNENGWEIKONG', '不能为空'))
          return
        }
      }
      this.saveLoading = true
      this.$emit('handleUse', this.reasonDescription)
    },
    changeSaveLoading (loading) {
      this.saveLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>
.targetPriceDetail {
  ::v-deep .el-form-item__label {
    width: 150px;
  }
}
</style>