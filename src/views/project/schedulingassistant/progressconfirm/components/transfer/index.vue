<!--
 * @Author: Luoshuang
 * @Date: 2021-08-03 17:50:47
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-03 18:02:34
 * @Description: 转派弹窗
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\transfer\index.vue
-->

<template>
  <iDialog 
    :title="language('ZHUANPAI','转派')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="loading">{{language('QUEREN','确认')}}</iButton>
    </template>
    <el-form>
      <el-form-item :label="language('QINGXUANZEZHUANPAIREN','请选择转派人')">
        <iSelect v-model="fsId">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>  
        </iSelect> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iMessage } from 'rise'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false },
    selectOptions: { type: Array, default: () => []}    
  },
  data() {
    return {
      fsId: '',
      loading: false
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.fsId = ''
      }
    }
  },
  methods: {
    clearDialog() {
      this.fsId = ''
      this.$emit('changeVisible', false)
    },
    handleCancel() {
      this.clearDialog()
    },
    handleConfirm() {
      if (this.fsId === '') {
        iMessage.warn(this.language('QINGXUANZEZHUANPAIREN','请选择转派人'))
        return
      }
      this.loading = true
      this.$emit('handleTransfer', this.fsId)
    },
    changeLoading(loading) {
      this.loading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>