<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 15:57:31
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-16 22:15:45
 * @Description: 分配询价科室弹窗
 * @FilePath: \front-web\src\views\accessoryPart\signForPartsDemand\components\assignInquiryDepartment.vue
-->

<template>
  <iDialog 
    :title="language('FENPEIXUNJIAKESHI','分配询价科室')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="loading">{{language('QUEREN','确认')}}</iButton>
      <iButton @click="handleCancel">{{language('QUXIAO','取消')}}</iButton>
    </template>
    <el-form>
      <el-form-item :label="language('QINGXUANZEXUNJIAKESHI','请选择询价科室')">
        <iSelect v-model="respDept">
          <el-option
            v-for="item in deptOptions"
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
import { getDeptList } from '@/api/accessoryPart/index'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      respDept: '',
      deptOptions: [],
      loading: false
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.respDept = ''
      }
    }
  },
  created() {
    const params = {
      tag: '26'
    }
    getDeptList(params).then(res => {
      if (res.result) {
        this.deptOptions = res.data?.map(item => {return {value:item.id, label:item.nameZh}})
      } else {
        this.deptOptions = []
      }
    })
  },
  methods: {
    clearDialog() {
      this.respDept = ''
      this.$emit('changeVisible', false)
    },
    handleCancel() {
      this.respDept = ''
      this.clearDialog()
    },
    handleConfirm() {
      if (this.respDept === '') {
        iMessage.warn(this.language('QINGXUANZEXUNJIABUMEN','请选择询价部门'))
        return
      }
      this.loading = true
      this.$emit('sendAccessory', this.respDept, this.deptOptions?.find(item => item.value === this.respDept)?.label)
    },
    changeLoading(loading) {
      this.loading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>