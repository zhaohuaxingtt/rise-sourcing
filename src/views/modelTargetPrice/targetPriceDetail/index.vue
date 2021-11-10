<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 17:47:09
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-09 21:13:41
 * @Description: 目标价详情
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\targetPriceDetail\index.vue
-->

<template>
  <iPage class="targetPriceDetail">
    <div class="targetPriceDetail-top">
      <div class="font20 font-weight">RFQ：{{rfqId}}</div>
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
        <iButton v-if="applyType === '2'" @click="handleSave" :loading="saveLoading" >{{language('BAOCUN','保存')}}</iButton>
        <!--------------------取消按钮----------------------------------->
        <iButton v-if="applyType === '1'" @click="handleCancel" :loading="exportLoading" >{{language('QUXIAO','取消')}}</iButton>
        <!--------------------提交按钮----------------------------------->
        <iButton v-if="applyType === '1' || applyType === '2'" @click="handleSubmit" :loading="submitLoading" >{{language('TIJIAO','提交')}}</iButton>
        <!--------------------批准按钮----------------------------------->
        <iButton v-if="applyType === '3'" @click="openApprovalDetailDialog('1')" :loading="exportLoading" >{{language('PIZHUN','批准')}}</iButton>
        <!--------------------拒绝按钮----------------------------------->
        <iButton v-if="applyType === '3'" @click="openApprovalDetailDialog('2')" :loading="exportLoading" >{{language('JUJUE','拒绝')}}</iButton>
      </div>
    </div>
    <!------------------------------------------------------------------------>
    <!--                 基础信息                                          --->
    <!------------------------------------------------------------------------>
    <basic
      ref="modelBasic" 
      :rfqId="rfqId" 
      :taskId="taskId" 
      :applyType="applyType" 
      @changeSubmitLoading="changeSubmitLoading" 
      @handleSubmitSuccess="handleSubmitSuccess" 
      @changeSaveLoading="changeSaveLoading" 
      @changeExportLoading="changeExportLoading" 
      @changeUploadLoaing="changeUploadLoaing" 
    />
    <!------------------------------------------------------------------------>
    <!--                 修改历史                                          --->
    <!------------------------------------------------------------------------>
    <history v-if="applyType !== '3'" ref="modelHistory" :id="rfqId" />
    <!------------------------------------------------------------------------>
    <!--                  批准弹窗                                      --->
    <!------------------------------------------------------------------------>
    <approvalDialog ref="approvalDialog" :dialogVisible="approvalDialogVisible" @changeVisible="changeApprovalDialogVisible" :type="type" @handleConfirm="handleConfirm" />
  </iPage>
</template>

<script>
import { iPage, iButton, iMessage } from 'rise'
import history from './components/history'
import basic from './components/basic'
import approvalDialog from '../approval/components/approval'
import { approve, reject } from '@/api/modelTargetPrice/index'
export default {
  components: {iPage,history,basic, iButton, approvalDialog},
  data() {
    return {
      detailData: {},
      type: '1',
      approvalDialogVisible: false,
      submitLoading: false,
      saveLoading: false,
      exportLoading: false,
      uploadLoading: false
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
      return this.$route.query.applyType || '1'
    },
    rfqId() {
      return this.$route.query.rfqId || ''
    },
    taskId() {
      return this.$route.query.taskId || ''
    }
  },
  methods: {
    upload(content) {
      this.$refs.modelBasic.upload(content)
    },
    changeUploadLoaing(loading) {
      this.uploadLoading = loading
    },
    beforeUpload() {
      this.uploadLoading = true
    },
    handleExport() {
      this.changeExportLoading(true)
      this.$refs.modelBasic.handleExport()
    },
    changeExportLoading(loading) {
      this.exportLoading = loading
    },
    gotoQuery() {
      this.$router.push('/modeltargetprice/query')
    },
    handleConfirm(reason) {
      const params = {
        remarks: reason,
        taskIds: [this.taskId]
      }
      if (this.type === '1') {
        approve(params).then(res => {
          if (res?.result) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            this.changeApprovalDialogVisible(false)
            this.gotoQuery()
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        }).finally(() => {
          this.$refs.approvalDialog.changeSaveLoading(false)
        })
      } else {
        reject(params).then(res => {
          if (res?.result) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            this.changeApprovalDialogVisible(false)
            this.gotoQuery()
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        }).finally(() => {
          this.$refs.approvalDialog.changeSaveLoading(false)
        })
      }
    },
    handleSave() {
      this.$refs.modelBasic.handleSave()
    },
    changeSaveLoading(loading) {
      this.saveLoading = loading
    },
    handleSubmitSuccess() {
      this.$refs.modelBasic.getDetail()
      this.$refs.modelHistory.getTableList()
    },
    handleSubmit() {
      this.$refs.modelBasic.handleSubmit()
    },
    changeSubmitLoading(loading) {
      this.submitLoading = loading
    },
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