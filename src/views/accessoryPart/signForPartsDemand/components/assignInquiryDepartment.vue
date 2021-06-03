<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 15:57:31
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-03 16:36:33
 * @Description: 分配询价科室弹窗
 * @FilePath: \front-web\src\views\accessoryPart\signForPartsDemand\components\assignInquiryDepartment.vue
-->

<template>
  <iDialog 
    title="分配询价科室"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm">确认</iButton>
      <iButton @click="handleCancel">取消</iButton>
    </template>
    <el-form>
      <el-form-item label="请选择询价科室">
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
      deptOptions: []
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
    getDeptList().then(res => {
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
        iMessage.warn('请选择询价部门')
        return
      }
      this.$emit('sendAccessory', this.respDept)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>