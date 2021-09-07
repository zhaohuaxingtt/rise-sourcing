<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 18:12:01
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-07 15:25:58
 * @Description: 审批弹窗
 * @FilePath: \front-web\src\views\financialTargetPrice\approval\components\approval.vue
-->

<template>
  <iDialog 
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="approvalDialog"
  >
    <template slot="title">
      <div class="clearFloat margin-right20">
        <span class="font18 font-weight">{{language('SHENPI','审批')}}</span>
          <div class="floatright">
            <!--------------------批准按钮----------------------------------->
            <iButton @click="handleApprove" :loading="approveLoading" >{{language('PIZHUN', '批准')}}</iButton>
            <!--------------------拒绝按钮----------------------------------->
            <iButton @click="handleReject" >{{language('JUJUE','拒绝')}}</iButton>
            <!--------------------取消按钮----------------------------------->
            <iButton @click="clearDialog" >{{language('QUXIAO','取消')}}</iButton>
          </div>
      </div>
    </template>
    <iFormGroup row="2" class="approvalDetail">
      <iFormItem v-for="(item, index) in detailList" :key="index" :label="language(item.i18n_label, item.label)+':'" :class="item.row ? 'row'+item.row : ''">
        <iText>{{item.parent && detailData[item.parent] ? detailData[item.parent][item.value] : detailData[item.value]}}</iText>
      </iFormItem>
    </iFormGroup>
    <div class="refuseReason padding-bottom30">
      <div class="refuseReason-label">{{language('JUJUEYUANYIN','拒绝原因')}}<span style="color:red;">*</span>:</div>
      <iInput v-model="rejectReason" type="textarea" :rows="4" :palceholder="language('QINGSHURUJUJUEYUANYIN','请输入拒绝原因')"></iInput>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iText, iMessage, iFormGroup, iFormItem, iInput } from 'rise'
import { detailList } from '../data'
import { targetPriceCompare, targetPriceApprove, targetPriceReject } from '@/api/financialTargetPrice/index'  
export default {
  components: { iDialog, iButton, iText, iFormGroup, iFormItem, iInput },
  props: {
    dialogVisible: { type: Boolean, default: false },
    applyId: {type: String}
  },
  data() {
    return {
      detailList: detailList,
      detailData: {},
      approveLoading: false,
      rejectReason: ''
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        this.getDetail()
      }
    }
  },
  methods: {
    handleReject() {
      if (!this.rejectReason) {
        iMessage.warn(this.language('QINGSHURUJUJUEYUANYIN','请输入拒绝原因'))
        return
      }
      const params = {
        id: this.applyId,
        rejectReason: this.rejectReason
      }
      targetPriceReject(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.$emit('changeVisible', false)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    handleApprove() {
      this.approveLoading = true
      targetPriceApprove({idList:[this.applyId]}).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.$emit('changeVisible', false)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.approveLoading = false
      })
    },
    getDetail() {
      if (!this.applyId) {
        return
      }
      targetPriceCompare(this.applyId).then(res => {
        if (res?.result) {
          this.detailData = res.data
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    clearDialog() {
      this.rejectReason = ''
      this.$emit('changeVisible', false)
    },
  }
}
</script>

<style lang="scss" scoped>
.approvalDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, .1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30px !important;
    // height: 93%;
    .el-dialog__body {
      // height: calc(100% - 90px);
      // overflow: auto;
    }
  }
  .approvalDetail {
    ::v-deep .row2 .el-form-item__label {
      width: 300px;
    }
  }
  .refuseReason {
    border-top: 1px solid rgba(27, 29, 33, 0.08);
    padding-top: 40px;
    &-label {
      margin-bottom: 15px;
    }
  }
}
</style>