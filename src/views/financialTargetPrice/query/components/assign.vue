<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:11:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-23 17:59:15
 * @Description: 分配询价采购员弹窗
 * @FilePath: \front-web\src\views\financialTargetPrice\query\components\assign.vue
-->

<template>
  <iDialog 
    title="指派"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="loading">指派</iButton>
    </template>
    <el-form>
      <el-form-item label="请选择指派人">
        <iSelect v-model="assign">
          <!-- <el-option
            v-for="item in userOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>   -->
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
  },
  data() {
    return {
      assign: '',
      assignOption: [],
      loading: false
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
      }
    }
  },
  methods: {
    clearDialog() {
      this.respLINIE = ''
      this.$emit('changeVisible', false)
    },
    handleCancel() {
      this.clearDialog()
    },
    handleConfirm() {
      if (this.respLINIE === '') {
        iMessage.warn('请选择询价采购员')
        return
      }
      this.loading = true
      this.$emit('sendAccessory', this.respLINIE)
    },
    changeLoading(loading) {
      this.loading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>