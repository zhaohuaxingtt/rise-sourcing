<!--
 * @Author: Luoshuang
 * @Date: 2021-08-03 17:50:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-29 17:52:49
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
        <fsSelect v-model="fsId" @handleChange="handleChange" />
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from 'rise'
import fsSelect from '@/views/project/components/commonSelect/fsSelect'
export default {
  components: { iDialog, iButton, fsSelect },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      fsId: '',
      loading: false,
      fs: '',
      positionId:'',
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
    handleChange(fsId, fs,positionId) {
      this.fs = fs
      this.positionId = positionId
    },
    clearDialog() {
      this.fsId = ''
      this.positionId=''
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
      this.$emit('handleTransfer', this.fsId, this.fs,this.positionId)
    },
    changeLoading(loading) {
      this.loading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>