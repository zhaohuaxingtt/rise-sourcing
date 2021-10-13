<template>
  <div>
    <i-card>
      <div class="margin-bottom20">
        <span class="card-title">{{ language('LK_AEKOSHENPI', 'AEKO审批') }}</span>
        <div class="floatright">
          <i-button v-show="pageCanOption" medium @click="optionApprove">确认审批</i-button>
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
            label="审批人解释"
            align="center"
            prop="applicantExplain">
        </el-table-column>
        <el-table-column
            label="解释附件"
            align="center"
            prop="explainFile">
          <template  slot-scope="scope">
            <a class="link-underline" @click="lookExplainFile(scope.row)">
              {{ language('CHAKAN', '查看') }}
            </a>
          </template>
        </el-table-column>
      </el-table>
    </i-card>
    <AEKOExplainAttachmentDialog v-if="explainAttachmentDialogVal" v-model="explainAttachmentDialogVal" />
  </div>

</template>

<script>
import {iInput, iCard, icon, iButton} from "rise"
import {aekoAudit} from "@/api/aeko/approve";
import AEKOExplainAttachmentDialog from "./AEKOExplainAttachmentDialog";

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
      explainAttachmentReqData:[],
    }
  },
  watch: {
    auditItems(val) {
      this.localAuditItems = JSON.parse(JSON.stringify(this.auditItems)); //this.templateData是父组件传递的对象
    }
  },
  computed: {
    pageCanOption: function () {
      return this.transmitObj.option == 1
    }
  },

  methods: {
    calculateSelected(row, state) {
      return row.approvalResult == state;
    },
    //审批意见状态
    approvalComments(row) {
      return row.approvalResult == 3 || row.approvalResult == 2
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
    //审批
    optionApprove() {
      let req = []
      for (let i = 0; i < this.localAuditItems.length; i++) {
        let item = this.localAuditItems[i]
        if (item.approvalResult != 1) {
          if (item.auditOpinion == null || item.auditOpinion == '') {

            return this.$message.error('请填写审批意见')
          }
        }

      }
      this.localAuditItems.forEach(item => {
        item.workFlowDTOS.forEach(val => {
          req.push({
            aekoAuditType: this.transmitObj.aekoApprovalDetails.aekoAuditType,
            approvalResult: item.approvalResult,
            comment: item.auditOpinion,
            workFlowDTO: val
          })
        })
      })

      aekoAudit(req).then(res => {
        this.$message.error(res.desZh)
      })


    },
    //查看解释附件
    lookExplainFile(row) {
      this.explainAttachmentReqData={
        aekoNum:this.transmitObj.aekoApprovalDetails.aekoNum,
        linieId:row.linieId,
        manageId:this.transmitObj.aekoApprovalDetails.aekoManageId,
        taskId:'',
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