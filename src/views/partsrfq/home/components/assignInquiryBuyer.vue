<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:11:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-24 19:46:33
 * @Description: 分配询价采购员弹窗
 * @FilePath: \front-sourcing\src\views\partsrfq\home\components\assignInquiryBuyer.vue
-->

<template>
  <iDialog 
    :title="type === '1' ? language('ZHUANPAIXUNJIACAIGOUYUAN','转派询价采购员') : language('ZHUANPAILINIE','转派LINIE')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="loading">{{language('QUEREN','确认')}}</iButton>
      <!-- <iButton @click="handleCancel">{{language('QUXIAO','取消')}}</iButton> -->
    </template>
    <el-form>
      <el-form-item :label="language('QINGXUANZEKESHI','请选择科室')">
        <iSelect v-model="deptCode" value-key="id"   @change="getUserList" :loading="deptLoading">
          <el-option
            v-for="item in deptOptions"
            :key="item.code"
            :label="item.deptNum"
            :value="item.code">
          </el-option>
        </iSelect> 
      </el-form-item>
      <el-form-item :label="type === '1' ? language('MUBIAOXUNJIACAIGOUYUAN','目标询价采购员') : language('MUBIAOLINIE','目标LINIE')">
        <iSelect v-model="userId" filterable :loading="linieLoading">
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
import { getRfqUserInfoList, getRfqDeptList } from '@/api/partsrfq/home'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false },
    type: { type: String, default: '1'},
    isLinieGZ:{type:Boolean,default:false}
  },
  data() {
    return {
      userId: '',
      userOptions: [],
      deptOptions:[],
      loading: false,
      deptCode:"",
      deptLoading:false,
      linieLoading:false,
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.userId = ''
        this.getRfqDeptList()
      }
    }
  },
  methods: {
    getRfqDeptList(){
      this.deptLoading = true
      getRfqDeptList().then(res=>{
        this.deptOptions = res.data
        this.deptLoading = false
      })
    },
    getUserList() {
      this.linieLoading = true
      getRfqUserInfoList(this.deptCode).then(res => {
        if (res.result) {
          this.userOptions = res.data?.map(item => {return {value:item.code, label:item.name}})
        } else {
          this.userOptions = []
        }
        this.linieLoading = false
      })
    },
    clearDialog() {
      this.userId = ''
      this.$emit('changeVisible', false)
    },
    handleCancel() {
      this.clearDialog()
    },
    handleConfirm() {
      if (this.userId === '') {
        iMessage.warn(this.language('QINGXUANZEXUNJIACAIGOUYUAN','请选择询价采购员'))
        return
      }
      this.loading = true
      this.$emit('handleConfirm', this.userId, this.userOptions?.find(item => item.value === this.userId)?.label)
    },
    changeLoading(loading) {
      this.loading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>