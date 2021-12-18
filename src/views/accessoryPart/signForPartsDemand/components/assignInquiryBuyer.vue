<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:11:07
 * @LastEditors:  
 * @LastEditTime: 2021-12-02 14:49:26
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
        <!-- <iSelect v-model="respLINIE">
          <el-option
            v-for="item in userOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>  
        </iSelect>  -->
        <iSelect v-model="respLINIE"  value-key="id" @change="changepurchaseBuyer">
            <el-option
              v-for="item in purchaseBuyerOptions"
              :key="item.value"
              :label="item.nameZh"
              :value="item">
            </el-option>  
          </iSelect> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iMessage } from 'rise'
import { listUserByDepartIdAndRoleCode } from '@/api/accessoryPart/index'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false },
    deptId: { type: String}
  },
  data() {
    return {
      respLINIE: null,
      userOptions: [],
      loading: false,
      purchaseBuyerOptions: [],
      buyerId: "",
      buyerName: ""
    }
  },
  watch: {
    dialogVisible(val) {
      if (val && this.deptId) {
        this.getUserList()

        this.buyerId = ""
        this.buyerName = ""
      }
    }
  },
  methods: {
    getUserList() {
      listUserByDepartIdAndRoleCode({deptId:this.deptId,roleCode:'PJCGY'}).then(res => {
        if (res.result) {
          this.purchaseBuyerOptions = res.data || []
          // this.userOptions = res.data?.map(item => {return {value:item.id, label:item.nameZh}})
        } else {
          // this.userOptions = []
          this.purchaseBuyerOptions = []
        }
      })
    },
    clearDialog() {
      this.buyerId = ''
      this.buyerName = ''
      this.$emit('changeVisible', false)
    },
    handleCancel() {
      this.clearDialog()
    },
    handleConfirm() {
      if (this.buyerId === '') {
        iMessage.warn(this.language('QINGXUANZEXUNJIACAIGOUYUAN','请选择询价采购员'))
        return
      }
      this.loading = true
      this.$emit('sendAccessory', this.buyerId, this.buyerName)
    },
    changeLoading(loading) {
      this.loading = loading
    },
    changepurchaseBuyer(val) {
      this.buyerId = val.id
      this.buyerName = val.nameZh
    }
  }
}
</script>

<style lang="scss" scoped>

</style>