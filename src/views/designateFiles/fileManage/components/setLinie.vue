<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:11:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-02 15:43:57
 * @Description: 分配询价采购员弹窗
 * @FilePath: \front-web\src\views\designateFiles\fileManage\components\setLinie.vue
-->

<template>
  <iDialog 
    title="分配LINIE/CSS"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm">确认</iButton>
      <iButton @click="clearDialog">取消</iButton>
    </template>
    <el-form>
      <el-form-item label="请选择分配的负责人">
        <iSelect v-model="respLINIE"></iSelect> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect } from 'rise'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      respDept: '',
      respLINIE: ''
    }
  },
  methods: {
    clearDialog() {
      this.respDept = ''
      this.respLINIE = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      this.$emit('updateLinie', this.respDept, this.respLINIE)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>