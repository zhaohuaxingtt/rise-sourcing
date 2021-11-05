<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:11:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-16 22:26:38
 * @Description: 分配询价采购员弹窗
 * @FilePath: \front-web\src\views\accessoryPart\signForPartsDemand\components\assignInquiryBuyer.vue
-->

<template>
  <iDialog 
    :title="language('FENPEIXUNJIACAIGOUYUAN','分配询价采购员')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="loading">{{language('QUEREN','确认')}}</iButton>
      <iButton @click="handleCancel">{{language('QUXIAO','取消')}}</iButton>
    </template>
    <el-form>
      <el-form-item :label="language('QINGXUANZEXUNJIACAIGOUYUAN','请选择询价采购员')">
        <iSelect v-model="respLINIE">
          <el-option
            v-for="item in userOptions"
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
import { getUserList } from '@/api/accessoryPart/index'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false },
    deptId: { type: String}
  },
  data() {
    return {
      respLINIE: '',
      userOptions: [],
      loading: false
    }
  },
  watch: {
    dialogVisible(val) {
      if (val && this.deptId) {
        this.respLINIE = ''
        this.getUserList()
      }
    }
  },
  methods: {
    getUserList() {
      getUserList({deptId:this.deptId,tag:'9'}).then(res => {
        if (res.result) {
          this.userOptions = res.data?.map(item => {return {value:item.id, label:item.nameZh}})
        } else {
          this.userOptions = []
        }
      })
    },
    clearDialog() {
      this.respLINIE = ''
      this.$emit('changeVisible', false)
    },
    handleCancel() {
      this.clearDialog()
    },
    handleConfirm() {
      if (this.respLINIE === '') {
        iMessage.warn(this.language('QINGXUANZEXUNJIACAIGOUYUAN','请选择询价采购员'))
        return
      }
      this.loading = true
      this.$emit('sendAccessory', this.respLINIE, this.userOptions?.find(item => item.value === this.respLINIE)?.label)
    },
    changeLoading(loading) {
      this.loading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>