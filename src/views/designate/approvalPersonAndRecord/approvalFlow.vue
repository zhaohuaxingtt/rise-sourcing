<!--
 * @Author: Luoshuang
 * @Date: 2021-05-27 00:41:04
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-12 18:01:39
 * @Description: 审批流弹窗
 * @FilePath: \front-sourcing\src\views\designate\approvalPersonAndRecord\approvalFlow.vue
-->

<template>
  <iDialog 
    :title="language('SHENPILIU','审批流')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="50%"
  >
    <template>
      <!-- <MeetingProcess ref="MeetingProcess" v-if="nominationType === 'MEETING'" :nomiAppId="nomiAppId" :processInstanceId="processInstanceId" /> -->
      <ProcessVertical ref="ProcessVertical" :instanceId="processInstanceId" class="padding-bottom30" />
    </template>
  </iDialog>
</template>

<script>
import { iDialog, iMessage } from 'rise'
import ProcessVertical from './processVertical'
import MeetingProcess from './meetingProcess'
export default {
  components: { iDialog, ProcessVertical, MeetingProcess },
  props: {
    dialogVisible: { type: Boolean, default: false },
    processInstanceId: {type: String},
    nomiAppId: { type: String },
    nominationType: {type: String}
  },
  data() {
    return {
      panorama: [],
      detail: {},
      meetingDetail: [],
      loading: false
    }
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.flow-step {
  ::v-deep .el-step__icon.is-text {
    border: none;
  }
  ::v-deep .el-step__line {
    width: 0;
    border-right: 1px solid rgba(22, 96, 241, 1);
  }
  .inActive {
    ::v-deep .el-step__line {
      width: 0;
      border-right: 1px dashed rgba(203, 203, 203, 1);
    }
    &:not(.current) .flow-status {
      opacity: 0.6;
    }
    // &:first-of-type {
    //   .flow-status {
    //     opacity: 1;
    //     color: red;
    //   }
    // }
  }
  .flow-title {
    display: flex;
    color: #000;
    font-size: 14px;
    .flow-status {
      font-weight: bold;
      width: 80px;
    }
    .flow-approval, .flow-position {
      font-weight: 400;
      width: 80px;
    }
    .flow-position {
      width: 120px;
    }
    .flow-time {
      opacity: 0.6;
      font-weight: 400;
    }
  }
  .flow-btn {
    width: 66px;
    min-width: unset;
    height: 23px;
    font-size: 12px;
    padding: 2px 22px;
    line-height: 14px;
  }
  .refuse {
    color: #000;
    padding-top: 7px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(95, 111, 143, 0.12);
  }
}
</style>