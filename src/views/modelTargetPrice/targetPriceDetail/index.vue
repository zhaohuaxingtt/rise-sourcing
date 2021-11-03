<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:47:09
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-03 13:20:37
 * @Description: 目标价详情
 * @FilePath: \front-web\src\views\modelTargetPrice\targetPriceDetail\index.vue
-->

<template>
  <iPage class="targetPriceDetail">
    <div class="targetPriceDetail-top">
      <div class="font20 font-weight">RFQ：{{detailData.rfqId}}</div>
      <div>
        <!--------------------导出批量维护按钮----------------------------------->
        <iButton v-if="applyType === '2'" @click="handleExport" :loading="exportLoading" >{{language('DAOCHUPILIANGWEIHU','导出批量维护')}}</iButton>
        <!--------------------导入批量维护按钮----------------------------------->
        <el-upload
          v-if="applyType === '2'"
          class=" margin-left10 margin-right10"
          accept='.xlsx'
          style="display:inline-block;"
          :http-request="upload"
          :show-file-list='false'
          :before-upload="beforeUpload"
          
        >
          <iButton :loading='uploadLoading'>{{language('DAORUPILIANGWEIHU','导入批量维护')}}</iButton>
        </el-upload>
        <!--------------------保存按钮----------------------------------->
        <iButton v-if="applyType === '2'" @click="handleSave" :loading="exportLoading" >{{language('BAOCUN','保存')}}</iButton>
        <!--------------------取消按钮----------------------------------->
        <iButton v-if="applyType === '1'" @click="handleCancel" :loading="exportLoading" >{{language('QUXIAO','取消')}}</iButton>
        <!--------------------提交按钮----------------------------------->
        <iButton v-if="applyType !== '3'" @click="handleSubmit" :loading="exportLoading" >{{language('TIJIAO','提交')}}</iButton>
        <!--------------------批准按钮----------------------------------->
        <iButton v-if="applyType === '3'" @click="openApprovalDetailDialog('1')" :loading="exportLoading" >{{language('PIZHUN','批准')}}</iButton>
        <!--------------------拒绝按钮----------------------------------->
        <iButton v-if="applyType === '3'" @click="openApprovalDetailDialog('2')" :loading="exportLoading" >{{language('JUJUE','拒绝')}}</iButton>
      </div>
    </div>
    <!------------------------------------------------------------------------>
    <!--                 基础信息                                          --->
    <!------------------------------------------------------------------------>
    <basic :id="applyId" @basicSaving="basicSaving" :applyType="applyType" />
    <!------------------------------------------------------------------------>
    <!--                 修改历史                                          --->
    <!------------------------------------------------------------------------>
    <history v-if="applyType !== '3'" ref="history" :id="applyId" />
    <!------------------------------------------------------------------------>
    <!--                  批准弹窗                                      --->
    <!------------------------------------------------------------------------>
    <approvalDialog :dialogVisible="approvalDialogVisible" @changeVisible="changeApprovalDialogVisible" :type="type" />
  </iPage>
</template>

<script>
import { iPage, iButton } from 'rise'
import history from './components/history'
import basic from './components/basic'
import approvalDialog from '../approval/components/approval'
export default {
  components: {iPage,history,basic, iButton, approvalDialog},
  data() {
    return {
      detailData: {},
      type: '1',
      approvalDialogVisible: false
    }
  },
  created() {
    const params = JSON.parse(this.$route.query.item)
    if(params) {
      this.detailData = params
    }
  },
  computed: {
    /**
     * @Description: 类型  1 - 目标价申请  2 - 目标价维护  3 - 目标价审批
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    applyType() {
      return this.detailData.applyType || '1'
    },
    rfqId() {
      return this.detailData.rfqId || ''
    }
  },
  methods: {
    /**
     * @Description: 
     * @Author: Luoshuang
     * @param {*} type  1-批准  2-拒绝
     * @return {*}
     */    
    openApprovalDetailDialog(type){
      // if (this.selectedItems.length < 1) {
      //   iMessage.warn(this.language('ZHISHAOXUANZEYITIAOJILU','至少选择一条记录'))
      //   return
      // }
      this.type = type
      this.changeApprovalDialogVisible(true)
    },
    changeApprovalDialogVisible(visible) {
      this.approvalDialogVisible = visible
      // if (!visible) {
      //   this.getTableList()
      // }
    },
    basicSaving() {
      this.$refs.history.getTableList()
    },
    handleCancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.targetPriceDetail {
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>