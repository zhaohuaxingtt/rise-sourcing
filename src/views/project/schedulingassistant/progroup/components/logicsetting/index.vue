<!--
 * @Author: Luoshuang
 * @Date: 2021-07-28 10:57:15
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-29 12:15:00
 * @Description: 算法配置弹窗
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\logicsetting\index.vue
-->

<template>
  <iDialog 
    :title="language('SUANFAPEIZHI','算法配置')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="saveLoading">{{language('YINGYONGPEIZHI','应用配置')}}</iButton>
    </template>
    <iFormGroup row="2" class="targetPriceDetail">
      <iFormItem v-for="(item, index) in logicList" :key="index" :label="language(item.i18n_label, item.label)+':'" >
        <iInput v-if="item.type === 'input'" v-model="logicData[item.value]" />
        <iSelect v-else-if="item.type === 'select'" v-model="logicData[item.value]" >
          <el-option
            :value="item.code"
            :label="item.name"
            v-for="(item) in selectOptions[item.selectOption]"
            :key="item.code"
          ></el-option>
        </iSelect>
      </iFormItem>
    </iFormGroup>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iFormGroup, iFormItem, iSelect } from 'rise'
export default {
  components: { iDialog, iButton, iInput, iFormGroup, iFormItem, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false },
    logicList: {type:Array, default: () => []},
    logicData: {type:Object, default: () => {}},
    selectOptions: {type:Object, default: () => {}},
  },
  watch:{
    dialogVisible(val) {
      if(val) {
        // this.reasonDescription = ''
      }
    }
  },
  data() {
    return {
      saveLoading: false
    }
  },
  methods: {
    clearDialog() {
      this.reasonDescription = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      this.saveLoading = true
      this.$emit('handleUse', this.reasonDescription)
    },
    changeSaveLoading(loading) {
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