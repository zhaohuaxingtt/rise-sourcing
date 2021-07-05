<!--
 * @Author: Luoshuang
 * @Date: 2021-05-27 00:41:04
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-03 11:29:08
 * @Description: 审批流弹窗
 * @FilePath: \front-web\src\views\designate\approvalPersonAndRecord\approvalFlow.vue
-->

<template>
  <iDialog 
    title="审批流"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="678px"
  >
    <div style="padding-bottom:20px">
      <el-steps direction="vertical" :active="1" class="flow-step">
        <el-step v-for="(item,index) in flowData" :key="index" :class="item.step < currentStep ? 'active' : item.step === currentStep ? 'current inActive' : 'inActive'">
          <template slot="icon">
            <icon v-if="item.step < currentStep" symbol class="cursor" name='iconshenpiliu-yishenpi'></icon>
            <icon v-if="item.step === currentStep" symbol class="cursor" name='iconshenpiliu-shenpizhong'></icon>
            <icon v-if="item.step > currentStep" symbol class="cursor" name='iconshenpiliu-daishenpi'></icon>
            <!-- <icon symbol class="cursor" name='iconshenpiliu-yishenpi-mourenshenpi'></icon> -->
          </template>
          <template slot="title">
            <div class="flow-title" >
              <div class="flow-status">{{item.status}}</div>
              <div class="flow-approval">{{item.approval}}</div>
              <div class="flow-position">{{item.title}}</div>
              <div class="flow-time">{{item.approvalTime}}</div>
            </div>
          </template>
          <template slot="description">
            <div class="margin-bottom30">
              <div v-for="(nItem, nIndex) in item.approvalList" :key="nIndex">
                <span>{{nItem.name}}</span>
                <span style="margin-left:20px">{{nItem.title}}</span>
              </div>
            </div>
            <div v-if="item.status === '以拒绝'" class="margin-bottom30">
              <div class="refuse"> 拒绝原因：{{item.refuseReason}}</div>
              <div class="margin-bottom10 margin-top15 clearFloat">
                <span class="refuse">解释内容</span>
                <div class="floatright">
                  <iButton class="flow-btn">提交</iButton>
                  <iButton class="flow-btn">保存</iButton>
                </div>
              </div>
              <iInput placeholder="请输入解释内容" type="textarea" :row="2" resize="none"></iInput>
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, icon } from 'rise'
import { flowData, mockData } from './data'
import { getInstDetail } from '@/api/designate/decisiondata/approval'
export default {
  components: { iDialog, iButton, iInput, icon },
  props: {
    dialogVisible: { type: Boolean, default: false },
    processInstanceId: {type: String}
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getFlow()
      }
    }
  },
  data() {
    return {
      backType: '',
      backReason: '',
      flowData: mockData,
      currentStep: 2
    }
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible', false)
    },
    async getFlow() {
      const res = await getInstDetail(this.processInstanceId) || mockData
        if(res) {
          this.flowData = [
            ...res.finishedNodeMap.approvalUsers.map((item, index) => {
              return {
                step: index,
                status: '已审批',
                approval: item.nameZh,
                title: item.positionList,
              }
            }),
            {
              step: (res.finishedNodeMap.approvalUsers || []).length,
              status: '审批中',
              approvalList: res.currentNode.approvalUserDTOList.map(item => {
                return {
                  name: item.nameZh,
                  title: item.positionList
                }
              })
            },
            {
              step: (res.finishedNodeMap.approvalUsers || []).length + 1,
              status: '未审批',
              approvalList: res.unfinishedNodeMap.approvalUsers.map(item => {
                return {
                  name: item.nameZh,
                  title: item.positionList
                }
              })
            }
          ]
        }
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