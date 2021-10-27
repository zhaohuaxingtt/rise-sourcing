<template>
  <div>
    <i-card>
      <div class="margin-bottom20">
        <span class="card-title">{{ language('LK_AEKOSHENPI', 'AEKO审批') }}</span>
        <div class="floatright">
          <i-button v-show="pageCanOption" v-loading.fullscreen.lock="fullscreenLoading" medium @click="optionApprove">
            <span v-if="!isBatchApproveMode">{{language('LK_AEKO_QUERENSHENPI', '确认审批')}}</span>
            <span v-else>
              {{  approveQueue !== 0 ? language('AEKOQUERENSHENPITIAOZHUANXAIYIYE', '确认审批，将跳转下一页') : language('QUERENSHENPIGUANBICHUANGKOU', '确认审批，窗口将自动关闭') }}
            </span>
          </i-button>
          <!--          <i-button @click="transfer" v-if="transferButtonDisplay&&pageCanOption"> {{
                        language('LK_ZHUANPAI', '转派')
                      }}
                    </i-button>-->

        </div>
      </div>
      <el-table :data="localAuditItems" stripe>
        <el-table-column
            label="专业科室"
            align="center"
            width="150"
            prop="linieDeptNum">
        </el-table-column>
        <el-table-column
            label="采购员"
            align="center"
            width="150"
            prop="linieName">
        </el-table-column>
        <el-table-column
            label="批准"
            width="150"
            align="center"
        >
          <template slot-scope="scope">
            <icon v-if="calculateSelected(scope.row,1)" @click.native="changeStatus(scope.row,1)" symbol
                  name="iconguanlianlingjian-xuanzhong" class="cursor"></icon>
            <icon v-else symbol name="iconguanlianlingjian-moren" @click.native="changeStatus(scope.row,1)"
                  class="cursor"></icon>

          </template>
        </el-table-column>
        <el-table-column
            label="补充材料"
            align="center"
            width="150"
        >
          <template slot-scope="scope">
            <icon v-if="calculateSelected(scope.row,3)" @click.native="changeStatus(scope.row,3)" symbol
                  name="iconguanlianlingjian-xuanzhong" class="cursor"></icon>
            <icon v-else symbol name="iconguanlianlingjian-moren" @click.native="changeStatus(scope.row,3)"
                  class="cursor"></icon>
          </template>
        </el-table-column>
        <el-table-column
            label="拒绝"
            align="center"
            width="150">
          <template slot-scope="scope">
            <icon v-if="calculateSelected(scope.row,2)" @click.native="changeStatus(scope.row,2)" symbol
                  name="iconguanlianlingjian-xuanzhong" class="cursor"></icon>
            <icon v-else symbol name="iconguanlianlingjian-moren" @click.native="changeStatus(scope.row,2)"
                  class="cursor"></icon>
          </template>
        </el-table-column>

        <el-table-column align="center">
          <template slot="header">
            <span class="custom-title">审批意见</span>
          </template>
          <template slot-scope="scope">
            <i-input v-if="approvalComments(scope.row)" v-model="scope.row.auditOpinion"></i-input>
            <span v-else>{{ scope.row.auditOpinion }}</span>
          </template>

        </el-table-column>
        <el-table-column
            label="申请人解释"
            align="center"
            prop="applicantExplain">
        </el-table-column>
        <el-table-column
            label="解释附件"
            align="center"
            prop="explainFile">
          <template slot-scope="scope">
            <a class="link-underline" v-if="scope.row.explainFileIds!=null" @click="lookExplainFile(scope.row)">
              {{ language('CHAKAN', '查看') }}
            </a>
          </template>
        </el-table-column>
      </el-table>
    </i-card>
    <AEKOExplainAttachmentDialog v-if="explainAttachmentDialogVal"
                                 :explain-attachment-req-data="explainAttachmentReqData"
                                 v-model="explainAttachmentDialogVal"/>

    <AEKOTransferDialog v-model="transferDialogVal"
                        @confirmTransfer="confirmTransfer"/>

  </div>

</template>

<script>
import {iInput, iCard, icon, iButton} from "rise"
import {aekoAudit, transferAEKO} from "@/api/aeko/approve";
import AEKOExplainAttachmentDialog from "./AEKOExplainAttachmentDialog";
import {lookDetails} from '../../approveList/lib'

