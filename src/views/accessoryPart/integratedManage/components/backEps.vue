<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:14:32
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-25 13:42:56
 * @Description: 退回EPS弹窗
 * @FilePath: \front-web\src\views\accessoryPart\integratedManage\components\backEps.vue
-->

<template>
  <iDialog 
    :title="language('TUIHUIYUANYIN','退回原因')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="878px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="saveLoading">{{language('BAOCUN','保存')}}</iButton>
      <iButton @click="clearDialog">{{language('QUXIAO','取消')}}</iButton>
    </template>
    <el-form label-position="top">
      <el-form-item :label="language('TUIHUILIYOULEIXING','退回理由类型')">
        <iSelect v-model="reasonType" :placeholder="language('QINGXUANZE','请选择')" style="width:220px" >
          <el-option
            v-for="item in backTypeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option> 
        </iSelect> 
      </el-form-item>
      <el-form-item :label="language('TUIHUILIYOUMIAOSHU','退回理由描述')">
        <iInput v-model="reasonDescription" :placeholder="language('QINGSHURUCHEXIAOYUANYIN','请输入撤销原因')" type="textarea" :rows="6" resize="none" ></iInput> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iInput } from 'rise'
import { getDictByCode } from '@/api/dictionary'
export default {
  components: { iDialog, iButton, iSelect, iInput },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      reasonType: '',
      reasonDescription: '',
      backTypeOption: [],
      loading: false,
      saveLoading: false
    }
  },
  created() {
    getDictByCode('BACK_REASON_TYPE').then(res => {
      if(res?.result) {
        this.backTypeOption = res.data[0].subDictResultVo.map(item => {
          return { value: item.code, label: item.name }
        })
      }
    })
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        this.reasonDescription = ''
        this.reasonType = ''
      }
    }
  },
  methods: {
    clearDialog() {
      this.reasonDescription = ''
      this.reasonType = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      this.saveLoading = true
      this.$emit('handleBack', this.reasonType, this.reasonDescription)
    },
    changeSaveLoading(loading) {
      this.saveLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>