export default {
  name: "AEKOApprovalComponents",
  props: {
    auditItems: {type: Array, default: () => []},
    transmitObj: {type: Object, default: () => ({})},
  },


  components: {
    AEKOExplainAttachmentDialog,
    iCard,
    iButton,
    icon,
    iInput,
  },
  data() {
    return {
      localAuditItems: [],
      explainAttachmentDialogVal: false,
      explainAttachmentReqData: null,
      fullscreenLoading: false,
      transferDialogVal: false,
    }
  },
  watch: {
    auditItems(val) {
      this.localAuditItems = JSON.parse(JSON.stringify(this.auditItems)); //this.templateData是父组件传递的对象
    }
  },
  computed: {
    // 是否处于队列审批模式
    isBatchApproveMode() {
      return this.transmitObj.isBatchApprove
    },
    // 审批队列,为null 表示任务已全部审批完毕
    approveQueue() {
      return this.transmitObj.queue && this.transmitObj.queue.length
    },
    pageCanOption: function () {
      return this.transmitObj.option == 1
    },
    transferButtonDisplay: function () {
      let user = this.$store.state.permission.userInfo
      let roles = user.roleList
      if (null != roles && roles.length > 0) {
        let btnShow = false
        for (let i = 0; i < roles.length; i++) {
          let item = roles[i]
          if (item.code == 'QQCGGZ') {
            btnShow = true
            break
          }
        }
        return btnShow
      }
      return false
    }
  },

  methods: {
    closePage() {
      if (navigator.userAgent.indexOf("MSIE") > 0) {
        //IE
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
          window.opener = null;
          window.close();
        } else {
          window.open('', '_top');
          window.top.close();
        }
      } else if (navigator.userAgent.indexOf("Firefox") > 0) {
        //firefox
        window.open("about:blank","_self").close()
      } else {
        // chrome
        window.opener = null;
        window.open("","_self").close()
      }
    },
    toNextApproval() {
      let selectPendingList = localStorage.getItem('aekoSelectPendingList') || ''
      selectPendingList = JSON.parse(selectPendingList) || []
      console.log(selectPendingList)
      if (selectPendingList.length <= 0) {
        return this.$message.warning('the queue is empty')
      }
      let aekoSelectPendingList = window._.cloneDeep(selectPendingList)
      let queueList = selectPendingList.map(o => o.requirementAekoId)
      aekoSelectPendingList.shift()
      queueList.shift()

      // 缓存任务列表
      localStorage.setItem('aekoSelectPendingList', JSON.stringify(aekoSelectPendingList))
      // 跳转第一个审批单
			lookDetails(this, selectPendingList[0], false, queueList)
    },
    calculateSelected(row, state) {
      return row.approvalResult == state;
    },
    //审批意见状态
    approvalComments(row) {
      return this.pageCanOption && (row.approvalResult == 3 || row.approvalResult == 2)
    },
    changeStatus(row, state) {
      if (this.pageCanOption) {
        if (row.approvalResult != state) {
          row.approvalResult = state
        }
        if (state == 1) {
          row.auditOpinion = ''
        }
      }
    },
    //转派
    transfer() {
      this.transferDialogVal = true
    },
    confirmTransfer(selBuyerId) {
      let selectPendingItem = this.transmitObj.aekoApprovalDetails
      if (null != selectPendingItem) {
        let transfers = []
        selectPendingItem.workFlowDTOS.forEach(item => {
          transfers.push({
            targetUserId: selBuyerId,
            aekoCode: selectPendingItem.aekoNum,
            taskId: item.taskId,
            userId: this.$store.state.permission.userInfo.id
          })
        })
        this.fullscreenLoading = true
        transferAEKO(transfers).then(res => {
          this.fullscreenLoading = false
          if (res.code == 200) {
            this.loadPendingAKEOList()
          } else {
            this.$message.error(res.desZh)
          }
        })
      }
    },
    //审批
    optionApprove() {
      let req = []
      for (let i = 0; i < this.localAuditItems.length; i++) {
        let item = this.localAuditItems[i]
        if (item.approvalResult != 1) {
          if (item.auditOpinion == null || item.auditOpinion == '') {

            return this.$message.error(this.language('LK_AEKO_QINGTIANXIESHENPIYIJIAN', '请填写审批意见'))
          }
        }
      }

      this.localAuditItems.forEach(item => {
        item.workFlowDTOS.forEach(val => {
          req.push({
            aekoCode: this.transmitObj.aekoApprovalDetails.aekoNum,
            aekoAuditType: this.transmitObj.aekoApprovalDetails.aekoAuditType,
            approvalResult: item.approvalResult,
            comment: item.auditOpinion,
            workFlowDTO: val
          })
        })
      })
      this.fullscreenLoading = true
      aekoAudit(req).then(res => {
        this.fullscreenLoading = false
        if (res.code == 200) {
          if (res.data.failCount > 0) {
            this.$message.error(`您已成功审批${res.data.successCount}个采购员的表态，失败${res.data.failCount}个采购员的表态，请重试`)
            this.$emit('refreshForm', 1)
          } else {
            this.$message.success(`您已成功审批${res.data.successCount}个采购员的表态，失败${res.data.failCount}个采购员的表态!`)
            this.$emit('refreshForm', 2)
          }
        } else {
          this.$message.error(res.desZh)
        }
        // 批量审批模式，审批单存在审批队列
        if (this.isBatchApproveMode) {
          setTimeout(() => {
            if (this.approveQueue) {
              this.toNextApproval()
            } else {
              this.closePage()
            }
          }, 2000)
        }
      })
    },
    //查看解释附件
    lookExplainFile(row) {
      this.explainAttachmentReqData = {
        aekoNum: this.transmitObj.aekoApprovalDetails.aekoNum,
        linieId: row.linieId,
        manageId: this.transmitObj.aekoApprovalDetails.aekoManageId,
        taskId: row.workFlowDTOS.filter((i) => i.taskId).map((i) => i.taskId),
      }
      this.explainAttachmentDialogVal = true
    }

  }
}
</script>

<style scoped lang="scss">
.card-title {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
}

.custom-title:after {
  content: '*';
  color: red;
}

</style>